import { BlogHome } from "./components/BlogHome";
import { getBlogPosts } from "@/lib/api";

export const BlogPosts = async () => {
  const posts = await getBlogPosts();

  return <BlogHome posts={posts} sort={"date_desc"} searchQuery="" />;
};
