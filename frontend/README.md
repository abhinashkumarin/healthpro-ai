# 🏥 HealthPro AI — Frontend

## Tech Stack
React 18 + Vite + Tailwind CSS + Framer Motion + Clerk Auth

## Quick Start
npm install
npm run dev → http://localhost:5173

## .env Setup
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=https://healthpro-backend-o6bj.onrender.com

## Pages
/ → Landing Page
/login → Clerk Login
/dashboard → Overview
/dashboard/bmi → BMI Calculator
/dashboard/calories → Calorie Calculator  
/dashboard/water → Water Tracker
/dashboard/workout → Workout Planner
/dashboard/progress → Progress Charts
/dashboard/report → Download PDF
/dashboard/settings → Settings

Step 5:
 cd frontend
npm install
npm run dev

# You should see:
# Local: http://localhost:5173
```

### STEP 6 — Test Everything
```
1. Open http://localhost:5173 → Landing page
2. Click "Get Started" → Clerk login opens
3. Login with Google or Email
4. Dashboard opens
5. Click "BMI Calculator" → Enter data → Calculate
6. AI advice appears automatically
7. Click chatbot icon (bottom right) → Ask health question
8. Go to "Download Report" → Fill data → Download PDF
```

### STEP 7 — Deploy (Production)

**MongoDB Atlas (Free Cloud DB):**
```
1. mongodb.com/atlas → Sign up → Create Free Cluster
2. Database Access → Add user (username + password)
3. Network Access → Allow: 0.0.0.0/0
4. Connect → Copy connection string
5. Replace in backend .env: MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/healthpro
```

**Backend → Render.com (Free):**
```
1. github.com → Push backend folder
2. render.com → New Web Service → Connect GitHub
3. Build Command: pip install -r requirements.txt
4. Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
5. Environment Variables:
   MONGODB_URL = mongodb+srv://...
   OPENAI_API_KEY = sk-...
6. Deploy → Copy URL: https://healthpro-backend.onrender.com
```

**Frontend → Vercel.com (Free):**
```
1. Push frontend to GitHub
2. vercel.com → Import project
3. Framework: Vite
4. Environment Variables:
   VITE_CLERK_PUBLISHABLE_KEY = pk_test_...
   VITE_API_URL = https://healthpro-backend.onrender.com
5. Deploy → Your app is live! 🎉
```

---

## 🗂️ Final Folder Structure
```
healthpro-ai/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── LandingPage.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Overview.jsx
│   │   │   ├── BMICalculator.jsx
│   │   │   ├── CalorieCalc.jsx        ← Full code above ✅
│   │   │   ├── WaterTracker.jsx       ← Full code above ✅
│   │   │   ├── WorkoutPlanner.jsx     ← Full code above ✅
│   │   │   ├── Progress.jsx           ← Full code above ✅
│   │   │   ├── Report.jsx             ← Full code above ✅
│   │   │   └── Settings.jsx           ← Full code above ✅
│   │   ├── chatbot/
│   │   │   └── ChatBot.jsx
│   │   ├── utils/
│   │   │   └── bmiUtils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
│
└── backend/
    ├── app/
    │   ├── main.py
    │   ├── core/
    │   │   └── database.py
    │   ├── models/
    │   │   └── schemas.py
    │   └── routes/
    │       ├── users.py
    │       ├── bmi.py
    │       ├── chat.py
    │       ├── ai_routes.py
    │       └── report.py
    ├── requirements.txt
    ├── .env
    └── README.md


    Step 1 — MongoDB Setup:
    # Windows: MongoDB Compass download karo → https://www.mongodb.com/try/download/compass
# Mac/Linux:
brew install mongodb-community
brew services start mongodb-community

# Compass mein connect karo: mongodb://localhost:27017
# Database naam: healthpro
# Collections auto-ban jayenge
```

### Step 2 — Clerk Setup
```
1. https://clerk.com → Sign up → New Application banao
2. "HealthPro AI" naam rakho
3. Google + Email login enable karo
4. Dashboard → API Keys → publishable key copy karo
5. frontend/.env mein paste karo: VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### Step 3 — OpenAI API Key
```
1. https://platform.openai.com → API Keys
2. New key banao → copy karo
3. backend/.env mein: OPENAI_API_KEY=sk-...



Step 7 — Production Deployment
Frontend → Vercel:

npm run build
# Vercel.com → Import project → Add env variables:
# VITE_CLERK_PUBLISHABLE_KEY
# VITE_API_URL=https://your-backend.onrender.com
```

**Backend → Render:**
```
1. render.com → New Web Service → GitHub se connect karo
2. Build Command: pip install -r requirements.txt
3. Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
4. Environment Variables add karo:
   MONGODB_URL=mongodb+srv://... (MongoDB Atlas URL)
   OPENAI_API_KEY=sk-...
```

**MongoDB Atlas (Production):**
```
1. mongodb.com/atlas → Free cluster banao
2. Connection string copy karo
3. Render mein MONGODB_URL set karo


**Step 1 — File save karo:**
```
D:\healthpro-ai\frontend\index.html       ← index.html yahan
D:\healthpro-ai\frontend\public\favicon.svg  ← favicon yahan
```

**Step 2 — Check karo folder structure:**
```
frontend/
├── index.html          ✅ abhi banaya
├── public/
│   └── favicon.svg     ✅ abhi banaya
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env

