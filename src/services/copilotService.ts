/**
 * SatyaDrishti AI Copilot — Frontend API Service
 * Handles communication with the backend /api/copilot/chat endpoint.
 * No AWS credentials or secrets are ever used in this file.
 */

const COPILOT_API_URL = '/api/copilot/chat';
const COPILOT_HEALTH_URL = '/api/copilot/health';

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

/**
 * Send a message to the AI Copilot backend.
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
    if (err.name === 'AbortError') {
      return {
        response: 'Request timed out. Please try again.',
        type: 'error',
        history,
      };
    }
    return {
      response: 'Unable to reach the AI service. Please check that the backend server is running.',
      type: 'error',
      history,
    };
  }
}

/**
 * Check if the AI Copilot service is available.
 */
export async function checkCopilotHealth(): Promise<boolean> {
  try {
    const res = await fetch(COPILOT_HEALTH_URL, { method: 'GET' });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'available';
  } catch {
    return false;
  }
}
