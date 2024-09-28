"use client";

import { Chat } from "@/components/assistant/chat";
import { Header } from "@/components/lp/header";
import { SidePanel } from "@/components/assistant/side-panel";
import { PersonaSelector } from "@/components/persona-selection";
import { usePersona } from "@/providers/persona-provider";
import { Footer } from "@/components/lp/footer";
import { ArrowLeft } from "lucide-react";

export default function Assistant() {
  const { selectedPersona, setSelectedPersona } = usePersona();

  return (
    <div className={`flex ${!selectedPersona && "flex-col"} min-h-screen w-full bg-background`}>
      <main className="flex-1 flex flex-col h-screen">
        <Header />
        {selectedPersona ? (
          <div className="flex-grow flex flex-col h-full">
            <header className="flex flex-row space-x-4 items-center border-b bg-muted/40 p-4 lg:p-6">
              <button
                onClick={() => setSelectedPersona(null)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">
                    {selectedPersona.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedPersona.description}
                  </div>
                </div>
              </div>
            </header>
            <div className="flex flex-row h-full w-full">
              <Chat />
              <SidePanel />
            </div>
          </div>
        ) : (
          <PersonaSelector />
        )}
      </main>
      {!selectedPersona && <Footer />}
    </div>
  );
}
