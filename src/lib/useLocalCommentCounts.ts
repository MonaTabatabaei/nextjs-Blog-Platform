"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

const STORAGE_PREFIX = "comments_post_";

function getStorageKey(postId: number) {
  return `${STORAGE_PREFIX}${postId}`;
}

type CommentLike = { id: number };

type CountsMap = Record<number, number>;

/**
 * Reads persisted comments count for a set of post IDs from localStorage.
 * Used to adjust comment-based sorting on the client so that
 * user-added comments (stored locally) are reflected in sort order.
 */
export function useLocalCommentCounts(postIds: number[]): CountsMap {
  const [counts, setCounts] = useState<CountsMap>({});

  const idsKey = postIds.join(",");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (postIds.length === 0) {
      setCounts({});
      return;
    }

    try {
      const next: CountsMap = {};

      for (const id of postIds) {
        const raw = window.localStorage.getItem(getStorageKey(id));
        if (!raw) {
          next[id] = 0;
          continue;
        }
        const parsed = JSON.parse(raw) as CommentLike[];
        next[id] = Array.isArray(parsed) ? parsed.length : 0;
      }

      setCounts(next);
    } catch {
      // اگر localStorage خراب بود، سایلنت fail می‌کنیم تا UI نجنبّد
      setCounts({});
    }
  }, [idsKey, postIds]);

  return counts;
}

