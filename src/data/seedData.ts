import { License, Device, ThreatLog } from '../types';

export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'AE-';
  for (let i = 0; i < 3; i++) {
    let part = '';
    for (let j = 0; j < 4; j++) {
      part += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key += part + (i < 2 ? '-' : '');
  }
  return key;
}

export function generateToken(): string {
  const chars = '0123456789abcdef';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function generateRandomMAC(): string {
  return 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
    return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
  });
}

export function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 150) + 50}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

export const initialLicenses: License[] = [
  {
    id: 1,
    license_key: 'AE-TGR-8F3K-9D2L',
    plan: 'premium',
    max_devices: 5,
    used_devices: 3,
    user_name: 'ក្រុមហ៊ុន អង្គរ សូលូសិន (Angkor Solutions)',
    expires_at: '2026-12-31T23:59:59Z',
    is_active: true,
    revoked: false,
    created_at: '2025-01-10T08:30:00Z',
    metadata: 'Enterprise VIP Tier with 5D Armor',
    rating: 5
  },
  {
    id: 2,
    license_key: 'AE-EGL-7H2J-5M8N',
    plan: 'pro',
    max_devices: 3,
    used_devices: 2,
    user_name: 'សុខ វិចិត្រ (Sok Vicheth)',
    expires_at: '2026-10-15T23:59:59Z',
    is_active: true,
    revoked: false,
    created_at: '2025-02-14T10:15:00Z',
    metadata: 'Developer Studio License',
    rating: 5
  },
  {
    id: 3,
    license_key: 'AE-TGR-6C7V-8B9N',
    plan: 'lifetime',
    max_devices: 5,
    used_devices: 4,
    user_name: 'ខេមរា សុវណ្ណ (Khemara Sovann)',
    expires_at: null,
    is_active: true,
    revoked: false,
    created_at: '2025-01-01T00:00:00Z',
    metadata: 'Founder Ultimate 5D Key',
    rating: 5
  },
  {
    id: 4,
    license_key: 'AE-ELP-9R5S-2T3U',
    plan: 'trial',
    max_devices: 2,
    used_devices: 1,
    user_name: 'ចាន់ ពិសិដ្ឋ (Chan Piseth)',
    expires_at: '2026-09-15T18:00:00Z',
    is_active: true,
    revoked: false,
    created_at: '2025-08-30T14:20:00Z',
    metadata: '14-Day Evaluation Sandbox',
    rating: 4
  },
  {
    id: 5,
    license_key: 'AE-DRG-4X1P-7W6Q',
    plan: 'enterprise',
    max_devices: 10,
    used_devices: 0,
    user_name: 'រ៉ុង រស្មី (Rong Reasmey)',
    expires_at: '2024-01-01T00:00:00Z',
    is_active: false,
    revoked: true,
    created_at: '2023-01-01T00:00:00Z',
    metadata: 'Revoked due to security breach attempt',
    rating: 3
  },
  {
    id: 6,
    license_key: 'AE-KHM-2A9P-8N4W',
    plan: 'yearly',
    max_devices: 4,
    used_devices: 2,
    user_name: 'បណ្ឌិត ស៊ុន ហេង (Dr. Sun Heng)',
    expires_at: '2027-03-20T23:59:59Z',
    is_active: true,
    revoked: false,
    created_at: '2025-03-20T11:00:00Z',
    metadata: 'Academic Research Lab',
    rating: 5
  },
  {
    id: 7,
    license_key: 'AE-MNL-5Q8R-3Z1X',
    plan: 'monthly',
    max_devices: 2,
    used_devices: 1,
    user_name: 'វណ្ណដា កុសល (Vannda Kosal)',
    expires_at: '2026-09-30T23:59:59Z',
    is_active: true,
    revoked: false,
    created_at: '2025-08-31T09:00:00Z',
    metadata: 'Standard Monthly',
    rating: 4
  }
];

