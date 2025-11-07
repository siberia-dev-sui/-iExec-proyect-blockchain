# iExec Web3 Mail Integration - Technical Architecture

## 1. Project Overview

**Client:** Quintes Protocol (Rand)  
**Project Type:** Proof of Concept (PoC)  
**Objective:** Integrate iExec Web3 Mail functionality using Backend Proxy Architecture  
**Architecture:** Frontend (Static HTML) + Backend (Node.js/Express)  
**Timeline:** Sprint delivery (2-3 days)  
**Status:** Complete  
**Developer:** Hugo Mendoza

### 1.1 Business Requirements
- User must be able to connect their Web3 wallet (MetaMask) - **Frontend**
- User email must be encrypted and protected using iExec technology - **Backend**
- System must send automated confirmation email via Web3 Mail protocol - **Backend**
- Landing page must be production-ready and professional - **Frontend**
- Backend must handle all blockchain operations securely - **Backend**
- Solution must demonstrate technical feasibility for full implementation

### 1.2 Success Criteria
- [ ] MetaMask wallet connection works reliably
- [ ] Email encryption via iExec completes successfully
- [ ] Confirmation email is delivered to user's inbox
- [ ] User experience is smooth with clear feedback at each step
- [ ] Code is well-documented and maintainable
- [ ] Live demo is deployed and accessible
- [ ] Client is impressed with professional approach

---

## 2. Technical Architecture

### 2.1 Architecture Pattern: Backend Proxy

```
┌─────────────────────────────────┐
│       Frontend (Client)         │
│  - Static HTML/CSS/JS           │
│  - MetaMask integration         │
│  - User interface               │
│  - API consumer                 │
└────────────┬────────────────────┘
             │
             │ HTTP REST API
             │ (JSON)
             │
             ▼
┌─────────────────────────────────┐
│       Backend (Server)          │
│  - Node.js + Express            │
│  - iExec SDK integration        │
│  - Blockchain transactions      │
│  - Email encryption             │
└─────────────────────────────────┘
```

### 2.2 Tech Stack

| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| **Frontend** | Webflow Export | N/A | Professional design, no framework overhead |
| **Frontend Web3** | MetaMask only | N/A | Simple wallet connection, no SDK needed |
| **Backend** | Node.js + Express | v18+ / v4.18.2 | Industry standard, mature ecosystem |
| **Backend Web3** | Ethers.js | v5.7.2 | Blockchain interactions on server |
| **iExec SDK** | @iexec/web3mail | v7.2.3 | Core Web3 Mail functionality (backend only) |
| **Frontend Deploy** | Vercel | N/A | Zero-config static site hosting |
| **Backend Deploy** | Railway/Render/VPS | N/A | API server hosting with Node.js support |
| **Version Control** | Git + GitHub | N/A | Industry standard |

### 2.3 Architecture Decisions

#### Why Backend Proxy Architecture?
- **Security:** Private keys never exposed to client
- **Simplicity:** Frontend remains static, no complex SDK
- **Scalability:** Backend can handle rate limiting, caching
- **Separation of Concerns:** Frontend = UX, Backend = Blockchain logic
- **Easier Deployment:** Frontend and backend deployed independently
- **Better Error Handling:** Centralized error management on backend

#### Why Node.js Backend?
- **JavaScript Consistency:** Same language as frontend
- **Rich Ecosystem:** npm packages for everything
- **iExec SDK Support:** Official iExec SDK works perfectly
- **Express Framework:** Battle-tested, simple to use
- **Easy Deployment:** Railway, Render, VPS all support Node.js

#### Why Vercel for Frontend?
- **Zero Config:** Automatic detection of static sites
- **Free Tier:** Perfect for PoC, no credit card needed
- **GitHub Integration:** Auto-deploy on push
- **Global CDN:** Fast loading worldwide

---

## 3. File Structure

