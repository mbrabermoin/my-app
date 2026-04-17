import { NextResponse } from "next/server";

const parseIdAllowlist = (rawValue?: string) =>
  new Set(
    (rawValue ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

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
    console.log("Meta:", {
      updateId: body.update_id,
      fromId,
      chatId,
      fromName,
    });

    // Extraemos el texto para el log específico
    console.log(`Mati, ${fromName} escribió: ${text ?? "(sin texto)"}`);

    // Telegram necesita un 200 OK para saber que recibiste el mensaje
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en el Webhook:", error);
    return NextResponse.json({ error: "Check logs" }, { status: 500 });
  }
}
