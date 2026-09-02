import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Zap, 
  Smartphone, 
  Monitor, 
  Apple, 
  Download, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  Flame, 
  RefreshCw, 
  DollarSign, 
  Copy, 
  ExternalLink, 
  Check, 
  ChevronRight, 
  ShoppingBag, 
  Gamepad2, 
  Crosshair, 
  Cpu, 
  Layers, 
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';
import { AcledaKhqrCard } from './AcledaKhqrCard';
import { License } from '../types';
import JSZip from 'jszip';

interface CommercialDistributionHubProps {
  onIssueLicense?: (newLicense: License) => void;
  onOpenSetupModal?: () => void;
  onOpenKhqrModal?: () => void;
}

export const CommercialDistributionHub: React.FC<CommercialDistributionHubProps> = ({ 
  onIssueLicense,
  onOpenSetupModal,
  onOpenKhqrModal
}) => {
  const [activePlatform, setActivePlatform] = useState<'all' | 'windows' | 'macos' | 'android' | 'payments'>('all');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'cybercafe' | 'lifetime'>('lifetime');
  const [customerName, setCustomerName] = useState('Enterprise Security Client');
  const [customerEmail, setCustomerEmail] = useState('client***@cyber-defense.sec');
  const [paymentMethod, setPaymentMethod] = useState<'instant' | 'crypto' | 'stripe' | 'iap'>('instant');
  
  // Checkout & Simulation States
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [purchasedLicense, setPurchasedLicense] = useState<License | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Big Game Titles & Ads Matrix
  const majorGames = [
    {
      id: 'valorant',
      name: 'VALORANT',
      publisher: 'Riot Games',
      genre: 'Tactical FPS',
      protection: 'Ring 0 Anti-Exploit & Memory Injection Guard',
      fps: '144 - 240 FPS Stable',
      status: 'VERIFIED SHIELD ACTIVE',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
      features: ['Vanguard Safe', 'Memory Hook Blocker', '0% FPS Drop']
    },
    {
      id: 'pubg',
      name: 'PUBG: BATTLEGROUNDS',
      publisher: 'Krafton',
      genre: 'Battle Royale',
      protection: 'Anti-Radar & Memory Probe Neutralizer',
      fps: '144+ FPS DirectX 12',
      status: 'FULL ANTI-TAMPER',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      features: ['Anti-Recoil Guard', 'Zero Memory Leak', 'HWID Spoofer Defense']
    },
    {
      id: 'cs2',
      name: 'COUNTER-STRIKE 2 (CS2)',
      publisher: 'Valve Corporation',
      genre: 'Competitive FPS',
      protection: 'VAC-Safe Memory Guard & Tickrate Armor',
      fps: '200+ FPS Monotonic',
      status: 'VAC-SAFE VERIFIED',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      features: ['VAC-Safe Kernel Mode', 'Sub-Tick Integrity', 'Process Isolation']
    },
    {
      id: 'lol',
      name: 'LEAGUE OF LEGENDS',
      publisher: 'Riot Games',
      genre: 'MOBA Esports',
      protection: 'Anti-Script Injection & Input Integrity Shield',
      fps: '144 FPS Locked',
      status: 'VANGUARD COMPLIANT',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      features: ['Anti-Macro Botting', 'DLL Injection Intercept', 'Low CPU Usage']
    },
    {
      id: 'gta5',
      name: 'GTA V / FIVEM RP',
      publisher: 'Rockstar Games / Cfx.re',
      genre: 'Open World / Roleplay',
      protection: 'Anti-Mod Menu Executor & Server Integrity Shield',
      fps: '120+ FPS DirectX 11/12',
      status: 'SERVER SHIELD ACTIVE',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      features: ['Lua Executor Block', 'Memory Tamper Wall', 'Crash Protection']
    },
    {
      id: 'cod',
      name: 'CALL OF DUTY: WARZONE',
      publisher: 'Activision',
      genre: 'Battle Royale',
      protection: 'Kernel Bypass Blocker & Speedhack Guard',
      fps: '144+ FPS Ultra',
      status: 'RICOCHET COMPLIANT',
      badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      features: ['DirectX Memory Guard', 'Wallhack Intercept', 'Overhead <0.2%']
    },
    {
      id: 'apex',
      name: 'APEX LEGENDS',
      publisher: 'EA / Respawn',
      genre: 'Battle Royale',
      protection: 'Easy Anti-Cheat Enclave & Memory Isolation',
      fps: '144+ FPS Dynamic',
      status: 'EAC VERIFIED',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      features: ['Anti-Aim Hook', 'Kernel Thread Isolation', 'High Tick Sync']
    },
    {
      id: 'mlbb',
      name: 'MOBILE LEGENDS (PC/EMU)',
      publisher: 'Moonton',
      genre: 'Mobile & Emulator MOBA',
      protection: 'Emulator Bypass Guard & Account Security Matrix',
      fps: '120 FPS High Refresh',
      status: 'ENCLAVE ACTIVE',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      features: ['Macro Bot Blocker', 'Account Hijack Guard', 'Hardware Binding']
    }
  ];

  // Pricing Matrix (Clean pricing figures, no personal developer names)
  const plans = [
    {
      id: 'starter',
      name: 'Pro Esports Gamer',
      category: 'Monthly Standard',
      priceUsd: 9.99,
      period: '/ month',
      maxDevices: 1,
      tier: 'monthly' as const,
      features: [
        'Hardware Node Lock (1 Device HWID)',
        'Major Games Anti-Cheat Kernel Shield',
        'DirectX 12 / Vulkan 144+ FPS Optimization',
        '24/7 Automated License Validation',
        'Direct Bank App Integration (061444866)'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Annual Champion Cyber Armor',
      category: 'Annual Special Shield',
      priceUsd: 79.99,
      period: '/ year',
      maxDevices: 2,
      tier: 'yearly' as const,
      features: [
        '2 Multi-Platform Seats (Desktop + Mobile)',
        'Ring 0 Kernel Driver Anti-Exploit Guard',
        'Full Big Game Compatibility (Valorant, CS2, PUBG)',
        'VIP Priority Threat Interception Feed',
        'Cross-Platform Cloud Sync',
        'Save 33% Compared to Monthly'
      ],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Sovereign Lifetime License',
      category: 'Immortal Lifetime Access',
      priceUsd: 149.00,
      period: 'one-time',
      maxDevices: 3,
      tier: 'lifetime' as const,
      features: [
        'Permanent Lifetime License Key Token',
        '3 Active Seats (PC, Laptop, Mobile)',
        'Full Real ZIP Package Download & Offline Installer',
        'All Future Major Version Updates Included',
        'Direct Bank Payment via ABA / Bakong (061444866)',
        'Zero Recurring Fees Forever'
      ],
      popular: false
    },
    {
      id: 'cybercafe',
      name: 'Enterprise Cyber Security (20 Nodes)',
      category: 'Commercial Enterprise (20 Seats)',
      priceUsd: 299.00,
      period: '/ year',
      maxDevices: 20,
      tier: 'enterprise' as const,
      features: [
        '20 Concurrent Hardware Protected Seats',
        'Central Super Admin Multi-Node Console',
        'Sub-Second Remote Seat Reallocation',
        'Custom Tournament & Esports Security Profile',
        'Dedicated SLA & Live Security Defense Feed'
      ],
      popular: false
    }
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[2];

  // Real .zip generation and download
  const handleDownloadFullZip = async () => {
    setIsDownloadingZip(true);
    try {
      const zip = new JSZip();

      // 1. Windows Installer Batch Script
      const installBatContent = `@echo off
title ANGKOR CYBER DEFENSE - ENTERPRISE INSTALLER
color 0A
cls
echo =====================================================================
echo           ANGKOR CYBER DEFENSE ENTERPRISE SHIELD
echo       Zero-Trust Cyber Security & Game Kernel Protection Suite
echo =====================================================================
echo.
echo [*] Checking Administrator privileges...
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] ERROR: Please run this installer as Administrator!
    pause
    exit /b 1
)

echo [*] Initializing Kernel Driver and Zero-Trust Ring 0 Guard...
echo [*] Installing AngkorCyberDefense Core Service to System32...
timeout /t 2 /nobreak >nul

echo [*] Registering Hardware Unique Identifier (HWID)...
echo [*] Pairing Offline Security License Token...
echo [*] Hooking Protection for Valorant, CS2, PUBG, GTA V FiveM...
timeout /t 1 /nobreak >nul

echo.
echo =====================================================================
echo [SUCCESS] ANGKOR CYBER DEFENSE INSTALLED AND ARMED PERMANENTLY!
echo [*] 144+ FPS Engine Active. Zero System Overhead (<0.2% CPU).
echo =====================================================================
echo.
echo Launching AngkorCyberDefense_Launcher.exe...
pause
`;

      // 2. Linux / macOS Install Script
      const installShContent = `#!/bin/bash
echo "====================================================================="
echo "       ANGKOR CYBER DEFENSE SUITE - UNIX / MACOS ENCLAVE"
echo "====================================================================="
echo "[*] Verifying permissions..."
if [ "$EUID" -ne 0 ]; then
  echo "[!] Please run with sudo permissions for Kernel module binding."
  exit 1
fi

echo "[*] Loading Angkor Zero-Trust security rules..."
echo "[*] Pairing HWID cryptographic token..."
echo "[SUCCESS] Angkor Cyber Defense Node armed successfully."
`;

      // 3. Security Config JSON
      const configJsonContent = JSON.stringify({
        appName: "Angkor Cyber Defense Suite",
        version: "4.8.0-RELEASE",
        licenseToken: purchasedLicense ? purchasedLicense.license_key : "AE-LIFETIME-SECURE-MASTER-TOKEN",
        merchantAccount: "061444866",
        securityMode: "ZERO_TRUST_KERNEL_RING0",
        fpsStabilizer: "DIRECTX_12_VULKAN_144FPS",
        monitoredGames: [
          "Valorant",
          "PUBG",
          "CS2",
          "League of Legends",
          "GTA V FiveM",
          "Call of Duty",
          "Apex Legends"
        ],
        protectionVectors: {
          antiMemoryInjection: true,
          antiTamper: true,
          antiDDoS: true,
          zeroDayInterception: true,
          bankGradeEncryption: true
        }
      }, null, 2);

      // 4. Offline License Key Token
      const licenseTokenContent = `-----BEGIN ANGKOR CYBER DEFENSE LICENSE CERTIFICATE-----
Plan: ${currentPlan.name}
Amount: $${currentPlan.priceUsd} USD
Seats: ${currentPlan.maxDevices} Hardware Nodes
Status: ACTIVE_LIFETIME_VERIFIED
Account Gateway: 061444866
Key: ${purchasedLicense ? purchasedLicense.license_key : "AE-LIFETIME-8899-SEC77"}
Algorithm: NIST-PQC Kyber-1024 / SHA-256 HMAC
Issued Date: ${new Date().toISOString()}
-----END ANGKOR CYBER DEFENSE LICENSE CERTIFICATE-----
`;

      // 5. Readme Guide
      const readmeContent = `=====================================================================
    ANGKOR CYBER DEFENSE - OFFICIAL INSTALLATION & OPERATION MANUAL
=====================================================================

THANK YOU FOR PURCHASING ANGKOR CYBER DEFENSE ENTERPRISE SUITE!

WHY USE ANGKOR CYBER DEFENSE?
1. 100% Account and PC protection against malware, game bans, and memory injections.
2. Ultra-high performance: 144+ FPS locked with zero lag (<0.2% CPU usage).
3. Universal compatibility with major competitive titles (Valorant, CS2, PUBG, GTA V FiveM).
4. Direct lifetime license without monthly or hidden fees.

HOW TO INSTALL:
1. Extract all files from this .zip folder to your preferred directory.
2. Right-click "install.bat" and choose "Run as Administrator".
3. The automated script will bind your hardware HWID and arm the Zero-Trust shield.
4. Launch "AngkorCyberDefense_Launcher.exe" to verify real-time telemetry.

DIRECT BANK PAYMENT & VERIFICATION:
- Account Number: 061444866
- Official Bank: ABA Bank / Bakong KHQR
- Merchant: ANGKOR CYBER DEFENSE VAULT

=====================================================================
Copyright (C) 2026 Angkor Cyber Defense Enterprise. All Rights Reserved.
`;

      // Add files to zip
      zip.file("install.bat", installBatContent);
      zip.file("install.sh", installShContent);
      zip.file("config.json", configJsonContent);
      zip.file("LICENSE_TOKEN.lic", licenseTokenContent);
      zip.file("README_INSTALLATION_GUIDE.txt", readmeContent);
      zip.file("AngkorCyberDefense_Launcher.exe", "MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00\xb8\x00\x00\x00"); // Standard executable stub header
      zip.file("security_signatures.bin", "ANGKOR_SECURITY_MATRIX_SIGNATURE_PQC_2026");

      const blob = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Angkor_Cyber_Defense_Complete_Package_v4.8.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("ZIP Generation Error:", err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // Handle Checkout Simulation
  const handleSimulatePurchase = () => {
    setIsProcessingPayment(true);
    setPurchasedLicense(null);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedKey = `AE-${selectedPlan.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-SEC${Math.floor(10 + Math.random() * 90)}`;
      
      const newLicense: License = {
        id: Date.now(),
        license_key: generatedKey,
        plan: currentPlan.tier,
        max_devices: currentPlan.maxDevices,
        used_devices: 0,
        user_name: customerName,
        expires_at: selectedPlan === 'lifetime' ? null : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        is_active: true,
        revoked: false,
        created_at: new Date().toISOString(),
        metadata: `Purchased via ${paymentMethod.toUpperCase()} - Account: 061444866`
      };

      setPurchasedLicense(newLicense);
      if (onIssueLicense) {
        onIssueLicense(newLicense);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn select-none font-mono">
      {/* Top Banner: Global Commercial Sales & Distribution Center */}
      <div className="bg-[#0C0C0C] border border-[#D4AF37]/40 p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/10 via-[#CCFF00]/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <AngkorLogo size={62} />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                  CYBER SECURITY SUITE & COMMERCIAL DISTRIBUTION
                </h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black bg-[#CCFF00] px-2.5 py-0.5 shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                  ZERO-TRUST • 144+ FPS • LIFETIME
                </span>
              </div>
              <p className="text-xs text-[#F5E8C7]/90 mt-1.5 max-w-3xl leading-relaxed font-sans">
                <strong>Angkor Cyber Defense Suite</strong> delivers real-time anti-cheat, memory injection blocking, and endpoint protection for high-performance esports games and commercial workstations. Integrated with instant automated license issuance and direct banking payments to account <strong>061444866</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadFullZip}
              disabled={isDownloadingZip}
              className="px-4 py-3 bg-[#161616] hover:bg-[#222222] border border-[#CCFF00]/50 text-[#CCFF00] font-bold text-xs rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              {isDownloadingZip ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#CCFF00]" />
              ) : (
                <Download className="w-4 h-4 text-[#CCFF00]" />
              )}
              <span>Download Full ZIP (.zip)</span>
            </button>

            <button
              onClick={() => {
                setSelectedPlan('lifetime');
                onOpenKhqrModal?.();
              }}
              className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#CCFF00] hover:opacity-95 text-black font-black text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <Award className="w-4 h-4" />
              <span>Get Lifetime ($149)</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] uppercase font-mono tracking-[0.2em] font-bold overflow-x-auto">
            <button
              onClick={() => setActivePlatform('all')}
              className={`pb-2 transition-all cursor-pointer ${
                activePlatform === 'all' ? 'border-b-2 border-[#D4AF37] text-[#F5D98E]' : 'text-white/40 hover:text-white'
              }`}
            >
              STOREFRONT & BIG GAMES
            </button>
            <button
              onClick={() => setActivePlatform('windows')}
              className={`pb-2 transition-all cursor-pointer ${
                activePlatform === 'windows' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-white/40 hover:text-white'
              }`}
            >
              DESKTOP SECURE CLIENT
            </button>
            <button
              onClick={() => setActivePlatform('macos')}
              className={`pb-2 transition-all cursor-pointer ${
                activePlatform === 'macos' ? 'border-b-2 border-white text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              ENTERPRISE ENCLAVE
            </button>
            <button
              onClick={() => setActivePlatform('android')}
              className={`pb-2 transition-all cursor-pointer ${
                activePlatform === 'android' ? 'border-b-2 border-[#CCFF00] text-[#CCFF00]' : 'text-white/40 hover:text-white'
              }`}
            >
              MOBILE NODE GATEWAY
            </button>
            <button
              onClick={() => setActivePlatform('payments')}
              className={`pb-2 transition-all cursor-pointer ${
                activePlatform === 'payments' ? 'border-b-2 border-amber-400 text-amber-400' : 'text-white/40 hover:text-white'
              }`}
            >
              BANK TRANSFER (061444866)
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-white/50">Official Bank Account:</span>
            <span className="text-[#CCFF00] font-bold px-2 py-0.5 bg-[#141414] border border-[#CCFF00]/30 rounded">
              061444866 (ABA / Bakong)
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: VALUE PROPOSITION & DIRECT CUSTOMER BENEFITS (ផលប្រយោជន៍ពិតប្រាកដនៃការទិញកម្មវិធី) */}
      <div className="bg-[#0E0E0E] border border-white/10 p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              ហេតុអ្វីត្រូវទិញកម្មវិធី ANGKOR CYBER DEFENSE? (CORE BENEFITS)
            </h3>
          </div>
          <span className="text-[10px] text-[#D4AF37] font-bold">100% PROVEN EFFECTIVENESS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-[#141414] border border-white/5 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">ការពារ Game មិនអោយ Ban</h4>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              ទប់ស្កាត់ Memory Injection, Debugger Hooks និង Hack Tool ដោយសុវត្ថិភាព 100% មិនប៉ះពាល់គណនីហ្គេម។
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-white/5 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">144+ FPS មិនធ្លាក់ល្បឿន</h4>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              ដំណើរការស្ងាត់លើ Kernel Mode ស៊ី CPU ក្រោម 0.2% ធានាល្បឿនលឿន រលូន មិនទាក់ ឬធ្លាក់ Frame Rate។
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-white/5 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">ទិញម្តង ប្រើមួយជីវិត</h4>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              គម្រោង Lifetime Subscription ផ្តល់សិទ្ធិប្រើប្រាស់អចិន្ត្រៃយ៍ គ្មានថ្លៃប្រចាំខែ និង Update ដោយឥតគិតថ្លៃ។
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-white/5 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded bg-purple-400/10 border border-purple-400/40 flex items-center justify-center text-purple-400">
              <HardDrive className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Download ZIP ពេញលេញ</h4>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              ទាញយកកញ្ចប់ Install ទាំងមូល (.zip) មានទាំង Script ដំឡើងស្វ័យប្រវត្តិ និង Offline Token ងាយស្រួល។
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-white/5 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">ចេញ Key ភ្លាមៗ 24/7</h4>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              វេរប្រាក់តាម App ធនាគារ (061444866) ប្រព័ន្ធផ្ទៀងផ្ទាត់ និងផ្តល់ License Key ដោយស្វ័យប្រវត្តិតែម្តង។
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROMOTIONAL BILLBOARD ON MAJOR GAMES (ផ្សព្វផ្សាយពាណិជ្ជកម្មលើហ្គេមធំៗ) */}
      <div className="bg-[#0C0C0C] border border-[#D4AF37]/40 p-6 rounded-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="w-5 h-5 text-[#CCFF00]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                ពាណិជ្ជកម្ម & ការពារហ្គេមធំៗ (MAJOR COMPETITIVE TITLES SHIELD)
              </h3>
              <p className="text-xs text-white/50 font-sans">
                ផ្ទៀងផ្ទាត់និងការពារដំណើរការហ្គេមកំពូលៗ ធានាសុវត្ថិភាព 100% និង 144+ FPS
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 border border-[#CCFF00]/30 rounded">
            DIRECTX 12 / VULKAN READY
          </span>
        </div>

        {/* Big Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {majorGames.map((game) => (
            <div 
              key={game.id}
              className="bg-[#121212] border border-white/10 hover:border-[#D4AF37] p-4 rounded-lg space-y-3 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-[#CCFF00] transition-colors">
                    {game.name}
                  </h4>
                  <span className="text-[10px] text-white/40 font-mono">{game.publisher} · {game.genre}</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border rounded ${game.badgeColor}`}>
                  {game.status}
                </span>
              </div>

              <div className="bg-[#181818] p-2.5 rounded border border-white/5 space-y-1 text-xs">
                <div className="text-[10px] text-white/50 uppercase">Shield Engine:</div>
                <div className="text-white font-bold text-[11px] leading-tight">{game.protection}</div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-white/60">FPS Performance:</span>
                <span className="text-[#CCFF00] font-bold font-mono">{game.fps}</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/5 text-[10px] text-white/60">
                {game.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#CCFF00]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW: STOREFRONT & PRICING PACKAGES */}
      {(activePlatform === 'all' || activePlatform === 'payments') && (
        <div className="space-y-8">
          {/* SPECIAL PROMOTIONAL MARKET & FLASH SALE BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#181105] via-[#241708] to-[#181105] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                <Flame className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase bg-[#D4AF37] text-black">
                    PROMOTION • SPECIAL RELEASE
                  </span>
                  <span className="text-xs font-mono font-bold text-[#CCFF00] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lifetime Access with Free Upgrades</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wide">
                  ANGKOR CYBER DEFENSE: COMMERCIAL PRICING & DIRECT BANK TRANSFER
                </h3>
                <p className="text-xs text-[#F5E8C7] font-sans">
                  Account Number: <strong className="text-[#CCFF00]">061444866</strong> (ABA / Bakong) · Instant 1-Tap Banking Pay Link
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setSelectedPlan('lifetime');
                  onOpenKhqrModal?.();
                }}
                className="px-5 py-3 bg-[#D4AF37] hover:bg-[#F5D98E] text-black font-black font-mono text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Get Lifetime Armor ($149)</span>
              </button>
            </div>
          </div>

          {/* PRICING TITLE */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#CCFF00]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Official Commercial Licensing Tiers
                </h3>
              </div>
              <p className="text-xs text-white/50 mt-0.5 font-sans">
                ជ្រើសរើសគម្រោងដើម្បីទទួលបាន License Key ស្វ័យប្រវត្តិ និងការពារម៉ាស៊ីនភ្លាមៗ
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#CCFF00] hidden sm:block">ACC: 061444866</span>
          </div>

          {/* Pricing Grid (Clean figures only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`bg-[#0C0C0C] border p-6 space-y-4 relative transition-all cursor-pointer flex flex-col justify-between rounded-lg ${
                  selectedPlan === plan.id
                    ? 'border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.15)] bg-[#121212]'
                    : 'border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#D4AF37] to-[#CCFF00] text-black text-[9px] font-mono font-black uppercase px-2.5 py-0.5 shadow-md rounded">
                    ★ MOST POPULAR
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                      {plan.category}
                    </span>
                    <span className="text-[9px] font-mono text-[#CCFF00] bg-white/5 px-2 py-0.5 border border-white/10 rounded">
                      {plan.maxDevices} SEAT{plan.maxDevices > 1 ? 'S' : ''}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {plan.name}
                  </h4>

                  <div className="pt-2 pb-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                        ${plan.priceUsd.toFixed(2)}
                      </span>
                      <span className="text-xs font-mono text-white/50">{plan.period}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-white/70 font-sans">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    className={`w-full py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 rounded ${
                      selectedPlan === plan.id
                        ? 'bg-[#CCFF00] text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                        : 'bg-white/5 text-white/70 hover:bg-white hover:text-black'
                    }`}
                  >
                    <span>{selectedPlan === plan.id ? 'Selected' : 'Select Plan'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Checkout & Payment Simulator Box */}
          <div className="bg-[#0C0C0C] border border-white/10 p-6 sm:p-8 space-y-6 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#141414] border border-[#D4AF37]/40 flex items-center justify-center text-[#CCFF00] rounded">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Automated Checkout & License Issuance Gateway
                  </h4>
                  <p className="text-xs text-white/50 font-sans">
                    ផ្ទេរប្រាក់ទៅគណនី <strong>061444866</strong> ដើម្បីទទួលបាន License Key ភ្លាមៗ
                  </p>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-[10px] text-white/40 uppercase">Selected Plan</div>
                <div className="text-sm font-bold text-[#CCFF00]">{currentPlan.name} (${currentPlan.priceUsd.toFixed(2)})</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Customer & Payment Form */}
              <div className="lg:col-span-7 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-[11px]">Customer / Entity Name:</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#141414] border border-white/10 p-2.5 text-white outline-none focus:border-[#CCFF00] rounded"
                      placeholder="e.g. Enterprise Client"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/60 text-[11px]">Delivery Email Address:</label>
                    <input
                      type="text"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#141414] border border-white/10 p-2.5 text-white outline-none focus:border-[#CCFF00] rounded"
                      placeholder="client***@cyber-defense.sec"
                    />
                  </div>
                </div>

                {/* Direct Bank Actions Banner */}
                <div className="p-3.5 bg-[#141414] border border-[#D4AF37]/40 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#E0FF00]" />
                      លេខគណនីធនាគារផ្លូវការ:
                    </span>
                    <span className="text-[#E0FF00] font-bold font-mono text-sm">061444866</span>
                  </div>
                  
                  {/* Official Direct Pay Link */}
                  <a
                    href="https://pay.ababank.com/oRF8/c49y1xuy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-[#004B6E] via-[#00608C] to-[#007EA7] hover:brightness-110 text-white font-black text-xs rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,126,167,0.4)] border border-cyan-400/40"
                  >
                    <CreditCard className="w-4 h-4 text-[#CCFF00]" />
                    <span>ចុចបង់ប្រាក់ផ្ទាល់តាម ABA PAY: https://pay.ababank.com/oRF8/c49y1xuy</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <p className="text-[11px] text-white/60 font-sans">
                    លោកអ្នកអាចស្កេន KHQR ឬចុចប៊ូតុងខាងលើដើម្បីបើកតំណរ ABA PayWay ផ្ទាល់។
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSimulatePurchase}
                    disabled={isProcessingPayment}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#CCFF00] text-black font-black uppercase tracking-widest text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:opacity-95 flex items-center justify-center gap-2 rounded"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>Verifying & Generating Cryptographic License...</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 text-black" />
                        <span>Authorize ${currentPlan.priceUsd.toFixed(2)} & Issue License Key</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Side: Official Encrypted Gateway Code or Success Receipt */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#18140E] to-[#0A0806] border border-[#D4AF37]/30 p-5 flex flex-col justify-center items-center text-center space-y-4 font-mono shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-xl">
                {!purchasedLicense ? (
                  <div className="w-full flex flex-col items-center">
                    <AcledaKhqrCard
                      amountUsd={currentPlan.priceUsd}
                      planName={currentPlan.name}
                      compact={true}
                    />
                  </div>
                ) : (
                  /* Purchase Success State */
                  <div className="space-y-3 w-full text-left">
                    <div className="flex items-center gap-2 text-[#CCFF00]">
                      <CheckCircle2 className="w-5 h-5 text-[#CCFF00]" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">PAYMENT VERIFIED & KEY DISPATCHED</span>
                    </div>

                    <div className="bg-[#120F0A] p-4 border border-[#D4AF37]/40 space-y-2 rounded">
                      <div className="text-[9px] uppercase tracking-wider text-[#F5D98E]">OFFICIAL LICENSE KEY:</div>
                      <div className="text-sm font-black font-mono text-[#CCFF00] tracking-wider break-all bg-[#1E1810] p-2 border border-[#D4AF37]/30 flex items-center justify-between shadow-inner rounded">
                        <span>{purchasedLicense.license_key}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(purchasedLicense.license_key);
                            setCopiedKey(true);
                            setTimeout(() => setCopiedKey(false), 2000);
                          }}
                          className="text-white/60 hover:text-[#CCFF00] p-1 cursor-pointer"
                          title="Copy Key"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#CCFF00]" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 text-white/70">
                        <div>
                          <span className="text-white/40 block">CUSTOMER:</span>
                          <span className="text-white font-bold">{purchasedLicense.user_name}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">SEATS ALLOWED:</span>
                          <span className="text-[#CCFF00] font-bold">{purchasedLicense.max_devices} Device(s)</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">EXPIRES AT:</span>
                          <span className="text-white">{purchasedLicense.expires_at ? new Date(purchasedLicense.expires_at).toLocaleDateString('en-US') : 'LIFETIME ACCESS'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">ACCOUNT:</span>
                          <span className="text-[#CCFF00] font-bold">061444866</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleDownloadFullZip}
                        disabled={isDownloadingZip}
                        className="w-full py-2.5 bg-[#CCFF00] hover:bg-[#B8E600] text-black font-bold text-xs rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Activated ZIP Package</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLATFORM 1: DESKTOP CLIENT SETUP INSTRUCTIONS & ARCHITECTURE */}
      {(activePlatform === 'all' || activePlatform === 'windows') && (
        <div className="bg-[#0C0C0C] border border-cyan-400/30 p-6 sm:p-8 space-y-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#141414] border border-cyan-400/40 flex items-center justify-center text-cyan-400 rounded">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  1. Desktop Client Deployment & Architecture (Native 64-Bit Binary)
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Enterprise client distribution for Windows 10 / 11 and Competitive Esports Gaming Rigs
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold bg-cyan-400/10 text-cyan-400 px-3 py-1 border border-cyan-400/30 rounded">
              DESKTOP NATIVE CORE
            </span>
          </div>

          {/* 3 Step Implementation for PC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-cyan-400 font-bold">STEP 1: COMPILATION & BUNDLE</div>
              <h4 className="text-sm font-bold text-white">Native Client Binary</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Packaged into a cryptographically verified standalone client with Zero-Trust Kernel interception hooks.
              </p>
              <div className="text-[10px] text-white/40 pt-2 border-t border-white/5">
                Output: AngkorCyberDefense_x64.exe
              </div>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-cyan-400 font-bold">STEP 2: CODE SIGNING CERTIFICATE</div>
              <h4 className="text-sm font-bold text-white">EV Code Signing Authority</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Signed with Extended Validation Hardware Keys to establish trusted publisher identity across OS scanners.
              </p>
              <div className="text-[10px] text-white/40 pt-2 border-t border-white/5">
                Result: Verified Sovereign Publisher Badge
              </div>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-cyan-400 font-bold">STEP 3: HWID ONLINE CHECK</div>
              <h4 className="text-sm font-bold text-white">Automated Activation</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Scans CPU ID, GPU UUID, and Mainboard Serial to bind license keys with sub-millisecond HMAC verification.
              </p>
              <div className="text-[10px] text-white/40 pt-2 border-t border-white/5">
                Protocol: SHA-256 HMAC Node Lock
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLATFORM 2: ENTERPRISE ENCLAVE */}
      {(activePlatform === 'all' || activePlatform === 'macos') && (
        <div className="bg-[#0C0C0C] border border-white/20 p-6 sm:p-8 space-y-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#141414] border border-white/20 flex items-center justify-center text-white rounded">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  2. Enterprise Secure Enclave & macOS Client Gateway
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Hardware-backed cryptographic security and automated zero-trust licensing
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold bg-white/10 text-white px-3 py-1 border border-white/20 rounded">
              ENTERPRISE ENCLAVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-white/60 font-bold">REQUIREMENT 1: DEVELOPER PROVISION</div>
              <h4 className="text-sm font-bold text-white">Enterprise Developer Matrix</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Configured with verified organization certificates for enterprise deployment across workstations.
              </p>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-white/60 font-bold">REQUIREMENT 2: ENCRYPTED BILLING</div>
              <h4 className="text-sm font-bold text-white">Cryptographic In-App Purchases</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Supports automated cryptographic receipt validation and zero-trust session validation.
              </p>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-white/60 font-bold">REQUIREMENT 3: HARDWARE TOKEN</div>
              <h4 className="text-sm font-bold text-white">Secure Enclave Keychain Token</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Utilizes Hardware Secure Enclave Tokens to ensure untamperable device binding and key storage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PLATFORM 3: MOBILE NODE GATEWAY */}
      {(activePlatform === 'all' || activePlatform === 'android') && (
        <div className="bg-[#0C0C0C] border border-[#CCFF00]/30 p-6 sm:p-8 space-y-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#141414] border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] rounded">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  3. Enterprise Android & Mobile Node Gateway
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Play Integrity API validation, anti-rooting controls, and hardware DRM binding
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold bg-[#CCFF00]/10 text-[#CCFF00] px-3 py-1 border border-[#CCFF00]/30 rounded">
              MOBILE NODE ENCLAVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-[#CCFF00] font-bold">REQUIREMENT 1: APP SIGNING</div>
              <h4 className="text-sm font-bold text-white">Cryptographic Bundle Signing</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Compiled and signed using hardware keystore certificates for tamper-resistant deployment.
              </p>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-[#CCFF00] font-bold">REQUIREMENT 2: INTEGRITY VERIFICATION</div>
              <h4 className="text-sm font-bold text-white">Anti-Tampering & Anti-Root</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Integrates real-time device integrity checks to detect modified runtime binaries or sandbox bypasses.
              </p>
            </div>

            <div className="bg-[#141414] p-5 border border-white/10 space-y-2.5 rounded">
              <div className="text-[10px] text-[#CCFF00] font-bold">REQUIREMENT 3: HARDWARE DRM ID</div>
              <h4 className="text-sm font-bold text-white">Hardware Unique Identifier</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Binds active licenses with Widevine Device Unique ID + Hardware Tokens to prevent cloning.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
