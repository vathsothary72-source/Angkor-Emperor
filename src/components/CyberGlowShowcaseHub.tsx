import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Flame, 
  Orbit, 
  Layers, 
  Star, 
  Key, 
  QrCode, 
  Zap, 
  Cpu, 
  Lock, 
  Crosshair, 
  Home, 
  User, 
  Settings, 
  Mail, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  X, 
  ExternalLink,
  Eye
} from 'lucide-react';

interface CyberGlowShowcaseHubProps {
  onOpenGenerateModal: () => void;
  onOpenKhqrModal: () => void;
  onOpenSetupModal: () => void;
  onOpenClientSim: () => void;
  onShowToast: (message: string, type: 'success' | 'danger' | 'info') => void;
}

export const CyberGlowShowcaseHub: React.FC<CyberGlowShowcaseHubProps> = ({
  onOpenGenerateModal,
  onOpenKhqrModal,
  onOpenSetupModal,
  onOpenClientSim,
  onShowToast,
}) => {
  const [activeRadialItem, setActiveRadialItem] = useState<string | null>(null);
  const [starCount, setStarCount] = useState<number>(7);
  const [radialCenterOpen, setRadialCenterOpen] = useState(true);

  // Radial menu items
  const radialItems = [
    { id: 'user', icon: User, label: 'Super Admin', action: () => onShowToast('Super Admin Profile selected', 'info') },
    { id: 'settings', icon: Settings, label: 'Kernel Config', action: () => onShowToast('Kernel Config selected', 'info') },
    { id: 'mail', icon: Mail, label: 'Email Dispatch', action: () => onShowToast('Dispatch Node: v***72@gmail.com', 'info') },
    { id: 'key', icon: Key, label: 'Lifetime License', action: onOpenGenerateModal },
    { id: 'camera', icon: Camera, label: 'Screen Capture', action: () => onShowToast('Captured Alpha8 144FPS State', 'success') },
    { id: 'image', icon: ImageIcon, label: '5D Gallery', action: () => onShowToast('5D Armor Visuals Loaded', 'info') },
    { id: 'trash', icon: Trash2, label: 'Clear Cache', action: () => onShowToast('System Memory Cache cleared', 'success') },
    { id: 'home', icon: Home, label: 'Root Dashboard', action: () => onShowToast('Navigated to Root Terminal', 'info') },
  ];

  return (
    <div className="space-y-8 animate-fadeIn font-mono">
      {/* SECTION BANNER */}
      <div className="bg-gradient-to-r from-[#18140B] via-[#20180B] to-[#120E08] border-2 border-[#D4AF37]/40 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 bg-[#CCFF00] text-black font-mono font-black text-[10px] uppercase tracking-widest rounded-sm">
                CYBERPUNK NEON GLOW ENGINE
              </span>
              <span className="px-3 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D98E] font-mono font-bold text-[10px] tracking-wider">
                6 ULTRA-HIGH TACTILE STYLES
              </span>
            </div>

            <h2 className="text-xl lg:text-2xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#CCFF00]" />
              <span>ADVANCED TACTILE CYBERGLOW MATRIX • ANGKOR 5D</span>
            </h2>

            <p className="text-xs text-[#F5E8C7]/80 max-w-3xl leading-relaxed font-sans">
              Tactile 3D button archetypes, Curved Neon Wave Borders, Cosmic Orbit Ring, Nature-Inspired Velvet, Crimson Laser, and Animated Radial Orb Menu for controlling the 5D Zero-Trust platform.
            </p>
          </div>

          <div className="bg-[#0A0805] border border-[#D4AF37]/40 p-3.5 rounded-xl font-mono text-xs text-right space-y-1">
            <div className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest">
              SYSTEM NODE VERIFIED
            </div>
            <div className="text-white font-bold">Telegram: @PrinceOfSeal</div>
            <div className="text-white/60 text-[11px]">v***72@gmail.com</div>
          </div>
        </div>
      </div>

      {/* 6 ARCHETYPE GLOWING CYBER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* CARD 1: CYBERPUNK GOLD SKULL */}
        <div className="cyber-card-gold p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-gold" />
          <div className="neon-wave-bottom-gold" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="grid grid-cols-3 gap-1 text-[#D4AF37] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            </div>

            <div className="px-3.5 py-1 bg-[#D4AF37] text-black font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]">
              Project
            </div>

            <div className="grid grid-cols-3 gap-1 text-[#D4AF37] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-[#FFD700] uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(255,215,0,0.5)]">
              Cyberpunk Armor Core
            </h3>
            <p className="text-[11px] text-white/50">Root Kernel Defense Engine</p>
          </div>

          {/* Graphic Container with Cyberpunk Neon Box */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
            <div className="relative border border-[#D4AF37]/60 p-4 rounded-lg bg-black/60 shadow-[0_0_15px_rgba(212,175,55,0.2)] w-full max-w-[200px] flex flex-col items-center">
              <div className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-[#D4AF37] text-black font-mono text-[8px] font-black rounded-sm">
                IMMUTABLE
              </div>

              {/* Graphic Graphic */}
              <div className="w-20 h-20 relative flex items-center justify-center my-2">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 via-[#FF5500]/20 to-transparent rounded-full blur-md" />
                <div className="relative w-16 h-16 border-2 border-[#D4AF37] bg-[#1A1408] rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                  <ShieldCheck className="w-8 h-8 text-[#FFD700] drop-shadow-[0_0_6px_#FFD700]" />
                  <div className="text-[8px] font-mono text-[#D4AF37] font-black tracking-widest mt-1">5D CORE</div>
                </div>
              </div>

              <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-[#FF5500] text-black font-mono text-[8px] font-black rounded-sm">
                CYBER PUNK
              </div>
            </div>
          </div>

          {/* Interactive Tactical 3D Button */}
          <div className="relative z-10 space-y-3">
            <button
              onClick={onOpenGenerateModal}
              className="w-full py-3 btn-cyber-tactical rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>GENERATE LIFETIME LICENSE</span>
            </button>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-bold text-white">1.4K</span> Verified
              </span>
              <span className="text-[#D4AF37] font-bold">5D IMMORTAL</span>
            </div>
          </div>
        </div>


        {/* CARD 2: NATURE-INSPIRED LUSH GREEN */}
        <div className="cyber-card-green p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-green" />
          <div className="neon-wave-bottom-green" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="grid grid-cols-3 gap-1 text-[#CCFF00] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
            </div>

            <div className="px-3.5 py-1 bg-[#CCFF00] text-black font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(204,255,0,0.6)]">
              Project
            </div>

            <div className="grid grid-cols-3 gap-1 text-[#CCFF00] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-[#CCFF00] uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(204,255,0,0.5)]">
              Nature Bio-Tactile
            </h3>
            <p className="text-[11px] text-white/50 flex items-center justify-center gap-1">
              <Leaf className="w-3 h-3 text-[#CCFF00]" />
              <span>Bio-Tactile 5D HWID Button</span>
            </p>
          </div>

          {/* Graphic Container */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
            <div className="border border-[#CCFF00]/40 p-4 rounded-xl bg-black/50 w-full max-w-[210px] flex flex-col items-center shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              <div className="w-full py-4 px-6 btn-nature-lush rounded-xl flex items-center justify-between font-mono font-black text-white text-xs cursor-pointer shadow-lg">
                <div className="flex flex-col gap-0.5 opacity-80">
                  <Leaf className="w-3.5 h-3.5 rotate-45" />
                  <Leaf className="w-3.5 h-3.5 -rotate-45" />
                </div>

                <span className="tracking-wider text-sm font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  NODE LOCK
                </span>

                <div className="flex flex-col gap-0.5 opacity-80">
                  <Leaf className="w-3.5 h-3.5 -rotate-45" />
                  <Leaf className="w-3.5 h-3.5 rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Button */}
          <div className="relative z-10 space-y-3">
            <button
              onClick={onOpenClientSim}
              className="w-full py-3 btn-nature-lush rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Cpu className="w-4 h-4" />
              <span>OPEN CLIENT SIMULATOR</span>
            </button>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="font-bold text-white">1.7K</span> Nodes Sync
              </span>
              <span className="text-[#CCFF00] font-bold">100% SECURED</span>
            </div>
          </div>
        </div>


        {/* CARD 3: SATURN CELESTIAL PURPLE ORBIT */}
        <div className="cyber-card-purple p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-purple" />
          <div className="neon-wave-bottom-purple" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="grid grid-cols-3 gap-1 text-[#A855F7] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
            </div>

            <div className="px-3.5 py-1 bg-[#A855F7] text-white font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]">
              Project
            </div>

            <div className="grid grid-cols-3 gap-1 text-[#A855F7] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]">
              Saturn <span className="text-[#C084FC]">Orbital Ring</span>
            </h3>
            <p className="text-[11px] text-white/50">DirectX 12 144 FPS Engine Lock</p>
          </div>

          {/* Graphic Container */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
            <div className="relative w-36 h-28 border border-[#A855F7]/40 rounded-xl bg-black/60 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <div className="absolute w-28 h-10 border-2 border-[#00FFFF] rounded-full animate-saturn-ring shadow-[0_0_12px_#00FFFF]" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9333EA] via-[#E9D5FF] to-white shadow-[0_0_20px_rgba(233,213,255,0.8)] z-10" />
              <div className="absolute -top-1 left-3 w-4 h-4 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
            </div>
          </div>

          {/* Interactive Button */}
          <div className="relative z-10 space-y-3">
            <button
              onClick={onOpenSetupModal}
              className="w-full py-3 btn-cosmic-orbit rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Orbit className="w-4 h-4 text-[#E9D5FF]" />
              <span>DOWNLOAD DESKTOP RUNNER</span>
            </button>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="font-bold text-white">2.6K</span> 144FPS Sync
              </span>
              <span className="text-[#C084FC] font-bold">LATENCY: 0.12MS</span>
            </div>
          </div>
        </div>


        {/* CARD 4: CRIMSON LASER SIMULATOR */}
        <div className="cyber-card-red p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-red" />
          <div className="neon-wave-bottom-red" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="grid grid-cols-3 gap-1 text-[#EF4444] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
            </div>

            <div className="px-3.5 py-1 bg-[#EF4444] text-white font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]">
              Project
            </div>

            <div className="grid grid-cols-3 gap-1 text-[#EF4444] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]">
              Sentinel <span className="text-[#EF4444]">Firewall Matrix</span>
            </h3>
            <p className="text-[11px] text-white/50">Anti-Tamper & Cheat Engine Blocker</p>
          </div>

          {/* Graphic Container */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-[210px] border border-[#EF4444]/40 bg-black/60 rounded-xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#EF4444]/20 border border-[#EF4444] text-[#FCA5A5] text-[9px] font-mono font-bold rounded">
                  RING 0 ACTIVE
                </span>
                <span className="text-[9px] font-mono text-white/40">ANTI-DEBUG</span>
              </div>

              <div className="w-full bg-[#1A0A0A] border border-[#EF4444]/40 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-white">
                  <Flame className="w-4 h-4 text-[#EF4444]" />
                  <span>Threat Intercept</span>
                </div>
                <span className="text-[#EF4444] font-black">AUTO-BAN</span>
              </div>
            </div>
          </div>

          {/* Interactive Button */}
          <div className="relative z-10 space-y-3">
            <button
              onClick={() => onShowToast('5D Threat Firewall Simulator engaged', 'danger')}
              className="w-full py-3 btn-crimson-fire rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Flame className="w-4 h-4 text-[#FCA5A5]" />
              <span>SIMULATE FIREWALL BAN</span>
            </button>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#EF4444]" />
                <span className="font-bold text-white">2.3K</span> Attackers Blocked
              </span>
              <span className="text-[#EF4444] font-bold">100% SECURE</span>
            </div>
          </div>
        </div>


        {/* CARD 5: SUNSET ORANGE INTERACTIVE LIGHT STARS */}
        <div className="cyber-card-orange p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-orange" />
          <div className="neon-wave-bottom-orange" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="grid grid-cols-3 gap-1 text-[#F97316] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
            </div>

            <div className="px-3.5 py-1 bg-[#F97316] text-white font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]">
              Payment
            </div>

            <div className="grid grid-cols-3 gap-1 text-[#F97316] opacity-70">
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(249,115,22,0.5)]">
              <span className="text-[#FB923C]">Encrypted</span> Payment Matrix
            </h3>
            <p className="text-[11px] text-white/50">ISO 20022 Financial Gateway</p>
          </div>

          {/* Graphic Container with Interactive Stars */}
          <div 
            onClick={() => setStarCount((prev) => (prev >= 12 ? 4 : prev + 1))}
            className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative w-full max-w-[210px] h-28 bg-gradient-to-b from-[#1C0D29] via-[#35104A] to-[#12051C] border border-[#F97316]/40 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.2)] p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[8px] font-mono text-[#FDBA74]">
                <span>ENCRYPTED VAULT</span>
                <span>TAP TO STIMULATE ({starCount})</span>
              </div>

              {/* Dynamic Constellation Stars */}
              <div className="flex items-center justify-center gap-2 py-2">
                {Array.from({ length: starCount }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className="w-3 h-3 text-[#FDBA74] fill-[#FDBA74] animate-pulse drop-shadow-[0_0_6px_#FDBA74]" 
                  />
                ))}
              </div>

              <div className="text-[9px] font-mono text-center text-white/60">
                PRIMARY MERCHANT SETTLEMENT NODE
              </div>
            </div>
          </div>

          {/* Interactive Button */}
          <div className="relative z-10 space-y-3">
            <button
              onClick={onOpenKhqrModal}
              className="w-full py-3 btn-sunset-flare rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <QrCode className="w-4 h-4 text-[#FED7AA]" />
              <span>ENCRYPTED PAYMENT GATEWAY</span>
            </button>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#F97316]" />
                <span className="font-bold text-white">4.0K</span> Payments Cleared
              </span>
              <span className="text-[#FDBA74] font-bold">100% VERIFIED</span>
            </div>
          </div>
        </div>


        {/* CARD 6: ANIMATED GLOWING RADIAL MENU */}
        <div className="cyber-card-orange p-6 flex flex-col justify-between h-[490px] group transition-all duration-300 hover:scale-[1.02]">
          <div className="neon-wave-top-orange" />
          <div className="neon-wave-bottom-orange" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between relative z-10 font-mono text-xs">
            <div className="text-[10px] font-mono font-bold text-[#F97316]">
              RADIAL ORBIT
            </div>

            <div className="px-3 py-0.5 bg-[#F97316] text-white font-mono font-black text-[9px] uppercase tracking-widest rounded-full">
              INTERACTIVE
            </div>

            <div className="text-[10px] font-mono font-bold text-[#F97316]">
              8 NODES
            </div>
          </div>

          {/* Title */}
          <div className="text-center relative z-10 my-2 font-mono">
            <h3 className="text-base font-black text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(249,115,22,0.5)]">
              Animated <span className="text-[#FB923C]">Glowing Menu</span>
            </h3>
            <p className="text-[11px] text-white/50">Full 360-Degree Radial Navigation Hub</p>
          </div>

          {/* Interactive Radial Orb Orbit Container */}
          <div className="relative z-10 flex-1 flex items-center justify-center p-2">
            <div className="relative w-44 h-44 rounded-full border border-[#F97316]/30 flex items-center justify-center animate-radial-pulse">
              
              <div className="absolute inset-0 rounded-full border border-dashed border-[#F97316]/50" />

              {radialItems.map((item, idx) => {
                const angle = (idx * 360) / radialItems.length;
                const radian = (angle * Math.PI) / 180;
                const radius = 64;
                const x = Math.round(radius * Math.cos(radian));
                const y = Math.round(radius * Math.sin(radian));
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveRadialItem(item.label);
                      item.action();
                    }}
                    title={item.label}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                      activeRadialItem === item.label
                        ? 'bg-[#F97316] text-black border-white shadow-[0_0_12px_#F97316] scale-110'
                        : 'bg-[#180C05] text-[#FB923C] border-[#F97316]/60 hover:bg-[#F97316]/30 hover:border-white hover:scale-105'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setRadialCenterOpen(!radialCenterOpen);
                  onShowToast('Toggle Radial Orbit Center', 'info');
                }}
                className="relative z-20 w-10 h-10 rounded-full bg-[#2A1408] border-2 border-[#F97316] text-[#FB923C] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:bg-[#F97316] hover:text-black transition-colors cursor-pointer"
              >
                {radialCenterOpen ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Active Item Indicator */}
          <div className="relative z-10 space-y-3 font-mono">
            <div className="text-center text-xs text-white/80 py-1 bg-black/40 border border-[#F97316]/30 rounded-lg">
              Active Action: <strong className="text-[#FDBA74]">{activeRadialItem || 'Select any orbit node'}</strong>
            </div>

            {/* Bottom Metric */}
            <div className="flex items-center justify-between text-[11px] text-white/50 px-1">
              <span className="flex items-center gap-1.5 text-white/70">
                <Eye className="w-3.5 h-3.5 text-[#F97316]" />
                <span className="font-bold text-white">6.4K</span> Orbit Clicks
              </span>
              <a 
                href="https://t.me/PrinceOfSeal" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#54A9EB] hover:underline font-bold flex items-center gap-1"
              >
                <span>@PrinceOfSeal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
