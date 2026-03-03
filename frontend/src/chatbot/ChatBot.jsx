// AI ChatBot Component
// src/chatbot/ChatBot.jsx
import { useState, useRef, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// ── Format message text with proper styling
const MessageText = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div style={{ fontSize: 13, lineHeight: 1.65 }}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} style={{ height: 6 }} />;

        // Bold headers with **
        if (trimmed.includes('**')) {
          const parts = trimmed.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={i} style={{ marginBottom: 3 }}>
              {parts.map((part, j) =>
                j % 2 === 1
                  ? <strong key={j} style={{ color: '#34d399', fontWeight: 700 }}>{part}</strong>
                  : <span key={j}>{part}</span>
              )}
            </div>
          );
        }
        // Bullet points
        if (trimmed.startsWith('•')) {
          return (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3, paddingLeft: 4 }}>
              <span style={{ color: '#34d399', flexShrink: 0 }}>•</span>
              <span style={{ color: '#cbd5e1' }}>{trimmed.slice(1).trim()}</span>
            </div>
          );
        }
        // Italic _text_
        if (trimmed.startsWith('_') && trimmed.endsWith('_')) {
          return (
            <div key={i} style={{ color: '#64748b', fontStyle: 'italic', marginBottom: 3, paddingLeft: 8 }}>
              {trimmed.slice(1, -1)}
            </div>
          );
        }
        // Normal line
        return (
          <div key={i} style={{ marginBottom: 3, color: '#e2e8f0' }}>{trimmed}</div>
        );
      })}
    </div>
  );
};

// ── Typing dots
const TypingDots = () => (
  <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 2px' }}>
    {[0, 1, 2].map(i => (
      <motion.div key={i}
        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
    ))}
    <span style={{ color: '#475569', fontSize: 12, marginLeft: 4 }}>Thinking...</span>
  </div>
);

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content: "👋 **Namaste! Main hoon HealthPro AI!**\n\nAapka personal health advisor — 24/7 available! 🤖\n\nKuch examples:\n• _\"Mera BMI 27 hai, kya karu?\"_\n• _\"Weight loss diet batao\"_\n• _\"70kg ke liye kitna pani?\"_\n• _\"Beginners workout plan do\"_\n\n💪 Koi bhi health question poocho!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, {
        message: userMsg.content,
        history: msgs.slice(-6),
        userId: "user"
      });
      setMsgs(m => [...m, { role: "assistant", content: res.data.reply }]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMsgs(m => [...m, {
        role: "assistant",
        content: "⚠️ **Connection Error**\n\n• Backend server check karo\n• https://healthpro-backend-o6bj.onrender.com running hai?\n• Dobara try karo!"
      }]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    "Mera BMI 27 hai?",
    "Weight loss tips",
    "Daily water intake",
    "Workout plan do",
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          width: 58, height: 58, borderRadius: "50%",
          background: open ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#10b981,#0d9488)",
          border: "none", cursor: "pointer", fontSize: 24,
          display: "grid", placeItems: "center",
          boxShadow: open ? "0 8px 30px rgba(239,68,68,0.4)" : "0 8px 30px rgba(52,211,153,0.4)",
          transition: "background .3s, box-shadow .3s"
        }}>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: .2 }}>
          {open ? "✕" : "🤖"}
        </motion.span>
        {/* Unread badge */}
        {unread > 0 && !open && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{
              position: "absolute", top: -4, right: -4, width: 20, height: 20,
              background: "#f87171", borderRadius: "50%", fontSize: 11,
              fontWeight: 700, color: "white", display: "grid", placeItems: "center",
              border: "2px solid #07101e"
            }}>
            {unread}
          </motion.div>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!open && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              position: "fixed", bottom: 34, right: 90, zIndex: 999,
              background: "rgba(13,26,43,0.95)", border: "1px solid rgba(52,211,153,0.3)",
              color: "white", fontSize: 12, padding: "8px 14px", borderRadius: 20,
              fontWeight: 600, whiteSpace: "nowrap",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
            💬 AI Health Advisor
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: .93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: .93 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "fixed", bottom: 94, right: 24, zIndex: 999,
              width: "min(400px, calc(100vw - 32px))",
              height: "min(580px, calc(100vh - 120px))",
              background: "#0a1628",
              border: "1px solid rgba(52,211,153,0.15)",
              borderRadius: 22,
              display: "flex", flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(52,211,153,0.05)"
            }}>

            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(13,148,136,0.08))",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg,#34d399,#0d9488)",
                  display: "grid", placeItems: "center", fontSize: 20,
                  boxShadow: "0 0 16px rgba(52,211,153,0.3)"
                }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "white" }}>AI Health Advisor</div>
                  <div style={{ fontSize: 11, color: "#34d399", display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
                    Online • Always Available
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer",
                color: "#64748b", fontSize: 16, width: 30, height: 30,
                borderRadius: "50%", display: "grid", placeItems: "center",
                transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#64748b"; }}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .25 }}
                  style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>

                  {/* AI Avatar */}
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#34d399,#0d9488)", display: "grid", placeItems: "center", fontSize: 14, flexShrink: 0, marginBottom: 2 }}>🤖</div>
                  )}

                  <div style={{
                    maxWidth: "82%",
                    padding: m.role === "user" ? "10px 14px" : "12px 15px",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: m.role === "user"
                      ? "linear-gradient(135deg,#10b981,#0d9488)"
                      : "rgba(255,255,255,0.06)",
                    border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    boxShadow: m.role === "user" ? "0 4px 15px rgba(16,185,129,0.25)" : "none"
                  }}>
                    {m.role === "user"
                      ? <div style={{ fontSize: 13, color: "white", lineHeight: 1.5 }}>{m.content}</div>
                      : <MessageText text={m.content} />
                    }
                  </div>

                  {/* User Avatar */}
                  {m.role === "user" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0, marginBottom: 2, fontWeight: 700, color: "white" }}>U</div>
                  )}
                </motion.div>
              ))}

              {/* Loading */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#34d399,#0d9488)", display: "grid", placeItems: "center", fontSize: 14 }}>🤖</div>
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px", padding: "12px 16px" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            {msgs.length <= 1 && (
              <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    style={{
                      background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
                      color: "#34d399", fontSize: 11, padding: "5px 10px", borderRadius: 20,
                      cursor: "pointer", fontWeight: 600, transition: "all .2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(52,211,153,0.15)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(52,211,153,0.08)"}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "12px 14px",
              display: "flex", gap: 8, alignItems: "flex-end",
              background: "rgba(0,0,0,0.2)"
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="BMI, diet, workout ke baare mein poocho..."
                rows={1}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
                  padding: "10px 14px", color: "white", fontSize: 13, outline: "none",
                  resize: "none", fontFamily: "inherit", lineHeight: 1.5,
                  transition: "border-color .2s", maxHeight: 80
                }}
                onFocus={e => e.target.style.borderColor = "#34d399"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <motion.button onClick={send} disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: .92 }}
                style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: input.trim() ? "linear-gradient(135deg,#10b981,#0d9488)" : "rgba(255,255,255,0.06)",
                  border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
                  display: "grid", placeItems: "center", fontSize: 17,
                  transition: "all .2s", flexShrink: 0,
                  boxShadow: input.trim() ? "0 4px 15px rgba(16,185,129,0.3)" : "none"
                }}>
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: .7 }}
                    style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "white", borderRadius: "50%" }} />
                ) : "➤"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}