import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { FunctionComponent } from "react";

export const PostDetailSkeleton: FunctionComponent = () => {
  return (
    <div className="space-y-10">
      <article aria-label="Loading blog post" className="space-y-6">
        <Card className="overflow-hidden border border-border bg-card">
          <Skeleton className="aspect-video w-full rounded-none" />

          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </article>

      <section
        className="space-y-4"
        aria-label="Loading comments"
        aria-busy="true"
      >
        <div className="space-y-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <ul className="space-y-3" role="list">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Card className="border border-border bg-card/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
