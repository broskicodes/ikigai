import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { CONSOLE_API_URL } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";
import { BlogPost as BlogPostType } from "@/lib/types";

export const BlogPost = ({ slug }: { slug: string }) => {
    const [post, setPost] = useState<BlogPostType | null>(null);
    const router = useRouter();

  const { userId } = useAuth();

  const fetchPost = useCallback(async () => {
    if (!userId) return;

    const response = await fetch(`${CONSOLE_API_URL}/blogposts/${slug}`, {
      method: "GET",
      headers: {
        "user-id": userId || "",
      },
    });

    const data = await response.json();
    console.log(data.content);

    setPost((_) => {
      return {
        ...data,
        date: new Date(data.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });
  }, [userId, slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
    <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
  </Button>
  <img
    src={post.image_url || ""}
    alt={post.title}
    width={800}
    height={400}
    className="w-full h-64 object-cover rounded-lg mb-6"
  />
  <h1 className="text-3xl font-bold">{post.title}</h1>
  <p className="text-xl text-muted-foreground mb-2">{post.description}</p>
  <div className="flex items-center text-sm text-muted-foreground mb-6">
    <span className="text-foreground">By {post.author}</span>
    <span className="mx-2">•</span>
    <time>{post.date}</time>
  </div>
  <div className="prose prose-lg w-full text-foreground">
    <ReactMarkdown
      components={{
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic my-4"
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul className="ml-6 list-disc my-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-4 border-t-2 border-gray-200" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-2 text-lg" {...props} />
        ),
        a: ({ node, ...props }) => (
            <a className="text-primary hover:text-primary/70 underline" {...props} />
          ),
      }}
    >
      {post.content.replace(/\n/g, "  \n")}
    </ReactMarkdown>
  </div>
  </article>
  );
};