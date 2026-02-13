import type { BlogPost } from "@/components/blog/BlogHome/types";

export type PageProps = {
  params: Promise<{ id: string }>;
};

export type RawComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type CommentWithMeta = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
};

export type PostData = {
  post: BlogPost;
  comments: CommentWithMeta[];
};
