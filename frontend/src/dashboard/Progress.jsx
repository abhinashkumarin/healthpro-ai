// Progress Graph
// Progress Graph
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const DEMO_DATA = [
  {name:"Jan 1",BMI:28.4},{name:"Jan 8",BMI:28.1},{name:"Jan 15",BMI:27.8},
  {name:"Jan 22",BMI:27.3},{name:"Feb 1",BMI:26.9},{name:"Feb 8",BMI:26.5},
  {name:"Feb 15",BMI:26.1},{name:"Feb 22",BMI:25.7},{name:"Mar 1",BMI:25.2},
  {name:"Mar 8",BMI:24.8},{name:"Mar 15",BMI:24.5},{name:"Mar 22",BMI:24.1},
];

const CustomTooltip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  const bmi = payload[0]?.value;
  const cat = bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese";
  const color = bmi<18.5?"#60a5fa":bmi<25?"#34d399":bmi<30?"#fbbf24":"#f87171";
  return (
    <div className="bg-[#0d1a2b] border border-white/15 rounded-xl p-3 text-sm shadow-2xl">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="font-black text-xl" style={{color}}>BMI: {bmi}</p>
      <p style={{color}} className="font-semibold">{cat}</p>
    </div>
  );
};

export default function Progress() {
  const { user } = useUser();
  const [data, setData] = useState(DEMO_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!user?.id) return;
    setLoading(true);
    axios.get(`/api/bmi/history/${user.id}`).then(r=>{
      // ✅ FIX: Array check add kiya
      const records = Array.isArray(r.data) ? r.data : [];
      if(records.length > 0) {
        const formatted = records.map(d=>({
          name: new Date(d.date).toLocaleDateString("en",{month:"short",day:"numeric"}),
          BMI: parseFloat(d.bmi)
        }));
        setData(formatted);
      }
    }).catch(()=>{}).finally(()=>setLoading(false));
  },[user]);

  // ✅ FIX: Array check for slice/map
  const safeData = Array.isArray(data) ? data : [];
  const latest = safeData.length > 0 ? safeData[safeData.length-1]?.BMI : null;
  const first  = safeData.length > 0 ? safeData[0]?.BMI : null;
  const change = latest && first ? (latest - first).toFixed(1) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black mb-1">📈 Progress Charts</h2>
            <p className="text-slate-400 text-sm">Your BMI journey over time</p>
          </div>
          {change && (
            <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${
              parseFloat(change)<0?"bg-emerald-500/10 border-emerald-500/30 text-emerald-400":"bg-red-500/10 border-red-500/30 text-red-400"}`}>
              {parseFloat(change)<0?"↓":"↑"} {Math.abs(change)} BMI
            </div>
          )}
        </div>

        {/* Line Chart */}
        <div className="mb-8">
          <h3 className="text-slate-300 font-bold text-sm mb-4">BMI Trend Line</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={safeData} margin={{top:5,right:10,bottom:5,left:-10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false}/>
              <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={[14,40]}/>
              <Tooltip content={<CustomTooltip/>}/>
              <ReferenceLine y={18.5} stroke="#60a5fa" strokeDasharray="4 4" label={{value:"Underweight",position:"insideTopRight",fill:"#60a5fa",fontSize:10}}/>
              <ReferenceLine y={25}   stroke="#34d399" strokeDasharray="4 4" label={{value:"Normal",position:"insideTopRight",fill:"#34d399",fontSize:10}}/>
              <ReferenceLine y={30}   stroke="#fbbf24" strokeDasharray="4 4" label={{value:"Overweight",position:"insideTopRight",fill:"#fbbf24",fontSize:10}}/>
              <Line type="monotone" dataKey="BMI" stroke="#34d399" strokeWidth={2.5}
                dot={{fill:"#34d399",r:4,strokeWidth:0}} activeDot={{r:7,fill:"#34d399",stroke:"#07101e",strokeWidth:3}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-slate-300 font-bold text-sm mb-4">BMI Readings (Bar)</h3>
          <ResponsiveContainer width="100%" height={200}>
            {/* ✅ FIX: safeData.slice() use kiya */}
            <BarChart data={safeData.slice(-8)} margin={{top:5,right:10,bottom:5,left:-10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false}/>
              <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={[14,40]}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="BMI" fill="#34d399" radius={[6,6,0,0]} opacity={0.8}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {label:"Starting BMI",val:first?.toFixed(1)||"—",color:"#60a5fa",icon:"🏁"},
          {label:"Current BMI",val:latest?.toFixed(1)||"—",color:"#34d399",icon:"📍"},
          {label:"Total Change",val:change?`${change} BMI`:"—",color:parseFloat(change)<0?"#34d399":"#f87171",icon:parseFloat(change)<0?"📉":"📈"},
        ].map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
            className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-xl font-black mb-1" style={{color:s.color}}>{s.val}</div>
            <div className="text-slate-400 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {safeData === DEMO_DATA && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-300 text-sm text-center">
          ⚠️ Showing demo data. Calculate your BMI to see real progress!
        </div>
      )}
    </div>
  );
}