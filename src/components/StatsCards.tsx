import React from 'react';
import { Key, ShieldCheck, Laptop, ShieldAlert, Sparkles, TrendingUp, Zap, Activity } from 'lucide-react';
import { SystemStats } from '../types';

interface StatsCardsProps {
  stats: SystemStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-mono">
      {/* 1. Total Master Licenses (Style 1: Imperial Gold Armor) */}
      <div className="relative group bg-gradient-to-b from-[#221A0D] via-[#140F08] to-[#070503] border-2 border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 overflow-hidden shadow-[0_10px_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:scale-[1.02] cursor-pointer">
        <div className="neon-wave-top-gold opacity-75" />
        <div className="neon-wave-bottom-gold opacity-75" />

        {/* Top Header Dots & Pill */}
        <div className="flex items-center justify-between relative z-10">
          <div className="grid grid-cols-3 gap-1 text-[#D4AF37]">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_6px_#D4AF37]" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black bg-gradient-to-r from-[#FFF4D0] via-[#E5C158] to-[#AA7C11] px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)] border border-[#FFF9E6]">
            TOTAL LIC
          </span>

          <div className="grid grid-cols-3 gap-1 text-[#D4AF37]">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37]" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_6px_#D4AF37]" />
          </div>
        </div>

        <div className="mt-5 relative z-10">
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(212,175,55,0.6)]">
            {stats.totalLicenses.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#D4AF37]/30 font-sans">
            <p className="text-xs text-[#F5D98E] font-medium">Total Master Licenses</p>
            <span className="text-[11px] text-[#CCFF00] font-mono font-black flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              <TrendingUp className="w-3 h-3 text-[#CCFF00]" /> +{stats.activationsToday} Today
            </span>
          </div>
        </div>
      </div>

      {/* 2. Active Licenses (Style 2: Neo Lime Jade Matrix) */}
      <div className="relative group bg-gradient-to-b from-[#14220A] via-[#0B1405] to-[#040802] border-2 border-[#CCFF00] rounded-2xl p-6 transition-all duration-300 overflow-hidden shadow-[0_10px_35px_rgba(204,255,0,0.25)] hover:shadow-[0_0_35px_rgba(204,255,0,0.45)] hover:scale-[1.02] cursor-pointer">
        <div className="neon-wave-top-green opacity-75" />
        <div className="neon-wave-bottom-green opacity-75" />

        <div className="flex items-center justify-between relative z-10">
          <div className="grid grid-cols-3 gap-1 text-[#CCFF00]">
            <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full animate-pulse shadow-[0_0_6px_#CCFF00]" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full shadow-[0_0_6px_#CCFF00]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black bg-gradient-to-r from-[#D8FF1A] via-[#CCFF00] to-[#84CC16] px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.6)] border border-[#F7FEE7]">
            ACTIVE NOW
          </span>

          <div className="grid grid-cols-3 gap-1 text-[#CCFF00]">
            <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full shadow-[0_0_6px_#CCFF00]" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full animate-pulse shadow-[0_0_6px_#CCFF00]" />
          </div>
        </div>

        <div className="mt-5 relative z-10">
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(204,255,0,0.6)]">
            {stats.activeLicenses.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#CCFF00]/30 font-sans">
            <p className="text-xs text-[#E6FF80] font-medium">Active In Production</p>
            <span className="text-[11px] text-[#CCFF00] font-mono font-black bg-black/40 px-2 py-0.5 rounded border border-[#CCFF00]/30">
              {stats.totalLicenses > 0 ? Math.round((stats.activeLicenses / stats.totalLicenses) * 100) : 0}% RATIO
            </span>
          </div>
        </div>
      </div>

      {/* 3. HWID Seats (Style 3: Cosmic Saturn Orbit Violet) */}
      <div className="relative group bg-gradient-to-b from-[#1E0F2E] via-[#10071A] to-[#050208] border-2 border-[#A855F7] rounded-2xl p-6 transition-all duration-300 overflow-hidden shadow-[0_10px_35px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:scale-[1.02] cursor-pointer">
        <div className="neon-wave-top-purple opacity-75" />
        <div className="neon-wave-bottom-purple opacity-75" />

        <div className="flex items-center justify-between relative z-10">
          <div className="grid grid-cols-3 gap-1 text-[#A855F7]">
            <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse shadow-[0_0_6px_#A855F7]" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_6px_#A855F7]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7E22CE] px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)] border border-[#F3E8FF]">
            HWID SEATS
          </span>

          <div className="grid grid-cols-3 gap-1 text-[#A855F7]">
            <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_6px_#A855F7]" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse shadow-[0_0_6px_#A855F7]" />
          </div>
        </div>

        <div className="mt-5 relative z-10">
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(168,85,247,0.6)]">
            {stats.totalDevices.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#A855F7]/30 font-sans">
            <p className="text-xs text-[#E9D5FF] font-medium">Connected HWID Seats</p>
            <span className="text-[11px] text-[#C084FC] font-mono font-black flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-[#A855F7]/30">
              <Sparkles className="w-3 h-3" /> MULTI-SEAT
            </span>
          </div>
        </div>
      </div>

      {/* 4. 5D Firewall Threats Blocked (Style 4: Crimson Laser Fire) */}
      <div className="relative group bg-gradient-to-b from-[#2B0E0E] via-[#170606] to-[#080202] border-2 border-[#EF4444] rounded-2xl p-6 transition-all duration-300 overflow-hidden shadow-[0_10px_35px_rgba(239,68,68,0.25)] hover:shadow-[0_0_35px_rgba(239,68,68,0.45)] hover:scale-[1.02] cursor-pointer">
        <div className="neon-wave-top-red opacity-75" />
        <div className="neon-wave-bottom-red opacity-75" />

        <div className="flex items-center justify-between relative z-10">
          <div className="grid grid-cols-3 gap-1 text-[#EF4444]">
            <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse shadow-[0_0_6px_#EF4444]" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shadow-[0_0_6px_#EF4444]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#F87171] via-[#EF4444] to-[#B91C1C] px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] border border-[#FEE2E2]">
            5D FIREWALL
          </span>

          <div className="grid grid-cols-3 gap-1 text-[#EF4444]">
            <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shadow-[0_0_6px_#EF4444]" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444]/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse shadow-[0_0_6px_#EF4444]" />
          </div>
        </div>

        <div className="mt-5 relative z-10">
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(239,68,68,0.6)]">
            {stats.threatsBlocked.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#EF4444]/30 font-sans">
            <p className="text-xs text-[#FECACA] font-medium">Attacks Intercepted</p>
            <span className="text-[11px] text-[#FCA5A5] font-mono font-black bg-black/40 px-2 py-0.5 rounded border border-[#EF4444]/30">
              100% BLOCKED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

