// Calorie Calculator
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACTIVITY = [
  { key:"sedentary", label:"Sedentary (No exercise)", mul:1.2 },
  { key:"light", label:"Light (1-3 days/week)", mul:1.375 },
  { key:"moderate", label:"Moderate (3-5 days/week)", mul:1.55 },
  { key:"active", label:"Active (6-7 days/week)", mul:1.725 },
  { key:"veryactive", label:"Very Active (2x/day)", mul:1.9 },
];

export default function CalorieCalc() {
  const [form, setForm] = useState({ age:"", gender:"male", weight:"", height:"", activity:"moderate" });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const { age, gender, weight, height, activity } = form;
    if (!age || !weight || !height) return;
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age);
    // Mifflin-St Jeor Formula
    let bmr = gender === "male"
      ? (10 * w) + (6.25 * h) - (5 * a) + 5
      : (10 * w) + (6.25 * h) - (5 * a) - 161;
    const actMul = ACTIVITY.find(x => x.key === activity)?.mul || 1.55;
    const tdee = bmr * actMul;
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      protein: Math.round(w * 2.2),
      carbs: Math.round((tdee * 0.45) / 4),
      fat: Math.round((tdee * 0.30) / 9),
    });
  };

  const inp = "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-base";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🔥 Calorie Calculator</h2>
        <p className="text-slate-400 text-sm mb-6">Uses <strong className="text-emerald-400">Mifflin-St Jeor Formula</strong> — most accurate BMR calculation.</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">Age</label>
            <input type="number" className={inp} placeholder="25" value={form.age}
              onChange={e=>setForm(f=>({...f,age:e.target.value}))}/>
          </div>
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">Gender</label>
            <div className="flex gap-2">
              {["male","female"].map(g=>(
                <button key={g} onClick={()=>setForm(f=>({...f,gender:g}))}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-bold capitalize transition-all ${form.gender===g?"bg-emerald-500 text-white":"bg-white/[0.06] text-slate-400 hover:bg-white/10"}`}>
                  {g==="male"?"👨 Male":"👩 Female"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">Weight (kg)</label>
            <input type="number" className={inp} placeholder="70" value={form.weight}
              onChange={e=>setForm(f=>({...f,weight:e.target.value}))}/>
          </div>
          <div>
            <label className="text-slate-400 text-sm font-semibold mb-2 block">Height (cm)</label>
            <input type="number" className={inp} placeholder="175" value={form.height}
              onChange={e=>setForm(f=>({...f,height:e.target.value}))}/>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-slate-400 text-sm font-semibold mb-2 block">Activity Level</label>
          <div className="space-y-2">
            {ACTIVITY.map(a=>(
              <button key={a.key} onClick={()=>setForm(f=>({...f,activity:a.key}))}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                  form.activity===a.key?"border-emerald-500/50 bg-emerald-500/10 text-emerald-300":"border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"}`}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={calculate}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all">
          Calculate Calories 🔥
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 space-y-5">
            <h3 className="font-bold text-xl text-white">📊 Your Results</h3>

            {/* Main Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">Basal Metabolic Rate</div>
                <div className="text-3xl font-black text-emerald-400">{result.bmr}</div>
                <div className="text-slate-400 text-xs">kcal/day (at rest)</div>
              </div>
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">Total Daily Energy</div>
                <div className="text-3xl font-black text-teal-400">{result.tdee}</div>
                <div className="text-slate-400 text-xs">kcal/day (with activity)</div>
              </div>
            </div>

            {/* Goals */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                <div className="text-blue-400 text-lg font-black">{result.lose}</div>
                <div className="text-slate-400 text-xs mt-1">Weight Loss</div>
                <div className="text-slate-500 text-xs">-500 kcal</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-emerald-400 text-lg font-black">{result.tdee}</div>
                <div className="text-slate-400 text-xs mt-1">Maintenance</div>
                <div className="text-slate-500 text-xs">Stable weight</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                <div className="text-orange-400 text-lg font-black">{result.gain}</div>
                <div className="text-slate-400 text-xs mt-1">Weight Gain</div>
                <div className="text-slate-500 text-xs">+500 kcal</div>
              </div>
            </div>

            {/* Macros */}
            <div>
              <h4 className="text-slate-300 font-bold mb-3">🥗 Daily Macronutrients</h4>
              <div className="space-y-3">
                {[
                  {label:"Protein",val:result.protein,unit:"g",color:"#60a5fa",pct:30,icon:"🥩"},
                  {label:"Carbohydrates",val:result.carbs,unit:"g",color:"#fbbf24",pct:45,icon:"🍚"},
                  {label:"Fats",val:result.fat,unit:"g",color:"#f87171",pct:25,icon:"🥑"},
                ].map(m=>(
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{m.icon} {m.label}</span>
                      <span className="font-bold" style={{color:m.color}}>{m.val}{m.unit} ({m.pct}%)</span>
                    </div>
                    <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                      <motion.div initial={{width:0}} animate={{width:`${m.pct}%`}} transition={{delay:0.3,duration:0.8}}
                        className="h-full rounded-full" style={{backgroundColor:m.color}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}