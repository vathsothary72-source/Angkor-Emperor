import React, { useState } from 'react';
import { 
  Key, 
  QrCode, 
  Download, 
  Laptop, 
  Gamepad2, 
  UserCheck, 
  Sparkles, 
  ShieldAlert, 
  FileSpreadsheet, 
  HardDrive, 
  ShoppingBag, 
  ShieldCheck,
  ChevronRight,
  Zap,
  Cpu,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
  X,
  Play,
  Copy,
  ExternalLink,
  Flame,
  Radio,
  Bug,
  DollarSign,
  Layers,
  ArrowRight,
  Maximize2,
  Building2
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';

export interface ToolItem {
  id: string;
  name: string;
  code: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  badge: string;
  latency: string;
  securityRing: string;
  description: string;
  features: string[];
  actionLabel: string;
  onExecute: () => void;
}

interface DashboardToolMatrixProps {
  onOpenGenerateModal: () => void;
  onOpenKhqrModal: () => void;
  onOpenSetupModal: () => void;
  onOpenClientSim: () => void;
  onNavigateTab: (tabId: string) => void;
  onExportCSV: () => void;
}

export const DashboardToolMatrix: React.FC<DashboardToolMatrixProps> = ({
  onOpenGenerateModal,
  onOpenKhqrModal,
  onOpenSetupModal,
  onOpenClientSim,
  onNavigateTab,
  onExportCSV,
}) => {
  // Tools definition with rich hover telemetry
  const tools: ToolItem[] = [
    {
      id: 'bank-hack-defense',
      name: '5D Enterprise & Financial Defense Engine',
      code: 'FN-BNK-00',
      category: 'Zero-Trust Core',
      icon: Building2,
      color: '#D4AF37',
      glowColor: 'rgba(212, 175, 55, 0.5)',
      badge: 'POST-QUANTUM KYBER-1024',
      latency: '0.01ms Ring-0',
      securityRing: 'Enterprise Armor',
      description: 'Enterprise penetration defense suite securing payment webhooks, API gateways, and settlement wires against MITM, Trojan scrapers, and ransomware.',
      features: [
        'ISO 20022 Gateway & Payload Tamper Interception',
        'OAuth2 & Gateway Replay Attack Blocker',
        'Stealth Memory Dumper & Trojan Annihilator',
        'NIST Post-Quantum Cryptography (Kyber-1024 / Dilithium-5)'
      ],
      actionLabel: 'Launch Defense Suite',
      onExecute: () => onNavigateTab('banking'),
    },
    {
      id: 'generate-license',
      name: 'Generate Master License',
      code: 'FN-GEN-01',
      category: 'Cryptographic Core',
      icon: Key,
      color: '#CCFF00',
      glowColor: 'rgba(204, 255, 0, 0.4)',
      badge: '256-BIT ED25519',
      latency: '0.12ms',
      securityRing: 'Ring 0 Super Admin',
      description: 'Generates secure cryptographic license keys with custom device quotas, plan tiers (Trial, Pro, Enterprise, Lifetime), and hardware locking flags.',
      features: [
        'Custom Plan Tiers: Pro, Enterprise, Lifetime',
        'Hardware Seat limits (1 to 999 seats)',
        'SHA-256 HMAC digital signature verification',
        'One-click clipboard copy with user invoice'
      ],
      actionLabel: 'Launch License Generator',
      onExecute: onOpenGenerateModal,
    },
    {
      id: 'encrypted-gateway',
      name: 'Encrypted Payment Gateway',
      code: 'FN-PAY-02',
      category: 'Financial Gateway',
      icon: QrCode,
      color: '#D4AF37',
      glowColor: 'rgba(212, 175, 55, 0.4)',
      badge: 'ISO 20022 STANDARD',
      latency: 'Instant Sync',
      securityRing: 'Verified Merchant',
      description: 'Official verified encrypted gateway for automated lifetime license activation and multi-currency billing.',
      features: [
        'Official Account: S*** P*** (Primary Node)',
        'Supports USD dual currency transactions',
        'Direct connection to global settlement clearing',
        'Instant confirmation & automated license release'
      ],
      actionLabel: 'Open Payment Gateway',
      onExecute: onOpenKhqrModal,
    },
    {
      id: 'desktop-installer',
      name: 'Automated Setup Script Generator',
      code: 'FN-INS-03',
      category: 'Client Deployment',
      icon: Download,
      color: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
      badge: 'NATIVE AUTOMATION',
      latency: '< 3s Deploy',
      securityRing: 'Admin Elevated UAC',
      description: 'Generates one-click native installation scripts with automatic firewall rule creation and HWID pairing.',
      features: [
        'Automated endpoint security exclusion injection',
        'Hardware Fingerprint (UUID/BIOS/MAC) auto-harvest',
        'Offline 24h HMAC emergency license cache setup',
        'Silent background service daemon configuration'
      ],
      actionLabel: 'Download Setup Scripts',
      onExecute: onOpenSetupModal,
    },
    {
      id: 'hacker-arena',
      name: 'Offensive Cyber Attack Simulator',
      code: 'FN-ATK-01',
      category: 'Offensive Engine',
      icon: Flame,
      color: '#FF3B30',
      glowColor: 'rgba(255, 59, 48, 0.4)',
      badge: 'LIVE FIRE ARENA',
      latency: 'Real-Time',
      securityRing: 'Red Team Simulator',
      description: 'Trigger live synthetic threat payloads (Ransomware, DDoS, Memory Injection) to test the 5D Core Defense resilience in real-time.',
      features: [
        'Simulate DDoS Volume Floods',
        'Trigger Memory Injection & Sandbox Evasion',
        'Launch Ransomware Encryption Simulation',
        'Monitor Active Counter-Strikes visually'
      ],
      actionLabel: 'Launch Attack Arena',
      onExecute: () => onNavigateTab('offensive'),
    },
    {
      id: 'client-simulator',
      name: 'Client Simulator & HWID Sandbox',
      code: 'FN-SIM-04',
      category: 'Diagnostic Sandbox',
      icon: Laptop,
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      badge: 'LIVE HARDWARE EMULATOR',
      latency: 'Real-Time',
      securityRing: 'Isolated Sandbox',
      description: 'Live test environment simulating client-side verification handshakes, offline license fallback tokens, and hardware fingerprint collision tests.',
      features: [
        'Simulate hardware component modification (MAC/CPU)',
        'Test offline 24-hour cryptographic fallback token',
        'Inspect raw JSON-RPC verification payload',
        'Simulate license revocation and seat quota exhaustion'
      ],
      actionLabel: 'Launch Client Simulator',
      onExecute: onOpenClientSim,
    },
    {
      id: 'alpha8-monitor',
      name: 'Alpha8 144 FPS Engine Shield',
      code: 'FN-GAM-05',
      category: 'Kernel Anti-Cheat',
      icon: Gamepad2,
      color: '#CCFF00',
      glowColor: 'rgba(204, 255, 0, 0.4)',
      badge: '144 FPS REAL-TIME',
      latency: '0.04ms Render',
      securityRing: 'Kernel Ring 0',
      description: 'Real-time telemetry monitor and frame rate stabilizer for Game Alpha8 with active memory injection interception and process isolation.',
      features: [
        'Live 144 FPS performance stabilizer & latency gauge',
        'Anti-speedhack microsecond clock synchronization',
        'Protected process memory integrity hashing',
        'Instant threat intercept & client disconnect trigger'
      ],
      actionLabel: 'Open Alpha8 Shield',
      onExecute: () => onNavigateTab('alpha8'),
    },
    {
      id: 'super-admin-rbac',
      name: 'Super Admin RBAC & Delegation',
      code: 'FN-ADM-06',
      category: 'Access Control',
      icon: UserCheck,
      color: '#C084FC',
      glowColor: 'rgba(192, 132, 252, 0.4)',
      badge: 'ENTERPRISE RBAC',
      latency: 'Zero-Trust',
      securityRing: 'Master Operator',
      description: 'Hierarchical role-based access control management to delegate client permissions, restrict IP subnets, and configure sub-admin quotas.',
      features: [
        'Role tiers: Super Admin, Enterprise Manager, Client',
        'Granular module toggles (Billing, HWID, Kernel)',
        'Audit trail of all administrative state modifications',
        'Cryptographic session revocation master switch'
      ],
      actionLabel: 'Manage Super Admin RBAC',
      onExecute: () => onNavigateTab('superadmin'),
    },
    {
      id: 'gemini-assistant',
      name: 'AI Security Assistant & Intelligence',
      code: 'FN-AI-07',
      category: 'Autonomous AI',
      icon: Sparkles,
      color: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      badge: 'GEMINI 2.5 INTEGRATION',
      latency: '< 1s Inference',
      securityRing: 'Encrypted Proxy',
      description: 'AI-driven assistant for automated inquiry resolution, threat pattern synthesis, and instant response generation.',
      features: [
        'Context-aware license & payment troubleshooting',
        'Automated enterprise security responses',
        'One-click response copy formatted for communication',
        'System security recommendations and kernel analysis'
      ],
      actionLabel: 'Open AI Console',
      onExecute: () => onNavigateTab('gemini'),
    },
    {
      id: 'threat-sentinel',
      name: '5D Threat Zero-Trust Sentinel',
      code: 'FN-SEC-08',
      category: 'Cyber Defense',
      icon: ShieldAlert,
      color: '#EF4444',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      badge: 'ZERO-TRUST KERNEL',
      latency: 'Active Shield',
      securityRing: 'Ring 0 Interceptor',
      description: 'Continuous threat intelligence telemetry intercepting debuggers, sandbox detection, and unauthorized DLL hooks.',
      features: [
        'Real-time IP & MAC hardware blacklisting',
        'Honeypot memory decoy trigger telemetry',
        'Anti-hooking VMT table protection for process loops',
        'Exportable incident report for forensic analysis'
      ],
      actionLabel: 'Inspect Threat Sentinel',
      onExecute: () => onNavigateTab('threats'),
    },
    {
      id: 'hardware-nodes',
      name: 'Hardware Seat & Node Manager',
      code: 'FN-NOD-09',
      category: 'Fleet Management',
      icon: HardDrive,
      color: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      badge: 'HWID BINDING',
      latency: 'Instant Sync',
      securityRing: 'Device Vault',
      description: 'Inspects all active connected hardware nodes with unique CPU/Motherboard fingerprints, last-seen timestamps, and one-click remote unlinking.',
      features: [
        'Hardware fingerprint inspection (UUID, CPU, NIC)',
        'Geolocation & IP origin tracking per device',
        'One-click remote hardware seat deactivation',
        'Enforce maximum concurrent seat thresholds'
      ],
      actionLabel: 'View Hardware Nodes',
      onExecute: () => onNavigateTab('devices'),
    },
    {
      id: 'export-csv',
      name: 'Telemetry CSV Exporter',
      code: 'FN-EXP-10',
      category: 'Data Governance',
      icon: FileSpreadsheet,
      color: '#00E676',
      glowColor: 'rgba(0, 230, 118, 0.4)',
      badge: 'AUDIT COMPLIANT',
      latency: 'Instant',
      securityRing: 'Audit Level',
      description: 'Exports full license registry, hardware bindings, and threat telemetry into structured CSV files for accounting and client audits.',
      features: [
        'RFC 4180 compliant CSV export format',
        'Includes metadata, expiration dates, and hardware counts',
        'Encrypted timestamping for audit log verification',
        'Offline compatible for on-premise backups'
      ],
      actionLabel: 'Export CSV File',
      onExecute: onExportCSV,
    },
    {
      id: 'sales-distribution',
      name: '5D Cyber Armor & Distribution Hub',
      code: 'FN-SAL-11',
      category: 'Commercial Hub',
      icon: ShoppingBag,
      color: '#EAB308',
      glowColor: 'rgba(234, 179, 8, 0.45)',
      badge: 'DEFENSE & STOREFRONT',
      latency: 'Real-Time',
      securityRing: 'Commercial Armor',
      description: '5D Zero-Trust Shield protecting applications and operating systems against Trojans, Ransomware, and memory injection, paired with tiered license distribution.',
      features: [
        '5D Threat Elimination & Kernel Isolation',
        'Cross-Platform: Desktop, Mobile, and Enterprise Servers',
        'Automated volume discount & wholesale tier calculator',
        'Direct link with Encrypted Payment Gateway'
      ],
      actionLabel: 'Open Distribution Hub',
      onExecute: () => onNavigateTab('sales'),
    },
    {
      id: 'security-matrix',
      name: '5D Security & Kernel Assessment',
      code: 'FN-SEC-12',
      category: 'System Hardening',
      icon: ShieldCheck,
      color: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      badge: 'ENTERPRISE 5D',
      latency: '0.01ms Ring-0',
      securityRing: 'Kernel Isolation',
      description: 'Deep audit engine analyzing Ring-0 privilege separation, HMAC signature strength, debugger resistance, and Anti-VM hypervisor detection.',
      features: [
        'Anti-Tamper bypass & process memory protection',
        'HMAC SHA-256 digital signature integrity check',
        'Hypervisor & Virtual Machine hardware lock verification',
        'Automated vulnerability score and hardening suggestions'
      ],
      actionLabel: 'Open Security Assessment',
      onExecute: () => onNavigateTab('security'),
    }
  ];

  const [activeToolId, setActiveToolId] = useState<string>('generate-license');
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(true);

  const selectedTool = tools.find((t) => t.id === activeToolId) || tools[0];

  const handleToolClick = (tool: ToolItem) => {
    setActiveToolId(tool.id);
    setIsSectionExpanded(true);
  };

  return (
    <div className="space-y-4 mb-8 font-mono select-none">
      {/* SECTION HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D4AF37]/25">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#141414] border border-[#D4AF37]/40 rounded-lg text-[#CCFF00]">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <span>COMMAND & TOOL MATRIX</span>
              <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-black rounded shadow-[0_0_10px_rgba(204,255,0,0.4)]">
                CLICK TO VIEW SECTION
              </span>
            </h3>
            <p className="text-[11px] text-[#F5E8C7]/80 font-sans">
              Select any tool module below to inspect real-time telemetry and trigger direct executions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
          <Activity className="w-3.5 h-3.5 text-[#CCFF00] animate-pulse" />
          <span className="text-white font-bold">{tools.length} MODULES READY</span>
        </div>
      </div>

      {/* 1. HORIZONTAL INTERACTIVE TOOL BUTTONS - DEFENSE */}
      <div>
        <h4 className="text-[#CCFF00] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border-l-2 border-[#CCFF00] pl-2 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          ប្រព័ន្ធការពារ និងគ្រប់គ្រង (DEFENSE & MANAGEMENT)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {tools.filter(t => !['hacker-arena', 'client-simulator'].includes(t.id)).map((tool) => {
            const isSelected = activeToolId === tool.id;
            const IconComponent = tool.icon;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleToolClick(tool)}
                className={`p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between h-[92px] select-none ${
                  isSelected
                    ? 'scale-[1.04] shadow-2xl z-10 ring-2'
                    : 'bg-[#0E0C09]/90 hover:bg-[#18140B] border-white/10 hover:border-white/40 text-white/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? '#1A150C' : undefined,
                  borderColor: isSelected ? tool.color : undefined,
                  boxShadow: isSelected ? `0 0 25px ${tool.glowColor}` : undefined,
                }}
              >
                {isSelected && (
                  <div 
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-black flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: tool.color }}
                  >
                    <span className="w-1 h-1 bg-black rounded-full" />
                  </div>
                )}

                {/* Top Row: Icon + Code Badge */}
                <div className="flex items-center justify-between w-full">
                  <div 
                    className="p-1.5 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isSelected ? '#000000' : '#141414',
                      borderColor: isSelected ? tool.color : 'rgba(255,255,255,0.1)',
                      color: isSelected ? tool.color : '#F5D98E'
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <span 
                    className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-tighter"
                    style={{
                      backgroundColor: isSelected ? tool.color : 'rgba(255,255,255,0.08)',
                      color: isSelected ? '#000000' : 'rgba(255,255,255,0.6)'
                    }}
                  >
                    {tool.code}
                  </span>
                </div>

                {/* Bottom: Tool Name */}
                <div>
                  <div className={`text-[11px] font-bold font-sans line-clamp-1 ${isSelected ? 'text-white font-black' : 'text-white/80'}`}>
                    {tool.name}
                  </div>
                  <div className="text-[9px] font-mono text-white/50 group-hover:text-white/80 truncate flex items-center justify-between mt-0.5">
                    <span>{tool.category}</span>
                    {isSelected && (
                      <span className="text-[8px] font-bold" style={{ color: tool.color }}>● ACTIVE</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* OFFENSIVE SIMULATOR TOOLS */}
      <div className="pt-2">
        <h4 className="text-[#FF3B30] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border-l-2 border-[#FF3B30] pl-2 mb-3 mt-4">
          <Flame className="w-3.5 h-3.5" />
          ប្រព័ន្ធវាយប្រហារសាកល្បង (OFFENSIVE & ATTACK SIMULATION)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {tools.filter(t => ['hacker-arena', 'client-simulator'].includes(t.id)).map((tool) => {
            const isSelected = activeToolId === tool.id;
            const IconComponent = tool.icon;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleToolClick(tool)}
                className={`p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between h-[92px] select-none ${
                  isSelected
                    ? 'scale-[1.04] shadow-2xl z-10 ring-2'
                    : 'bg-[#180A0A]/90 hover:bg-[#200D0D] border-[#FF3B30]/20 hover:border-[#FF3B30]/50 text-white/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? '#250D0D' : undefined,
                  borderColor: isSelected ? tool.color : undefined,
                  boxShadow: isSelected ? `0 0 25px ${tool.glowColor}` : undefined,
                }}
              >
                {isSelected && (
                  <div 
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-black flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: tool.color }}
                  >
                    <span className="w-1 h-1 bg-black rounded-full" />
                  </div>
                )}

                {/* Top Row: Icon + Code Badge */}
                <div className="flex items-center justify-between w-full">
                  <div 
                    className="p-1.5 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isSelected ? '#000000' : '#1A0808',
                      borderColor: isSelected ? tool.color : 'rgba(255,59,48,0.2)',
                      color: isSelected ? tool.color : '#FF3B30'
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <span 
                    className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-tighter"
                    style={{
                      backgroundColor: isSelected ? tool.color : 'rgba(255,59,48,0.1)',
                      color: isSelected ? '#000000' : 'rgba(255,59,48,0.5)'
                    }}
                  >
                    {tool.code}
                  </span>
                </div>

                {/* Bottom: Tool Name */}
                <div>
                  <div className={`text-[11px] font-bold font-sans line-clamp-1 ${isSelected ? 'text-white font-black' : 'text-white/80'}`}>
                    {tool.name}
                  </div>
                  <div className="text-[9px] font-mono text-white/50 group-hover:text-white/80 truncate flex items-center justify-between mt-0.5">
                    <span>{tool.category}</span>
                    {isSelected && (
                      <span className="text-[8px] font-bold" style={{ color: tool.color }}>● ACTIVE</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DEDICATED EXPANDED SECTION FOR THE CLICKED TOOL */}
      {isSectionExpanded && selectedTool && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border-2 bg-gradient-to-r from-[#120E08] via-[#1A140B] to-[#0D0A06] relative overflow-hidden shadow-2xl transition-all duration-300 animate-fadeIn"
          style={{
            borderColor: selectedTool.color,
            boxShadow: `0 10px 35px ${selectedTool.glowColor}`
          }}
        >
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{ backgroundColor: selectedTool.color }}
          />

          {/* Section Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ 
                  backgroundColor: `${selectedTool.color}20`,
                  borderColor: selectedTool.color,
                  color: selectedTool.color
                }}
              >
                {React.createElement(selectedTool.icon, { className: 'w-5 h-5' })}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider text-black"
                    style={{ backgroundColor: selectedTool.color }}
                  >
                    {selectedTool.code}
                  </span>
                  <h4 className="text-base sm:text-lg font-black font-mono text-white uppercase tracking-wider">
                    {selectedTool.name}
                  </h4>
                </div>
                <div className="text-[10px] font-mono text-white/50 flex items-center gap-2 mt-0.5">
                  <span>CATEGORY: <strong className="text-white">{selectedTool.category}</strong></span>
                  <span>•</span>
                  <span>SECURITY: <strong style={{ color: selectedTool.color }}>{selectedTool.securityRing}</strong></span>
                  <span>•</span>
                  <span>LATENCY: <strong className="text-white">{selectedTool.latency}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Action & Close Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={selectedTool.onExecute}
                className="px-4 py-2 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-black flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105"
                style={{
                  backgroundColor: selectedTool.color,
                  boxShadow: `0 0 15px ${selectedTool.glowColor}`
                }}
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>{selectedTool.actionLabel}</span>
              </button>

              <button
                onClick={() => setIsSectionExpanded(false)}
                className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer"
                title="Close Section"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section Dynamic Interactive Body */}
          <div className="pt-4 space-y-4 relative z-10">
            <div className="bg-black/50 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <p className="text-xs text-[#F5E8C7] leading-relaxed font-sans">
                  {selectedTool.description}
                </p>
              </div>

              {/* 5D Audio/Activity Visualizer */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#120E08] rounded-xl border border-white/15 shrink-0">
                <span className="w-1.5 h-4 rounded-full animate-pulse" style={{ backgroundColor: selectedTool.color, animationDuration: '0.4s' }} />
                <span className="w-1.5 h-7 rounded-full animate-pulse" style={{ backgroundColor: selectedTool.color, animationDuration: '0.6s' }} />
                <span className="w-1.5 h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedTool.color, animationDuration: '0.3s' }} />
                <span className="w-1.5 h-8 rounded-full animate-pulse" style={{ backgroundColor: selectedTool.color, animationDuration: '0.7s' }} />
                <span className="w-1.5 h-5 rounded-full animate-pulse" style={{ backgroundColor: selectedTool.color, animationDuration: '0.5s' }} />
                <span className="text-[9px] font-mono font-bold text-white/70 ml-1">5D ENGINE ACTIVE</span>
              </div>
            </div>

            {/* DEDICATED INTERACTIVE SUBMODULE FOR EACH TOOL */}
            {selectedTool.id === 'bank-hack-defense' && (
              <div className="bg-[#181208] p-5 rounded-xl border-2 border-[#D4AF37] grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-mono shadow-xl">
                <div className="space-y-1">
                  <div className="text-[10px] text-[#D4AF37] font-black uppercase tracking-wider">DEFENSE ENGINE</div>
                  <div className="text-sm font-bold text-white">ISO 20022 & Settlement Wire Shield</div>
                  <div className="text-[11px] text-[#F5E8C7] font-sans">Intercepts unauthorized payload tampering and neutralizes stealth Trojans.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">CRYPTOGRAPHIC STANDARD</div>
                  <div className="text-sm font-bold text-[#CCFF00]">Post-Quantum Kyber-1024 / NIST FIPS 203</div>
                  <div className="text-[11px] text-white/70 font-sans">Lattice-based encryption resistant to quantum decryption.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('banking')}
                    className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Open Bank Defense 5D</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'generate-license' && (
              <div className="bg-[#140F08] p-4 rounded-xl border border-[#CCFF00]/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">CRYPTOGRAPHIC SUITE</div>
                  <div className="text-sm font-bold text-[#CCFF00]">256-Bit Ed25519 + SHA-256</div>
                  <div className="text-[11px] text-white/70 font-sans">Hardware-bound cryptographic keys with tamper detection.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">SUPPORTED TIERS</div>
                  <div className="text-sm font-bold text-white">Monthly, Yearly, Enterprise, Lifetime</div>
                  <div className="text-[11px] text-white/70 font-sans">Configurable seat allocation from 1 to 999 devices.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={onOpenGenerateModal}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#CCFF00] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Key className="w-4 h-4" />
                    <span>Open License Generator</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'encrypted-gateway' && (
              <div className="bg-[#140F08] p-4 rounded-xl border border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">OFFICIAL MERCHANT NODE</div>
                  <div className="text-sm font-bold text-[#D4AF37]">S*** P*** (Primary Node)</div>
                  <div className="text-[11px] text-white/70 font-sans">Direct encrypted billing gateway.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">GATEWAY STANDARDS</div>
                  <div className="text-sm font-bold text-white">USD ($) Multi-Currency Supported</div>
                  <div className="text-[11px] text-white/70 font-sans">Universal payment compliance and automated verification.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={onOpenKhqrModal}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#D4AF37] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Open Payment Modal</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'desktop-installer' && (
              <div className="bg-[#081525] p-4 rounded-xl border border-cyan-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">TARGET OS PLATFORMS</div>
                  <div className="text-sm font-bold text-cyan-400">Desktop & Server Systems (x64 / ARM64)</div>
                  <div className="text-[11px] text-white/70 font-sans">Automated Ring-0 driver service installation and security rules.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">ADMIN DEPLOYMENT</div>
                  <div className="text-sm font-bold text-white">PowerShell & Shell Scripts</div>
                  <div className="text-[11px] text-white/70 font-sans">Zero manual configuration required.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={onOpenSetupModal}
                    className="w-full sm:w-auto px-5 py-2.5 bg-cyan-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Setup Scripts</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'client-simulator' && (
              <div className="bg-[#081A12] p-4 rounded-xl border border-emerald-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">SANDBOX HWID</div>
                  <div className="text-sm font-bold text-emerald-400">HWID: a8f3...491d (Secured)</div>
                  <div className="text-[11px] text-white/70 font-sans">Simulate verification handshakes and 24h offline fallback tokens.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">THEME SELECTION</div>
                  <div className="text-sm font-bold text-white">Gold, Emerald, Saturn, Crimson, Sunset, Hologram</div>
                  <div className="text-[11px] text-white/70 font-sans">Dynamic Theme Color Selector enabled.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={onOpenClientSim}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Open Client Simulator</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'alpha8-monitor' && (
              <div className="bg-[#121606] p-4 rounded-xl border border-[#CCFF00]/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">FPS & LATENCY TELEMETRY</div>
                  <div className="text-sm font-bold text-[#CCFF00]">144.2 FPS // 0.04ms Frame Time</div>
                  <div className="text-[11px] text-white/70 font-sans">Protected with anti-speedhack and continuous memory hashing.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">RING 0 DRIVER SHIELD</div>
                  <div className="text-sm font-bold text-white">AngkorShieldRing0.sys (Active)</div>
                  <div className="text-[11px] text-white/70 font-sans">Blocks debugger attach and memory injection instantly.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('alpha8')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#CCFF00] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>View Alpha8 Shield</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'super-admin-rbac' && (
              <div className="bg-[#1A0D25] p-4 rounded-xl border border-purple-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">RBAC HIERARCHY</div>
                  <div className="text-sm font-bold text-purple-400">Super Admin Delegation</div>
                  <div className="text-[11px] text-white/70 font-sans">Define distributor roles and client permissions.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">MODULE PERMISSIONS</div>
                  <div className="text-sm font-bold text-white">HWID Bind, Revoke, Kernel Toggles</div>
                  <div className="text-[11px] text-white/70 font-sans">Manage license quotas and IP subnets.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('superadmin')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-purple-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Manage Super Admin</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'gemini-assistant' && (
              <div className="bg-[#1F1206] p-4 rounded-xl border border-orange-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">AI REASONING ENGINE</div>
                  <div className="text-sm font-bold text-orange-400">Gemini 2.5 Security Intelligence</div>
                  <div className="text-[11px] text-white/70 font-sans">Autonomous threat analysis and instant resolution synthesis.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">SUPPORT DISPATCH</div>
                  <div className="text-sm font-bold text-white">Autonomous Technical Synthesis</div>
                  <div className="text-[11px] text-white/70 font-sans">Analyze threat incidents and generate remediation logs.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('gemini')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-orange-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open AI Assistant</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'threat-sentinel' && (
              <div className="bg-[#240808] p-4 rounded-xl border border-red-500/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">ZERO-TRUST SENTINEL</div>
                  <div className="text-sm font-bold text-red-400">Active Anti-Debugger & Honeypot</div>
                  <div className="text-[11px] text-white/70 font-sans">Blocks memory injection and VM detection in real-time.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">INSTANT BLACKLIST</div>
                  <div className="text-sm font-bold text-white">Auto IP/MAC Block in 0.01ms</div>
                  <div className="text-[11px] text-white/70 font-sans">Record forensic logs and drop rogue sessions instantly.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('threats')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-red-500 text-white font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>View Threat Intelligence</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'hardware-nodes' && (
              <div className="bg-[#081525] p-4 rounded-xl border border-cyan-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">FLEET MANAGEMENT</div>
                  <div className="text-sm font-bold text-cyan-400">Hardware HWID Node Registry</div>
                  <div className="text-[11px] text-white/70 font-sans">Inspect connected nodes and live device telemetry.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">REMOTE UNLINK</div>
                  <div className="text-sm font-bold text-white">Sub-second HWID Reallocation</div>
                  <div className="text-[11px] text-white/70 font-sans">Remotely unlink decommissioned hardware seats.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('devices')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-cyan-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>View Hardware Nodes</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'export-csv' && (
              <div className="bg-[#081A10] p-4 rounded-xl border border-emerald-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">DATA GOVERNANCE</div>
                  <div className="text-sm font-bold text-emerald-400">RFC 4180 Standard CSV Export</div>
                  <div className="text-[11px] text-white/70 font-sans">Download complete license, HWID, and threat telemetry archives.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">AUDIT COMPLIANCE</div>
                  <div className="text-sm font-bold text-white">Encrypted Cryptographic Timestamps</div>
                  <div className="text-[11px] text-white/70 font-sans">Compliant with financial reporting and external security audits.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={onExportCSV}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV File</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'sales-distribution' && (
              <div className="bg-[#1A1608] p-4 rounded-xl border border-[#EAB308]/40 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">CYBER ARMOR SUITE</div>
                  <div className="text-sm font-bold text-[#EAB308]">5D Zero-Trust Shield & Storefront</div>
                  <div className="text-[11px] text-[#F5E8C7] font-sans">Neutralize Trojans and ransomware with Ring-0 kernel isolation.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">DISTRIBUTION HUB</div>
                  <div className="text-sm font-bold text-white">Desktop, Mobile & Enterprise</div>
                  <div className="text-[11px] text-white/70 font-sans">Wholesale tiering with automated license fulfillment.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('sales')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#EAB308] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Open Distribution Hub</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTool.id === 'security-matrix' && (
              <div className="bg-[#160A22] p-4 rounded-xl border border-purple-400/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">5D SECURITY AUDIT</div>
                  <div className="text-sm font-bold text-purple-400">Enterprise Ring-0 Assessment</div>
                  <div className="text-[11px] text-white/70 font-sans">Audit defense resilience across all system modules.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase">HARDENING SCORE</div>
                  <div className="text-sm font-bold text-[#CCFF00]">99.8% Resilience Rating</div>
                  <div className="text-[11px] text-white/70 font-sans">Protects hypervisors, VMs, debuggers, and memory hooks.</div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigateTab('security')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-purple-400 text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Open Security Assessment</span>
                  </button>
                </div>
              </div>
            )}

            {/* Key Capabilities Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-3 border-t border-white/10">
              {selectedTool.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-white/80 font-sans bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: selectedTool.color }} />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
