# Development Plan - Step by Step Implementation Guide

**Objective:** Implement iExec Web3 Mail integration following a systematic, error-free approach

**Total Time Estimate:** ~30 minutes (setup + implementation + testing)

**Prerequisites:**
- ✅ Webflow export completed
- ✅ Documentation structure created (this file, ARCHITECTURE.md, etc.)
- ✅ Git initialized
- ✅ VS Code or Cursor open with project

---

## Phase 1: Environment Setup (5 minutes)

### Step 1.1: Verify Documentation Structure

Check that these files exist:
```bash
ls -la
# Should see:
# .cursorrules
# docs/ARCHITECTURE.md
# docs/DEVELOPMENT_PLAN.md (this file)
# README.md
# .gitignore
```

If any are missing, create them now.

### Step 1.2: Initialize Git (if not done)

```bash
cd /Users/hugomendoza/Desktop/iexec_work
git init
git add .
git commit -m "Initial commit: Webflow export + documentation structure"
```

### Step 1.3: Set Up Local Development

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens at `http://127.0.0.1:5500`

**Without Live Server:**
- Simply open `index.html` in Chrome
- Use browser refresh after each change

---

## Phase 2: Implementation with Cursor (15 minutes)

### 📋 PROMPT 1: Modify HTML Structure

**When to use:** After documentation is ready, before any coding

**Copy this exact prompt into Cursor:**

```
Following the .cursorrules file and docs/ARCHITECTURE.md section 4.1:

Please modify index.html to integrate the Web3 dependencies:

1. In the <head> section (before the </head> tag around line 19), add these CDN scripts:
   - Ethers.js v5: https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js
   - iExec SDK: https://unpkg.com/@iexec/web3mail@latest/dist/index.umd.js

2. Find the main CTA button (should be around line 137 with text "Get in Touch" or similar) and:
   - Change href from "/#contact" to "#"
   - Add id="joinWhitelistBtn"
   - Change button text to "Join Whitelist"
   - Keep all existing Webflow data attributes

3. Before the closing </body> tag (around line 187), add:
   - A script tag linking to "js/logic.js"

Show me the exact changes needed for each modification.
```

**Expected Output:** Cursor will show you the 3 specific edits for index.html

**Action After:** Review changes, apply them to index.html

---

### 📋 PROMPT 2: Create Logic File Structure

**When to use:** After HTML modifications are done

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 4.2:

Create the file js/logic.js with the following structure:

1. File header comment with:
   - Description: "iExec Web3 Mail Integration Logic"
   - Version: 1.0.0
   - Purpose: Handles wallet connection and Web3 Mail workflow

2. Configuration object (CONFIG) with:
   - APP_ADDRESS (placeholder: '0xYourAppAddressHere')
   - NETWORK_ID: 80001
   - NETWORK_NAME: 'Polygon Mumbai'
   - RPC_URL: 'https://rpc-mumbai.maticvigil.com/'
   - EMAIL_SUBJECT: 'Welcome to Quintes Whitelist'
   - EMAIL_CONTENT: HTML template with congratulations message

3. State management variables:
   - provider, signer, userAddress, web3mail (all initialized to null)

4. DOMContentLoaded event listener that:
   - Gets button by ID 'joinWhitelistBtn'
   - Adds click event listener
   - Logs initialization message

5. Empty async function handleJoinWhitelist(event) with:
   - event.preventDefault()
   - try-catch block structure
   - TODO comment for implementation

6. Empty helper function stubs (to be implemented next):
   - connectWallet()
   - initializeIExec()
   - protectUserEmail(email)
   - grantAppAccess(protectedData)
   - sendConfirmationEmail(protectedData)
   - isValidEmail(email)

