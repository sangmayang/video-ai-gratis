"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt) return;
    setLoading(true);
    setVideoUrl("");
    setError("");
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.video?.url) {
        setVideoUrl(data.video.url);
      } else {
        setError("Gagal bikin video, coba lagi. Saldo fal.ai mungkin habis.");
      }
    } catch (e) {
      setError("Error, coba lagi.");
    }
    setLoading(false);
  }

  const contoh = [
    "Kucing oren main bola di pantai saat sunset",
    "Anak naik sepeda di desa, pemandangan gunung",
    "Robot kecil menari di kota Tokyo malam hari",
    "Air terjun di hutan tropis, kabut pagi",
  ];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 32 }}>Video AI Gratisan 🎬</h1>
      <p style={{ color: "#aaa" }}>Ketik prompt -> jadi video. Pake fal.ai (ada saldo gratis awal)</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Contoh: kucing oren main bola di pantai..."
        rows={3}
        style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", background: "#1a1a1a", color: "white", boxSizing: "border-box" }}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0" }}>
        {contoh.map((c) => (
          <button key={c} onClick={() => setPrompt(c)} style={{ padding: "6px 10px", borderRadius: 20, background: "#222", color: "#ddd", border: "1px solid #333", fontSize: 12 }}>
            {c}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={loading} style={{ padding: "14px", background: loading ? "#444" : "white", color: "black", border: "none", borderRadius: 10, width: "100%", fontWeight: "bold", cursor: "pointer" }}>
        {loading ? "Lagi bikin video... tunggu 1-2 menit ⏳" : "Buat Video 🚀"}
      </button>

      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <video src={videoUrl} controls autoPlay loop playsInline style={{ width: "100%", borderRadius: 12 }} />
          <a href={videoUrl} download target="_blank" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#4da3ff" }}>
            Download Video
          </a>
        </div>
      )}

      <p style={{ color: "#666", fontSize: 12, marginTop: 30, textAlign: "center" }}>
        Kalau saldo habis, daftar akun fal.ai baru lagi pakai email lain.
      </p>
    </div>
  );
}
