"use client";

import { AddCommentForm } from "@/app/posts/components/AddCommentForm/AddCommentForm";
import { usePersistedComments } from "@/lib/usePersistedComments";
import type { CommentsSectionProps, CommentWithMeta } from "./types";
import type { FunctionComponent } from "react";
import { CommentsList } from "../CommentsList";

export const CommentsSection: FunctionComponent<CommentsSectionProps> = (
  props,
) => {
  const { postId, initialComments } = props;
  const { comments, addComment, rollbackComment } = usePersistedComments(
    postId,
    initialComments,
  );

  return (
    <section className="space-y-6" aria-label="Comments section">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Comments</h2>
        <p className="text-sm text-muted-foreground">
          {comments.length} comment{comments.length === 1 ? "" : "s"}
        </p>
      </header>

      <CommentsList comments={comments as CommentWithMeta[]} />

      <AddCommentForm
        postId={postId}
        onCommentAdd={addComment}
        onCommentRollback={rollbackComment}
      />
    </section>
  );
};


