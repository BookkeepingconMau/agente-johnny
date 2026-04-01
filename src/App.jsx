import { useState } from "react";

export default function App() {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const preguntar = async () => {
    if (!mensaje.trim()) return;
    setCargando(true);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1024,
          messages: [{ role: "user", content: mensaje }]
        })
      });
      const data = await res.json();
      setRespuesta(data.content[0].text);
    } catch (err) {
      setRespuesta("Hubo un error. Intenta de nuevo.");
    }
    setCargando(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "sans-serif"
    }}>
      <img src="/logo-johnny.png" alt="Logo" style={{ width: 120, marginBottom: 16 }} />
      <h1 style={{ color: "#c62828", marginBottom: 8 }}>Agente Contabilizador de Johnny</h1>
      <p style={{ color: "#555", marginBottom: 32 }}>Johnny Bookkeeping Services</p>

      <textarea
        value={mensaje}
        onChange={e => setMensaje(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        rows={4}
        style={{
          width: "100%",
          maxWidth: 600,
          padding: 12,
          borderRadius: 8,
          border: "2px solid #c62828",
          fontSize: 16,
          marginBottom: 16
        }}
      />

      <button
        onClick={preguntar}
        disabled={cargando}
        style={{
          backgroundColor: "#c62828",
          color: "white",
          border: "none",
          padding: "12px 32px",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 24
        }}
      >
        {cargando ? "Pensando..." : "Preguntar"}
      </button>

      {respuesta && (
        <div style={{
          backgroundColor: "white",
          border: "2px solid #c62828",
          borderRadius: 8,
          padding: 20,
          maxWidth: 600,
          width: "100%",
          color: "#333",
          lineHeight: 1.6
        }}>
          {respuesta}
        </div>
      )}
    </div>
  );
}
