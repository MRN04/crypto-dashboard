"use client";

interface WalletInfoCardProps {
    address: string;
    chainName: string;
    chainId: number;
    blockExplorerUrl?: string;
    blockExplorerName?: string;
}

export default function WalletInfoCard({
    address,
    chainName,
    chainId,
    blockExplorerUrl,
    blockExplorerName
}: WalletInfoCardProps) {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Wallet Info</h3>
            <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-400">STATUS</span>
                    </div>
                    <p className="text-white font-semibold">Connected</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs font-medium text-slate-400 mb-2">WALLET ADDRESS</p>
                    <p className="text-white font-mono text-sm break-all">{address}</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs font-medium text-slate-400 mb-2">NETWORK</p>
                    <p className="text-white font-semibold">{chainName}</p>
                    <p className="text-slate-400 text-sm mt-1">Chain ID: {chainId}</p>
                </div>

                {blockExplorerUrl && (
                    <a
                        href={`${blockExplorerUrl}/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl transition-all group"
                    >
                        <span className="text-purple-300 font-medium text-sm">View on {blockExplorerName || 'Explorer'}</span>
                        <svg className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
}

