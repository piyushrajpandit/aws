"""
SatyaDrishti AI Copilot — FastAPI Route
Exposes POST /api/copilot/chat for the frontend chat widget.
All Bedrock calls happen server-side. No AWS credentials reach the browser.
"""

import sys
from pathlib import Path
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

_backend_dir = Path(__file__).resolve().parents[2]
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))

from database import get_db
import os
from services.bedrock_service import converse_with_bedrock
from services.gemini_service import converse_with_gemini


router = APIRouter(prefix="/api/copilot", tags=["AI Copilot"])


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------

class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., description="Message text content")


class CopilotChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="User's message")
    history: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="Conversation history in Bedrock Converse API format"
    )


class CopilotChatResponse(BaseModel):
    response: str = Field(..., description="Assistant's text response")
    type: str = Field(default="message", description="Response type: message, navigation, action, error")
    navigation: Optional[Dict[str, Any]] = Field(default=None, description="Navigation target if type=navigation")
    history: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="Updated conversation history for session continuity"
    )


# ---------------------------------------------------------------------------
# Rate limiting (simple in-memory, per-session)
# ---------------------------------------------------------------------------
from datetime import datetime, timedelta
from collections import defaultdict
import hashlib

_rate_limits: Dict[str, List[datetime]] = defaultdict(list)
RATE_LIMIT_WINDOW = 60  # seconds
RATE_LIMIT_MAX = 20  # max requests per window


def _check_rate_limit(client_id: str) -> bool:
    """Return True if request is allowed, False if rate-limited."""
    now = datetime.utcnow()
    cutoff = now - timedelta(seconds=RATE_LIMIT_WINDOW)
    _rate_limits[client_id] = [t for t in _rate_limits[client_id] if t > cutoff]
    if len(_rate_limits[client_id]) >= RATE_LIMIT_MAX:
        return False
    _rate_limits[client_id].append(now)
    return True


# ---------------------------------------------------------------------------
# Input sanitization
# ---------------------------------------------------------------------------
def _sanitize_message(message: str) -> str:
    """Basic input sanitization — strip control characters, limit length."""
    # Remove null bytes and other control characters
    sanitized = "".join(ch for ch in message if ord(ch) >= 32 or ch in "\n\r\t")
    return sanitized.strip()[:4000]


# ---------------------------------------------------------------------------
# POST /api/copilot/chat
# ---------------------------------------------------------------------------
@router.post("/chat", response_model=CopilotChatResponse)
async def copilot_chat(
    request: CopilotChatRequest,
    db: Session = Depends(get_db),
):
    """
    Main AI Copilot chat endpoint.
    Accepts a user message and conversation history, returns the AI response.
    """
    # Rate limiting using a hash of the first message as a simple session key
    session_key = hashlib.sha256(
        (request.history[0]["content"][0]["text"] if request.history else request.message).encode()
    ).hexdigest()[:16]

    if not _check_rate_limit(session_key):
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please wait a moment before sending another message."
        )

    # Sanitize input
    user_message = _sanitize_message(request.message)
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Build messages list — use existing history or start fresh
    messages = request.history.copy() if request.history else []

    # Append the new user message
    messages.append({
        "role": "user",
        "content": [{"text": user_message}],
    })

    # Check if Google Gemini API key is configured
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if gemini_key:
        result = converse_with_gemini(
            messages=messages,
            db_session=db,
            api_key=gemini_key,
        )
    else:
        # Fallback to Bedrock with tool support
        result = converse_with_bedrock(
            messages=messages,
            db_session=db,
        )

    return CopilotChatResponse(
        response=result.get("response", "I couldn't process that request."),
        type=result.get("type", "message"),
        navigation=result.get("navigation"),
        history=result.get("messages", messages),
    )


# ---------------------------------------------------------------------------
# GET /api/copilot/health — lightweight health check
# ---------------------------------------------------------------------------
@router.get("/health")
async def copilot_health():
    """Check if the AI Copilot service is available."""
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if gemini_key:
        return {
            "status": "available",
            "provider": "Google Gemini",
            "model": os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
            "service": "SatyaDrishti AI Copilot",
        }

    try:
        from services.bedrock_service import _get_bedrock_client
        client = _get_bedrock_client()
        return {"status": "available", "provider": "Amazon Bedrock", "service": "SatyaDrishti AI Copilot"}
    except Exception as e:
        return {"status": "unavailable", "reason": str(e)}
