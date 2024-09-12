"use client";

import { BlogSection } from "@/components/blog/blog-section";
import { Footer } from "@/components/lp/footer";
import { Header } from "@/components/lp/header";

export default function Blog() {
  return (
    <div>
      <Header />
      <BlogSection />
      <Footer/>
    </div>
  );
}
