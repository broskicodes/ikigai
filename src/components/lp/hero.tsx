import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { CONSOLE_API_URL } from "@/lib/constants";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";

export function Hero() {
  const { userId } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const response = await fetch(`${CONSOLE_API_URL}/users/subscribe`, {
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId || '',
      },
      method: "POST",
      body: JSON.stringify({ email: userEmail }),
    });

    if (response.ok) {
      setUserEmail("");
      setRegistered(true);
    } else {
      toast.error("An error occurred while subscribing");
    }

    setLoading(false);
  }, [userEmail]);

  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 lg:flex-row">
      <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
        <Link href="/ikigai" className="flex cursor-pointer items-center gap-1 rounded-full border px-3 py-0.5 bg-accent hover:bg-accent/80">
          <span className="text-sm text-secondary-foreground">Chat with KAI</span>
          <ArrowRight size={16} />
        </Link>
        <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
          Take actionable steps towards your Ikigai
        </h1>
        <p className="max-w-lg text-center text-lg text-muted-foreground lg:text-left">
          A weekly newsletter filled with tips to help you discover your passion and do meaningful
          work.
        </p>
        {registered ? (
          <p className="text-center text-lg text-primary lg:text-left">
            ✓ Thanks for subscribing!
          </p>
        ) : (
          <form className="flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={userEmail}
              disabled={loading}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 border-border bg-card px-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-14 sm:flex-1"
            />
            <Button size="default" className="h-12 cursor-pointer text-base sm:h-14" type="submit" disabled={loading}>
              <span>Subscribe to Newsletter</span>
            </Button>
          </form>
        )}
      </div>
      <div className="relative flex-1">
        <Image
          alt="Ikigai chart"
          src="/images/ikigai-chart.jpg"
          width={600}
          height={400}
          priority
          className="rounded-xl border border-border shadow-lg"
        />
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
    </section>
  );
}
