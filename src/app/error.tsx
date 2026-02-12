"use client";

import type { FC } from "react";

import { ErrorState } from "@/components/ui/ErrorState";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: FC<GlobalErrorProps> = ({ reset }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <ErrorState
            title="Something went wrong."
            description="Something went wrong while loading posts. Please try again."
            onRetry={reset}
          />
        </main>
      </body>
    </html>
  );
};

export default GlobalError;

