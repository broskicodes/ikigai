"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { WsProvider } from "@/providers/ws-provider";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { CallsProvider } from "@/providers/calls-provider";

const PostHogPageView = dynamic(
  () => import("../components/posthog-page-view"),
  {
    ssr: false,
  },
);

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
  });
}

export default function Template({ children }: PropsWithChildren) {
  return (
    <PostHogProvider client={posthog}>
      <AuthProvider>
        <CallsProvider>
          <WsProvider url={`${process.env.NEXT_PUBLIC_CONSOLE_API_URL}/ws`}>
            <PostHogPageView />
            {children}
          </WsProvider>
        </CallsProvider>
        <Toaster />
      </AuthProvider>
    </PostHogProvider>
  );
}
