# Database Connection
# backend/app/core/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client["healthpro"]

users_col = db["users"]
bmi_col   = db["bmi_records"]
chat_col  = db["chat_history"]