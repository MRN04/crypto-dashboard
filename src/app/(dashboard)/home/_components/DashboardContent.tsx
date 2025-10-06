"use client";

import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import EthBalanceCard from "./EthBalanceCard";
import RecentTransactions from "./RecentTransactions";
import EthPriceChart from "./EthPriceChart";
import WalletInfoCard from "./WalletInfoCard";
import TokenList from "./TokenList";

interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

interface ChartData {
  time: string;
  price: number;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  blockNumber: string;
  isError: string;
}

export default function DashboardContent() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const [tokens, setTokens] = useState<TokenPrice[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch token prices
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setTokens(data);

        // Set ETH price
        const eth = data.find((token: TokenPrice) => token.symbol === "eth");
        if (eth) setEthPrice(eth.current_price);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Fetch ETH chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7"
        );
        const data = await response.json();

        const formattedData = data.prices.map((item: [number, number]) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        // Take every 6th point to reduce data
        const sampledData = formattedData.filter((_: ChartData, index: number) => index % 6 === 0);
        setChartData(sampledData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  // Fetch recent transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address || !chain) return;

      try {
        let apiUrl = '';

        if (chain.id === 1) { // Ethereum Mainnet
          apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        } else if (chain.id === 11155111) { // Sepolia
          apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        } else {
          setTransactions([]);
          return;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "1" && data.result) {
          setTransactions(data.result.slice(0, 5)); // Get last 5 transactions
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address, chain]);

  if (!isConnected) return null;

  const balanceFormatted = balance ? parseFloat(balance.formatted).toFixed(4) : "0.0000";
  const balanceInUsd = balance && ethPrice ? (parseFloat(balance.formatted) * ethPrice).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Crypto Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's your portfolio overview</p>
        </div>
        <ConnectButton />
      </div>

      {/* ETH Balance Card */}
      <EthBalanceCard
        balance={balanceFormatted}
        balanceInUsd={balanceInUsd}
        ethPrice={ethPrice}
        chainName={chain?.name || "Unknown"}
        address={address || ""}
      />

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        userAddress={address || ""}
        blockExplorerUrl={chain?.blockExplorers?.default.url}
      />

      {/* ETH Price Chart & Wallet Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EthPriceChart chartData={chartData} />

        <WalletInfoCard
          address={address || ""}
          chainName={chain?.name || "Unknown"}
          chainId={chain?.id || 0}
          blockExplorerUrl={chain?.blockExplorers?.default.url}
          blockExplorerName={chain?.blockExplorers?.default.name}
        />
      </div>

      {/* Token List */}
      <TokenList tokens={tokens} />
    </div>
  );
}
