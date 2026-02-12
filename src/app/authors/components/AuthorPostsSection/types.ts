import { BlogPost } from "@/app/Blog/components/BlogHome/types";
import { SortOption } from "@/lib/sortPosts";

export type AuthorPostsSectionProps = {
  posts: BlogPost[];
  sort: SortOption;
};
