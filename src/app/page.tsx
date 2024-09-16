"use client";

import { Footer } from "@/components/lp/footer";
import { Header } from "@/components/lp/header";
import { Hero } from "@/components/lp/hero";
import { Newsletter } from "@/components/lp/newsletter-cta";
import { Pricing } from "@/components/lp/pricing";
import { Testimonials } from "@/components/lp/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Learn to make consistent progress"
        description="Share your personal/business struggles and get unique insights to help you figure out your next step."
        image="/images/ikigai-chart.jpg"
      />
      <Pricing />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
