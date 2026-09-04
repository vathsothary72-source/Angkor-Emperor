import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Ban, 
  RotateCcw, 
  Laptop, 
  Sparkles, 
  KeyRound, 
  Trash2,
  Eye,
  EyeOff,
  Star,
  Shield,
  QrCode,
  AlertTriangle
} from 'lucide-react';
import { License, LicensePlan } from '../types';

interface LicenseTableProps {
  licenses: License[];
  onOpenGenerateModal: () => void;
  onExtendLicense: (license: License) => void;
  onToggleRevoke: (licenseKey: string) => void;
  onUpdateRating?: (licenseKey: string, rating: number) => void;
  onViewDevices: (license: License) => void;
  onDeleteLicense: (licenseKey: string) => void;
  onExportCSV: () => void;
  onOpenKhqrModal?: () => void;
  onCheckExpiryReminder?: () => void;
}

export const LicenseTable: React.FC<LicenseTableProps> = ({
  licenses,
  onOpenGenerateModal,
  onExtendLicense,
  onToggleRevoke,
  onUpdateRating,
  onViewDevices,
  onDeleteLicense,
  onExportCSV,
  onOpenKhqrModal,
  onCheckExpiryReminder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expiring' | 'expired' | 'revoked' | 'trial'>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [hideAllKeys, setHideAllKeys] = useState<boolean>(true); // Default to protected hidden mode

  const now = Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

  // Find licenses expiring within 7 days
  const expiringLicenses = licenses.filter((lic) => {
    if (!lic.expires_at || lic.revoked) return false;
    const expiryTime = new Date(lic.expires_at).getTime();
    const diff = expiryTime - now;
    return diff > 0 && diff <= SEVEN_DAYS_MS;
  });

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleRevealKey = (key: string) => {
    setRevealedKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const maskLicenseKey = (key: string, isRevealed: boolean) => {
    if (isRevealed && !hideAllKeys) return key;
    if (isRevealed && hideAllKeys) return key;
    
    // Mask format: AE-***-****-9D2L
    const parts = key.split('-');
    if (parts.length >= 4) {
      return `${parts[0]}-••••-••••-${parts[3]}`;
    }
    return key.replace(/.(?=.{4})/g, '•');
  };

  const filteredLicenses = licenses.filter((lic) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      lic.license_key.toLowerCase().includes(term) ||
      (lic.user_name && lic.user_name.toLowerCase().includes(term)) ||
      (lic.metadata && lic.metadata.toLowerCase().includes(term));

    let matchesStatus = true;
    const isExpired = lic.expires_at && new Date(lic.expires_at) < new Date();
    
    if (statusFilter === 'active') {
      matchesStatus = lic.is_active && !lic.revoked && !isExpired;
    } else if (statusFilter === 'expiring') {
      const diff = lic.expires_at ? new Date(lic.expires_at).getTime() - now : -1;
      matchesStatus = !!lic.expires_at && !lic.revoked && diff > 0 && diff <= SEVEN_DAYS_MS;
    } else if (statusFilter === 'expired') {
      matchesStatus = !!isExpired && !lic.revoked;
    } else if (statusFilter === 'revoked') {
      matchesStatus = lic.revoked;
    } else if (statusFilter === 'trial') {
      matchesStatus = lic.plan === 'trial';
    }

    let matchesPlan = true;
    if (planFilter !== 'all') {
      matchesPlan = lic.plan === planFilter;
    }

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getPlanBadge = (plan: LicensePlan) => {
    switch (plan) {
      case 'premium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E0FF00]/10 text-[#E0FF00] border border-[#E0FF00]/30">
            <Sparkles className="w-2.5 h-2.5" /> Premium
          </span>
        );
      case 'pro':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/25">
            Pro
          </span>
        );
      case 'enterprise':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF3B30]/10 text-[#FF8A80] border border-[#FF3B30]/25">
            Enterprise
          </span>
        );
      case 'lifetime':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/25">
            Lifetime
          </span>
        );
      case 'yearly':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#40C4FF]/10 text-[#40C4FF] border border-[#40C4FF]/25">
            Yearly
          </span>
        );
      case 'monthly':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/25">
            Monthly
          </span>
        );
      case 'trial':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-500/15 text-slate-300 border border-slate-500/25">
            Trial
          </span>
        );
    }
  };

  const getStatusBadge = (lic: License) => {
    const isExpired = lic.expires_at && new Date(lic.expires_at) < new Date();

    if (lic.revoked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />
          Revoked
        </span>
      );
    }

    if (isExpired) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E0FF00]/10 text-[#E0FF00] border border-[#E0FF00]/20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E0FF00] shadow-[0_0_6px_#E0FF00]" />
        Active
      </span>
    );
  };

  // Render 5-Star VIP Rating widget
  const renderStarRating = (lic: License) => {
    const currentRating = lic.rating ?? 5;
    return (
      <div className="flex items-center gap-0.5" title={`Client Tier: ${currentRating} VIP Stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= currentRating;
          return (
            <button
              key={starIndex}
              type="button"
              onClick={() => onUpdateRating && onUpdateRating(lic.license_key, starIndex)}
              className="p-0.5 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
              title={`Rate ${starIndex} Stars`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isFilled
                    ? 'text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]'
                    : 'text-white/20 hover:text-[#FFD700]/50'
                }`}
              />
            </button>
          );
        })}
        <span className="text-[10px] font-mono font-bold text-[#FFD700] ml-1">
          {currentRating}★
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-5 mb-8">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between pb-4 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-80 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              id="license-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Key, User, Metadata..."
              className="w-full bg-[#0C0C0C] border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/30 outline-none transition-all font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            id="license-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            aria-label="Filter by license status"
            className="bg-[#0C0C0C] border border-white/10 focus:border-white/40 text-xs font-mono font-semibold text-white/80 px-3.5 py-2 outline-none cursor-pointer hover:border-white/30 transition-all"
          >
            <option value="all" className="bg-[#141414]">STATUS: ALL</option>
            <option value="active" className="bg-[#141414]">🟢 ACTIVE</option>
            <option value="expiring" className="bg-[#141414]">⚠️ EXPIRING SOON (&le; 7 DAYS) {expiringLicenses.length > 0 ? `(${expiringLicenses.length})` : ''}</option>
            <option value="expired" className="bg-[#141414]">🟡 EXPIRED</option>
            <option value="revoked" className="bg-[#141414]">🔴 REVOKED</option>
            <option value="trial" className="bg-[#141414]">🔵 TRIAL</option>
          </select>

          {/* Plan Filter */}
          <select
            id="license-plan-filter"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            aria-label="Filter by license plan tier"
            className="bg-[#0C0C0C] border border-white/10 focus:border-white/40 text-xs font-mono font-semibold text-white/80 px-3.5 py-2 outline-none cursor-pointer hover:border-white/30 transition-all"
          >
            <option value="all" className="bg-[#141414]">TIER: ALL</option>
            <option value="premium" className="bg-[#141414]">✨ PREMIUM</option>
            <option value="pro" className="bg-[#141414]">⚡ PRO</option>
            <option value="enterprise" className="bg-[#141414]">🏢 ENTERPRISE</option>
            <option value="lifetime" className="bg-[#141414]">♾️ LIFETIME</option>
            <option value="yearly" className="bg-[#141414]">📅 YEARLY</option>
            <option value="monthly" className="bg-[#141414]">🗓️ MONTHLY</option>
            <option value="trial" className="bg-[#141414]">⏳ TRIAL</option>
          </select>

          {/* Master Key Privacy Toggle (Hide/Show All Keys) */}
          <button
            type="button"
            onClick={() => setHideAllKeys(!hideAllKeys)}
            className={`flex items-center gap-1.5 px-3 py-2 border text-xs font-mono font-bold transition-all cursor-pointer ${
              hideAllKeys 
                ? 'bg-[#141414] text-[#CCFF00] border-[#CCFF00]/40 hover:bg-[#1E1E1E]' 
                : 'bg-[#FF3B30]/15 text-[#FF8A80] border-[#FF3B30]/40 hover:bg-[#FF3B30]/25'
            }`}
            title={hideAllKeys ? "License Keys are HIDDEN (Protected Mode)" : "License Keys are REVEALED"}
          >
            {hideAllKeys ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="hidden sm:inline">KEYS PROTECTED (HIDDEN)</span>
                <span className="sm:hidden">HIDE</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#FF8A80]" />
                <span className="hidden sm:inline">KEYS REVEALED</span>
                <span className="sm:hidden">SHOW</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] text-white/70 hover:text-white border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#E0FF00]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenGenerateModal}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[10px] uppercase tracking-[0.25em] font-black hover:bg-[#E0FF00] hover:text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Generate License</span>
          </button>
        </div>
      </div>

      {/* License Expiry Reminder Banner (Within 7 Days) */}
      {expiringLicenses.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-xs font-mono">
          <div className="flex items-center gap-3 text-[#F59E0B]">
            <div className="w-8 h-8 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-[#F59E0B]">
                  License Expiry Reminder
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-black bg-[#F59E0B] text-black rounded-none">
                  {expiringLicenses.length} {expiringLicenses.length === 1 ? 'LICENSE' : 'LICENSES'}
                </span>
              </div>
              <p className="text-white/80 font-sans text-xs mt-0.5">
                {expiringLicenses.length === 1 ? (
                  <>
                    License <span className="font-mono text-[#F59E0B] font-bold">{expiringLicenses[0].license_key}</span> ({expiringLicenses[0].user_name || expiringLicenses[0].plan}) expires within 7 days.
                  </>
                ) : (
                  <>
                    There are <span className="font-bold text-[#F59E0B]">{expiringLicenses.length}</span> licenses expiring within 7 days.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => setStatusFilter(statusFilter === 'expiring' ? 'all' : 'expiring')}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                statusFilter === 'expiring'
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border-[#F59E0B]/40'
              }`}
            >
              {statusFilter === 'expiring' ? 'Show All Licenses' : `Filter Expiring (${expiringLicenses.length})`}
            </button>
            {onCheckExpiryReminder && (
              <button
                onClick={onCheckExpiryReminder}
                className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                title="Trigger Expiry Reminder Toast"
              >
                Trigger Reminder
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-[#0C0C0C] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#141414]/50">
                <th className="py-4 px-5 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  LICENSE KEY (SECURED)
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  USER / VIP 5-STARS
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  TIER
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  HARDWARE SEATS
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  STATUS
                </th>
                <th className="py-4 px-4 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40">
                  VALIDITY
                </th>
                <th className="py-4 px-5 text-[9px] font-bold font-mono tracking-[0.3em] uppercase text-white/40 text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLicenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-white/40 text-xs font-mono">
                    <KeyRound className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    NO MATCHING LICENSES LOCATED IN 5D REGISTRY
                  </td>
                </tr>
              ) : (
                filteredLicenses.map((lic) => {
                  const isCopied = copiedKey === lic.license_key;
                  const isRevealed = Boolean(revealedKeys[lic.license_key]);
                  const displayKey = maskLicenseKey(lic.license_key, isRevealed);

                  return (
                    <tr
                      key={lic.id}
                      className="group hover:bg-[#141414] transition-colors"
                    >
                      {/* Key with Protected Hide/Show and Copy */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span 
                            className={`font-mono text-xs font-bold tracking-wider px-2.5 py-1 border transition-colors select-none ${
                              isRevealed 
                                ? 'text-[#CCFF00] bg-[#1A1A10] border-[#CCFF00]/40' 
                                : 'text-white/80 bg-[#141414] border-white/10 group-hover:border-white/30'
                            }`}
                          >
                            {displayKey}
                          </span>

                          {/* Reveal/Hide Eye Button */}
                          <button
                            type="button"
                            onClick={() => toggleRevealKey(lic.license_key)}
                            className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
                            title={isRevealed ? "Hide License Key" : "Reveal License Key"}
                          >
                            {isRevealed ? (
                              <EyeOff className="w-3.5 h-3.5 text-[#CCFF00]" />
                            ) : (
                              <Eye className="w-3.5 h-3.5 text-white/40" />
                            )}
                          </button>

                          {/* Copy Key Button */}
                          <button
                            type="button"
                            onClick={() => handleCopy(lic.license_key)}
                            className="p-1 text-white/40 hover:text-[#E0FF00] transition-colors cursor-pointer"
                            title="Copy Key to Clipboard"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-[#E0FF00]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* User / Org with 5-Star VIP Rating */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-semibold text-white/90">
                          {lic.user_name || 'Anonymous (Default)'}
                        </div>
                        
                        {/* Interactive 5-Star VIP Rating */}
                        <div className="mt-1">
                          {renderStarRating(lic)}
                        </div>

                        {lic.metadata && (
                          <div className="text-[10px] text-white/40 truncate max-w-[180px] font-mono mt-0.5">
                            {lic.metadata}
                          </div>
                        )}
                      </td>

                      {/* Plan */}
                      <td className="py-4 px-4">
                        {getPlanBadge(lic.plan)}
                      </td>

                      {/* Devices */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => onViewDevices(lic)}
                          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white/80 hover:text-[#40C4FF] bg-[#141414] hover:bg-[#1C1C1C] px-2.5 py-1 border border-white/10 hover:border-[#40C4FF]/30 transition-colors cursor-pointer"
                        >
                          <Laptop className="w-3 h-3 text-[#40C4FF]" />
                          <span>{lic.used_devices} / {lic.max_devices}</span>
                        </button>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {getStatusBadge(lic)}
                      </td>

                      {/* Expiry */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-mono">
                          {lic.expires_at ? (
                            (() => {
                              const expiryTime = new Date(lic.expires_at).getTime();
                              const diffMs = expiryTime - now;
                              const isExpiringSoon = !lic.revoked && diffMs > 0 && diffMs <= SEVEN_DAYS_MS;
                              const isExpired = diffMs <= 0;
                              const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

                              if (isExpiringSoon) {
                                return (
                                  <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                                      <AlertTriangle className="w-3 h-3 text-[#F59E0B] animate-pulse" />
                                      <span>{daysLeft}d left</span>
                                    </div>
                                    <div className="text-[11px] text-white/60">
                                      {new Date(lic.expires_at).toLocaleDateString('km-KH', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                      })}
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div className={isExpired ? 'text-white/40 line-through' : 'text-white/70'}>
                                  {new Date(lic.expires_at).toLocaleDateString('km-KH', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                              );
                            })()
                          ) : (
                            <span className="text-[#E0FF00] font-bold">LIFETIME</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Extend */}
                          <button
                            onClick={() => onExtendLicense(lic)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all cursor-pointer hover:border-white/30"
                            title="Extend Duration"
                          >
                            <Clock className="w-3 h-3 text-[#E0FF00]" />
                            <span>Extend</span>
                          </button>

                          {/* Revoke / Reactivate */}
                          <button
                            onClick={() => onToggleRevoke(lic.license_key)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              lic.revoked
                                ? 'bg-[#E0FF00]/10 hover:bg-[#E0FF00]/20 text-[#E0FF00] border-[#E0FF00]/30'
                                : 'bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] border-[#FF3B30]/30'
                            }`}
                            title={lic.revoked ? 'Re-enable License' : 'Revoke License'}
                          >
                            {lic.revoked ? (
                              <>
                                <RotateCcw className="w-3 h-3" />
                                <span>Enable</span>
                              </>
                            ) : (
                              <>
                                <Ban className="w-3 h-3" />
                                <span>Revoke</span>
                              </>
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteLicense(lic.license_key)}
                            className="p-1 text-white/30 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors cursor-pointer"
                            title="Delete License"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
