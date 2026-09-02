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
  canViewTelemetry: boolean;       // បើកមើល Game Alpha8 Live Telemetry & 144 FPS
  canViewThreatLogs: boolean;      // បើកមើល Threat Intelligence & Blocked IPs
  canDownloadInstaller: boolean;   // បើកសិទ្ធិទាញយក Desktop Setup .exe / Portable Runner
  canUseOfflineMode: boolean;      // បើកសិទ្ធិដំណើរការ Offline (24h Hardware Token)
  canSwitchHardware: boolean;      // បើកសិទ្ធិ Reset / Switch HWID ដោយខ្លួនឯង
  canAccessKernelDriver: boolean;  // បើកដំណើរការ Ring 0 Kernel Anti-Cheat Shield
  canViewSecurityAudit: boolean;   // បើកមើលរបាយការណ៍វិភាគកម្រិតខ្លាំង & ខ្សោយ
  canGenerateSubKeys: boolean;     // បើកសិទ្ធិចេញ Sub-License Keys
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'enterprise_client' | 'vip_gamer' | 'standard_client';
  status: 'active' | 'suspended' | 'pending_approval' | 'read_only';
  assignedLicenseKey: string;
  hwidBound?: string;
  permissions: ClientPermission;
  createdAt: string;
  lastLogin: string;
  rating?: number; // 1-5 Star VIP rating
}

