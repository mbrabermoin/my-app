/**
 * Script para probar el webhook de Telegram localmente.
 * Uso:
 *   node scripts/test-telegram.mjs
 *   node scripts/test-telegram.mjs "hola mundo"
 *   node scripts/test-telegram.mjs "/gasto 500 comida"
 */

const text = process.argv[2] ?? "Mensaje de prueba";

const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "http://localhost:3000/api/telegram/webhook";
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET ?? ""; // dejar vacío si no tenés secret seteado en .env.local

const payload = {
  update_id: Math.floor(Math.random() * 1_000_000),
  message: {
    message_id: Math.floor(Math.random() * 10_000),
    from: {
      id: 123456789,
      first_name: "Matias",
      username: "mbrab",
    },
    chat: {
      id: 123456789,
      type: "private",
    },
    date: Math.floor(Date.now() / 1000),
    text,
  },
};

const headers = {
  "Content-Type": "application/json",
  ...(SECRET ? { "x-telegram-bot-api-secret-token": SECRET } : {}),
};

console.log(`→ POST ${WEBHOOK_URL}`);
console.log(`→ Mensaje: "${text}"\n`);

const res = await fetch(WEBHOOK_URL, {
  method: "POST",
  headers,
  body: JSON.stringify(payload),
});

const json = await res.json().catch(() => null);
console.log(`← Status: ${res.status}`);
console.log("← Body:", json);
