"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flavour, Persona, usePersona } from "@/providers/persona-provider";

const aiPersonas: Persona[] = [
  {
    name: "Discover your Ikigai",
    description:
      "Answer questions about your skills and interests to discover your Ikigai.",
    image: "/images/ikigai.png",
    flavour: Flavour.IKIGAI,
    firstMessage: {
      role: "assistant",
      content: `## Ikigai
----
A Japanese concept meaning **"reason for being."** It combines four elements:

1. ### What you love
2. ### What the world needs
3. ### What you're good at
4. ### What you can be paid for

Ikigai is found at the intersection of these elements, representing a balance of passion, mission, profession, and vocation.

**I'm here to help you find yours!** Ready?`,
    }
  },
  {
    name: "Find your next brilliant idea",
    description:
      "Brainstorm with an AI to find your next brilliant idea.",
    image: "/images/ikigai.png",
    flavour: Flavour.IDEA_BUDDY,
    firstMessage: {
      role: "assistant",
      content: `## Idea Buddy
----
I'm here to help you find your next brilliant idea. Ready?`,
    }
  },
];

export function PersonaSelector() {
  const { setSelectedPersona } = usePersona();

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    // Here you would typically navigate to the chat page or change the app state
    console.log(`Selected persona: ${persona.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Pick Your Desired Interaction
      </h1>
      <p className="text-center text-lg mb-12">
        A collection of AI agents to help with discovery and productivity.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiPersonas.map((persona, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card
              className="cursor-pointer h-full transition-shadow hover:shadow-lg"
              onClick={() => handleSelectPersona(persona)}
            >
              <CardHeader>
                <div className="w-24 h-24 mx-auto">
                  <img
                    src={persona.image}
                    alt={`${persona.name} avatar`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </CardHeader>
              <CardContent>
              <CardTitle className="text-xl">
                  {persona.name}
                </CardTitle>
                <CardDescription className="">
                  {persona.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
