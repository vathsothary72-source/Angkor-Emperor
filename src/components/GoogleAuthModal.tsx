import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  AlertCircle,
  Key,
  ShieldAlert,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';

export interface GoogleAuthUser {
  email: string;
  maskedEmail: string;
  name: string;
  role: 'Super Admin' | 'Operator' | 'Client';
  avatarUrl?: string;
  idToken?: string;
  signedInAt?: string;
}

export type GoogleUser = GoogleAuthUser;

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: GoogleAuthUser | null;
  onSignInSuccess?: (user: GoogleAuthUser) => void;
  onSignIn?: (user: GoogleAuthUser) => void;
  onSignOut: () => void;
  activeTheme?: any;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSignInSuccess,
  onSignIn,
  onSignOut
}) => {
  const [selectedEmail, setSelectedEmail] = useState('v***@***.com');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const dispatchSignIn = (user: GoogleAuthUser) => {
    if (typeof onSignIn === 'function') {
      onSignIn(user);
    }
    if (typeof onSignInSuccess === 'function') {
      onSignInSuccess(user);
    }
  };

  const handleQuickGoogleSignIn = (maskedEmail: string, fullEmail: string, name: string, role: 'Super Admin' | 'Operator' | 'Client') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatchSignIn({
        email: fullEmail,
        maskedEmail: maskedEmail,
        name: name,
        role: role,
        signedInAt: new Date().toLocaleTimeString('en-US')
      });
      onClose();
    }, 900);
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsLoading(true);

    const masked = customEmail.replace(/^(.{2})(.*)(@.*)$/, (_match, p1, p2, p3) => `${p1}${'*'.repeat(Math.min(5, p2.length))}${p3}`);

    setTimeout(() => {
      setIsLoading(false);
      dispatchSignIn({
        email: customEmail,
        maskedEmail: masked,
        name: customName.trim() || 'Enterprise Operator',
        role: 'Operator',
        signedInAt: new Date().toLocaleTimeString('en-US')
      });
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-md bg-[#0C0B08] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden font-mono">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#120F09]">
          <div className="flex items-center gap-3">
            <AngkorLogo size={34} showStyleSelector={false} />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Google Identity Enclave
              </h3>
              <p className="text-[10px] text-white/50">
                OAuth 2.0 Super Admin Security Shield
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
        <div className="p-6 space-y-5">
          {currentUser ? (
            /* Current Signed In State */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#14120C] border border-[#CCFF00]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#CCFF00] font-bold flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                    ACTIVE SESSION AUTHENTICATED
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-[#CCFF00] text-black font-black uppercase">
                    {currentUser.role}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00] flex items-center justify-center font-bold text-[#CCFF00] text-base">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-white truncate">{currentUser.name}</div>
                    <div className="text-xs text-white/60 truncate">{currentUser.maskedEmail}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">
                      Session Started: {currentUser.signedInAt}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSignOut();
                  }}
                  className="w-full py-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Console</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In Choices */
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Select Verified Operator Account
                </h4>
                <p className="text-xs text-white/50 font-sans">
                  Sign in with encrypted Google Identity to manage master licenses and access kernel control nodes.
                </p>
              </div>

              {!isCustomMode ? (
                <div className="space-y-2.5">
                  {/* Account 1: Master Admin (Masked) */}
                  <button
                    onClick={() => handleQuickGoogleSignIn('v***@***.com', 'admin.vault.01@sec-armor.internal', 'Master Super Admin', 'Super Admin')}
                    disabled={isLoading}
                    className="w-full p-3.5 rounded-xl bg-[#14120C] hover:bg-[#1C1810] border border-[#D4AF37]/50 hover:border-[#CCFF00] transition-all cursor-pointer flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center font-bold text-[#D4AF37]">
                        A
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                          Master Super Admin (Sovereign)
                        </div>
                        <div className="text-[11px] text-white/50 font-mono">
                          v***@***.com
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-black">
                      OWNER
                    </span>
                  </button>

                  {/* Account 2: Security Lead (Masked) */}
                  <button
                    onClick={() => handleQuickGoogleSignIn('k***@***.com', 'security.lead@sec-armor.internal', 'Lead Security Architect', 'Super Admin')}
                    disabled={isLoading}
                    className="w-full p-3.5 rounded-xl bg-[#14120C] hover:bg-[#1C1810] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
                        S
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Lead Security Architect
                        </div>
                        <div className="text-[11px] text-white/50 font-mono">
                          k***@***.com
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-white/10 border border-white/20 text-white/70 font-black">
                      ADMIN
                    </span>
                  </button>

                  {/* Custom Account Option */}
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className="w-full py-2.5 text-center text-xs text-white/60 hover:text-white transition-colors cursor-pointer border border-dashed border-white/10 hover:border-white/30 rounded-xl mt-2"
                  >
                    + Enter Enterprise Account
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomSignIn} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/60 uppercase">Operator Name:</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full p-2.5 bg-[#14120C] border border-white/15 rounded-lg text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-white/60 uppercase">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="operator@enterprise-domain.com"
                      className="w-full p-2.5 bg-[#14120C] border border-white/15 rounded-lg text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCustomMode(false)}
                      className="w-1/3 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-2/3 py-2 bg-gradient-to-r from-[#D4AF37] to-[#CCFF00] text-black font-bold rounded-lg text-xs uppercase tracking-wider hover:opacity-90"
                    >
                      {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#080705] border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#CCFF00]" />
            <span>Zero-Trust Ring 0 Token Handshake</span>
          </div>
          <span className="text-[#CCFF00]">256-BIT SHA-256</span>
        </div>
      </div>
    </div>
  );
};
