"use client";

interface EthBalanceCardProps {
    balance: string;
    balanceInUsd: string;
    ethPrice: number;
    chainName: string;
    address: string;
}

export default function EthBalanceCard({
    balance,
    balanceInUsd,
    ethPrice,
    chainName,
    address
}: EthBalanceCardProps) {
    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <p className="text-slate-300 text-sm font-medium mb-2">Total ETH Balance</p>
                    <div className="space-y-2">
                        <h2 className="text-5xl font-bold text-white">
                            {balance} ETH
                        </h2>
                        <p className="text-2xl font-semibold text-slate-300">
                            ≈ ${balanceInUsd}
                        </p>
                    </div>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                    </svg>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div>
                    <p className="text-slate-400 text-xs mb-1">Current Price</p>
                    <p className="text-white font-semibold">{formatPrice(ethPrice)}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs mb-1">Network</p>
                    <p className="text-white font-semibold">{chainName}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs mb-1">Address</p>
                    <p className="text-white font-semibold font-mono text-sm">{formatAddress(address)}</p>
                </div>
            </div>
        </div>
    );
}

