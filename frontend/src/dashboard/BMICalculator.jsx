// BMI Calculator Component
// src/dashboard/BMICalculator.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label:"Underweight", color:"#60a5fa", bg:"rgba(96,165,250,0.1)", border:"rgba(96,165,250,0.25)" };
  if (bmi < 25)   return { label:"Normal",      color:"#34d399", bg:"rgba(52,211,153,0.1)", border:"rgba(52,211,153,0.25)" };
  if (bmi < 30)   return { label:"Overweight",  color:"#fbbf24", bg:"rgba(251,191,36,0.1)", border:"rgba(251,191,36,0.25)" };
  return               { label:"Obese",         color:"#f87171", bg:"rgba(248,113,113,0.1)", border:"rgba(248,113,113,0.25)" };
};

export default function BMICalculator() {
  const { user } = useUser();
  const [weight, setWeight]       = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [cm, setCm]               = useState("");
  const [meter, setMeter]         = useState("");
  const [feet, setFeet]           = useState("");
  const [inches, setInches]       = useState("");
  const [result, setResult]       = useState(null);
  const [advice, setAdvice]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");

  const inp = {
    width:"100%", background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.1)", borderRadius:12,
    padding:"13px 16px", color:"white", fontSize:15,
    outline:"none", boxSizing:"border-box", transition:"border-color .2s",
    fontFamily:"inherit"
  };

  // ── Convert weight to kg
  const getWeightKg = () => {
    const w = parseFloat(weight);
    if (!w) return 0;
    return weightUnit === "lbs" ? w * 0.453592 : w;
  };

  // ── Convert height to meters
  const getHeightM = () => {
    if (heightUnit === "cm")    return parseFloat(cm) / 100;
    if (heightUnit === "meter") return parseFloat(meter);
    if (heightUnit === "feet")  return ((parseFloat(feet||0) * 12) + parseFloat(inches||0)) * 0.0254;
    return 0;
  };

  const calculate = async () => {
    setError(""); setAdvice(""); setSaved(false);
    const wKg = getWeightKg();
    const hM  = getHeightM();

    if (!wKg || wKg < 10 || wKg > 500) return setError("⚠️ Valid weight enter karo (10-500)");
    if (!hM  || hM  < 0.5 || hM > 2.8) return setError("⚠️ Valid height enter karo");

    const bmiVal = wKg / (hM * hM);
    const cat    = getBMICategory(bmiVal);

    setResult({
      bmi:      bmiVal.toFixed(2),
      category: cat.label,
      color:    cat.color,
      bg:       cat.bg,
      border:   cat.border,
      weightKg: wKg.toFixed(1),
      heightM:  hM.toFixed(3),
      idealMin: (18.5 * hM * hM).toFixed(1),
      idealMax: (24.9 * hM * hM).toFixed(1),
    });

    // Get AI advice
    setLoading(true);
    try {
      const advRes = await axios.post("/api/ai/advice", {
        bmi: parseFloat(bmiVal.toFixed(2)),
        category: cat.label,
        age: 25,
        gender: "not specified"
      });
      setAdvice(advRes.data.advice || "");
    } catch(e) {
      setAdvice("AI advice load nahi hua. Backend check karo.");
    }

    // Auto-save to MongoDB
    try {
      const saveRes = await axios.post("/api/bmi/save", {
        userId:     user?.id || "anonymous",
        weight:     wKg,
        height:     hM,
        weightUnit: weightUnit,
        heightUnit: heightUnit,
        bmi:        bmiVal.toFixed(2),
        category:   cat.label,
      });
      console.log("BMI Save Response:", saveRes.data);
      if (saveRes.data.status === "saved") setSaved(true);
    } catch(e) {
      console.error("Save error:", e.response?.data || e.message);
    }

    setLoading(false);
  };

  const reset = () => {
    setWeight(""); setCm(""); setMeter(""); setFeet(""); setInches("");
    setResult(null); setAdvice(""); setSaved(false); setError("");
  };

  const pct = result ? Math.min(100, Math.max(0, ((parseFloat(result.bmi)-10)/30)*100)) : 0;

  return (
    <div style={{ maxWidth:640, margin:"0 auto", display:"flex", flexDirection:"column", gap:20, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

      {/* ── Input Card */}
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:28 }}>
        <h2 style={{ fontSize:24, fontWeight:900, marginBottom:6, color:"white" }}>⚡ BMI Calculator</h2>
        <p style={{ color:"#64748b", fontSize:13, marginBottom:24 }}>Multi-unit support — kg, cm, feet & inches</p>

        {/* Weight */}
        <div style={{ marginBottom:18 }}>
          <label style={{ color:"#94a3b8", fontSize:13, fontWeight:600, display:"block", marginBottom:8 }}>Weight</label>
          <div style={{ display:"flex", gap:10 }}>
            <input type="number" placeholder="Enter weight" value={weight}
              onChange={e=>setWeight(e.target.value)} style={{...inp, flex:1}}
              onFocus={e=>e.target.style.borderColor="#34d399"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            <div style={{ display:"flex", gap:6 }}>
              {["kg","lbs"].map(u=>(
                <button key={u} onClick={()=>setWeightUnit(u)} style={{
                  padding:"0 16px", borderRadius:10, fontWeight:700, fontSize:13, border:"none", cursor:"pointer",
                  background: weightUnit===u?"linear-gradient(135deg,#10b981,#0d9488)":"rgba(255,255,255,0.08)",
                  color: weightUnit===u?"white":"#64748b", transition:"all .2s"
                }}>{u}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Height unit selector */}
        <div style={{ marginBottom:14 }}>
          <label style={{ color:"#94a3b8", fontSize:13, fontWeight:600, display:"block", marginBottom:8 }}>Height Unit</label>
          <div style={{ display:"flex", gap:8 }}>
            {[
              {val:"cm",    label:"cm"},
              {val:"meter", label:"meter"},
              {val:"feet",  label:"feet+inches"},
            ].map(u=>(
              <button key={u.val} onClick={()=>setHeightUnit(u.val)} style={{
                flex:1, padding:"10px 8px", borderRadius:10, fontWeight:700, fontSize:12,
                border:"1px solid", cursor:"pointer", transition:"all .2s",
                background: heightUnit===u.val?"linear-gradient(135deg,#10b981,#0d9488)":"rgba(255,255,255,0.04)",
                borderColor: heightUnit===u.val?"transparent":"rgba(255,255,255,0.1)",
                color: heightUnit===u.val?"white":"#64748b"
              }}>{u.label}</button>
            ))}
          </div>
        </div>

        {/* Height input */}
        <div style={{ marginBottom:20 }}>
          <label style={{ color:"#94a3b8", fontSize:13, fontWeight:600, display:"block", marginBottom:8 }}>Height</label>
          {heightUnit === "cm" && (
            <input type="number" placeholder="Height in cm (e.g. 175)" value={cm}
              onChange={e=>setCm(e.target.value)} style={inp}
              onFocus={e=>e.target.style.borderColor="#34d399"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
          )}
          {heightUnit === "meter" && (
            <input type="number" step="0.01" placeholder="Height in meters (e.g. 1.75)" value={meter}
              onChange={e=>setMeter(e.target.value)} style={inp}
              onFocus={e=>e.target.style.borderColor="#34d399"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
          )}
          {heightUnit === "feet" && (
            <div style={{ display:"flex", gap:10 }}>
              <input type="number" placeholder="Feet (e.g. 5)" value={feet}
                onChange={e=>setFeet(e.target.value)} style={{...inp, flex:1}}
                onFocus={e=>e.target.style.borderColor="#34d399"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
              <input type="number" placeholder="Inches (e.g. 8)" value={inches}
                onChange={e=>setInches(e.target.value)} style={{...inp, flex:1}}
                onFocus={e=>e.target.style.borderColor="#34d399"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            </div>
          )}
        </div>

        {error && (
          <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.25)", borderRadius:10, padding:"10px 14px", color:"#f87171", fontSize:13, marginBottom:14 }}>
            {error}
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={calculate} disabled={loading} style={{
            flex:1, background:"linear-gradient(135deg,#10b981,#0d9488)", color:"white",
            padding:"15px", borderRadius:12, fontWeight:800, fontSize:16, border:"none",
            cursor:loading?"not-allowed":"pointer", opacity:loading?.7:1, transition:"all .2s"
          }}>
            {loading ? "⏳ Calculating..." : "⚡ Calculate BMI"}
          </button>
          {result && (
            <button onClick={reset} style={{
              padding:"15px 20px", borderRadius:12, background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8", cursor:"pointer", fontWeight:600
            }}>Reset</button>
          )}
        </div>
      </div>

      {/* ── Result Card */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:28 }}>

            {/* BMI Score */}
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:120}}
                style={{ fontSize:72, fontWeight:900, color:result.color, lineHeight:1 }}>
                {result.bmi}
              </motion.div>
              <div style={{ fontSize:20, fontWeight:700, color:result.color, marginTop:6 }}>{result.category}</div>
              <div style={{ color:"#475569", fontSize:13, marginTop:4 }}>
                Weight: {result.weightKg}kg | Height: {result.heightM}m
              </div>
            </div>

            {/* BMI Scale Bar */}
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#475569", marginBottom:6 }}>
                <span>14</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
              </div>
              <div style={{ height:10, borderRadius:5, overflow:"hidden", background:"rgba(255,255,255,0.06)", position:"relative" }}>
                <div style={{ height:"100%", background:"linear-gradient(90deg,#60a5fa,#34d399,#fbbf24,#f87171)", borderRadius:5 }}/>
                <motion.div initial={{left:0}} animate={{left:`${pct}%`}} transition={{type:"spring",stiffness:60}}
                  style={{ position:"absolute", top:-3, width:16, height:16, borderRadius:"50%",
                    background:result.color, border:"3px solid #07101e", transform:"translateX(-50%)",
                    boxShadow:`0 0 10px ${result.color}` }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#334155", marginTop:4 }}>
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
                <div style={{ color:"#64748b", fontSize:12, marginBottom:4 }}>Ideal Weight Range</div>
                <div style={{ color:"#34d399", fontWeight:800, fontSize:17 }}>{result.idealMin}–{result.idealMax} kg</div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
                <div style={{ color:"#64748b", fontSize:12, marginBottom:4 }}>Your Weight</div>
                <div style={{ color:"white", fontWeight:800, fontSize:17 }}>{result.weightKg} kg</div>
              </div>
            </div>

            {/* Saved badge */}
            {saved && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}}
                style={{ background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.25)", borderRadius:10, padding:"8px 14px", color:"#34d399", fontSize:13, fontWeight:600, textAlign:"center", marginBottom:16 }}>
                ✅ MongoDB mein save ho gaya!
              </motion.div>
            )}

            {/* AI Advice */}
            {advice && (
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.3}}
                style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:14, padding:"18px 20px" }}>
                <div style={{ color:"#818cf8", fontWeight:700, fontSize:15, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                  🤖 AI Health Advice
                </div>
                <div style={{ color:"#cbd5e1", fontSize:13, lineHeight:1.7, whiteSpace:"pre-line" }}>
                  {advice}
                </div>
              </motion.div>
            )}

            {loading && !advice && (
              <div style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:14, padding:"18px 20px", textAlign:"center" }}>
                <div style={{ color:"#818cf8", fontSize:13 }}>🤖 AI advice generate ho raha hai...</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}