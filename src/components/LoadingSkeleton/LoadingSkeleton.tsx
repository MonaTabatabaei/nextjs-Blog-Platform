import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

const CARD_COUNT = 6;

export const LoadingSkeleton: FunctionComponent = () => {
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-busy="true"
      aria-label="Loading blog posts"
    >
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <li key={i}>
          <Card className="overflow-hidden">
            <Skeleton className="aspect-video w-full rounded-none" />
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-5 w-24 rounded-md" />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