```
iexec_work/
├── .cursorrules                    # Project rules for AI/developer
├── .gitignore                      # Git ignore patterns
├── README.md                       # Public project documentation
│
├── backend/                        # 🆕 Backend API server
│   ├── server.js                   # Express server + iExec SDK
│   ├── package.json                # Backend dependencies
│   ├── .env.example                # Environment configuration template
│   ├── .gitignore                  # Backend-specific git ignore
│   └── README.md                   # Backend documentation
│
├── docs/                           # Technical documentation
│   ├── ARCHITECTURE.md             # This file (technical blueprint)
│   ├── IEXEC_WEB3MAIL_DOCS.md     # iExec API reference
│   ├── DEVELOPMENT_PLAN.md         # Step-by-step implementation guide
│   └── DELIVERY_MESSAGE.md         # Client delivery template
│
├── index.html                      # Main landing page (simplified)
│
├── css/                            # Webflow styles (DO NOT MODIFY)
│   ├── hugos-stupendous-site-cdb0c4.webflow.css
│   ├── normalize.css
│   └── webflow.css
│
├── js/                             # JavaScript files
│   ├── webflow.js                  # Webflow core (DO NOT MODIFY)
│   └── logic.js                    # 🔄 Updated: API consumer (no SDK)
│
├── images/                         # Image assets (untouched)
└── fonts/                          # Font files (untouched)
```

### 3.1 Key Changes from Previous Architecture

**Added:**
- `backend/` directory with complete Node.js server
- `backend/server.js` - Express server with API endpoints
- `backend/package.json` - Backend dependencies
- `backend/.env.example` - Configuration template

**Modified:**
- `js/logic.js` - Now makes HTTP calls to backend (no SDK imports)
- `index.html` - Simplified (removed SDK imports)

**Removed:**
- SDK imports from frontend
- Direct blockchain operations from frontend

---

## 4. Integration Points

### 4.1 Frontend (`index.html` + `js/logic.js`)

**Frontend Responsibilities:**
1. ✅ Connect MetaMask wallet
2. ✅ Collect user email
3. ✅ Make HTTP requests to backend API
4. ✅ Display feedback to user

**HTML Structure (Simplified):**
```html
<head>
  <!-- NO SDK IMPORTS NEEDED! -->
  <!-- Only Webflow dependencies -->
</head>
<body>
  <!-- Join Whitelist buttons -->
  <a id="joinWhitelistBtn" ...>Join Whitelist</a>
  <a id="joinWhitelistBtnHero" ...>Join Whitelist</a>
  
  <!-- Scripts -->
  <script src="js/webflow.js"></script>
  <script src="js/logic.js"></script>
</body>
```

**Frontend API Consumer (`js/logic.js`):**
```javascript
// Configuration
const CONFIG = {
  API_URL: 'http://localhost:3001'  // Backend URL
};

// Make API calls
async function protectUserEmailViaAPI(email) {
  const response = await fetch(`${CONFIG.API_URL}/api/protect-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return await response.json();
}
```

### 4.2 Backend (`backend/server.js`)

**Backend Responsibilities:**
1. ✅ Initialize iExec SDK
2. ✅ Handle blockchain transactions
3. ✅ Encrypt user emails
4. ✅ Grant access to protected data
5. ✅ Send confirmation emails
6. ✅ Provide RESTful API

**Backend Structure:**
```javascript
// 1. Imports
import express from 'express';
import { ethers } from 'ethers';
import { IExecWeb3mail } from '@iexec/web3mail';

// 2. Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// 3. Initialize blockchain
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const web3mail = new IExecWeb3mail(wallet);

// 4. API Endpoints
app.get('/health', ...);
app.post('/api/protect-email', ...);
app.post('/api/grant-access', ...);
app.post('/api/send-email', ...);

// 5. Start server
app.listen(PORT);
```

**Backend API Endpoints:**

| Endpoint | Method | Purpose | Request Body | Response |
|----------|--------|---------|--------------|----------|
| `/health` | GET | Health check | None | `{status, wallet}` |
| `/api/protect-email` | POST | Encrypt email | `{email}` | `{protectedDataAddress, txHash}` |
| `/api/grant-access` | POST | Grant access | `{protectedDataAddress, userAddress}` | `{success, txHash}` |
| `/api/send-email` | POST | Send email | `{protectedDataAddress}` | `{success, taskId}` |

---

## 5. User Flow (Backend Proxy Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                    USER LANDS ON PAGE                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │ Clicks "Join Whitelist"│
                └───────────┬───────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │   Frontend: Check MetaMask    │
            └───────────┬───────────────────┘
                        │
                ┌───────┴────────┐
                │                │
            NO  │                │  YES
                │                │
                ▼                ▼
        ┌────────────┐   ┌──────────────────────┐
        │   Alert:   │   │ Frontend: Connect     │
        │  Install   │   │  MetaMask Wallet      │
        │  MetaMask  │   └──────────┬───────────┘
        └────────────┘               │
                                     ▼
                         ┌────────────────────────┐
                         │ Frontend: Prompt Email │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Frontend: Validate     │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Frontend → Backend:    │
                         │ POST /api/protect-email│
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Backend: Call iExec    │
                         │  protectData()         │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Frontend → Backend:    │
                         │ POST /api/grant-access │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Backend: Call iExec    │
                         │  grantAccess()         │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Frontend → Backend:    │
                         │ POST /api/send-email   │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Backend: Call iExec    │
                         │  sendEmail()           │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │ Frontend: SUCCESS! 🎉  │
                         │  Check Your Email      │
                         └────────────────────────┘
```

