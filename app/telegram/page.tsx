"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "../../src/lib/api";

interface TelegramMessage {
  id: number;
  update_id: number;
  from_id: number;
  from_name: string;
  from_username: string | null;
  chat_id: number;
  chat_type: string;
  text: string | null;
  received_at: string;
}

export default function TelegramPage() {
  const [messages, setMessages] = useState<TelegramMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/telegram/messages"));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setMessages(json.data?.messages ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "1.5rem", fontFamily: "DM Sans, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Mensajes de Telegram</h1>
        <button
          onClick={load}
          style={{ padding: "0.4rem 1rem", background: "#c4714a", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Actualizar
        </button>
      </div>

      {loading && <p style={{ color: "#9c8b79" }}>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && messages.length === 0 && (
        <p style={{ color: "#9c8b79" }}>No hay mensajes todavía.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: "#fdf6ec",
              border: "1px solid #e8d5b7",
              borderRadius: 10,
              padding: "0.875rem 1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <span style={{ fontWeight: 600, color: "#1a1410" }}>
                {msg.from_name}
                {msg.from_username && (
                  <span style={{ fontWeight: 400, color: "#9c8b79" }}> @{msg.from_username}</span>
                )}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#9c8b79" }}>
                {new Date(msg.received_at).toLocaleString("es-AR")}
              </span>
            </div>
            <p style={{ margin: 0, color: "#3d2b1a", whiteSpace: "pre-wrap" }}>
              {msg.text ?? <em style={{ color: "#9c8b79" }}>(sin texto)</em>}
            </p>
            <div style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#9c8b79" }}>
              chat: {msg.chat_id} · {msg.chat_type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
