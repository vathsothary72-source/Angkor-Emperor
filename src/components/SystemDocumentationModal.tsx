import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Building2, 
  Key, 
  Cpu, 
  Zap, 
  Terminal, 
  Lock, 
  Globe, 
  QrCode, 
  Server,
  Layers,
  ChevronRight,
  BookOpen,
  Printer
} from 'lucide-react';
import { LogoArchetype, LOGO_STYLES } from './AngkorLogo';

interface SystemDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme?: LogoArchetype;
}

export const SystemDocumentationModal: React.FC<SystemDocumentationModalProps> = ({
  isOpen,
  onClose,
  activeTheme = 'gold'
}) => {
  const currentStyle = LOGO_STYLES.find((s) => s.id === activeTheme) || LOGO_STYLES[0];
  const [activeDocSection, setActiveDocSection] = useState<'overview' | 'modules' | 'banking' | 'licenses' | 'deployment' | 'export'>('overview');
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const fullDocumentationText = `# TECHNICAL & OPERATIONAL ARCHITECTURE: ANGKOR EMPEROR 5D
# 5D QUANTUM ZERO-TRUST SECURITY & LICENSE SUITE
# System Version: v5.8.9-PRO-ENTERPRISE | Date: 2026-09-01
# Architecture: Super Admin Team | Node Verification: Active

================================================================================
1. EXECUTIVE ARCHITECTURE OVERVIEW
================================================================================
The Angkor Emperor 5D architecture is engineered as an enterprise-grade digital defense center (Quantum-Resistant Zero-Trust) featuring:
1. Cryptographic License & HWID Node Manager (256-Bit Ed25519 & HMAC signatures)
2. Enterprise Financial Cyber Defense Suite (Zero-Trust Kernel & Webhook Armor)
3. Automated Encrypted Payment & Settlement Gateway (ISO 20022 / EMVCo Compliant)
4. Real-time Threat Intelligence Hub & Sentinel
5. 6-Style 5D Multi-Theme Matrix (Imperial Gold, Jade, Saturn, Crimson, Sunset, Hologram)
6. Autonomous AI Support & Windows Ring-0 Automation Script Generator

================================================================================
2. SYSTEM CAPABILITY AUDIT MATRIX
================================================================================

[A] FULL-STACK LIVE OPERATIONAL MODULES:
--------------------------------------------------------------------------------
1. Master License Management Engine:
   - Cryptographic License Key generation using AES-256 / Ed25519 algorithms
   - Expiration Matrix calculation, Device Seat Allocations
   - Revoke, Extend, and Unlink HWID node operations in real-time
   - Persistent client-side local caching and real-time state synchronization

2. Encrypted Payment Gateway:
   - Automated EMVCo / ISO 20022 compatible QR payload generation
   - Direct connection to verified enterprise settlement clearing
   - Automated instant license fulfillment and verification handshake

3. Full Data Exporter (.CSV Telemetry):
   - Export full License Database to RFC 4180 CSV
   - Export active Hardware Nodes & Fingerprint logs
   - Export comprehensive Threat Intelligence incident logs

4. Super Admin Setup Script Generator:
   - Generates automated PowerShell and Shell setup deployment scripts
   - Injects security exceptions, registers background daemons, and configures HWID locks

5. 6 Dynamic 5D Visual Themes:
   - Instant live switching for palettes, ambient glows, audio SFX, and borders

6. AI Security Assistant:
   - Real-time telemetry synthesis, security audits, and automated resolution dispatch

[B] HARDWARE & INFRASTRUCTURE INTEGRATIONS:
--------------------------------------------------------------------------------
1. Kernel Ring-0 Driver Service:
   - Status: Full Dashboard telemetry, live monitor, and automated script deployment
   - Deployment: Run generated setup scripts with elevated privileges on endpoint nodes

2. Financial Interception Engine:
   - Status: Active interactive simulation deck with live payload decoding and responses
   - Standard: NIST FIPS 203 / 204 Post-Quantum Lattice Cryptography (Kyber-1024 / Dilithium-5)

================================================================================
3. COMMERCIAL PRICING & TIER SPECIFICATIONS
================================================================================
1. Starter Tier (Monthly): $9.99 (1 HWID Device, Standard Shield)
2. Pro Esports Tier (Yearly): $89.99 (3 HWID Devices, Priority Ring-0, 144 FPS Engine)
3. CyberCafe / Enterprise Tier: $299.99 (50 HWID Nodes, Central Multi-Seat Management)
4. Lifetime Emperor Tier: $499.99 (Unlimited Devices, Quantum Immunity, Immortal Access)

================================================================================
4. DEPLOYMENT & INSTALLATION PROTOCOL
================================================================================
Step 1: Generate License Key in "Master License Hub"
Step 2: Navigate to "Super Admin Hub" and generate the automated setup deployment script
Step 3: Run the script with administrator privileges on the target node
Step 4: Provide License Key to activate HWID hardware pairing and arm the 5D defense shield

================================================================================
All Rights Reserved © 2026 ANGKOR EMPEROR 5D SECURITY ENTERPRISE
`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullDocumentationText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadDoc = () => {
    const blob = new Blob([fullDocumentationText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Angkor_Emperor_5D_Documentation_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintDoc = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Angkor Emperor 5D - Complete Documentation</title>
            <style>
              @media print {
                body { margin: 1.5cm; }
                .no-print { display: none; }
              }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
                padding: 30px; 
                line-height: 1.7; 
                background: #ffffff; 
                color: #111111; 
                font-size: 13px; 
              }
              h1 { font-size: 20px; font-weight: 800; border-bottom: 2px solid #333; padding-bottom: 8px; margin-top: 24px; color: #000; }
              pre { background: #f4f4f5; padding: 14px; border-radius: 8px; font-family: "Courier New", Courier, monospace; font-size: 12px; white-space: pre-wrap; word-wrap: break-word; border: 1px solid #e4e4e7; }
              .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 11px; color: #666; text-align: center; }
            </style>
          </head>
          <body>
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; padding: 0; border: none; font-size: 22px;">ANGKOR EMPEROR 5D ENTERPRISE</h1>
              <div style="font-size: 12px; color: #555; margin-top: 4px;">5D QUANTUM ZERO-TRUST SECURITY & LICENSE SUITE</div>
              <div style="font-size: 11px; color: #777;">Version: v5.8.9-PRO-ENTERPRISE | Date: 2026-09-01</div>
            </div>
            <hr style="border: 0; border-top: 2px solid #000; margin: 15px 0;" />
            <pre>${fullDocumentationText}</pre>
            <div class="footer">
              © 2026 ANGKOR EMPEROR 5D SECURITY ENTERPRISE
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div 
        className="w-full max-w-5xl max-h-[90vh] bg-[#0E0C09] border-2 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative"
        style={{
          borderColor: currentStyle.primaryColor,
          boxShadow: `0 0 40px ${currentStyle.accentGlow}`
        }}
      >
        {/* MODAL HEADER */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/60 shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                borderColor: currentStyle.primaryColor,
                backgroundColor: `${currentStyle.primaryColor}20`
              }}
            >
              <FileText className="w-5 h-5" style={{ color: currentStyle.primaryColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase text-black"
                  style={{ backgroundColor: currentStyle.primaryColor }}
                >
                  OFFICIAL SPECIFICATION
                </span>
                <h3 className="text-lg font-black font-mono text-white uppercase tracking-wider">
                  SYSTEM TECHNICAL & OPERATIONAL DOCUMENTATION
                </h3>
              </div>
              <p className="text-xs text-white/60 font-sans">
                Comprehensive architecture report, security protocols, and enterprise deployment guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="p-2 rounded-lg bg-black/60 border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              {copiedText ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedText ? 'Copied!' : 'Copy All'}</span>
            </button>
            <button
              onClick={handleDownloadDoc}
              className="px-3 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              style={{ backgroundColor: currentStyle.primaryColor }}
            >
              <Download className="w-4 h-4" />
              <span>Download .MD</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-black/60 border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION TABS */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-black/40 border-b border-white/10 overflow-x-auto shrink-0 text-xs font-mono">
          <button
            onClick={() => setActiveDocSection('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'overview' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            1. Overview
          </button>
          <button
            onClick={() => setActiveDocSection('modules')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'modules' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            2. Feature Audit
          </button>
          <button
            onClick={() => setActiveDocSection('banking')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'banking' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            3. Financial Defense
          </button>
          <button
            onClick={() => setActiveDocSection('licenses')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'licenses' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            4. Pricing Matrix
          </button>
          <button
            onClick={() => setActiveDocSection('deployment')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'deployment' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            5. Deployment Steps
          </button>
          <button
            onClick={() => setActiveDocSection('export')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeDocSection === 'export' ? 'bg-white/15 text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            6. Raw Markdown
          </button>
        </div>

        {/* MODAL CONTENT BODY */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs space-y-6 bg-[#080604]">
          {activeDocSection === 'overview' && (
            <div className="space-y-4 font-sans text-white/90">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-5 h-5" style={{ color: currentStyle.primaryColor }} />
                  <span>5D Quantum Zero-Trust Digital Security Architecture</span>
                </h4>
                <p className="text-xs text-[#F5E8C7] leading-relaxed">
                  <strong>Angkor Emperor 5D</strong> provides enterprise-grade cryptographic licensing and penetration defense powered by <strong>Zero-Trust Architecture</strong>, <strong>NIST Post-Quantum Cryptography (Kyber-1024)</strong>, and universal financial gateway validation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1 font-mono">
                  <div className="text-[10px] text-white/50 uppercase">CRYPTOGRAPHIC ENGINE</div>
                  <div className="text-sm font-bold text-[#CCFF00]">Post-Quantum Kyber-1024</div>
                  <div className="text-[11px] text-white/60 font-sans">Lattice encryption resistant to quantum decryption.</div>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1 font-mono">
                  <div className="text-[10px] text-white/50 uppercase">PAYMENT GATEWAY</div>
                  <div className="text-sm font-bold text-[#D4AF37]">Encrypted ISO 20022 Node</div>
                  <div className="text-[11px] text-white/60 font-sans">Compliant with EMVCo & global financial switches.</div>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1 font-mono">
                  <div className="text-[10px] text-white/50 uppercase">KERNEL DEFENSE LEVEL</div>
                  <div className="text-sm font-bold text-emerald-400">Ring-0 Kernel Filter</div>
                  <div className="text-[11px] text-white/60 font-sans">Continuous 144 FPS telemetry and anti-tamper hooks.</div>
                </div>
              </div>
            </div>
          )}

          {activeDocSection === 'modules' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fully Operational Live Modules</span>
                </div>
                <div className="space-y-2 pt-2 text-xs text-white/80 font-sans">
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>1. Cryptographic License Generator:</strong> Creates signed license keys, device quotas, expiration controls, revocation, extension, and HWID management.
                  </div>
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>2. Encrypted Payment Gateway:</strong> Generates verified payment QR codes and handles automated license release.
                  </div>
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>3. Data CSV Exporter:</strong> Full telemetry export of licenses, device hardware nodes, and threat incident logs.
                  </div>
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>4. Automated Script Generator:</strong> Generates live PowerShell and setup deployment scripts for enterprise workstations.
                  </div>
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>5. 6-Style 5D Visual Engine:</strong> Real-time palette and aesthetic switching.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Endpoint & Infrastructure Requirements</span>
                </div>
                <div className="space-y-2 pt-2 text-xs text-white/80 font-sans">
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>• Kernel Driver Service:</strong> Execute generated deployment scripts with administrator rights on endpoint nodes.
                  </div>
                  <div className="p-2.5 bg-black/50 rounded-lg border border-white/5">
                    <strong>• Enterprise Webhooks:</strong> Configure webhook callbacks for multi-datacenter transaction synchronization.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDocSection === 'banking' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-[#D4AF37]/40 space-y-3 font-sans">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm font-mono">
                  <Building2 className="w-4 h-4" />
                  <span>6-Pillar Financial & Enterprise Cyber Defense</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">1. Gateway Payload Shield</div>
                    <div className="text-white/70">Intercepts MITM packet injections and protects payment transaction CRC.</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">2. OAuth2 Anti-Replay</div>
                    <div className="text-white/70">Prevents session token replay with dynamic ephemeral rolling nonces.</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">3. Trojan Memory Annihilator</div>
                    <div className="text-white/70">Destroys stealth credential dumpers and RAM scrapers in Ring-0 memory space.</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">4. Zero-Day Ransomware Freeze</div>
                    <div className="text-white/70">Traps encrypting processes in honeypots and rolls back unauthorized changes.</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">5. Post-Quantum Settlement Guard</div>
                    <div className="text-white/70">Protects inter-bank settlements with NIST Kyber-1024 / Dilithium-5 lattice encryption.</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-white font-mono">6. 1.2 Tbps Anti-DDoS Scrubber</div>
                    <div className="text-white/70">Autonomous Anycast rate filtering drops malicious SYN floods in sub-milliseconds.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDocSection === 'licenses' && (
            <div className="space-y-4 font-sans">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                <div className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#D4AF37]" />
                  <span>Commercial Pricing & Tier Matrix</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1">
                    <div className="font-bold text-[#CCFF00] font-mono">STARTER (MONTHLY)</div>
                    <div className="text-lg font-black text-white font-mono">$9.99</div>
                    <div className="text-[11px] text-white/60">• 1 HWID Device<br/>• Basic Ring-0 Guard<br/>• Standard Updates</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-[#D4AF37]/50 space-y-1 bg-[#141008]">
                    <div className="font-bold text-[#D4AF37] font-mono">PRO ESPORTS (YEARLY)</div>
                    <div className="text-lg font-black text-white font-mono">$89.99</div>
                    <div className="text-[11px] text-white/60">• 3 HWID Devices<br/>• 144 FPS Engine<br/>• Priority AI Support</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-cyan-500/40 space-y-1">
                    <div className="font-bold text-cyan-400 font-mono">ENTERPRISE / LABS</div>
                    <div className="text-lg font-black text-white font-mono">$299.99</div>
                    <div className="text-[11px] text-white/60">• 50 HWID Seats<br/>• Central Management<br/>• Multi-Server Sync</div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-purple-500/40 space-y-1">
                    <div className="font-bold text-purple-400 font-mono">LIFETIME EMPEROR</div>
                    <div className="text-lg font-black text-white font-mono">$499.99</div>
                    <div className="text-[11px] text-white/60">• Unlimited Devices<br/>• Quantum Immunity<br/>• Full Source Config</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDocSection === 'deployment' && (
            <div className="space-y-4 font-sans">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                <div className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Deployment & Installation Steps</span>
                </div>
                <div className="space-y-3 text-xs text-white/80">
                  <div className="flex items-start gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono shrink-0">1</span>
                    <div>
                      <strong className="text-white">Issue License Key:</strong>
                      <p className="text-white/60 mt-0.5">Navigate to Master License Hub and generate a license key configured with plan tier and quota.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono shrink-0">2</span>
                    <div>
                      <strong className="text-white">Download Setup Script:</strong>
                      <p className="text-white/60 mt-0.5">Navigate to Super Admin Hub and download the automated setup deployment script.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono shrink-0">3</span>
                    <div>
                      <strong className="text-white">Run as Administrator:</strong>
                      <p className="text-white/60 mt-0.5">Execute the script on the workstation to configure security exclusions and register background services.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono shrink-0">4</span>
                    <div>
                      <strong className="text-white">Activate & Arm:</strong>
                      <p className="text-white/60 mt-0.5">Input the License Key in the client application to pair the HWID and arm the 5D defense shield.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDocSection === 'export' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-white/50 uppercase pb-1 border-b border-white/10">
                <span>RAW MARKDOWN SPECIFICATION</span>
                <button
                  onClick={handlePrintDoc}
                  className="flex items-center gap-1 text-white/70 hover:text-white cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
              <pre className="p-4 bg-black/80 rounded-xl border border-white/10 text-white/80 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                {fullDocumentationText}
              </pre>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/80 shrink-0 text-xs font-mono">
          <div className="text-white/50 text-[11px]">
            Official Specification: <span className="text-white font-bold">Angkor Emperor 5D Enterprise</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintDoc}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadDoc}
              className="px-5 py-2 rounded-xl font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow-lg hover:scale-105"
              style={{ backgroundColor: currentStyle.primaryColor }}
            >
              Download Full Specs (.MD)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
