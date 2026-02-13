import { notFound } from "next/navigation";

import { getBlogPosts } from "@/lib/api";
import { filterPosts, sortPosts, type SortOption } from "@/utils";
import { BlogHome } from "@/components/blog/BlogHome";
import { Pagination } from "@/components/blog/Pagination";

interface HomeProps {
  searchParams: Promise<{ page?: string; sort?: string; q?: string }>;
}

const POSTS_PER_PAGE = 6;
const DEFAULT_SORT: SortOption = "date_desc";

function parseSortOption(value: string | undefined): SortOption {
  const valid: SortOption[] = [
    "date_desc",
    "date_asc",
    "title_asc",
    "title_desc",
    "comments_desc",
    "comments_asc",
  ];
  if (!value) return DEFAULT_SORT;
  return valid.includes(value as SortOption)
    ? (value as SortOption)
    : DEFAULT_SORT;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, sort, q } = await searchParams;

  let currentPage = Number(page) || 1;
  if (!Number.isFinite(currentPage) || currentPage < 1) {
    currentPage = 1;
  }

  const sortOption = parseSortOption(sort);
  const searchQuery = (q ?? "").trim();

  const posts = await getBlogPosts();

  // 1) Filter (سرور)
  const filteredPosts = filterPosts(posts, searchQuery);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  const isCommentSort =
    sortOption === "comments_desc" || sortOption === "comments_asc";

  let paginatedPosts: typeof filteredPosts;
  if (isCommentSort) {
    // Sort & paginate on client (BlogHome) so local comments are included
    paginatedPosts = filteredPosts;
  } else {
    const sortedPosts = sortPosts(filteredPosts, sortOption);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    paginatedPosts = sortedPosts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE,
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Posts
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collection of blog posts.
        </p>
      </header>

      <BlogHome
        posts={paginatedPosts}
        sort={sortOption}
        searchQuery={searchQuery}
        isCommentSortMode={isCommentSort}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        preserveParams={{
          sort: sortOption !== "date_desc" ? sortOption : undefined,
          q: searchQuery || undefined,
        }}
      />
    </div>
  );
}
