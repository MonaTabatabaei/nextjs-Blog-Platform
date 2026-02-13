"use client";

import { useEffect, useState } from "react";

import type { Comment } from "@/app/posts/components/AddCommentForm/types";

interface CommentWithMeta extends Comment {
  postId: number;
}

const STORAGE_PREFIX = "comments_post_";

function getStorageKey(postId: number) {
  return `${STORAGE_PREFIX}${postId}`;
}

export function usePersistedComments(
  postId: number,
  initialComments: CommentWithMeta[],
) {
  const [comments, setComments] = useState<CommentWithMeta[]>(initialComments);
  const [localComments, setLocalComments] = useState<CommentWithMeta[]>([]);

  // Load persisted comments for this post on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(getStorageKey(postId));
      if (!raw) {
        setComments(initialComments);
        setLocalComments([]);
        return;
      }

      const parsed = JSON.parse(raw) as CommentWithMeta[];
      // Ensure postId is set correctly
      const normalized = parsed.map((c) => ({ ...c, postId }));

      setLocalComments(normalized);
      // Local (user-added) comments first, then server comments
      setComments([...normalized, ...initialComments]);
    } catch {
      setComments(initialComments);
      setLocalComments([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const persist = (items: CommentWithMeta[]) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(getStorageKey(postId), JSON.stringify(items));
    } catch {
      // ignore write errors
    }
  };

  const addComment = (comment: Comment) => {
    const withPostId: CommentWithMeta = {
      ...comment,
      postId,
    };

    setComments((prev) => [withPostId, ...prev]);
    setLocalComments((prev) => {
      const next = [withPostId, ...prev];
      persist(next);
      return next;
    });
  };

  const rollbackComment = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setLocalComments((prev) => {
      const next = prev.filter((c) => c.id !== commentId);
      persist(next);
      return next;
    });
  };

  const localCount = localComments.length;

  return { comments, addComment, rollbackComment, localCount };
}
