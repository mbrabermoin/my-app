import { NextResponse } from "next/server";
import { Pool } from "pg";

const parseIdAllowlist = (rawValue?: string) =>
  new Set(
    (rawValue ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

type SessionStep =
  | "awaiting_amount"
  | "awaiting_description"
  | "awaiting_paid_by"
  | "awaiting_paid_by_custom"
  | "awaiting_payment_method"
  | "awaiting_currency"
  | "awaiting_trip"
  | "awaiting_confirmation";

type ExpenseSessionData = {
  amount?: number;
  description?: string;
  paidBy?: string;
  paymentMethod?: "efectivo" | "tarjeta";
  exchange?: "pesos" | "reales" | "dolares";
  travelId?: string;
};

type TelegramInlineKeyboardMarkup = {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
};

type SaveExpenseInput = {
  description: string;
  amount: number;
  paidBy: string;
  paymentMethod?: string | null;
  exchange: string;
  travelId: string;
  notes?: string | null;
};

async function sendTelegramApi(method: string, payload: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return null;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error(`[Telegram] ${method} failed:`, err);
    return null;
  });

  if (!response) {
    return null;
  }

  if (!response.ok) {
    const raw = await response.text().catch(() => "");
    console.error(`[Telegram] ${method} returned ${response.status}:`, raw.slice(0, 300));
    return null;
  }

  return response;
}

async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  replyMarkup?: TelegramInlineKeyboardMarkup,
) {
  await sendTelegramApi("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  await sendTelegramApi("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    ...(text ? { text } : {}),
  });
}

async function ensureTelegramSessionTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS telegram_expense_sessions (
      chat_id BIGINT NOT NULL,
      user_id BIGINT NOT NULL,
      step VARCHAR(64) NOT NULL,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (chat_id, user_id)
    );
  `);
}

async function getExpenseSession(pool: Pool, chatId: string, userId: string) {
  const result = await pool.query(
    `SELECT step, data
     FROM telegram_expense_sessions
     WHERE chat_id = $1 AND user_id = $2`,
    [chatId, userId],
  );

  if (result.rowCount === 0) {
    return null;
  }

  const row = result.rows[0] as { step: SessionStep; data: ExpenseSessionData | null };
  return {
    step: row.step,
    data: row.data ?? {},
  };
}

async function saveExpenseSession(
  pool: Pool,
  chatId: string,
  userId: string,
  step: SessionStep,
  data: ExpenseSessionData,
) {
  await pool.query(
    `INSERT INTO telegram_expense_sessions (chat_id, user_id, step, data, updated_at)
     VALUES ($1, $2, $3, $4::jsonb, NOW())
     ON CONFLICT (chat_id, user_id)
     DO UPDATE SET step = EXCLUDED.step, data = EXCLUDED.data, updated_at = NOW()`,
    [chatId, userId, step, JSON.stringify(data ?? {})],
  );
}

async function clearExpenseSession(pool: Pool, chatId: string, userId: string) {
  await pool.query(
    `DELETE FROM telegram_expense_sessions WHERE chat_id = $1 AND user_id = $2`,
    [chatId, userId],
  );
}

function getConfiguredAppsScriptUrl() {
  const candidates = [
    "GOOGLE_APPS_SCRIPT_URL",
    "APPS_SCRIPT_URL",
    "GAS_WEBAPP_URL",
  ] as const;

  for (const key of candidates) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return { url: value.trim(), envKey: key };
    }
  }

  return { url: null, envKey: null };
}

async function syncExpenseToGoogleSheet(payload: {
  date: string;
  description: string;
  exchange: string;
  amount: number;
  paidBy: string;
  paymentMethod?: string | null;
  notes?: string | null;
}) {
  const { url } = getConfiguredAppsScriptUrl();
  if (!url) {
    return {
      ok: false,
      message: "GOOGLE_APPS_SCRIPT_URL no configurada",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await response.text();
    let json: unknown = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        message: `Apps Script HTTP ${response.status}${text ? `: ${String(text).slice(0, 180)}` : ""}`,
      };
    }

    if (json && typeof json === "object" && "error" in json && (json as { error?: string }).error) {
      return {
        ok: false,
        message: (json as { error: string }).error,
      };
    }

    return { ok: true, message: "OK" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

const HELP_TEXT = `<b>Comandos disponibles:</b>

