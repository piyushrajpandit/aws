/**
 * SatyaDrishti AI Copilot — Frontend API Service
 * Handles communication with the backend /api/copilot/chat endpoint.
 * No AWS credentials or secrets are ever used in this file.
 */

const COPILOT_API_URL = '/api/copilot/chat';
const COPILOT_HEALTH_URL = '/api/copilot/health';
const CLIENT_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY || '';

export interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CopilotNavigation {
  type: string;
  target: string;
  page_name?: string;
}

export interface CopilotResponse {
  response: string;
  type: 'message' | 'navigation' | 'action' | 'error';
  navigation?: CopilotNavigation;
  history: any[];
}

const SYSTEM_INSTRUCTION = `You are SatyaDrishti AI Copilot — the official AI assistant for the SatyaDrishti Legal Metrology & Consumer Protection Enforcement Platform.
SatyaDrishti automates statutory packaging-label compliance audits across e-commerce and retail supply chains under:
- Legal Metrology Act 2009 & Packaged Commodities Rules 2011/2022
- Consumer Protection Act 2019 & E-Commerce Rules 2020
- FSSAI Packaging & Labelling Regulations

Key Platform Pages:
- Dashboard: /dashboard
- Products Intelligence: /dashboard/products
- E-Commerce Crawler: /dashboard/crawler
- Product Scanner: /dashboard/scanner
- Violations Ledger: /dashboard/violations
- Manufacturer Risk: /dashboard/manufacturers
- Consumer Grievances: /dashboard/complaints
- Regulatory RAG: /dashboard/regulatory-rag

Rules:
1. Answer queries accurately regarding Indian Legal Metrology laws, mandatory declarations (MRP, Net Qty, Dates, Address with PIN, Customer Care, USP), and platform capabilities.
2. Keep responses concise, professional, structured, and legally grounded.`;

async function callDirectGemini(message: string, history: any[] = []): Promise<CopilotResponse> {
  const contents = [];
  
  for (const h of history) {
    const role = h.role === 'user' ? 'user' : 'model';
    let text = '';
    if (typeof h.content === 'string') text = h.content;
    else if (Array.isArray(h.content)) {
      text = h.content.map((c: any) => c.text || '').join('\n');
    }
    if (text) contents.push({ role, parts: [{ text }] });
  }

  contents.push({ role: 'user', parts: [{ text: message }] });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CLIENT_GEMINI_KEY}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API Error: ${err}`);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I processed your request.';
  
  const updatedHistory = [
    ...history,
    { role: 'user', content: [{ text: message }] },
    { role: 'assistant', content: [{ text: rawText }] },
  ];

  return {
    response: rawText,
    type: 'message',
    history: updatedHistory,
  };
}

/**
 * Send a message to the AI Copilot backend (with seamless Gemini fallback).
 */
export async function sendCopilotMessage(
  message: string,
  history: any[] = [],
): Promise<CopilotResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const res = await fetch(COPILOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.status === 429) {
      return {
        response: 'Too many requests. Please wait a moment before sending another message.',
        type: 'error',
        history,
      };
    }

    if (!res.ok) {
      // If backend fails but client Gemini key is available, use client Gemini
      if (CLIENT_GEMINI_KEY) {
        return await callDirectGemini(message, history);
      }
      const errBody = await res.json().catch(() => ({}));
      return {
        response: errBody.detail || 'An error occurred. Please try again.',
        type: 'error',
        history,
      };
    }

    return await res.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    
    // Direct Gemini fallback if backend is offline
    if (CLIENT_GEMINI_KEY) {
      try {
        return await callDirectGemini(message, history);
      } catch (geminiErr: any) {
        return {
          response: `Gemini Error: ${geminiErr.message}`,
          type: 'error',
          history,
        };
      }
    }

    if (err.name === 'AbortError') {
      return {
        response: 'Request timed out. Please try again.',
        type: 'error',
        history,
      };
    }
    return {
      response: 'Unable to reach the AI service. Please check that the backend server is running or set VITE_GEMINI_API_KEY.',
      type: 'error',
      history,
    };
  }
}

/**
 * Check if the AI Copilot service is available.
 */
export async function checkCopilotHealth(): Promise<boolean> {
  if (CLIENT_GEMINI_KEY) return true;
  try {
    const res = await fetch(COPILOT_HEALTH_URL, { method: 'GET' });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'available';
  } catch {
    return false;
  }
}
