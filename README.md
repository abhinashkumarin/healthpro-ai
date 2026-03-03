# 🏥 HealthPro AI — AI-Powered Health Platform

<div align="center">

![HealthPro AI](https://img.shields.io/badge/HealthPro-AI-emerald?style=for-the-badge&logo=health&logoColor=white)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)
![Groq AI](https://img.shields.io/badge/Groq-LLaMA_70B-orange?style=for-the-badge)

**Track Your Health Smartly with AI** 🚀

[🌐 Live Demo](https://healthpro-ai.vercel.app) • [📦 GitHub](https://github.com/abhinashkumarin/healthpro-ai) • [🔧 Backend API](https://healthpro-backend-o6bj.onrender.com/docs)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live URLs](#-live-urls)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Project Flow Diagram](#-project-flow-diagram)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Feature Testing Guide](#-feature-testing-guide)
- [Database Schema](#-database-schema)
- [Deployment Guide](#-deployment-guide)

---

## 🎯 Project Overview

**HealthPro AI** ek complete AI-powered health tracking platform hai jo users ko apni health monitor karne, personalized AI advice lene, aur health goals achieve karne mein madad karta hai.

### 🌟 Key Highlights:
- **Real-time AI Health Advice** — Groq LLaMA 3.3 70B model (FREE)
- **Web Search Integration** — DuckDuckGo + Wikipedia se latest health data
- **Multi-language Support** — Hindi, English, Hinglish
- **Complete Health Suite** — BMI, Calories, Water, Workout, Progress
- **Secure Authentication** — Clerk Auth
- **Cloud Database** — MongoDB Atlas
- **100% Free Deployment** — Vercel + Render

---

## 🌐 Live URLs

| Service | URL |
|---------|-----|
| 🌐 Frontend | https://healthpro-ai.vercel.app |
| ⚙️ Backend API | https://healthpro-backend-o6bj.onrender.com |
| 📚 API Docs | https://healthpro-backend-o6bj.onrender.com/docs |
| 🗄️ Database | MongoDB Atlas (Cloud) |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.0 | UI Framework |
| Vite | 5.0 | Build Tool |
| Tailwind CSS | 3.0 | Styling |
| Framer Motion | 11.0 | Animations |
| Recharts | 2.0 | Data Charts |
| Axios | 1.6 | HTTP Requests |
| Clerk | 4.0 | Authentication |
| React Router | 6.0 | Navigation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.111 | API Framework |
| Python | 3.11 | Language |
| Motor | 3.3.2 | Async MongoDB |
| PyMongo | 4.6.1 | MongoDB Driver |
| Groq SDK | 0.9.0 | AI (LLaMA 70B) |
| OpenAI SDK | 1.14.0 | AI Fallback |
| HTTPX | 0.27.0 | Web Search |
| ReportLab | 4.2.0 | PDF Generation |
| Pydantic | 2.7.1 | Data Validation |

### Database & Services
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Cloud Database |
| Groq API | Free AI (LLaMA 3.3 70B) |
| OpenAI API | AI Fallback (GPT-3.5) |
| Clerk | User Authentication |
| DuckDuckGo API | Web Search |
| Wikipedia API | Health Data |

---

## ✨ Features

### 1. ⚡ BMI Calculator
- **Multi-unit support** — kg/cm, lbs/ft+inches, meters
- **Real-time calculation** — Mifflin-St Jeor formula
- **Visual BMI scale** — Animated color bar
- **Categories** — Underweight, Normal, Overweight, Obese
- **Ideal weight range** calculation
- **Auto-save** to MongoDB
- **AI health advice** after calculation

### 2. 🔥 Calorie Calculator
- **BMR calculation** — Basal Metabolic Rate
- **TDEE calculation** — Total Daily Energy Expenditure
- **Activity levels** — Sedentary to Very Active (5 levels)
- **Weight goals** — Loss (-500 kcal), Maintenance, Gain (+500 kcal)
- **Macronutrients** — Protein, Carbs, Fats breakdown
- **Gender-specific** formulas

### 3. 💧 Water Tracker
- **Weight-based goal** — 35ml per kg body weight
- **Multiple intake options** — +150ml, +200ml, +250ml, +350ml, +500ml
- **Circular progress ring** — Visual tracking
- **Today's log** — Time-stamped entries
- **Smart alerts** — Warning below 60% goal
- **Daily reset** functionality

### 4. 🏋️ Workout Planner
- **7-day plans** — Based on BMI category
- **4 categories** — Underweight, Normal, Overweight, Obese
- **Daily workouts** — Specific exercises with sets/reps
- **AI Personalized Plan** — Real AI-generated custom plans
- **Exercise variety** — Cardio, Strength, HIIT, Yoga

### 5. 📈 Progress Charts
- **BMI Trend Line** — Historical BMI data
- **Bar Chart** — Visual BMI readings
- **Hover tooltips** — Date + BMI details
- **Category indicators** — Color-coded zones
- **Statistics** — Starting, Current, Change

### 6. 💬 AI Chatbot
- **Real AI** — Groq LLaMA 3.3 70B model
- **Web search** — DuckDuckGo + Wikipedia integration
- **Multi-language** — Hindi, English, Hinglish
- **Formatted responses** — Emojis, bullets, bold text
- **Quick questions** — Pre-set health queries
- **24/7 available** — Always online
- **Chat history** — Saved to MongoDB

### 7. 📄 PDF Report
- **Personalized report** — User health data
- **BMI analysis** — Detailed breakdown
- **AI recommendations** — Included in PDF
- **One-click download** — Instant PDF

### 8. ⚙️ Settings
- **Language preference** — Hindi/English
- **Dark mode** toggle
- **Notifications** settings
- **Profile management**

### 9. 🔐 Authentication (Clerk)
- **Email signup/login**
- **Social login** (Google)
- **Secure sessions**
- **User profile management**

---

## 🔄 How It Works

```
User Opens App
      ↓
Landing Page → "Get Started"
      ↓
Clerk Authentication (Login/Signup)
      ↓
Dashboard
      ↓
┌─────────────────────────────────────┐
│                                     │
│  BMI Calculator → FastAPI Backend   │
│        ↓                            │
│  Groq AI → LLaMA 70B Model          │
│        ↓                            │
│  Web Search (DuckDuckGo/Wikipedia)  │
│        ↓                            │
│  AI Response Generated              │
│        ↓                            │
│  Data Saved → MongoDB Atlas         │
│        ↓                            │
│  Charts Updated                     │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Project Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    HEALTHPRO AI                          │
│                                                          │
│  ┌─────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │  React  │───▶│  Vite    │───▶│  Vercel (Deploy) │   │
│  │Frontend │    │  Build   │    │ healthpro-ai.app  │   │
│  └────┬────┘    └──────────┘    └──────────────────┘   │
│       │                                                  │
│       │ API Calls (/api/*)                               │
│       ▼                                                  │
│  ┌─────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │ FastAPI │───▶│  Python  │───▶│ Render (Deploy)  │   │
│  │Backend  │    │  3.11    │    │ onrender.com     │   │
│  └────┬────┘    └──────────┘    └──────────────────┘   │
│       │                                                  │
│  ┌────┴──────────────────────────────────┐              │
│  │                                       │              │
│  ▼                    ▼                  ▼              │
│ ┌──────┐        ┌──────────┐      ┌──────────┐         │
│ │Groq  │        │ MongoDB  │      │  Web     │         │
│ │AI    │        │  Atlas   │      │ Search   │         │
│ │LLaMA │        │ Database │      │DuckDuckGo│         │
│ │ 70B  │        │          │      │Wikipedia │         │
│ └──────┘        └──────────┘      └──────────┘         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
healthpro-ai/
├── 📁 backend/
│   ├── 📁 app/
│   │   ├── 📁 core/
│   │   │   └── 📄 database.py          # MongoDB connection
│   │   ├── 📁 models/
│   │   │   └── 📄 schemas.py           # Pydantic models
│   │   ├── 📁 routes/
│   │   │   ├── 📄 bmi.py               # BMI save/fetch API
│   │   │   ├── 📄 chat.py              # AI Chatbot API
│   │   │   ├── 📄 ai_routes.py         # AI Health Advice API
│   │   │   ├── 📄 report.py            # PDF Report API
│   │   │   └── 📄 users.py             # User management API
│   │   └── 📄 main.py                  # FastAPI app entry point
│   ├── 📄 requirements.txt             # Python dependencies
│   ├── 📄 runtime.txt                  # Python version (3.11.0)
│   └── 📄 .env                         # Environment variables
│
├── 📁 frontend/
│   ├── 📁 public/
│   │   └── 📄 favicon.svg
│   ├── 📁 src/
│   │   ├── 📁 chatbot/
│   │   │   └── 📄 ChatBot.jsx          # AI Chatbot component
│   │   ├── 📁 dashboard/
│   │   │   ├── 📄 DashboardLayout.jsx  # Main layout
│   │   │   ├── 📄 Overview.jsx         # Dashboard home
│   │   │   ├── 📄 BMICalculator.jsx    # BMI Calculator
│   │   │   ├── 📄 CalorieCalc.jsx      # Calorie Calculator
│   │   │   ├── 📄 WaterTracker.jsx     # Water Tracker
│   │   │   ├── 📄 WorkoutPlanner.jsx   # Workout Planner
│   │   │   ├── 📄 Progress.jsx         # Progress Charts
│   │   │   ├── 📄 Report.jsx           # PDF Report
│   │   │   └── 📄 Settings.jsx         # User Settings
│   │   ├── 📁 pages/
│   │   │   └── 📄 LandingPage.jsx      # Landing page
│   │   ├── 📁 utils/
│   │   │   └── 📄 bmiUtils.js          # BMI utility functions
│   │   ├── 📄 App.jsx                  # Main app + routing
│   │   ├── 📄 main.jsx                 # React entry point
│   │   └── 📄 index.css                # Global styles
│   ├── 📄 vercel.json                  # Vercel routing config
│   ├── 📄 vite.config.js               # Vite configuration
│   ├── 📄 tailwind.config.js           # Tailwind config
│   ├── 📄 package.json                 # NPM dependencies
│   └── 📄 .env                         # Frontend env variables
│
├── 📄 .gitignore
└── 📄 README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
```
✅ Node.js v18+
✅ Python 3.11+
✅ MongoDB (local or Atlas)
✅ Git
```

### 1. Clone Repository
```bash
git clone https://github.com/abhinashkumarin/healthpro-ai.git
cd healthpro-ai
```

### 2. Backend Setup
```bash
cd backend

# Virtual environment banao
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Dependencies install karo
pip install -r requirements.txt

# .env file banao
cp .env.example .env
# Keys add karo

# Backend start karo
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend

# Dependencies install karo
npm install

# .env file banao
cp .env.example .env
# Keys add karo

# Frontend start karo
npm run dev
```

### 4. Open App
```
Frontend: http://localhost:5173
Backend:  http://localhost:8000
API Docs: http://localhost:8000/docs
```

---

## 🔑 Environment Variables

### Backend `.env`
```env
MONGODB_URL=mongodb://localhost:27017
# Ya MongoDB Atlas URL:
# MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/healthpro

GROQ_API_KEY=gsk_your_groq_key_here
OPENAI_API_KEY=sk-proj-your_openai_key_here
```

### Frontend `.env`
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
VITE_API_URL=http://localhost:8000
# Production:
# VITE_API_URL=https://healthpro-backend-o6bj.onrender.com
```

---

## 📡 API Endpoints

### BMI Routes (`/api/bmi`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bmi/save` | BMI data save karo |
| GET | `/api/bmi/history/{userId}` | BMI history fetch karo |
| GET | `/api/bmi/latest/{userId}` | Latest BMI fetch karo |
| DELETE | `/api/bmi/clear/{userId}` | BMI records delete karo |

### AI Routes (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/advice` | BMI-based AI advice |

### Chat Routes (`/api/chat`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | AI chatbot message |
| GET | `/api/chat/history/{userId}` | Chat history |

### Report Routes (`/api/report`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/report/generate` | PDF report generate |

---

## 🧪 Feature Testing Guide

### Test 1: BMI Calculator
```
1. Dashboard → "BMI Calculator"
2. Weight: 70 kg
3. Height: 175 cm
4. "Calculate BMI" click karo

Expected Output:
✅ BMI: 22.86
✅ Category: Normal
✅ Ideal range: 56.5 - 76.2 kg
✅ AI advice generate hogi
✅ MongoDB mein save hoga
✅ "✅ MongoDB mein save ho gaya!" message
```

### Test 2: Calorie Calculator
```
1. Dashboard → "Calorie Calc"
2. Age: 25, Gender: Male
3. Weight: 70 kg, Height: 175 cm
4. Activity: Moderate

Expected Output:
✅ BMR: ~1,750 kcal
✅ TDEE: ~2,700 kcal
✅ Weight Loss: ~2,200 kcal
✅ Protein/Carbs/Fats breakdown
```

### Test 3: Water Tracker
```
1. Dashboard → "Water Tracker"
2. Weight: 70 kg → "Set Goal"

Expected Output:
✅ Goal: 2,450 ml (70 × 35ml)
3. "+250ml" 5 baar click karo
✅ 1,250 ml tracked
✅ ~51% of goal
✅ Today's log mein entries
```

### Test 4: Workout Planner
```
1. Dashboard → "Workout Planner"
2. "Overweight" select karo

Expected Output:
✅ 7-day Fat Loss Plan
✅ Monday: 30 min brisk walk
✅ Tuesday: Bodyweight Squats 3×15
3. "Get AI Personalized Plan" click karo
✅ Real AI-generated plan
```

### Test 5: Progress Charts
```
1. Pehle 2-3 BMI calculations karo
2. Dashboard → "Progress Graph"

Expected Output:
✅ BMI Trend Line chart
✅ Bar Chart with readings
✅ Starting/Current BMI stats
✅ Hover tooltips with details
```

### Test 6: AI Chatbot
```
1. Bottom-right 🤖 button click karo
2. Message bhejo:
   "Mera BMI 25 hai, weight loss ke liye 
    complete diet plan do"

Expected Output:
✅ Groq AI se detailed response
✅ Weekly diet plan
✅ Calorie breakdown
✅ Hindi/Hinglish mein reply
✅ Emojis + formatted text
```

### Test 7: PDF Report
```
1. Dashboard → "Download Report"
2. BMI: 22.86, Category: Normal
3. "Generate & Download PDF" click karo

Expected Output:
✅ PDF file download hogi
✅ Health data included
✅ AI recommendations
```

### Test 8: MongoDB Verification
```
MongoDB Compass open karo:
healthpro → bmi_records

Expected Documents:
{
  userId: "user_xxx",
  weight: 70,
  height: 1.75,
  bmi: "22.86",
  category: "Normal",
  date: ISODate("2026-03-03...")
}

healthpro → chat_history
{
  userId: "user",
  message: "...",
  response: "...",
  provider: "groq",
  timestamp: ISODate("...")
}
```

---

## 🗄️ Database Schema

### Collection: `bmi_records`
```json
{
  "_id": "ObjectId",
  "userId": "string",
  "weight": "number (kg)",
  "height": "number (meters)",
  "weightUnit": "string",
  "heightUnit": "string",
  "bmi": "string",
  "category": "string",
  "age": "number (optional)",
  "gender": "string (optional)",
  "date": "ISODate"
}
```

### Collection: `chat_history`
```json
{
  "_id": "ObjectId",
  "userId": "string",
  "message": "string",
  "response": "string",
  "provider": "groq | openai",
  "webData": "boolean",
  "timestamp": "ISODate"
}
```

### Collection: `users`
```json
{
  "_id": "ObjectId",
  "clerkId": "string",
  "email": "string",
  "name": "string",
  "createdAt": "ISODate"
}
```

---

## 🌐 Deployment Guide

### Frontend → Vercel
```bash
# 1. vercel.com → New Project
# 2. GitHub repo import
# 3. Settings:
#    Framework: Vite
#    Root Directory: frontend
# 4. Environment Variables:
#    VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
#    VITE_API_URL=https://your-backend.onrender.com
# 5. Deploy!
```

### Backend → Render
```bash
# 1. render.com → New Web Service
# 2. GitHub repo connect
# 3. Settings:
#    Root Directory: backend
#    Runtime: Python 3
#    Build: pip install -r requirements.txt
#    Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT
# 4. Environment Variables:
#    MONGODB_URL=mongodb+srv://...
#    GROQ_API_KEY=gsk_...
#    OPENAI_API_KEY=sk-...
# 5. Deploy!
```

---

## 🤖 AI Architecture

```
User Message
     ↓
Groq API (Primary - FREE)
LLaMA 3.3 70B Model
     ↓
Web Search Context
(DuckDuckGo + Wikipedia)
     ↓
System Prompt:
- Health Expert persona
- Formatting rules (emojis, bullets)
- Language matching (Hindi/English)
- Max 280 words
- Specific numbers
     ↓
Formatted Response
     ↓
Saved to MongoDB
```

---

## 🔒 Security Features

- ✅ Clerk Authentication — Secure JWT tokens
- ✅ API Keys — Server-side only (never exposed)
- ✅ MongoDB — Password protected
- ✅ CORS — Configured for specific origins
- ✅ Environment Variables — .gitignore protected
- ✅ HTTPS — Vercel + Render auto SSL

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Frontend Build | ~5.5s |
| API Response | ~200ms |
| AI Response | ~2-3s |
| PDF Generation | ~1s |
| MongoDB Query | ~50ms |

---

## 🐛 Known Issues & Fixes

| Issue | Fix |
|-------|-----|
| Render cold start (30-50s) | Normal for free tier |
| OpenAI quota exceeded | Using Groq (free) as primary |
| pydantic-core build error | Python 3.11 + simplified requirements |
| Vercel 404 on refresh | vercel.json routing fix |

---

## 👨‍💻 Developer

**Abhinash Kumar**
- GitHub: [@abhinashkumarin](https://github.com/abhinashkumarin)
- Project: HealthPro AI

---

## 📄 License

MIT License — Free to use and modify.

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ using React + FastAPI + Groq AI

</div>