<b>/gasto</b> <code>[monto] [descripcion] [quienPago] [moneda] [viajeId]</code>
Carga rápida en una sola línea.

<b>/nuevo</b>
Carga guiada paso a paso con botones.

📌 <b>Moneda:</b> <code>pesos</code> | <code>reales</code> | <code>dolares</code>
📌 <b>viajeId:</b> número del viaje (opcional, usa el último si lo omitís)

<b>Ejemplo:</b>
<code>/gasto 1500 Almuerzo Mati pesos 6</code>

<b>/viajes</b> — lista los viajes disponibles
<b>/cancel</b> — cancela una carga guiada activa
<b>/ayuda</b> — muestra este mensaje`;

function normalizeExchange(raw: string) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "usd" || value === "dolar" || value === "dolares") {
    return "dolares" as const;
  }
  if (value === "real" || value === "reales") {
    return "reales" as const;
  }
  if (value === "peso" || value === "pesos") {
    return "pesos" as const;
  }
  return null;
}

function currencyKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "Pesos", callback_data: "exp_currency:pesos" },
        { text: "Reales", callback_data: "exp_currency:reales" },
      ],
      [{ text: "Dolares", callback_data: "exp_currency:dolares" }],
      [{ text: "Cancelar", callback_data: "exp_confirm:cancel" }],
    ],
  };
}

function paidByKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "Mati", callback_data: "exp_paid_by:mati" },
        { text: "Juli", callback_data: "exp_paid_by:juli" },
      ],
      [{ text: "Otros", callback_data: "exp_paid_by:otros" }],
      [{ text: "Cancelar", callback_data: "exp_confirm:cancel" }],
    ],
  };
}

function paymentMethodKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "Efectivo", callback_data: "exp_payment:efectivo" },
        { text: "Tarjeta", callback_data: "exp_payment:tarjeta" },
      ],
      [{ text: "Cancelar", callback_data: "exp_confirm:cancel" }],
    ],
  };
}

async function tripKeyboard(pool: Pool): Promise<TelegramInlineKeyboardMarkup | null> {
  const result = await pool.query(
    `SELECT id, destiny FROM public.trips ORDER BY id ASC`,
  );

  if (result.rowCount === 0) {
    return null;
  }

  const rows = result.rows as Array<{ id: number; destiny: string }>;
  return {
    inline_keyboard: [
      ...rows.map((trip) => [{ text: `${trip.id} - ${trip.destiny}`, callback_data: `exp_trip:${trip.id}` }]),
      [{ text: "Cancelar", callback_data: "exp_confirm:cancel" }],
    ],
  };
}

function confirmationKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "Guardar", callback_data: "exp_confirm:save" },
        { text: "Cancelar", callback_data: "exp_confirm:cancel" },
      ],
    ],
  };
}

async function saveExpenseAndSync(pool: Pool, input: SaveExpenseInput) {
  const tripCheck = await pool.query(
    `SELECT id, destiny FROM public.trips WHERE id = $1`,
    [input.travelId],
  );

  if (tripCheck.rowCount === 0) {
    throw new Error(`No existe el viaje con ID ${input.travelId}`);
  }

  const tripName: string = tripCheck.rows[0].destiny;
  const normalizedExchange = normalizeExchange(input.exchange);
  if (!normalizedExchange) {
    throw new Error(`Moneda inválida: ${input.exchange}`);
  }

  const result = await pool.query(
    `INSERT INTO public.expenses (type, amount, responsible, paymentMethod, exchange, travelId, travelDescription, date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
     RETURNING id`,
    [
      input.description.trim(),
      input.amount,
      input.paidBy.trim(),
      input.paymentMethod ? input.paymentMethod.trim() : null,
      normalizedExchange,
      input.travelId,
      tripName,
    ],
  );

  const todayIso = new Date().toISOString().slice(0, 10);
  const sheetSync = await syncExpenseToGoogleSheet({
    date: todayIso,
    description: input.description.trim(),
    exchange: normalizedExchange,
    amount: input.amount,
    paidBy: input.paidBy.trim(),
    paymentMethod: input.paymentMethod ? input.paymentMethod.trim() : null,
    notes: input.notes ?? `Cargado por Telegram (${tripName})`,
  });

  return {
    expenseId: Number(result.rows[0].id),
    tripName,
    exchange: normalizedExchange,
    sheetSync,
  };
}

async function startWizard(pool: Pool, chatId: string, userId: string) {
  await saveExpenseSession(pool, chatId, userId, "awaiting_amount", {});
  await sendTelegramMessage(
    chatId,
    "Perfecto, empecemos. Enviame el monto del gasto (ej: 1500 o 1500.50)",
  );
}

async function handleWizardTextStep(
  pool: Pool,
  chatId: string,
  userId: string,
  fromName: string,
  rawText: string,
) {
  const session = await getExpenseSession(pool, chatId, userId);
  if (!session) {
    return false;
  }

  const text = rawText.trim();
  if (!text) {
    await sendTelegramMessage(chatId, "Necesito un valor válido para continuar.");
    return true;
  }

  if (session.step === "awaiting_amount") {
    const amount = Number.parseFloat(text.replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) {
      await sendTelegramMessage(chatId, "Monto inválido. Probá con un número positivo, por ejemplo: 2500.75");
      return true;
    }

    await saveExpenseSession(pool, chatId, userId, "awaiting_description", {
      ...session.data,
      amount,
    });
    await sendTelegramMessage(chatId, "Genial. Ahora enviame la descripción del gasto.");
    return true;
  }

  if (session.step === "awaiting_description") {
    await saveExpenseSession(pool, chatId, userId, "awaiting_paid_by", {
      ...session.data,
      description: text,
    });
    await sendTelegramMessage(chatId, "Quién pagó? Elegí una opción:", paidByKeyboard());
    return true;
  }

  if (session.step === "awaiting_paid_by_custom") {
    await saveExpenseSession(pool, chatId, userId, "awaiting_payment_method", {
      ...session.data,
      paidBy: text,
    });
    await sendTelegramMessage(chatId, "Elegí el método de pago:", paymentMethodKeyboard());
    return true;
  }

  if (
    session.step === "awaiting_paid_by"
    || session.step === "awaiting_payment_method"
    || session.step === "awaiting_currency"
    || session.step === "awaiting_trip"
    || session.step === "awaiting_confirmation"
  ) {
    await sendTelegramMessage(chatId, "Para este paso usá los botones del mensaje anterior.");
    return true;
  }

  return false;
}

async function handleWizardCallback(
  pool: Pool,
  callbackQueryId: string,
  chatId: string,
  userId: string,
  callbackData: string,
) {
  const session = await getExpenseSession(pool, chatId, userId);
  if (!session) {
    await answerCallbackQuery(callbackQueryId, "No hay una carga activa. Escribí /nuevo");
    return;
  }

  if (callbackData === "exp_confirm:cancel") {
    await clearExpenseSession(pool, chatId, userId);
    await answerCallbackQuery(callbackQueryId, "Carga cancelada");
    await sendTelegramMessage(chatId, "Carga cancelada. Cuando quieras volver a empezar: /nuevo");
    return;
  }

  if (callbackData.startsWith("exp_currency:")) {
    if (session.step !== "awaiting_currency") {
      await answerCallbackQuery(callbackQueryId, "Ese paso ya pasó o todavía no corresponde");
      return;
    }

    const selected = callbackData.split(":")[1] ?? "";
    const exchange = normalizeExchange(selected);
    if (!exchange) {
      await answerCallbackQuery(callbackQueryId, "Moneda inválida");
      return;
    }

    const nextData = {
      ...session.data,
      exchange,
    };
    await saveExpenseSession(pool, chatId, userId, "awaiting_trip", nextData);
    await answerCallbackQuery(callbackQueryId, "Moneda guardada");

    const keyboard = await tripKeyboard(pool);
    if (!keyboard) {
      await clearExpenseSession(pool, chatId, userId);
      await sendTelegramMessage(chatId, "No hay viajes disponibles para asociar el gasto.");
      return;
    }

    await sendTelegramMessage(chatId, "Elegí el viaje:", keyboard);
    return;
  }

  if (callbackData.startsWith("exp_payment:")) {
    if (session.step !== "awaiting_payment_method") {
      await answerCallbackQuery(callbackQueryId, "Ese paso ya pasó o todavía no corresponde");
      return;
    }

    const selected = (callbackData.split(":")[1] ?? "").trim().toLowerCase();
    const paymentMethod = selected === "efectivo" || selected === "tarjeta" ? selected : null;
    if (!paymentMethod) {
      await answerCallbackQuery(callbackQueryId, "Método inválido");
      return;
    }

    await saveExpenseSession(pool, chatId, userId, "awaiting_currency", {
      ...session.data,
      paymentMethod,
    });
    await answerCallbackQuery(callbackQueryId, "Método guardado");
    await sendTelegramMessage(chatId, "Elegí la moneda:", currencyKeyboard());
    return;
  }

  if (callbackData.startsWith("exp_paid_by:")) {
    if (session.step !== "awaiting_paid_by") {
      await answerCallbackQuery(callbackQueryId, "Ese paso ya pasó o todavía no corresponde");
      return;
    }

    const selected = (callbackData.split(":")[1] ?? "").trim().toLowerCase();
    if (selected === "otros") {
      await saveExpenseSession(pool, chatId, userId, "awaiting_paid_by_custom", {
        ...session.data,
      });
      await answerCallbackQuery(callbackQueryId, "Perfecto");
      await sendTelegramMessage(chatId, "Escribí quién pagó (nombre libre).");
      return;
    }

    const mappedPaidBy = selected === "mati" ? "Mati" : selected === "juli" ? "Juli" : null;
    if (!mappedPaidBy) {
      await answerCallbackQuery(callbackQueryId, "Opción inválida");
      return;
    }

    await saveExpenseSession(pool, chatId, userId, "awaiting_payment_method", {
      ...session.data,
      paidBy: mappedPaidBy,
    });
    await answerCallbackQuery(callbackQueryId, "Quién pagó guardado");
    await sendTelegramMessage(chatId, "Elegí el método de pago:", paymentMethodKeyboard());
    return;
  }

  if (callbackData.startsWith("exp_trip:")) {
    if (session.step !== "awaiting_trip") {
      await answerCallbackQuery(callbackQueryId, "Ese paso ya pasó o todavía no corresponde");
      return;
    }

    const travelId = (callbackData.split(":")[1] ?? "").trim();
    if (!travelId) {
      await answerCallbackQuery(callbackQueryId, "Viaje inválido");
      return;
    }

    const check = await pool.query(`SELECT id, destiny FROM public.trips WHERE id = $1`, [travelId]);
    if (check.rowCount === 0) {
      await answerCallbackQuery(callbackQueryId, "Ese viaje no existe");
      return;
    }

    const tripName: string = check.rows[0].destiny;
    const nextData = {
      ...session.data,
      travelId,
    };

    await saveExpenseSession(pool, chatId, userId, "awaiting_confirmation", nextData);
    await answerCallbackQuery(callbackQueryId, "Viaje guardado");

    await sendTelegramMessage(
      chatId,
      `<b>Confirmá el gasto:</b>\n\n📝 ${nextData.description}\n💰 ${Number(nextData.amount ?? 0).toFixed(2)} ${nextData.exchange}\n👤 ${nextData.paidBy}\n💳 ${nextData.paymentMethod}\n✈️ ${tripName}`,
      confirmationKeyboard(),
    );
    return;
  }

  if (callbackData === "exp_confirm:save") {
    if (session.step !== "awaiting_confirmation") {
      await answerCallbackQuery(callbackQueryId, "No hay nada para confirmar");
      return;
    }

    const data = session.data;
    if (!data.amount || !data.description || !data.paidBy || !data.paymentMethod || !data.exchange || !data.travelId) {
      await answerCallbackQuery(callbackQueryId, "Faltan datos en la sesión");
      await sendTelegramMessage(chatId, "No pude confirmar porque faltan datos. Escribí /nuevo para reiniciar.");
      await clearExpenseSession(pool, chatId, userId);
      return;
    }

    const saved = await saveExpenseAndSync(pool, {
      description: data.description,
      amount: Number(data.amount),
      paidBy: data.paidBy,
      paymentMethod: data.paymentMethod,
      exchange: data.exchange,
      travelId: data.travelId,
    });

    await clearExpenseSession(pool, chatId, userId);
    await answerCallbackQuery(callbackQueryId, "Gasto guardado");

    const syncLine = saved.sheetSync.ok
      ? "📄 Sync Sheet: OK"
      : `⚠️ Sync Sheet falló: ${saved.sheetSync.message}`;

    await sendTelegramMessage(
      chatId,
      `✅ <b>Gasto agregado</b> (#${saved.expenseId})\n\n📝 ${data.description}\n💰 ${Number(data.amount).toFixed(2)} ${saved.exchange}\n👤 ${data.paidBy}\n💳 ${data.paymentMethod}\n✈️ ${saved.tripName}\n${syncLine}`,
    );
    return;
  }

  await answerCallbackQuery(callbackQueryId, "Acción no reconocida");
}

