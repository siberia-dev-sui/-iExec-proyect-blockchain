/**
 * iExec Web3 Mail Backend Proxy
 * Version: 1.0.0
 * Purpose: Backend API for handling iExec Web3 Mail operations
 * 
 * This backend serves as a proxy between the frontend and iExec SDK,
 * allowing the HTML to remain static while the backend handles all
 * blockchain interactions.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { IExecWeb3mail } from '@iexec/web3mail';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Enable CORS for frontend (adjust origin in production)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // In production, set specific domain
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// BLOCKCHAIN SETUP
// ============================================================================

let provider;
let wallet;
let web3mail;

/**
 * Initialize blockchain provider and iExec SDK
 */
async function initializeBlockchain() {
  try {
    console.log('🔧 Initializing blockchain connection...');
    
    // Connect to Arbitrum Sepolia
    provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'https://sepolia-rollup.arbitrum.io/rpc'
    );
    
    // Create wallet from private key
    if (!process.env.PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY not set in environment variables');
    }
    
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log('✅ Wallet connected:', wallet.address);
    
    // Check network
    const network = await provider.getNetwork();
    console.log('🌐 Network:', network.name, '(ChainID:', network.chainId + ')');
    
    if (network.chainId !== parseInt(process.env.NETWORK_ID || '421614')) {
      console.warn('⚠️  Warning: Connected to unexpected network');
    }
    
    // Initialize iExec Web3Mail SDK
    web3mail = new IExecWeb3mail(wallet);
    console.log('✅ iExec Web3Mail SDK initialized');
    
    return true;
  } catch (error) {
    console.error('❌ Blockchain initialization failed:', error);
    throw error;
  }
}

// ============================================================================
// API ROUTES
// ============================================================================

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'iExec Web3 Mail Backend',
    wallet: wallet?.address || 'not initialized'
  });
});

/**
 * POST /api/protect-email
 * Encrypts user email using iExec
 * 
 * Body:
 * {
 *   "email": "user@example.com"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "protectedDataAddress": "0x...",
 *   "txHash": "0x..."
 * }
 */
app.post('/api/protect-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }
    
    console.log('🔒 Protecting email:', email);
    
    // Call iExec SDK
    const protectedData = await web3mail.protectData({
      data: { email: email }
    });
    
    console.log('✅ Email protected:', protectedData.address);
    
    res.json({
      success: true,
      protectedDataAddress: protectedData.address,
      txHash: protectedData.txHash || null
    });
    
  } catch (error) {
    console.error('❌ Protect email error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to protect email'
    });
  }
});

/**
 * POST /api/grant-access
 * Grants application access to protected data
 * 
 * Body:
 * {
 *   "protectedDataAddress": "0x...",
 *   "userAddress": "0x..."
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "txHash": "0x..."
 * }
 */
app.post('/api/grant-access', async (req, res) => {
  try {
    const { protectedDataAddress, userAddress } = req.body;
    
    // Validation
    if (!protectedDataAddress || !ethers.utils.isAddress(protectedDataAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid protected data address'
      });
    }
    
    if (!userAddress || !ethers.utils.isAddress(userAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user address'
      });
    }
    
    console.log('🔑 Granting access...');
    console.log('   Protected data:', protectedDataAddress);
    console.log('   User:', userAddress);
    
    // Grant access using iExec default whitelist
    const result = await web3mail.grantAccess({
      protectedData: protectedDataAddress,
      authorizedUser: userAddress
    });
    
    console.log('✅ Access granted');
    
    res.json({
      success: true,
      txHash: result?.txHash || null
    });
    
  } catch (error) {
    console.error('❌ Grant access error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to grant access'
    });
  }
});

/**
 * POST /api/send-email
 * Sends confirmation email via Web3 Mail
 * 
 * Body:
 * {
 *   "protectedDataAddress": "0x..."
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "taskId": "0x..."
 * }
 */
app.post('/api/send-email', async (req, res) => {
  try {
    const { protectedDataAddress } = req.body;
    
    // Validation
    if (!protectedDataAddress || !ethers.utils.isAddress(protectedDataAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid protected data address'
      });
    }
    
    console.log('📨 Sending email to:', protectedDataAddress);
    
    // Email content (HTML)
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #CDFA50; font-size: 32px; margin-bottom: 20px;">
              🎉 Welcome to Quintes Protocol!
            </h1>
            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
              Congratulations! Your spot on the Quintes Protocol whitelist is secured.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              You're now among the first to experience the next generation of Web3 communication 
              powered by iExec's decentralized email technology.
            </p>
            <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px solid #CDFA50;">
              <p style="margin: 0; font-size: 14px; color: #CDFA50;">
                <strong>What's Next?</strong>
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                We'll keep you updated on our launch. Stay tuned for exciting announcements!
              </p>
            </div>
            <p style="font-size: 14px; color: #888; margin-top: 40px;">
              This email was sent via Web3 Mail - decentralized, encrypted, and secure.
            </p>
          </div>
        </body>
      </html>
    `;
    
    // Send email via iExec
    const result = await web3mail.sendEmail({
      protectedData: protectedDataAddress,
      emailSubject: process.env.EMAIL_SUBJECT || 'Welcome to Quintes Protocol Whitelist',
      emailContent: emailContent
    });
    
    console.log('✅ Email sent successfully');
    
    res.json({
      success: true,
      taskId: result?.taskId || null
    });
    
  } catch (error) {
    console.error('❌ Send email error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// ============================================================================
// START SERVER
// ============================================================================

async function startServer() {
  try {
    // Initialize blockchain before starting server
    await initializeBlockchain();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log('🚀 iExec Web3 Mail Backend is RUNNING');
      console.log('🚀 ========================================');
      console.log(`📡 Server: http://localhost:${PORT}`);
      console.log(`💳 Wallet: ${wallet.address}`);
      console.log(`🌐 Network: Arbitrum Sepolia (${process.env.NETWORK_ID})`);
      console.log('🚀 ========================================');
      console.log('');
      console.log('📋 Available Endpoints:');
      console.log('   GET  /health             - Health check');
      console.log('   POST /api/protect-email  - Encrypt email');
      console.log('   POST /api/grant-access   - Grant app access');
      console.log('   POST /api/send-email     - Send confirmation');
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

