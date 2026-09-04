import React, { useState } from 'react';
import { Download, Copy, Check, QrCode, Sparkles, ShieldCheck, Lock, CreditCard, Zap, ExternalLink, Smartphone } from 'lucide-react';

interface AcledaKhqrCardProps {
  amountUsd?: number;
  amountKhr?: string;
  planName?: string;
  onPaymentSuccess?: () => void;
  compact?: boolean;
}

export const AcledaKhqrCard: React.FC<AcledaKhqrCardProps> = ({
  amountUsd = 0,
  amountKhr,
  planName,
  onPaymentSuccess,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Official merchant & account configuration (Anonymous, Enterprise Vault, No Personal Name)
  const merchantName = "ANGKOR CYBER DEFENSE VAULT";
  const accountNumber = "061444866";
  const bankName = "ABA Bank / Bakong KHQR";
  const officialAbaPayLink = "https://pay.ababank.com/oRF8/c49y1xuy";

  // Deep Link URLs for direct banking apps
  const abaDeepLink = `aba://transfer?acc=${accountNumber}&amount=${amountUsd.toFixed(2)}&currency=USD`;
  const bakongDeepLink = `bakong://khqr?account=${accountNumber}&amount=${amountUsd.toFixed(2)}`;
  const universalBankLink = officialAbaPayLink;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPayLink = () => {
    navigator.clipboard.writeText(officialAbaPayLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenBankApp = (bank: 'aba' | 'bakong' | 'universal' | 'abapayway') => {
    if (bank === 'aba' || bank === 'abapayway' || bank === 'universal') {
      window.open(officialAbaPayLink, '_blank');
    } else if (bank === 'bakong') {
      window.location.href = bakongDeepLink;
    }
  };

  const handleDownloadQr = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark Navy Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 900);
      bgGrad.addColorStop(0, '#0C0A06');
      bgGrad.addColorStop(1, '#050402');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 600, 900);

      // Card Background (White)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(50, 100, 500, 710, 24);
      ctx.fill();

      // Top Header
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.roundRect(50, 100, 500, 90, [24, 24, 0, 0]);
      ctx.fill();

      // Header Text
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BAKONG KHQR SECURE PAY', 300, 155);

      // Merchant & Amount
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(merchantName, 300, 235);

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 36px monospace';
      ctx.fillText(amountUsd > 0 ? `$${amountUsd.toFixed(2)} USD` : '$0.00 USD', 300, 285);

      ctx.fillStyle = '#6B7280';
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`Account: ${accountNumber} (${bankName})`, 300, 318);

      // Divider line
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 335);
      ctx.lineTo(520, 335);
      ctx.stroke();

      // QR Placeholder box
      ctx.fillStyle = '#111827';
      ctx.fillRect(160, 360, 280, 280);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('INSTANT VERIFIED CHECKOUT', 300, 505);

      // Footer
      ctx.fillStyle = '#6B7280';
      ctx.font = '14px monospace';
      ctx.fillText('Zero-Trust Automated License Issuance', 300, 845);
    }

    const a = document.createElement('a');
    a.download = `KHQR_PAYMENT_${accountNumber}_$${amountUsd.toFixed(2)}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className={`flex flex-col items-center select-none ${compact ? 'max-w-xs' : 'max-w-md w-full'}`}>
      {/* Outer Luxury Cyber Frame */}
      <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#14100A] via-[#0C0A06] to-[#050402] p-4 sm:p-5 relative group font-mono">
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

        {/* 1. GATEWAY HEADER */}
        <div className="flex items-center justify-between px-2 pt-1 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">
                KHQR PAYMENT GATEWAY
              </div>
              <div className="text-[#D4AF37] text-[10px] tracking-widest font-semibold">
                SECURE INSTANT TRANSFER
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 border border-[#CCFF00]/30 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
              VERIFIED
            </span>
          </div>
        </div>

        {/* 2. DIRECT BANK APP LINK BUTTONS */}
        <div className="mb-3 p-3 bg-[#141414] border border-[#D4AF37]/40 rounded-xl space-y-2.5">
          <div className="text-[10px] font-bold text-white/80 uppercase flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#E0FF00]">
              <Smartphone className="w-3.5 h-3.5" />
              Official ABA PayWay 1-Tap Link:
            </span>
            <span className="text-[#D4AF37] font-mono text-[9px] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
              OFFICIAL LINK
            </span>
          </div>

          {/* Primary ABA Pay Link Direct Button */}
          <a
            href={officialAbaPayLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-gradient-to-r from-[#004B6E] via-[#00608C] to-[#007EA7] hover:brightness-110 text-white font-black text-xs rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,126,167,0.4)] border border-cyan-400/40 group/aba"
          >
            <CreditCard className="w-4 h-4 text-[#CCFF00]" />
            <span>OPEN ABA PAY DIRECT</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover/aba:translate-x-0.5 transition-transform" />
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleOpenBankApp('aba')}
              className="py-2 px-2.5 bg-[#004B6E]/80 hover:bg-[#004B6E] text-white font-bold text-[10px] rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#004B6E]"
            >
              <CreditCard className="w-3 h-3" />
              <span>ABA Mobile App</span>
            </button>

            <button
              onClick={() => handleOpenBankApp('bakong')}
              className="py-2 px-2.5 bg-[#C91A25]/80 hover:bg-[#C91A25] text-white font-bold text-[10px] rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#C91A25]"
            >
              <QrCode className="w-3 h-3" />
              <span>Bakong KHQR</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-between text-[10px] text-white/50 border-t border-white/5">
            <span className="truncate max-w-[200px] text-white/40 font-mono text-[9px]">
              {officialAbaPayLink}
            </span>
            <button
              onClick={handleCopyPayLink}
              className="text-[#D4AF37] hover:text-[#CCFF00] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-[#CCFF00]" />
                  <span className="text-[#CCFF00]">Copied Link</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. MAIN WHITE CARD CONTAINER */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-black transition-transform duration-300">
          {/* CURVED TOP BAR */}
          <div className="bg-[#12100A] text-[#D4AF37] py-2.5 px-4 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="text-xs font-black tracking-widest uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>BAKONG / ABA KHQR</span>
            </div>
            <span className="text-[10px] text-white/70 font-mono font-bold">ACC: {accountNumber}</span>
          </div>

          {/* MERCHANT NAME & AMOUNT (Clean Price Display Only) */}
          <div className="p-4 text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wide text-gray-900">
              {merchantName}
            </div>

            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight pt-1">
              {amountUsd > 0 ? (
                <span>${amountUsd.toFixed(2)} USD</span>
              ) : (
                <span>$0.00 USD</span>
              )}
            </div>

            {planName && (
              <div className="text-[11px] text-gray-600 font-bold pt-0.5 font-sans">
                {planName}
              </div>
            )}
          </div>

          {/* DASHED DIVIDER */}
          <div className="px-4">
            <div className="border-b-2 border-dashed border-gray-300 w-full" />
          </div>

          {/* 4. HIGH FIDELITY ENCRYPTED QR CODE */}
          <div className="p-4 flex flex-col items-center justify-center relative">
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-inner relative flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-52 h-52 sm:w-56 sm:h-56">
                <rect width="200" height="200" fill="#FFFFFF" />

                {/* Corner Position Detection Patterns */}
                <rect x="10" y="10" width="40" height="40" fill="#000000" />
                <rect x="16" y="16" width="28" height="28" fill="#FFFFFF" />
                <rect x="22" y="22" width="16" height="16" fill="#000000" />

                <rect x="150" y="10" width="40" height="40" fill="#000000" />
                <rect x="156" y="16" width="28" height="28" fill="#FFFFFF" />
                <rect x="162" y="22" width="16" height="16" fill="#000000" />

                <rect x="10" y="150" width="40" height="40" fill="#000000" />
                <rect x="16" y="156" width="28" height="28" fill="#FFFFFF" />
                <rect x="22" y="162" width="16" height="16" fill="#000000" />

                {/* Timing patterns */}
                <line x1="55" y1="28" x2="145" y2="28" stroke="#000000" strokeWidth="3" strokeDasharray="4,4" />
                <line x1="28" y1="55" x2="28" y2="145" stroke="#000000" strokeWidth="3" strokeDasharray="4,4" />

                {/* Matrix Elements */}
                <g fill="#000000">
                  <rect x="60" y="12" width="6" height="6" />
                  <rect x="75" y="12" width="12" height="6" />
                  <rect x="100" y="12" width="6" height="12" />
                  <rect x="115" y="12" width="12" height="6" />
                  <rect x="135" y="12" width="6" height="6" />

                  <rect x="60" y="24" width="12" height="6" />
                  <rect x="80" y="24" width="6" height="6" />
                  <rect x="95" y="24" width="18" height="6" />
                  <rect x="120" y="24" width="6" height="12" />

                  <rect x="55" y="38" width="6" height="18" />
                  <rect x="70" y="42" width="18" height="6" />
                  <rect x="105" y="38" width="12" height="6" />
                  <rect x="125" y="42" width="18" height="6" />

                  <rect x="12" y="60" width="6" height="12" />
                  <rect x="24" y="65" width="12" height="6" />
                  <rect x="42" y="60" width="6" height="18" />
                  <rect x="12" y="80" width="18" height="6" />
                  <rect x="36" y="85" width="12" height="6" />
                  <rect x="12" y="100" width="6" height="18" />
                  <rect x="24" y="110" width="18" height="6" />
                  <rect x="12" y="130" width="12" height="6" />
                  <rect x="36" y="125" width="6" height="18" />

                  <rect x="155" y="60" width="12" height="6" />
                  <rect x="175" y="65" width="18" height="6" />
                  <rect x="155" y="80" width="6" height="18" />
                  <rect x="170" y="85" width="12" height="6" />
                  <rect x="155" y="105" width="18" height="6" />
                  <rect x="180" y="110" width="12" height="6" />
                  <rect x="160" y="125" width="6" height="18" />
                  <rect x="175" y="130" width="18" height="6" />

                  <rect x="60" y="155" width="12" height="6" />
                  <rect x="80" y="160" width="18" height="6" />
                  <rect x="110" y="155" width="6" height="18" />
                  <rect x="125" y="160" width="18" height="6" />
                  <rect x="60" y="175" width="18" height="6" />
                  <rect x="85" y="180" width="12" height="6" />
                  <rect x="105" y="175" width="18" height="6" />
                  <rect x="130" y="180" width="12" height="6" />

                  <rect x="58" y="65" width="12" height="12" />
                  <rect x="75" y="70" width="6" height="18" />
                  <rect x="120" y="65" width="18" height="6" />
                  <rect x="130" y="75" width="6" height="12" />

                  <rect x="58" y="120" width="18" height="6" />
                  <rect x="70" y="130" width="6" height="12" />
                  <rect x="125" y="120" width="12" height="12" />
                  <rect x="115" y="135" width="18" height="6" />
                </g>

                {/* Central Shield Core in Center */}
                <rect x="80" y="80" width="40" height="40" rx="8" fill="#FFFFFF" />
                <rect x="82" y="82" width="36" height="36" rx="6" fill="#12100A" stroke="#D4AF37" strokeWidth="2" />
                <path
                  d="M100,88 L112,94 L112,106 L100,112 L88,106 L88,94 Z"
                  fill="#D4AF37"
                />
                <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM ACTIONS: COPY ACCOUNT 061444866 & SAVE CODE */}
        <div className="pt-4 text-center space-y-3">
          <div className="bg-[#141414] p-2.5 border border-white/10 rounded flex items-center justify-between text-xs">
            <span className="text-white/60">Bank Account Number:</span>
            <span className="text-[#E0FF00] font-bold font-mono text-sm">{accountNumber}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            <button
              onClick={handleCopyAccount}
              className="py-2.5 px-3 bg-[#141414] hover:bg-[#1E1E1E] text-white/90 border border-white/10 hover:border-[#D4AF37] flex items-center justify-center gap-1.5 transition-all cursor-pointer rounded"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span className="text-[#CCFF00] font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Copy: {accountNumber}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadQr}
              className="py-2.5 px-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:to-[#CCFF00] text-black font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer rounded shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Save QR Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

