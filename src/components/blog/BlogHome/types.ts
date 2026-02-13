import { SortOption } from "@/utils";

export type BlogPost = {
  id: number;
  userId: number;
  authorId: number;
  title: string;
  body: string;
  authorName: string;
  publishedAt: string;
  commentCount: number;
};

export type BlogHomeProps = {
  posts: BlogPost[];
  sort: SortOption;
  searchQuery: string;
  /** When true, posts = all filtered; BlogHome sorts by total comments (incl. local) and paginates client-side */
  isCommentSortMode?: boolean;
};
