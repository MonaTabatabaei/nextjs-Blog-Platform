import type { BlogPost } from "@/app/Blog/components/BlogHome/types";
import {
  getPosts as apiGetPosts,
  getUsers as apiGetUsers,
  getComments as apiGetComments,
  getUserById as apiGetUserById,
} from "@/lib/generated/blog-api";

// These local types describe the shape we map into `BlogPost`.
// The Orval-generated types are structurally compatible, so we
// simply assert them to these shapes where needed.
type RawPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type RawUser = {
  id: number;
  name: string;
  email: string;
  company?: {
    name: string;
  };
};

type RawComment = {
  postId: number;
};

function formatDate(id: number): string {
  const date = new Date(2024, 0, 15 + (id % 15));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
    apiGetPosts(),
    apiGetUsers(),
    apiGetComments(),
  ]);

  const posts = postsResponse as RawPost[];
  const users = usersResponse as RawUser[];
  const comments = commentsResponse as RawComment[];

  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const commentCountByPost = comments.reduce<Record<number, number>>(
    (acc, c) => {
      acc[c.postId] = (acc[c.postId] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return posts.map((post) => ({
    id: post.id,
    userId: post.userId,
    authorId: post.userId,
    title: post.title,
    body: post.body,
    authorName: userMap.get(post.userId) ?? "Unknown",
    publishedAt: formatDate(post.id),
    commentCount: commentCountByPost[post.id] ?? 0,
  }));
};

export type Author = {
  id: number;
  name: string;
  email: string;
  companyName?: string;
};

export const getAuthorById = async (id: number): Promise<Author> => {
  const userResponse = await apiGetUserById(id);
  const user = userResponse as RawUser;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    companyName: user.company?.name,
  };
};

export const getPostsByAuthor = async (
  authorId: number,
): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.authorId === authorId);
};
