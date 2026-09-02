import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Flame, 
  Crosshair, 
  Zap, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Terminal,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  Cpu,
  Layers,
  Skull
} from 'lucide-react';

interface ThreatVector {
  id: string;
  name: string;
  type: 'ransomware' | 'trojan' | 'kernel_hook' | 'mitm' | 'ddos' | 'tamper';
  severity: 'CRITICAL' | 'HIGH' | 'EXTREME';
  originIp: string;
  signature: string;
  interceptedRate: string;
  counterStrikeWeapon: string;
  status: 'ATTACKING' | 'INTERCEPTING' | 'ANNIHILATED';
}

const THREAT_VECTORS: ThreatVector[] = [
  {
    id: 'vec-1',
    name: 'Quantum Ransomware & Memory Corruptor',
    type: 'ransomware',
    severity: 'CRITICAL',
    originIp: '185.220.101.44 (DarkNet Relay)',
    signature: 'SHA256: 0x9f8b2c44e912 (Zero-Day Crypto-Locker)',
    interceptedRate: '0.004 ms',
    counterStrikeWeapon: 'Quantum Honeypot Mirror Reflection',
    status: 'ATTACKING'
  },
  {
    id: 'vec-2',
    name: 'Ring 0 Kernel Hook & Memory Injection',
    type: 'kernel_hook',
    severity: 'EXTREME',
    originIp: '194.26.29.118 (Botnet Node)',
    signature: 'DRIVER_HOOK: ZwMapViewOfSection Overwrite',
    interceptedRate: '0.001 ms',
    counterStrikeWeapon: 'Hardware Virtualization Lock (VTx Enclave)',
    status: 'ATTACKING'
  },
  {
    id: 'vec-3',
    name: 'Banking API Token Tamper & Replay',
    type: 'mitm',
    severity: 'HIGH',
    originIp: '45.154.255.89 (Tor Exit Gateway)',
    signature: 'MITM_INJECT: Payload Manipulation & Replay',
    interceptedRate: '0.008 ms',
    counterStrikeWeapon: 'HMAC Dynamic Nonce Rotation Shield',
    status: 'ATTACKING'
  },
  {
    id: 'vec-4',
    name: '850 Gbps Volumetric UDP Syn Flood',
    type: 'ddos',
    severity: 'EXTREME',
    originIp: 'Distributed across 14,800 Zombie Nodes',
    signature: 'BGP_AMPLIFY: 45M packets/sec payload flood',
    interceptedRate: '0.002 ms',
    counterStrikeWeapon: 'Edge Anycast Scrubbing Null-Route',
    status: 'ATTACKING'
  }
];

