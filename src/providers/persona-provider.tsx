"use client";

import { Message } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

export enum Flavour {
  IKIGAI = "ikigai",
  IDEA_BUDDY = "idea_buddy",
}

export interface Persona {
  name: string;
  description: string;
  image: string;
  flavour: Flavour;
  firstMessage: Message;
}

interface PersonaProviderContext {
  selectedPersona: Persona | null;
  setSelectedPersona: (persona: Persona | null) => void;
}

const PersonaContext = createContext<PersonaProviderContext>({
  selectedPersona: null,
  setSelectedPersona: () => {},
});

export const usePersona = () => useContext(PersonaContext);

export const PersonaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const setPersona = useCallback((persona: Persona | null) => {
    setSelectedPersona(persona);
  }, []);

  const value = useMemo(
    () => ({ selectedPersona, setSelectedPersona: setPersona }),
    [selectedPersona, setPersona],
  );

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
};
