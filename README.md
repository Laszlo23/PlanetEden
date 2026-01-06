# 🌍 Planet Eden

> **A secure, scalable foundation for on-chain service commitments**

Planet Eden is a production-ready Next.js application that provides infrastructure for verifiable, trustless service commitments through cryptographic verification and smart contract anchoring.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

### 🔐 Security First
- **Production-hardened** security headers (CSP, HSTS, XSS protection)
- **Environment variable validation** with Zod schemas
- **Secure logging** with automatic sensitive data redaction
- **Server-only** data access patterns to prevent client leaks
- **TypeScript strict mode** for type safety

### 🔑 Wallet Authentication
- **Sign-In With Ethereum (SIWE)** for wallet-based identity
- **Cryptographic signature verification** on the server
- **Session management** with secure nonces
- **Privacy-preserving** identity storage

### 📅 Booking Integrity System
- **On-chain commitment anchoring** via smart contracts
- **Overlap prevention** at the protocol level
- **Minimal on-chain storage** (only cryptographic hashes)
- **Privacy by design** (personal data stays off-chain)
- **Verifiable commitments** anyone can verify

### 🎨 Premium UI/UX
- **Dark, elegant design** with custom theme
- **Mobile-first** responsive layout
- **Discover & booking** interfaces
- **Provider & client dashboards**
- **Public-facing pages** (Story, Roadmap, Vision, Investors)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet (for wallet features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Laszlo23/PlanetEden.git
cd PlanetEden

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
planeteden/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── bookings/      # Booking endpoints
│   │   └── siwe/          # SIWE authentication
│   ├── book/              # Booking pages
│   ├── dashboard/         # User dashboards
│   ├── story/             # Story page
│   ├── roadmap/           # Roadmap page
│   ├── vision/            # Vision page
│   └── investors/         # Investors page
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── WalletConnect.tsx  # Wallet connection
│   ├── ProviderCard.tsx   # Provider cards
│   ├── BookingForm.tsx    # Booking form
│   └── ...
├── contracts/             # Smart contracts
│   ├── BookingIntegrity.sol  # Main booking contract
│   └── types.ts           # TypeScript types
├── db/                    # Database
│   ├── schema.ts          # Wallet identity schema
│   ├── booking-schema.ts  # Booking schema
│   └── store.ts           # In-memory store (dev)
├── lib/                   # Utilities
│   ├── env.ts             # Environment validation
│   ├── env.server.ts      # Server env access
│   ├── env.client.ts      # Client env access
│   ├── logger.ts          # Secure logging
│   └── wallet.ts          # Wallet utilities
├── services/              # Business logic
│   ├── siwe.ts            # SIWE service
│   ├── booking.ts         # Booking service
│   ├── booking-hash.ts    # Hash generation
│   └── contract.ts        # Contract interactions
└── types/                 # Type definitions
    └── global.d.ts        # Global types
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Node Environment
NODE_ENV=development

# SIWE Configuration (optional)
NEXT_PUBLIC_APP_DOMAIN=localhost
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000

# Smart Contract (required for booking features)
BOOKING_CONTRACT_ADDRESS=0x...
RPC_URL=https://eth.llamarpc.com
PRIVATE_KEY=0x...  # For contract write operations
```

**⚠️ Security Note:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client. All other variables are server-only.

---

## 🏗️ Architecture

### On-Chain / Off-Chain Hybrid

```
┌─────────────────────────────────────────┐
│           Client Application             │
│  (Next.js + React + Wallet Integration)  │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌─────▼──────┐
│  Off-Chain  │  │  On-Chain   │
│   Database  │  │   Contract  │
│             │  │             │
│ • Personal  │  │ • Hashes     │
│   Data      │  │ • Commitments│
│ • Metadata  │  │ • Verification│
│ • Details   │  │             │
└─────────────┘  └─────────────┘
```

### Booking Flow

1. **Client creates booking** → Stored off-chain with metadata
2. **Generate booking hash** → SHA-256 hash of booking data
3. **Commit to chain** → Hash stored in smart contract
4. **Verify availability** → Contract checks for overlaps
5. **Verification** → Anyone can verify commitment on-chain

---

## 📚 API Documentation

### Authentication

#### `GET /api/siwe/nonce`
Generate SIWE message and nonce for signing.

**Query Parameters:**
- `address` (string): Ethereum address

**Response:**
```json
{
  "message": "string",
  "nonce": "string"
}
```

#### `POST /api/siwe/verify`
Verify signed SIWE message.

**Body:**
```json
{
  "message": "string",
  "signature": "0x..."
}
```

### Bookings

#### `POST /api/bookings/create`
Create a new booking and commit it on-chain.

**Body:**
```json
{
  "providerAddress": "0x...",
  "clientAddress": "0x...",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:00:00Z",
  "metadata": {
    "title": "Consultation",
    "description": "Initial consultation"
  }
}
```

#### `POST /api/bookings/check`
Check if a time slot is available.

#### `GET /api/bookings/[id]`
Get booking details by ID.

#### `DELETE /api/bookings/[id]`
Cancel a booking (off-chain and on-chain).

#### `POST /api/bookings/verify`
Verify a booking hash exists on-chain.

---

## 🔒 Security Features

### Environment Variables
- ✅ Zod schema validation at build time
- ✅ Server-only access patterns
- ✅ Client-safe access (NEXT_PUBLIC_* only)

### Security Headers
- ✅ Content Security Policy (CSP)
- ✅ HSTS (production)
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Permissions Policy

### Secure Logging
- ✅ Automatic sensitive data redaction
- ✅ Structured logging
- ✅ Environment-aware log levels

### Smart Contract Security
- ✅ Input validation
- ✅ Overlap prevention at protocol level
- ✅ Minimal on-chain storage

---

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### TypeScript

The project uses TypeScript with strict mode enabled:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noUncheckedIndexedAccess: true`
- `noFallthroughCasesInSwitch: true`

---

## 📖 Smart Contract

### BookingIntegrity.sol

The main smart contract for booking commitments.

**Key Features:**
- Stores only booking hashes (bytes32)
- Prevents overlapping bookings per provider
- Time slot-based efficient checking
- Gas-optimized storage

**Deployment:**
1. Compile with Hardhat, Foundry, or Remix
2. Deploy to your target network
3. Set `BOOKING_CONTRACT_ADDRESS` in environment variables

See `contracts/README.md` for detailed documentation.

---

## 🎨 Design System

### Colors

The application uses a custom dark theme:

- **Background**: `#0f0f0f`
- **Surface**: `#1a1a1a`
- **Accent**: `#8b5cf6` (Purple)
- **Text**: `#f5f5f5`
- **Muted Text**: `#a3a3a3`

### Components

- `.card` - Card container with hover effects
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input` - Form input field

---

## 📄 Pages

### Public Pages
- **/** - Discover providers
- **/story** - Our story and mission
- **/roadmap** - Development roadmap
- **/vision** - On-chain vision and tokenomics
- **/investors** - Information for investors

### Protected Pages
- **/dashboard** - User dashboard (requires wallet)
- **/book/[address]** - Book a service

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Blockchain**: Viem, SIWE
- **Smart Contracts**: Solidity

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript strict mode
- Security best practices are maintained
- Tests are added for new features
- Documentation is updated

---

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Smart contracts are subject to security risks. Always conduct security audits before deploying to mainnet.

---

## 📞 Contact

For inquiries, please open an issue on GitHub.

---

**Built with ❤️ for the decentralized future**