Generate the complete js/logic.js file with this structure.
```

**Expected Output:** Complete logic.js file with structure but empty functions

**Action After:** Create js/logic.js with provided code

---

### 📋 PROMPT 3: Implement Wallet Connection

**When to use:** After logic.js structure is created

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 6.2:

In js/logic.js, implement the connectWallet() function with these requirements:

1. Check if window.ethereum exists:
   - If not, alert user to install MetaMask
   - Open MetaMask download page in new tab
   - Throw error to stop execution

2. Request accounts using eth_requestAccounts

3. Initialize ethers provider and signer

4. Store user address in userAddress variable

5. Check current network using provider.getNetwork()

6. If network is NOT Mumbai (chainId 80001):
   - Ask user via confirm() if they want to switch
   - If yes, call switchToMumbai() helper function
   - If no, throw error with message

7. Handle error cases:
   - User rejection (error.code === 4001): specific message
   - Other errors: generic message with error details

8. Return userAddress on success

Also implement the switchToMumbai() helper function that:
- Tries wallet_switchEthereumChain first
- If network not added (error.code === 4902), calls wallet_addEthereumChain
- Uses configuration from CONFIG object

Add proper JSDoc comments to both functions.
```

**Expected Output:** Fully implemented connectWallet() and switchToMumbai() functions

**Action After:** Update logic.js with provided implementation

---

### 📋 PROMPT 4: Implement iExec Initialization

**When to use:** After wallet connection is implemented

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 6.2:

In js/logic.js, implement the initializeIExec() function:

1. Initialize IExecWeb3Mail with ethers provider:
   web3mail = new IExecWeb3Mail(provider);

2. Store in global web3mail variable

3. Return web3mail instance

4. Wrap in try-catch:
   - Catch any errors
   - Throw new error with context: "Failed to initialize iExec: ${error.message}"

5. Add JSDoc comment explaining purpose and return value

Generate the complete function.
```

**Expected Output:** Implemented initializeIExec() function

**Action After:** Update logic.js

---

### 📋 PROMPT 5: Implement Data Protection

**When to use:** After iExec initialization is implemented

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 6.2 (Method 1):

In js/logic.js, implement the protectUserEmail(email) function:

1. Call web3mail.protectData() with:
   - data: { email: email }

2. Await the result

3. Return the protectedData object

4. Wrap in try-catch:
   - Throw error with context: "Failed to protect email: ${error.message}"

5. Add JSDoc comment with:
   - Purpose: Encrypts user email using iExec
   - @param {string} email - User's email address
   - @returns {Promise<Object>} Protected data object with address property

Generate the complete function.
```

**Expected Output:** Implemented protectUserEmail() function

**Action After:** Update logic.js

---

### 📋 PROMPT 6: Implement Access Granting

**When to use:** After protectUserEmail is implemented

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 6.2 (Method 2):

In js/logic.js, implement the grantAppAccess(protectedData) function:

1. Call web3mail.grantAccess() with:
   - protectedData: protectedData.address
   - authorizedApp: CONFIG.APP_ADDRESS
   - authorizedUser: userAddress (from global state)

2. Await completion (no return value needed)

3. Wrap in try-catch:
   - Throw error with context: "Failed to grant access: ${error.message}"

4. Add JSDoc comment with:
   - Purpose: Grants application access to encrypted data
   - @param {Object} protectedData - Protected data object from protectUserEmail
   - @returns {Promise<void>}

Generate the complete function.
```

**Expected Output:** Implemented grantAppAccess() function

**Action After:** Update logic.js

---

### 📋 PROMPT 7: Implement Email Sending

**When to use:** After grantAppAccess is implemented

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 6.2 (Method 4):

In js/logic.js, implement the sendConfirmationEmail(protectedData) function:

1. Call web3mail.sendEmail() with:
   - protectedData: protectedData.address
   - emailSubject: CONFIG.EMAIL_SUBJECT
   - emailContent: CONFIG.EMAIL_CONTENT

2. Await completion

3. Wrap in try-catch:
   - Throw error with context: "Failed to send email: ${error.message}"

4. Add JSDoc comment with:
   - Purpose: Sends confirmation email via Web3 Mail
   - @param {Object} protectedData - Protected data object
   - @returns {Promise<void>}

Generate the complete function.
```

**Expected Output:** Implemented sendConfirmationEmail() function

**Action After:** Update logic.js

---

### 📋 PROMPT 8: Implement Main Handler

**When to use:** After all helper functions are implemented

**Copy this exact prompt into Cursor:**

