"use client";

interface TokenPrice {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    image: string;
}

interface TokenListProps {
    tokens: TokenPrice[];
}

export default function TokenList({ tokens }: TokenListProps) {
    const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Top Cryptocurrencies</h3>
                    <p className="text-sm text-slate-400">Real-time market prices</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-slate-400">Live</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">#</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">NAME</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-slate-400">PRICE</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-slate-400">24H CHANGE</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-slate-400">MARKET CAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.length > 0 ? (
                            tokens.map((token, index) => (
                                <tr key={token.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4">
                                        <span className="text-slate-400 font-medium">{index + 1}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-white font-semibold">{token.name}</p>
                                                <p className="text-slate-400 text-sm uppercase">{token.symbol}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className="text-white font-semibold">
                                            {formatPrice(token.current_price)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={`font-semibold ${token.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {token.price_change_percentage_24h >= 0 ? '+' : ''}
                                            {token.price_change_percentage_24h.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className="text-slate-300">
                                            ${(token.market_cap / 1e9).toFixed(2)}B
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center">
                                    <div className="text-slate-400">Loading tokens...</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

