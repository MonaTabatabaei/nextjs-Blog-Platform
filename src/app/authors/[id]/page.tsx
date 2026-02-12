import { notFound } from "next/navigation";

import { getAuthorById, getPostsByAuthor } from "@/lib/api";
import { sortPosts, type SortOption } from "@/lib/sortPosts";
import { AuthorHeader } from "@/app/authors/components/AuthorHeader/AuthorHeader";
import { AuthorPostsSection } from "@/app/authors/components/AuthorPostsSection/AuthorPostsSection";
import type { PageProps } from "./types";
import { FunctionComponent } from "react";

function parseSortOption(value: string | undefined): SortOption {
  const valid: SortOption[] = [
    "date_desc",
    "date_asc",
    "title_asc",
    "title_desc",
    "comments_desc",
    "comments_asc",
  ];
  if (!value) return "date_desc";
  return valid.includes(value as SortOption)
    ? (value as SortOption)
    : "date_desc";
}

export const AuthorPage: FunctionComponent<PageProps> = async (props) => {
  const { params, searchParams } = props;
  const [{ id }, { sort }] = await Promise.all([params, searchParams]);

  const authorId = Number(id);
  if (!Number.isFinite(authorId) || authorId <= 0) {
    notFound();
  }

  const sortOption = parseSortOption(sort);

  const [author, posts] = await Promise.all([
    getAuthorById(authorId),
    getPostsByAuthor(authorId),
  ]);

  const sortedPosts = sortPosts(posts, sortOption);

  return (
    <div className="space-y-8">
      <AuthorHeader author={author} totalPosts={sortedPosts.length} />

      <AuthorPostsSection posts={sortedPosts} sort={sortOption} />
    </div>
  );
};
export default AuthorPage;
