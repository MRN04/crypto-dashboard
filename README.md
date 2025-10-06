# Crypto Dashboard 🚀

A modern, beautiful Web3 crypto dashboard built with Next.js 15, React 19, and RainbowKit.

## ✨ Features

### 🔐 **Wallet Authentication**

- Connect with MetaMask, WalletConnect, Coinbase Wallet, and more
- Multi-chain support (Ethereum, Polygon, Arbitrum, Base, Sepolia)
- Automatic redirect after successful connection

### 💰 **Dashboard Features**

- **ETH Balance Display** - Real-time balance with USD conversion
- **Price Chart** - Interactive 7-day ETH price chart with beautiful gradients
- **Recent Transactions** - Last 5 transactions with send/receive indicators
- **Top Cryptocurrencies** - Live prices of top 10 tokens from CoinGecko
- **Wallet Information** - Network details, chain ID, and block explorer links

### 🎨 **Modern UI/UX**

- Glass-morphism design with backdrop blur effects
- Gradient colors (purple/pink theme)
- Smooth animations and transitions
- Fully responsive layout
- Real-time data updates

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.4
- **React:** 19.1.0
- **Web3 Integration:**
  - Wagmi 2.17.5
  - RainbowKit 2.2.8
  - Viem 2.37.12
- **Charts:** Recharts
- **Styling:** Tailwind CSS v4
- **TypeScript:** 5.x

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Create `.env.local` file for WalletConnect Project ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your free Project ID at [WalletConnect Cloud](https://cloud.walletconnect.com)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Getting Started

1. Navigate to `/login` page
2. Click "Connect Your Wallet"
3. Choose your wallet (MetaMask, WalletConnect, etc.)
4. Approve the connection
5. Get automatically redirected to dashboard with your portfolio info!

## 📁 Project Structure

```
crypto-dashboard/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       ├── _components/
│   │   │       │   └── LoginForm.tsx
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   └── home/
│   │   │       ├── _components/
│   │   │       │   ├── DashboardContent.tsx    # Main container
│   │   │       │   ├── EthBalanceCard.tsx      # Balance display
│   │   │       │   ├── RecentTransactions.tsx  # Transaction history
│   │   │       │   ├── EthPriceChart.tsx       # Price chart
│   │   │       │   ├── WalletInfoCard.tsx      # Wallet details
│   │   │       │   ├── TokenList.tsx           # Token prices table
│   │   │       │   └── index.ts                # Exports
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   └── header.tsx
│   └── lib/
│       └── WagmiProvider.tsx
├── public/
├── package.json
└── README.md
```

### 🧩 Component Architecture

The dashboard is built with a modular component structure:

- **DashboardContent** - Main container that fetches data and distributes it to child components
- **EthBalanceCard** - Displays ETH balance, USD value, and wallet info
- **RecentTransactions** - Shows last 5 transactions with send/receive indicators
- **EthPriceChart** - Interactive 7-day price chart using Recharts
- **WalletInfoCard** - Wallet status, address, network, and explorer link
- **TokenList** - Top 10 cryptocurrencies with live prices and 24h changes

## 🔧 Configuration

### WagmiProvider (src/lib/WagmiProvider.tsx)

Configure supported chains and wallet settings:

- Mainnet
- Polygon
- Optimism
- Arbitrum
- Base
- Sepolia (testnet)

### API Integration

The dashboard uses:

- **CoinGecko API** - For token prices and charts
- **Etherscan API** - For transaction history

## 🎨 Customization

### Colors

The dashboard uses a purple/pink gradient theme. You can customize colors in:

- `src/app/globals.css` - Global styles
- Component className props - Tailwind utility classes

### Supported Networks

Add or remove networks in `src/lib/WagmiProvider.tsx`:

```typescript
chains: [mainnet, polygon, optimism, arbitrum, base, sepolia];
```

## 📝 License

MIT License - feel free to use this project for learning or building your own crypto dashboard!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🙏 Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/) - Beautiful wallet connection
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [CoinGecko](https://www.coingecko.com/) - Cryptocurrency data API
- [Recharts](https://recharts.org/) - Chart library

---

Built with ❤️ using Next.js and Web3 technologies
