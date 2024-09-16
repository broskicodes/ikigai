import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Logo } from "./logo";
import { useEffect, useState } from "react";

export function Header() {
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  const size = useWindowSize();
  const isMobile = size.width !== undefined && size.width < 640;

  return (
    <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between pt-5 px-5 sm:px-10">
      <div className="pointer-events-none absolute inset-0  z-[1] h-[20vh] backdrop-blur-[0.0625px] [mask-image:linear-gradient(0deg,transparent_0%,#000_12.5%,#000_25%,transparent_37.5%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[2] h-[20vh] backdrop-blur-[0.125px] [mask-image:linear-gradient(0deg,transparent_12.5%,#000_25%,#000_37.5%,transparent_50%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[3] h-[20vh] backdrop-blur-[0.25px] [mask-image:linear-gradient(0deg,transparent_25%,#000_37.5%,#000_50%,transparent_62.5%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[4] h-[20vh] backdrop-blur-[0.5px] [mask-image:linear-gradient(0deg,transparent_37.5%,#000_50%,#000_62.5%,transparent_75%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[5] h-[20vh] backdrop-blur-[1px] [mask-image:linear-gradient(0deg,transparent_50%,#000_62.5%,#000_75%,transparent_87.5%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[6] h-[20vh] backdrop-blur-[2px] [mask-image:linear-gradient(0deg,transparent_62.5%,#000_75%,#000_87.5%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-0  z-[7] h-[20vh] backdrop-blur-[4px] [mask-image:linear-gradient(0deg,transparent_75%,#000_87.5%,#000_100%,transparent_112.5%)]"></div>
      <div className="mx-auto flex w-full  items-center justify-between z-[10] border-b border-muted-foreground/20 pb-2">
        <Link href="/" className="flex items-center gap-3">
          <Logo scale={isMobile ? 0.75 : 0.9} />
          <span className="font-heading text-xl font-bold">My Kaizen</span>
        </Link>
        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-10 md:flex justify-end">
            <Link
              href="/blog"
              className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
            >
              Blog
            </Link>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild>
              <Link href="/ikigai" className="cursor-pointer">
                Discover your Ikigai
              </Link>
            </Button>
          </div>
        </div>
        <MobileNavbar>
          <div className="rounded-b-lg bg-background pt-2 pb-4 container text-foreground shadow-xl">
            <nav className="flex flex-col gap-1 pt-0">
              <Link
                href="/blog"
                className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
              <Button size="lg" asChild className="mt-2 w-full cursor-pointer">
                <Link href="/ikigai" className="cursor-pointer">
                  Discover your Ikigai
                </Link>
              </Button>
            </nav>
          </div>
        </MobileNavbar>
      </div>
    </header>
  );
}
