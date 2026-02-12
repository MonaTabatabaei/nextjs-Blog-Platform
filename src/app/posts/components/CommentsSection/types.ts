import type { Comment } from "../AddCommentForm/types";

export type CommentsSectionProps = {
  postId: number;
  initialComments: CommentWithMeta[];
};

export interface CommentWithMeta extends Comment {
  postId: number;
}