export const initialDevices: Device[] = [
  {
    id: 1,
    license_id: 1,
    license_key: 'AE-TGR-8F3K-9D2L',
    device_id: 'DEV-ANGKOR-WS-01',
    device_name: 'Main Workstation (Phnom Penh)',
    hardware_fingerprint: 'a8f3b2c91048e77a284e910283c7491d',
    ip_address: '103.216.50.12',
    user_agent: 'Angkor-Desktop/5.0.0 (Windows 11 x64)',
    first_activated: '2025-01-10T08:35:00Z',
    last_seen: '2026-09-01T00:50:00Z',
    is_active: true
  },
  {
    id: 2,
    license_id: 1,
    license_key: 'AE-TGR-8F3K-9D2L',
    device_id: 'DEV-ANGKOR-LT-02',
    device_name: 'MacBook Pro M3 Max (Siem Reap)',
    hardware_fingerprint: 'f491c82b99381ea27c093a103857b290',
    ip_address: '103.216.50.88',
    user_agent: 'Angkor-Desktop/5.0.0 (macOS 14.5 arm64)',
    first_activated: '2025-01-12T14:20:00Z',
    last_seen: '2026-08-31T22:15:00Z',
    is_active: true
  },
  {
    id: 3,
    license_id: 1,
    license_key: 'AE-TGR-8F3K-9D2L',
    device_id: 'DEV-ANGKOR-SRV-03',
    device_name: 'Production Build Node #1',
    hardware_fingerprint: '38ea10398f821c97a812b74019238cfa',
    ip_address: '103.216.50.201',
    user_agent: 'Angkor-Core/5.0.0 (Ubuntu 24.04 Server)',
    first_activated: '2025-02-01T09:00:00Z',
    last_seen: '2026-09-01T01:00:00Z',
    is_active: true
  },
  {
    id: 4,
    license_id: 2,
    license_key: 'AE-EGL-7H2J-5M8N',
    device_id: 'DEV-VICHETH-LAPTOP',
    device_name: 'ThinkPad X1 Carbon',
    hardware_fingerprint: '98fa0183b2716c90ea47281938501ab4',
    ip_address: '203.189.144.60',
    user_agent: 'Angkor-Desktop/5.0.0 (Windows 11 x64)',
    first_activated: '2025-02-14T10:20:00Z',
    last_seen: '2026-08-31T19:40:00Z',
    is_active: true
  },
  {
    id: 5,
    license_id: 3,
    license_key: 'AE-TGR-6C7V-8B9N',
    device_id: 'DEV-KHEMARA-STUDIO',
    device_name: 'Custom RTX 4090 Rig',
    hardware_fingerprint: '11029384756abcdef0192837465abcde',
    ip_address: '118.69.182.44',
    user_agent: 'Angkor-Desktop/5.0.0 (Windows 11 Pro)',
    first_activated: '2025-01-01T00:10:00Z',
    last_seen: '2026-09-01T00:30:00Z',
    is_active: true
  }
];

export const initialThreatLogs: ThreatLog[] = [
  {
    id: 1,
    timestamp: '2026-09-01T00:54:12Z',
    action: 'HONEYPOT_TRIGGERED',
    severity: 'critical',
    ip: '185.220.101.5',
    mac: '00:1A:2B:3C:4D:5E',
    location: 'Tor Exit Node (Frankfurt, DE)',
    status: 'blocked',
    details: 'Triggered decoy licensing memory trap via automated reverse-engineering script.',
    target_key: 'AE-DRG-4X1P-7W6Q'
  },
  {
    id: 2,
    timestamp: '2026-09-01T00:32:45Z',
    action: 'DEBUGGER_DETECTED',
    severity: 'high',
    ip: '45.154.255.89',
    mac: 'AA:BB:CC:DD:EE:FF',
    location: 'St. Petersburg, RU',
    status: 'isolated',
    details: 'x64dbg / IDA Pro kernel attach detected. Anti-tamper 5D shield scrambled bytecodes.',
    target_key: 'AE-TGR-8F3K-9D2L'
  },
  {
    id: 3,
    timestamp: '2026-08-31T23:18:10Z',
    action: 'VM_DETECTED',
    severity: 'medium',
    ip: '194.26.29.134',
    mac: '08:00:27:12:34:56',
    location: 'Vilnius, LT',
    status: 'mitigated',
    details: 'VirtualBox / VMware hypervisor fingerprint detected without sandboxing permissions.',
    target_key: 'AE-ELP-9R5S-2T3U'
  },
  {
    id: 4,
    timestamp: '2026-08-31T21:44:00Z',
    action: 'ZOMBIE_ACTIVATED',
    severity: 'critical',
    ip: '91.240.118.20',
    mac: '52:54:00:8A:FE:91',
    location: 'Amsterdam, NL',
    status: 'blocked',
    details: 'Self-healing zero-trust heartbeat failed. Zombie mitigation locked local encrypted key store.',
    target_key: 'AE-DRG-4X1P-7W6Q'
  },
  {
    id: 5,
    timestamp: '2026-08-31T18:05:22Z',
    action: 'COUNTER_ATTACK',
    severity: 'high',
    ip: '103.152.220.14',
    mac: '74:D0:2B:9F:33:11',
    location: 'Bangkok, TH',
    status: 'blocked',
    details: 'Repeated unauthorized brute-force key generation detected. IP permanently quarantined.',
    target_key: 'AE-BRUTE-SIM'
  },
  {
    id: 6,
    timestamp: '2026-08-31T14:12:08Z',
    action: 'INTEGRITY_FAIL',
    severity: 'high',
    ip: '115.79.208.55',
    mac: '2C:F0:5D:88:1A:0B',
    location: 'Ho Chi Minh City, VN',
    status: 'isolated',
    details: 'Binary hash mismatch on client core modules. Auto-reversion triggered.',
    target_key: 'AE-EGL-7H2J-5M8N'
  }
];
