"use client";

interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    timeStamp: string;
    blockNumber: string;
    isError: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
    userAddress: string;
    blockExplorerUrl?: string;
}

export default function RecentTransactions({
    transactions,
    userAddress,
    blockExplorerUrl
}: RecentTransactionsProps) {
    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const getTimeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " mins ago";

        return Math.floor(seconds) + " secs ago";
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Recent Transactions</h3>
                    <p className="text-sm text-slate-400">Your latest on-chain activity</p>
                </div>
                {transactions.length > 0 && (
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs text-slate-400">Updated</span>
                    </div>
                )}
            </div>

            {transactions.length > 0 ? (
                <div className="space-y-3">
                    {transactions.map((tx) => {
                        const isOutgoing = tx.from.toLowerCase() === userAddress.toLowerCase();
                        const txValue = (parseInt(tx.value) / 1e18).toFixed(6);
                        const date = new Date(parseInt(tx.timeStamp) * 1000);
                        const timeAgo = getTimeAgo(date);

                        return (
                            <div
                                key={tx.hash}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOutgoing
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-green-500/20 text-green-400'
                                        }`}>
                                        {isOutgoing ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Transaction Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-white font-semibold">
                                                {isOutgoing ? 'Sent' : 'Received'}
                                            </span>
                                            {tx.isError === "1" && (
                                                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
                                                    Failed
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-slate-400 text-sm">
                                                {isOutgoing ? 'To:' : 'From:'}
                                            </span>
                                            <span className="text-slate-300 text-sm font-mono">
                                                {formatAddress(isOutgoing ? tx.to : tx.from)}
                                            </span>
                                            <span className="text-slate-500 text-xs">•</span>
                                            <span className="text-slate-500 text-xs">{timeAgo}</span>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${isOutgoing ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                            {isOutgoing ? '-' : '+'}{txValue} ETH
                                        </div>
                                        <div className="text-slate-400 text-xs">
                                            Block {parseInt(tx.blockNumber).toLocaleString()}
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    {blockExplorerUrl && (
                                        <a
                                            href={`${blockExplorerUrl}/tx/${tx.hash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center transition-all">
                                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-slate-400 text-sm">No transactions found</p>
                    <p className="text-slate-500 text-xs mt-1">Your transaction history will appear here</p>
                </div>
            )}
        </div>
    );
}

