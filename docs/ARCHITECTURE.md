# iExec Web3 Mail Integration - Technical Architecture

## 1. Project Overview

**Client:** Quintes Protocol (Rand)  
**Project Type:** Proof of Concept (PoC)  
**Objective:** Integrate iExec Web3 Mail functionality into a Webflow landing page to demonstrate secure whitelist management  
**Timeline:** Sprint delivery (2-3 days)  
**Status:** In Development  
**Developer:** Hugo Mendoza

### 1.1 Business Requirements
- User must be able to connect their Web3 wallet (MetaMask)
- User email must be encrypted and protected using iExec technology
- System must send automated confirmation email via Web3 Mail protocol
- Landing page must be production-ready and professional
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

### 2.1 Tech Stack

| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| Frontend Framework | Webflow Export | N/A | Speed of delivery, professional design, no framework overhead |
| Web3 Library | Ethers.js | v5.7.2 | Industry standard, excellent MetaMask support, stable API |
| iExec SDK | @iexec/web3mail | Latest | Core requirement for Web3 Mail functionality |
| JavaScript | Vanilla JS | ES6+ | No build step, simple deployment, fast iteration |
| Deployment Platform | Vercel | N/A | Zero-config, instant deploy, free tier, CDN included |
| Version Control | Git + GitHub | N/A | Industry standard, required for Vercel |
| Package Manager | None (CDN) | N/A | Simplifies deployment, no build process needed |

### 2.2 Architecture Decisions

#### Why Vanilla JavaScript?
- **Speed:** No build process, no bundler configuration
- **Simplicity:** Direct browser execution, easy debugging
- **Deployment:** Upload and go, no compilation step
- **Client Understanding:** Easy to audit and understand

#### Why CDN Loading?
- **No Dependencies:** No package.json, no node_modules
- **Fast Loading:** Cached across sites, global CDN
- **Version Control:** Explicit version pinning in HTML
- **Simplicity:** Works with any web server

#### Why Vercel?
- **Zero Config:** Automatic detection of static sites
- **Free Tier:** Perfect for PoC, no credit card needed
- **GitHub Integration:** Auto-deploy on push
- **Custom Domains:** Professional URLs available

---

## 3. File Structure

```
iexec_work/
├── .cursorrules                    # Project rules for AI/developer
├── .gitignore                      # Git ignore patterns
├── README.md                       # Public project documentation
│
├── docs/                           # Technical documentation
│   ├── ARCHITECTURE.md             # This file (technical blueprint)
│   ├── IEXEC_WEB3MAIL_DOCS.md     # iExec API reference
│   ├── DEVELOPMENT_PLAN.md         # Step-by-step implementation guide
│   └── DELIVERY_MESSAGE.md         # Client delivery template
│
├── index.html                      # Main landing page (Webflow export + modifications)
│
├── css/                            # Webflow styles (DO NOT MODIFY)
│   ├── hugos-stupendous-site-cdb0c4.webflow.css
│   ├── normalize.css
│   └── webflow.css
│
├── js/                             # JavaScript files
│   ├── webflow.js                  # Webflow core (DO NOT MODIFY)
│   └── logic.js                    # NEW: Our iExec integration logic
│
├── images/                         # Image assets (untouched)
└── fonts/                          # Font files (untouched)
```

---

## 4. Integration Points

### 4.1 HTML Modifications (`index.html`)

**Location 1: CDN Scripts in `<head>`**
```html
<!-- Add before </head> tag (around line 19) -->
<head>
  <!-- ... existing Webflow tags ... -->
  
  <!-- Web3 Dependencies -->
  <script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js" type="text/javascript"></script>
  <script src="https://unpkg.com/@iexec/web3mail@latest/dist/index.umd.js" type="text/javascript"></script>
</head>
```

**Location 2: Main CTA Button**
```html
<!-- Modify existing button (around line 137) to add ID -->
<a data-w-id="800bf7d3-688d-8ca9-ce22-a1a04b064972" 
   style="opacity:0" 
   href="#" 
   id="joinWhitelistBtn" 
   class="primary-button w-button">
   Join Whitelist
</a>
```

