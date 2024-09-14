import { CONSOLE_API_URL } from "@/lib/constants";
import posthog from "posthog-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  email: string | null;
}

interface AuthProviderContext {
  user: User | null;
}

const AuthContext = createContext<AuthProviderContext>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user }), [user]);

  const getUser = useCallback(async (userId: string) => {
    const user = await fetch(`${CONSOLE_API_URL}/users/${userId}`);
    return await user.json();
  }, []);

  useEffect(() => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    posthog.identify(userId);

    (async () => {
      const user = await getUser(userId);
      setUser(user);
    })();

  }, [getUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
