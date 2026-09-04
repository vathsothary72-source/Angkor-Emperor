import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Save, 
  Settings, 
  Sliders, 
  Terminal, 
  Cpu, 
  Key, 
  Eye, 
  EyeOff, 
  Lock, 
  Check, 
  Sparkles, 
  UserCheck, 
  Smartphone, 
  Laptop, 
  Globe, 
  Building2, 
  RefreshCw 
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';
import { GoogleUser } from '../types';

interface ProgramProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: GoogleUser | null;
  onUpdateUser: (updatedUser: GoogleUser) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const ProgramProfileModal: React.FC<ProgramProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onShowToast
}) => {
  const [name, setName] = useState(currentUser?.name || 'Super Admin Operator');
  const [email, setEmail] = useState(currentUser?.email || 'admin@angkorcyberdefense.sec');
  const [role, setRole] = useState(currentUser?.role || 'Super Admin');
  const [themeMode, setThemeMode] = useState<'neon_lime' | 'gold_cyber' | 'stealth_dark'>('neon_lime');
  const [fontChoice, setFontChoice] = useState<'kantumruy' | 'moul' | 'bayon' | 'battambang'>('kantumruy');
  const [autoArmKernel, setAutoArmKernel] = useState(true);
  const [hideLicenseKeysDefault, setHideLicenseKeysDefault] = useState(true);
  const [hardwareNodeName, setHardwareNodeName] = useState('MASTER-RIG-ANGKOR-01');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GoogleUser = {
      name,
      email,
      role,
      avatarUrl: currentUser?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=angkor_super_admin&backgroundColor=0c0a06',
      idToken: currentUser?.idToken || 'g-profile_token_verified',
      signedInAt: new Date().toLocaleString()
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    onShowToast('success', 'Profile and system configuration saved successfully!');
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-2xl bg-[#0B0F05] border-2 border-[#CCFF00] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#CCFF00]/40 bg-[#121A0A]">
          <div className="flex items-center gap-3">
            <AngkorLogo size={36} />
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>Program Profile & System Config</span>
                <span className="text-[10px] bg-[#CCFF00] text-black px-2 py-0.5 rounded font-black">
                  ACTIVE
                </span>
              </h3>
              <p className="text-[11px] text-[#CCFF00]/80">
                Modify account parameters and global suite configuration
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

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* User Information */}
          <div className="bg-black/60 border border-[#CCFF00]/30 p-4 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold text-xs uppercase border-b border-white/10 pb-2">
              <User className="w-4 h-4" />
              <span>Operator Profile Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">Display Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">Email Address:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">User Role / Authority Level:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none cursor-pointer"
                >
                  <option value="Owner">Owner (Root Authority)</option>
                  <option value="Super Admin">Super Admin (Enterprise Controller)</option>
                  <option value="Security Operator">Security Operator</option>
                  <option value="Standard Client">Standard Client</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">Hardware Node Identifier:</label>
                <input
                  type="text"
                  value={hardwareNodeName}
                  onChange={(e) => setHardwareNodeName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* System & Visual Preferences */}
          <div className="bg-black/60 border border-[#CCFF00]/30 p-4 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold text-xs uppercase border-b border-white/10 pb-2">
              <Settings className="w-4 h-4" />
              <span>UI & Security Preferences</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">Theme Style:</label>
                <select
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value as any)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none cursor-pointer"
                >
                  <option value="neon_lime">Neon Lime Cyber (#CCFF00)</option>
                  <option value="gold_cyber">Gold Cyber Sovereign</option>
                  <option value="stealth_dark">Stealth Dark Ring 0</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] font-bold">Display Typography:</label>
                <select
                  value={fontChoice}
                  onChange={(e) => setFontChoice(e.target.value as any)}
                  className="w-full bg-[#141414] border border-white/20 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none cursor-pointer"
                >
                  <option value="kantumruy">Modern Sans Bold</option>
                  <option value="moul">Display Formal</option>
                  <option value="bayon">Cyber Display</option>
                  <option value="battambang">Classic Tech</option>
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hideLicenseKeysDefault}
                  onChange={(e) => setHideLicenseKeysDefault(e.target.checked)}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
                <span className="text-xs text-white/90">
                  <strong>Mask License Keys by default:</strong> Keep license credentials masked until purchase verification
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={autoArmKernel}
                  onChange={(e) => setAutoArmKernel(e.target.checked)}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
                <span className="text-xs text-white/90">
                  <strong>Automatic Kernel Mode Ring 0:</strong> Enable zero-lag 144+ FPS protection and auto-block memory injection
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#CCFF00] hover:bg-[#B8E600] text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
