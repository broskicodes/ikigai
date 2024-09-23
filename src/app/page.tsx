"use client";

import { Features } from "@/components/lp/features";
import { Footer } from "@/components/lp/footer";
import { Header } from "@/components/lp/header";
import { Hero } from "@/components/lp/hero";
import { CallToAction } from "@/components/lp/newsletter-cta";
import { Pricing } from "@/components/lp/pricing";
import { Testimonials } from "@/components/lp/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Reach your business goals faster"
        description="Get personalized mentorship and community support to help you grow your business."
        image="/images/ikigai-chart.jpg"
      />
      <Features />
      <Pricing />
      {/* <Testimonials /> */}
      <CallToAction />
      <Footer />
    </>
  );
}
