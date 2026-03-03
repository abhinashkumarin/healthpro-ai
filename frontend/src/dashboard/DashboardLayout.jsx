// Dashboard Layout
// src/dashboard/DashboardLayout.jsx
import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "../chatbot/ChatBot";

const SIDEBAR_LINKS = [
  { icon:"🏠", label:"Overview", path:"/dashboard" },
  { icon:"⚡", label:"BMI Calculator", path:"/dashboard/bmi" },
  { icon:"🔥", label:"Calorie Calc", path:"/dashboard/calories" },
  { icon:"💧", label:"Water Tracker", path:"/dashboard/water" },
  { icon:"🏋️", label:"Workout Planner", path:"/dashboard/workout" },
  { icon:"📈", label:"Progress Graph", path:"/dashboard/progress" },
  { icon:"💬", label:"AI Chatbot", path:"/dashboard/chatbot" },
  { icon:"📄", label:"Download Report", path:"/dashboard/report" },
  { icon:"⚙️", label:"Settings", path:"/dashboard/settings" },
];

export default function DashboardLayout() {
  const { user } = useUser();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07101e] text-white flex" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap" rel="stylesheet"/>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"/>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0a1625] border-r border-white/[0.06] flex flex-col transition-transform ${sidebarOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}`}
        transition={{type:"spring",stiffness:300,damping:30}}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center font-black shadow-lg shadow-emerald-500/30">H</div>
            <span className="font-black text-xl">Health<span className="text-emerald-400">Pro</span> AI</span>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 bg-white/[0.04] rounded-xl p-3">
            <img src={user?.imageUrl||"https://i.pravatar.cc/40"} className="w-9 h-9 rounded-full" alt="avatar"/>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">{user?.fullName||"User"}</div>
              <div className="text-xs text-slate-500 truncate">{user?.primaryEmailAddress?.emailAddress}</div>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {SIDEBAR_LINKS.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}
                onClick={()=>setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-600/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}>
                <span className="text-lg">{link.icon}</span>
                {link.label}
                {active && <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"/>}
              </Link>
            );
          })}
        </nav>

        {/* Health Score */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-2">AI Health Score</div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-emerald-400">78%</div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{width:0}} animate={{width:"78%"}} transition={{delay:0.5,duration:0.8}}
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-[#0a1625]/80 backdrop-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button className="lg:hidden text-xl mr-4" onClick={()=>setSidebarOpen(o=>!o)}>☰</button>
          <div>
            <h1 className="font-black text-xl text-white">Dashboard</h1>
            <p className="text-slate-500 text-xs mt-0.5">Welcome back, {user?.firstName||"User"} 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-white/[0.06] grid place-items-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              🔔
            </button>
            <button className="w-9 h-9 rounded-xl bg-white/[0.06] grid place-items-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              🌙
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet/>
        </main>
      </div>

      <ChatBot/>
    </div>
  );
}