import { notFound } from "next/navigation";

import { getBlogPosts } from "@/lib/api";
import { sortPosts, type SortOption } from "@/lib/sortPosts";
import { filterPosts } from "@/lib/filterPosts";
import { BlogHome } from "./Blog/components/BlogHome";
import { Pagination } from "./Blog/components/Pagination";

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

  // 2) Sort (سرور)
  const sortedPosts = sortPosts(filteredPosts, sortOption);

  // 3) Paginate
  const totalPosts = sortedPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

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
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
