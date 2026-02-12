"use client";

import { FunctionComponent, useMemo } from "react";

import { SearchBar } from "../SearchBar";
import { PostGrid } from "../PostGrid";
import { EmptyState } from "../EmptyState";
import { SortDropdown } from "../SortDropdown";
import type { BlogHomeProps } from "./types";
import { useLocalCommentCounts } from "@/lib/useLocalCommentCounts";

export const BlogHome: FunctionComponent<BlogHomeProps> = (props) => {
  const { posts, sort, searchQuery } = props;

  const postIds = useMemo(() => posts.map((p) => p.id), [posts]);
  const localCounts = useLocalCommentCounts(postIds);

  const enhancedPosts = useMemo(() => {
    // برای سورت‌های غیرِ بر اساس کامنت، همون آرایهٔ سروری رو استفاده کن
    if (sort !== "comments_desc" && sort !== "comments_asc") {
      return posts;
    }

    // برای سورت بر اساس کامنت، تعداد لوکال رو هم در نظر بگیر
    const items = [...posts];

    items.sort((a, b) => {
      const aTotal = a.commentCount + (localCounts[a.id] ?? 0);
      const bTotal = b.commentCount + (localCounts[b.id] ?? 0);

      if (sort === "comments_desc") {
        return bTotal - aTotal;
      }
      return aTotal - bTotal;
    });

    return items;
  }, [posts, sort, localCounts]);

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

