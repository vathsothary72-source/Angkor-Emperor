import React, { useState } from 'react';
import { Clock, X, Calendar, Check, Sparkles } from 'lucide-react';
import { License } from '../types';

interface ExtendLicenseModalProps {
  license: License | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmExtend: (licenseKey: string, addedDays: number | 'lifetime') => void;
}

export const ExtendLicenseModal: React.FC<ExtendLicenseModalProps> = ({
  license,
  isOpen,
  onClose,
  onConfirmExtend,
}) => {
  const [selectedDays, setSelectedDays] = useState<number | 'lifetime'>(30);

  if (!isOpen || !license) return null;

  const currentExpiry = license.expires_at
    ? new Date(license.expires_at)
    : null;

  const calculateNewExpiry = () => {
    if (selectedDays === 'lifetime') return 'Lifetime (Permanent Access)';
    
    // If expired or null, start from now; otherwise add to current expiry
    const baseDate = currentExpiry && currentExpiry > new Date() ? new Date(currentExpiry) : new Date();
    baseDate.setDate(baseDate.getDate() + selectedDays);
    return baseDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExtend = () => {
    onConfirmExtend(license.license_key, selectedDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0C0C0C] border border-white/20 p-6 sm:p-8 max-w-md w-full shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white p-1.5 bg-white/5 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
          <div className="w-10 h-10 bg-[#141414] border border-white/10 flex items-center justify-center text-white">
            <Clock className="w-5 h-5 text-[#E0FF00]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-tight">
              Extend License Term
            </h3>
            <p className="text-xs text-white/50 font-mono">
              Key: {license.license_key}
            </p>
          </div>
        </div>

        {/* Current Expiry info */}
        <div className="bg-[#141414] p-4 border border-white/10 text-xs space-y-2 font-mono text-white/70">
          <div className="flex justify-between">
            <span className="text-white/40">ASSIGNEE:</span>
            <span className="font-semibold text-white">{license.user_name || 'UNASSIGNED'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">CURRENT EXPIRY:</span>
            <span className="font-semibold text-[#E0FF00]">
              {license.expires_at ? new Date(license.expires_at).toLocaleDateString('en-US') : 'LIFETIME'}
            </span>
          </div>
        </div>

        {/* Extension Presets */}
        <div>
          <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] mb-2">
            SELECT EXTENSION DURATION
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { days: 7, label: '+7 DAYS' },
              { days: 30, label: '+30 DAYS' },
              { days: 90, label: '+90 DAYS' },
              { days: 180, label: '+180 DAYS' },
              { days: 365, label: '+1 YEAR' },
              { days: 'lifetime', label: 'LIFETIME' },
            ].map((preset) => (
              <button
                key={preset.days}
                type="button"
                onClick={() => setSelectedDays(preset.days as any)}
                className={`py-2.5 px-2 text-[10px] font-mono font-bold text-center border transition-all cursor-pointer ${
                  selectedDays === preset.days
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141414] border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview New Date */}
        <div className="bg-[#141414] border border-white/10 p-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-white/50">
            <Calendar className="w-4 h-4 text-[#E0FF00]" />
            <span>NEW EXPIRATION:</span>
          </div>
          <span className="font-bold text-white">
            {calculateNewExpiry()}
          </span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] bg-[#141414] hover:bg-[#1C1C1C] text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExtend}
            className="px-6 py-2 text-[10px] font-mono font-black uppercase tracking-[0.25em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-black" />
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
