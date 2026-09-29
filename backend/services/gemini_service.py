"""
SatyaDrishti AI Copilot — Google Gemini Integration Service
Supports multi-turn conversations with Gemini API and tool/function calling.
All API keys and credentials stay server-side.
"""

import os
import json
import traceback
from typing import Dict, Any, List, Optional
import httpx

from services.bedrock_service import SYSTEM_PROMPT

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or ""
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"


def get_gemini_tool_declarations() -> List[Dict[str, Any]]:
    """Convert AI tool definitions to Gemini functionDeclaration schema."""
    return [
        {
            "name": "get_database_stats",
            "description": "Get overview counts for all database tables (products, manufacturers, ocr_scans, violations, complaints, regulatory_rules).",
            "parameters": {
                "type": "OBJECT",
                "properties": {},
            },
        },
        {
            "name": "get_products",
            "description": "Retrieve products with optional filtering by platform, status, or search text.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "platform": {"type": "STRING", "description": "Filter by platform ('Amazon', 'Flipkart', 'Blinkit', 'All')."},
                    "status": {"type": "STRING", "description": "Filter by status ('compliant', 'non-compliant', 'warning', 'All')."},
                    "search": {"type": "STRING", "description": "Search keyword for product title, brand, manufacturer."},
                    "limit": {"type": "INTEGER", "description": "Max results to return (1-50)."},
                },
            },
        },
        {
            "name": "get_product_details",
            "description": "Get detailed information about a specific product by its ID.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "product_id": {"type": "STRING", "description": "The unique product ID."},
                },
                "required": ["product_id"],
            },
        },
        {
            "name": "get_violations",
            "description": "Retrieve compliance violations with optional filtering by severity and status.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "severity": {"type": "STRING", "description": "Filter by severity ('critical', 'high', 'medium', 'low', 'All')."},
                    "status": {"type": "STRING", "description": "Filter by status ('Open', 'Under Investigation', 'Resolved', 'All')."},
                    "limit": {"type": "INTEGER", "description": "Max results to return (1-50)."},
                },
            },
        },
        {
            "name": "get_complaints",
            "description": "Retrieve consumer complaints with optional status filtering.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "status": {"type": "STRING", "description": "Filter by status ('New', 'Under Review', 'Resolved', 'All')."},
                    "limit": {"type": "INTEGER", "description": "Max results (1-50)."},
                },
            },
        },
        {
            "name": "get_manufacturers",
            "description": "Retrieve manufacturers with risk info, optionally filtered by risk tier.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "risk_tier": {"type": "STRING", "description": "Filter by risk tier ('Critical', 'High', 'Moderate', 'Low', 'All')."},
                    "limit": {"type": "INTEGER", "description": "Max results (1-50)."},
                },
            },
        },
        {
            "name": "navigate_to_page",
            "description": "Navigate the user to a page within the SatyaDrishti application.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "page_name": {"type": "STRING", "description": "Name of the target page (e.g. 'scanner', 'violations', 'products', 'crawler')."},
                },
                "required": ["page_name"],
            },
        },
        {
            "name": "analyze_ecommerce_url",
            "description": "Analyze an e-commerce product link for seller trust, domain authenticity, statutory legal metrology compliance, and counterfeit risk.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "url": {"type": "STRING", "description": "The product URL to evaluate."},
                },
                "required": ["url"],
            },
        },
    ]


