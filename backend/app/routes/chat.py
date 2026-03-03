# Chat Routes
# backend/app/routes/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
import os
import httpx

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    userId: str = "anonymous"
    history: List[dict] = []

async def search_web(query: str) -> str:
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            r = await client.get(
                "https://api.duckduckgo.com/",
                params={"q": query, "format": "json", "no_redirect": "1", "no_html": "1"},
                headers={"User-Agent": "HealthProAI/1.0"}
            )
            data = r.json()
            results = []
            if data.get("AbstractText"):
                results.append(data["AbstractText"])
            for topic in data.get("RelatedTopics", [])[:3]:
                if isinstance(topic, dict) and topic.get("Text"):
                    results.append(topic["Text"])
            if results:
                return "\n".join(results)[:1000]
    except:
        pass
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            term = query.split()[0:4]
            r = await client.get(
                f"https://en.wikipedia.org/api/rest_v1/page/summary/{'_'.join(term)}",
                headers={"User-Agent": "HealthProAI/1.0"}
            )
            if r.status_code == 200:
                return r.json().get("extract", "")[:600]
    except:
        pass
    return ""

def get_ai_client():
    """Try Groq first, then OpenAI"""
    groq_key = os.getenv("GROQ_API_KEY", "")
    openai_key = os.getenv("OPENAI_API_KEY", "")

    if groq_key and not groq_key.startswith("gsk_your"):
        return "groq", groq_key
    elif openai_key and not openai_key.startswith("sk-your"):
        return "openai", openai_key
    return None, None

@router.post("")
async def chat(req: ChatRequest):
    provider, api_key = get_ai_client()

    if not provider:
        return {"reply": "⚠️ **API Key Missing!**\n\n• Groq free key lo: https://console.groq.com\n• backend/.env mein GROQ_API_KEY add karo\n• Backend restart karo"}

    # Web search
    web_data = await search_web(req.message + " health 2024")

    web_context = ""
    if web_data and len(web_data) > 50:
        web_context = f"\n\nREAL-TIME DATA:\n{web_data[:800]}"

    SYSTEM = f"""You are HealthPro AI — Expert AI Health Advisor with real-time web knowledge.

STRICT RULES:
1. Give SPECIFIC answers — exact numbers, quantities, times
2. Use this EXACT format every time:

[emoji] **Main Answer** (1-2 lines assessment)

[emoji] **Section Name**
- Point with exact detail
- Point with exact detail
- Point with exact detail

[emoji] **Section Name**  
- Point
- Point

💪 [Motivational closing line]

3. Bullet points use karo (•) — dashes NAHI
4. Important words **bold** karo
5. Max 280 words
6. SPECIFIC data do — "30 min walk" not "exercise karo"
7. Language: User ke saath match karo (Hindi/English/Hinglish)
8. Web data se latest info use karo{web_context}"""

    messages = [{"role": "system", "content": SYSTEM}]
    for h in req.history[-4:]:
        if h.get("role") in ["user", "assistant"] and h.get("content"):
            messages.append({"role": h["role"], "content": str(h["content"])[:400]})
    messages.append({"role": "user", "content": req.message})

    try:
        if provider == "groq":
            from groq import AsyncGroq
            client = AsyncGroq(api_key=api_key)
            response = await client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                max_tokens=700,
                temperature=0.7
            )
        else:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=api_key)
            response = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=700,
                temperature=0.7
            )

        reply = response.choices[0].message.content

        try:
            from app.core.database import chat_col
            await chat_col.insert_one({
                "userId": req.userId,
                "message": req.message,
                "response": reply,
                "provider": provider,
                "webData": bool(web_data),
                "timestamp": datetime.utcnow()
            })
        except:
            pass

        return {"reply": reply, "provider": provider}

    except Exception as e:
        err = str(e).lower()
        if "quota" in err or "billing" in err or "insufficient" in err:
            return {"reply": "❌ **OpenAI Credits Khatam!**\n\n✅ **Free Solution:**\n• https://console.groq.com jaao\n• Free account banao\n• API key copy karo\n• backend/.env mein add karo:\n  GROQ_API_KEY=gsk_...\n• Backend restart karo\n\n💪 Groq = Free + Faster than GPT!"}
        elif "rate" in err:
            return {"reply": "⏳ **Rate limit** — 30 seconds baad try karo!"}
        else:
            return {"reply": f"⚠️ Error: {str(e)[:150]}\n\nBackend console dekho!"}