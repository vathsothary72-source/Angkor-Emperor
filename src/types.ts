export type LicensePlan = 'trial' | 'monthly' | 'yearly' | 'lifetime' | 'pro' | 'enterprise' | 'premium';

export interface License {
  id: number;
  license_key: string;
  plan: LicensePlan;
  max_devices: number;
  used_devices: number;
  user_name?: string;
  expires_at: string | null;
  is_active: boolean;
  revoked: boolean;
  created_at: string;
  metadata?: string;
  rating?: number; // 1-5 Stars VIP Rating
}

export interface Device {
  id: number;
  license_id: number;
  license_key: string;
  device_id: string;
  device_name: string;
  hardware_fingerprint: string;
  ip_address: string;
  user_agent: string;
  first_activated: string;
  last_seen: string;
  is_active: boolean;
}

export type ThreatAction =
  | 'HONEYPOT_TRIGGERED'
  | 'DEBUGGER_DETECTED'
  | 'VM_DETECTED'
  | 'ZOMBIE_ACTIVATED'
  | 'COUNTER_ATTACK'
  | 'INTEGRITY_FAIL'
  | 'UNAUTHORIZED_INJECTION'
  | 'PORT_SCAN_BLOCKED';

export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface ThreatLog {
  id: number;
  timestamp: string;
  action: ThreatAction;
  severity: ThreatSeverity;
  ip: string;
  mac: string;
  location: string;
  status: 'blocked' | 'isolated' | 'mitigated';
  details: string;
  target_key?: string;
}

export interface ActivationLog {
  id: number;
  license_key: string;
  action: string;
  ip: string;
  user_agent: string;
  timestamp: string;
  details?: string;
}

export interface SystemStats {
  totalLicenses: number;
  activeLicenses: number;
  totalDevices: number;
  threatsBlocked: number;
  activationsToday: number;
}

export interface ClientPermission {
  canViewTelemetry: boolean;       // Enable Game Alpha8 Live Telemetry & 144 FPS
  canViewThreatLogs: boolean;      // Enable Threat Intelligence & Blocked IPs
  canDownloadInstaller: boolean;   // Enable Desktop Setup .exe / Portable Runner download
  canUseOfflineMode: boolean;      // Enable Offline Mode (24h Hardware Token)
  canSwitchHardware: boolean;      // Enable Reset / Switch HWID self-service
  canAccessKernelDriver: boolean;  // Enable Ring 0 Kernel Anti-Cheat Shield
  canViewSecurityAudit: boolean;   // Enable Security Audit strengths & weaknesses report
  canGenerateSubKeys: boolean;     // Enable Sub-License Keys generation
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'enterprise_client' | 'vip_gamer' | 'standard_client' | 'owner';
  status: 'active' | 'suspended' | 'pending_approval' | 'read_only';
  assignedLicenseKey: string;
  hwidBound?: string;
  permissions: ClientPermission;
  createdAt: string;
  lastLogin: string;
  rating?: number; // 1-5 Star VIP rating
}

export interface GoogleUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  idToken: string;
  signedInAt: string;
}

export interface ToolVisibilitySettings {
  showStore: boolean;
  showLicenses: boolean;
  showBanking: boolean;
  showGenerateKey: boolean;
  showKhqrModal: boolean;
  showDownloadZip: boolean;
  showClientTester: boolean;
  showGeminiAi: boolean;
  showAlpha8: boolean;
  showSecurityAudit: boolean;
  showSuperAdmin: boolean;
}

