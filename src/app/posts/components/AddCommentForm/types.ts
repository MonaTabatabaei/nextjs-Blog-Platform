export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
};

export type AddCommentFormProps = {
  postId: number;
  onCommentAdd: (comment: Comment) => void;
  onCommentRollback?: (commentId: number) => void;
};