### 5.1 Sequence Diagram

```
Frontend          Backend          iExec SDK       Blockchain
   │                 │                 │                │
   │ 1. Connect      │                 │                │
   │   MetaMask      │                 │                │
   │─────────────────────────────────────────────────> │
   │                 │                 │                │
   │ 2. POST         │                 │                │
   │   /protect-email│                 │                │
   │────────────────>│                 │                │
   │                 │ 3. protectData()│                │
   │                 │────────────────>│                │
   │                 │                 │ 4. TX          │
   │                 │                 │───────────────>│
   │                 │ 5. Protected    │                │
   │                 │    Address      │                │
   │                 │<────────────────│                │
   │ 6. Response     │                 │                │
   │<────────────────│                 │                │
   │                 │                 │                │
   │ 7. POST         │                 │                │
   │   /grant-access │                 │                │
   │────────────────>│                 │                │
   │                 │ 8. grantAccess()│                │
   │                 │────────────────>│                │
   │                 │                 │ 9. TX          │
   │                 │                 │───────────────>│
   │ 10. Response    │                 │                │
   │<────────────────│                 │                │
   │                 │                 │                │
   │ 11. POST        │                 │                │
   │    /send-email  │                 │                │
   │────────────────>│                 │                │
   │                 │ 12. sendEmail() │                │
   │                 │────────────────>│                │
   │                 │                 │ 13. TX         │
   │                 │                 │───────────────>│
   │ 14. Success     │                 │                │
   │<────────────────│                 │                │
   │                 │                 │                │
   │ 15. Show        │                 │                │
   │     Success     │                 │                │
   │                 │                 │                │
```

### 5.1 Error Paths

At any point, if an error occurs:
```
[Error Detected]
     │
     ▼
[console.error(error)]
     │
     ▼
[Alert: ❌ Error: {message}]
     │
     ▼
[User Can Try Again]
```

---

## 6. iExec Web3 Mail Integration Specification

### 6.1 Configuration Requirements

```javascript
const CONFIG = {
  // Get this from iExec dashboard after creating your app
  APP_ADDRESS: '0xYourAppAddressFromIExecDashboard',
  
  // Arbitrum Sepolia Testnet (official iExec testnet)
  // Based on https://docs.iex.ec/protocol/proof-of-contribution
  NETWORK_ID: 421614,
  NETWORK_NAME: 'Arbitrum Sepolia',
  NETWORK_HEX: '0x66eee',
  RPC_URL: 'https://sepolia-rollup.arbitrum.io/rpc',
  
  // Email content
  EMAIL_SUBJECT: 'Welcome to Quintes Whitelist',
  EMAIL_CONTENT: `
    <html>
      <body>
        <h1>🎉 Congratulations!</h1>
        <p>Your spot on the Quintes Protocol whitelist is secured.</p>
        <p>We'll keep you updated on the launch.</p>
        <p>Stay tuned!</p>
      </body>
    </html>
  `
};
```

### 6.2 SDK Method Specifications

#### Method 1: `protectData()`

**Purpose:** Encrypt user's email address using iExec's encryption

**Call:**
```javascript
const protectedData = await web3mail.protectData({
  data: { email: userEmail }
});
```

**Input:**
- `data.email` (string): User's email address

**Output:**
```javascript
{
  address: '0x...', // Protected data address (use this in subsequent calls)
  txHash: '0x...',  // Transaction hash
  // ... other metadata
}
```

**Errors to Handle:**
- Invalid email format
- User rejects transaction
- Insufficient balance for gas
- Network errors

#### Method 2: `grantAccess()`

**Purpose:** Grant the application permission to use the protected data

**Call:**
```javascript
await web3mail.grantAccess({
  protectedData: protectedData.address,
  authorizedApp: CONFIG.APP_ADDRESS,
  authorizedUser: userAddress
});
```

**Input:**
- `protectedData` (string): Address from protectData() result
- `authorizedApp` (string): Your app's address from iExec dashboard
- `authorizedUser` (string): User's wallet address

**Output:**
- Promise resolves on success (no return value needed)

