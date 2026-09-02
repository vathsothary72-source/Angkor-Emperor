// ============================================================
// build-full.js
// Angkor Emperor - Full Project Builder
// ============================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_NAME = 'angkor-emperor';
const ROOT = path.join(process.cwd(), PROJECT_NAME);

console.log('==========================================');
console.log('   អធិរាជអង្គរ - Ultimate Build');
console.log('   Version 5.8.9 - Full Complete System');
console.log('==========================================\n');

if (fs.existsSync(ROOT)) {
    console.log('កំពុងលុប Project ចាស់...');
    fs.rmSync(ROOT, { recursive: true, force: true });
}

function writeFile(filePath, content) {
    const fullPath = path.join(ROOT, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(filePath);
}

console.log('កំពុងសាងសង់ Project...\n');

// ============================================================
// 1. BACKEND FILES
// ============================================================
writeFile('backend/package.json', `{
  "name": "angkor-emperor-backend",
  "version": "5.8.9",
  "description": "Angkor Emperor License Server",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx server.ts",
    "backend": "tsx server.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "sqlite3": "^5.1.6",
    "express-rate-limit": "^7.1.5",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "tsx": "^4.21.0"
  }
}`);

writeFile('backend/.env', `PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
ADMIN_SECRET=change_this_to_strong_secret
HWID_SECRET=change_this_to_strong_secret
JWT_SECRET=change_this_to_strong_secret
OFFLINE_SECRET=change_this_to_strong_secret
KHQR_MERCHANT_ID=010405530
KHQR_MERCHANT_NAME=KEM CHAN SOPHEAKTRA
TELEGRAM_USERNAME=PrinceOfSeal
SUPPORT_EMAIL=vathsothary72@gmail.com
`);

writeFile('backend/server.ts', `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import sqlite3 from 'sqlite3';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ANGKOR-EMPEROR-SECRET-2025';

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// ==========================================
// RATE LIMITING
// ==========================================
const activationLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const adminLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 20 });
app.use('/api/activate', activationLimiter);
app.use('/api/admin', adminLimiter);

// ==========================================
// DATABASE
// ==========================================
const db = new sqlite3.Database(path.join(__dirname, 'license.db'));

db.serialize(() => {
  db.run(\`CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_key TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL,
    max_devices INTEGER DEFAULT 1,
    expires_at TEXT,
    is_active INTEGER DEFAULT 1,
    revoked INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT
  )\`);

  db.run(\`CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_id INTEGER,
    device_id TEXT UNIQUE NOT NULL,
    hardware_fingerprint TEXT,
    ip_address TEXT,
    user_agent TEXT,
    first_activated TEXT DEFAULT CURRENT_TIMESTAMP,
    last_seen TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1
  )\`);

  db.run(\`CREATE TABLE IF NOT EXISTS activations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_id INTEGER,
    device_id INTEGER,
    token TEXT UNIQUE,
    activated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT,
    status TEXT DEFAULT 'active'
  )\`);

  db.run(\`CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_key TEXT,
    action TEXT,
    ip TEXT,
    user_agent TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    details TEXT
  )\`);
});

// ==========================================
// HELPERS
// ==========================================
function generateLicenseKey(): string {
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

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function isValidLicenseKey(key: string): boolean {
  return /^AE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key);
}

function adminAuth(req: any, res: any, next: any) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (!apiKey || apiKey !== ADMIN_SECRET) {
    return res.status(403).json({ error: 'Unauthorized. Invalid Admin Key.' });
  }
  next();
}

function logAudit(licenseKey: string, action: string, ip: string, userAgent: string, details?: any) {
  db.run(
    'INSERT INTO audit_logs (license_key, action, ip, user_agent, details) VALUES (?, ?, ?, ?, ?)',
    [licenseKey, action, ip, userAgent, details ? JSON.stringify(details) : null]
  );
}

// ==========================================
// API ROUTES
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', version: '5.8.9', timestamp: new Date().toISOString() });
});

// ACTIVATE
app.post('/api/activate', (req, res) => {
  const { licenseKey, deviceId, hardwareInfo } = req.body;
  if (!licenseKey || !deviceId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!isValidLicenseKey(licenseKey)) {
    return res.status(400).json({ error: 'Invalid license format' });
  }

  db.get('SELECT * FROM licenses WHERE license_key = ? AND revoked = 0', [licenseKey], (err, license) => {
    if (err || !license) {
      return res.status(404).json({ error: 'License not found' });
    }
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      return res.status(403).json({ error: 'License expired' });
    }
    if (!license.is_active) {
      return res.status(403).json({ error: 'License is inactive' });
    }

    db.get('SELECT COUNT(*) as count FROM devices WHERE license_id = ? AND is_active = 1', [license.id], (err, result) => {
      if (result.count >= license.max_devices) {
        return res.status(403).json({ error: 'Device limit reached' });
      }

      db.get('SELECT id FROM devices WHERE device_id = ?', [deviceId], (err, existing) => {
        let deviceIdFinal;
        if (existing) {
          deviceIdFinal = existing.id;
          db.run('UPDATE devices SET last_seen = CURRENT_TIMESTAMP, ip_address = ?, user_agent = ? WHERE id = ?',
            [req.ip, req.headers['user-agent'], deviceIdFinal]);
        } else {
          db.run(\`INSERT INTO devices (license_id, device_id, hardware_fingerprint, ip_address, user_agent)
                  VALUES (?, ?, ?, ?, ?)\`,
            [license.id, deviceId, JSON.stringify(hardwareInfo), req.ip, req.headers['user-agent']],
            function(err) {
              if (err) return res.status(500).json({ error: 'Device registration failed' });
              deviceIdFinal = this.lastID;
            }
          );
        }

        const token = generateToken();
        db.run(\`INSERT INTO activations (license_id, device_id, token, expires_at)
                VALUES (?, ?, ?, ?)\`,
          [license.id, deviceIdFinal, token, license.expires_at || null],
          function(err) {
            if (err) return res.status(500).json({ error: 'Activation failed' });
            logAudit(licenseKey, 'activation_success', req.ip, req.headers['user-agent']);
            res.json({
              success: true,
              token,
              license: {
                key: license.license_key,
                plan: license.plan,
                expiresAt: license.expires_at,
                maxDevices: license.max_devices
              }
            });
          }
        );
      });
    });
  });
});

// VALIDATE
app.post('/api/validate', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ valid: false, reason: 'Missing token' });
  }

  db.get(\`SELECT a.*, l.license_key, l.plan, l.expires_at
          FROM activations a
          JOIN licenses l ON a.license_id = l.id
          WHERE a.token = ? AND a.status = 'active'\`, [token], (err, activation) => {
    if (err || !activation) {
      return res.json({ valid: false, reason: 'Invalid token' });
    }
    if (activation.expires_at && new Date(activation.expires_at) < new Date()) {
      db.run('UPDATE activations SET status = ? WHERE id = ?', ['expired', activation.id]);
      return res.json({ valid: false, reason: 'Token expired' });
    }
    db.run('UPDATE devices SET last_seen = CURRENT_TIMESTAMP WHERE id = ?', [activation.device_id]);
    res.json({
      valid: true,
      license: {
        key: activation.license_key,
        plan: activation.plan,
        expiresAt: activation.expires_at
      }
    });
  });
});

// DEACTIVATE
app.post('/api/deactivate', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }
  db.run('UPDATE activations SET status = ? WHERE token = ?', ['revoked', token], function(err) {
    if (err) return res.status(500).json({ error: 'Deactivation failed' });
    res.json({ success: true });
  });
});

// ADMIN ROUTES
app.get('/api/admin/licenses', adminAuth, (req, res) => {
  db.all('SELECT * FROM licenses ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/admin/stats', adminAuth, (req, res) => {
  db.get('SELECT COUNT(*) as total FROM licenses', (err, total) => {
    db.get('SELECT COUNT(*) as active FROM licenses WHERE is_active = 1 AND revoked = 0', (err, active) => {
      db.get('SELECT COUNT(*) as devices FROM devices WHERE is_active = 1', (err, devices) => {
        db.get("SELECT COUNT(*) as today FROM audit_logs WHERE action = 'activation_success' AND date(timestamp) = date('now')", (err, today) => {
          res.json({
            totalLicenses: total?.total || 0,
            activeLicenses: active?.active || 0,
            totalDevices: devices?.devices || 0,
            activationsToday: today?.today || 0
          });
        });
      });
    });
  });
});

app.post('/api/admin/generate', adminAuth, (req, res) => {
  const { plan, maxDevices, expiresAt } = req.body;
  const key = generateLicenseKey();
  db.run(\`INSERT INTO licenses (license_key, plan, max_devices, expires_at)
          VALUES (?, ?, ?, ?)\`,
    [key, plan || 'monthly', maxDevices || 3, expiresAt || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, license: { key, plan: plan || 'monthly', maxDevices: maxDevices || 3, expiresAt } });
    }
  );
});

app.post('/api/admin/revoke', adminAuth, (req, res) => {
  const { licenseKey } = req.body;
  db.run('UPDATE licenses SET revoked = 1, is_active = 0 WHERE license_key = ?', [licenseKey], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/api/admin/extend', adminAuth, (req, res) => {
  const { licenseKey, days } = req.body;
  db.run(\`UPDATE licenses SET expires_at = datetime('now', '+' || ? || ' days') WHERE license_key = ?\`,
    [days, licenseKey], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.get('/api/admin/threats', adminAuth, (req, res) => {
  db.all(\`SELECT * FROM audit_logs
          WHERE action IN ('HONEYPOT_TRIGGERED', 'ZOMBIE_ACTIVATED', 'DEBUGGER_DETECTED', 'VM_DETECTED', 'COUNTER_ATTACK')
          ORDER BY timestamp DESC
          LIMIT 50\`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ==========================================
// KHQR PAYMENT
// ==========================================
app.post('/api/khqr/generate', (req, res) => {
  const { plan } = req.body;
  const PRICING: Record<string, number> = {
    starter: 9.99,
    pro: 79.99,
    lifetime: 149.00,
    enterprise: 299.00
  };
  if (!plan || !PRICING[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }
  const amount = PRICING[plan];
  const merchantId = process.env.KHQR_MERCHANT_ID || '010405530';
  const merchantName = process.env.KHQR_MERCHANT_NAME || 'KEM CHAN SOPHEAKTRA';
  const payload = {
    merchantId,
    merchantName,
    amount,
    currency: 'USD',
    merchantCity: 'Phnom Penh',
    countryCode: 'KH',
    timestamp: new Date().toISOString(),
    reference: \`LICENSE-\${plan.toUpperCase()}-\${Date.now()}\`
  };
  const qrData = Buffer.from(JSON.stringify(payload)).toString('base64');
  res.json({
    success: true,
    plan,
    amount,
    qrData,
    payload,
    qrImage: \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${encodeURIComponent(qrData)}\`
  });
});

app.post('/api/khqr/confirm', (req, res) => {
  const { reference, transactionId, amount, status } = req.body;
  if (status !== 'success' && status !== 'COMPLETED') {
    return res.status(400).json({ error: 'Payment not completed' });
  }
  const PLAN_BY_PRICE: Record<number, string> = {
    9.99: 'starter',
    79.99: 'pro',
    149.00: 'lifetime',
    299.00: 'enterprise'
  };
  const plan = PLAN_BY_PRICE[amount];
  if (!plan) {
    return res.status(400).json({ error: 'Invalid payment amount' });
  }
  const licenseKey = generateLicenseKey();
  let expiresAt: string | null = null;
  let maxDevices = 1;
  switch (plan) {
    case 'starter': expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); maxDevices = 1; break;
    case 'pro': expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); maxDevices = 3; break;
    case 'enterprise': expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); maxDevices = 10; break;
    case 'lifetime': expiresAt = null; maxDevices = 5; break;
  }
  const metadata = JSON.stringify({
    payment: { transactionId, amount, reference, method: 'KHQR', paidAt: new Date().toISOString() },
    plan,
    issuedBy: 'Super Admin'
  });
  db.run(\`INSERT INTO licenses (license_key, plan, max_devices, expires_at, is_active, metadata)
          VALUES (?, ?, ?, ?, ?, ?)\`,
    [licenseKey, plan, maxDevices, expiresAt, 1, metadata],
    function(err) {
      if (err) {
        console.error('License generation error:', err);
        return res.status(500).json({ error: 'Failed to generate license' });
      }
      logAudit(licenseKey, 'payment_success', req.ip, req.headers['user-agent'], { transactionId, amount, plan });
      res.json({
        success: true,
        license: { key: licenseKey, plan, maxDevices, expiresAt, amount },
        message: 'Payment confirmed! License issued successfully!'
      });
    }
  );
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🏯 Angkor Emperor Server running on http://0.0.0.0:\${PORT}\`);
});
`);

// ============================================================
// 2. FRONTEND FILES
// ============================================================
writeFile('frontend/package.json', `{
  "name": "angkor-emperor-frontend",
  "version": "5.8.9",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0",
    "qrcode.react": "^3.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.1",
    "typescript": "^5.2.2",
    "vite": "^4.5.0",
    "@tailwindcss/vite": "^4.1.14",
    "tailwindcss": "^4.1.14"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}`);

writeFile('frontend/vite.config.ts', `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  server: {
    port: 5173,
    host: true,
    proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } }
  },
  build: { outDir: 'dist', sourcemap: true }
}));
`);

writeFile('frontend/index.html', `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Angkor Emperor</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
`);

writeFile('frontend/src/main.tsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
`);

writeFile('frontend/src/index.css', `@import "tailwindcss";
body { background: #080808; color: #D4D4D4; font-family: 'Kantumruy Pro', sans-serif; }
`);

writeFile('frontend/src/App.tsx', `import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gold">🏯 អធិរាជអង្គរ</h1>
        <p className="text-gold/70 mt-2">ប្រព័ន្ធគ្រប់គ្រងអាជ្ញាប័ណ្ណ 5D</p>
        <p className="text-sm text-white/40 mt-4">Server is running. API is ready.</p>
      </div>
    </div>
  );
}

export default App;
`);

// ============================================================
// 3. README
// ============================================================
writeFile('README.md', `# Angkor Emperor - Ultimate System

## Quick Start

### Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Bun (Faster)
\`\`\`bash
bun install
bun run dev
\`\`\`

## License Keys (Demo)
- Lifetime: AE-TGR-8F3K-9D2L
- Pro: AE-EGL-7H2J-5M8N

## Contact
- Telegram: @PrinceOfSeal
- Email: vathsothary72@gmail.com
`);

// ============================================================
// 4. CREATE ZIP
// ============================================================
console.log('\n Project files created successfully!');

console.log('\n កំពុងបង្ហាប់ជា Zip...');
const zipName = 'angkor-emperor.zip';

try {
    if (process.platform === 'win32') {
        execSync(`powershell -command "Compress-Archive -Path ./${PROJECT_NAME} -DestinationPath ./${zipName} -Force"`, { stdio: 'inherit' });
    } else {
        execSync(`zip -r ${zipName} ${PROJECT_NAME}`, { stdio: 'inherit' });
    }
    console.log(`Zip File: ${zipName}`);
} catch (error) {
    console.log('សូមចុច Right-click លើ Folder → Send to → Compressed (zipped) folder');
}

console.log('\n កំពុងបើក Folder...');
try {
    execSync('start .', { stdio: 'ignore' });
} catch (e) {}

console.log('\n ==========================================');
console.log(' រួចរាល់!');
console.log(` Project: ${PROJECT_NAME}`);
console.log(` Zip: ${zipName}`);
console.log('==========================================');
console.log('\n ឥឡូវសូមទាញ (Drag) File ទៅកាន់ Google Drive!');
