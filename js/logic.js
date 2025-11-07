/**
 * iExec Web3 Mail Integration Logic - Frontend
 * Version: 3.0.0 - Backend Proxy Architecture
 * Purpose: Handles wallet connection and communicates with backend API
 * 
 * Flow: Connect Wallet → Call Backend API → Display Results
 * Backend handles all iExec SDK operations
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Backend API URL (adjust for production)
  API_URL: 'http://localhost:3001',
  
  // Network configuration (for wallet connection verification)
  NETWORK_ID: 421614,
  NETWORK_NAME: 'Arbitrum Sepolia',
  NETWORK_HEX: '0x66eee',
  RPC_URL: 'https://sepolia-rollup.arbitrum.io/rpc',
  BLOCK_EXPLORER: 'https://sepolia.arbiscan.io/'
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let userAddress = null;
let protectedDataAddress = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Quintes Protocol - iExec Web3 Mail Integration (Backend Proxy)');
  console.log('📋 Initializing...');
  console.log('🔗 Backend API:', CONFIG.API_URL);
  
  // Get both buttons (navbar and hero)
  const navbarButton = document.getElementById('joinWhitelistBtn');
  const heroButton = document.getElementById('joinWhitelistBtnHero');
  
  if (navbarButton) {
    navbarButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Navbar button connected');
  } else {
    console.warn('⚠️ Navbar button not found');
  }
  
  if (heroButton) {
    heroButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Hero button connected');
  } else {
    console.warn('⚠️ Hero button not found');
  }
  
  console.log('✅ Frontend initialized successfully');
});

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Main handler for the Join Whitelist button
 * Orchestrates the complete Web3 Mail flow via backend API
 */
async function handleJoinWhitelist(event) {
  event.preventDefault();
  console.log('🎯 Join Whitelist clicked');
  
  // Check MetaMask availability
  if (!window.ethereum) {
    alert('MetaMask is not installed.\n\nPlease install MetaMask to continue.\n\nYou will be redirected to the download page.');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  
  try {
    // STEP 1: Connect Wallet
    console.log('📍 Step 1: Connecting wallet...');
    alert('🔐 STEP 1: Connect Your Wallet\n\n✓ This only reads your wallet address (your public ID)\n✓ It does NOT access your funds\n✓ It does NOT transfer any tokens\n\nYour wallet will ask for permission to connect.');
    await connectWallet();
    alert(`✅ Connected Successfully!\n\nYour public address: ${userAddress.substring(0, 6)}...${userAddress.substring(38)}\n\n✓ Your funds are safe\n✓ Only your public ID was shared`);
    console.log('✅ Step 1 complete: Wallet connected');
    
    // STEP 2: Get user email
    console.log('📍 Step 2: Requesting email...');
    const userEmail = prompt('Please enter your email address to join the whitelist:');
    
    if (!userEmail) {
      alert('Email is required to join the whitelist.\n\nPlease try again.');
      console.log('❌ User cancelled: No email provided');
      return;
    }
    
    if (!isValidEmail(userEmail)) {
      alert('Invalid email format.\n\nPlease enter a valid email address like:\nexample@domain.com');
      console.log('❌ Invalid email format:', userEmail);
      return;
    }
    
    console.log('📧 Email provided:', userEmail);
    
    // STEP 3: Protect email data (via backend)
    console.log('📍 Step 3: Protecting email data (calling backend API)...');
    alert('🔒 STEP 2: Encrypt Your Email\n\n📝 What happens next:\n✓ Your email will be ENCRYPTED by our backend\n✓ Only you and authorized apps can read it\n✓ This is handled securely on our servers\n\n💡 Your email is protected with blockchain technology.');
    protectedDataAddress = await protectUserEmailViaAPI(userEmail);
    alert('✅ Email Encrypted Successfully!\n\n🔐 Your email is now protected\n✓ Encrypted with iExec technology\n✓ Only accessible with your permission');
    console.log('✅ Step 3 complete: Data protected');
    console.log('🔒 Protected data address:', protectedDataAddress);
    
    // STEP 4: Grant access to app (via backend)
    console.log('📍 Step 4: Granting access (calling backend API)...');
    alert('✉️ STEP 3: Grant Email Permission\n\n📝 What this does:\n✓ Allows Quintes Protocol to send YOU emails\n✓ They can NOT see your email address\n✓ They can NOT sell your data\n\n💡 You\'re in control: You can revoke this anytime.');
    await grantAppAccessViaAPI();
    alert('✅ Permission Granted!\n\n✓ Quintes Protocol can now send you updates\n✓ Your email remains private and encrypted\n✓ You control this permission');
    console.log('✅ Step 4 complete: Access granted');
    
    // STEP 5: Send confirmation email (via backend)
    console.log('📍 Step 5: Sending confirmation email (calling backend API)...');
    alert('📨 STEP 4: Send Welcome Email\n\n📝 Final step:\n✓ Sending your whitelist confirmation\n✓ This uses Web3 Mail (decentralized)\n\n💡 After this, you\'re done!');
    await sendConfirmationEmailViaAPI();
    alert('🎉 SUCCESS! You\'re on the Whitelist!\n\n✅ Confirmation email sent via Web3 Mail\n📧 Check your inbox in 1-2 minutes\n🔐 All data encrypted and secure\n\nWelcome to Quintes Protocol!');
    console.log('✅ Step 5 complete: Email sent');
    console.log('🎉 COMPLETE: User successfully added to whitelist');
    
  } catch (error) {
    console.error('❌ Error in whitelist process:', error);
    
    // Specific error handling
    if (error.code === 4001) {
      alert('❌ Transaction rejected\n\nYou rejected the transaction in MetaMask.\n\nPlease try again if you want to join the whitelist.');
    } else if (error.message && error.message.includes('network')) {
      alert('❌ Network Error\n\nPlease check your internet connection and try again.');
    } else if (error.message && error.message.includes('backend')) {
      alert('❌ Backend Service Error\n\nThe backend service is not responding.\n\nPlease make sure the backend server is running on ' + CONFIG.API_URL);
    } else {
      alert(`❌ An error occurred:\n\n${error.message}\n\nPlease try again or contact support if the problem persists.`);
    }
  }
}

// ============================================================================
// WALLET CONNECTION
// ============================================================================

/**
 * Connects to MetaMask wallet
 * @returns {Promise<string>} User's wallet address
 */
async function connectWallet() {
  try {
    console.log('🔌 Requesting wallet connection...');
    
    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask.');
    }
    
    userAddress = accounts[0];
    console.log('✅ Wallet connected');
    console.log('👤 User address:', userAddress);
    
    // Check network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    console.log('🌐 Current network:', currentChainId);
    
    if (currentChainId !== CONFIG.NETWORK_ID) {
      console.log('⚠️ Wrong network detected, prompting switch...');
      const switchNetwork = confirm(
        `You're connected to the wrong network.\n\nPlease switch to ${CONFIG.NETWORK_NAME} to continue.\n\nClick OK to switch networks.`
      );
      
      if (switchNetwork) {
        await switchToArbitrumSepolia();
      } else {
        throw new Error(`Please switch to ${CONFIG.NETWORK_NAME} to continue.`);
      }
    }
    
    return userAddress;
    
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    if (error.code === 4001) {
      throw new Error('User rejected connection request');
    }
    throw error;
  }
}

