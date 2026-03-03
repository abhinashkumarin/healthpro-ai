// User Settings
import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [lang, setLang] = useState("English");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    localStorage.setItem("healthpro_settings", JSON.stringify({lang,darkMode,notifications}));
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  const handleSignOut = () => signOut(()=>navigate("/"));

  const Toggle = ({value, onChange}) => (
    <button onClick={()=>onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors ${value?"bg-emerald-500":"bg-white/20"}`}>
      <motion.div animate={{left:value?"calc(100% - 26px)":"2px"}}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"/>
    </button>
  );

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Profile */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <h2 className="text-2xl font-black mb-6">⚙️ Settings</h2>
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/[0.08]">
          <img src={user?.imageUrl||"https://i.pravatar.cc/80"} className="w-16 h-16 rounded-2xl" alt="avatar"/>
          <div>
            <div className="font-bold text-xl">{user?.fullName||"User"}</div>
            <div className="text-slate-400 text-sm">{user?.primaryEmailAddress?.emailAddress}</div>
            <a href="https://accounts.clerk.dev/user" target="_blank" className="text-emerald-400 text-sm hover:underline mt-1 inline-block">
              Edit Profile →
            </a>
          </div>
        </div>

        <div className="space-y-5">
          {/* Language */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-white">🌐 Language</div>
              <div className="text-slate-400 text-sm">Interface language</div>
            </div>
            <div className="flex gap-2">
              {["English","Hindi"].map(l=>(
                <button key={l} onClick={()=>setLang(l)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${lang===l?"border-emerald-500/50 bg-emerald-500/15 text-emerald-300":"border-white/[0.08] text-slate-400 hover:bg-white/[0.06]"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-white">🌙 Dark Mode</div>
              <div className="text-slate-400 text-sm">Dark theme (recommended)</div>
            </div>
            <Toggle value={darkMode} onChange={setDarkMode}/>
          </div>

          {/* Notifications */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-white">🔔 Notifications</div>
              <div className="text-slate-400 text-sm">Daily health reminders</div>
            </div>
            <Toggle value={notifications} onChange={setNotifications}/>
          </div>
        </div>

        <button onClick={saveSettings}
          className={`w-full mt-6 py-3.5 rounded-xl font-bold transition-all ${saved?"bg-emerald-500/15 border border-emerald-500/30 text-emerald-400":"bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02]"}`}>
          {saved?"✅ Settings Saved!":"Save Settings"}
        </button>
      </div>

      {/* Account Actions */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-lg mb-4">Account</h3>
        <button className="w-full py-3 rounded-xl text-sm font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:bg-white/[0.08] transition-all text-left px-4">
          📊 Export My Data (JSON)
        </button>
        <button className="w-full py-3 rounded-xl text-sm font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:bg-white/[0.08] transition-all text-left px-4">
          🗑️ Delete All BMI Records
        </button>
        <button onClick={handleSignOut}
          className="w-full py-3 rounded-xl text-sm font-bold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 transition-all">
          🚪 Sign Out
        </button>
      </div>

      {/* App Info */}
      <div className="text-center text-slate-500 text-sm">
        HealthPro AI v1.0.0 • Made by <span className="text-emerald-400">Abhinash Kumar</span>
      </div>
    </div>
  );
}