**Errors to Handle:**
- Invalid addresses
- User rejects transaction
- App not registered on iExec
- Permission already granted

#### Method 3: `fetchUserContacts()`

**Purpose:** Retrieve user's protected contacts (optional for PoC)

**Call:**
```javascript
const contacts = await web3mail.fetchUserContacts();
```

**Output:**
```javascript
[
  {
    address: '0x...',
    // ... contact metadata
  },
  // ... more contacts
]
```

#### Method 4: `sendEmail()`

**Purpose:** Send confirmation email via Web3 Mail

**Call:**
```javascript
await web3mail.sendEmail({
  protectedData: protectedData.address,
  emailSubject: CONFIG.EMAIL_SUBJECT,
  emailContent: CONFIG.EMAIL_CONTENT
});
```

**Input:**
- `protectedData` (string): Protected data address
- `emailSubject` (string): Email subject line
- `emailContent` (string): Email body (HTML supported)

**Output:**
- Promise resolves on success

**Errors to Handle:**
- Protected data not found
- Access not granted
- Invalid content
- Network errors

---

## 7. Error Handling Strategy

### 7.1 Error Categories

| Category | Examples | User Message | Technical Action |
|----------|----------|--------------|------------------|
| Connection | MetaMask not installed | "Please install MetaMask to continue" | Redirect to metamask.io |
| Connection | User rejects connection | "Connection rejected. Please try again." | Return to initial state |
| Network | Wrong network | "Please switch to Arbitrum Sepolia" | Trigger network switch |
| Network | RPC errors | "Network error. Please check connection." | Log error, retry option |
| iExec | API failures | "Service error. Please try again later." | Log full error, contact support |
| iExec | Insufficient balance | "Insufficient ETH for transaction" | Explain gas requirements |
| Validation | Invalid email | "Please enter a valid email address" | Show format example |
| General | Unknown error | "An error occurred: [message]" | Log everything, provide details |

### 7.2 Error Handling Template

```javascript
try {
  alert('Step X: [Action description]...');
  const result = await someAsyncFunction();
  alert('✅ Success message');
  return result;
} catch (error) {
  console.error('Context of what failed:', error);
  
  // Handle specific error codes
  if (error.code === 4001) {
    alert('❌ You rejected the request. Please try again.');
  } else {
    alert(`❌ Error: ${error.message}\n\nPlease try again or contact support.`);
  }
  
  throw error; // Re-throw to stop flow
}
```

---

## 8. Testing Strategy

### 8.1 Testing Checklist

**Phase 1: Connection Testing**
- [ ] MetaMask detection works
- [ ] Connection request appears
- [ ] User approval works
- [ ] User rejection is handled
- [ ] Wallet address is displayed correctly
- [ ] Wrong network is detected
- [ ] Network switch prompt works
- [ ] Network switch completes successfully

**Phase 2: iExec Integration Testing**
- [ ] SDK initializes without errors
- [ ] protectData() completes
- [ ] Transaction appears in MetaMask
- [ ] Protected data address is returned
- [ ] grantAccess() completes
- [ ] sendEmail() completes
- [ ] Email is received in inbox

**Phase 3: User Experience Testing**
- [ ] All alerts are clear and helpful
- [ ] Error messages are user-friendly
- [ ] Button is clickable and responsive
- [ ] Page works on mobile
- [ ] Page works on different browsers
- [ ] Loading states are clear

**Phase 4: Error Scenario Testing**
- [ ] Works without MetaMask → shows install prompt
- [ ] Wrong network → prompts to switch
- [ ] User rejects → clear message, can retry
- [ ] Invalid email → validation works
- [ ] Network error → error message shown

### 8.2 Testing Environment

**Required:**
- MetaMask extension installed
- Arbitrum Sepolia RPC added to MetaMask
- Test ETH in wallet (get from faucet)
- iExec Web3Mail SDK loaded (no app registration needed for basic usage)

**Faucets:**
- Arbitrum Sepolia ETH: https://faucets.chain.link/arbitrum-sepolia
- Alternative: https://www.alchemy.com/faucets/arbitrum-sepolia

---

## 9. Deployment Strategy

### 9.1 Pre-Deployment Checklist

**Backend:**
- [ ] Backend wallet created and funded with testnet ETH
- [ ] `.env` configured with PRIVATE_KEY
- [ ] Dependencies installed (`npm install`)
- [ ] Backend tested locally
- [ ] No sensitive data committed to Git

**Frontend:**
- [ ] `CONFIG.API_URL` updated to production backend URL
- [ ] All code committed to Git
- [ ] README.md updated
- [ ] Documentation complete

