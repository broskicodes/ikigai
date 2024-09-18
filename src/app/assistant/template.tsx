import { PersonaProvider } from "@/providers/persona-provider";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return <PersonaProvider>{children}</PersonaProvider>;
}
