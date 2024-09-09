"use client";

import { Footer } from "@/components/lp/footer";
import { Header } from "@/components/lp/header";
import { Hero } from "@/components/lp/hero";
import { Testimonials } from "@/components/lp/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      {/* <Testimonials /> */}
      <Footer />
    </>
  );
}
