import { NextResponse } from "next/server";
import { Pool } from "pg";

const parseIdAllowlist = (rawValue?: string) =>
  new Set(
    (rawValue ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

// ─── Telegram Bot helpers ───────────────────────────────────────────────────

async function sendTelegramMessage(chatId: number | string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  }).catch((err) => console.error("[Telegram] sendMessage failed:", err));
}

// ─── Command handlers ────────────────────────────────────────────────────────

const HELP_TEXT = `<b>Comandos disponibles:</b>

<b>/gasto</b> <code>[monto] [descripcion] [quienPago] [moneda] [viajeId]</code>
Agrega un gasto al viaje activo.

📌 <b>Moneda:</b> <code>pesos</code> | <code>reales</code> | <code>dolares</code>
📌 <b>viajeId:</b> número del viaje (opcional, usa el último si lo omitís)

<b>Ejemplo:</b>
<code>/gasto 1500 Almuerzo Mati pesos 6</code>

<b>/viajes</b> — lista los viajes disponibles
<b>/ayuda</b> — muestra este mensaje`;

async function handleGastoCommand(
  pool: Pool,
  chatId: number | string,
  fromName: string,
  args: string[],
) {
  // args: [monto, descripcion, quienPago, moneda, viajeId?]
  if (args.length < 4) {
    await sendTelegramMessage(
      chatId,
      `⚠️ Faltan parámetros.\n\n${HELP_TEXT}`,
    );
    return;
  }

  const [rawMonto, descripcion, quienPago, moneda, rawViajeId] = args;

  const amount = parseFloat(rawMonto.replace(",", "."));
  if (!isFinite(amount) || amount <= 0) {
    await sendTelegramMessage(chatId, `❌ Monto inválido: <code>${rawMonto}</code>`);
    return;
  }

  const validCurrencies = ["pesos", "reales", "dolares", "usd"];
  const exchange = moneda.toLowerCase();
  if (!validCurrencies.includes(exchange)) {
    await sendTelegramMessage(
      chatId,
      `❌ Moneda inválida: <code>${moneda}</code>\nUsá: pesos | reales | dolares`,
    );
    return;
  }

  // Resolve travelId: use provided or get latest trip id
  let travelId: string | null = rawViajeId ?? null;
  if (!travelId) {
    const latestTrip = await pool.query(
      `SELECT id FROM public.trips ORDER BY id DESC LIMIT 1`,
    );
    travelId = latestTrip.rows[0]?.id ? String(latestTrip.rows[0].id) : null;
  }

  // Verify trip exists
  const tripCheck = await pool.query(
    `SELECT id, destiny FROM public.trips WHERE id = $1`,
    [travelId],
  );
  if (tripCheck.rowCount === 0) {
    await sendTelegramMessage(
      chatId,
      `❌ No existe el viaje con ID <code>${travelId}</code>.\nUsá /viajes para ver los disponibles.`,
    );
    return;
  }
  const tripName: string = tripCheck.rows[0].destiny;

  const result = await pool.query(
    `INSERT INTO public.expenses (type, amount, responsible, exchange, travelId, travelDescription, date)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING id`,
    [descripcion.trim(), amount, quienPago.trim(), exchange, travelId, tripName],
  );

  const expenseId: number = result.rows[0].id;
  await sendTelegramMessage(
    chatId,
    `✅ <b>Gasto agregado</b> (#${expenseId})\n\n📝 ${descripcion}\n💰 ${amount.toFixed(2)} ${exchange}\n👤 ${quienPago}\n✈️ ${tripName}`,
  );
}

async function handleViajesCommand(pool: Pool, chatId: number | string) {
  const trips = await pool.query(
    `SELECT id, destiny FROM public.trips ORDER BY id ASC`,
  );
  if (trips.rowCount === 0) {
    await sendTelegramMessage(chatId, "No hay viajes registrados.");
    return;
  }
  const lines = trips.rows.map((r: { id: number; destiny: string }) => `• <code>${r.id}</code> — ${r.destiny}`).join("\n");
  await sendTelegramMessage(chatId, `<b>Viajes disponibles:</b>\n\n${lines}`);
}

