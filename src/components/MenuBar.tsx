import React, { useState } from 'react';
import { 
  Building2, 
  Key, 
  QrCode, 
  Download, 
  Terminal, 
  FileSpreadsheet, 
  ShoppingBag, 
  Users, 
  Bot, 
  Gamepad2, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  ChevronDown, 
  Search, 
  X, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Sparkles,
  UserCog,
  Check
} from 'lucide-react';
import { ToolVisibilitySettings } from '../types';

export type ActiveRole = 'owner' | 'super_admin' | 'client';

export interface MenuBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  // Trigger actions that open dedicated modals
  onOpenGenerateModal: () => void;
  onOpenKhqrModal: () => void;
  onOpenSetupModal: () => void;
  onOpenClientSim: () => void;
  onOpenProgramProfile: () => void;
  onExportCSV: () => void;
  // Role & Permissions
  currentRole: ActiveRole;
  onChangeRole: (role: ActiveRole) => void;
  toolVisibility: ToolVisibilitySettings;
  onToggleToolVisibility: (toolKey: keyof ToolVisibilitySettings) => void;
  // Search query pass-through
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenGenerateModal,
  onOpenKhqrModal,
  onOpenSetupModal,
  onOpenClientSim,
  onOpenProgramProfile,
  onExportCSV,
  currentRole,
  onChangeRole,
  toolVisibility,
  onToggleToolVisibility,
  searchQuery,
  onSearchChange
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCustomizeMenuOpen, setIsCustomizeMenuOpen] = useState(false);

  const isOwnerOrAdmin = currentRole === 'owner' || currentRole === 'super_admin';

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleActionClick = (action: () => void) => {
    action();
    closeDropdowns();
  };

  return (
    <nav 
      id="main-app-menu-bar" 
      className="w-full bg-[#0A0D05]/95 border-y-2 border-[#CCFF00]/50 backdrop-blur-md shadow-[0_4px_25px_rgba(204,255,0,0.15)] sticky top-0 z-40 transition-all font-kantumruy"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Brand Indicator & Role Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#CCFF00] text-black rounded font-black text-xs uppercase tracking-wider font-mono shadow-[0_0_12px_rgba(204,255,0,0.4)]">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>MENU BAR</span>
          </div>

          {/* Role Switcher Pill (Owner / Super Admin / Client) */}
          <div className="flex items-center bg-black/70 border border-[#CCFF00]/40 rounded-lg p-0.5 text-[11px] font-mono">
            <button
              onClick={() => onChangeRole('owner')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer font-bold ${
                currentRole === 'owner'
                  ? 'bg-[#CCFF00] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Full Owner Privilege - Access all controls & visibility toggles"
            >
              Owner 👑
            </button>
            <button
              onClick={() => onChangeRole('super_admin')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer font-bold ${
                currentRole === 'super_admin'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Admin Level"
            >
              Admin
            </button>
            <button
              onClick={() => onChangeRole('client')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer font-bold ${
                currentRole === 'client'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Customer View"
            >
              Client / User
            </button>
          </div>
        </div>

        {/* Center: Main Navigation Menu Items */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs font-bold">
          {/* Menu 1: Store & Pricing */}
          {toolVisibility.showStore && (
            <button
              onClick={() => {
                onSelectTab('sales');
                closeDropdowns();
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider ${
                activeTab === 'sales'
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'text-white/80 hover:text-[#CCFF00] hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Store & Pricing</span>
            </button>
          )}

          {/* Menu 2: Licenses (Key Manager) */}
          {toolVisibility.showLicenses && (
            <button
              onClick={() => {
                onSelectTab('licenses');
                closeDropdowns();
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider ${
                activeTab === 'licenses'
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'text-white/80 hover:text-[#CCFF00] hover:bg-white/5'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Licenses Registry</span>
            </button>
          )}

          {/* Menu 3: Financial & Banking Suite */}
          {toolVisibility.showBanking && (
            <button
              onClick={() => {
                onSelectTab('banking');
                closeDropdowns();
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider ${
                activeTab === 'banking'
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'text-white/80 hover:text-[#CCFF00] hover:bg-white/5'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Banking Defense</span>
            </button>
          )}

          {/* Menu 4: Quick Action Launchers (Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider ${
                openDropdown === 'tools'
                  ? 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40'
                  : 'text-white/80 hover:text-[#CCFF00] hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Quick Tools</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'tools' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'tools' && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-[#0D1207] border-2 border-[#CCFF00]/50 rounded-xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.9)] z-50 animate-fadeIn font-mono"
              >
                <div className="px-2 py-1.5 text-[10px] text-[#CCFF00] font-black uppercase border-b border-white/10 flex items-center justify-between">
                  <span>MODAL LAUNCHERS</span>
                  <span className="text-[9px] text-white/40">ESC to close</span>
                </div>

                <div className="py-1 space-y-1 text-xs">
                  {toolVisibility.showGenerateKey && isOwnerOrAdmin && (
                    <button
                      onClick={() => handleActionClick(onOpenGenerateModal)}
                      className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#CCFF00] hover:text-black text-white/90 font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <Key className="w-4 h-4 text-[#CCFF00] shrink-0" />
                      <div>
                        <div className="text-[11px]">Generate Master Key</div>
                        <div className="text-[9px] text-white/50 group-hover:text-black">Issue new cryptographic license (Modal)</div>
                      </div>
                    </button>
                  )}

                  {toolVisibility.showKhqrModal && (
                    <button
                      onClick={() => handleActionClick(onOpenKhqrModal)}
                      className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#CCFF00] hover:text-black text-white/90 font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <div>
                        <div className="text-[11px]">Encrypted KHQR Gateway</div>
                        <div className="text-[9px] text-white/50">ABA / Bakong 061444866 (Modal)</div>
                      </div>
                    </button>
                  )}

                  {toolVisibility.showDownloadZip && (
                    <button
                      onClick={() => handleActionClick(onOpenSetupModal)}
                      className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#CCFF00] hover:text-black text-white/90 font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[11px]">Download Setup & ZIP</div>
                        <div className="text-[9px] text-white/50">Full installer archive with scripts (Modal)</div>
                      </div>
                    </button>
                  )}

                  {toolVisibility.showClientTester && (
                    <button
                      onClick={() => handleActionClick(onOpenClientSim)}
                      className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#CCFF00] hover:text-black text-white/90 font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-[11px]">Client Simulator & Handshake</div>
                        <div className="text-[9px] text-white/50">HWID & license handshake tester (Modal)</div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => handleActionClick(onExportCSV)}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#CCFF00] hover:text-black text-white/90 font-bold flex items-center gap-2.5 transition-all cursor-pointer border-t border-white/5"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-[11px]">Export Full CSV Audit</div>
                      <div className="text-[9px] text-white/50">Download license registry data as CSV</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu 5: Advanced Modules (Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'modules' ? null : 'modules')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider ${
                ['superadmin', 'gemini', 'alpha8', 'security', 'threats', 'devices', 'cyberglow'].includes(activeTab)
                  ? 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40'
                  : 'text-white/80 hover:text-[#CCFF00] hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Modules</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'modules' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'modules' && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-[#0D1207] border-2 border-[#CCFF00]/50 rounded-xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.9)] z-50 animate-fadeIn font-mono"
              >
                <div className="px-2 py-1.5 text-[10px] text-[#CCFF00] font-black uppercase border-b border-white/10">
                  PROGRAM MODULES
                </div>

                <div className="py-1 space-y-1 text-xs">
                  {toolVisibility.showGeminiAi && (
                    <button
                      onClick={() => {
                        onSelectTab('gemini');
                        closeDropdowns();
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                        activeTab === 'gemini' ? 'bg-[#CCFF00] text-black font-black' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Bot className="w-4 h-4 text-[#CCFF00]" />
                      <span>Ai Menimi (Gemini 2.5)</span>
                    </button>
                  )}

                  {toolVisibility.showAlpha8 && (
                    <button
                      onClick={() => {
                        onSelectTab('alpha8');
                        closeDropdowns();
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                        activeTab === 'alpha8' ? 'bg-[#CCFF00] text-black font-black' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Gamepad2 className="w-4 h-4 text-amber-400" />
                      <span>Game Alpha8 & 144 FPS</span>
                    </button>
                  )}

                  {toolVisibility.showSecurityAudit && (
                    <button
                      onClick={() => {
                        onSelectTab('security');
                        closeDropdowns();
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                        activeTab === 'security' ? 'bg-[#CCFF00] text-black font-black' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Security Audit & Vulnerabilities</span>
                    </button>
                  )}

                  {isOwnerOrAdmin && toolVisibility.showSuperAdmin && (
                    <button
                      onClick={() => {
                        onSelectTab('superadmin');
                        closeDropdowns();
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center gap-2.5 cursor-pointer border-t border-white/5 ${
                        activeTab === 'superadmin' ? 'bg-[#CCFF00] text-black font-black' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>Super Admin RBAC Hub</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onSelectTab('cyberglow');
                      closeDropdowns();
                    }}
                    className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                      activeTab === 'cyberglow' ? 'bg-[#CCFF00] text-black font-black' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Cyber Glow 5D Showcase</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu 6: Program Profile (User & System Settings Modal) */}
          <button
            onClick={onOpenProgramProfile}
            className="px-3 py-1.5 rounded-md text-white/90 hover:text-[#CCFF00] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider border border-[#CCFF00]/30"
            title="Open Program Profile & System Preferences"
          >
            <UserCog className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>Program Profile</span>
          </button>
        </div>

        {/* Right Side: Global Search & Owner Customizer Toggle */}
        <div className="flex items-center gap-2.5 flex-1 max-w-xs justify-end">
          {/* Universal Real-Time Search Box */}
          <div className="relative w-full max-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search all data..."
              className="w-full bg-black/80 border border-[#CCFF00]/40 focus:border-[#CCFF00] rounded-lg pl-8 pr-7 py-1 text-xs text-white placeholder:text-white/30 font-mono outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Owner/Admin Customize Tool Menu Visibility Button */}
          {isOwnerOrAdmin && (
            <div className="relative">
              <button
                onClick={() => setIsCustomizeMenuOpen(!isCustomizeMenuOpen)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isCustomizeMenuOpen
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                    : 'bg-black/60 text-[#CCFF00] border-[#CCFF00]/30 hover:border-[#CCFF00]'
                }`}
                title="Owner Tool: Configure tool menu bar visibility dynamically"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {isCustomizeMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0C1006] border-2 border-[#CCFF00] rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-fadeIn font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#CCFF00]" />
                      <span className="font-bold text-white uppercase text-[11px]">
                        Configure Menu Bar Tools
                      </span>
                    </div>
                    <button
                      onClick={() => setIsCustomizeMenuOpen(false)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[10px] text-white/60 mb-3 font-sans leading-relaxed">
                    Owner & Admin privileges: Toggle any navigation menu button or dashboard tool visibility dynamically:
                  </p>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {[
                      { key: 'showStore', label: 'Commercial Storefront' },
                      { key: 'showLicenses', label: 'Licenses Registry' },
                      { key: 'showBanking', label: 'Banking Defense Suite' },
                      { key: 'showGenerateKey', label: 'Generate Key Tool' },
                      { key: 'showKhqrModal', label: 'KHQR Payment Gateway' },
                      { key: 'showDownloadZip', label: 'Download Setup / ZIP' },
                      { key: 'showClientTester', label: 'Desktop Client Simulator' },
                      { key: 'showGeminiAi', label: 'Ai Menimi Assistant' },
                      { key: 'showAlpha8', label: 'Game Alpha8 & 144 FPS' },
                      { key: 'showSecurityAudit', label: 'Security Vulnerability Audit' },
                      { key: 'showSuperAdmin', label: 'Super Admin RBAC Hub' }
                    ].map(({ key, label }) => {
                      const isVisible = toolVisibility[key as keyof ToolVisibilitySettings];
                      return (
                        <div 
                          key={key}
                          onClick={() => onToggleToolVisibility(key as keyof ToolVisibilitySettings)}
                          className="flex items-center justify-between p-2 rounded bg-black/40 hover:bg-white/5 border border-white/5 cursor-pointer"
                        >
                          <span className="text-[11px] text-white/80">{label}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                            isVisible 
                              ? 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}>
                            {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            {isVisible ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 text-center">
                    <button
                      onClick={() => setIsCustomizeMenuOpen(false)}
                      className="w-full py-1.5 bg-[#CCFF00] text-black font-black uppercase text-[10px] rounded hover:brightness-110"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
