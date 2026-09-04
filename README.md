Angkor Emperor
- License Management
- Hardware ID 
- Super Admin RBAC Role-Based Access Control
- Threat Intelligence & Anti-Debugger
- AI Gemini Security Assistant
- Real-Time Game Alpha8 Monitor 144 FPS Lock
- Desktop Setup Installer Windows .bat / PowerShell
- Node.js
- Bun npm
- Gemini API Key 
- SQLite
1. Clone Repository
   git clone https://github.com/yourusername/angkor-emperor.git
   cd angkor-emperor
2. Dependencies
   npm install
   bun install
3. កំណត់ Environment Variables
   cp .env.example .env
4. Backend Server
   npm run server
   bun run server
5. ដំណើរការ Frontend Dashboard
   npm run dev
   bun run dev
6. បើក Browser ទៅកាន់ http://localhost:5173
API Endpoints
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
Project
angkor-emperor/
├── backend/
│   ├── server.ts
│   └── license.db
├── frontend/
│   ├── src/
│   │   ├── App.tsx 
│   │   ├── components
│   │   └── contexts
│   └── index.html
├── desktop-setup/
│   ├── AngkorEmperor_Setup.bat
│   └── AngkorEmperor_Quick_Runner.ps1
├── .env.example
├── package.json
└── README.md
Information Contact
- Telegram: https://t.me/PrinceOfSeal @PrinceOfSeal
- Email: vathsothary72@gmail.com
- Bank: KEM CHAN SOPHEAKTRA
- KHQR: 010 405 530
Copyright (c) 2025 Angkor Emperor. All rights reserved.