**Location 3: Logic Script Reference**
```html
<!-- Add before </body> tag (around line 187) -->
  <script src="js/logic.js" type="text/javascript"></script>
</body>
```

### 4.2 Logic Implementation (`js/logic.js`)

**File Structure:**
```javascript
// 1. Configuration object
const CONFIG = { ... };

// 2. State management
let provider = null;
let signer = null;
let userAddress = null;
let web3mail = null;

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => { ... });

// 4. Main handler
async function handleJoinWhitelist(event) { ... }

// 5. Helper functions
async function connectWallet() { ... }
async function initializeIExec() { ... }
async function protectUserEmail(email) { ... }
async function grantAppAccess(protectedData) { ... }
async function sendConfirmationEmail(protectedData) { ... }

// 6. Utility functions
function isValidEmail(email) { ... }

// 7. Event listeners
window.ethereum?.on('accountsChanged', ...) { ... }
window.ethereum?.on('chainChanged', ...) { ... }
```

---

## 5. User Flow (Detailed)

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
            │   Check MetaMask Installed    │
            └───────────┬───────────────────┘
                        │
                ┌───────┴────────┐
                │                │
            NO  │                │  YES
                │                │
                ▼                ▼
        ┌────────────┐   ┌──────────────────┐
        │   Alert:   │   │ Request Account  │
        │  Install   │   │   Connection     │
        │  MetaMask  │   └────────┬─────────┘
        └────────────┘            │
                                  ▼
                    ┌──────────────────────────┐
                    │ User Approves in MetaMask│
                    └──────────┬───────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Check Network       │
                    │  (Arbitrum Sepolia?) │
                    └──────┬───────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                WRONG│             │CORRECT
                    │             │
                    ▼             ▼
            ┌───────────────┐  ┌────────────────┐
            │ Prompt Switch │  │ Alert: Step 1  │
            │  to Sepolia   │  │   Connected!   │
            └───────┬───────┘  └────────┬───────┘
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │ Alert: Step 2            │
                │ Initialize iExec SDK     │
                └──────────┬───────────────┘
                           │
                           ▼
                ┌──────────────────────────┐
                │ Prompt: Enter Email      │
                └──────────┬───────────────┘
                           │
                           ▼
                ┌──────────────────────────┐
                │ Validate Email Format    │
                └──────────┬───────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                INVALID│           │VALID
                    │             │
                    ▼             ▼
            ┌──────────────┐  ┌──────────────────┐
            │ Alert: Try   │  │ Alert: Step 3    │
            │    Again     │  │ Protecting Data  │
            └──────────────┘  └────────┬─────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ iExec: protectData() │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ Alert: Step 4        │
                            │ Granting Access      │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ iExec: grantAccess() │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ Alert: Step 5        │
                            │ Sending Email        │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ iExec: sendEmail()   │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ Alert: SUCCESS! 🎉   │
                            │ Check Your Email     │
                            └──────────────────────┘
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
- [ ] All code is committed to Git
- [ ] .gitignore is configured (no sensitive data)
- [ ] README.md is complete
- [ ] All documentation is up to date
- [ ] Local testing is complete
- [ ] iExec app address is configured

### 9.2 Git Workflow
```bash
# Initialize repo (if not done)
git init

# Add all files
git add .

# Commit with semantic message
git commit -m "feat: implement iExec Web3 Mail integration"

# Create GitHub repository and link
git remote add origin https://github.com/yourusername/quintes-poc.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 9.3 Vercel Deployment
1. Go to vercel.com and sign in with GitHub
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects static site
5. Click "Deploy"
6. Wait ~30 seconds
7. Get live URL: `https://your-project.vercel.app`

### 9.4 Post-Deployment Verification
- [ ] Visit live URL
- [ ] Test MetaMask connection on live site
- [ ] Test full flow on live site
- [ ] Verify email delivery
- [ ] Check console for errors
- [ ] Test on mobile device

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

