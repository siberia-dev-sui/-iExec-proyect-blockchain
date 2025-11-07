# Testing Guide - Backend Proxy Architecture

## 🧪 Quick Testing Guide

### Step 1: Setup Backend Wallet

1. **Create a new wallet** (dedicated for backend use):

```bash
node -e "const {Wallet} = require('ethers'); const w = Wallet.createRandom(); console.log('Address:', w.address); console.log('Private Key:', w.privateKey);"
```

2. **Fund the wallet** with Arbitrum Sepolia testnet ETH:
   - https://faucets.chain.link/arbitrum-sepolia
   - https://www.alchemy.com/faucets/arbitrum-sepolia

### Step 2: Configure Backend

1. Create `.env` file in `backend/` directory:

```bash
cd backend
cp .env.example .env
nano .env  # Edit with your configuration
```

2. Add your backend wallet private key:

```env
PORT=3001
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
NETWORK_ID=421614
EMAIL_SUBJECT=Welcome to Quintes Protocol Whitelist
FRONTEND_URL=*
```

### Step 3: Start Backend

```bash
cd backend
npm start
```

Expected output:
```
🚀 ========================================
🚀 iExec Web3 Mail Backend is RUNNING
🚀 ========================================
📡 Server: http://localhost:3001
💳 Wallet: 0x...
🌐 Network: Arbitrum Sepolia (421614)
🚀 ========================================
```

### Step 4: Test Backend API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T...",
  "service": "iExec Web3 Mail Backend",
  "wallet": "0x..."
}
```

### Step 5: Open Frontend

1. Open `index.html` in your browser using Live Server or similar
2. Open browser console (F12) to see logs

### Step 6: Test Complete Flow

1. Click "Join Whitelist" button
2. Approve MetaMask connection
3. Switch to Arbitrum Sepolia if prompted
4. Enter your email address
5. Wait for confirmation (each step will show an alert)
6. Check your email inbox for confirmation

### Expected Flow

```
✅ Step 1: Wallet connected
✅ Step 2: Email provided
✅ Step 3: Email encrypted (backend logs will show API call)
✅ Step 4: Access granted (backend logs will show API call)
✅ Step 5: Email sent (backend logs will show API call)
🎉 SUCCESS: Check your email!
```

### Monitoring

**Backend Terminal:**
Watch for API calls:
```
[2025-11-07T...] POST /api/protect-email
🔒 Protecting email: user@example.com
✅ Email protected: 0x...
```

**Browser Console:**
Watch for frontend logs:
```
🎯 Join Whitelist clicked
📍 Step 1: Connecting wallet...
✅ Step 1 complete: Wallet connected
📍 Step 2: Requesting email...
...
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** "PRIVATE_KEY not set"
- **Fix:** Create `.env` file with your private key

**Error:** "Insufficient funds"
- **Fix:** Get testnet ETH from faucet

**Error:** "Port already in use"
- **Fix:** Kill process: `lsof -ti:3001 | xargs kill`

### Frontend can't connect to backend

**Error:** "Cannot connect to backend service"
- **Fix:** Verify backend is running on port 3001
- **Fix:** Check `CONFIG.API_URL` in `js/logic.js`

**Error:** CORS error in browser console
- **Fix:** Verify `FRONTEND_URL=*` in backend `.env`

### MetaMask issues

**Error:** "MetaMask not detected"
- **Fix:** Install MetaMask extension and refresh page

**Error:** "Wrong network"
- **Fix:** Switch to Arbitrum Sepolia in MetaMask

---

## ✅ Test Checklist

- [ ] Backend starts without errors
- [ ] Health endpoint responds
- [ ] Frontend opens in browser
- [ ] MetaMask connects
- [ ] Network switches to Arbitrum Sepolia
- [ ] Email encryption works (check backend logs)
- [ ] Access grant works (check backend logs)
- [ ] Email sending works (check backend logs)
- [ ] Confirmation email received

---

## 📊 Success Indicators

**Backend Console:**
```
✅ Wallet connected: 0x...
✅ iExec Web3Mail SDK initialized
🔒 Protecting email: user@example.com
✅ Email protected: 0x...
🔑 Granting access...
✅ Access granted
📨 Sending email to: 0x...
✅ Email sent successfully
```

**Browser Console:**
```
✅ Frontend initialized successfully
🎯 Join Whitelist clicked
✅ Step 1 complete: Wallet connected
✅ Step 2 complete: Email provided
✅ Step 3 complete: Data protected
✅ Step 4 complete: Access granted
✅ Step 5 complete: Email sent
🎉 COMPLETE: User successfully added to whitelist
```

---

## 🚀 Ready for Production?

Once local testing is successful:

1. ✅ Backend works locally
2. ✅ Frontend works locally
3. ✅ Email delivery confirmed
4. Deploy backend to Railway/Render
5. Update `CONFIG.API_URL` in frontend
6. Deploy frontend to Vercel
7. Test live deployment

---

**Happy Testing!** 🎉

