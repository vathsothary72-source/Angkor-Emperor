import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Infinity as InfinityIcon, 
  Crown, 
  Cpu, 
  Key, 
  Flame, 
  Activity, 
  Layers, 
  Lock,
  CreditCard,
  Gamepad2,
  Zap
} from 'lucide-react';

export type MarqueeFont = 'jetbrains' | 'cinzel' | 'kantumruy' | 'bayon' | 'moul' | 'siemreap' | 'battambang' | 'koulen';

interface TopRgbMarqueeHeaderProps {
  currentFont: MarqueeFont;
  onFontChange: (font: MarqueeFont) => void;
  onOpenKhqrModal: () => void;
  onOpenSetupModal: () => void;
}

export const TopRgbMarqueeHeader: React.FC<TopRgbMarqueeHeaderProps> = ({
  currentFont,
  onFontChange,
  onOpenKhqrModal,
  onOpenSetupModal
}) => {
  return (
    <header className="w-full border-b-2 border-black sticky top-0 z-40 bg-[#CCFF00] shadow-[0_4px_25px_rgba(204,255,0,0.35)] select-none">
      <div className="flex items-stretch justify-between h-10 overflow-hidden">
        {/* Left Badge: Super Admin Lifetime Status */}
        <div className="bg-black text-[#CCFF00] px-3.5 flex items-center gap-2 shrink-0 z-10 border-r-2 border-black font-mono text-[11px] font-black tracking-wider uppercase">
          <InfinityIcon className="w-4 h-4 text-[#CCFF00] animate-pulse" />
          <span className="hidden sm:inline">CYBER SECURITY ENTERPRISE</span>
          <span className="sm:hidden">DEFENSE</span>
          <span className="px-1.5 py-0.5 rounded-sm bg-[#CCFF00] text-black text-[9px] font-black tracking-widest">
            ACTIVE
          </span>
        </div>

        {/* Center: Running RGB Multi-Color Crisp Marquee */}
        <div className="flex-1 overflow-hidden relative flex items-center bg-[#CCFF00]">
          <div className="animate-marquee-smooth whitespace-nowrap flex items-center gap-8 font-mono">
            {/* Segment 1 */}
            <div className="flex items-center gap-8 text-xs font-black tracking-wide">
              <span className="text-[#8B0000] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#8B0000]" />
                ANGKOR CYBER DEFENSE SUITE: ZERO-TRUST KERNEL MODE SHIELD & 144+ FPS GAME PROTECTION
              </span>

              <a
                href="https://pay.ababank.com/oRF8/c49y1xuy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003366] hover:underline drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#003366]" />
                OFFICIAL ABA PAY LINK: https://pay.ababank.com/oRF8/c49y1xuy · ACCOUNT: 061444866
              </a>

              <span className="text-[#004D40] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-[#004D40]" />
                MAJOR GAMES SHIELD: VALORANT • PUBG • CS2 • LEAGUE OF LEGENDS • GTA V FIVEM (100% VAC & VANGUARD SAFE)
              </span>

              <span className="text-[#4A0E4E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4A0E4E]" />
                BENEFITS: ZERO LAG (&lt;0.2% CPU) • PERMANENT LIFETIME KEY • AUTOMATED 24/7 ISSUANCE • OFFLINE INSTALLER ZIP
              </span>
            </div>

            {/* Repeated Segment 2 for Seamless Loop */}
            <div className="flex items-center gap-8 text-xs font-black tracking-wide">
              <span className="text-[#8B0000] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#8B0000]" />
                ANGKOR CYBER DEFENSE SUITE: ZERO-TRUST KERNEL MODE SHIELD & 144+ FPS GAME PROTECTION
              </span>

              <a
                href="https://pay.ababank.com/oRF8/c49y1xuy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003366] hover:underline drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#003366]" />
                OFFICIAL ABA PAY LINK: https://pay.ababank.com/oRF8/c49y1xuy · ACCOUNT: 061444866
              </a>

              <span className="text-[#004D40] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-[#004D40]" />
                MAJOR GAMES SHIELD: VALORANT • PUBG • CS2 • LEAGUE OF LEGENDS • GTA V FIVEM (100% VAC & VANGUARD SAFE)
              </span>

              <span className="text-[#4A0E4E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4A0E4E]" />
                BENEFITS: ZERO LAG (&lt;0.2% CPU) • PERMANENT LIFETIME KEY • AUTOMATED 24/7 ISSUANCE • OFFLINE INSTALLER ZIP
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="bg-black flex items-center gap-2 px-3 border-l-2 border-black shrink-0 font-mono text-[11px]">
          <a
            href="https://pay.ababank.com/oRF8/c49y1xuy"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 px-2.5 bg-[#CCFF00] hover:bg-white text-black font-black uppercase rounded-sm flex items-center gap-1 cursor-pointer transition-all shadow-md"
          >
            <CreditCard className="w-3.5 h-3.5 text-black" />
            <span>ABA PAY (061444866)</span>
          </a>

          <button
            onClick={onOpenSetupModal}
            className="hidden sm:flex py-1 px-2.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white/90 border border-white/20 font-bold uppercase rounded-sm items-center gap-1 cursor-pointer transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>DOWNLOAD ZIP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
