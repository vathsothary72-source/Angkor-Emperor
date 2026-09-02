import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Download, 
  Sparkles, 
  Flame, 
  Terminal, 
  AlertTriangle,
  RotateCw,
  XCircle,
  Eye,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreatLog, ThreatSeverity } from '../types';
import { generateRandomIP, generateRandomMAC } from '../data/seedData';
import { ThreatNetworkGraph } from './ThreatNetworkGraph';

interface ThreatIntelligenceProps {
  threats: ThreatLog[];
  onSimulateThreat: (newThreat: ThreatLog) => void;
  onClearThreats: () => void;
}

export const ThreatIntelligence: React.FC<ThreatIntelligenceProps> = ({
  threats,
  onSimulateThreat,
  onClearThreats
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<ThreatLog | null>(null);

  // Filtered threats
  const filteredThreats = threats.filter((threat) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      threat.ip.toLowerCase().includes(q) ||
      threat.mac.toLowerCase().includes(q) ||
      threat.action.toLowerCase().includes(q) ||
      threat.location.toLowerCase().includes(q) ||
      (threat.target_key && threat.target_key.toLowerCase().includes(q)) ||
      threat.details.toLowerCase().includes(q);

    let matchesType = true;
    if (typeFilter !== 'all') {
      matchesType = threat.action.toUpperCase().includes(typeFilter.toUpperCase());
    }

    let matchesSeverity = true;
    if (severityFilter !== 'all') {
      matchesSeverity = threat.severity === severityFilter;
    }

    let matchesDate = true;
    const threatDate = new Date(threat.timestamp);
    if (dateFrom) {
      matchesDate = matchesDate && threatDate >= new Date(dateFrom);
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && threatDate <= toDate;
    }

    return matchesQuery && matchesType && matchesSeverity && matchesDate;
  });

  const triggerSimulation = (type: 'HONEYPOT' | 'DEBUGGER' | 'VM' | 'ZOMBIE' | 'COUNTER_ATTACK' | 'BANK_KHQR' | 'ABA_REPLAY' | 'BANK_TROJAN' | 'RANSOMWARE' | 'QUANTUM_SHIELD') => {
    const randomIP = generateRandomIP();
    const randomMAC = generateRandomMAC();
    const locations = [
      'Tokyo, JP (AWS AP-Northeast)',
      'Frankfurt, DE (Hetzner Node)',
      'Singapore, SG (DigitalOcean)',
      'London, UK (Equinix Hub)',
      'San Jose, US (Secure Gateway)'
    ];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];

    let action: ThreatLog['action'] = 'HONEYPOT_TRIGGERED';
    let severity: ThreatSeverity = 'critical';
    let details = 'Simulated threat caught by 5D engine';

    switch (type) {
      case 'BANK_KHQR':
        action = 'COUNTER_ATTACK';
        severity = 'critical';
        details = '[FINANCIAL DEFENSE] Encrypted QR EMVCo Payload Tamper blocked. Invalid CRC & HMAC signature rejected in 0.01ms.';
        break;
      case 'ABA_REPLAY':
        action = 'UNAUTHORIZED_INJECTION';
        severity = 'high';
        details = '[FINANCIAL DEFENSE] Payment Token Replay attack rejected. Single-use Nonce duplicate purged.';
        break;
      case 'BANK_TROJAN':
        action = 'DEBUGGER_DETECTED';
        severity = 'critical';
        details = '[FINANCIAL DEFENSE] Stealth Banking Trojan memory scraper neutralized by Ring-0 Shield.';
        break;
      case 'RANSOMWARE':
        action = 'HONEYPOT_TRIGGERED';
        severity = 'critical';
        details = '[FINANCIAL DEFENSE] Financial Zero-Day Ransomware isolated in honeypot. File volume integrity 100% preserved.';
        break;
      case 'QUANTUM_SHIELD':
        action = 'COUNTER_ATTACK';
        severity = 'critical';
        details = '[FINANCIAL DEFENSE] Inter-bank wire transfer encrypted with NIST Post-Quantum Kyber-1024 / Dilithium-5.';
        break;
      case 'HONEYPOT':
        action = 'HONEYPOT_TRIGGERED';
        severity = 'critical';
        details = 'Attacker touched obfuscated honeytoken memory offset. Instant IP auto-blacklisted.';
        break;
      case 'DEBUGGER':
        action = 'DEBUGGER_DETECTED';
        severity = 'high';
        details = 'Dynamic assembly hook & x64dbg instrumentation trapped. Injected garbage opcodes.';
        break;
      case 'VM':
        action = 'VM_DETECTED';
        severity = 'medium';
        details = 'Hypervisor TSC timing anomaly caught inside unverified container sandbox.';
        break;
      case 'ZOMBIE':
        action = 'ZOMBIE_ACTIVATED';
        severity = 'critical';
        details = 'Client token cloned across dual nodes concurrently. Zombie self-destruct engaged.';
        break;
      case 'COUNTER_ATTACK':
        action = 'COUNTER_ATTACK';
        severity = 'high';
        details = 'Rate-limiting violation threshold breached (>500 req/sec). Firewall drop active.';
        break;
    }

    const newThreat: ThreatLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      severity,
      ip: randomIP,
      mac: randomMAC,
      location: randomLoc,
      status: 'blocked',
      details,
      target_key: 'AE-SIM-' + Math.random().toString(36).substring(2, 6).toUpperCase()
    };

    onSimulateThreat(newThreat);
  };

  const handleExportCSV = () => {
    let csv = 'Timestamp,Action,Severity,IP Address,MAC Address,Location,Status,Target Key,Details\n';
    filteredThreats.forEach((t) => {
      csv += `"${t.timestamp}","${t.action}","${t.severity}","${t.ip}","${t.mac}","${t.location}","${t.status}","${t.target_key || ''}","${t.details.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `threat-intelligence-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getSeverityBadge = (sev: ThreatSeverity) => {
    switch (sev) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30 shadow-[0_0_8px_rgba(255,59,48,0.2)]">
            <Flame className="w-2.5 h-2.5" /> CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <AlertTriangle className="w-2.5 h-2.5" /> HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
            MEDIUM
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Real-Time Defense Graph */}
      <ThreatNetworkGraph threats={threats} />

      {/* Search Engine Card */}
      <div className="bg-[#0C0C0C] border border-white/10 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#141414] border border-white/10 flex items-center justify-center text-white">
              <Search className="w-4 h-4 text-[#E0FF00]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white font-mono tracking-tight">
                  Advanced Threat Search Engine
                </h3>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#E0FF00] bg-[#E0FF00]/10 px-2 py-0.5 border border-[#E0FF00]/25">
                  DEEP SCAN 5D
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5 font-sans">
                Real-time forensic threat intelligence search across IP, MAC, Action Code, and Time Window.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#141414] hover:bg-[#1C1C1C] text-white/70 hover:text-white border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#E0FF00]" />
              <span>Export CSV</span>
            </button>
            {threats.length > 0 && (
              <button
                onClick={onClearThreats}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30 text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Clear Logs</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              id="threat-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search IP Address, MAC, Action Code, Geo..."
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/30 outline-none transition-all font-mono"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setSeverityFilter('all');
                setDateFrom('');
                setDateTo('');
              }}
              className="w-full py-2 px-3 text-[10px] font-mono uppercase tracking-[0.2em] font-bold bg-[#141414] hover:bg-[#1C1C1C] text-white/60 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Threat Type */}
          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              VECTOR TYPE
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by Threat Vector Type"
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white/80 px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">TYPE: ALL</option>
              <option value="HONEYPOT">Honeypot Trap</option>
              <option value="DEBUGGER">Debugger Detection</option>
              <option value="VM">VM Sandbox</option>
              <option value="ZOMBIE">Zombie Mode</option>
              <option value="COUNTER_ATTACK">Counter-Attack</option>
              <option value="INTEGRITY_FAIL">Integrity Mismatch</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              SEVERITY LEVEL
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              aria-label="Filter by Severity Level"
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white/80 px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">SEVERITY: ALL</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              FROM DATE
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white/80 px-3 py-1.5 outline-none"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              TO DATE
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white/80 px-3 py-1.5 outline-none"
            />
          </div>
        </div>

        {/* Search Stats */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
          <span>
            MATCHED: <strong className="text-white font-bold">{filteredThreats.length}</strong> SECURITY EVENTS
          </span>
          <span className="flex items-center gap-1.5 text-[#E0FF00] font-semibold text-[10px] tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            5D Live Shield Active
          </span>
        </div>
      </div>

      {/* Threat Simulator Toolbox */}
      <div className="bg-[#0C0C0C] border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-[#FF3B30]" />
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              5D Defense Vector Simulator
            </h4>
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
            INJECT ACTIVE PAYLOAD STREAMS
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded">
              FINANCIAL VECTORS:
            </span>
            <button
              onClick={() => triggerSimulation('BANK_KHQR')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#FED7AA] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Encrypted QR Tamper
            </button>
            <button
              onClick={() => triggerSimulation('ABA_REPLAY')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-cyan-300 border border-cyan-400/30 hover:border-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Payment Replay Block
            </button>
            <button
              onClick={() => triggerSimulation('BANK_TROJAN')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-red-400 border border-red-500/30 hover:border-red-500 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Banking Trojan Scraper
            </button>
            <button
              onClick={() => triggerSimulation('RANSOMWARE')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-purple-300 border border-purple-400/30 hover:border-purple-400 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Ransomware Freeze
            </button>
            <button
              onClick={() => triggerSimulation('QUANTUM_SHIELD')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-emerald-400 border border-emerald-500/30 hover:border-emerald-500 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Quantum Crypto Guard
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <span className="text-[10px] font-mono font-bold text-white/50 px-2 py-0.5 bg-white/5 border border-white/10 rounded">
              CORE 5D SHIELD:
            </span>
            <button
              onClick={() => triggerSimulation('HONEYPOT')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#FF3B30] border border-white/10 hover:border-[#FF3B30]/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Trigger Honeypot
            </button>
            <button
              onClick={() => triggerSimulation('DEBUGGER')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-orange-400 border border-white/10 hover:border-orange-400/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Inject Debugger
            </button>
            <button
              onClick={() => triggerSimulation('VM')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-amber-400 border border-white/10 hover:border-amber-400/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Hypervisor Sandbox
            </button>
            <button
              onClick={() => triggerSimulation('ZOMBIE')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-purple-300 border border-white/10 hover:border-purple-400/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Lock Zombie Node
            </button>
            <button
              onClick={() => triggerSimulation('COUNTER_ATTACK')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#E0FF00] border border-white/10 hover:border-[#E0FF00]/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
            >
              Counter-Attack Surge
            </button>
          </div>
        </div>
      </div>

      {/* Threat Stream Table */}
      <div className="bg-[#0C0C0C] border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#141414]/50">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-[#FF3B30]" />
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-[0.2em]">
              Threat Intelligence Audit Buffer
            </h3>
            <span className="text-[9px] font-mono font-bold text-[#E0FF00] bg-[#E0FF00]/10 px-2 py-0.5 border border-[#E0FF00]/20">
              REAL-TIME
            </span>
          </div>
          <span className="text-xs font-mono text-white/40">
            EVENTS: {filteredThreats.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#141414]/30">
                <th className="py-4 px-5 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  TIMESTAMP
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  VECTOR
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  SEVERITY
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  IP ADDRESS
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  MAC ADDRESS
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  GEO / TARGET
                </th>
                <th className="py-4 px-5 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40 text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredThreats.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-white/40 text-xs font-mono">
                    <Terminal className="w-8 h-8 text-[#FF3B30]/30 mx-auto mb-2" />
                    BUFFER EMPTY — NO ANOMALIES MATCH CRITERIA
                  </td>
                </tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredThreats.map((threat) => (
                    <motion.tr
                      key={threat.id}
                      initial={{ opacity: 0, x: -25, backgroundColor: 'rgba(255, 59, 48, 0.15)' }}
                      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      exit={{ opacity: 0, x: 25 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      onClick={() => setSelectedThreat(threat)}
                      className="hover:bg-[#141414] cursor-pointer transition-colors group"
                    >
                      {/* Time */}
                      <td className="py-4 px-5 text-xs text-white/50 font-mono">
                        {new Date(threat.timestamp).toLocaleTimeString('en-US', {
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                        <div className="text-[10px] text-white/30">
                          {new Date(threat.timestamp).toLocaleDateString('en-US')}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs font-bold text-[#FF8A80] bg-[#FF3B30]/10 px-2 py-0.5 border border-[#FF3B30]/20">
                          {threat.action}
                        </span>
                      </td>

                      {/* Severity */}
                      <td className="py-4 px-4">
                        {getSeverityBadge(threat.severity)}
                      </td>

                      {/* IP */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs text-white font-medium">
                          {threat.ip}
                        </span>
                      </td>

                      {/* MAC */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs text-white/40">
                          {threat.mac}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-white/80 truncate max-w-[170px]">
                          {threat.location}
                        </div>
                        {threat.target_key && (
                          <div className="font-mono text-[10px] text-[#E0FF00]/70">
                            Target: {threat.target_key}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E0FF00]/10 text-[#E0FF00] border border-[#E0FF00]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E0FF00] shadow-[0_0_6px_#E0FF00]" />
                          BLOCKED
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0C0C0C] border border-white/20 max-w-lg w-full p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-[#FF3B30]" />
                <h3 className="text-base font-bold text-white font-mono tracking-tight">
                  Threat Forensics Inspection
                </h3>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-white/40 hover:text-white p-1 bg-white/5 border border-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 bg-[#141414] p-4 border border-white/10">
                <div>
                  <span className="text-white/40 block uppercase tracking-wider text-[9px]">ACTION CODE</span>
                  <span className="font-mono text-xs font-bold text-[#FF8A80]">{selectedThreat.action}</span>
                </div>
                <div>
                  <span className="text-white/40 block uppercase tracking-wider text-[9px]">SEVERITY</span>
                  <div className="mt-1">{getSeverityBadge(selectedThreat.severity)}</div>
                </div>
              </div>

              <div className="space-y-2 bg-[#141414] p-4 border border-white/10">
                <div className="flex justify-between">
                  <span className="text-white/40">SOURCE IP:</span>
                  <span className="text-white font-bold">{selectedThreat.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">MAC ADDRESS:</span>
                  <span className="text-white/80">{selectedThreat.mac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">GEO LOCATION:</span>
                  <span className="text-white/80">{selectedThreat.location}</span>
                </div>
                {selectedThreat.target_key && (
                  <div className="flex justify-between">
                    <span className="text-white/40">TARGET KEY:</span>
                    <span className="text-[#E0FF00] font-bold">{selectedThreat.target_key}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/40">TIMESTAMP:</span>
                  <span className="text-white/60">{new Date(selectedThreat.timestamp).toLocaleString('en-US')}</span>
                </div>
              </div>

              <div>
                <span className="text-white/40 block uppercase tracking-[0.2em] text-[9px] mb-1.5">
                  FORENSIC DIAGNOSTICS & DETAILS
                </span>
                <div className="p-3.5 bg-black/60 border border-white/10 text-white/90 leading-relaxed font-sans text-xs">
                  {selectedThreat.details}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedThreat(null)}
                className="px-6 py-2 bg-white text-black text-[10px] uppercase tracking-[0.25em] font-black hover:bg-[#E0FF00] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
