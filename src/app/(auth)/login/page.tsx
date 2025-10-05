"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./_components/LoginForm"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="text-white text-xl">Loading...</div>
        </div>
    ),
});

export default function Login() {
    return <LoginForm />;
}