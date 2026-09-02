import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Zap, 
  AlertOctagon, 
  Flame, 
  Radio, 
  RefreshCw, 
  Crosshair, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Terminal,
  Play,
  Pause,
  UserX,
  Volume2,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';

interface GamePlayerSession {
  id: string;
  playerName: string;
  gameTitle: string;
  licenseKey: string;
  hwid: string;
  serverRegion: string;
  ping: number;
  fps: number;
  memoryIntegrity: number;
  status: 'PROTECTED' | 'SUSPICIOUS' | 'FLAGGED';
  connectedAt: string;
}

interface GameSecurityMonitorProps {
  onNotifyThreat?: (threatType: string, details: string) => void;
}

export const GameAlpha8Monitor: React.FC<GameSecurityMonitorProps> = ({ onNotifyThreat }) => {
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [armorMode, setArmorMode] = useState<'STANDARD' | 'TOURNAMENT' | 'ULTRA_SHIELD'>('ULTRA_SHIELD');
  const [selectedGame, setSelectedGame] = useState<'valorant' | 'pubg' | 'cs2' | 'gta5' | 'lol'>('valorant');
  const [fps, setFps] = useState(144);
  const [cpuUsage, setCpuUsage] = useState(0.18);
  const [memoryUsage, setMemoryUsage] = useState(12.4);
  const [tickSpeed, setTickSpeed] = useState(1.000);
  const [logs, setLogs] = useState<string[]>([
    '[' + new Date().toLocaleTimeString('en-US') + '] [KERNEL_HOOK] Zero-Trust Ring 0 Driver attached to Game Process (PID: 18420).',
    '[' + new Date().toLocaleTimeString('en-US') + '] [DIRECTX_12] DirectX 12 / Vulkan swapchain VTable verified (0 hook detected).',
    '[' + new Date().toLocaleTimeString('en-US') + '] [MEMORY_GUARD] Scanning 512MB Process Heap segments — All canary bytes intact.',
    '[' + new Date().toLocaleTimeString('en-US') + '] [ANTI_CHEAT] Anti-Tamper & Anti-Memory Injection armed for active game.'
  ]);

  const [players, setPlayers] = useState<GamePlayerSession[]>([
    {
      id: 'p-1',
      playerName: 'Pro_Esports_Player1',
      gameTitle: 'VALORANT (Tactical FPS)',
      licenseKey: 'AE-PRO-8921-NODE1',
      hwid: 'HWID-9F81...4C21',
      serverRegion: 'Asia-Pacific (Singapore)',
      ping: 14,
      fps: 144,
      memoryIntegrity: 100,
      status: 'PROTECTED',
      connectedAt: '12m ago'
    },
    {
      id: 'p-2',
      playerName: 'Sniper_Squad_Lead',
      gameTitle: 'PUBG: BATTLEGROUNDS',
      licenseKey: 'AE-ENT-4412-NODE2',
      hwid: 'HWID-A210...9B33',
      serverRegion: 'Asia-Pacific (Tokyo)',
      ping: 22,
      fps: 144,
      memoryIntegrity: 100,
      status: 'PROTECTED',
      connectedAt: '35m ago'
    },
    {
      id: 'p-3',
      playerName: 'CS2_Global_Elite',
      gameTitle: 'COUNTER-STRIKE 2 (CS2)',
      licenseKey: 'AE-LIFE-1109-NODE3',
      hwid: 'HWID-EE41...009A',
      serverRegion: 'Global Region (US-East)',
      ping: 28,
      fps: 185,
      memoryIntegrity: 100,
      status: 'PROTECTED',
      connectedAt: '1h ago'
    }
  ]);

  // Telemetry real-time micro-fluctuations
  useEffect(() => {
    if (!isShieldActive) return;

    const interval = setInterval(() => {
      setFps((prev) => {
        const base = armorMode === 'TOURNAMENT' ? 144 : 144;
        const delta = (Math.random() - 0.5) * 1.2;
        return Number((base + delta).toFixed(0));
      });

      setCpuUsage((prev) => {
        const next = 0.16 + Math.random() * 0.05;
        return Number(next.toFixed(2));
      });

      setMemoryUsage((prev) => {
        const next = 12.2 + Math.random() * 0.4;
        return Number(next.toFixed(1));
      });

      setTickSpeed((prev) => {
        return Number((1.000 + (Math.random() - 0.5) * 0.002).toFixed(3));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isShieldActive, armorMode]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US');
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 40)]);
  };

  // Test Attacks on Games
  const handleSimulateMemoryScanAttack = () => {
    addLog('⚠️ [ALERT] Unauthorized Memory Scanner attempt detected in game memory space!');
    addLog('🛡️ [DEFENSE] Intercepting address probe 0x7FFF004B2... Thread isolated.');
    addLog('🔒 [COUNTER-STRIKE] Zero-Trust memory seal applied. Cheat probe neutralized.');

    if (onNotifyThreat) {
      onNotifyThreat('MEMORY_SCAN_ATTACK', 'Cheat Engine memory probe intercepted and neutralized in Game Process.');
    }
  };

  const handleSimulateDllInjection = () => {
    addLog('🚨 [HIGH_THREAT] Unauthorized DLL injection attempt "speedhack_hook.dll" blocked!');
    addLog('⚡ [RING0_KERNEL] Denied LoadLibraryW hook on game DirectX engine.');
    addLog('✅ [STATUS] Process integrity verified 100%. Zero FPS drop.');

    if (onNotifyThreat) {
      onNotifyThreat('DLL_INJECTION', 'Unauthorized DLL injection blocked inside Game memory space.');
    }
  };

  const handleKickSuspicious = (id: string, name: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    addLog(`🚫 [ADMIN_ACTION] Player "${name}" session disconnected. License token verified.`);
  };

  return (
    <div className="space-y-6 select-none font-mono animate-fadeIn">
      {/* Game Cyber Security Header & Engine Hook Overview */}
      <div className="bg-[#0C0C0C] border border-[#D4AF37]/40 p-6 rounded-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#CCFF00]/10 via-[#D4AF37]/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#141414] border border-[#CCFF00]/50 flex items-center justify-center text-[#CCFF00] shadow-lg shrink-0">
              <Gamepad2 className="w-7 h-7 text-[#CCFF00]" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  GAME CYBER SECURITY SHIELD & ANTI-CHEAT ENGINE
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-[#CCFF00] px-2.5 py-0.5 shadow-[0_0_10px_rgba(204,255,0,0.3)] rounded">
                  RING 0 KERNEL HOOK • 144+ FPS
                </span>
              </div>
              <p className="text-xs text-[#F5E8C7]/90 mt-1 max-w-3xl font-sans">
                Real-time anti-cheat and process integrity shield protecting <strong>Valorant</strong>, <strong>PUBG</strong>, <strong>Counter-Strike 2</strong>, <strong>GTA V FiveM</strong>, and <strong>League of Legends</strong>. Zero FPS drop (<strong className="text-[#CCFF00]">&lt;0.2% CPU</strong>).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsShieldActive(!isShieldActive)}
              className={`py-2.5 px-4 font-bold text-xs uppercase rounded flex items-center gap-2 cursor-pointer transition-all ${
                isShieldActive
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {isShieldActive ? <Play className="w-4 h-4 fill-black" /> : <Pause className="w-4 h-4" />}
              <span>{isShieldActive ? 'SHIELD ARMED (ACTIVE)' : 'SHIELD PAUSED'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Hardware Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-[#141414] p-3 border border-white/5 rounded">
            <div className="text-[10px] text-white/50 uppercase flex items-center justify-between">
              <span>Stable Frame Rate</span>
              <Activity className="w-3.5 h-3.5 text-[#CCFF00]" />
            </div>
            <div className="text-xl font-black text-[#CCFF00] mt-1">{fps} FPS</div>
            <div className="text-[9px] text-white/40">DirectX 12 Lock</div>
          </div>

          <div className="bg-[#141414] p-3 border border-white/5 rounded">
            <div className="text-[10px] text-white/50 uppercase flex items-center justify-between">
              <span>Kernel CPU Overhead</span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-cyan-400 mt-1">{cpuUsage}%</div>
            <div className="text-[9px] text-white/40">Sub-Thread Async</div>
          </div>

          <div className="bg-[#141414] p-3 border border-white/5 rounded">
            <div className="text-[10px] text-white/50 uppercase flex items-center justify-between">
              <span>Memory Footprint</span>
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <div className="text-xl font-black text-[#D4AF37] mt-1">{memoryUsage} MB</div>
            <div className="text-[9px] text-white/40">Ultra-Light Weight</div>
          </div>

          <div className="bg-[#141414] p-3 border border-white/5 rounded">
            <div className="text-[10px] text-white/50 uppercase flex items-center justify-between">
              <span>Tick Synchronization</span>
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1">{tickSpeed}x</div>
            <div className="text-[9px] text-white/40">Monotonic Delta 0ms</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Game Selection, Live Telemetry, Attack Simulator & Player Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Attack Simulations & Active Protection Logs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Attack Simulator for Testing */}
          <div className="bg-[#0C0C0C] border border-white/10 p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Test Live Threat Interception (Simulator)
                </h3>
              </div>
              <span className="text-[9px] text-white/40">KERNEL TESTING</span>
            </div>

            <p className="text-xs text-white/60 font-sans">
              Test how the Zero-Trust Kernel Shield intercepts memory injection, cheat probes, and DLL exploits in real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleSimulateMemoryScanAttack}
                className="p-3 bg-[#181212] hover:bg-[#221616] border border-rose-500/40 text-rose-300 font-bold text-xs rounded flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Simulate Memory Probe</span>
              </button>

              <button
                onClick={handleSimulateDllInjection}
                className="p-3 bg-[#1A1810] hover:bg-[#252214] border border-[#D4AF37]/50 text-[#F5D98E] font-bold text-xs rounded flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                <span>Simulate DLL Injection</span>
              </button>
            </div>
          </div>

          {/* Real-time Shield Log Console */}
          <div className="bg-[#0C0C0C] border border-white/10 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#CCFF00]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Kernel Protection Console Telemetry
                </h3>
              </div>
              <span className="text-[10px] text-[#CCFF00] font-bold">STREAMING LIVE</span>
            </div>

            <div className="bg-[#050505] p-3.5 rounded border border-white/5 h-64 overflow-y-auto space-y-1.5 text-[11px] text-white/80 font-mono">
              {logs.map((log, i) => (
                <div 
                  key={i} 
                  className={`leading-relaxed ${
                    log.includes('ALERT') || log.includes('HIGH_THREAT')
                      ? 'text-rose-400 font-bold'
                      : log.includes('DEFENSE') || log.includes('COUNTER-STRIKE') || log.includes('STATUS')
                      ? 'text-[#CCFF00]'
                      : 'text-white/70'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Protected Game Sessions & HWID Binding */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0C0C0C] border border-white/10 p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Active Protected Game Rigs (HWID Paired)
                </h3>
              </div>
              <span className="text-[10px] text-[#CCFF00] font-bold">{players.length} RIGS SECURED</span>
            </div>

            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="p-4 bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 rounded-lg space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{player.playerName}</span>
                        <span className="text-[10px] text-white/50 font-normal">({player.gameTitle})</span>
                      </div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">
                        HWID: {player.hwid} · Region: {player.serverRegion}
                      </div>
                    </div>

                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00]">
                      {player.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] pt-1 border-t border-white/5 text-white/70">
                    <div>
                      <span className="text-white/40 block">LATENCY:</span>
                      <span className="text-[#CCFF00] font-bold">{player.ping}ms (Zero Lag)</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">FRAME RATE:</span>
                      <span className="text-white font-bold">{player.fps} FPS</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">INTEGRITY:</span>
                      <span className="text-[#CCFF00] font-bold">{player.memoryIntegrity}% Sealed</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleKickSuspicious(player.id, player.playerName)}
                      className="text-[10px] text-white/40 hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      Disconnect Rig
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
