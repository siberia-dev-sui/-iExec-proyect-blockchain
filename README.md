# Quintes Protocol - Whitelist PoC

> **Proof of Concept:** iExec Web3 Mail Integration with Backend Proxy Architecture

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![iExec Protocol](https://img.shields.io/badge/Built%20with-iExec-blue?style=flat)](https://iex.ec)
[![Node.js Backend](https://img.shields.io/badge/Backend-Node.js-green?style=flat&logo=node.js)](https://nodejs.org)

---

## 🎯 Overview

This Proof of Concept demonstrates the integration of **iExec Web3 Mail** technology using a **Backend Proxy Architecture**. The system separates concerns: a static frontend handles wallet connections and user interactions, while a Node.js backend securely manages all blockchain operations via the iExec SDK.

**Live Demo:** [Deploy URL will be added here]

---

## ✨ Features

### Frontend
- 🔐 **Secure Wallet Connection** - MetaMask integration (frontend only)
- 🎨 **Professional UI** - Clean, responsive design built with Webflow
- ⚡ **Static HTML** - No build process, instant loading
- 📱 **Mobile Responsive** - Works seamlessly on all devices

### Backend
- 📧 **Email Encryption** - User emails encrypted using iExec protocol
- ✉️ **Web3 Mail Delivery** - Automated confirmation emails via decentralized infrastructure
- 🔒 **Secure API** - RESTful API for frontend-backend communication
- 🌐 **Network Management** - Arbitrum Sepolia testnet integration
- 🛡️ **Error Handling** - Comprehensive error management

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   Frontend (HTML)   │
│  - MetaMask connect │
│  - User interface   │
│  - API consumer     │
└──────────┬──────────┘
           │ HTTP REST API
           ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│  - Express server   │
│  - iExec SDK        │
│  - Blockchain txs   │
└─────────────────────┘
```

### Why Backend Proxy?

✅ **Simplified Frontend** - HTML remains static, no complex SDK imports  
✅ **Better Security** - Private keys never exposed to client  
✅ **Easier Deployment** - Frontend and backend can be deployed separately  
✅ **Scalability** - Backend can handle rate limiting, caching, and optimization  
✅ **Maintenance** - Update SDK versions without touching frontend

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML/CSS/JS (Webflow) | User interface and wallet connection |
| **Backend** | Node.js + Express | API server and blockchain operations |
| **Web3 Library** | Ethers.js v5.7.2 | Blockchain interactions |
| **Web3 Mail** | iExec SDK v7.2.3 | Decentralized email protocol |
| **Blockchain** | Arbitrum Sepolia Testnet | Fast, low-cost transactions for testing |
| **Frontend Deploy** | Vercel | Static site hosting |
| **Backend Deploy** | Railway/Render/VPS | API server hosting |

---

## 🚀 Quick Start

### Option 1: Test the Live Demo

1. Visit the live demo URL
2. Click **"Join Whitelist"** button
3. Approve MetaMask connection
4. Enter your email address
5. Wait for confirmation (~60 seconds)
6. Check your email for confirmation message

### Option 2: Run Locally

#### Prerequisites

- **Node.js** v18+ installed ([Download](https://nodejs.org/))
- **MetaMask** browser extension ([Install](https://metamask.io/download/))
- **Git** for cloning the repository

#### Step 1: Clone the Repository

```bash
git clone https://github.com/siberia-dev-sui/-iExec-proyect-blockchain.git
cd -iExec-proyect-blockchain
```

#### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env  # Edit with your configuration
```

**`.env` Configuration:**

```env
PORT=3001
PRIVATE_KEY=your_backend_wallet_private_key_here
RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
NETWORK_ID=421614
```

**⚠️ IMPORTANT:** Create a new wallet specifically for the backend. DO NOT use your personal wallet.

Generate a new wallet:
```bash
node -e "const {Wallet} = require('ethers'); const w = Wallet.createRandom(); console.log('Address:', w.address); console.log('Private Key:', w.privateKey);"
```

Get testnet ETH for gas fees:
- https://faucets.chain.link/arbitrum-sepolia
- https://www.alchemy.com/faucets/arbitrum-sepolia

#### Step 3: Start Backend

```bash
npm run dev
```

You should see:
```
🚀 ========================================
🚀 iExec Web3 Mail Backend is RUNNING
🚀 ========================================
📡 Server: http://localhost:3001
💳 Wallet: 0x...
🌐 Network: Arbitrum Sepolia (421614)
🚀 ========================================
```

#### Step 4: Open Frontend

Open `index.html` in your browser (using Live Server or similar).

---

## 📁 Project Structure

```
iexec_work/
├── backend/                        # 🆕 Backend API server
│   ├── server.js                   # Express server + iExec SDK
│   ├── package.json                # Dependencies
│   ├── .env.example                # Environment configuration template
│   ├── .gitignore                  # Git ignore rules
│   └── README.md                   # Backend documentation
│
├── js/
│   ├── webflow.js                  # Webflow core functionality
│   └── logic.js                    # 🔄 Updated: API consumer (no SDK)
│
├── index.html                      # 🔄 Updated: Simplified (no SDK imports)
│
├── docs/                           # Technical documentation
│   ├── ARCHITECTURE.md             # Complete technical specification
│   ├── DEVELOPMENT_PLAN.md         # Implementation guide
│   ├── DELIVERY_MESSAGE.md         # Client delivery template
│   └── IEXEC_WEB3MAIL_DOCS.md     # iExec API reference
│
├── css/                            # Webflow stylesheets
├── images/                         # Image assets
└── README.md                       # This file
```

---

## 🔧 How It Works

### User Flow

```
1. User clicks "Join Whitelist"
        ↓
2. Frontend: Connect MetaMask wallet
   ↓
3. Frontend: Prompt for email
   ↓
4. Frontend → Backend: POST /api/protect-email
   ↓
5. Backend: Encrypt email with iExec SDK
   ↓
6. Frontend → Backend: POST /api/grant-access
   ↓
7. Backend: Grant app access
   ↓
8. Frontend → Backend: POST /api/send-email
   ↓
9. Backend: Send confirmation via Web3 Mail
   ↓
10. User receives email! 🎉
```

### API Endpoints

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T10:00:00.000Z",
  "service": "iExec Web3 Mail Backend",
  "wallet": "0x..."
}
```

#### `POST /api/protect-email`
Encrypts user email using iExec.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "protectedDataAddress": "0x...",
  "txHash": "0x..."
}
```

#### `POST /api/grant-access`
Grants app access to encrypted data.

**Request:**
```json
{
  "protectedDataAddress": "0x...",
  "userAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "0x..."
}
```

#### `POST /api/send-email`
Sends confirmation email via Web3 Mail.

**Request:**
```json
{
  "protectedDataAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "0x..."
}
```

---

## 🔐 Security

### Best Practices Implemented

✅ **Dedicated Backend Wallet** - Separate wallet for backend operations  
✅ **No Private Keys in Frontend** - All sensitive operations in backend  
✅ **CORS Configuration** - Controlled access to API  
✅ **Input Validation** - All API inputs validated  
✅ **Environment Variables** - Sensitive data in `.env` (not committed)  
✅ **Testnet First** - Always test on Arbitrum Sepolia before mainnet

### Production Recommendations

- [ ] Implement rate limiting (e.g., express-rate-limit)
- [ ] Add API authentication (e.g., JWT tokens)
- [ ] Set specific CORS origin (not `*`)
- [ ] Use HTTPS for production
- [ ] Monitor backend wallet balance
- [ ] Implement logging (e.g., Winston)
- [ ] Add error tracking (e.g., Sentry)

---

## 🚀 Deployment

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set **Root Directory** to `.` (root)
5. Deploy

Your frontend will be live at `https://your-project.vercel.app`

### Deploy Backend

#### Option 1: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select `backend` directory as root
4. Add environment variables
5. Deploy

#### Option 2: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set **Root Directory** to `backend`
5. Add environment variables
6. Deploy

#### Option 3: VPS (Ubuntu)

   ```bash
# SSH into your VPS
ssh user@your-server.com

# Clone repository
git clone <your-repo>
cd backend

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Setup environment
nano .env  # Add your configuration

# Install PM2
sudo npm install -g pm2

# Start server
pm2 start server.js --name iexec-backend

# Auto-start on reboot
pm2 startup
pm2 save
```

### Update Frontend API URL

After deploying backend, update `js/logic.js`:

   ```javascript
   const CONFIG = {
  API_URL: 'https://your-backend-url.com',  // Update this!
  // ...
   };
   ```

---

## 🧪 Testing

### Manual Testing

1. **Health Check:**
```bash
curl http://localhost:3001/health
```

2. **Protect Email:**
```bash
curl -X POST http://localhost:3001/api/protect-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

3. **Full Flow:**
   - Open frontend in browser
   - Click "Join Whitelist"
   - Follow prompts
   - Check backend logs
- Verify email delivery

---

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Complete technical specification
- **[DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md)** - Step-by-step implementation guide
- **[IEXEC_WEB3MAIL_DOCS.md](docs/IEXEC_WEB3MAIL_DOCS.md)** - iExec API reference
- **[Backend README](backend/README.md)** - Backend-specific documentation

---

## 🐛 Troubleshooting

### Backend Issues

**"PRIVATE_KEY not set"**
- Create `.env` file in `backend/` directory
- Add `PRIVATE_KEY=your_key_here`

**"Insufficient funds"**
- Get testnet ETH from faucet
- Check backend wallet has ETH

**"Port already in use"**
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:3001 | xargs kill`

### Frontend Issues

**"Cannot connect to backend service"**
- Verify backend is running
- Check `API_URL` in `logic.js` matches your backend
- Check browser console for CORS errors

**"MetaMask not detected"**
- Install MetaMask extension
- Refresh page

---

## 📊 Project Status

```
✅ Backend API: 100% Complete
✅ Frontend: 100% Complete
✅ Documentation: 100% Complete
✅ Local Testing: Ready
⏳ Deployment: Pending
⏳ Live Testing: Pending
```

---

## 🤝 Contributing

This is a PoC project. For production implementation:

1. Implement security recommendations
2. Add comprehensive testing
3. Set up CI/CD pipeline
4. Add monitoring and logging
5. Implement rate limiting

---

## 📄 License

MIT License - feel free to use this PoC as reference.

---

## 👤 Author

**Hugo Mendoza**
Blockchain Developer

---

## 🙏 Acknowledgments

- **iExec** for Web3 Mail technology
- **Quintes Protocol** for the opportunity
- **Arbitrum** for fast testnet infrastructure

---

## 📞 Support

For questions or issues:
1. Check documentation in `docs/` folder
2. Review backend logs
3. Check browser console for errors
4. Verify environment configuration

---

**Last Updated:** November 7, 2025  
**Version:** 3.0.0 (Backend Proxy Architecture)
