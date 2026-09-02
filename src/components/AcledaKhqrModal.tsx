import React from 'react';
import { X, ShieldCheck, Lock, Sparkles, ExternalLink, CreditCard } from 'lucide-react';
import { AcledaKhqrCard } from './AcledaKhqrCard';

interface AcledaKhqrModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amountUsd?: number;
  amountKhr?: string;
}

export const AcledaKhqrModal: React.FC<AcledaKhqrModalProps> = ({
  isOpen,
  onClose,
  planName = "Angkor Cyber Defense Sovereign Armor",
  amountUsd = 149.00,
  amountKhr = "610,000"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0D0B07] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden font-mono">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14100A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Instant Encrypted Pay Gateway
              </h3>
              <p className="text-[10px] text-white/50">
                Automated Verification & License Node
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center justify-center">
          <AcledaKhqrCard
            amountUsd={amountUsd}
            amountKhr={amountKhr}
            planName={planName}
            compact={false}
          />
        </div>

        {/* Security Footnote */}
        <div className="px-6 py-3.5 bg-[#080705] border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#CCFF00]" />
            <span>Encrypted Quantum Enclave 256-Bit</span>
          </div>
          <span className="text-[#D4AF37] font-bold">24/7 INSTANT DISPATCH</span>
        </div>
      </div>
    </div>
  );
};
