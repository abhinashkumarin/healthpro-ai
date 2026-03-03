// Main App
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

import LandingPage     from "./pages/LandingPage";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview        from "./dashboard/Overview";
import BMICalculator   from "./dashboard/BMICalculator";
import CalorieCalc     from "./dashboard/CalorieCalc";
import WaterTracker    from "./dashboard/WaterTracker";
import WorkoutPlanner  from "./dashboard/WorkoutPlanner";
import Progress        from "./dashboard/Progress";
import Report          from "./dashboard/Report";
import Settings        from "./dashboard/Settings";

const API_BASE = import.meta.env.VITE_API_URL || "";

// ── Auth page wrapper with dark background
const AuthPage = ({ children }) => (
  <div style={{
    minHeight: "100vh",
    background: "#07101e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Background orbs */}
    <div style={{position:"absolute",top:"-20%",left:"-10%",width:500,height:500,borderRadius:"50%",background:"rgba(52,211,153,0.06)",filter:"blur(100px)",pointerEvents:"none"}}/>
    <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:400,height:400,borderRadius:"50%",background:"rgba(13,148,136,0.05)",filter:"blur(100px)",pointerEvents:"none"}}/>
    {/* Logo top */}
    <div style={{position:"absolute",top:24,left:24,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#34d399,#0d9488)",display:"grid",placeItems:"center",fontWeight:900,fontSize:16,color:"white"}}>H</div>
      <span style={{fontWeight:900,fontSize:18,color:"white",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Health<span style={{color:"#34d399"}}>Pro</span> AI</span>
    </div>
    <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:420}}>
      {children}
    </div>
  </div>
);

// ── Loading spinner
const Loader = () => (
  <div style={{minHeight:"100vh",background:"#07101e",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
    <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#34d399,#0d9488)",display:"grid",placeItems:"center",fontSize:22,fontWeight:900,color:"white",boxShadow:"0 0 30px rgba(52,211,153,0.3)",animation:"pulse 1.5s ease-in-out infinite"}}>H</div>
    <div style={{width:36,height:36,border:"3px solid rgba(52,211,153,0.15)",borderTopColor:"#34d399",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
    <p style={{color:"#475569",fontSize:13}}>Loading HealthPro AI...</p>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100%{box-shadow:0 0 20px rgba(52,211,153,0.2)} 50%{box-shadow:0 0 40px rgba(52,211,153,0.5)} }
    `}</style>
  </div>
);

// ── Protected route
function PrivateRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      axios.post(`${API_BASE}/api/users/sync`, {
        clerkId: user.id,
        name: user.fullName || "User",
        email: user.primaryEmailAddress?.emailAddress || ""
      }).catch(err => console.log("User sync error:", err));
    }
  }, [isSignedIn, user]);

  if (!isLoaded) return <Loader />;
  return isSignedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<AuthPage><SignIn  routing="hash" afterSignInUrl="/dashboard" signUpUrl="/register" /></AuthPage>} />
      <Route path="/register" element={<AuthPage><SignUp  routing="hash" afterSignUpUrl="/dashboard" signInUrl="/login"   /></AuthPage>} />

      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index           element={<Overview />} />
        <Route path="bmi"      element={<BMICalculator />} />
        <Route path="calories" element={<CalorieCalc />} />
        <Route path="water"    element={<WaterTracker />} />
        <Route path="workout"  element={<WorkoutPlanner />} />
        <Route path="progress" element={<Progress />} />
        <Route path="report"   element={<Report />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}