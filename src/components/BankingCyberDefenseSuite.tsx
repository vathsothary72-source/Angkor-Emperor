import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Cpu, 
  Terminal, 
  Activity, 
  Zap, 
  Flame, 
  Bug, 
  Building2, 
  CreditCard, 
  Globe, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Key, 
  Radio, 
  Play, 
  Sparkles,
  Layers,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { LogoArchetype, LOGO_STYLES } from './AngkorLogo';
import { ThreatLog } from '../types';

interface BankDefenseVector {
  id: string;
  name: string;
  targetBank: string;
  threatType: string;
  mitigationTech: string;
  protectionRate: number;
  status: 'ACTIVE_ARMORED' | 'ISOLATING' | 'NEUTRALIZED';
  encryptionStandard: string;
  description: string;
  attackPayloadSample: string;
  defenseResponseCode: string;
}

interface BankingCyberDefenseSuiteProps {
  onSimulateThreat: (newThreat: ThreatLog) => void;
  activeTheme?: LogoArchetype;
}

export const BankingCyberDefenseSuite: React.FC<BankingCyberDefenseSuiteProps> = ({
  onSimulateThreat,
  activeTheme = 'gold'
}) => {
  const currentStyle = LOGO_STYLES.find((s) => s.id === activeTheme) || LOGO_STYLES[0];
  
  const [activeVectorId, setActiveVectorId] = useState<string>('gateway_tamper');
  const [isSimulatingAttack, setIsSimulatingAttack] = useState<boolean>(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    '[INIT] 5D Enterprise Defense Engine boot successful. Core Kyber-1024 Active.',
    '[MONITOR] Listening on all API Gateways & Transaction Webhooks...',
    '[STATUS] Zero-Trust Ring-0 Kernel Filter: 100% Armed & Active.'
  ]);
  const [bankDefenseScore, setBankDefenseScore] = useState<number>(99.98);
  const [packetsScanned, setPacketsScanned] = useState<number>(1482920);

  // Enterprise Cyber Defense Vectors
  const bankVectors: BankDefenseVector[] = [
    {
      id: 'gateway_tamper',
      name: 'ISO 20022 Financial Gateway & Payload Shield',
      targetBank: 'Core Financial Switches & Payment Matrix',
      threatType: 'Packet Payload Tampering & MITM Injection',
      mitigationTech: 'HMAC-SHA512 + Strict ISO 20022 CRC Payload Validation',
      protectionRate: 100,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'Post-Quantum Kyber-1024 / Ed25519',
      description: 'Intercepts unauthorized man-in-the-middle packet injections that attempt to alter recipient accounts or transaction amounts during gateway validation.',
      attackPayloadSample: 'INJECT_PAYLOAD: {"gateway":"SEC_PAY_NODE","tamper_amount":"$9,999.00","fake_crc":"0xFA99"}',
      defenseResponseCode: 'INTERCEPT_SUCCESS: Invalid CRC detected! Signature mismatch. Node banned & packet dropped in 0.01ms.'
    },
    {
      id: 'token_replay_guard',
      name: 'OAuth2 & API Gateway Anti-Replay Shield',
      targetBank: 'Enterprise Settlement APIs & Webhooks',
      threatType: 'OAuth2 Token Replay & API Spoofing',
      mitigationTech: 'Dynamic Ephemeral Nonce + 300s Rolling Key Rotation',
      protectionRate: 99.9,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'AES-256-GCM Ephemeral Tokens',
      description: 'Prevents adversaries from sniffing and replaying payment approval tokens. Every transaction is signed with single-use cryptographically bound hardware timestamps.',
      attackPayloadSample: 'POST /api/v1/gateway/callback HTTP/1.1 -> Replayed Token: eyJhbGciOiJIUzI1Ni... (Used 2m ago)',
      defenseResponseCode: 'REPLAY_REJECTED: Nonce duplicate detected. Session terminated with zero financial impact.'
    },
    {
      id: 'banking_trojan_ram',
      name: 'Trojan & Stealth RAM Dumper Annihilator',
      targetBank: 'Workstation Memory & Credential Vaults',
      threatType: 'Kernel RAM Scraping & Overlay Hooking',
      mitigationTech: 'AngkorEmperor.sys Ring-0 Memory Cloaking',
      protectionRate: 100,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'Hardware-Enforced Virtual Memory Encryption',
      description: 'Neutralizes stealth spyware variants that attempt to capture keystrokes, OTP tokens, or screenshot credential screens.',
      attackPayloadSample: 'PROCESS_INJECT: Hooking OpenProcess(PROCESS_VM_READ) target: FinancialClient.exe',
      defenseResponseCode: 'KERNEL_HOOK_BLOCKED: AngkorEmperor.sys blocked handle creation. Injected thread terminated.'
    },
    {
      id: 'ransomware_freeze',
      name: 'Zero-Day Ransomware Memory Lockdown',
      targetBank: 'Financial Datacenters & Database Clusters',
      threatType: 'Mass File Encryption & Shadow Copy Deletion',
      mitigationTech: 'Heuristic I/O Entropy Traps + Rollback Decoys',
      protectionRate: 100,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'Immutable Real-Time Volume Snapshots',
      description: 'Detects abnormal rapid file encryption patterns. Traps malicious ransomware processes in decoy honeypots and freezes the process tree before damage occurs.',
      attackPayloadSample: 'RANSOMWARE_SIG: VSSAdmin delete shadows /all /quiet && mass rename *.locked',
      defenseResponseCode: 'ZERO_DAY_NEUTRALIZED: Process isolated in honeypot. File system rolled back with 0 byte loss.'
    },
    {
      id: 'swift_quantum_guard',
      name: 'Inter-Bank Settlement Quantum Guard',
      targetBank: 'International Settlement Networks',
      threatType: 'Quantum Computer Decryption & BGP Hijacking',
      mitigationTech: 'NIST Post-Quantum Cryptography (ML-KEM-1024 + Dilithium-5)',
      protectionRate: 100,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'NIST FIPS 203 / 204 Quantum Standard',
      description: 'Guarantees that financial wires and license royalties cannot be decrypted even by state-sponsored advanced quantum decryption clusters.',
      attackPayloadSample: 'INTERCEPT_ATTEMPT: High-density quantum Shor algorithm brute force against RSA-2048 key exchange',
      defenseResponseCode: 'QUANTUM_SHIELD_ACTIVE: Kyber-1024 lattice key exchange intact. Attack vector computational complexity > 2^256.'
    },
    {
      id: 'ddos_bgp_scrubber',
      name: '1.2 Tbps Autonomous BGP Anycast Scrubber',
      targetBank: 'Enterprise Edge Gateways & Payment Hubs',
      threatType: 'Volumetric SYN-Flood & Layer-7 API Overload',
      mitigationTech: 'Anycast Geo-Distributed Rate Filtering',
      protectionRate: 99.99,
      status: 'ACTIVE_ARMORED',
      encryptionStandard: 'BGP Flowspec + Hardware TCAM Filtering',
      description: 'Mitigates massive DDoS attacks targeting payment gateways. Drops malicious SYN floods in sub-milliseconds while maintaining smooth customer checkout.',
      attackPayloadSample: 'DDoS_STREAM: 850 Gbps UDP Reflection + 45M req/sec GET /api/v1/checkout/generate',
      defenseResponseCode: 'SCRUBBED_LIVE: TCAM hardware drop rate 99.99%. Legitimate transaction latency = 0.04ms.'
    }
  ];

  const selectedVector = bankVectors.find((v) => v.id === activeVectorId) || bankVectors[0];

  // Auto increment scanned packets
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketsScanned((prev) => prev + Math.floor(Math.random() * 45 + 12));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerBankSimulation = (vector: BankDefenseVector) => {
    setIsSimulatingAttack(true);
    
    setSimulatedLogs((prev) => [
      `[ALERT] Simulating Penetration Attack: ${vector.name}...`,
      `[INJECTION] Vector: ${vector.threatType} against ${vector.targetBank}`,
      `[ANALYSIS] AI Threat Sentinel detecting anomaly in payload signature...`,
      `[5D INTERCEPT] ${vector.defenseResponseCode}`,
      `[SUCCESS] Zero-Trust Armor: Threat 100% neutralized. Cryptographic audit recorded.`
    ]);

    const newThreat: ThreatLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action: 'COUNTER_ATTACK',
      severity: 'critical',
      ip: '103.216.' + Math.floor(Math.random() * 250) + '.' + Math.floor(Math.random() * 250),
      mac: '00:1A:2B:3C:' + Math.floor(Math.random() * 90 + 10).toString(16).toUpperCase() + ':' + Math.floor(Math.random() * 90 + 10).toString(16).toUpperCase(),
      location: 'Primary Defense Zone (Encrypted Sandbox)',
      status: 'blocked',
      details: `[DEFENSE] ${vector.name} - ${vector.defenseResponseCode}`,
      target_key: 'BANK-SHIELD-01'
    };

    onSimulateThreat(newThreat);

    setTimeout(() => {
      setIsSimulatingAttack(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none font-mono">
      {/* 1. TOP SUPREME BANKING HEADER WITH LIVE METRICS & COMPLIANCE BADGES */}
      <div 
        className="p-6 rounded-2xl border-2 bg-gradient-to-r from-[#120E08] via-[#1A140B] to-[#0A0805] relative overflow-hidden shadow-2xl"
        style={{
          borderColor: currentStyle.primaryColor,
          boxShadow: `0 8px 35px ${currentStyle.accentGlow}`
        }}
      >
        <div 
          className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: currentStyle.primaryColor }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider text-black shadow-md"
                style={{ backgroundColor: currentStyle.primaryColor }}
              >
                ENTERPRISE FINANCIAL GRADE
              </span>
              <span className="px-2.5 py-0.5 rounded bg-black/70 border border-white/20 text-[10px] font-mono font-bold text-[#F5D98E]">
                ISO/IEC 27001 • PCI-DSS LEVEL 1
              </span>
              <span className="px-2.5 py-0.5 rounded bg-black/70 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                ● 100% ZERO-TRUST DEFENSE
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-mono text-white uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-6 h-6" style={{ color: currentStyle.primaryColor }} />
              <span>ADVANCED FINANCIAL & ENTERPRISE CYBER DEFENSE SUITE</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#F5E8C7]/90 max-w-4xl leading-relaxed font-sans">
              High-availability Zero-Trust defense matrix preventing payment payload tampering, Trojan memory dumping, volumetric DDoS attacks, and ransomware through <strong>NIST Post-Quantum Kyber-1024</strong> lattice cryptography.
            </p>
          </div>

          {/* Scanned Packets & Rating Visualizer */}
          <div className="flex items-center gap-4 bg-black/60 p-4 rounded-xl border border-white/15 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">LIVE PACKETS SCANNED</div>
              <div className="text-xl font-black font-mono text-white tracking-wider" style={{ color: currentStyle.primaryColor }}>
                {packetsScanned.toLocaleString()}
              </div>
              <div className="text-[9px] font-mono text-emerald-400">LATENCY: 0.01ms • 0 DROPPED</div>
            </div>

            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center border-2"
              style={{
                borderColor: currentStyle.primaryColor,
                backgroundColor: `${currentStyle.primaryColor}20`,
                boxShadow: `0 0 15px ${currentStyle.accentGlow}`
              }}
            >
              <ShieldCheck className="w-7 h-7" style={{ color: currentStyle.primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. BANK VECTORS DOCK (6 SELECTABLE BANKING DEFENSE SECTORS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {bankVectors.map((vector) => {
          const isSelected = activeVectorId === vector.id;
          return (
            <button
              key={vector.id}
              onClick={() => setActiveVectorId(vector.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between h-[130px] select-none ${
                isSelected
                  ? 'scale-[1.02] shadow-2xl z-10'
                  : 'bg-[#0E0C09]/90 hover:bg-[#18140B] border-white/10 hover:border-white/30 text-white/70 hover:text-white'
              }`}
              style={{
                backgroundColor: isSelected ? '#1A140B' : undefined,
                borderColor: isSelected ? currentStyle.primaryColor : undefined,
                boxShadow: isSelected ? `0 0 25px ${currentStyle.accentGlow}` : undefined,
              }}
            >
              {/* Top Row: Target Bank + Rating */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded bg-black/60 border border-white/15 text-white/90 truncate max-w-[200px]">
                  🛡️ {vector.targetBank}
                </span>
                <span className="text-[10px] font-mono font-black text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {vector.protectionRate}% SAFE
                </span>
              </div>

              {/* Middle: Title */}
              <div>
                <div className={`text-xs font-bold font-sans line-clamp-1 ${isSelected ? 'text-white font-black' : 'text-white/90'}`}>
                  {vector.name}
                </div>
                <div className="text-[10px] font-mono text-white/50 truncate mt-0.5">
                  {vector.threatType}
                </div>
              </div>

              {/* Bottom: Cryptography */}
              <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/10 w-full">
                <span className="truncate max-w-[170px]" style={{ color: isSelected ? currentStyle.primaryColor : undefined }}>
                  {vector.encryptionStandard}
                </span>
                {isSelected ? (
                  <span className="text-[9px] font-bold text-black px-1.5 py-0.2 rounded" style={{ backgroundColor: currentStyle.primaryColor }}>
                    ACTIVE
                  </span>
                ) : (
                  <span className="group-hover:text-white">Click to Test →</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. IN-DEPTH INTERACTIVE SIMULATOR & PENETRATION TESTING DECK */}
      {selectedVector && (
        <div 
          className="p-6 rounded-2xl border-2 bg-gradient-to-r from-[#120E08] via-[#1A140B] to-[#0A0805] relative overflow-hidden shadow-2xl"
          style={{
            borderColor: currentStyle.primaryColor,
            boxShadow: `0 8px 30px ${currentStyle.accentGlow}`
          }}
        >
          {/* Header of Active Sector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase text-black"
                  style={{ backgroundColor: currentStyle.primaryColor }}
                >
                  SECTOR: {selectedVector.targetBank}
                </span>
                <h3 className="text-base sm:text-lg font-black font-mono text-white uppercase tracking-wider">
                  {selectedVector.name}
                </h3>
              </div>
              <p className="text-xs text-[#F5E8C7] mt-1 font-sans">
                {selectedVector.description}
              </p>
            </div>

            {/* Test Simulation Button */}
            <button
              onClick={() => handleTriggerBankSimulation(selectedVector)}
              disabled={isSimulatingAttack}
              className="px-6 py-3 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-black flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
              style={{
                backgroundColor: currentStyle.primaryColor,
                boxShadow: `0 0 20px ${currentStyle.accentGlow}`
              }}
            >
              <Play className={`w-4 h-4 fill-black ${isSimulatingAttack ? 'animate-spin' : ''}`} />
              <span>{isSimulatingAttack ? 'Simulating Attack...' : 'Simulate & Intercept Vector'}</span>
            </button>
          </div>

          {/* Details & Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
            {/* Left Box: Attack Vector & Simulation Payload */}
            <div className="bg-black/60 p-4 rounded-xl border border-red-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-red-400 font-bold border-b border-red-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>SIMULATED ATTACK PAYLOAD</span>
                </div>
                <span className="text-[10px] text-white/50">TARGET: {selectedVector.targetBank}</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-white/50 uppercase">ATTACK METHODOLOGY:</div>
                <div className="text-white font-sans text-xs">{selectedVector.threatType}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-white/50 uppercase">RAW INJECTION PACKET:</div>
                <div className="p-2.5 bg-[#140808] rounded-lg border border-red-500/20 text-red-300 text-[11px] font-mono break-all">
                  {selectedVector.attackPayloadSample}
                </div>
              </div>
            </div>

            {/* Right Box: Defense Countermeasure & Interception Code */}
            <div className="bg-black/60 p-4 rounded-xl border border-emerald-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>5D ZERO-TRUST DEFENSE RESPONSE</span>
                </div>
                <span className="text-[10px] text-[#CCFF00]">RATE: {selectedVector.protectionRate}%</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-white/50 uppercase">MITIGATION TECHNOLOGY:</div>
                <div className="text-white font-sans text-xs">{selectedVector.mitigationTech}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-white/50 uppercase">CRYPTOGRAPHIC RESPONSE:</div>
                <div className="p-2.5 bg-[#08140B] rounded-lg border border-emerald-500/20 text-emerald-300 text-[11px] font-mono break-all">
                  {selectedVector.defenseResponseCode}
                </div>
              </div>
            </div>
          </div>

          {/* Live Terminal Stream of Defense Engine */}
          <div className="mt-4 bg-[#080604] p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-white/50 text-[10px] uppercase pb-1 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" style={{ color: currentStyle.primaryColor }} />
                <span>5D AUTONOMOUS SECURITY SENTINEL TELEMETRY</span>
              </div>
              <span className="text-emerald-400 animate-pulse">● REAL-TIME DISPATCH</span>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {simulatedLogs.map((log, idx) => (
                <div key={idx} className="text-white/80 text-[11px] flex items-center gap-2">
                  <span style={{ color: currentStyle.primaryColor }}>❯</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SECURITY STANDARDS & COMPLIANCE MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-white/50 uppercase">DATA STANDARD</div>
          <div className="text-sm font-bold text-white">ISO 20022 / EMVCo 3DS</div>
          <div className="text-[11px] text-white/60 font-sans">Global Interoperability Matrix</div>
        </div>
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-white/50 uppercase">CRYPTOGRAPHY</div>
          <div className="text-sm font-bold text-[#CCFF00]">Kyber-1024 Post-Quantum</div>
          <div className="text-[11px] text-white/60 font-sans">Quantum-Resistant Lattice Encryption</div>
        </div>
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-white/50 uppercase">KERNEL DEFENSE</div>
          <div className="text-sm font-bold text-purple-400">Ring-0 Rootkit Shield</div>
          <div className="text-[11px] text-white/60 font-sans">Direct OS Kernel Hook Protection</div>
        </div>
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-white/50 uppercase">AUTOMATED ACTION</div>
          <div className="text-sm font-bold text-emerald-400">0.01ms Auto Neutralize</div>
          <div className="text-[11px] text-white/60 font-sans">Sub-millisecond Threat Mitigation</div>
        </div>
      </div>
    </div>
  );
};
