# AI Routes
# backend/app/routes/ai.py
from fastapi import APIRouter
from pydantic import BaseModel
import os

router = APIRouter()

class AdviceRequest(BaseModel):
    bmi: float
    category: str
    age: int = 25
    gender: str = "not specified"

def get_ai_client():
    groq_key = os.getenv("GROQ_API_KEY", "")
    openai_key = os.getenv("OPENAI_API_KEY", "")
    if groq_key and not groq_key.startswith("gsk_your"):
        return "groq", groq_key
    elif openai_key and not openai_key.startswith("sk-your"):
        return "openai", openai_key
    return None, None

@router.post("/advice")
async def get_advice(req: AdviceRequest):
    provider, api_key = get_ai_client()

    if not provider:
        return {"advice": get_fallback(req.bmi, req.category)}

    prompt = f"""BMI: {req.bmi} | Category: {req.category} | Age: {req.age} | Gender: {req.gender}

Give personalized health advice:
📊 Assessment (2 lines)
🥗 Diet: 3 specific points  
🏋️ Exercise: 3 specific points
💡 Key Tips: 2 points
💪 Motivation (1 line)

Be SPECIFIC with exact numbers. Max 200 words."""

    try:
        if provider == "groq":
            from groq import AsyncGroq
            client = AsyncGroq(api_key=api_key)
            r = await client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are an expert health advisor. Give specific, actionable advice."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400
            )
        else:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=api_key)
            r = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert health advisor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400
            )
        return {"advice": r.choices[0].message.content}
    except:
        return {"advice": get_fallback(req.bmi, req.category)}

def get_fallback(bmi, category):
    tips = {
        "Normal": "✅ Healthy BMI! Maintain with balanced diet + 30 min daily exercise.",
        "Overweight": "⚠️ Cut 500 cal/day. Walk 45 min daily. Avoid sugar.",
        "Obese": "🔴 Consult doctor. Start 20 min walks. Cut processed food.",
        "Underweight": "📈 Eat 5 meals/day. Add protein. Strength training 3x/week."
    }
    return tips.get(category, "Stay healthy! Exercise daily and eat balanced meals.")