```
Following .cursorrules and docs/ARCHITECTURE.md section 5 (User Flow):

In js/logic.js, implement the handleJoinWhitelist(event) main handler:

1. event.preventDefault() at the start

2. Check if MetaMask exists first (before try block):
   - If not, alert and redirect to MetaMask download
   - Return early

3. Inside try block, execute these steps with alerts:

   Step 1:
   - alert('Step 1: Connecting to MetaMask...')
   - await connectWallet()
   - alert with shortened address: `Connected! ${address.substring(0,6)}...${address.substring(38)}`

   Step 2:
   - alert('Step 2: Initializing iExec Web3 Mail...')
   - await initializeIExec()
   - alert('✅ iExec initialized')

   Step 3:
   - prompt('Please enter your email address:')
   - Validate with isValidEmail()
   - If invalid, alert and return
   - alert('Step 3: Protecting your email data...')
   - await protectUserEmail()
   - alert('✅ Email protected')

   Step 4:
   - alert('Step 4: Granting access to application...')
   - await grantAppAccess()
   - alert('✅ Access granted')

   Step 5:
   - alert('Step 5: Sending confirmation email...')
   - await sendConfirmationEmail()
   - alert('🎉 SUCCESS! Check your email for confirmation.')

4. In catch block:
   - console.error('Error in whitelist process:', error)
   - alert with error details: `❌ Error: ${error.message}\n\nPlease try again...`

5. Add comprehensive JSDoc comment

Generate the complete function.
```

**Expected Output:** Fully implemented handleJoinWhitelist() function

**Action After:** Update logic.js

---

### 📋 PROMPT 9: Implement Email Validation

**When to use:** After main handler is implemented

**Copy this exact prompt into Cursor:**

```
In js/logic.js, implement the isValidEmail(email) validation function:

1. Use regex pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

2. Test the email against pattern

3. Return boolean result

4. Add JSDoc comment

Generate the complete function.
```

**Expected Output:** Implemented isValidEmail() function

**Action After:** Update logic.js

---

### 📋 PROMPT 10: Add Event Listeners

**When to use:** After all functions are implemented

**Copy this exact prompt into Cursor:**

```
In js/logic.js, at the bottom of the file, add MetaMask event listeners:

1. accountsChanged event:
   - Update userAddress variable
   - Log the change to console

2. chainChanged event:
   - Log the change
   - Reload the page: window.location.reload()

Use optional chaining: window.ethereum?.on(...)

Add comments explaining why we handle each event.
```

**Expected Output:** Event listener code

**Action After:** Add to bottom of logic.js

---

## Phase 3: Testing (10 minutes)

### Test 1: Basic Page Load
```
✓ Open index.html in browser
✓ Check console for "iExec integration initialized" message
✓ Check for any errors in console
✓ Verify button says "Join Whitelist"
```

### Test 2: MetaMask Detection
```
✓ Click "Join Whitelist" button
✓ If MetaMask not installed: should show install prompt
✓ If MetaMask installed: should show connection request
```

### Test 3: Wallet Connection
```
✓ Approve MetaMask connection
✓ Alert shows "Connected! 0x..."
✓ Check console for provider initialization
```

### Test 4: Network Check
```
✓ If on wrong network: prompt to switch appears
✓ Approve network switch in MetaMask
✓ Mumbai network is added/switched successfully
```

### Test 5: Full Flow (Requires iExec Setup)
```
⚠️ Note: This requires APP_ADDRESS from iExec dashboard

✓ Complete wallet connection
✓ Enter test email
✓ All 5 steps complete without errors
✓ Final success message appears
✓ Check email inbox for confirmation
```

### Test 6: Error Scenarios
```
✓ Reject MetaMask connection → shows error, can retry
✓ Enter invalid email → validation works
✓ Reject transaction → error message shown
```

---

## Phase 4: iExec Configuration (5 minutes)

### Step 4.1: Get iExec App Address

1. Go to: https://protocol.iex.ec/
2. Connect your wallet
3. Navigate to "My Apps" or similar
4. Create new app or use existing
5. Copy your app's Ethereum address

### Step 4.2: Update Configuration

In `js/logic.js`, replace:
```javascript
APP_ADDRESS: '0xYourAppAddressHere',
```

With your actual address:
```javascript
APP_ADDRESS: '0xActualAddressFromIExecDashboard',
```

