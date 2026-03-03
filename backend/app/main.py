from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import bmi, chat, ai_routes, users, report

app = FastAPI(
    title="HealthPro AI API",
    description="Smart BMI & AI Health Advisor Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router,      prefix="/api/users",  tags=["Users"])
app.include_router(bmi.router,        prefix="/api/bmi",    tags=["BMI"])
app.include_router(chat.router,       prefix="/api/chat",   tags=["Chat"])
app.include_router(ai_routes.router,  prefix="/api/ai",     tags=["AI"])
app.include_router(report.router,     prefix="/api/report", tags=["Report"])

@app.get("/")
def root():
    return {"message": "HealthPro AI Backend Running 🚀", "docs": "/docs"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}