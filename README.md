# Quintes Protocol - Whitelist PoC

> **Proof of Concept:** iExec Web3 Mail Integration for Secure Whitelist Management

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![iExec Protocol](https://img.shields.io/badge/Built%20with-iExec-blue?style=flat)](https://iex.ec)
[![Ethers.js](https://img.shields.io/badge/Web3-Ethers.js-purple?style=flat)](https://docs.ethers.org)

---

## 🎯 Overview

This Proof of Concept demonstrates the integration of **iExec Web3 Mail** technology into a professional landing page for the Quintes Protocol whitelist system. Users can securely join the whitelist by connecting their Web3 wallet, encrypting their email address on-chain, and receiving automated confirmation via decentralized email.

**Live Demo:** [Deploy URL will be added here]

---

## ✨ Features

- 🔐 **Secure Wallet Connection** - MetaMask integration with Ethers.js
- 📧 **Email Encryption** - User emails encrypted using iExec protocol
- ✉️ **Web3 Mail Delivery** - Automated confirmation emails via decentralized infrastructure
- 🌐 **Network Management** - Automatic detection and switching to Polygon Mumbai testnet
- 🎨 **Professional UI** - Clean, responsive design built with Webflow
- ⚡ **Fast & Lightweight** - Vanilla JavaScript, no framework overhead
- 📱 **Mobile Responsive** - Works seamlessly on all devices

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Webflow Export (HTML/CSS/JS) | Professional, pre-designed landing page |
| **Web3 Library** | Ethers.js v5.7.2 | Blockchain interactions and wallet connectivity |
| **Web3 Mail** | iExec SDK | Decentralized email protocol for user communications |
| **Blockchain** | Polygon Mumbai Testnet | Fast, low-cost transactions for testing |
| **Deployment** | Vercel | Instant deployment with global CDN |

---

## 🚀 Quick Start

### Prerequisites

To test this PoC, you'll need:

1. **MetaMask Browser Extension**
   - [Install MetaMask](https://metamask.io/download/)
   - Create wallet if you don't have one

2. **Polygon Mumbai Testnet Configuration**
   - Network will be added automatically when you test
   - Or add manually: [Network Details](https://wiki.polygon.technology/docs/develop/network-details/network/)

3. **Test MATIC (Mumbai)**
   - Get free test MATIC from [Polygon Faucet](https://faucet.polygon.technology/)
   - You'll need a small amount for transaction fees

### Testing the Live Demo

1. Visit the live demo URL
2. Click the **"Join Whitelist"** button
3. Approve MetaMask connection
4. Switch to Mumbai network (if prompted)
5. Enter your email address
6. Approve transactions in MetaMask
7. Wait for confirmation (~60 seconds)
8. Check your email for confirmation message

---

## 📁 Project Structure

```
iexec_work/
├── .cursorrules                    # Project development guidelines
├── README.md                       # This file
├── index.html                      # Main landing page
│
├── docs/                           # Technical documentation
│   ├── ARCHITECTURE.md             # Complete technical specification
│   ├── DEVELOPMENT_PLAN.md         # Implementation guide
│   ├── DELIVERY_MESSAGE.md         # Client delivery template
│   └── IEXEC_WEB3MAIL_DOCS.md     # iExec API reference
│
├── js/
│   ├── webflow.js                  # Webflow core functionality
│   └── logic.js                    # iExec integration logic
│
├── css/                            # Webflow stylesheets
└── images/                         # Image assets
```

---

## 🔧 How It Works

### User Flow

```
1. User clicks "Join Whitelist"
        ↓
2. MetaMask connection requested
        ↓
3. Network verification (switch to Mumbai if needed)
        ↓
4. User enters email address
        ↓
5. Email encrypted via iExec (on-chain transaction)
        ↓
6. Access granted to application (on-chain transaction)
        ↓
7. Confirmation email sent via Web3 Mail
        ↓
8. Success! User added to whitelist
```

### Technical Flow

1. **Connect Wallet:** Ethers.js establishes connection with MetaMask
2. **Network Check:** Verify user is on Polygon Mumbai, switch if necessary
3. **Initialize iExec:** Create Web3 Mail instance with provider
4. **Protect Data:** Encrypt email using `protectData()` method
5. **Grant Access:** Allow app to use encrypted data with `grantAccess()`
6. **Send Email:** Deliver confirmation via `sendEmail()` method

---

## 🔐 Security & Privacy

- **Email Encryption:** All emails are encrypted on-chain using iExec's secure enclave technology
- **User Control:** Users maintain full control of their data
- **No Central Database:** No emails stored in traditional databases
- **Decentralized Delivery:** Email routing via iExec's decentralized infrastructure
- **Transparent:** All transactions visible on Polygon blockchain

---

## 📚 Documentation

### For Developers

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Complete technical specification, architectural decisions, and API documentation
- **[DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md)** - Step-by-step implementation guide with exact prompts for replication
- **[.cursorrules](.cursorrules)** - Project-specific development rules and constraints

### For Business

- **[DELIVERY_MESSAGE.md](docs/DELIVERY_MESSAGE.md)** - Professional client delivery template and communication guide

### External Resources

- [iExec Documentation](https://docs.iex.ec/for-developers/web3mail)
- [Ethers.js v5 Docs](https://docs.ethers.org/v5/)
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [Polygon Mumbai Testnet](https://wiki.polygon.technology/docs/develop/network-details/network/)

---

## 🧪 Local Development

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quintes-whitelist-poc.git
   cd quintes-whitelist-poc
   ```

2. **Open with Live Server (VS Code)**
   - Install "Live Server" extension
   - Right-click `index.html`
   - Select "Open with Live Server"
   - Browser opens at `http://127.0.0.1:5500`

3. **Or simply open in browser**
   - Navigate to project folder
   - Double-click `index.html`
   - Opens in default browser

### Configuration

To use with your own iExec app:

1. Create app at [iExec Protocol](https://protocol.iex.ec/)
2. Get your app's Ethereum address
3. Update in `js/logic.js`:
   ```javascript
   const CONFIG = {
     APP_ADDRESS: '0xYourAppAddressHere',
     // ... other config
   };
   ```

### Testing

Follow the user flow with MetaMask installed:
- Connect wallet
- Switch to Mumbai
- Enter test email
- Approve transactions
- Verify email delivery

---

## 🚢 Deployment

This project is designed for **zero-config deployment** to Vercel:

### Deploy with Vercel

1. Push code to GitHub
2. Import repository to Vercel
3. Vercel auto-detects static site
4. Click "Deploy"
5. Live in ~30 seconds

### Manual Deployment

Any static hosting works:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web hosting

Just upload all files to web root.

---

## 🐛 Troubleshooting

### MetaMask doesn't connect
- Ensure MetaMask is installed
- Try refreshing the page
- Check browser console for errors

### Wrong network error
- Approve network switch in MetaMask
- Or manually switch to Mumbai in MetaMask
- Network details: Chain ID 80001

### Transaction fails
- Check you have Mumbai MATIC
- Get free test MATIC from [faucet](https://faucet.polygon.technology/)
- Verify iExec app is configured correctly

### Email not received
- Wait a few minutes (can be delayed)
- Check spam/junk folder
- Verify all steps completed successfully
- Check transaction on [Mumbai PolygonScan](https://mumbai.polygonscan.com/)

---

## 📈 Roadmap

### Phase 2: Enhanced UX
- [ ] Replace alerts with elegant toast notifications
- [ ] Add animated loading spinners
- [ ] Implement progress indicators
- [ ] Add success page with animation
- [ ] Form validation with visual feedback

### Phase 3: Admin Features
- [ ] Admin dashboard for whitelist management
- [ ] Export whitelist to CSV
- [ ] Email template customization
- [ ] Analytics dashboard
- [ ] Batch operations

### Phase 4: Production
- [ ] Migrate to TypeScript
- [ ] Add comprehensive testing (Jest, Playwright)
- [ ] Implement CI/CD pipeline
- [ ] Add error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Multi-language support

---

## 🤝 Contributing

This is a client project PoC, but feedback and suggestions are welcome:

1. Open an issue to discuss proposed changes
2. Fork the repository
3. Create feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit changes (`git commit -m 'Add AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## 📄 License

This project is proprietary software developed for Quintes Protocol.

© 2025 Hugo Mendoza. All rights reserved.

---

## 👤 Author

**Hugo Mendoza**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Quintes Protocol** - For the opportunity to build this PoC
- **iExec Team** - For the excellent Web3 Mail protocol and documentation
- **Webflow** - For the professional design foundation
- **Polygon** - For fast, affordable testnet infrastructure

---

## 📞 Support

For technical questions or support:
- Open an [Issue](https://github.com/yourusername/quintes-whitelist-poc/issues)
- Check [Documentation](docs/ARCHITECTURE.md)
- Contact: your.email@example.com

---

<div align="center">

**Built with ❤️ using Web3 technology**

[Live Demo](#) • [Documentation](docs/ARCHITECTURE.md) • [Report Bug](https://github.com/yourusername/quintes-whitelist-poc/issues)

</div>

