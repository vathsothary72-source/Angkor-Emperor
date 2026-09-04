import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Minus, 
  MessageSquare, 
  ShieldCheck, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  HelpCircle,
  Lock,
  CreditCard
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  category?: string;
}

interface FloatingAiChatWidgetProps {
  onShowToast?: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export const FloatingAiChatWidget: React.FC<FloatingAiChatWidgetProps> = ({ onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'customer' | 'security' | 'pricing'>('customer');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am Ai Menimi (powered by Gemini 2.5), your intelligent cybersecurity and licensing assistant for Angkor Cyber Defense Suite.\n\nFeel free to ask about pricing plans, automated KHQR payment options, 144+ FPS esports game protection, or Ring 0 kernel shielding:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Preset Queries for Customer Support & System
  const quickPresets = [
    { label: 'Purchase & KHQR Bank', query: 'How can customers purchase lifetime licenses with Account 061444866 (ABA / Bakong KHQR)?' },
    { label: '144 FPS Game Shield', query: 'Explain how to configure zero-lag 144 FPS protection for competitive games.' },
    { label: 'Pricing & Lifetime Plans', query: 'What are the official lifetime pricing tiers for Angkor Cyber Defense?' },
    { label: 'Ring 0 Kernel Driver', query: 'How does the Ring 0 Kernel driver provide zero-trust process isolation?' },
    { label: 'Offline Token Activation', query: 'How does offline HMAC token verification operate without internet connectivity?' }
  ];

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          mode: activeCategory === 'security' ? 'security_advisor' : 'customer_support',
          context: {
            app: 'Angkor Cyber Defense Suite',
            accountNumber: '061444866',
            bank: 'ABA Bank / Bakong KHQR',
            telegram: '@AngkorEmperor'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Gemini API Error');
      }

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Inquiry analyzed. For further assistance, contact official Telegram @AngkorEmperor or scan Account 061444866.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const fallbackReply: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `Official Support & Verification: Account 061444866 (ABA Bank / Bakong KHQR). Instant lifetime license token dispatch is enabled 24/7.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onShowToast) onShowToast('success', 'Copied AI answer to clipboard ready to send to customer!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono">
      {/* 1. COLLAPSED FLOATING BUTTON (AUTO-HIDE ORB) */}
      {!isOpen && (
        <div className={`transition-all duration-300 ${isAutoHidden ? 'translate-x-12 opacity-40 hover:translate-x-0 hover:opacity-100' : ''}`}>
          <div className="flex items-center gap-2">
            {/* Auto-Hide Toggle Icon */}
            <button
              onClick={() => setIsAutoHidden(!isAutoHidden)}
              title={isAutoHidden ? 'Expand full' : 'Auto-hide orb'}
              className="p-1.5 bg-[#18140B] border border-[#D4AF37]/50 rounded-full text-[#F5D98E] hover:text-[#CCFF00] transition-colors cursor-pointer shadow-lg"
            >
              {isAutoHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            {/* Main Interactive Floating Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#CCFF00] text-black font-black rounded-full shadow-[0_0_25px_rgba(204,255,0,0.4)] cursor-pointer group hover:opacity-95 transition-all"
            >
              <div className="relative">
                <Bot className="w-5 h-5 text-black" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full animate-ping" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-[11px] font-black text-black tracking-wider flex items-center gap-1.5">
                  <span>Ai Menimi</span>
                  <span className="px-1.5 py-0.2 bg-black text-[#CCFF00] text-[8px] rounded font-black">
                    ONLINE
                  </span>
                </div>
                <div className="text-[9px] text-black/80 font-mono">
                  Smart AI Assistant
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. EXPANDED FLOATING INBOX WINDOW */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] bg-[#0E0C08] border border-[#CCFF00]/50 rounded-2xl flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.9)] animate-fadeIn relative overflow-hidden">
          {/* Top Header */}
          <div className="p-4 border-b border-[#CCFF00]/30 bg-[#121A0A] relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E2810] border border-[#CCFF00] flex items-center justify-center text-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.4)]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>Ai Menimi (Gemini 2.5)</span>
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                </div>
                <div className="text-[9px] text-[#CCFF00] flex items-center gap-1">
                  <span>ACC: 061444866 (ABA / Bakong)</span>
                </div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="px-3 py-2 bg-[#120F08] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {quickPresets.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(preset.query)}
                className="whitespace-nowrap px-2.5 py-1 bg-[#1E190D] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#F5D98E] rounded text-[10px] cursor-pointer transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs bg-[#090805]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#CCFF00] text-black font-bold'
                      : 'bg-[#18140C] border border-[#D4AF37]/30 text-white/90'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-xs">{msg.text}</div>
                  <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-white/5 text-[9px] opacity-60">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="flex items-center gap-1 text-[#CCFF00] hover:underline cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#CCFF00] p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI analyzing inquiry...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-white/10 bg-[#16120B] flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI Cyber Assistant..."
              className="flex-1 bg-[#0D0B07] border border-white/10 p-2.5 rounded-lg text-white text-xs outline-none focus:border-[#CCFF00]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 bg-[#CCFF00] disabled:opacity-40 text-black font-bold rounded-lg cursor-pointer hover:opacity-90 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
