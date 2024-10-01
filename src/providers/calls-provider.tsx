import { CONSOLE_API_URL } from "@/lib/constants";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./auth-provider";

export interface PaidCall {
  id: string;
  payment_type: "one_time" | "weekly";
  stripe_subscription_id: string | null;
  cal_link: string;
  used: boolean;
  created_at: Date;
}

export interface ScheduledCall {
  id: string;
  user_id: string;
  call_payment_id: string;
  scheduled_time: Date;
  created_at: Date;
  cancelled_at: Date | null;
}

interface CallsProviderContext {
  scheduledCalls: ScheduledCall[];
  paidCalls: PaidCall[];
}

const CallsContext = createContext<CallsProviderContext>({
  scheduledCalls: [],
  paidCalls: [],
});

export const useCalls = () => useContext(CallsContext);

export const CallsProvider = ({ children }: { children: React.ReactNode }) => {
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([]);
  const [paidCalls, setPaidCalls] = useState<PaidCall[]>([]);

  const { user } = useAuth();

  const value = useMemo(
    () => ({
      scheduledCalls,
      paidCalls,
    }),
    [scheduledCalls, paidCalls],
  );

  const getScheduledCalls = useCallback(async () => {
    if (!user) return [];

    const res = await fetch(`${CONSOLE_API_URL}/calls/scheduled`, {
      method: "GET",
      headers: {
        "user-id": user.id,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch scheduled calls");
    }

    return (await res.json()).filter(
      (call: ScheduledCall) => !call.cancelled_at,
    );
  }, [user]);

  const getPaidCalls = useCallback(async () => {
    if (!user) return [];

    const res = await fetch(`${CONSOLE_API_URL}/calls/paid`, {
      method: "GET",
      headers: {
        "user-id": user.id,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch paid calls");
    }

    return (await res.json()).filter((call: PaidCall) => !call.used);
  }, [user]);

  useEffect(() => {
    const fetchCalls = async () => {
      const scheduledCalls = await getScheduledCalls();
      const paidCalls = await getPaidCalls();

      setScheduledCalls(scheduledCalls);
      setPaidCalls(paidCalls);
    };

    // fetchCalls();
  }, [getScheduledCalls, getPaidCalls]);

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
};
