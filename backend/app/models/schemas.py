# Pydantic Schemas
# backend/app/models/schemas.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class UserCreate(BaseModel):
    clerkId: str
    email: str
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None

class BMISaveRequest(BaseModel):
    userId: str
    weight: float
    height: float
    bmi: str
    category: str

class ChatRequest(BaseModel):
    message: str
    userId: str = "anonymous"
    history: List[dict] = []

class AdviceRequest(BaseModel):
    bmi: float
    category: str
    age: int = 25
    gender: str = "not specified"

class ReportRequest(BaseModel):
    name: str
    bmi: float
    category: str
    weight: float
    height: float
    advice: str
    date: str