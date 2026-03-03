# BMI Routes
# backend/app/routes/bmi.py
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

# ── Flexible schema — sab optional fields accept karo
from pydantic import BaseModel
from typing import Optional

class BMISaveRequest(BaseModel):
    userId: Optional[str] = "anonymous"
    weight: Optional[float] = 0
    height: Optional[float] = 0
    weightUnit: Optional[str] = "kg"
    heightUnit: Optional[str] = "cm"
    bmi: Optional[str] = "0"
    category: Optional[str] = "Unknown"
    age: Optional[int] = None
    gender: Optional[str] = None

@router.post("/save")
async def save_bmi(data: BMISaveRequest):
    try:
        from app.core.database import bmi_col
        record = {
            "userId":     data.userId,
            "weight":     data.weight,
            "weightUnit": data.weightUnit,
            "height":     data.height,
            "heightUnit": data.heightUnit,
            "bmi":        data.bmi,
            "category":   data.category,
            "age":        data.age,
            "gender":     data.gender,
            "date":       datetime.utcnow()
        }
        result = await bmi_col.insert_one(record)
        print(f"✅ BMI Saved! ID: {result.inserted_id}, BMI: {data.bmi}, Category: {data.category}")
        return {"status": "saved", "id": str(result.inserted_id)}
    except Exception as e:
        print(f"❌ BMI Save Error: {e}")
        return {"status": "error", "message": str(e)}

@router.get("/history/{userId}")
async def get_history(userId: str, limit: int = 30):
    try:
        from app.core.database import bmi_col
        cursor = bmi_col.find({"userId": userId}).sort("date", 1).limit(limit)
        records = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            doc["date"] = doc["date"].isoformat() if doc.get("date") else ""
            records.append(doc)
        return records
    except Exception as e:
        print(f"❌ History Error: {e}")
        return []

@router.get("/latest/{userId}")
async def get_latest(userId: str):
    try:
        from app.core.database import bmi_col
        doc = await bmi_col.find_one(
            {"userId": userId},
            sort=[("date", -1)]
        )
        if doc:
            doc["_id"] = str(doc["_id"])
            doc["date"] = doc["date"].isoformat() if doc.get("date") else ""
            return doc
        return {}
    except Exception as e:
        print(f"❌ Latest Error: {e}")
        return {}

@router.delete("/clear/{userId}")
async def clear_records(userId: str):
    try:
        from app.core.database import bmi_col
        result = await bmi_col.delete_many({"userId": userId})
        return {"deleted": result.deleted_count}
    except Exception as e:
        return {"error": str(e)}