// Water Tracker
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GLASS_ML = 250;

export default function WaterTracker() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState(0);
  const [drank, setDrank] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(()=>{
    const saved = localStorage.getItem("waterLog_"+new Date().toDateString());
    if(saved) { const d = JSON.parse(saved); setDrank(d.drank); setLog(d.log); }
  },[]);

  const calcGoal = () => {
    if(!weight) return;
    const g = Math.round(parseFloat(weight) * 35);
    setGoal(g);
  };

  const addWater = (ml) => {
    const newDrank = Math.min(drank + ml, goal || 3000);
    const entry = { time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}), ml };
    const newLog = [entry, ...log];
    setDrank(newDrank); setLog(newLog);
    localStorage.setItem("waterLog_"+new Date().toDateString(), JSON.stringify({drank:newDrank,log:newLog}));
  };

  const reset = () => { setDrank(0); setLog([]); localStorage.removeItem("waterLog_"+new Date().toDateString()); };

  const pct = goal ? Math.min(100, (drank/goal)*100) : 0;
  const glasses = Math.floor(drank / GLASS_ML);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Goal Setup */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <h2 className="text-2xl font-black mb-2 flex items-center gap-2">💧 Water Tracker</h2>
        <p className="text-slate-400 text-sm mb-6">Formula: <strong className="text-blue-400">Weight × 35ml</strong> = Daily water goal</p>
        <div className="flex gap-3">
          <input type="number" className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Your weight in kg" value={weight} onChange={e=>setWeight(e.target.value)}/>
          <button onClick={calcGoal} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all">
            Set Goal
          </button>
        </div>
        {goal>0 && <p className="mt-3 text-blue-400 text-sm font-semibold">💧 Your daily goal: <strong>{goal}ml ({(goal/1000).toFixed(1)}L)</strong></p>}
      </div>

      {/* Water Ring */}
      {goal>0 && (
        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
              <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="8"
                strokeLinecap="round" pathLength="100"
                initial={{strokeDasharray:"0 100"}}
                animate={{strokeDasharray:`${pct} 100`}}
                transition={{duration:0.8,ease:"easeOut"}}
                style={{strokeDashoffset:0}}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-blue-400">{(drank/1000).toFixed(2)}L</div>
              <div className="text-slate-400 text-sm">{Math.round(pct)}% of goal</div>
              <div className="text-slate-500 text-xs mt-1">{glasses} glasses</div>
            </div>
          </div>

          {/* Add Water Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {[150,200,250,350,500].map(ml=>(
              <button key={ml} onClick={()=>addWater(ml)}
                className="px-4 py-2.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded-xl text-sm font-bold hover:bg-blue-500/25 hover:scale-105 transition-all">
                +{ml}ml
              </button>
            ))}
          </div>
          <button onClick={reset} className="text-slate-500 text-sm hover:text-red-400 transition-colors">Reset Today</button>

          {/* Status message */}
          <div className={`mt-5 p-3 rounded-xl text-sm font-semibold ${pct>=100?"bg-emerald-500/15 text-emerald-400 border border-emerald-500/20":pct>=60?"bg-blue-500/15 text-blue-400 border border-blue-500/20":"bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"}`}>
            {pct>=100?"🎉 Goal achieved! Excellent hydration!":pct>=60?"💧 Good progress! Keep drinking!":"⚠️ Drink more water. You're below 60%!"}
          </div>
        </motion.div>
      )}

      {/* Log */}
      {log.length>0 && (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">📋 Today's Log</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {log.map((entry,i)=>(
                <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                  className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0 text-sm">
                  <span className="text-slate-400">💧 {entry.time}</span>
                  <span className="text-blue-400 font-bold">+{entry.ml}ml</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}