### 9.2 Backend Deployment

#### Option 1: Railway (Recommended)
```bash
# 1. Push to GitHub
git add .
git commit -m "feat: backend proxy architecture"
git push

# 2. Go to railway.app
# 3. Create new project → Deploy from GitHub
# 4. Select backend directory as root
# 5. Add environment variables:
#    PORT=3001
#    PRIVATE_KEY=your_key
#    RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
#    NETWORK_ID=421614
# 6. Deploy!
```

#### Option 2: Render
1. Go to render.com
2. Create Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Deploy

#### Option 3: VPS
```bash
# SSH into VPS
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo>
cd backend
npm install

# Configure environment
nano .env

# Install PM2
sudo npm install -g pm2

# Start
pm2 start server.js --name iexec-backend
pm2 startup
pm2 save
```

### 9.3 Frontend Deployment (Vercel)

```bash
# 1. Update backend URL in js/logic.js
const CONFIG = {
  API_URL: 'https://your-backend-url.com',
  // ...
};

# 2. Commit changes
git add .
git commit -m "feat: update backend URL for production"
git push

# 3. Go to vercel.com
# 4. Import GitHub repository
# 5. Root Directory: . (root)
# 6. Deploy!
```

### 9.4 Post-Deployment Verification

**Backend:**
- [ ] Visit `https://your-backend-url.com/health`
- [ ] Verify wallet address in response
- [ ] Check backend logs
- [ ] Test API endpoints with curl

**Frontend:**
- [ ] Visit live URL
- [ ] Test MetaMask connection
- [ ] Complete full whitelist flow
- [ ] Verify email delivery
- [ ] Check browser console for errors
- [ ] Test on mobile device

**Integration:**
- [ ] Verify frontend → backend communication
- [ ] Check CORS headers
- [ ] Monitor backend logs during frontend testing

---

## 10. Future Enhancements (Post-PoC)

### 10.1 Phase 2 Features
- Replace alerts with elegant toast notifications
- Add animated loading spinners
- Implement form validation with visual feedback
- Add transaction progress indicators
- Create success page with confetti animation

### 10.2 Phase 3 Features
- Admin dashboard for whitelist management
- Export whitelist to CSV
- Email template customization
- Analytics tracking (Google Analytics)
- A/B testing different CTAs

### 10.3 Technical Improvements
- Migrate to TypeScript for type safety
- Add unit tests with Jest
- Implement E2E tests with Playwright
- Add CI/CD pipeline
- Implement error tracking (Sentry)
- Add performance monitoring

---

## 11. Development Commands Reference

```bash
# Local development (open with Live Server in VS Code)
# Right-click index.html → Open with Live Server

# Git commands
git status                          # Check status
git add .                           # Stage all changes
git commit -m "feat: description"   # Commit with message
git push                            # Push to GitHub

# Vercel commands (optional - auto-deploy works)
vercel                              # Deploy manually
vercel --prod                       # Deploy to production
```

---

## 12. Critical Notes & Warnings

⚠️ **IMPORTANT - DO NOT MODIFY:**
- Any Webflow CSS files
- webflow.js file
- Webflow data attributes in HTML

⚠️ **IMPORTANT - SECURITY:**
- Never commit private keys
- Never expose wallet mnemonics
- Keep iExec credentials secure
- Use environment variables for sensitive data in production

⚠️ **IMPORTANT - TESTING:**
- Always test on Arbitrum Sepolia testnet first
- Never test with real funds
- Verify email delivery before client demo

⚠️ **IMPORTANT - CLIENT DEMO:**
- Have test wallet ready with Arbitrum Sepolia ETH
- Test the full flow 30 minutes before demo
- Have backup plan if network is slow
- Prepare explanation of each step

---

## 13. Support & Resources

**iExec Documentation:**
- Official Docs: https://docs.iex.ec/
- Web3 Mail: https://docs.iex.ec/for-developers/web3mail
- Discord: https://discord.gg/iexec

**Ethers.js Documentation:**
- v5 Docs: https://docs.ethers.org/v5/

**MetaMask Documentation:**
- Developer Docs: https://docs.metamask.io/

**Arbitrum Documentation:**
- Arbitrum Sepolia Testnet: https://docs.arbitrum.io/for-devs/concepts/public-chains
- Network Details: https://chainlist.org/chain/421614

---

**Document Version:** 1.0.0  
**Last Updated:** November 6, 2025  
**Author:** Hugo Mendoza  
**Status:** Active Development

