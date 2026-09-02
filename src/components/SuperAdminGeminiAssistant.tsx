import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  SendHorizontal, 
  RefreshCw, 
  Mail, 
  PhoneCall, 
  ExternalLink, 
  Terminal, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Copy, 
  Check, 
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { License, Device, ThreatLog } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface SuperAdminGeminiAssistantProps {
  licenses: License[];
  devices: Device[];
  threatLogs: ThreatLog[];
  onShowToast: (message: string, type: 'success' | 'danger' | 'info') => void;
}

export const SuperAdminGeminiAssistant: React.FC<SuperAdminGeminiAssistantProps> = ({
  licenses,
  devices,
  threatLogs,
  onShowToast
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      text: `Welcome Super Admin. I am the AI Gemini Security Advisor for the 5D Zero-Trust Cyber Armor Console.

I am ready to help analyze Ring-0 Kernel drivers, audit live threat logs, configure HWID node bindings, verify cryptographic signatures, and provide autonomous security recommendations.

Verified Support Node:
- Communications: @PrinceOfSeal
- Security Dispatch: v***72@gmail.com
- Settlement Gateway: Verified Primary Merchant`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputPrompt('');
    setIsLoading(true);

    try {
      const contextSnapshot = {
        totalLicenses: licenses.length,
        activeLicenses: licenses.filter((l) => l.status === 'active').length,
        totalDevices: devices.length,
        totalThreats: threatLogs.length,
        highThreats: threatLogs.filter((t) => t.severity === 'high').length,
        recentThreats: threatLogs.slice(0, 3).map((t) => ({
          type: t.threat_type,
          user: t.user_name,
          process: t.detected_process,
          severity: t.severity
        })),
        systemOwner: {
          telegram: "https://t.me/PrinceOfSeal",
          email: "v***72@gmail.com",
          account: "Verified Merchant Node"
        }
      };

      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: historyPayload,
          contextData: contextSnapshot
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to communicate with Gemini AI API');
      }

      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Response successfully synthesized.',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: `API Connection Error: ${err.message || 'Please check GEMINI_API_KEY environment variable.'}\n\nSupport Node: https://t.me/PrinceOfSeal | v***72@gmail.com`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      onShowToast('Unable to connect to AI Assistant', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    {
      title: 'Analyze Live Threat Logs',
      desc: 'Scan memory injection & unauthorized debugger hooks',
      prompt: 'Please analyze current system threat logs and provide immediate mitigation countermeasures.'
    },
    {
      title: 'Audit HWID Security & Node Vault',
      desc: 'Strengthen hardware fingerprint binding',
      prompt: 'How do we enforce hardware-bound seat quotas against virtual machine spoofing?'
    },
    {
      title: 'Optimize Ring-0 Driver Overhead',
      desc: 'Reduce latency while keeping 144 FPS Lock',
      prompt: 'Explain strategies to maintain DirectX 12 rendering at 144 FPS with sub-millisecond kernel filter overhead.'
    },
    {
      title: 'Super Admin RBAC Policy Review',
      desc: 'Audit permission tiers and session tokens',
      prompt: 'What are the recommended privilege levels for enterprise managers vs client operators?'
    }
  ];

  return (
    <div className="space-y-6 font-mono select-none">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#18140E] via-[#241B0E] to-[#120F0A] border-2 border-[#D4AF37]/50 p-5 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#CCFF00] text-black font-mono font-black text-[10px] uppercase tracking-widest rounded-sm">
                AI GEMINI POWERED
              </span>
              <span className="px-2.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D98E] font-mono font-bold text-[10px] tracking-wider">
                SUPER ADMIN ADVISORY
              </span>
            </div>

            <h2 className="text-lg lg:text-xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#CCFF00]" />
              <span>AI SECURITY ASSISTANT • 5D THREAT ADVISOR</span>
            </h2>

            <p className="text-xs text-[#F5E8C7]/80 max-w-3xl leading-relaxed font-sans">
              Enterprise AI security telemetry and kernel audit assistant powered by server-side Gemini intelligence for real-time threat response and system hardening.
            </p>
          </div>

          {/* Official Support Node Contacts */}
          <div className="bg-[#0D0B08] border border-[#D4AF37]/40 p-3.5 rounded-lg space-y-2.5 shrink-0 w-full lg:w-auto font-mono text-xs shadow-inner">
            <div className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest border-b border-white/10 pb-1 flex items-center justify-between">
              <span>SECURITY DISPATCH NODE</span>
              <span className="text-white/40">VERIFIED</span>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <a
                href="https://t.me/PrinceOfSeal"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-[#1B2836] hover:bg-[#233547] text-[#54A9EB] border border-[#54A9EB]/40 rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="font-bold">Telegram: @PrinceOfSeal</span>
              </a>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2A1B14] text-[#F5A623] border border-[#F5A623]/40 rounded">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-bold">v***72@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Window */}
        <div className="lg:col-span-8 bg-[#0D0B08] border border-[#D4AF37]/30 rounded-xl flex flex-col h-[650px] shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 bg-[#14100A] border-b border-[#D4AF37]/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-[#F5D98E]">
              <Terminal className="w-4 h-4 text-[#CCFF00]" />
              <span className="font-bold uppercase tracking-wider">Gemini Security Console (Live Session)</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span>ACTIVE SESSION</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1 text-[10px] text-white/40">
                    <span className="font-bold text-[#D4AF37]">
                      {isUser ? 'SUPER ADMIN (YOU)' : 'GEMINI SECURITY ADVISOR'}
                    </span>
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-4 rounded-lg whitespace-pre-wrap leading-relaxed shadow-lg font-sans text-xs ${
                      isUser
                        ? 'bg-[#2A2010] text-[#FFF8E1] border border-[#D4AF37]/50 rounded-br-none font-mono'
                        : 'bg-[#15120C] text-[#E0E0E0] border border-[#D4AF37]/25 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1 px-1 text-[10px] text-white/40">
                  <span className="font-bold text-[#CCFF00]">GEMINI AI</span>
                  <span>• Analyzing Telemetry...</span>
                </div>
                <div className="bg-[#15120C] text-[#CCFF00] border border-[#CCFF00]/40 p-3 rounded-lg flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#CCFF00]" />
                  <span>Synthesizing response and threat countermeasure...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 bg-[#14100A] border-t border-[#D4AF37]/20 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask Gemini AI (e.g., Analyze threat logs, inspect HWID policies, explain Ring-0 filter)..."
              disabled={isLoading}
              className="flex-1 bg-black/60 border border-[#D4AF37]/30 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#CCFF00] rounded font-mono"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputPrompt.trim()}
              className="px-4 py-2.5 bg-[#CCFF00] hover:bg-[#BFFF00] disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-black text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 rounded transition-colors cursor-pointer"
            >
              <span>Send</span>
              <SendHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#120F0A] border border-[#D4AF37]/30 p-4 rounded-xl space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-black text-[#F5D98E] uppercase tracking-wider border-b border-white/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>QUICK SECURITY ADVISORY</span>
            </div>

            <div className="space-y-2">
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="w-full text-left p-2.5 bg-[#1B1610] hover:bg-[#261E14] border border-[#D4AF37]/25 hover:border-[#CCFF00] rounded transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-[#CCFF00]">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-white/50">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#120F0A] border border-[#D4AF37]/30 p-4 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 font-black text-[#F5D98E] uppercase tracking-wider border-b border-white/10 pb-2">
              <Cpu className="w-4 h-4 text-[#D4AF37]" />
              <span>LIVE CONTEXT SYNC</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-black/40 p-2 border border-white/5 rounded">
                <span className="text-white/40 block text-[9px]">LICENSES:</span>
                <span className="text-white font-bold">{licenses.length} Total</span>
              </div>
              <div className="bg-black/40 p-2 border border-white/5 rounded">
                <span className="text-white/40 block text-[9px]">ACTIVE SEATS:</span>
                <span className="text-[#CCFF00] font-bold">{devices.length} Devices</span>
              </div>
              <div className="bg-black/40 p-2 border border-white/5 rounded">
                <span className="text-white/40 block text-[9px]">THREAT LOGS:</span>
                <span className="text-[#FF5555] font-bold">{threatLogs.length} Events</span>
              </div>
              <div className="bg-black/40 p-2 border border-white/5 rounded">
                <span className="text-white/40 block text-[9px]">SECURITY LEVEL:</span>
                <span className="text-[#CCFF00] font-bold">5D IMMORTAL</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-white/60 space-y-1">
              <div>
                <strong className="text-white">API Key Security:</strong> Server-Side Managed (Hidden from Browser)
              </div>
              <div>
                <strong className="text-white">Support Node:</strong> @PrinceOfSeal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
