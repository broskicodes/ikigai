import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 lg:flex-row">
      <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
        <Link href="/ikigai" className="flex cursor-pointer items-center gap-1 rounded-full border px-3 py-0.5 bg-accent hover:bg-accent/80">
          <span className="text-sm text-secondary-foreground">Discover your Ikigai</span>
          <ArrowRight size={16} />
        </Link>
        <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
          Start your self-improvement journey
        </h1>
        <p className="max-w-md text-center text-lg text-muted-foreground lg:text-left">
          A weekly newsletter filled with tips to help you discover your passion and do meaningful
          work.
        </p>
        <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 border-border bg-card px-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-14 sm:flex-1"
          />
          <Button size="lg" asChild className="h-12 cursor-pointer text-base sm:h-14">
            <Link href="#">Join Free</Link>
          </Button>
        </form>
      </div>
      <div className="relative flex-1">
        <Image
          alt="SaaS Dashboard"
          src="/images/dashboard.png"
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
