// Entry Point
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("❌ Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");

// Clerk dark theme appearance
const clerkAppearance = {
  variables: {
    colorPrimary: "#34d399",
    colorBackground: "#0d1a2b",
    colorInputBackground: "rgba(255,255,255,0.06)",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#94a3b8",
    colorDanger: "#f87171",
    colorSuccess: "#34d399",
    borderRadius: "12px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  elements: {
    card:                   "bg-[#0d1a2b] border border-white/10 shadow-2xl rounded-2xl",
    formButtonPrimary:      "bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 font-bold",
    formFieldInput:         "bg-white/5 border-white/10 text-white focus:border-emerald-400",
    socialButtonsBlockButton:"bg-white/5 border-white/10 text-white hover:bg-white/10",
    footerActionLink:       "text-emerald-400 hover:text-emerald-300",
    headerTitle:            "text-white font-black",
    headerSubtitle:         "text-slate-400",
    rootBox:                "w-full",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);