async function handleGastoCommand(
  pool: Pool,
  chatId: number | string,
  _fromName: string,
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

  let travelId: string | null = rawViajeId ?? null;
  if (!travelId) {
    const latestTrip = await pool.query(
      `SELECT id FROM public.trips ORDER BY id DESC LIMIT 1`,
    );
    travelId = latestTrip.rows[0]?.id ? String(latestTrip.rows[0].id) : null;
  }

  if (!travelId) {
    await sendTelegramMessage(
      chatId,
      "❌ No hay viajes cargados todavía. Cargá viajes primero.",
    );
    return;
  }

  const saved = await saveExpenseAndSync(pool, {
    description: descripcion.trim(),
    amount,
    paidBy: quienPago.trim(),
    paymentMethod: null,
    exchange,
    travelId,
  });

  const syncLine = saved.sheetSync.ok
    ? "📄 Sync Sheet: OK"
    : `⚠️ Sync Sheet falló: ${saved.sheetSync.message}`;

  await sendTelegramMessage(
    chatId,
    `✅ <b>Gasto agregado</b> (#${saved.expenseId})\n\n📝 ${descripcion}\n💰 ${amount.toFixed(2)} ${saved.exchange}\n👤 ${quienPago}\n✈️ ${saved.tripName}\n${syncLine}`,
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

    const body = await req.json();
    const callbackQuery = body.callback_query;
    const payloadMessage = body.message ?? body.edited_message ?? body.channel_post;

    const text = payloadMessage?.text;
    const fromName = payloadMessage?.from?.first_name ?? callbackQuery?.from?.first_name ?? "Unknown";
    const fromId = payloadMessage?.from?.id ?? callbackQuery?.from?.id;
    const chatId = payloadMessage?.chat?.id ?? callbackQuery?.message?.chat?.id;

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
      return NextResponse.json({ ok: true, ignored: true });
    }

    console.log("--- ¡Mensaje Recibido de Telegram! ---");
    console.log("Meta:", { updateId: body.update_id, fromId, chatId, fromName });
    console.log(`Mati, ${fromName} escribió: ${text ?? "(sin texto)"}`);

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
      await ensureTelegramSessionTable(pool);

      if (payloadMessage) {
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
      }

      if (callbackQuery?.id && chatId && fromId && callbackQuery?.data) {
        await handleWizardCallback(
          pool,
          String(callbackQuery.id),
          String(chatId),
          String(fromId),
          String(callbackQuery.data),
        );
        return NextResponse.json({ ok: true });
      }

      if (text && chatId && fromId) {
        const trimmed = text.trim();
        if (trimmed.startsWith("/gasto") || trimmed.startsWith("/gasto@")) {
          const withoutCmd = trimmed.replace(/^\/gasto(?:@\S+)?\s*/i, "");
          const tokens = withoutCmd.trim().split(/\s+/);
          let args: string[];
          if (tokens.length > 4) {
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
        } else if (trimmed.startsWith("/nuevo")) {
          await startWizard(pool, String(chatId), String(fromId));
        } else if (trimmed.startsWith("/cancel")) {
          await clearExpenseSession(pool, String(chatId), String(fromId));
          await sendTelegramMessage(chatId, "Carga cancelada.");
        } else if (trimmed.startsWith("/viajes")) {
          await handleViajesCommand(pool, chatId);
        } else if (trimmed.startsWith("/ayuda") || trimmed.startsWith("/start")) {
          await sendTelegramMessage(chatId, HELP_TEXT);
        } else {
          const consumedByWizard = await handleWizardTextStep(
            pool,
            String(chatId),
            String(fromId),
            fromName,
            trimmed,
          );
          if (!consumedByWizard) {
            await sendTelegramMessage(
              chatId,
              "No entendí ese mensaje. Probá con /nuevo para carga guiada o /ayuda para ver comandos.",
            );
          }
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en el Webhook:", error);
    return NextResponse.json({ error: "Check logs" }, { status: 500 });
  }
}
