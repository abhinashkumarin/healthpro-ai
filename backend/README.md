# 🔧 HealthPro AI — Backend

## Tech Stack
FastAPI + MongoDB (Motor) + OpenAI API + ReportLab

## Quick Start
python -m venv venv
venv\Scripts\activate (Windows) or source venv/bin/activate (Mac)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
API Docs → http://localhost:8000/docs

## .env Setup
MONGODB_URL=mongodb://localhost:27017
OPENAI_API_KEY=sk-your-key

## API Endpoints
POST /api/users/sync → Sync Clerk user
POST /api/bmi/save → Save BMI record
GET  /api/bmi/history/{userId} → Get history
POST /api/ai/advice → Get AI advice
POST /api/chat → Chatbot message
POST /api/report/generate → Download PDF
```

---

## 🚀 COMPLETE SETUP GUIDE (Step by Step)

### STEP 1 — Install MongoDB
```
Windows: Download from https://www.mongodb.com/try/download/community
Install → Start as Service (automatic)
Download MongoDB Compass (GUI) from same page
Open Compass → Connect: mongodb://localhost:27017
Create Database: healthpro
```

### STEP 2 — Get Clerk Key (Free)
```
1. Go to https://clerk.com → Sign Up
2. Create New Application
3. Name: "HealthPro AI"
4. Enable: Email ✓  Google ✓
5. Go to API Keys
6. Copy "Publishable Key" (pk_test_...)
7. Paste in frontend/.env
```

### STEP 3 — Get OpenAI Key
```
1. Go to https://platform.openai.com
2. Sign up → Go to API Keys
3. Create new key → Copy it
4. Paste in backend/.env


Step 4: 
 cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# You should see:
# INFO: Application startup complete.
# Open: http://localhost:8000/docs