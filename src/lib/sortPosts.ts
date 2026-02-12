import type { BlogPost } from "@/app/Blog/components/BlogHome/types";

export type SortOption =
  | "date_desc"
  | "date_asc"
  | "title_asc"
  | "title_desc"
  | "comments_desc"
  | "comments_asc";

export function sortPosts(posts: BlogPost[], sort: SortOption): BlogPost[] {
  const items = [...posts];

  items.sort((a, b) => {
    switch (sort) {
      case "date_desc":
        // newer first – id بالاتر جدیدتر
        return b.id - a.id;
      case "date_asc":
        return a.id - b.id;
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      case "comments_desc":
        return b.commentCount - a.commentCount;
      case "comments_asc":
        return a.commentCount - b.commentCount;
      default:
        return 0;
    }
  });

  return items;
}