export async function POST(req: Request) {
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token");

    if (secret && incomingSecret !== secret) {
      console.warn("[Telegram] Invalid webhook secret");
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Leemos el cuerpo del mensaje que manda Telegram
    const body = await req.json();
    const payloadMessage = body.message ?? body.edited_message ?? body.channel_post;

    const text = payloadMessage?.text;
    const fromName = payloadMessage?.from?.first_name ?? "Unknown";
    const fromId = payloadMessage?.from?.id;
    const chatId = payloadMessage?.chat?.id;

    const allowedUserIds = parseIdAllowlist(process.env.TELEGRAM_ALLOWED_USER_IDS);
    const allowedChatIds = parseIdAllowlist(process.env.TELEGRAM_ALLOWED_CHAT_IDS);
    const hasUserAllowlist = allowedUserIds.size > 0;
    const hasChatAllowlist = allowedChatIds.size > 0;

    const userAllowed = !hasUserAllowlist || allowedUserIds.has(String(fromId));
    const chatAllowed = !hasChatAllowlist || allowedChatIds.has(String(chatId));

    if (!userAllowed || !chatAllowed) {
      console.log("[Telegram] Update ignored by allowlist", {
        fromId,
        chatId,
      });
      // Respondemos 200 para que Telegram no reintente este update
      return NextResponse.json({ ok: true, ignored: true });
    }

    // El Happy Path: Ver el mensaje en la consola
    console.log("--- ¡Mensaje Recibido de Telegram! ---");
    console.log("Meta:", { updateId: body.update_id, fromId, chatId, fromName });
    console.log(`Mati, ${fromName} escribió: ${text ?? "(sin texto)"}`);

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
      // Guardar en la base de datos
      await pool.query(
        `INSERT INTO telegram_messages (update_id, from_id, from_name, from_username, chat_id, chat_type, text)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (update_id) DO NOTHING`,
        [
          body.update_id,
          fromId,
          fromName,
          payloadMessage?.from?.username ?? null,
          chatId,
          payloadMessage?.chat?.type ?? null,
          text ?? null,
        ],
      );

      // Procesar comandos
      if (text && chatId) {
        const trimmed = text.trim();
        if (trimmed.startsWith("/gasto") || trimmed.startsWith("/gasto@")) {
          // Remove command prefix (handle bot @mention suffix)
          const withoutCmd = trimmed.replace(/^\/gasto(?:@\S+)?\s*/i, "");
          // Split by whitespace, but keep multi-word description together with quotes
          // Simple split: /gasto 1500 Almuerzo restaurante Mati pesos 6
          // We join words 1..N-3 as description if > 4 tokens
          const tokens = withoutCmd.trim().split(/\s+/);
          // tokens: [monto, ...descripcion..., quienPago, moneda, viajeId?]
          // Minimum: monto descripcion quienPago moneda  (4 tokens)
          let args: string[];
          if (tokens.length > 4) {
            // Middle tokens (1..len-3) form the description (without optional viajeId)
            // or (1..len-4) if last token looks like a number (viajeId)
            const lastIsId = /^\d+$/.test(tokens[tokens.length - 1]);
            if (lastIsId && tokens.length >= 5) {
              const viajeId = tokens[tokens.length - 1];
              const moneda = tokens[tokens.length - 2];
              const quienPago = tokens[tokens.length - 3];
              const desc = tokens.slice(1, tokens.length - 3).join(" ");
              args = [tokens[0], desc, quienPago, moneda, viajeId];
            } else {
              const moneda = tokens[tokens.length - 1];
              const quienPago = tokens[tokens.length - 2];
              const desc = tokens.slice(1, tokens.length - 2).join(" ");
              args = [tokens[0], desc, quienPago, moneda];
            }
          } else {
            args = tokens;
          }
          await handleGastoCommand(pool, chatId, fromName, args);
        } else if (trimmed.startsWith("/viajes")) {
          await handleViajesCommand(pool, chatId);
        } else if (trimmed.startsWith("/ayuda") || trimmed.startsWith("/start")) {
          await sendTelegramMessage(chatId, HELP_TEXT);
        }
      }
    } catch (dbErr) {
      console.error("[Telegram] Error procesando update:", dbErr);
      if (chatId) {
        await sendTelegramMessage(chatId, "❌ Ocurrió un error procesando tu mensaje.");
      }
    } finally {
      await pool.end();
    }

    // Telegram necesita un 200 OK para saber que recibiste el mensaje
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en el Webhook:", error);
    return NextResponse.json({ error: "Check logs" }, { status: 500 });
  }
}
