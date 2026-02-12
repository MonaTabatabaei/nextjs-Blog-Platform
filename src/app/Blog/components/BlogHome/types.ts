import { SortOption } from "@/lib/sortPosts";

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
};
