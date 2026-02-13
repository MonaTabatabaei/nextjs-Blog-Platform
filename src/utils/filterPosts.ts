import type { BlogPost } from "@/components/blog/BlogHome/types";

export function filterPosts(posts: BlogPost[], query: string): BlogPost[] {
  const q = query.trim().toLowerCase();

  if (!q) return posts;

  return posts.filter((post) => {
    const title = post.title.toLowerCase();
    const body = post.body.toLowerCase();
    return title.includes(q) || body.includes(q);
  });
}
