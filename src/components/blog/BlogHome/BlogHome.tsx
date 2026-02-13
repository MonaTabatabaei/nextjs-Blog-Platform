"use client";

import { FunctionComponent, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { SearchBar } from "../SearchBar";
import { PostGrid } from "../PostGrid";
import { EmptyState } from "../EmptyState";
import { SortDropdown } from "../SortDropdown";
import type { BlogHomeProps } from "./types";
import { useLocalCommentCounts } from "@/hooks/useLocalCommentCounts";

const POSTS_PER_PAGE = 6;

export const BlogHome: FunctionComponent<BlogHomeProps> = (props) => {
  const { posts, sort, searchQuery, isCommentSortMode } = props;
  const searchParams = useSearchParams();

  const postIds = useMemo(() => posts.map((p) => p.id), [posts]);
  const localCounts = useLocalCommentCounts(postIds);

  const enhancedPosts = useMemo(() => {
    let items = posts;

    if (sort === "comments_desc" || sort === "comments_asc") {
      items = [...posts];
      items.sort((a, b) => {
        const aTotal = a.commentCount + (localCounts[a.id] ?? 0);
        const bTotal = b.commentCount + (localCounts[b.id] ?? 0);
        if (sort === "comments_desc") return bTotal - aTotal;
        return aTotal - bTotal;
      });
    }

    if (isCommentSortMode) {
      const page = Number(searchParams.get("page")) || 1;
      const safePage = Math.max(1, Math.floor(page));
      const start = (safePage - 1) * POSTS_PER_PAGE;
      return items.slice(start, start + POSTS_PER_PAGE);
    }

    return items;
  }, [posts, sort, localCounts, isCommentSortMode, searchParams]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar initialValue={searchQuery} />
        <SortDropdown currentSort={sort} />
      </div>
      {enhancedPosts.length > 0 ? (
        <PostGrid posts={enhancedPosts} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
