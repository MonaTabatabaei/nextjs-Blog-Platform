"use client";

import type { FunctionComponent } from "react";
import { useMemo } from "react";

import { PostGrid } from "@/app/Blog/components/PostGrid";
import { useLocalCommentCounts } from "@/lib/useLocalCommentCounts";
import { SortDropdown } from "@/app/Blog/components/SortDropdown";
import type { AuthorPostsSectionProps } from "./types";


export const AuthorPostsSection: FunctionComponent<AuthorPostsSectionProps> = (
  props,
) => {
  const { posts, sort } = props;

  const postIds = useMemo(() => posts.map((p) => p.id), [posts]);
  const localCounts = useLocalCommentCounts(postIds);

  const enhancedPosts = useMemo(() => {
    if (sort !== "comments_desc" && sort !== "comments_asc") {
      return posts;
    }

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
    <section aria-label="Posts by author" className="space-y-4">
      <div className="flex justify-end">
        <SortDropdown currentSort={sort} />
      </div>

      {enhancedPosts.length > 0 ? (
        <PostGrid posts={enhancedPosts} />
      ) : (
        <p className="text-sm text-muted-foreground">
          This author has not published any posts yet.
        </p>
      )}
    </section>
  );
};

