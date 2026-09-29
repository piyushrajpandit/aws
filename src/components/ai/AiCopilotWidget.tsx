/**
 * SatyaDrishti AI Copilot — Floating Chat Widget
 * A self-contained floating chatbot UI that matches the existing design language.
 * Renders as a small FAB button; expands into a full chat panel on click.
 *
 * This component is purely ADDITIVE — it does not modify any existing pages,
 * routes, components, or styles.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  AlertCircle,
  Navigation,
  Minimize2,
} from 'lucide-react';
import {
  sendCopilotMessage,
  CopilotMessage,
} from '../../services/copilotService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ChatEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'message' | 'navigation' | 'action' | 'error';
  navigationTarget?: string;
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const AiCopilotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bedrockHistory, setBedrockHistory] = useState<any[]>([]);
  const [showPulse, setShowPulse] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Hide pulse after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content:
            "Namaste! 🙏 I'm the **SatyaDrishti AI Copilot**, your intelligent assistant for the Legal Metrology & Consumer Protection platform.\n\nI can help you with:\n• 📊 **Data queries** — products, violations, complaints, manufacturers\n• 🧭 **Navigation** — \"Take me to the analytics dashboard\"\n• ⚡ **Actions** — \"Create a new product called GreenTrack\"\n• 💡 **Recommendations** — \"Which product should I prioritize?\"\n• ❓ **Platform knowledge** — \"What does this project do?\"\n\nHow can I help you today?",
          type: 'message',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // ------- Send message -------
  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userEntry: ChatEntry = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      type: 'message',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userEntry]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await sendCopilotMessage(trimmed, bedrockHistory);

      const assistantEntry: ChatEntry = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result.response,
        type: result.type,
        navigationTarget: result.navigation?.target,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantEntry]);
      setBedrockHistory(result.history || []);

      // Handle navigation
      if (result.type === 'navigation' && result.navigation?.target) {
        setTimeout(() => {
          navigate(result.navigation!.target);
        }, 800);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Unable to reach the AI service. Please try again.',
          type: 'error',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, bedrockHistory, navigate]);

  // ------- Keyboard handler -------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ------- Clear conversation -------
  const handleClear = () => {
    setMessages([]);
    setBedrockHistory([]);
  };

  // ------- Render message content with basic markdown -------
  const renderContent = (text: string) => {
    // Convert **bold** and basic line breaks
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={j}>{part}</span>;
      });

      // Bullet points
      if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-1.5 ml-1">
            <span className="text-brand-accent mt-0.5 shrink-0">•</span>
            <span>{rendered.slice(0)}</span>
          </div>
        );
      }

      return (
        <React.Fragment key={i}>
          {rendered}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // =====================================================================
  // RENDER
  // =====================================================================

  return (
    <>
      {/* ---- Floating Action Button ---- */}
      {!isOpen && (
        <button
          id="ai-copilot-fab"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] group"
          aria-label="Open AI Copilot"
        >
          {/* Pulse ring */}
          {showPulse && (
            <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
          )}
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-full
              bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600
              shadow-lg shadow-blue-500/30
              hover:shadow-xl hover:shadow-blue-500/40 hover:scale-110
              active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {/* Tooltip */}
          <div
            className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg
              bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap shadow-lg"
          >
            AI Copilot
          </div>
        </button>
      )}

      {/* ---- Chat Panel ---- */}
      {isOpen && (
        <div
          id="ai-copilot-panel"
          className="fixed bottom-4 right-4 z-[9999]
            w-[min(420px,calc(100vw-2rem))] h-[min(640px,calc(100vh-2rem))]
            flex flex-col
            bg-white dark:bg-[#0F1629]
            border border-slate-200 dark:border-slate-700/60
            rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40
            overflow-hidden
            animate-[copilotSlideUp_0.3s_ease-out]"
          style={{
            animation: 'copilotSlideUp 0.3s ease-out',
          }}
        >
          {/* ---- Header ---- */}
          <div
            className="flex items-center justify-between px-4 py-3
              bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600
              text-white shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">SatyaDrishti AI</h3>
                <p className="text-[10px] text-blue-100/80 leading-tight">Powered by Amazon Bedrock</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-blue-100 hover:text-white"
                title="Clear conversation"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-blue-100 hover:text-white"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-blue-100 hover:text-white"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ---- Messages area ---- */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" id="ai-copilot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-white
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                      : msg.type === 'error'
                        ? 'bg-gradient-to-br from-red-500 to-rose-600'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : msg.type === 'error' ? (
                    <AlertCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : msg.type === 'error'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/40 rounded-tl-sm'
                        : 'bg-slate-100 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                    }`}
                >
                  {renderContent(msg.content)}

                  {/* Navigation badge */}
                  {msg.type === 'navigation' && msg.navigationTarget && (
                    <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                      <Navigation className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        Navigating to {msg.navigationTarget}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800/70">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ---- Quick Prompts ---- */}
          <div className="shrink-0 px-3 py-1.5 bg-slate-50/80 dark:bg-[#0E1526] border-t border-slate-200/60 dark:border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setInput('Analyze this product link for seller trust: https://www.amazon.in/dp/B08N5WRWNW');
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-700/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 shrink-0 transition-colors"
            >
              🛍️ Check Amazon/Seller Link
            </button>
            <button
              onClick={() => {
                setInput('Show database stats');
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 transition-colors"
            >
              📊 Platform Stats
            </button>
            <button
              onClick={() => {
                setInput('Take me to the crawler dashboard');
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 transition-colors"
            >
              🧭 Open Crawler
            </button>
          </div>

          {/* ---- Input area ---- */}
          <div className="shrink-0 border-t border-slate-200 dark:border-slate-700/60 p-3 bg-white dark:bg-[#0B0F19]">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/50
                  px-3.5 py-2.5 text-sm
                  text-slate-800 dark:text-slate-200
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                  disabled:opacity-50 transition-all duration-200
                  max-h-24 overflow-y-auto"
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex items-center justify-center w-10 h-10 rounded-xl
                  bg-gradient-to-br from-blue-600 to-indigo-600
                  text-white
                  hover:from-blue-500 hover:to-indigo-500
                  disabled:opacity-40 disabled:cursor-not-allowed
                  active:scale-95 transition-all duration-200
                  shadow-md shadow-blue-500/20"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 text-center">
              AI responses are generated by Amazon Bedrock. Verify important information.
            </p>
          </div>
        </div>
      )}

      {/* ---- CSS Keyframe animation (injected once) ---- */}
      <style>{`
        @keyframes copilotSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};
