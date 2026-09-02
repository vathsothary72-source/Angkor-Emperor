import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  Users, 
  Key, 
  Lock, 
  Unlock, 
  Sliders, 
  Eye, 
  EyeOff, 
  Laptop, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Terminal, 
  Cpu, 
  Flame, 
  Search,
  Filter,
  Layers,
  Save,
  Zap,
  HardDrive,
  Star
} from 'lucide-react';
import { AngkorLogo } from './AngkorLogo';
import { ClientUser, ClientPermission } from '../types';

interface SuperAdminPermissionHubProps {
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => void;
}

export const SuperAdminPermissionHub: React.FC<SuperAdminPermissionHubProps> = ({ onShowToast }) => {
  // Sample initial client users database
  const [clients, setClients] = useState<ClientUser[]>([
    {
      id: 'usr-001',
      name: 'Alpha Pro Esports Node',
      email: 'alpha.node@enterprise.net',
      phone: '+855 •• ••• 001',
      role: 'vip_gamer',
      status: 'active',
      rating: 5,
      assignedLicenseKey: 'AE-PRO-8921-NODE1',
      hwidBound: 'HWID-BFEBFBFF00090672-NVIDIA-RTX4090',
      createdAt: '2026-08-15',
      lastLogin: '2 mins ago',
      permissions: {
        canViewTelemetry: true,
        canViewThreatLogs: true,
        canDownloadInstaller: true,
        canUseOfflineMode: true,
        canSwitchHardware: false,
        canAccessKernelDriver: true,
        canViewSecurityAudit: true,
        canGenerateSubKeys: false
      }
    },
    {
      id: 'usr-002',
      name: 'Cyber Gaming Cluster (20 Nodes)',
      email: 'cluster.ops@enterprise.net',
      phone: '+855 •• ••• 556',
      role: 'enterprise_client',
      status: 'active',
      rating: 5,
      assignedLicenseKey: 'AE-CYBER-9912-NODE2',
      hwidBound: 'HWID-MULTI-SEAT-20-NODES',
      createdAt: '2026-07-20',
      lastLogin: '10 mins ago',
      permissions: {
        canViewTelemetry: true,
        canViewThreatLogs: true,
        canDownloadInstaller: true,
        canUseOfflineMode: true,
        canSwitchHardware: true,
        canAccessKernelDriver: true,
        canViewSecurityAudit: true,
        canGenerateSubKeys: true
      }
    },
    {
      id: 'usr-003',
      name: 'Standard Workstation Node',
      email: 'standard.ops@enterprise.net',
      phone: '+855 •• ••• 223',
      role: 'standard_client',
      status: 'active',
      rating: 4,
      assignedLicenseKey: 'AE-STD-4412-NODE3',
      hwidBound: 'HWID-AMD5600X-RTX3060TI',
      createdAt: '2026-08-28',
      lastLogin: '1 hour ago',
      permissions: {
        canViewTelemetry: true,
        canViewThreatLogs: false,
        canDownloadInstaller: true,
        canUseOfflineMode: true,
        canSwitchHardware: false,
        canAccessKernelDriver: false,
        canViewSecurityAudit: false,
        canGenerateSubKeys: false
      }
    },
    {
      id: 'usr-004',
      name: 'Arena Tournament Server',
      email: 'tournament@arena-grid.net',
      phone: '+855 •• ••• 882',
      role: 'enterprise_client',
      status: 'read_only',
      rating: 5,
      assignedLicenseKey: 'AE-ENT-1102-NODE4',
      hwidBound: 'HWID-TOURNAMENT-SERVER-01',
      createdAt: '2026-06-10',
      lastLogin: '3 days ago',
      permissions: {
        canViewTelemetry: true,
        canViewThreatLogs: false,
        canDownloadInstaller: false,
        canUseOfflineMode: false,
        canSwitchHardware: false,
        canAccessKernelDriver: false,
        canViewSecurityAudit: false,
        canGenerateSubKeys: false
      }
    }
  ]);

  const [selectedClientId, setSelectedClientId] = useState<string>('usr-001');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'read_only'>('all');

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  // Toggle single permission for selected client
  const handleTogglePermission = (permKey: keyof ClientPermission) => {
    setClients(prev => prev.map(client => {
      if (client.id === selectedClient.id) {
        const updated = {
          ...client,
          permissions: {
            ...client.permissions,
            [permKey]: !client.permissions[permKey]
          }
        };
        return updated;
      }
      return client;
    }));

    const currentVal = selectedClient.permissions[permKey];
    onShowToast(
      'info',
      'Permission Matrix Updated',
      `${selectedClient.name}: ${permKey} -> ${!currentVal ? 'ENABLED' : 'DISABLED'}`
    );
  };

  // Toggle client general status (Active / Suspended / Read Only)
  const handleSetClientStatus = (newStatus: 'active' | 'suspended' | 'read_only') => {
    setClients(prev => prev.map(client => {
      if (client.id === selectedClient.id) {
        return { ...client, status: newStatus };
      }
      return client;
    }));

    onShowToast(
      newStatus === 'active' ? 'success' : newStatus === 'suspended' ? 'error' : 'warning',
      'Client Status Updated',
      `${selectedClient.name} is now: ${newStatus.toUpperCase()}`
    );
  };

  // Apply batch presets
  const handleApplyPreset = (presetType: 'full' | 'standard' | 'minimal' | 'freeze') => {
    let newPerms: ClientPermission;
    if (presetType === 'full') {
      newPerms = {
        canViewTelemetry: true,
        canViewThreatLogs: true,
        canDownloadInstaller: true,
        canUseOfflineMode: true,
        canSwitchHardware: true,
        canAccessKernelDriver: true,
        canViewSecurityAudit: true,
        canGenerateSubKeys: true
      };
    } else if (presetType === 'standard') {
      newPerms = {
        canViewTelemetry: true,
        canViewThreatLogs: false,
        canDownloadInstaller: true,
        canUseOfflineMode: true,
        canSwitchHardware: false,
        canAccessKernelDriver: true,
        canViewSecurityAudit: false,
        canGenerateSubKeys: false
      };
    } else if (presetType === 'minimal') {
      newPerms = {
        canViewTelemetry: true,
        canViewThreatLogs: false,
        canDownloadInstaller: false,
        canUseOfflineMode: false,
        canSwitchHardware: false,
        canAccessKernelDriver: false,
        canViewSecurityAudit: false,
        canGenerateSubKeys: false
      };
    } else {
      newPerms = {
        canViewTelemetry: false,
        canViewThreatLogs: false,
        canDownloadInstaller: false,
        canUseOfflineMode: false,
        canSwitchHardware: false,
        canAccessKernelDriver: false,
        canViewSecurityAudit: false,
        canGenerateSubKeys: false
      };
    }

    setClients(prev => prev.map(client => {
      if (client.id === selectedClient.id) {
        return { ...client, permissions: newPerms };
      }
      return client;
    }));

    onShowToast('success', 'Preset Applied', `${presetType.toUpperCase()} preset applied to ${selectedClient.name}`);
  };

  // Remote HWID Reset
  const handleResetClientHwid = () => {
    setClients(prev => prev.map(client => {
      if (client.id === selectedClient.id) {
        return { ...client, hwidBound: 'UNBOUND (Pending Re-activation)' };
      }
      return client;
    }));

    onShowToast('warning', 'HWID Unbound', `Hardware ID unbound from ${selectedClient.name}. Node must re-activate.`);
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.assignedLicenseKey.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fadeIn font-mono">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#17130D] via-[#0E0C09] to-[#120F0A] border border-[#D4AF37]/50 p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/15 via-[#E0FF00]/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#221C14] border-2 border-[#D4AF37] flex items-center justify-center text-[#F5D98E] shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#F5D98E]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                  CLIENT ACCESS CONTROL (SUPER ADMIN RBAC)
                </h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-[#D4AF37] to-[#E0FF00] px-2.5 py-0.5 shadow-md">
                  SUPER ADMIN ROOT
                </span>
              </div>
              <p className="text-xs text-[#E6C875]/80 mt-1.5 max-w-3xl leading-relaxed font-sans">
                Master console for managing granular feature permissions, seat quotas, remote HWID de-authorization, and security isolation across all client nodes.
              </p>
              
              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#D4AF37]/20 font-mono text-[10px]">
                <span className="text-[#CCFF00] font-bold">SECURITY DISPATCH:</span>
                <a href="https://t.me/PrinceOfSeal" target="_blank" rel="noreferrer" className="text-[#54A9EB] hover:underline">
                  Telegram: @PrinceOfSeal
                </a>
                <span className="text-white/30">•</span>
                <span className="text-[#F5A623]">
                  v***72@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1A1610] border border-[#D4AF37]/30 p-3 shrink-0 font-mono text-center">
            <div className="px-3 border-r border-[#D4AF37]/20">
              <div className="text-[9px] uppercase tracking-widest text-white/40">Total Clients</div>
              <div className="text-sm font-bold text-white">{clients.length} NODES</div>
            </div>
            <div className="px-3 border-r border-[#D4AF37]/20">
              <div className="text-[9px] uppercase tracking-widest text-white/40">Active Nodes</div>
              <div className="text-sm font-bold text-[#E0FF00]">{clients.filter(c => c.status === 'active').length} ONLINE</div>
            </div>
            <div className="px-3">
              <div className="text-[9px] uppercase tracking-widest text-white/40">Security Level</div>
              <div className="text-sm font-bold text-[#F5D98E]">ROOT 5D</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#120F0A] border border-[#D4AF37]/30 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F5D98E]" />
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Client Node Directory
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37]">
                {filteredClients.length} Accounts
              </span>
            </div>

            {/* Search and Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or Key..."
                  className="w-full bg-[#1A1610] border border-white/10 pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-1 transition-all cursor-pointer ${
                    statusFilter === 'all' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 text-white/60'
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-2 py-1 transition-all cursor-pointer ${
                    statusFilter === 'active' ? 'bg-[#E0FF00] text-black font-bold' : 'bg-white/5 text-white/60'
                  }`}
                >
                  ACTIVE
                </button>
                <button
                  onClick={() => setStatusFilter('read_only')}
                  className={`px-2 py-1 transition-all cursor-pointer ${
                    statusFilter === 'read_only' ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-white/60'
                  }`}
                >
                  READ ONLY
                </button>
                <button
                  onClick={() => setStatusFilter('suspended')}
                  className={`px-2 py-1 transition-all cursor-pointer ${
                    statusFilter === 'suspended' ? 'bg-red-500 text-white font-bold' : 'bg-white/5 text-white/60'
                  }`}
                >
                  SUSPENDED
                </button>
              </div>
            </div>

            {/* Scrollable Client List Cards */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredClients.map((client) => {
                const isSelected = client.id === selectedClient.id;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className={`p-3.5 border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#1F1912] border-[#F5D98E] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#14110C] border-white/10 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white truncate max-w-[170px]">
                          {client.name}
                        </span>
                        <span className="text-[10px] text-[#FFD700] font-mono flex items-center">
                          {'★'.repeat(client.rating || 5)}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 uppercase ${
                        client.status === 'active' ? 'bg-[#E0FF00]/10 text-[#E0FF00] border border-[#E0FF00]/30' :
                        client.status === 'suspended' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                      }`}>
                        {client.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-white/60 font-mono">
                      {client.email}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-white/5 text-white/40">
                      <span className="text-[#D4AF37]">
                        {client.assignedLicenseKey.replace(/(AE-[A-Z0-9]+)-[A-Z0-9]+-([A-Z0-9]+)/, '$1-••••-$2')}
                      </span>
                      <span>{client.lastLogin}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Permission Control Console for Selected Client */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#120F0A] border border-[#D4AF37]/40 p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    {selectedClient.name}
                  </h3>
                  <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#F5D98E] px-2 py-0.5 border border-[#D4AF37]/40 uppercase">
                    {selectedClient.role.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-[#E6C875]/80 font-mono mt-0.5">
                  Key: <strong className="text-white">{selectedClient.assignedLicenseKey}</strong> | HWID: <span className="text-white/60">{selectedClient.hwidBound}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => handleSetClientStatus('active')}
                  className={`px-3 py-1.5 border transition-all cursor-pointer ${
                    selectedClient.status === 'active'
                      ? 'bg-[#E0FF00] text-black font-bold border-[#E0FF00]'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  ACTIVE
                </button>
                <button
                  onClick={() => handleSetClientStatus('read_only')}
                  className={`px-3 py-1.5 border transition-all cursor-pointer ${
                    selectedClient.status === 'read_only'
                      ? 'bg-amber-400 text-black font-bold border-amber-400'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  READ ONLY
                </button>
                <button
                  onClick={() => handleSetClientStatus('suspended')}
                  className={`px-3 py-1.5 border transition-all cursor-pointer ${
                    selectedClient.status === 'suspended'
                      ? 'bg-red-600 text-white font-bold border-red-600'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  SUSPEND
                </button>
              </div>
            </div>

            {/* Permission Presets Bar */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider flex items-center justify-between">
                <span>Quick Permission Presets:</span>
                <span className="text-[#D4AF37]">1-CLICK SYNC</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                <button
                  onClick={() => handleApplyPreset('full')}
                  className="p-2 bg-[#1A1610] hover:bg-[#251E14] text-[#E0FF00] border border-[#E0FF00]/30 hover:border-[#E0FF00] text-center transition-all cursor-pointer font-bold"
                >
                  ★ FULL ENTERPRISE
                </button>
                <button
                  onClick={() => handleApplyPreset('standard')}
                  className="p-2 bg-[#1A1610] hover:bg-[#251E14] text-[#F5D98E] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-center transition-all cursor-pointer font-bold"
                >
                  STANDARD NODE
                </button>
                <button
                  onClick={() => handleApplyPreset('minimal')}
                  className="p-2 bg-[#1A1610] hover:bg-[#251E14] text-amber-300 border border-amber-400/30 hover:border-amber-400 text-center transition-all cursor-pointer"
                >
                  MINIMAL / VIEW
                </button>
                <button
                  onClick={() => handleApplyPreset('freeze')}
                  className="p-2 bg-[#1A1610] hover:bg-[#251E14] text-red-400 border border-red-500/30 hover:border-red-500 text-center transition-all cursor-pointer"
                >
                  FREEZE ALL
                </button>
              </div>
            </div>

            {/* Individual Feature Granular Permission Toggles */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#F5D98E]" />
                <span>Granular Feature Access Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Telemetry Access */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canViewTelemetry
                    ? 'bg-[#1A1610] border-[#E0FF00]/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#E0FF00]" />
                      <span>Alpha8 Telemetry Stream</span>
                    </div>
                    <p className="text-[10px] text-white/50">View FPS, CPU Overhead & Process Hooks</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canViewTelemetry')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canViewTelemetry
                        ? 'bg-[#E0FF00] text-black'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canViewTelemetry ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* 2. Threat Logs */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canViewThreatLogs
                    ? 'bg-[#1A1610] border-red-500/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                      <span>Threat Intelligence</span>
                    </div>
                    <p className="text-[10px] text-white/50">View real-time attacks & IP block logs</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canViewThreatLogs')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canViewThreatLogs
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canViewThreatLogs ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* 3. Download Desktop Installer */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canDownloadInstaller
                    ? 'bg-[#1A1610] border-cyan-400/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Desktop Deployment Setup</span>
                    </div>
                    <p className="text-[10px] text-white/50">Permission to download setup runner & scripts</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canDownloadInstaller')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canDownloadInstaller
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canDownloadInstaller ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>

                {/* 4. Offline Mode */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canUseOfflineMode
                    ? 'bg-[#1A1610] border-[#F5D98E]/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-[#F5D98E]" />
                      <span>Offline 24h Token</span>
                    </div>
                    <p className="text-[10px] text-white/50">Allow execution during network isolation</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canUseOfflineMode')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canUseOfflineMode
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canUseOfflineMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>

                {/* 5. Kernel Driver Guard */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canAccessKernelDriver
                    ? 'bg-[#1A1610] border-purple-500/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Ring-0 Kernel Driver</span>
                    </div>
                    <p className="text-[10px] text-white/50">Deep kernel protection filter</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canAccessKernelDriver')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canAccessKernelDriver
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canAccessKernelDriver ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>

                {/* 6. Self Hardware Switch */}
                <div className={`p-3.5 border transition-all flex items-center justify-between ${
                  selectedClient.permissions.canSwitchHardware
                    ? 'bg-[#1A1610] border-emerald-400/40'
                    : 'bg-[#0E0C09] border-white/10 opacity-60'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Self HWID Migration</span>
                    </div>
                    <p className="text-[10px] text-white/50">Allows self-service endpoint re-assignment</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission('canSwitchHardware')}
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      selectedClient.permissions.canSwitchHardware
                        ? 'bg-emerald-400 text-black'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {selectedClient.permissions.canSwitchHardware ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remote Administration & HWID Unbind Box */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#17130D] p-4">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                  <HardDrive className="w-4 h-4 text-[#D4AF37]" />
                  <span>Remote HWID Node De-auth</span>
                </div>
                <p className="text-[11px] text-[#E6C875]/70 mt-0.5">
                  Currently bound to: <span className="font-mono text-white">{selectedClient.hwidBound}</span>
                </p>
              </div>

              <button
                onClick={handleResetClientHwid}
                className="py-2 px-3 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset / Unbind HWID</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