/**
 * Switches to Arbitrum Sepolia testnet
 */
async function switchToArbitrumSepolia() {
  try {
    console.log('🔄 Switching to Arbitrum Sepolia testnet...');
    
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CONFIG.NETWORK_HEX }],
    });
    
    console.log('✅ Switched to Arbitrum Sepolia');
    
  } catch (error) {
    // Network not added, try to add it
    if (error.code === 4902) {
      console.log('📝 Network not found, adding Arbitrum Sepolia...');
      
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
// BACKEND API CALLS
// ============================================================================

/**
 * Protects user email via backend API
 * @param {string} email - User's email address
 * @returns {Promise<string>} Protected data address
 */
async function protectUserEmailViaAPI(email) {
  try {
    console.log('🔒 Calling backend API to protect email...');
    
    const response = await fetch(`${CONFIG.API_URL}/api/protect-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to protect email');
    }
    
    const data = await response.json();
    
    if (!data.success || !data.protectedDataAddress) {
      throw new Error('Invalid response from backend');
    }
    
    console.log('✅ Email protected via backend');
    console.log('📦 Protected data address:', data.protectedDataAddress);
    
    return data.protectedDataAddress;
    
  } catch (error) {
    console.error('❌ Backend API error (protect-email):', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
}

/**
 * Grants app access via backend API
 * @returns {Promise<void>}
 */
async function grantAppAccessViaAPI() {
  try {
    console.log('🔑 Calling backend API to grant access...');
    
    if (!protectedDataAddress) {
      throw new Error('Protected data address not available');
    }
    
    if (!userAddress) {
      throw new Error('User address not available');
    }
    
    const response = await fetch(`${CONFIG.API_URL}/api/grant-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        protectedDataAddress: protectedDataAddress,
        userAddress: userAddress
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to grant access');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Invalid response from backend');
    }
    
    console.log('✅ Access granted via backend');
    
  } catch (error) {
    console.error('❌ Backend API error (grant-access):', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
}

/**
 * Sends confirmation email via backend API
 * @returns {Promise<void>}
 */
async function sendConfirmationEmailViaAPI() {
  try {
    console.log('📨 Calling backend API to send email...');
    
    if (!protectedDataAddress) {
      throw new Error('Protected data address not available');
    }
    
    const response = await fetch(`${CONFIG.API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        protectedDataAddress: protectedDataAddress
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Invalid response from backend');
    }
    
    console.log('✅ Email sent via backend');
    if (data.taskId) {
      console.log('📋 Task ID:', data.taskId);
    }
    
  } catch (error) {
    console.error('❌ Backend API error (send-email):', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Listen for account changes
 */
window.ethereum?.addEventListener('accountsChanged', (accounts) => {
  console.log('🔄 Account changed:', accounts[0]);
  userAddress = accounts[0];
  
  if (!accounts || accounts.length === 0) {
    console.log('⚠️ No accounts found, please connect wallet');
    userAddress = null;
    protectedDataAddress = null;
  }
});

/**
 * Listen for network changes
 */
window.ethereum?.addEventListener('chainChanged', (chainId) => {
  console.log('🔄 Network changed to:', chainId);
  console.log('🔄 Reloading page...');
  window.location.reload();
});

// ============================================================================
// DEBUG INFO
// ============================================================================

console.log('📋 Configuration:', {
  apiUrl: CONFIG.API_URL,
  network: CONFIG.NETWORK_NAME,
  chainId: CONFIG.NETWORK_ID,
  architecture: 'Backend Proxy'
});

console.log('✨ Frontend ready!');
console.log('🎬 Click "Join Whitelist" to start!');
