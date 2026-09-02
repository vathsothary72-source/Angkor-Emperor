import React, { useState } from 'react';
import { Key, Sparkles, X, Check, Copy, Shield, Star, Eye, EyeOff } from 'lucide-react';
import { License, LicensePlan } from '../types';
import { generateLicenseKey } from '../data/seedData';

interface GenerateLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (newLicense: License) => void;
}

export const GenerateLicenseModal: React.FC<GenerateLicenseModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [plan, setPlan] = useState<LicensePlan>('lifetime');
  const [maxDevices, setMaxDevices] = useState<number>(3);
  const [userName, setUserName] = useState<string>('');
  const [rating, setRating] = useState<number>(5); // Default 5-Star VIP
  const [durationPreset, setDurationPreset] = useState<'lifetime' | '7d' | '30d' | '90d' | '365d' | 'custom'>('lifetime');
  const [customDate, setCustomDate] = useState<string>('');
  const [metadata, setMetadata] = useState<string>('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isKeyRevealed, setIsKeyRevealed] = useState<boolean>(false); // Masked by default for privacy

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    let expiresAt: string | null = null;
    const now = new Date();

    if (durationPreset === '7d') {
      now.setDate(now.getDate() + 7);
      expiresAt = now.toISOString();
    } else if (durationPreset === '30d') {
      now.setDate(now.getDate() + 30);
      expiresAt = now.toISOString();
    } else if (durationPreset === '90d') {
      now.setDate(now.getDate() + 90);
      expiresAt = now.toISOString();
    } else if (durationPreset === '365d') {
      now.setDate(now.getDate() + 365);
      expiresAt = now.toISOString();
    } else if (durationPreset === 'custom' && customDate) {
      const d = new Date(customDate);
      d.setHours(23, 59, 59, 999);
      expiresAt = d.toISOString();
    } else {
      expiresAt = null; // Lifetime
    }

    const key = generateLicenseKey();
    const newLicense: License = {
      id: Date.now(),
      license_key: key,
      plan,
      max_devices: Number(maxDevices) || 1,
      used_devices: 0,
      user_name: userName.trim() || undefined,
      expires_at: expiresAt,
      is_active: true,
      revoked: false,
      created_at: new Date().toISOString(),
      metadata: metadata.trim() || undefined,
      rating: rating,
    };

    onGenerate(newLicense);
    setGeneratedKey(key);
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setGeneratedKey(null);
    setUserName('');
    setMetadata('');
    setPlan('lifetime');
    setRating(5);
    setDurationPreset('lifetime');
    setMaxDevices(3);
    setIsKeyRevealed(false);
    onClose();
  };

  const getMaskedKey = (key: string) => {
    const parts = key.split('-');
    if (parts.length >= 4) {
      return `${parts[0]}-••••-••••-${parts[3]}`;
    }
    return key.replace(/.(?=.{4})/g, '•');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-[#0C0C0C] border border-white/20 p-6 sm:p-8 max-w-lg w-full shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white p-1.5 bg-white/5 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {generatedKey ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-14 h-14 bg-[#141414] border border-white/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(224,255,0,0.2)]">
              <Sparkles className="w-6 h-6 text-[#E0FF00]" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
                License Key Issued
              </h3>
              <p className="text-xs text-white/60 mt-1 font-sans">
                Cryptographic license token generated with 5D Zero-Trust HWID binding.
              </p>
            </div>

            {/* Masked / Protected Key with Reveal Toggle */}
            <div className="bg-[#141414] border border-white/20 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-black text-[#E0FF00] tracking-wider select-none">
                  {isKeyRevealed ? generatedKey : getMaskedKey(generatedKey)}
                </span>
                <button
                  type="button"
                  onClick={() => setIsKeyRevealed(!isKeyRevealed)}
                  className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
                  title={isKeyRevealed ? "Hide Key" : "Reveal Key"}
                >
                  {isKeyRevealed ? (
                    <EyeOff className="w-4 h-4 text-[#CCFF00]" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/40" />
                  )}
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer border border-white/10 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E0FF00]" />
                    <span className="text-[#E0FF00]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-left text-xs bg-[#141414] p-4 border border-white/10 space-y-2 font-mono text-white/70">
              <div className="flex justify-between">
                <span className="text-white/40">VIP TIER RATING:</span>
                <span className="font-bold text-[#FFD700] flex items-center gap-1">
                  {'★'.repeat(rating)} ({rating}-Stars VIP)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">PLAN TIER:</span>
                <span className="font-bold text-[#E0FF00] uppercase">{plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">HARDWARE LIMIT:</span>
                <span className="font-bold text-white">{maxDevices} SEATS</span>
              </div>
              {userName && (
                <div className="flex justify-between">
                  <span className="text-white/40">ASSIGNEE:</span>
                  <span className="font-bold text-white">{userName}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setGeneratedKey(null)}
                className="flex-1 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] bg-[#141414] hover:bg-[#1C1C1C] text-white border border-white/10 transition-all cursor-pointer"
              >
                + Issue Another
              </button>
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 text-[10px] font-mono font-black uppercase tracking-[0.25em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="flex items-center gap-3.5 pb-3 border-b border-white/10">
              <div className="w-10 h-10 bg-[#141414] border border-white/10 flex items-center justify-center text-white">
                <Key className="w-5 h-5 text-[#E0FF00]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-tight">
                  Generate License Key
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Configure tier, seats, and cryptographic parameters.
                </p>
              </div>
            </div>

            {/* Plan Selector */}
            <div>
              <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1.5">
                SELECT PLAN TIER
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'premium', label: 'PREMIUM' },
                    { id: 'pro', label: 'PRO' },
                    { id: 'enterprise', label: 'ENTERPRISE' },
                    { id: 'lifetime', label: 'LIFETIME' },
                    { id: 'yearly', label: 'YEARLY' },
                    { id: 'trial', label: 'TRIAL' },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPlan(p.id);
                      if (p.id === 'trial') setDurationPreset('7d');
                      if (p.id === 'yearly') setDurationPreset('365d');
                      if (p.id === 'lifetime') setDurationPreset('lifetime');
                    }}
                    className={`py-2 px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                      plan === p.id
                        ? 'bg-white text-black border-white'
                        : 'bg-[#141414] border-white/10 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* VIP 5-Star Rating Selector */}
            <div className="bg-[#141414] p-3 border border-white/10">
              <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1.5">
                CUSTOMER VIP LEVEL
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => setRating(starIndex)}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                    title={`VIP Level ${starIndex} Stars`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starIndex <= rating
                          ? 'text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]'
                          : 'text-white/20 hover:text-[#FFD700]/50'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-[#FFD700] ml-2">
                  {rating} / 5 Stars VIP Tier
                </span>
              </div>
            </div>

            {/* User Name */}
            <div>
              <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                USER / ORGANIZATION
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Enterprise Client / Production Rig"
                className="w-full bg-[#141414] border border-white/10 focus:border-white/40 px-3.5 py-2 text-xs text-white placeholder:text-white/30 outline-none font-mono"
              />
            </div>

            {/* Max Devices & Validity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                  SEAT LIMIT
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={maxDevices}
                  onChange={(e) => setMaxDevices(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-white/40 px-3.5 py-2 text-xs text-white outline-none font-mono"
                />
              </div>

              {/* Expiry Presets */}
              <div>
                <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                  VALIDITY
                </label>
                <select
                  value={durationPreset}
                  onChange={(e) => setDurationPreset(e.target.value as any)}
                  aria-label="Select validity period"
                  className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="lifetime">LIFETIME (NO EXPIRY)</option>
                  <option value="7d">7 DAYS TRIAL</option>
                  <option value="30d">30 DAYS</option>
                  <option value="90d">90 DAYS</option>
                  <option value="365d">1 YEAR (365 DAYS)</option>
                  <option value="custom">CUSTOM DATE</option>
                </select>
              </div>
            </div>

            {/* Custom Expiry Date */}
            {durationPreset === 'custom' && (
              <div>
                <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                  EXACT EXPIRY DATE
                </label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-white/40 text-xs font-mono text-white px-3.5 py-2 outline-none"
                />
              </div>
            )}

            {/* Metadata / Note */}
            <div>
              <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                METADATA & TAGS
              </label>
              <input
                type="text"
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                placeholder="e.g. Production Cluster, Priority Tier..."
                className="w-full bg-[#141414] border border-white/10 focus:border-white/40 px-3.5 py-2 text-xs text-white placeholder:text-white/30 outline-none font-mono"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] bg-[#141414] hover:bg-[#1C1C1C] text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-[10px] font-mono font-black uppercase tracking-[0.25em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-black" />
                <span>Issue Key</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
