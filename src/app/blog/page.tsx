"use client";

import { BlogSection } from "@/components/blog/blog-section";
import { Footer } from "@/components/lp/footer";
import { Header } from "@/components/lp/header";

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <main className="flex-1 flex flex-col h-screen w-full bg-background">
        <Header />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
