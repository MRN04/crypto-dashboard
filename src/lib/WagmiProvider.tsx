'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider as WagmiProviderBase } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const config = getDefaultConfig({
    appName: 'Crypto Dashboard',
    projectId: projectId || 'dummy-project-id-for-development',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
    ssr: true,
});

const queryClient = new QueryClient();
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export function WagmiProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProviderBase config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize={isMobile ? 'compact' : 'wide'}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProviderBase>
    );
}
