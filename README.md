# eKayaLink

## Nag-uugnay ng Puso, Nagdadala ng Pag-asa

eKayaLink is a Stellar-powered remittance platform that enables Overseas Filipino Workers (OFWs) to send money home faster, more affordably, and more securely through blockchain technology.

Built for the APAC Stellar Hackathon 2026, eKayaLink demonstrates how Stellar can improve financial accessibility and cross-border payments for Filipino families.

---

## Team

**eKaya Innovators**

---

## Hackathon Track

**Local Finance & Real-World Access**

Build applications that connect real-world financial needs to blockchain infrastructure.

---

## Problem

Millions of Overseas Filipino Workers (OFWs) send money to their families every month. Traditional remittance channels often suffer from:

- High transaction fees
- Slow processing times
- Limited accessibility
- Lack of transparency
- Delayed settlement

These challenges reduce the value received by families who depend on remittances for daily living expenses.

---

## Solution

eKayaLink leverages the Stellar network to provide:

- Fast cross-border remittances
- Low-cost transactions
- Secure blockchain settlement
- Digital wallet integration through Freighter
- Real-time transaction tracking

The platform demonstrates how Stellar can be used to modernize remittance infrastructure for Filipino communities.

---

## Features

### Authentication

- User registration
- User login
- Secure session management using Supabase

### Dashboard

- Wallet overview
- Transaction history
- Stellar account information
- Wallet balance display

### Stellar Wallet Integration

- Freighter wallet connection
- Stellar Testnet support
- Wallet address synchronization

### Send Money

- Send XLM between Stellar Testnet accounts
- Destination wallet validation
- Transaction submission through Stellar SDK
- Transaction hash generation

### Transaction History

- Transaction tracking
- Transaction status display
- Stellar Explorer links

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend & Database

- Supabase
- PostgreSQL

### Blockchain

- Stellar SDK
- Stellar Testnet
- Freighter Wallet

---

## Architecture

User → eKayaLink Web Application → Supabase Authentication → Stellar Network → Recipient Wallet

---

## Stellar Integration

eKayaLink integrates directly with Stellar Testnet through the Stellar SDK.

Implemented capabilities:

- Wallet connection through Freighter
- Account balance retrieval
- Transaction creation
- Transaction signing
- Transaction submission
- Transaction hash verification

A successful Stellar Testnet transaction was completed during MVP testing.

---

## Demo Flow

1. User creates an account
2. User signs in
3. User connects Freighter wallet
4. Wallet address is displayed
5. User enters recipient Stellar address
6. User sends XLM
7. Transaction is submitted to Stellar Testnet
8. Transaction appears in transaction history
9. User can verify transaction through Stellar Explorer

---

## Screenshots

Include:

- Landing Page
- Login Page
- Dashboard
- Wallet Connection
- Send Money Page
- Transaction History
- Stellar Explorer Verification

---

## Future Roadmap

### Phase 1

- Production Stellar Mainnet deployment
- Improved wallet management
- Enhanced transaction analytics

### Phase 2

- PDAX integration
- PHP cash-in services
- PHP cash-out services

### Phase 3

- Mobile application
- QR-based transfers
- Merchant payment support

---

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Status

✅ MVP Complete

### Verified Functionality

- Authentication
- Dashboard
- Freighter Wallet Integration
- Stellar Testnet Transactions
- Transaction History
- Wallet Balance Display
- Responsive UI

Built for the APAC Stellar Hackathon 2026.
