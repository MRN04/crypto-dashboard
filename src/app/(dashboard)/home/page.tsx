"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { isConnected, address, chain } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (!isConnected || !address) {
            router.push("/login");
        }
    }, [isConnected, router, address]);

    if (!isConnected || !address) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Crypto Dashboard
                    </h1>
                    <ConnectButton />
                </div>
                <div className="grid gap-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Welcome!</h2>
                        <p className="text-slate-300">Your wallet is connected successfully. {address} {chain?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

