# User Routes
from fastapi import APIRouter
from app.models.schemas import UserCreate
from app.core.database import users_col
from datetime import datetime

router = APIRouter()

@router.post("/sync")
async def sync_user(data: UserCreate):
    """Called after Clerk login to sync user to MongoDB"""
    existing = await users_col.find_one({"clerkId": data.clerkId})
    if not existing:
        await users_col.insert_one({
            **data.dict(),
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        })
        return {"status": "created"}
    else:
        await users_col.update_one(
            {"clerkId": data.clerkId},
            {"$set": {"updatedAt": datetime.utcnow(), "name": data.name}}
        )
        return {"status": "updated"}

@router.get("/{clerkId}")
async def get_user(clerkId: str):
    user = await users_col.find_one({"clerkId": clerkId})
    if user:
        user["_id"] = str(user["_id"])
    return user or {}