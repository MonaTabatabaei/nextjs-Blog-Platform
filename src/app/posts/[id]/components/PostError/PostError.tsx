"use client";

import type { FunctionComponent } from "react";

import { ErrorState } from "@/components/ui/ErrorState";
import type { PostErrorProps } from "./types";

export const PostError: FunctionComponent<PostErrorProps> = (props) => {
  const { reset } = props;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <ErrorState
        title="Failed to load this post."
        description="We couldn't load this blog post. Please check your connection and try again."
        onRetry={reset}
      />
    </div>
  );
};
