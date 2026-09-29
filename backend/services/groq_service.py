"""
SatyaDrishti AI Copilot — Groq Cloud LLM Integration Service
High-speed inference using Groq LLaMA models (e.g., llama-3.3-70b-versatile, llama-3.1-8b-instant).
Supports multi-turn conversations, tool calling, and structured compliance responses.
"""

import os
import json
import traceback
from typing import Dict, Any, List, Optional
import httpx

from services.bedrock_service import SYSTEM_PROMPT

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
GROQ_API_BASE = "https://api.groq.com/openai/v1/chat/completions"


def get_groq_tool_declarations() -> List[Dict[str, Any]]:
    """Return tool schemas in OpenAI/Groq function calling format."""
    return [
        {
            "type": "function",
            "function": {
                "name": "get_database_stats",
                "description": "Get overview counts for all database tables (products, manufacturers, ocr_scans, violations, complaints, regulatory_rules).",
                "parameters": {
                    "type": "object",
                    "properties": {},
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_products",
                "description": "Retrieve products with optional filtering by platform, status, or search text.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "platform": {
                            "type": "string",
                            "description": "Filter by platform ('Amazon', 'Flipkart', 'Blinkit', 'All').",
                        },
                        "status": {
                            "type": "string",
                            "description": "Filter by status ('compliant', 'non-compliant', 'warning', 'All').",
                        },
                        "search": {
                            "type": "string",
                            "description": "Search keyword for product title, brand, manufacturer.",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Max results to return (1-50).",
                        },
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_product_details",
                "description": "Get detailed information about a specific product by its ID.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "product_id": {
                            "type": "string",
                            "description": "The unique product ID.",
                        },
                    },
                    "required": ["product_id"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_violations",
                "description": "Retrieve compliance violations with optional filtering by severity and status.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "severity": {
                            "type": "string",
                            "description": "Filter by severity ('critical', 'high', 'medium', 'low', 'All').",
                        },
                        "status": {
                            "type": "string",
                            "description": "Filter by status ('Open', 'Under Investigation', 'Resolved', 'All').",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Max results to return (1-50).",
                        },
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_complaints",
                "description": "Retrieve consumer complaints with optional status filtering.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "string",
                            "description": "Filter by status ('New', 'Under Review', 'Resolved', 'All').",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Max results (1-50).",
                        },
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_manufacturers",
                "description": "Retrieve manufacturers with risk info, optionally filtered by risk tier.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "risk_tier": {
                            "type": "string",
                            "description": "Filter by risk tier ('Critical', 'High', 'Moderate', 'Low', 'All').",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Max results (1-50).",
                        },
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "navigate_to_page",
                "description": "Navigate the user to a page within the SatyaDrishti application.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "page_name": {
                            "type": "string",
                            "description": "Name of target page (e.g. 'scanner', 'violations', 'products', 'crawler').",
                        },
                    },
                    "required": ["page_name"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "analyze_ecommerce_url",
                "description": "Analyze an e-commerce product link for seller trust, domain authenticity, statutory legal metrology compliance, and counterfeit risk.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "description": "The product URL to evaluate.",
                        },
                    },
                    "required": ["url"],
                },
            },
        },
    ]


def convert_history_to_groq(messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Convert universal message history into OpenAI/Groq messages format."""
    groq_messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    for msg in messages:
        role = msg.get("role")
        openai_role = "user" if role == "user" else "assistant"
        raw_content = msg.get("content", "")

        if isinstance(raw_content, str):
            groq_messages.append({"role": openai_role, "content": raw_content})
        elif isinstance(raw_content, list):
            text_parts = []
            for block in raw_content:
                if isinstance(block, dict):
                    if "text" in block:
                        text_parts.append(block["text"])
                    elif "toolUse" in block:
                        pass
                elif isinstance(block, str):
                    text_parts.append(block)
            combined_text = "\n".join(text_parts).strip()
            if combined_text:
                groq_messages.append({"role": openai_role, "content": combined_text})

    return groq_messages


def converse_with_groq(
    messages: List[Dict[str, Any]],
    db_session,
    api_key: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Execute multi-turn conversation with Groq OpenAI-compatible Chat API.
    Supports function/tool calling and returns navigation actions.
    """
    from services.ai_tools import TOOL_HANDLERS

    active_key = api_key or os.getenv("GROQ_API_KEY") or ""
    if not active_key:
        return {
            "response": "Groq API key is not configured. Please set GROQ_API_KEY in your .env file.",
            "messages": messages,
            "type": "error",
        }

    groq_messages = convert_history_to_groq(messages)
    tools = get_groq_tool_declarations()
    headers = {
        "Authorization": f"Bearer {active_key}",
        "Content-Type": "application/json",
    }

    navigation_result = None
    max_rounds = 4

    for _ in range(max_rounds):
        payload: Dict[str, Any] = {
            "model": GROQ_MODEL,
            "messages": groq_messages,
            "temperature": 0.2,
            "max_tokens": 1024,
            "tools": tools,
            "tool_choice": "auto",
        }

        try:
            with httpx.Client(timeout=45.0) as client:
                res = client.post(GROQ_API_BASE, json=payload, headers=headers)
                if res.status_code != 200:
                    err_msg = res.text
                    print(f"[Groq API Error] {res.status_code}: {err_msg}")
                    return {
                        "response": f"Groq API returned an error ({res.status_code}): {err_msg[:200]}",
                        "messages": messages,
                        "type": "error",
                    }
                data = res.json()
        except Exception as e:
            print(f"[Groq Request Exception]: {traceback.format_exc()}")
            return {
                "response": "Unable to communicate with Groq AI. Please check your internet connection.",
                "messages": messages,
                "type": "error",
            }

        choices = data.get("choices", [])
        if not choices:
            return {
                "response": "I didn't receive a valid response from Groq. Please try again.",
                "messages": messages,
                "type": "error",
            }

        choice = choices[0]
        choice_message = choice.get("message", {})
        tool_calls = choice_message.get("tool_calls", [])

        if tool_calls:
            # Append assistant's tool_calls message
            groq_messages.append({
                "role": "assistant",
                "content": choice_message.get("content") or "",
                "tool_calls": tool_calls,
            })

            for tc in tool_calls:
                call_id = tc.get("id", "call_1")
                function = tc.get("function", {})
                fn_name = function.get("name", "")
                raw_args = function.get("arguments", "{}")

                try:
                    fn_args = json.loads(raw_args) if isinstance(raw_args, str) else raw_args
                except Exception:
                    fn_args = {}

                print(f"[Groq] Executing Tool: {fn_name}({json.dumps(fn_args, default=str)})")

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

                # Append tool result
                groq_messages.append({
                    "role": "tool",
                    "tool_call_id": call_id,
                    "name": fn_name,
                    "content": json.dumps(tool_out, default=str),
                })

            continue  # Re-prompt model to formulate final answer

        else:
            # Final text response
            final_text = choice_message.get("content", "").strip()

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
