import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Latest Posts
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collection of blog posts.
        </p>
      </header>

      <div role="status" aria-busy="true" aria-label="Loading blog posts">
        <LoadingSkeleton />
      </div>
    </div>
  );
}