export const CinematicHackerAttackArena: React.FC = () => {
  const [activeThreatIndex, setActiveThreatIndex] = useState(0);
  const [threats, setThreats] = useState<ThreatVector[]>(THREAT_VECTORS);
  const [isCounterFiring, setIsCounterFiring] = useState(false);
  const [laserBeamActive, setLaserBeamActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [counterStrikeScore, setCounterStrikeScore] = useState(148);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Cyber Annihilation Matrix initialized.',
    '[MONITOR] Listening on all inbound network interfaces...',
    '[RADAR] Active perimeter shields at 100% integrity.'
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto attack rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveThreatIndex((prev) => (prev + 1) % threats.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [threats.length]);

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const midX = w / 2;
      const midY = h / 2;

      // Dark grid background
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Left node: Hacker Infiltration Node
      const hackerX = 90;
      const hackerY = midY;
      ctx.fillStyle = 'rgba(255, 69, 58, 0.2)';
      ctx.beginPath();
      ctx.arc(hackerX, hackerY, 45 + Math.sin(tick * 0.05) * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FF453A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hackerX, hackerY, 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#FF453A';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('THREAT VECTOR', hackerX, hackerY - 45);
      ctx.fillText('INCOMING ATTACK', hackerX, hackerY + 50);

      // Right node: Angkor Cyber Defense Core Fortress
      const fortressX = w - 90;
      const fortressY = midY;
      ctx.fillStyle = 'rgba(204, 255, 0, 0.15)';
      ctx.beginPath();
      ctx.arc(fortressX, fortressY, 50 + Math.sin(tick * 0.08) * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#CCFF00';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(fortressX, fortressY, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#CCFF00';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ANGKOR DEFENSE', fortressX, fortressY - 48);
      ctx.fillText('SECURITY CORE', fortressX, fortressY + 52);

      // Incoming Attack Particles (Red from left to right)
      const particleProgress = (tick % 60) / 60;
      const currentAttackX = hackerX + (midX - hackerX) * particleProgress;
      const currentAttackY = hackerY + Math.sin(tick * 0.2) * 15;

      ctx.fillStyle = '#FF3B30';
      ctx.shadowColor = '#FF3B30';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(currentAttackX, currentAttackY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Interception Shield in Center
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(midX, midY, 65, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();

      // Laser Counter Strike Beam (Green/Gold from fortress to hacker)
      if (laserBeamActive) {
        ctx.strokeStyle = '#E0FF00';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#E0FF00';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.moveTo(fortressX - 30, fortressY);
        ctx.lineTo(hackerX + 30, hackerY);
        ctx.stroke();

        // Explosion on hacker
        ctx.fillStyle = 'rgba(224, 255, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(hackerX, hackerY, 60 + Math.random() * 20, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [laserBeamActive]);

  // Trigger Counter Strike
  const handleFireCounterStrike = () => {
    setIsCounterFiring(true);
    setLaserBeamActive(true);

    const currentThreat = threats[activeThreatIndex];
    const timestamp = new Date().toLocaleTimeString();

    setTerminalLogs((prev) => [
      `[${timestamp}] ⚡ ANNIHILATOR BEAM LOCKED ON ${currentThreat.originIp}`,
      `[${timestamp}] 🛡️ DEPLOYED: ${currentThreat.counterStrikeWeapon}`,
      `[${timestamp}] 💥 THREAT VECTOR NEUTRALIZED IN ${currentThreat.interceptedRate}`,
      ...prev.slice(0, 15)
    ]);

    setCounterStrikeScore((prev) => prev + 1);

    setTimeout(() => {
      setLaserBeamActive(false);
      setIsCounterFiring(false);
    }, 1200);
  };

  const currentThreat = threats[activeThreatIndex];

  return (
    <div className="bg-[#0A0A0A] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6 select-none font-mono">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#CCFF00] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-[#CCFF00]">
              <Crosshair className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#FF3B30] text-white animate-pulse">
                LIVE ARENA
              </span>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                THREAT INTERCEPTION & COUNTER-STRIKE ARENA
              </h3>
            </div>
            <p className="text-xs text-[#F5E8C7]/80 mt-0.5 font-sans">
              Real-time visualization of hacker vector interception and automated zero-latency counter response.
            </p>
          </div>
        </div>

        {/* Counter-Strike Stats & Audio Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-1.5 rounded-lg bg-[#14120C] border border-[#CCFF00]/30 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
            <div>
              <div className="text-[9px] text-white/40 uppercase">Threats Neutralized</div>
              <div className="text-sm font-black text-[#CCFF00]">{counterStrikeScore} VECTORS</div>
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-[#14120C] border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#CCFF00]" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Cinematic Radar Screen */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#050505] shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          className="w-full h-52 sm:h-64 block object-cover"
        />

        {/* Floating Attack Alert Overlay */}
        <div className="absolute top-3 left-3 p-2.5 rounded-lg bg-black/85 border border-[#FF453A]/50 backdrop-blur-md max-w-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-[#FF453A] font-black uppercase">
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>DETECTED THREAT #{activeThreatIndex + 1}</span>
          </div>
          <div className="text-xs font-bold text-white truncate">{currentThreat.name}</div>
          <div className="text-[10px] text-white/50 truncate">Origin: {currentThreat.originIp}</div>
        </div>

        {/* Manual Counter-Strike Action Button */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            onClick={handleFireCounterStrike}
            disabled={isCounterFiring}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#CCFF00] text-black font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.5)] flex items-center gap-2"
          >
            <Zap className={`w-4 h-4 text-black ${isCounterFiring ? 'animate-spin' : ''}`} />
            <span>{isCounterFiring ? 'ANNIHILATING...' : 'FIRE COUNTER-STRIKE'}</span>
          </button>
        </div>
      </div>

      {/* Active Threat Vectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {threats.map((threat, idx) => {
          const isCurrent = idx === activeThreatIndex;
          return (
            <div
              key={threat.id}
              onClick={() => setActiveThreatIndex(idx)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                isCurrent
                  ? 'bg-[#14120C] border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                  : 'bg-[#0E0E0E] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                  threat.severity === 'EXTREME'
                    ? 'bg-red-950 text-red-400 border border-red-500/30'
                    : threat.severity === 'CRITICAL'
                    ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                    : 'bg-yellow-950 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {threat.severity}
                </span>
                <span className="text-[10px] text-[#CCFF00] font-mono">{threat.interceptedRate}</span>
              </div>

              <div className="font-bold text-white text-xs truncate">{threat.name}</div>
              <div className="text-[10px] text-white/50 truncate">{threat.signature}</div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-[#CCFF00]">
                <span>DEFENSE ARMED</span>
                <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Terminal Activity Logs */}
      <div className="bg-[#050505] p-3.5 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-white/50 pb-1 border-b border-white/5">
          <span className="flex items-center gap-1.5 text-white/70 font-bold uppercase">
            <Terminal className="w-3.5 h-3.5 text-[#CCFF00]" />
            REAL-TIME COUNTER-STRIKE COMBAT LOGS
          </span>
          <span className="text-[#CCFF00] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
            ACTIVE TRANSMISSION
          </span>
        </div>

        <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] font-mono text-white/80 scrollbar-thin">
          {terminalLogs.map((log, i) => (
            <div key={i} className="leading-tight">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
