"use client";

import { BlogPost } from "@/components/blog/blog-post";
import { Header } from "@/components/lp/header";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div>
      <Header />
      <BlogPost slug={slug} />
    </div>
  );
}
