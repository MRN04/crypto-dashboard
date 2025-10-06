import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">
                Crypto Dashboard
            </h1>
            <ConnectButton />
        </div>
    );
}