### Step 4.3: Test with Real iExec

Now test the complete flow with actual Web3 Mail delivery.

---

## Phase 5: Git Commit & Push (5 minutes)

### Step 5.1: Review Changes
```bash
git status
git diff
```

### Step 5.2: Commit Implementation
```bash
git add .
git commit -m "feat: implement iExec Web3 Mail integration

- Add Ethers.js and iExec SDK via CDN
- Implement wallet connection with MetaMask
- Add network switching to Mumbai
- Integrate iExec Web3 Mail workflow
- Add comprehensive error handling
- Implement user feedback via alerts"
```

### Step 5.3: Create GitHub Repository

1. Go to github.com
2. Click "New Repository"
3. Name: `quintes-whitelist-poc`
4. Description: "iExec Web3 Mail integration PoC for Quintes Protocol"
5. Keep public
6. Don't initialize with README (we have one)
7. Create repository

### Step 5.4: Push to GitHub
```bash
git remote add origin https://github.com/yourusername/quintes-whitelist-poc.git
git branch -M main
git push -u origin main
```

---

## Phase 6: Deployment to Vercel (5 minutes)

### Step 6.1: Connect Vercel to GitHub

1. Go to vercel.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Import `quintes-whitelist-poc` repository
5. Vercel auto-detects static site
6. Click "Deploy"

### Step 6.2: Wait for Deployment

- Build time: ~30 seconds
- Status updates appear in real-time

### Step 6.3: Get Live URL

After deployment:
- URL format: `https://quintes-whitelist-poc.vercel.app`
- Copy this URL for client delivery

### Step 6.4: Test Live Site

1. Visit live URL
2. Test MetaMask connection
3. Test complete flow
4. Verify on mobile device

---

## Phase 7: Client Delivery (5 minutes)

### Step 7.1: Prepare Delivery Message

Use template from `docs/DELIVERY_MESSAGE.md`

Update with your URLs:
- Live Demo: Your Vercel URL
- Source Code: Your GitHub URL

### Step 7.2: Send to Client

Copy message from template, paste into Upwork (or your communication platform)

### Step 7.3: Prepare for Demo Call

- Test flow one more time
- Have test wallet ready with Mumbai MATIC
- Prepare to explain architecture
- Have ARCHITECTURE.md open for reference

---

## Troubleshooting Guide

### Issue: Button doesn't respond
**Solution:** 
- Check console for errors
- Verify button ID is correct
- Check logic.js is loaded

### Issue: MetaMask doesn't open
**Solution:**
- Verify MetaMask is installed
- Check browser console for connection errors
- Try refreshing page

### Issue: "IExecWeb3Mail is not defined"
**Solution:**
- Verify CDN script is in HTML
- Check network tab: SDK should load
- Check script order (iExec after Ethers)

### Issue: Transaction fails
**Solution:**
- Check Mumbai MATIC balance
- Verify correct network
- Check APP_ADDRESS is configured
- Review iExec dashboard for app status

### Issue: Email not received
**Solution:**
- Verify APP_ADDRESS is correct
- Check all steps completed without error
- Wait a few minutes (can be delayed)
- Check spam folder
- Verify email address used

---

## Success Checklist

Before considering the project complete:

- [ ] All documentation files created
- [ ] HTML modifications applied
- [ ] logic.js fully implemented
- [ ] Local testing passed
- [ ] iExec APP_ADDRESS configured
- [ ] Email delivery verified
- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Live site tested
- [ ] Mobile testing completed
- [ ] Delivery message sent to client
- [ ] Demo preparation complete

---

## Next Steps After PoC

Once client approves:

1. **Phase 2 Planning:**
   - Replace alerts with proper UI
   - Add loading states
   - Implement form validation
   - Design success page

2. **Technical Improvements:**
   - Add TypeScript
   - Implement testing
   - Add error tracking
   - Set up CI/CD

3. **Business Features:**
   - Admin dashboard
   - Whitelist export
   - Analytics integration
   - Email template editor

---

**Document Version:** 1.0.0  
**Last Updated:** November 6, 2025  
**Estimated Total Time:** 30-45 minutes for complete implementation

