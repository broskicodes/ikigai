import { ArrowRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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
          href="/assistant"
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
          <Button
            asChild
            className="h-12 cursor-pointer text-base sm:h-14 sm:px-10 rounded-full"
          >
            <Link href="#book" className="flex flex-row space-x-2">
              <span>Book a Call</span>
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
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
