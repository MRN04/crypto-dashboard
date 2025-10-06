"use client";

import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";

interface ChartData {
    time: string;
    price: number;
}

interface EthPriceChartProps {
    chartData: ChartData[];
}

export default function EthPriceChart({ chartData }: EthPriceChartProps) {
    return (
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">ETH Price Chart</h3>
                    <p className="text-sm text-slate-400">Last 7 days</p>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 rounded-lg">
                    <span className="text-purple-300 text-sm font-semibold">7D</span>
                </div>
            </div>
            <div className="h-64">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="time"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                tickFormatter={(value: number) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                formatter={(value: number | string) => [`$${Number(value).toLocaleString()}`, 'Price']}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#a855f7"
                                strokeWidth={2}
                                fill="url(#colorPrice)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-slate-400">Loading chart...</div>
                    </div>
                )}
            </div>
        </div>
    );
}

