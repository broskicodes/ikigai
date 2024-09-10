import { BlogPost } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CONSOLE_API_URL } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";

export const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { userId } = useAuth();

  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;

    const response = await fetch(`${CONSOLE_API_URL}/blogposts/`, {
      method: "GET",
      headers: {
        "user-id": userId,
      },
    });
    const data = await response.json();

    console.log(data);
    setPosts((_) => {
      return data.map((post: any) => ({
        ...post,
        date: new Date(post.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));
    });
    // setPosts(data);
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col h-full">
              <CardHeader className="p-0">
                <img
                  src={post.image_url || ""}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    By {post.author}
                  </span>
                  <time className="text-sm text-muted-foreground">
                    {post.date}
                  </time>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};
