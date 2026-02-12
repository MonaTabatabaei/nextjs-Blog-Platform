import { PostDetailSkeleton } from "@/app/posts/components/PostDetailSkeleton";
import type { FunctionComponent } from "react";

export const LoadingPost: FunctionComponent = () => {
  return (
    <div role="status" aria-busy="true" aria-label="Loading blog post">
      <PostDetailSkeleton />
    </div>
  );
};
