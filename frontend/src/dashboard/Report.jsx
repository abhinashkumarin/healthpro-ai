// PDF Report Generator
import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Report() {
  const { user } = useUser();
  const [bmi, setBmi] = useState("");
  const [category, setCategory] = useState("Normal");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const download = async () => {
    if(!bmi||!weight||!height) return alert("Please fill all fields!");
    setLoading(true);
    try {
      const advice = await axios.post(`${API_BASE}/api/ai/advice`, { bmi, category });
      const res = await axios.post(`${API_BASE}/api/report/generate`, {
        name: user?.fullName || "User",
        bmi: parseFloat(bmi),
        category,
        weight: parseFloat(weight),
        height: parseFloat(height),
        advice: advice.data.advice,
        date: new Date().toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"})
      }, { responseType:"blob" });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `HealthPro-Report-${user?.firstName||"User"}.pdf`;
      a.click();
      setDone(true);
    } catch(e) { alert("Error generating report. Ensure backend is running."); }
    setLoading(false);
  };

  const inp = "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors";

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <h2 className="text-2xl font-black mb-2">📄 Download Health Report</h2>
        <p className="text-slate-400 text-sm mb-6">Generate a professional PDF health report with AI recommendations.</p>
        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">Your BMI Score</label>
            <input type="number" step="0.01" className={inp} placeholder="e.g. 24.5" value={bmi}
              onChange={e=>setBmi(e.target.value)}/>
          </div>
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">BMI Category</label>
            <div className="grid grid-cols-2 gap-2">
              {["Underweight","Normal","Overweight","Obese"].map(c=>(
                <button key={c} onClick={()=>setCategory(c)}
                  className={`py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    category===c?"border-emerald-500/50 bg-emerald-500/15 text-emerald-300":"border-white/[0.08] text-slate-400 hover:bg-white/[0.06]"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm font-semibold mb-2 block">Weight (kg)</label>
              <input type="number" className={inp} placeholder="70" value={weight} onChange={e=>setWeight(e.target.value)}/>
            </div>
            <div>
              <label className="text-slate-400 text-sm font-semibold mb-2 block">Height (m)</label>
              <input type="number" step="0.01" className={inp} placeholder="1.75" value={height} onChange={e=>setHeight(e.target.value)}/>
            </div>
          </div>
        </div>
        <button onClick={download} disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-violet-500 to-purple-600 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {loading?(
            <>
              <motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:0.8}} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"/>
              Generating Report...
            </>
          ):"📄 Generate & Download PDF"}
        </button>
      </div>

      {done && (
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-emerald-400 font-bold text-xl mb-2">Report Downloaded!</h3>
          <p className="text-slate-400 text-sm">Check your downloads folder for your HealthPro AI health report.</p>
          <button onClick={()=>setDone(false)} className="mt-4 text-slate-400 text-sm hover:text-white transition-colors">
            Generate Another →
          </button>
        </motion.div>
      )}

      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">📋 Report Includes</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "👤 Personal Details","⚡ BMI Score & Category",
            "📏 Height & Weight","🎯 Ideal Weight Range",
            "🤖 AI Recommendations","🥗 Diet Suggestions",
            "🏋️ Workout Plan","📅 Report Date"
          ].map((item,i)=>(
            <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
              <span className="text-emerald-400">✓</span>{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}