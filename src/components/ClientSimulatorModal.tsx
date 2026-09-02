import React, { useState } from 'react';
import { 
  Laptop, 
  X, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Key, 
  ShieldCheck, 
  Cpu, 
  RotateCw, 
  Radio,
  Zap,
  Lock
} from 'lucide-react';
import { License, Device, ThreatLog } from '../types';
import { AngkorLogo } from './AngkorLogo';
import { generateToken, generateRandomIP, generateRandomMAC } from '../data/seedData';

interface ClientSimulatorModalProps {
  isOpen: boolean;
  licenses: License[];
  onClose: () => void;
  onActivateSuccess: (licenseKey: string, device: Device) => void;
  onSimulateThreat: (threat: ThreatLog) => void;
}

export const ClientSimulatorModal: React.FC<ClientSimulatorModalProps> = ({
  isOpen,
  licenses,
  onClose,
  onActivateSuccess,
  onSimulateThreat,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('AE-TGR-8F3K-9D2L');
  const [customKey, setCustomKey] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('Developer Studio Rig #1');
  const [osPlatform, setOsPlatform] = useState<string>('Windows 11 Pro x64');
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [activeLicenseInfo, setActiveLicenseInfo] = useState<any>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[INIT] 5D Client Framework v5.0.0 started',
    '[HWID] Hardware fingerprint generated & salt locked'
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientStatus, setClientStatus] = useState<'idle' | 'activated' | 'error'>('idle');

  if (!isOpen) return null;

  const currentKeyToTest = customKey.trim() || selectedKey;

  const addLog = (msg: string) => {
    setConsoleLogs((prev) => [`[${new Date().toLocaleTimeString('en-US')}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const handleActivate = () => {
    setLoading(true);
    addLog(`[API POST /api/activate] Key: ${currentKeyToTest}`);

    setTimeout(() => {
      const found = licenses.find((l) => l.license_key === currentKeyToTest);

      if (!found) {
        addLog(`[ERROR 404] License key not found`);
        setClientStatus('error');
        setLoading(false);
        return;
      }

      if (found.revoked) {
        addLog(`[ERROR 403] License has been revoked`);
        setClientStatus('error');
        setLoading(false);
        return;
      }

      if (found.expires_at && new Date(found.expires_at) < new Date()) {
        addLog(`[ERROR 403] License has expired`);
        setClientStatus('error');
        setLoading(false);
        return;
      }

      if (found.used_devices >= found.max_devices) {
        addLog(`[ERROR 403] Device seat limit reached (${found.used_devices}/${found.max_devices})`);
        setClientStatus('error');
        setLoading(false);
        return;
      }

      const newToken = generateToken();
      setActiveToken(newToken);
      setActiveLicenseInfo(found);
      setClientStatus('activated');

      const simDevice: Device = {
        id: Date.now(),
        license_id: found.id,
        license_key: found.license_key,
        device_id: 'DEV-SIM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        device_name: deviceName,
        hardware_fingerprint: Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18),
        ip_address: generateRandomIP(),
        user_agent: `Client-Agent/5.0.0 (${osPlatform})`,
        first_activated: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        is_active: true
      };

      onActivateSuccess(found.license_key, simDevice);
      addLog(`[SUCCESS 200] License verified successfully! Token: ${newToken.substring(0, 16)}...`);
      setLoading(false);
    }, 600);
  };

  const handleValidateToken = () => {
    if (!activeToken) {
      addLog(`[WARN] No active token to validate`);
      return;
    }
    setLoading(true);
    addLog(`[API POST /api/validate] Token: ${activeToken.substring(0, 16)}...`);

    setTimeout(() => {
      addLog(`[VALID 200] Token is 100% active · Cryptographic signature verified`);
      setLoading(false);
    }, 400);
  };

  const handleDeactivate = () => {
    setLoading(true);
    addLog(`[API POST /api/deactivate] Token revoked`);
    setTimeout(() => {
      setActiveToken(null);
      setActiveLicenseInfo(null);
      setClientStatus('idle');
      addLog(`[SUCCESS] Device de-authorized safely`);
      setLoading(false);
    }, 400);
  };

  const handleTamperTest = () => {
    addLog(`[SECURITY ALERT] Debugger attach detected! Anti-tamper 5D engaged.`);
    onSimulateThreat({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action: 'DEBUGGER_DETECTED',
      severity: 'high',
      ip: '127.0.0.1 (Local Rig)',
      mac: generateRandomMAC(),
      location: 'Localhost Client Sandbox',
      status: 'blocked',
      details: 'Simulated client tampering detected via local testbench trigger.',
      target_key: currentKeyToTest
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-[#0C0C0C] border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white p-1.5 bg-white/5 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <AngkorLogo size={36} />
            <div>
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-tight">
                Desktop Client Simulator
              </h3>
              <p className="text-xs text-white/50 font-sans">
                Validate license handshake, offline tokens, HWID binding, and anti-tamper triggers.
              </p>
            </div>
          </div>
        </div>

        {/* Client Hardware Setup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#141414] p-4 border border-white/10 text-xs">
          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1.5">
              DEVICE NAME
            </label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-white/40 px-3 py-1.5 text-xs text-white outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1.5">
              OS PLATFORM
            </label>
            <select
              value={osPlatform}
              onChange={(e) => setOsPlatform(e.target.value)}
              aria-label="Select Operating System"
              className="w-full bg-black/50 border border-white/10 focus:border-white/40 text-xs text-white px-2.5 py-1.5 outline-none cursor-pointer font-mono"
            >
              <option value="Windows 11 Pro x64">Windows 11 Pro (x64)</option>
              <option value="macOS 14.5 Sonoma (arm64)">macOS 14.5 (ARM64)</option>
              <option value="Ubuntu 24.04 LTS x64">Ubuntu Linux 24.04</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1.5">
              HWID FINGERPRINT
            </label>
            <div className="bg-black/50 border border-white/10 text-[10px] text-[#E0FF00] font-mono px-2.5 py-2 truncate">
              HWID: a8f3...491d (Secured)
            </div>
          </div>
        </div>

        {/* License Key Test Selection */}
        <div className="space-y-2">
          <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
            SELECT TEST LICENSE KEY
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {licenses.slice(0, 4).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setSelectedKey(l.license_key);
                  setCustomKey('');
                }}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedKey === l.license_key && !customKey
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141414] border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {l.license_key} ({l.plan})
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customKey || selectedKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="e.g. AE-XXXX-XXXX-XXXX"
              className="flex-1 bg-[#141414] border border-white/10 focus:border-white/40 font-mono text-xs text-white px-3.5 py-2 outline-none"
            />

            <button
              onClick={handleActivate}
              disabled={loading}
              className="px-5 py-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {loading ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              <span>Activate</span>
            </button>
          </div>
        </div>

        {/* Client State Banner */}
        <div className="flex items-center justify-between p-3.5 border border-white/10 bg-[#141414] text-xs font-mono">
          <div className="flex items-center gap-2">
            {clientStatus === 'activated' ? (
              <CheckCircle2 className="w-4 h-4 text-[#E0FF00]" />
            ) : clientStatus === 'error' ? (
              <XCircle className="w-4 h-4 text-[#FF3B30]" />
            ) : (
              <Lock className="w-4 h-4 text-white/40" />
            )}
            <span className="font-semibold text-white">
              STATUS: {clientStatus === 'activated' ? 'AUTHENTICATED (5D ACTIVE)' : clientStatus === 'error' ? 'VERIFICATION FAILED' : 'STANDBY — AWAITING KEY'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {clientStatus === 'activated' && (
              <>
                <button
                  onClick={handleValidateToken}
                  disabled={loading}
                  className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E0FF00]/10 text-[#E0FF00] border border-[#E0FF00]/20 hover:bg-[#E0FF00]/20 transition-all cursor-pointer"
                >
                  Verify Token
                </button>
                <button
                  onClick={handleDeactivate}
                  disabled={loading}
                  className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20 hover:bg-[#FF3B30]/20 transition-all cursor-pointer"
                >
                  Deactivate
                </button>
              </>
            )}
            <button
              onClick={handleTamperTest}
              className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all cursor-pointer"
              title="Test tamper triggers"
            >
              Test Tamper
            </button>
          </div>
        </div>

        {/* Live Terminal Output */}
        <div className="bg-black border border-white/10 p-3.5 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto">
          <div className="flex items-center justify-between text-[9px] text-white/30 pb-1.5 border-b border-white/10 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#E0FF00]" />
              Console Diagnostics
            </span>
            <span>5D API Bridge</span>
          </div>
          {consoleLogs.map((log, index) => (
            <div
              key={index}
              className={`${
                log.includes('ERROR')
                  ? 'text-[#FF3B30]'
                  : log.includes('SUCCESS') || log.includes('VALID')
                  ? 'text-[#E0FF00]'
                  : log.includes('ALERT')
                  ? 'text-orange-400'
                  : 'text-white/60'
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-1 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-[10px] font-mono font-black uppercase tracking-[0.25em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
