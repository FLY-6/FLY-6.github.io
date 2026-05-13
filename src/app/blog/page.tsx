import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import BlogListClient from "@/app/blog/BlogListClient";

export default function BlogListPage() {
  const allPosts = getAllPosts();
  const categories = getPostsByCategory();

  return <BlogListClient allPosts={allPosts} categories={categories} />;
}
