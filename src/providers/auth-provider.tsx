import posthog from "posthog-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AuthProviderContext {
  userId: string | null;
}

const AuthContext = createContext<AuthProviderContext>({
  userId: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const value = useMemo(() => ({ userId }), [userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      const newUserId = uuidv4();
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId);
      posthog.identify(newUserId);
    } else {
      setUserId(storedUserId);
      posthog.identify(storedUserId);
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
