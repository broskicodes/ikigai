"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { WsProvider } from "@/providers/ws-provider";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
    return (
        <AuthProvider>
            <WsProvider url={`${process.env.NEXT_PUBLIC_CONSOLE_API_URL}/ws`}>
                {children}
            </WsProvider>
        </AuthProvider>
    )
}