// Landing Page Component
// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Particle Canvas ─────────────────────────────────────── */
const Particles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      dx: (Math.random() - .5) * .45, dy: (Math.random() - .5) * .45,
      r: Math.random() * 1.6 + .4, o: Math.random() * .45 + .1,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > c.width)  p.dx *= -1;
        if (p.y < 0 || p.y > c.height) p.dy *= -1;
        pts.slice(i + 1, i + 7).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(52,211,153,${.1 * (1 - d / 130)})`;
            ctx.lineWidth = .4;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: .55
    }} />
  );
};

/* ─── BMI Meter ───────────────────────────────────────────── */
const BMIMeter = () => {
  const [bmi, setBmi] = useState(22.4);
  useEffect(() => {
    const t = setInterval(() =>
      setBmi(v => Math.max(14, Math.min(36, v + (Math.random() - .5) * .5))), 1500);
    return () => clearInterval(t);
  }, []);
  const color = bmi < 18.5 ? "#60a5fa" : bmi < 25 ? "#34d399" : bmi < 30 ? "#fbbf24" : "#f87171";
  const label = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal ✓" : bmi < 30 ? "Overweight" : "Obese";
  const angle = ((bmi - 10) / 30) * Math.PI;
  const x2 = 100 + Math.cos(Math.PI - angle) * 72;
  const y2 = 100 - Math.sin(Math.PI - angle) * 72;

  return (
    <div style={{ width: "min(280px, 80vw)", margin: "28px auto 0", userSelect: "none" }}>
      <svg viewBox="0 0 200 115" style={{ width: "100%" }}>
        <defs>
          <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#60a5fa" />
            <stop offset="35%"  stopColor="#34d399" />
            <stop offset="65%"  stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>
        <path d="M28,100 A72,72 0 0,1 172,100" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="14" strokeLinecap="round" />
        <path d="M28,100 A72,72 0 0,1 172,100" fill="none" stroke="url(#mg)" strokeWidth="14" strokeLinecap="round" />
        <motion.line x1="100" y1="100" animate={{ x2, y2 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="7" fill={color} />
        <text x="12"  y="115" fill="#60a5fa" fontSize="7" fontFamily="monospace">Thin</text>
        <text x="78"  y="28"  fill="#34d399" fontSize="7" fontFamily="monospace">Normal</text>
        <text x="156" y="115" fill="#f87171" fontSize="7" fontFamily="monospace">Obese</text>
      </svg>
      <motion.div animate={{ color }}
        style={{ textAlign: "center", fontFamily: "monospace", fontWeight: 900, fontSize: "clamp(36px,8vw,52px)", marginTop: -6 }}>
        {bmi.toFixed(1)}
      </motion.div>
      <motion.div animate={{ color }}
        style={{ textAlign: "center", fontSize: 14, fontWeight: 600, marginTop: 4 }}>
        {label}
      </motion.div>
    </div>
  );
};

/* ─── Data ────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "⚡", title: "BMI Calculator",    desc: "Multi-unit input: kg, cm, feet & inches with instant auto-conversion." },
  { icon: "🤖", title: "AI Health Advisor", desc: "OpenAI-powered personalized diet & workout recommendations." },
  { icon: "💬", title: "AI Chatbot",        desc: "24/7 contextual health assistant powered by GPT-4o." },
  { icon: "📈", title: "Progress Tracking", desc: "Beautiful charts showing your full BMI history over time." },
  { icon: "📄", title: "PDF Reports",       desc: "Download professional health summaries with AI insights." },
  { icon: "💧", title: "Water Tracker",     desc: "Daily hydration goal calculated from your body weight." },
  { icon: "🔥", title: "Calorie Calculator",desc: "Mifflin-St Jeor BMR formula for accurate caloric planning." },
  { icon: "🏋️", title: "Workout Planner",   desc: "AI-generated weekly exercise plans tailored to your BMI." },
];

const STEPS = [
  "Enter weight & height in your preferred units",
  "System auto-converts all units to meters",
  "BMI calculated using WHO standard formula",
  "Category detected: Underweight / Normal / Overweight / Obese",
  "AI generates your personalized health recommendations",
  "All data saved — graphs & dashboard updated instantly",
];

/* ─── Main Component ──────────────────────────────────────── */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ["rgba(7,16,30,0)", "rgba(7,16,30,0.95)"]);

  const W = { // common wrapper style
    maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px)",
    width: "100%",
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#07101e", color: "white", overflowX: "hidden", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>

      <Particles />

      {/* Ambient blobs — full screen */}
      <div style={{ position: "fixed", top: "-15%", left: "-8%", width: "clamp(300px,50vw,700px)", height: "clamp(300px,50vw,700px)", borderRadius: "50%", background: "rgba(52,211,153,0.07)", filter: "blur(120px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "-12%", width: "clamp(250px,40vw,600px)", height: "clamp(250px,40vw,600px)", borderRadius: "50%", background: "rgba(13,148,136,0.05)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── NAVBAR ── */}
      <motion.nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: navBg,
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ ...W, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#34d399,#0d9488)", display: "grid", placeItems: "center", fontWeight: 900, color: "white", fontSize: 16, boxShadow: "0 0 20px rgba(52,211,153,0.3)", flexShrink: 0 }}>H</div>
            <span style={{ fontWeight: 900, fontSize: 20, color: "white" }}>Health<span style={{ color: "#34d399" }}>Pro</span> AI</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
            {["About", "Features", "How It Works", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#34d399"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>{l}</a>
            ))}
          </div>

          {/* CTA */}
          <Link to="/dashboard" style={{
            background: "linear-gradient(135deg,#10b981,#0d9488)", color: "white",
            padding: "9px 22px", borderRadius: 50, fontWeight: 700, fontSize: 14,
            textDecoration: "none", boxShadow: "0 4px 20px rgba(52,211,153,0.25)",
            transition: "transform .2s, box-shadow .2s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(52,211,153,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(52,211,153,0.25)"; }}>
            Get Started →
          </Link>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(16px,4vw,48px) 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", width: "100%" }}>

          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <span style={{
              display: "inline-block", background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.25)", color: "#34d399",
              fontSize: "clamp(10px,1.5vw,12px)", fontWeight: 700,
              padding: "6px 18px", borderRadius: 50, letterSpacing: ".1em",
              textTransform: "uppercase", marginBottom: 28,
            }}>🧬 AI-Powered Health Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .65 }}
            style={{
              fontSize: "clamp(36px,7vw,80px)", fontWeight: 900,
              lineHeight: 1.06, letterSpacing: "-.02em", marginBottom: 24,
            }}>
            Track Your Health<br />
            <span style={{ background: "linear-gradient(135deg,#34d399,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Smartly with AI
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            style={{ color: "#94a3b8", fontSize: "clamp(15px,2vw,19px)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Calculate BMI, get personalized AI health advice, track your progress, and chat with your 24/7 health advisor — all in one platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/dashboard" style={{
              background: "linear-gradient(135deg,#10b981,#0d9488)", color: "white",
              padding: "clamp(12px,2vw,16px) clamp(24px,4vw,40px)",
              borderRadius: 50, fontWeight: 800, fontSize: "clamp(14px,2vw,18px)",
              textDecoration: "none", boxShadow: "0 8px 30px rgba(52,211,153,0.3)",
              transition: "transform .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              🚀 Start Free Now
            </Link>
            <a href="#features" style={{
              border: "1px solid rgba(255,255,255,0.15)", color: "#cbd5e1",
              padding: "clamp(12px,2vw,16px) clamp(24px,4vw,40px)",
              borderRadius: 50, fontWeight: 600, fontSize: "clamp(14px,2vw,18px)",
              textDecoration: "none", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#cbd5e1"; }}>
              Explore Features →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }}>
            <BMIMeter />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 24px", marginTop: 28, fontSize: 12, color: "#475569" }}>
            {["✓ Free to use", "✓ No credit card", "✓ AI Powered", "✓ Secure & private"].map(t => <span key={t}>{t}</span>)}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ ...W }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,60px)" }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, marginBottom: 12 }}>
              What is BMI & <span style={{ color: "#34d399" }}>Why It Matters?</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "clamp(14px,1.8vw,17px)", maxWidth: 580, margin: "0 auto" }}>
              Understanding your body is the foundation of a healthy life.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "clamp(14px,2vw,24px)" }}>
            {[
              { icon: "📊", title: "What is BMI?", desc: "Body Mass Index = Weight(kg) ÷ Height(m)². A WHO-standard measure to screen weight categories in adults — the starting point of every health journey." },
              { icon: "💡", title: "Why Track Health?", desc: "Regular monitoring helps prevent obesity, diabetes, heart disease and lifestyle disorders before they become serious. Early detection = longer life." },
              { icon: "🏆", title: "Why HealthPro AI?", desc: "We combine BMI with AI insights, chatbot support, progress charts, calorie planning and personalized workout plans — not just a calculator." },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * .12 }} viewport={{ once: true }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "clamp(20px,3vw,32px)", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(36px,5vw,52px)", marginBottom: 16 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "clamp(16px,2vw,20px)", marginBottom: 10, color: "white" }}>{c.title}</div>
                <p style={{ color: "#64748b", fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.65 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, marginBottom: 10 }}>
              How It <span style={{ color: "#2dd4bf" }}>Works</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "clamp(13px,1.6vw,16px)" }}>6 simple steps to a smarter, healthier you</p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .08 }} viewport={{ once: true }}
                style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#0d9488)", display: "grid", placeItems: "center", fontWeight: 900, color: "white", fontSize: 14, flexShrink: 0, boxShadow: "0 4px 14px rgba(52,211,153,0.25)" }}>
                  {i + 1}
                </div>
                <span style={{ color: "#cbd5e1", fontSize: "clamp(13px,1.6vw,15px)", lineHeight: 1.5 }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ ...W }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, marginBottom: 10 }}>
              Everything You <span style={{ color: "#34d399" }}>Need</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "clamp(13px,1.6vw,16px)" }}>One platform. All your health tools.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "clamp(12px,2vw,20px)" }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * .06 }} viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(52,211,153,0.1)" }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "clamp(18px,2.5vw,26px)", cursor: "default", transition: "border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(52,211,153,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                <div style={{ fontSize: "clamp(26px,4vw,34px)", marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "clamp(14px,1.8vw,17px)", marginBottom: 8, color: "white" }}>{f.title}</div>
                <p style={{ color: "#64748b", fontSize: "clamp(12px,1.4vw,14px)", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900 }}>
              Why <span style={{ color: "#34d399" }}>HealthPro AI</span> is Different
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: "clamp(20px,3vw,28px)" }}>
              <h3 style={{ fontWeight: 700, color: "#f87171", fontSize: "clamp(16px,2vw,20px)", marginBottom: 20 }}>❌ Normal BMI Apps</h3>
              {["Single unit input only", "No AI explanation", "No history or graphs", "No chatbot support", "Generic advice only", "Outdated boring UI"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 5 ? "1px solid rgba(239,68,68,0.08)" : "none", color: "#64748b", fontSize: "clamp(13px,1.5vw,15px)" }}>
                  <span style={{ color: "#f87171", fontWeight: 700 }}>✗</span>{t}
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "clamp(20px,3vw,28px)" }}>
              <h3 style={{ fontWeight: 700, color: "#34d399", fontSize: "clamp(16px,2vw,20px)", marginBottom: 20 }}>✅ HealthPro AI</h3>
              {["Multi-unit input (kg, cm, feet)", "AI-powered explanations & advice", "Full history + progress graphs", "24/7 AI chatbot support", "Personalized diet + workout plans", "Modern animated beautiful UI"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 5 ? "1px solid rgba(52,211,153,0.08)" : "none", color: "#cbd5e1", fontSize: "clamp(13px,1.5vw,15px)" }}>
                  <span style={{ color: "#34d399", fontWeight: 700 }}>✓</span>{t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, marginBottom: 10 }}>
              Get in <span style={{ color: "#2dd4bf" }}>Touch</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "clamp(13px,1.6vw,16px)", marginBottom: 36 }}>
              Have questions or feedback? Reach out anytime.
            </p>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "clamp(20px,4vw,36px)", textAlign: "left" }}>
              {[
                { ph: "Your Name",    type: "text" },
                { ph: "Your Email",   type: "email" },
              ].map(({ ph, type }, i) => (
                <input key={i} type={type} placeholder={ph} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 16px", color: "white", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#34d399"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              ))}
              <textarea placeholder="Your Message" rows={4} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 16px", color: "white", fontSize: 14, outline: "none", marginBottom: 14, boxSizing: "border-box", resize: "none" }}
                onFocus={e => e.target.style.borderColor = "#34d399"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <button style={{ width: "100%", background: "linear-gradient(135deg,#10b981,#0d9488)", color: "white", padding: 14, borderRadius: 12, fontWeight: 700, border: "none", cursor: "pointer", fontSize: 15, transition: "opacity .2s" }}
                onMouseEnter={e => e.target.style.opacity = ".88"}
                onMouseLeave={e => e.target.style.opacity = "1"}>
                Send Message 📨
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,4vw,40px)", marginTop: 32, flexWrap: "wrap" }}>
              {[["📧", "Email", "mailto:abhinash@email.com"], ["🐙", "GitHub", "https://github.com/abhinash"], ["💼", "LinkedIn", "#"], ["📸", "Instagram", "#"]].map(([ic, lb, hr]) => (
                <a key={lb} href={hr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#475569", textDecoration: "none", fontSize: 12, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#34d399"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}>
                  <span style={{ fontSize: "clamp(20px,3vw,26px)" }}>{ic}</span>{lb}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,48px)" }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: "clamp(16px,2vw,20px)", marginBottom: 4 }}>
              Health<span style={{ color: "#34d399" }}>Pro</span> AI
            </div>
            <div style={{ color: "#334155", fontSize: 12 }}>Smart BMI & AI Health Advisor Pro</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 13, justifyContent: "center" }}>
            {["About", "Features", "GitHub", "LinkedIn", "Instagram"].map(l => (
              <a key={l} href="#" style={{ color: "#475569", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#34d399"}
                onMouseLeave={e => e.target.style.color = "#475569"}>{l}</a>
            ))}
          </div>
          <div style={{ color: "#334155", fontSize: 12 }}>
            Made with ❤️ by <span style={{ color: "#34d399", fontWeight: 700 }}>Abhinash Kumar</span>
          </div>
        </div>
      </footer>

    </div>
  );
}