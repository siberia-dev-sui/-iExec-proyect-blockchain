/**
 * Quintes Protocol - iExec Web3 Mail Integration
 * Version: 2.0.0 - Frontend-Only Architecture (Correct SDK Usage)
 * 
 * Flow: Connect Wallet → Protect Email (DataProtector) → Grant Access → Send Email (Web3Mail)
 */

import { IExecDataProtector } from '@iexec/dataprotector';
import { IExecWeb3mail } from '@iexec/web3mail';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Network configuration
  NETWORK_ID: 421614,
  NETWORK_NAME: 'Arbitrum Sepolia',
  NETWORK_HEX: '0x66eee',
  RPC_URL: 'https://sepolia-rollup.arbitrum.io/rpc',
  BLOCK_EXPLORER: 'https://sepolia.arbiscan.io/',
  
  // iExec Configuration
  // Note: For production, you'll need to get an authorized app address from iExec dashboard
  // For this PoC, we'll use the user's own address as the authorized entity
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let userAddress = null;
let protectedDataAddress = null;
let dataProtector = null;
let web3mail = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('🚀 Quintes Protocol - iExec Web3 Mail Integration v2.0');
console.log('📋 Frontend-Only Architecture (Correct SDK Usage)');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, initializing...');
  
  // Get both buttons
  const navbarButton = document.getElementById('joinWhitelistBtn');
  const heroButton = document.getElementById('joinWhitelistBtnHero');
  
  if (navbarButton) {
    navbarButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Navbar button connected');
  }
  
  if (heroButton) {
    heroButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Hero button connected');
  }
  
  console.log('✨ Application ready!');
});

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Main handler for Join Whitelist button
 */
async function handleJoinWhitelist(event) {
  event.preventDefault();
  console.log('🎯 Join Whitelist clicked');
  
  // Check MetaMask
  if (!window.ethereum) {
    alert('MetaMask is not installed.\n\nPlease install MetaMask to continue.\n\nYou will be redirected to the download page.');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  
  try {
    // STEP 1: Connect Wallet
    console.log('📍 Step 1: Connecting wallet...');
    alert('🔐 STEP 1: Connect Your Wallet\n\n✓ This only reads your wallet address\n✓ Your funds are safe\n\nApprove the connection in MetaMask.');
    await connectWallet();
    alert(`✅ Connected!\n\nAddress: ${userAddress.substring(0, 6)}...${userAddress.substring(38)}`);
    console.log('✅ Step 1 complete');
    
    // STEP 2: Get email
    console.log('📍 Step 2: Requesting email...');
    const userEmail = prompt('Enter your email address to join the whitelist:');
    
    if (!userEmail || !isValidEmail(userEmail)) {
      alert('Invalid email. Please try again.');
      return;
    }
    
    console.log('📧 Email provided:', userEmail);
    
    // STEP 3: Protect email data
    console.log('📍 Step 3: Protecting email data...');
    alert('🔒 STEP 2: Encrypt Your Email\n\n✓ Your email will be encrypted\n✓ Only authorized apps can access it\n\nThis may take 30-60 seconds...');
    protectedDataAddress = await protectEmailData(userEmail);
    alert(`✅ Email Encrypted!\n\nProtected data address:\n${protectedDataAddress.substring(0, 10)}...${protectedDataAddress.substring(38)}`);
    console.log('✅ Step 3 complete');
    
    // STEP 4: Grant access (to yourself for this PoC)
    console.log('📍 Step 4: Granting access...');
    alert('✉️ STEP 3: Grant Access\n\n✓ Authorizing email access\n✓ This enables Web3 Mail delivery\n\nApprove the transaction...');
    await grantAccess();
    alert('✅ Access Granted!');
    console.log('✅ Step 4 complete');
    
    // STEP 5: Send confirmation email
    console.log('📍 Step 5: Sending confirmation email...');
    alert('📨 STEP 4: Send Confirmation\n\n✓ Sending welcome email via Web3 Mail\n\nThis may take 1-2 minutes...');
    await sendConfirmationEmail();
    alert('🎉 SUCCESS!\n\n✅ You\'re on the whitelist!\n📧 Check your email in 1-2 minutes\n\nWelcome to Quintes Protocol!');
    console.log('✅ Step 5 complete');
    console.log('🎉 COMPLETE: User successfully added to whitelist');
    
  } catch (error) {
    console.error('❌ Error:', error);
    
    if (error.code === 4001) {
      alert('❌ Transaction Rejected\n\nYou rejected the transaction in MetaMask.');
    } else if (error.message && error.message.includes('network')) {
      alert('❌ Network Error\n\nPlease check your connection and try again.');
    } else {
      alert(`❌ Error:\n\n${error.message}\n\nPlease try again or contact support.`);
    }
  }
}

// ============================================================================
// WALLET CONNECTION
// ============================================================================

/**
 * Connects to MetaMask wallet
 */
async function connectWallet() {
  try {
    console.log('🔌 Requesting wallet connection...');
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    userAddress = accounts[0];
    console.log('✅ Wallet connected:', userAddress);
    
    // Check network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    if (currentChainId !== CONFIG.NETWORK_ID) {
      console.log('⚠️ Wrong network, switching...');
      await switchToArbitrumSepolia();
    }
    
    // Initialize iExec SDKs
    dataProtector = new IExecDataProtector(window.ethereum);
    web3mail = new IExecWeb3mail(window.ethereum);
    console.log('✅ iExec SDKs initialized');
    
    return userAddress;
    
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    throw error;
  }
}

