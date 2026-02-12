import type { CommentsListProps } from "./types";
import type { FunctionComponent } from "react";
import { CommentItem } from "../CommentItem";

export const CommentsList: FunctionComponent<CommentsListProps> = (props) => {
  const { comments } = props;

  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <ul
      className="space-y-4"
      role="list"
      aria-label="List of comments for this post"
    >
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};
