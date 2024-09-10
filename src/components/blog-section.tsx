import { BlogPost } from "@/lib/types";
import { useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



export const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      author: "Author 1",
      title: "Blog Post 1",
      description: "Blog Post 1 Description",
      content: "Blog Post 1 Content",
      img: "/images/ikigai-chart.jpg",
      slug: "blog-post-1",
      date: "2021-01-01",
    },
    {
      author: "Author 2",
      title: "Blog Post 2",
      description: "Blog Post 2 Description",
      content: "Blog Post 2 Content",
      img: "/images/blog/blog-2.png",
      slug: "blog-post-2",
      date: "2021-01-01",
    },
  ]);

  const postsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  //   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch("/api/blog");
//       const data = await response.json();
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col h-full">
              <CardHeader className="p-0">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">By {post.author}</span>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
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
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};