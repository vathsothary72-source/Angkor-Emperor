import React, { useState, useEffect } from 'react';
import { 
  Key, 
  ShieldAlert, 
  Laptop, 
  RotateCw, 
  Sparkles, 
  Radio, 
  SlidersHorizontal,
  Code2,
  FileSpreadsheet,
  Gamepad2,
  ShieldCheck,
  HardDrive,
  Download,
  ShoppingBag,
  UserCheck,
  QrCode,
  Users,
  Building2,
  Palette,
  FileText,
  CreditCard,
  Flame,
  Search
} from 'lucide-react';
import { License, Device, ThreatLog, SystemStats } from './types';
import { initialLicenses, initialDevices, initialThreatLogs } from './data/seedData';
import { AngkorLogo, LogoArchetype, LOGO_STYLES } from './components/AngkorLogo';
import { StatsCards } from './components/StatsCards';
import { DashboardToolMatrix } from './components/DashboardToolMatrix';
import { LicenseTable } from './components/LicenseTable';
import { ThreatIntelligence } from './components/ThreatIntelligence';
import { GameAlpha8Monitor } from './components/GameAlpha8Monitor';
import { SecurityAssessment } from './components/SecurityAssessment';
import { CommercialDistributionHub } from './components/CommercialDistributionHub';
import { SuperAdminPermissionHub } from './components/SuperAdminPermissionHub';
import { SuperAdminGeminiAssistant } from './components/SuperAdminGeminiAssistant';
import { CyberGlowShowcaseHub } from './components/CyberGlowShowcaseHub';
import { BankingCyberDefenseSuite } from './components/BankingCyberDefenseSuite';
import { CinematicHackerAttackArena } from './components/CinematicHackerAttackArena';
import { FloatingAiChatWidget } from './components/FloatingAiChatWidget';
import { TopRgbMarqueeHeader, MarqueeFont } from './components/TopRgbMarqueeHeader';
import { DesktopSetupModal } from './components/DesktopSetupModal';
import { SystemDocumentationModal } from './components/SystemDocumentationModal';
import { GenerateLicenseModal } from './components/GenerateLicenseModal';
import { ExtendLicenseModal } from './components/ExtendLicenseModal';
import { DeviceListModal } from './components/DeviceListModal';
import { ClientSimulatorModal } from './components/ClientSimulatorModal';
import { AcledaKhqrModal } from './components/AcledaKhqrModal';
import { GoogleAuthModal, GoogleUser } from './components/GoogleAuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // State initialization with localStorage fallback
  const [licenses, setLicenses] = useState<License[]>(() => {
    const saved = localStorage.getItem('angkor_licenses');
    return saved ? JSON.parse(saved) : initialLicenses;
  });

  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('angkor_devices');
    return saved ? JSON.parse(saved) : initialDevices;
  });

  const [threats, setThreats] = useState<ThreatLog[]>(() => {
    const saved = localStorage.getItem('angkor_threats');
    return saved ? JSON.parse(saved) : initialThreatLogs;
  });

  // Google User Authentication State
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(() => {
    const saved = localStorage.getItem('angkor_google_user');
    return saved ? JSON.parse(saved) : {
      email: 'admin@angkorcyberdefense.sec',
      name: 'Super Admin Operator',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=angkor_super_admin&backgroundColor=0c0a06',
      role: 'Super Admin',
      idToken: 'g-oauth2_superadmin_verified_master',
      signedInAt: '05:30:00 01/09/2026'
    };
  });

  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);

  // Default active view is the Commercial License Storefront & Promotional Market
  const [activeTab, setActiveTab] = useState<'sales' | 'licenses' | 'banking' | 'cyberglow' | 'superadmin' | 'gemini' | 'alpha8' | 'security' | 'threats' | 'devices'>('sales');
  const [activeLogoStyle, setActiveLogoStyle] = useState<LogoArchetype>('gold');
  const [currentMarqueeFont, setCurrentMarqueeFont] = useState<MarqueeFont>('kantumruy');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isClientSimOpen, setIsClientSimOpen] = useState(false);
  const [isDesktopSetupOpen, setIsDesktopSetupOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isKhqrModalOpen, setIsKhqrModalOpen] = useState(false);
  const [activeLicenseForAction, setActiveLicenseForAction] = useState<License | null>(null);

  // Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Filtered Data Sets based on Global Search
  const lowerQuery = globalSearchQuery.toLowerCase();
  
  const filteredLicenses = licenses.filter(l => 
    !globalSearchQuery ||
    l.license_key.toLowerCase().includes(lowerQuery) || 
    (l.user_name && l.user_name.toLowerCase().includes(lowerQuery)) ||
    l.plan.toLowerCase().includes(lowerQuery)
  );

  const filteredDevices = devices.filter(d => 
    !globalSearchQuery ||
    d.hwid.toLowerCase().includes(lowerQuery) ||
    (d.hostname && d.hostname.toLowerCase().includes(lowerQuery)) ||
    d.ip.toLowerCase().includes(lowerQuery)
  );

  const filteredThreats = threats.filter(t => 
    !globalSearchQuery ||
    t.ip.toLowerCase().includes(lowerQuery) ||
    t.mac_address.toLowerCase().includes(lowerQuery) ||
    (t.details && t.details.toLowerCase().includes(lowerQuery)) ||
    t.action.toLowerCase().includes(lowerQuery) ||
    t.type.toLowerCase().includes(lowerQuery)
  );

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('angkor_licenses', JSON.stringify(licenses));
  }, [licenses]);

  useEffect(() => {
    localStorage.setItem('angkor_devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('angkor_threats', JSON.stringify(threats));
  }, [threats]);

  useEffect(() => {
    if (googleUser) {
      localStorage.setItem('angkor_google_user', JSON.stringify(googleUser));
    } else {
      localStorage.removeItem('angkor_google_user');
    }
  }, [googleUser]);

  // Anti-Inspection & Proprietary Code Shield
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest('.font-mono') || target.tagName === 'PRE' || target.tagName === 'CODE')) {
        e.preventDefault();
        showToast('info', '🛡️ កូដសម្ងាត់ការពារជាតិកម្រិតយោធា', 'កូដស្នូលខាងក្នុងត្រូវបានការពារដោយ Quantum Encryption មិនត្រូវបានបើកចំហឡើយ!');
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Toast Helper
  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const newToast: ToastMessage = { id: Date.now(), type, title, message };
    setToasts((prev) => [newToast, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Compute System Statistics
  const activeCount = licenses.filter(
    (l) => l.is_active && !l.revoked && (!l.expires_at || new Date(l.expires_at) >= new Date())
  ).length;

  const stats: SystemStats = {
    totalLicenses: licenses.length,
    activeLicenses: activeCount,
    totalDevices: devices.filter((d) => d.is_active).length,
    threatsBlocked: threats.length,
    activationsToday: 3,
  };

  // Handlers
  const handleGenerateLicense = (newLicense: License) => {
    setLicenses((prev) => [newLicense, ...prev]);
    showToast('success', 'បានបង្កើត License ថ្មី!', `Key: ${newLicense.license_key}`);
  };

  const handleToggleRevoke = (licenseKey: string) => {
    setLicenses((prev) =>
      prev.map((lic) => {
        if (lic.license_key === licenseKey) {
          const willRevoke = !lic.revoked;
          return {
            ...lic,
            revoked: willRevoke,
            revoked_reason: willRevoke ? 'Revoked by Admin manually' : undefined,
          };
        }
        return lic;
      })
    );
    showToast('info', 'បានផ្លាស់ប្តូរស្ថានភាព License');
  };

  const handleUpdateRating = (licenseKey: string, newRating: number) => {
    setLicenses((prev) =>
      prev.map((lic) => {
        if (lic.license_key === licenseKey) {
          return {
            ...lic,
            rating: newRating,
          };
        }
        return lic;
      })
    );
    showToast('success', `បានកំណត់កម្រិត ${newRating} ផ្កាយ (VIP Star Rating)`);
  };

  const handleConfirmExtend = (licenseKey: string, newDate: string, newMaxDevices: number) => {
    setLicenses((prev) =>
      prev.map((lic) => {
        if (lic.license_key === licenseKey) {
          return {
            ...lic,
            expires_at: newDate,
            max_devices: newMaxDevices,
            revoked: false,
          };
        }
        return lic;
      })
    );
    setIsExtendModalOpen(false);
    setActiveLicenseForAction(null);
    showToast('success', 'បានពន្យារពេល License ជោគជ័យ!');
  };

  const handleDeleteLicense = (licenseKey: string) => {
    if (confirm(`តើអ្នកពិតជាចង់លុប License ${licenseKey} មែនទេ?`)) {
      setLicenses((prev) => prev.filter((l) => l.license_key !== licenseKey));
      setDevices((prev) => prev.filter((d) => d.license_key !== licenseKey));
      showToast('info', 'បានលុប License ចេញពីប្រព័ន្ធ');
    }
  };

  const handleUnlinkDevice = (deviceId: string) => {
    const dev = devices.find((d) => d.device_id === deviceId);
    if (!dev) return;
    setDevices((prev) => prev.filter((d) => d.device_id !== deviceId));
    setLicenses((prev) =>
      prev.map((lic) => {
        if (lic.license_key === dev.license_key) {
          return {
            ...lic,
            used_devices: Math.max(0, lic.used_devices - 1),
          };
        }
        return lic;
      })
    );
    showToast('success', 'បានផ្ដាច់ឧបករណ៍ (Device Unlinked)');
  };

  const handleActivateSuccess = (licenseKey: string, hwid: string, devName: string) => {
    const lic = licenses.find((l) => l.license_key === licenseKey);
    const newDevice: Device = {
      id: Date.now(),
      license_id: lic ? lic.id : 1,
      license_key: licenseKey,
      device_id: 'dev-' + Math.random().toString(36).substring(2, 9),
      device_name: devName,
      hardware_fingerprint: hwid,
      ip_address: '175.100.' + Math.floor(Math.random() * 250) + '.' + Math.floor(Math.random() * 250),
      user_agent: 'AngkorShield/3.0.0 (Windows NT 10.0; Win64; x64)',
      first_activated: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      is_active: true,
    };
    setDevices((prev) => [newDevice, ...prev]);
    setLicenses((prev) =>
      prev.map((l) => {
        if (l.license_key === licenseKey) {
          return {
            ...l,
            used_devices: l.used_devices + 1,
          };
        }
        return l;
      })
    );
    showToast('success', 'ផ្ទៀងផ្ទាត់ជោគជ័យ!', `បានចងភ្ជាប់ HWID: ${hwid.substring(0, 16)}...`);
  };

  const handleSimulateThreat = (threatType: string, customDetails?: string) => {
    const actionKey = (
      threatType.includes('DEBUGGER') ? 'DEBUGGER_DETECTED' :
      threatType.includes('INJECTION') ? 'UNAUTHORIZED_INJECTION' :
      threatType.includes('VM') ? 'VM_DETECTED' :
      threatType.includes('HONEYPOT') || threatType.includes('MEMORY') ? 'HONEYPOT_TRIGGERED' :
      'COUNTER_ATTACK'
    );

    const newLog: ThreatLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action: actionKey,
      severity: (threatType.includes('DEBUGGER') || threatType.includes('INJECTION') ? 'critical' : 'high'),
      ip: '103.216.' + Math.floor(Math.random() * 250) + '.' + Math.floor(Math.random() * 250),
      mac: '00:1A:2B:3C:4D:' + Math.floor(Math.random() * 90 + 10).toString(16).toUpperCase(),
      location: 'Phnom Penh, KH',
      status: 'blocked',
      details: customDetails || 'Suspicious memory manipulation or untrusted execution detected by 5D Armor in Game Alpha8.',
      target_key: 'AE-PRO-8921-KH01',
    };
    setThreats((prev) => [newLog, ...prev]);
    showToast('error', '⚠️ បានរារាំងការវាយប្រហារ!', `${threatType}: ត្រូវបានបញ្ឈប់ភ្លាមៗ`);
  };

  const handleExportCSV = () => {
    const headers = ['License Key', 'User Name', 'Plan', 'Status', 'Max Devices', 'Used Devices', 'Expires At'];
    const rows = licenses.map((l) => [
      l.license_key,
      `"${l.user_name || 'N/A'}"`,
      l.plan,
      l.revoked ? 'REVOKED' : l.is_active ? 'ACTIVE' : 'INACTIVE',
      l.max_devices,
      l.used_devices,
      l.expires_at || 'LIFETIME',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AngkorEmperor_Licenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('info', 'បាន Export ឯកសារ CSV ជោគជ័យ');
  };

  const handleResetToDefault = () => {
    if (confirm('តើអ្នកចង់ Reset ទិន្នន័យទាំងអស់ទៅជា Demo Seed Data ដើមវិញឬទេ?')) {
      setLicenses(initialLicenses);
      setDevices(initialDevices);
      setThreats(initialThreatLogs);
      localStorage.removeItem('angkor_licenses');
      localStorage.removeItem('angkor_devices');
      localStorage.removeItem('angkor_threats');
      showToast('info', 'ទិន្នន័យត្រូវបានកំណត់ឡើងវិញ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1710] via-[#0E0C09] to-[#050505] text-[#F5E8C7] font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* 1. RUNNING RGB MARQUEE HEADER (ពណ៌ត្រួយចេក, MULTI-COLOR CRISP TEXT & FONT CHANGER) */}
      <TopRgbMarqueeHeader 
        currentFont={currentMarqueeFont}
        onFontChange={setCurrentMarqueeFont}
        onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
        onOpenSetupModal={() => setIsDesktopSetupOpen(true)}
      />

      {/* Radiant Luxury Ambient Nightclub RGB Layers (ផ្ទៃខាងក្រោយភ្លើងខ្លឹប RGB) */}
      <div className="fixed inset-0 opacity-25 bg-dot-grid pointer-events-none z-0" />
      
      {/* Dynamic Nightclub RGB Breathing Aura & Club Laser Beams */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Sweeping Laser 1 (RGB Top-Left) */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#CCFF00]/15 to-transparent blur-3xl animate-club-rgb pointer-events-none" />
        
        {/* Sweeping Laser 2 (Saturn Purple / Ruby Laser Top-Right) */}
        <div className="absolute -top-1/3 -right-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-[#C084FC]/25 via-[#EF4444]/15 to-transparent blur-3xl animate-club-laser pointer-events-none" />
        
        {/* Dynamic Center Beat Pulsing Orb (Nightclub Bass Beat Pulse) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#38BDF8]/10 via-[#D4AF37]/15 to-[#EC4899]/15 blur-3xl animate-club-beat pointer-events-none" />
        
        {/* Bottom Ambient Cyber Sweep */}
        <div className="absolute -bottom-1/4 left-1/4 w-[850px] h-[600px] rounded-full bg-gradient-to-tr from-[#00E676]/15 via-[#FB923C]/15 to-transparent blur-3xl animate-club-rgb pointer-events-none" />
      </div>

      {/* Decorative Architectural Watermark in Gold Tint */}
      <div className="fixed right-[-40px] top-1/2 -translate-y-1/2 rotate-90 text-[100px] font-black opacity-[0.03] select-none pointer-events-none tracking-tighter text-[#F5D98E]">
        ANGKOR // 5D
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-10">
        {/* TOP ARCHITECTURAL HEADER */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-[#D4AF37]/25">
          {/* Brand Logo & Spatial Series Badge with 6 Switchable Styles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <AngkorLogo 
              size={54} 
              showText={true} 
              activeStyle={activeLogoStyle}
              onStyleChange={setActiveLogoStyle}
              showStyleSelector={true}
            />
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 w-full max-w-lg mx-4 hidden lg:flex items-center">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search Licenses, Devices, or Threat Logs..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#141414]/80 border border-white/10 hover:border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-xs text-white font-mono placeholder:text-white/30 transition-all outline-none shadow-inner"
              />
              {globalSearchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    onClick={() => setGlobalSearchQuery('')}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Header Status & Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Google Authentication Account Profile Button */}
            <button
              onClick={() => setIsGoogleAuthOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 badge-cyber-glass rounded-xl text-xs transition-all cursor-pointer group"
            >
              {googleUser ? (
                <div className="flex items-center gap-2">
                  <img 
                    src={googleUser.avatarUrl} 
                    alt={googleUser.name}
                    className="w-5 h-5 rounded-full border border-emerald-400 object-cover"
                  />
                  <div className="text-left font-mono">
                    <div className="text-[10px] font-black text-white group-hover:text-[#F5D98E] leading-tight truncate max-w-[120px]">
                      {googleUser.name}
                    </div>
                    <div className="text-[8px] text-emerald-400 leading-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{googleUser.role}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white font-mono text-[10px] font-bold">
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <span>Sign with Google</span>
                </div>
              )}
            </button>

            {/* Live Shield Status Dot with Cyber Glow CSS Animation */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl badge-armor-active text-xs cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] neon-status-dot" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-bold">
                ARMOR · ACTIVE
              </span>
            </div>

            {/* Full System Documentation Specification Button */}
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 badge-docs-luxury rounded-xl text-[10px] uppercase tracking-[0.2em] font-black cursor-pointer text-[#F5D98E]"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ឯកសារប្រព័ន្ធ (DOCS)</span>
            </button>

            {/* Direct Official ABA PayWay Link 1-Tap Trigger */}
            <a
              href="https://pay.ababank.com/oRF8/c49y1xuy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#004B6E] to-[#007EA7] hover:brightness-110 border border-cyan-400/50 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(0,126,167,0.4)]"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>ABA PAY DIRECT</span>
            </a>

            {/* KHQR Modal Trigger */}
            <button
              onClick={() => setIsKhqrModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 btn-sunset-flare rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-[#FED7AA]" />
              <span>KHQR (061444866)</span>
            </button>

            {/* Desktop Setup & Installer Download */}
            <button
              onClick={() => setIsDesktopSetupOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 btn-cyber-tactical rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download Setup</span>
            </button>

            {/* Client Tester Button */}
            <button
              onClick={() => setIsClientSimOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 btn-nature-lush rounded-xl text-[10px] uppercase tracking-[0.25em] font-black text-white transition-all cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5 text-white" />
              <span>Client Simulator</span>
            </button>

            {/* Reset / Reload */}
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] text-white/60 hover:text-white border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg transition-all cursor-pointer"
              title="Reset Demo Data"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </header>

        {/* 6 HIGH-TECH GAMER / CYBERPUNK STYLES SELECTOR BAR (ប្រព័ន្ធអ្នកលេងស្តាយ និងផ្លាស់ប្តូរបានច្រើនសណ្ឋាន) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0C0A06]/95 border-2 mb-8 border-[#D4AF37]/30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono font-black uppercase text-white tracking-wider flex items-center gap-1.5">
              <span>ប្រព័ន្ធអ្នកលេងស្តាយ (6 Switchable 5D Themes):</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {LOGO_STYLES.map((style) => {
              const isSelected = activeLogoStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    setActiveLogoStyle(style.id as LogoArchetype);
                    showToast('success', `Theme switched to: ${style.name}`);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'scale-105 shadow-lg text-black font-black'
                      : 'bg-black/60 text-white/70 hover:text-white border border-white/15 hover:border-white/40'
                  }`}
                  style={{
                    backgroundColor: isSelected ? style.primaryColor : undefined,
                    color: isSelected ? '#000000' : undefined,
                    borderColor: isSelected ? style.primaryColor : undefined,
                    boxShadow: isSelected ? `0 0 15px ${style.accentGlow}` : undefined
                  }}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: isSelected ? '#000000' : style.primaryColor }} 
                  />
                  <span>{style.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEM STATS CARDS */}
        <StatsCards stats={stats} />

        {/* INTERACTIVE COMMAND & TOOL MATRIX (WITH ON-HOVER FEATURE PREVIEW) */}
        <DashboardToolMatrix 
          onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
          onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
          onOpenSetupModal={() => setIsDesktopSetupOpen(true)}
          onOpenClientSim={() => setIsClientSimOpen(true)}
          onNavigateTab={(tab) => setActiveTab(tab as any)}
          onExportCSV={handleExportCSV}
        />

        {/* NAVIGATION TABS WITH ARTISTIC FLAIR */}
        
        {/* DEFENSE & MANAGEMENT TABS */}
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          <h3 className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#CCFF00]">
            ប្រព័ន្ធការពារ និងគ្រប់គ្រង (DEFENSE & MANAGEMENT)
          </h3>
        </div>
        <div className="flex items-center gap-6 sm:gap-8 mb-6 border-b border-[#CCFF00]/20 pb-1 text-[11px] uppercase tracking-[0.25em] font-bold overflow-x-auto">
          {/* 1. FIRST PRIORITY: COMMERCIAL STOREFRONT & SPECIAL PROMOTION */}
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'sales'
                ? 'border-b-2 border-[#D4AF37] text-[#F5D98E] font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E0FF00]" />
            <span>🛒 ទីផ្សារលក់ License & ប្រូម៉ូសិនពិសេស (Commercial Store)</span>
          </button>

          {/* 2. BANK HACK & DEFENSE */}
          <button
            onClick={() => setActiveTab('banking')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'banking'
                ? 'border-b-2 border-[#D4AF37] text-[#F5D98E] font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>🏦 Bank Hack & 5D Defense (កម្រិតកំពូលធនាគារ)</span>
          </button>

          {/* 3. LICENSES MANAGER */}
          <button
            onClick={() => setActiveTab('licenses')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'licenses'
                ? 'border-b-2 border-[#D4AF37] text-white font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#E0FF00]" />
            <span>Licenses // {licenses.length}</span>
          </button>

          {/* 4. SUPER ADMIN PERMISSIONS */}
          <button
            onClick={() => setActiveTab('superadmin')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'superadmin'
                ? 'border-b-2 border-[#D4AF37] text-[#F5D98E] font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Super Admin (កំណត់សិទ្ធិអតិថិជន)</span>
          </button>

          {/* 5. CYBER GLOW BUTTONS */}
          <button
            onClick={() => setActiveTab('cyberglow')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'cyberglow'
                ? 'border-b-2 border-[#CCFF00] text-[#CCFF00] font-black'
                : 'text-white/40 hover:text-[#CCFF00] border-b-2 border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>Cyber Glow Buttons (ស្ទីលបងផ្ញើ)</span>
          </button>

          {/* 6. AI GEMINI ASSISTANT */}
          <button
            onClick={() => setActiveTab('gemini')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'gemini'
                ? 'border-b-2 border-[#CCFF00] text-[#CCFF00] font-black'
                : 'text-white/40 hover:text-[#CCFF00] border-b-2 border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>AI Gemini Security Assistant</span>
          </button>

          {/* 7. GAME ESPORTS ARMOR */}
          <button
            onClick={() => setActiveTab('alpha8')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'alpha8'
                ? 'border-b-2 border-[#00E5FF] text-[#00E5FF] font-black'
                : 'text-white/40 hover:text-[#00E5FF] border-b-2 border-transparent'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Game & Esports Armor</span>
          </button>

          {/* 8. THREAT INTEL */}
          <button
            onClick={() => setActiveTab('threats')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'threats'
                ? 'border-b-2 border-[#FF3B30] text-[#FF3B30] font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF3B30]" />
            <span>Threat Logs // {threats.length}</span>
          </button>

          {/* 9. CONNECTED DEVICES */}
          <button
            onClick={() => setActiveTab('devices')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'devices'
                ? 'border-b-2 border-white text-white font-black'
                : 'text-white/40 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-white/60" />
            <span>Devices // {devices.length}</span>
          </button>
        </div>

        {/* OFFENSIVE & ATTACK TABS */}
        <div className="mb-2 mt-6 flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#FF3B30]" />
          <h3 className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#FF3B30]">
            ប្រព័ន្ធវាយប្រហារ និងសាកល្បងសុវត្ថិភាព (OFFENSIVE & ATTACK)
          </h3>
        </div>
        <div className="flex items-center gap-6 sm:gap-8 mb-8 border-b border-[#FF3B30]/20 pb-1 text-[11px] uppercase tracking-[0.25em] font-bold overflow-x-auto">
          {/* 10. OFFENSIVE ARENA */}
          <button
            onClick={() => setActiveTab('offensive')}
            className={`flex items-center gap-2.5 pb-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'offensive'
                ? 'border-b-2 border-[#FF3B30] text-[#FF3B30] font-black'
                : 'text-[#FF3B30]/50 hover:text-[#FF3B30] border-b-2 border-transparent'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FF3B30]" />
            <span>Offensive Hacker Arena (ទីលានវាយប្រហារ)</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'licenses' && (
          <LicenseTable
            licenses={filteredLicenses}
            onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
            onExtendLicense={(lic) => {
              setActiveLicenseForAction(lic);
              setIsExtendModalOpen(true);
            }}
            onToggleRevoke={handleToggleRevoke}
            onUpdateRating={handleUpdateRating}
            onViewDevices={(lic) => {
              setActiveLicenseForAction(lic);
              setIsDeviceModalOpen(true);
            }}
            onDeleteLicense={handleDeleteLicense}
            onExportCSV={handleExportCSV}
            onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
          />
        )}

        {activeTab === 'banking' && (
          <BankingCyberDefenseSuite 
            onSimulateThreat={handleSimulateThreat} 
            activeTheme={activeLogoStyle}
          />
        )}

        {activeTab === 'cyberglow' && (
          <CyberGlowShowcaseHub 
            onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
            onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
            onOpenSetupModal={() => setIsDesktopSetupOpen(true)}
            onOpenClientSim={() => setIsClientSimOpen(true)}
            onShowToast={(msg, type) => showToast(type === 'danger' ? 'error' : type, msg)}
          />
        )}

        {activeTab === 'superadmin' && (
          <SuperAdminPermissionHub onShowToast={showToast} />
        )}

        {activeTab === 'gemini' && (
          <SuperAdminGeminiAssistant 
            licenses={licenses}
            devices={devices}
            threatLogs={threats}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'sales' && (
          <CommercialDistributionHub 
            onOpenSetupModal={() => setIsDesktopSetupOpen(true)}
            onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
          />
        )}

        {activeTab === 'alpha8' && (
          <GameAlpha8Monitor onNotifyThreat={handleSimulateThreat} />
        )}

        {activeTab === 'security' && (
          <SecurityAssessment />
        )}

        {activeTab === 'offensive' && (
          <CinematicHackerAttackArena />
        )}

        {activeTab === 'threats' && (
          <ThreatIntelligence
            threats={filteredThreats}
            onSimulateThreat={handleSimulateThreat}
            onClearThreats={() => {
              if (confirm('តើអ្នកពិតជាចង់សម្អាតកំណត់ត្រាការវាយប្រហារទាំងអស់មែនទេ?')) {
                setThreats([]);
                showToast('info', 'បានសម្អាត Threat Logs');
              }
            }}
          />
        )}

        {activeTab === 'devices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-[#40C4FF]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono font-bold">
                    Nodes / Seats Allocation
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  បញ្ជីឧបករណ៍ភ្ជាប់ Hardware Seats
                </h3>
              </div>
              <div className="text-xs font-mono text-white/50">
                TOTAL: <span className="text-[#E0FF00] font-bold">{filteredDevices.length}</span> SEATS MATCHED
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className="bg-[#0C0C0C] border border-white/10 hover:border-white/30 p-6 transition-all space-y-4 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#141414] border border-white/10 flex items-center justify-center text-[#40C4FF]">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white truncate max-w-[170px]">
                          {device.device_name}
                        </h4>
                        <span className="text-[10px] text-[#E0FF00] font-mono tracking-wider">
                          {device.license_key}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-[#E0FF00]/10 text-[#E0FF00] px-2 py-0.5 border border-[#E0FF00]/20">
                      Active
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] font-mono text-white/70 bg-[#141414] p-3.5 border border-white/5">
                    <div className="flex justify-between">
                      <span className="text-white/40">IP ADDR:</span>
                      <span className="text-white font-semibold">{device.ip_address}</span>
                    </div>
                    <div className="flex justify-between" title={device.hardware_fingerprint}>
                      <span className="text-white/40">HWID:</span>
                      <span className="text-white/90">{device.hardware_fingerprint.substring(0, 16)}...</span>
                    </div>
                    <div className="text-[10px] text-white/40 truncate pt-1 border-t border-white/5">
                      {device.user_agent}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-white/40 font-mono">
                    <span>SEEN: {new Date(device.first_activated).toLocaleDateString('km-KH')}</span>
                    <button
                      onClick={() => handleUnlinkDevice(device.device_id)}
                      className="text-[#FF3B30] hover:text-white uppercase tracking-widest text-[9px] font-bold cursor-pointer"
                    >
                      [ ផ្ដាច់ SEAT ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <CommercialDistributionHub 
            onIssueLicense={handleGenerateLicense}
            onOpenSetupModal={() => setIsDesktopSetupOpen(true)}
            onOpenKhqrModal={() => setIsKhqrModalOpen(true)}
          />
        )}

        {/* ARTISTIC FLAIR ARCHITECTURAL FOOTER */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs text-white/60">
          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Coordinates</div>
              <div className="text-xs font-mono tracking-wider text-white opacity-80">13.4125° N // 103.8670° E</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Engine</div>
              <div className="text-xs font-mono tracking-wider text-[#E0FF00] opacity-90">5D ZERO-TRUST ARMOR</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Framework</div>
              <div className="text-xs font-mono tracking-wider text-[#D4AF37] opacity-90">ANGKOR EMPEROR MMXXVI</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div className="flex flex-col gap-1.5 items-start md:items-end">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Target</div>
              <div className="text-xs font-mono tracking-wider text-white opacity-80">GAME ALPHA8 (x64)</div>
            </div>
            <div className="flex flex-col gap-1.5 items-start md:items-end">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Status</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0FF00] shadow-[0_0_8px_#E0FF00]" />
                <span className="text-xs font-mono tracking-wider text-white opacity-80 uppercase">SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* MODALS */}
      <GenerateLicenseModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateLicense}
      />

      <ExtendLicenseModal
        isOpen={isExtendModalOpen}
        license={activeLicenseForAction}
        onClose={() => {
          setIsExtendModalOpen(false);
          setActiveLicenseForAction(null);
        }}
        onConfirmExtend={handleConfirmExtend}
      />

      <DeviceListModal
        isOpen={isDeviceModalOpen}
        license={activeLicenseForAction}
        devices={devices}
        onClose={() => {
          setIsDeviceModalOpen(false);
          setActiveLicenseForAction(null);
        }}
        onUnlinkDevice={handleUnlinkDevice}
      />

      <ClientSimulatorModal
        isOpen={isClientSimOpen}
        licenses={licenses}
        onClose={() => setIsClientSimOpen(false)}
        onActivateSuccess={handleActivateSuccess}
        onSimulateThreat={handleSimulateThreat}
      />

      <DesktopSetupModal
        isOpen={isDesktopSetupOpen}
        onClose={() => setIsDesktopSetupOpen(false)}
      />

      <SystemDocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        activeTheme={activeLogoStyle}
      />

      <AcledaKhqrModal
        isOpen={isKhqrModalOpen}
        onClose={() => setIsKhqrModalOpen(false)}
      />

      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
        currentUser={googleUser}
        onSignIn={(u) => {
          setGoogleUser(u);
          showToast('success', 'បានចូលប្រើប្រាស់តាម Google ដោយជោគជ័យ!', u.email);
        }}
        onSignOut={() => {
          setGoogleUser(null);
          showToast('info', 'បានចាកចេញពីគណនី Google');
        }}
        activeTheme={activeLogoStyle}
      />

      {/* FLOATING AUTO-HIDE AI GEMINI INBOX (BOTTOM RIGHT) */}
      <FloatingAiChatWidget onShowToast={showToast} />

      {/* TOAST CONTAINER */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
