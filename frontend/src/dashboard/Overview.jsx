// Overview Page
// src/dashboard/Overview.jsx
// Overview Page
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const StatCard = ({ icon, label, value, sub, color, i }) => (
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
    className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:border-white/15 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="text-2xl">{icon}</div>
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/[0.06] text-slate-400">{sub}</span>
    </div>
    <div className="text-3xl font-black mb-1" style={{color}}>{value}</div>
    <div className="text-slate-400 text-sm">{label}</div>
  </motion.div>
);

export default function Overview() {
  const { user } = useUser();
  const [bmiHistory, setBmiHistory] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(()=>{
    if(!user?.id) return;
    axios.get(`/api/bmi/history/${user.id}`).then(r=>{
      // ✅ FIX: Array check add kiya
      const records = Array.isArray(r.data) ? r.data : [];
      setBmiHistory(records);
      if(records.length > 0) {
        setLatest(records[records.length-1]);
      }
    }).catch(()=>{
      setBmiHistory([]);
    });
  },[user]);

  const stats = [
    { icon:"⚡", label:"Latest BMI", value: latest?.bmi||"—", sub: latest?.category||"Not set", color:"#34d399" },
    { icon:"💧", label:"Water Today", value:"2.1L", sub:"Goal: 2.4L", color:"#60a5fa" },
    { icon:"🔥", label:"Calories", value:"1,850", sub:"kcal/day", color:"#fbbf24" },
    { icon:"🏋️", label:"Workouts", value:"5", sub:"This week", color:"#a78bfa" },
  ];

  // ✅ FIX: Array check for slice/map
  const safeHistory = Array.isArray(bmiHistory) ? bmiHistory : [];
  const chartData = safeHistory.slice(-10).map((r)=>({
    name: new Date(r.date).toLocaleDateString("en",{month:"short",day:"numeric"}),
    BMI: parseFloat(r.bmi)
  }));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s,i)=><StatCard key={i} {...s} i={i}/>)}
      </div>

      {/* BMI Progress Chart */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
        className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-6">📈 BMI Progress Over Time</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="name" stroke="#475569" fontSize={11}/>
              <YAxis stroke="#475569" fontSize={11} domain={[14,40]}/>
              <Tooltip contentStyle={{background:"#0d1a2b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"#fff"}}/>
              <Line type="monotone" dataKey="BMI" stroke="#34d399" strokeWidth={2.5}
                dot={{fill:"#34d399",strokeWidth:0,r:4}} activeDot={{r:6,fill:"#34d399"}}/>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-60 flex items-center justify-center text-slate-500 flex-col gap-2">
            <span className="text-4xl">📊</span>
            <span>Calculate your BMI to see progress charts</span>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
        className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-5">⚡ Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {icon:"⚡",label:"Calculate BMI",href:"/dashboard/bmi",color:"from-emerald-500 to-teal-600"},
            {icon:"📄",label:"Download Report",href:"/dashboard/report",color:"from-violet-500 to-purple-600"},
            {icon:"💬",label:"Ask AI Advisor",href:"/dashboard/chatbot",color:"from-blue-500 to-cyan-600"},
          ].map((a,i)=>(
            <a key={i} href={a.href} className={`bg-gradient-to-br ${a.color} p-5 rounded-xl flex items-center gap-3 font-bold hover:scale-105 hover:shadow-xl transition-all`}>
              <span className="text-2xl">{a.icon}</span>{a.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}