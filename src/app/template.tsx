"use client";

import { AuthProvider } from "@/providers/authProvider";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}