import { ArrowRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { CONSOLE_API_URL } from "@/lib/constants";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import posthog from "posthog-js";
import { CaretRightIcon } from "@radix-ui/react-icons";
// import { CaretRightIcon } from "@radix-ui/react-icons";

interface HeroProps {
  title: string;
  description: string;
  image: string;
}

export function Hero({ title, description, image }: HeroProps) {
  
  

  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 lg:flex-row">
      <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
        <Link
          href="/ikigai"
          className="flex cursor-pointer items-center gap-1 rounded-full border px-3 py-0.5 bg-accent hover:bg-accent/80"
        >
          <span className="text-sm text-secondary-foreground">
            Chat with KAI
          </span>
          <ArrowRight size={16} />
        </Link>
        <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
          {title}
        </h1>
        <p className="max-w-lg text-center text-lg text-muted-foreground lg:text-left">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            // size="lg"
            variant="outline"
            asChild
            className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10 rounded-full"
          >
            <Link href="#">Learn More</Link>
          </Button>
          <Button  asChild className="h-12 cursor-pointer text-base sm:h-14 sm:px-10 rounded-full">
            <Link href="https://calendly.com/braeden-brhall/kaizen" target="_blank" className="flex flex-row space-x-2">
              <span>Book a Call</span>
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* {registered ? (
          <p className="text-center text-lg text-primary lg:text-left">
            ✓ Thanks for subscribing!
          </p>
        ) : (
          <form
            className="flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-center"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              value={userEmail}
              disabled={loading}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 border-border bg-card px-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-14 sm:flex-1"
            />
            <Button
              size="default"
              className="h-12 cursor-pointer text-base sm:h-14"
              type="submit"
              disabled={loading}
            >
              <span>Subscribe to Newsletter</span>
            </Button>
          </form>
        )} */}
      </div>
      <div className="relative flex-1">
        <Image
          alt="Ikigai chart"
          src={image}
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