def convert_history_to_gemini(messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Convert universal message history into Gemini contents format."""
    gemini_contents = []

    for msg in messages:
        role = msg.get("role")
        gemini_role = "user" if role == "user" else "model"
        parts = []

        # Bedrock Converse content format or standard string format
        raw_content = msg.get("content", "")
        if isinstance(raw_content, str):
            parts.append({"text": raw_content})
        elif isinstance(raw_content, list):
            for block in raw_content:
                if isinstance(block, dict):
                    if "text" in block:
                        parts.append({"text": block["text"]})
                    elif "toolUse" in block:
                        parts.append({
                            "functionCall": {
                                "name": block["toolUse"]["name"],
                                "args": block["toolUse"].get("input", {}),
                            }
                        })
                    elif "toolResult" in block:
                        gemini_role = "user"
                        parts.append({
                            "functionResponse": {
                                "name": block["toolResult"].get("name", "tool"),
                                "response": block["toolResult"].get("content", [{}])[0].get("json", {}),
                            }
                        })
                elif isinstance(block, str):
                    parts.append({"text": block})

        if parts:
            gemini_contents.append({"role": gemini_role, "parts": parts})

    return gemini_contents


def converse_with_gemini(
    messages: List[Dict[str, Any]],
    db_session,
    api_key: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Send a conversation to Google Gemini API with function calling.
    """
    from services.ai_tools import TOOL_HANDLERS

    active_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or ""
    if not active_key:
        return {
            "response": "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.",
            "messages": messages,
            "type": "error",
        }

    url = f"{GEMINI_API_BASE}/{GEMINI_MODEL}:generateContent?key={active_key}"
    gemini_contents = convert_history_to_gemini(messages)
    tools = [{"functionDeclarations": get_gemini_tool_declarations()}]

    navigation_result = None
    max_rounds = 4

    for _ in range(max_rounds):
        payload = {
            "contents": gemini_contents,
            "systemInstruction": {
                "parts": [{"text": SYSTEM_PROMPT}]
            },
            "tools": tools,
            "generationConfig": {
                "temperature": 0.2,
                "maxOutputTokens": 1024,
            },
        }

        try:
            with httpx.Client(timeout=45.0) as client:
                res = client.post(url, json=payload, headers={"Content-Type": "application/json"})
                if res.status_code != 200:
                    err_msg = res.text
                    print(f"[Gemini API Error] {res.status_code}: {err_msg}")
                    return {
                        "response": f"Gemini API returned an error ({res.status_code}). Please verify your GEMINI_API_KEY.",
                        "messages": messages,
                        "type": "error",
                    }
                data = res.json()
        except Exception as e:
            print(f"[Gemini Request Exception]: {traceback.format_exc()}")
            return {
                "response": "Unable to communicate with Google Gemini AI. Please check your internet connection.",
                "messages": messages,
                "type": "error",
            }

        candidates = data.get("candidates", [])
        if not candidates:
            return {
                "response": "I didn't receive a valid response from Gemini. Please try again.",
                "messages": messages,
                "type": "error",
            }

        candidate = candidates[0]
        content = candidate.get("content", {})
        parts = content.get("parts", [])

        # Check if model made a functionCall
        function_calls = [p["functionCall"] for p in parts if "functionCall" in p]

        if function_calls:
            # Append model turn with function calls
            gemini_contents.append({"role": "model", "parts": parts})
            tool_response_parts = []

            for fc in function_calls:
                fn_name = fc["name"]
                fn_args = fc.get("args", {})
                print(f"[Gemini] Executing Tool: {fn_name}({json.dumps(fn_args, default=str)})")

                if fn_name in TOOL_HANDLERS:
                    try:
                        tool_out = TOOL_HANDLERS[fn_name](db_session, fn_args)
                        if fn_name == "navigate_to_page" and isinstance(tool_out, dict):
                            if tool_out.get("status") == "success":
                                navigation_result = {
                                    "type": "navigation",
                                    "target": tool_out["route"],
                                    "page_name": tool_out.get("page_name", ""),
                                }
                    except Exception as e:
                        tool_out = {"error": f"Tool execution failed: {str(e)}"}
                else:
                    tool_out = {"error": f"Unknown tool '{fn_name}'"}

                tool_response_parts.append({
                    "functionResponse": {
                        "name": fn_name,
                        "response": {"output": tool_out},
                    }
                })

            # Append user turn with function responses
            gemini_contents.append({"role": "user", "parts": tool_response_parts})
            continue  # Re-prompt model to formulate final answer

        else:
            # Final text response
            text_blocks = [p["text"] for p in parts if "text" in p]
            final_text = "\n".join(text_blocks).strip()

            messages.append({
                "role": "assistant",
                "content": [{"text": final_text}],
            })

            result = {
                "response": final_text or "I processed your request.",
                "messages": messages,
                "type": "message",
            }

            if navigation_result:
                result["navigation"] = navigation_result
                result["type"] = "navigation"

            return result

    return {
        "response": "I was unable to complete the query within the allowed processing limit.",
        "messages": messages,
        "type": "error",
    }
