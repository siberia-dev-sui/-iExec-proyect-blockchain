# iExec Web3 Mail Backend

Backend proxy service for handling iExec Web3 Mail operations.

## 📋 Overview

This backend serves as a proxy between the frontend and iExec SDK, allowing the HTML to remain static while the backend handles all blockchain interactions.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PORT=3001
PRIVATE_KEY=your_backend_wallet_private_key_here
RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
NETWORK_ID=421614
EMAIL_SUBJECT=Welcome to Quintes Protocol Whitelist
```

**⚠️ IMPORTANT:** Create a new wallet specifically for this backend service. DO NOT use your personal wallet.

### 3. Get Testnet ETH

Your backend wallet needs ETH on Arbitrum Sepolia testnet for gas fees:

- https://faucets.chain.link/arbitrum-sepolia
- https://www.alchemy.com/faucets/arbitrum-sepolia

### 4. Start the Server

Development mode (auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on http://localhost:3001

## 📡 API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T10:00:00.000Z",
  "service": "iExec Web3 Mail Backend",
  "wallet": "0x..."
}
```

### Protect Email
```
POST /api/protect-email
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "protectedDataAddress": "0x...",
  "txHash": "0x..."
}
```

### Grant Access
```
POST /api/grant-access
Content-Type: application/json

{
  "protectedDataAddress": "0x...",
  "userAddress": "0x..."
}
```

Response:
```json
{
  "success": true,
  "txHash": "0x..."
}
```

### Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "protectedDataAddress": "0x..."
}
```

Response:
```json
{
  "success": true,
  "taskId": "0x..."
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| PRIVATE_KEY | Backend wallet private key | Required |
| RPC_URL | Arbitrum Sepolia RPC | https://sepolia-rollup.arbitrum.io/rpc |
| NETWORK_ID | Chain ID | 421614 |
| EMAIL_SUBJECT | Email subject line | Welcome to Quintes Protocol Whitelist |
| FRONTEND_URL | CORS allowed origin | * |

### CORS Configuration

For production, set `FRONTEND_URL` to your frontend domain:

```env
FRONTEND_URL=https://your-frontend-domain.com
```

## 🛡️ Security

### Best Practices

1. **Dedicated Wallet:** Create a new wallet specifically for this backend
2. **Private Key Security:** Never commit `.env` file to Git
3. **Rate Limiting:** Implement rate limiting for production (not included in PoC)
4. **CORS:** Set specific frontend domain in production
5. **Testnet First:** Always test on Arbitrum Sepolia before mainnet

### Backend Wallet Setup

```bash
# Generate new wallet (using ethers.js)
node -e "const {Wallet} = require('ethers'); const w = Wallet.createRandom(); console.log('Address:', w.address); console.log('Private Key:', w.privateKey);"
```

## 📦 Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **dotenv** - Environment variable management
- **ethers** - Ethereum library
- **@iexec/web3mail** - iExec Web3 Mail SDK

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Endpoint not found
- `500` - Internal Server Error

## 🧪 Testing

### Manual Testing with curl

Health check:
```bash
curl http://localhost:3001/health
```

Protect email:
```bash
curl -X POST http://localhost:3001/api/protect-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 📝 Logs

The server logs all requests and important events:

```
[2025-11-07T10:00:00.000Z] POST /api/protect-email
🔒 Protecting email: test@example.com
✅ Email protected: 0x...
```

## 🔄 Development Workflow

1. Make changes to `server.js`
2. Server auto-restarts (using `--watch` flag)
3. Test endpoints with curl or frontend
4. Check console logs for errors
5. Commit changes

## 🚀 Deployment

### Option 1: Railway

1. Push to GitHub
2. Import project on Railway
3. Add environment variables
4. Deploy

### Option 2: Render

1. Push to GitHub
2. Create Web Service on Render
3. Add environment variables
4. Deploy

### Option 3: VPS (Ubuntu)

```bash
# Clone repo
git clone <your-repo>
cd backend

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Setup .env file
nano .env

# Install PM2 for process management
sudo npm install -g pm2

# Start server
pm2 start server.js --name iexec-backend

# Auto-start on reboot
pm2 startup
pm2 save
```

## 📚 Additional Resources

- [iExec Docs](https://docs.iex.ec/)
- [Express.js Docs](https://expressjs.com/)
- [Ethers.js Docs](https://docs.ethers.org/v5/)

## 🐛 Troubleshooting

### "PRIVATE_KEY not set"
- Create `.env` file with PRIVATE_KEY

### "Insufficient funds"
- Get testnet ETH from faucet

### "Network error"
- Check RPC_URL is correct
- Verify internet connection

### "Port already in use"
- Change PORT in `.env`
- Kill process: `lsof -ti:3001 | xargs kill`

---

**Version:** 1.0.0  
**Author:** Hugo Mendoza  
**License:** MIT

