# Angkor Emperor - 5D Tactile Super Admin Armor Console

ប្រព័ន្ធគ្រប់គ្រងអាជ្ញាប័ណ្ណ និងសុវត្ថិភាពកម្រិតខ្ពស់សម្រាប់ Game Alpha8 និងកម្មវិធី Desktop ។

## មុខងារ
- License Management (Generate, Validate, Revoke, Extend)
- Hardware ID (HWID) Binding
- Super Admin RBAC (Role-Based Access Control)
- Threat Intelligence & Anti-Debugger
- ACLEDA Bakong KHQR Payment Gateway
- AI Gemini Security Assistant
- Real-Time Game Alpha8 Monitor (144 FPS Lock)
- Desktop Setup Installer (Windows .bat / PowerShell)

## តម្រូវការ
- Node.js (v18+)
- Bun (ស្រេចចិត្ត) ឬ npm
- Gemini API Key (សម្រាប់ AI Assistant)
- SQLite (មកជាមួយ)

## ការដំឡើង

1. Clone Repository
   git clone https://github.com/yourusername/angkor-emperor.git
   cd angkor-emperor

2. ដំឡើង Dependencies
   npm install
   # ឬ
   bun install

3. កំណត់ Environment Variables
   cp .env.example .env
   # កែសម្រួល .env ដាក់ GEMINI_API_KEY

4. ដំណើរការ Backend Server
   npm run server
   # ឬ
   bun run server

5. ដំណើរការ Frontend Dashboard
   npm run dev
   # ឬ
   bun run dev

6. បើក Browser ទៅកាន់ http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/activate | Activate License |
| POST | /api/validate | Validate Token |
| POST | /api/deactivate | Deactivate License |
| GET | /api/admin/licenses | Get All Licenses |
| POST | /api/admin/generate | Generate New License |
| POST | /api/admin/revoke | Revoke License |
| POST | /api/admin/extend | Extend License |
| GET | /api/admin/threats | Get Threat Logs |
| GET | /api/health | Health Check |

## រចនាសម្ព័ន្ធ Project

angkor-emperor/
├── backend/
│   ├── server.ts (Backend API)
│   └── license.db (SQLite Database)
├── frontend/
│   ├── src/
│   │   ├── App.tsx (Main Application)
│   │   ├── components/ (UI Components)
│   │   └── contexts/ (Theme Context)
│   └── index.html
├── desktop-setup/
│   ├── AngkorEmperor_Setup.bat
│   └── AngkorEmperor_Quick_Runner.ps1
├── .env.example
├── package.json
└── README.md

## ព័ត៌មានទំនាក់ទំនង

- Telegram: https://t.me/PrinceOfSeal (@PrinceOfSeal)
- Email: vathsothary72@gmail.com
- Bank: KEM CHAN SOPHEAKTRA (ACLEDA BANK)
- KHQR: 010 405 530

## អាជ្ញាប័ណ្ណ

Copyright (c) 2025 Angkor Emperor. All rights reserved.