/**
 * Switches to Arbitrum Sepolia testnet
 */
async function switchToArbitrumSepolia() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CONFIG.NETWORK_HEX }],
    });
    console.log('✅ Switched to Arbitrum Sepolia');
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CONFIG.NETWORK_HEX,
          chainName: CONFIG.NETWORK_NAME,
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: [CONFIG.RPC_URL],
          blockExplorerUrls: [CONFIG.BLOCK_EXPLORER]
        }]
      });
      console.log('✅ Arbitrum Sepolia network added');
    } else {
      throw error;
    }
  }
}

// ============================================================================
// iExec DATA PROTECTOR METHODS
// ============================================================================

/**
 * Protects user email using iExec DataProtector
 */
async function protectEmailData(email) {
  try {
    console.log('🔒 Protecting email with DataProtector...');
    
    // Use DataProtector Core to protect the email
    const protectedData = await dataProtector.core.protectData({
      data: { email: email },
      name: `Quintes Whitelist - ${email}`
    });
    
    console.log('✅ Email protected:', protectedData.address);
    return protectedData.address;
    
  } catch (error) {
    console.error('❌ Protect email error:', error);
    throw new Error(`Failed to protect email: ${error.message}`);
  }
}

/**
 * Grants access to protected data
 */
async function grantAccess() {
  try {
    console.log('🔑 Granting access to protected data...');
    
    // Grant access to the user's own address (for this PoC)
    // In production, you'd grant to an authorized app address
    await dataProtector.core.grantAccess({
      protectedData: protectedDataAddress,
      authorizedUser: userAddress,
      authorizedApp: userAddress, // Using user's address for PoC
    });
    
    console.log('✅ Access granted');
    
  } catch (error) {
    console.error('❌ Grant access error:', error);
    throw new Error(`Failed to grant access: ${error.message}`);
  }
}

// ============================================================================
// iExec WEB3 MAIL METHODS
// ============================================================================

/**
 * Sends confirmation email via Web3 Mail
 */
async function sendConfirmationEmail() {
  try {
    console.log('📨 Sending email via Web3 Mail...');
    
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
                We'll keep you updated on our launch. Stay tuned!
              </p>
            </div>
            <p style="font-size: 14px; color: #888; margin-top: 40px;">
              This email was sent via Web3 Mail - decentralized, encrypted, and secure.
            </p>
          </div>
        </body>
      </html>
    `;
    
    const result = await web3mail.sendEmail({
      protectedData: protectedDataAddress,
      emailSubject: 'Welcome to Quintes Protocol Whitelist',
      emailContent: emailContent
    });
    
    console.log('✅ Email sent successfully');
    if (result?.taskId) {
      console.log('📋 Task ID:', result.taskId);
    }
    
  } catch (error) {
    console.error('❌ Send email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validates email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

window.ethereum?.addEventListener('accountsChanged', (accounts) => {
  console.log('🔄 Account changed:', accounts[0]);
  userAddress = accounts[0];
  if (!accounts || accounts.length === 0) {
    userAddress = null;
    protectedDataAddress = null;
  }
});

window.ethereum?.addEventListener('chainChanged', () => {
  console.log('🔄 Network changed, reloading...');
  window.location.reload();
});

console.log('✨ Ready! Click "Join Whitelist" to start.');

