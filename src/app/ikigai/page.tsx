"use client";

import { Chat } from "@/components/chat";
import { SidePanel } from "@/components/side-panel";

export default function Ikigai() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 flex flex-col h-screen">
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between border-b bg-muted/40 p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">Boku no Ikigai nan desuka?</div>
                <div className="text-sm text-muted-foreground">
                  A tool to help you find your &quot;reason for being&quot;.
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-row h-full">
            <Chat />
            <SidePanel />
          </div>
        </div>
      </main>
    </div>
  );
}
