import type { BlogPost } from "@/components/blog/BlogHome/types";
import { SortOption } from "@/utils";

export type AuthorPostsSectionProps = {
  posts: BlogPost[];
  sort: SortOption;
};
