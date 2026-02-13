import Link from "next/link";
import type { FunctionComponent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import type { PageItem, PaginationProps } from "./types";

function createPageHref(
  page: number,
  preserveParams?: { sort?: string; q?: string },
) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", page.toString());
  if (preserveParams?.sort) params.set("sort", preserveParams.sort);
  if (preserveParams?.q) params.set("q", preserveParams.q);
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PageItem[] = [];

  // Always show first page
  items.push(1);

  if (currentPage <= 2) {
    // First pages: 1 2 3 ... last
    items.push(2, 3, "dots", totalPages);
  } else if (currentPage >= totalPages - 1) {
    // Last pages: 1 ... last-2 last-1 last
    items.push("dots", totalPages - 2, totalPages - 1, totalPages);
  } else {
    // Middle: 1 ... current-1 current current+1 ... last
    items.push(
      "dots",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "dots",
      totalPages,
    );
  }

  // Remove duplicates and invalid pages
  const normalized: PageItem[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (item === "dots") {
      if (normalized[normalized.length - 1] !== "dots") {
        normalized.push("dots");
      }
    } else if (item >= 1 && item <= totalPages) {
      const key = `p-${item}`;
      if (!seen.has(key)) {
        seen.add(key);
        normalized.push(item);
      }
    }
  }

  return normalized;
}

export const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { currentPage, totalPages, preserveParams } = props;
  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center px-2 py-4 sm:px-0"
    >
      <div className="inline-flex items-center gap-2">
        {/* Previous */}
        <Button
          asChild
          variant="outline"
          size="sm"
          aria-disabled={isFirstPage}
          className={cn(
            "min-w-8 px-2 text-xs sm:min-w-[72px] sm:px-3 sm:text-sm",
            isFirstPage && "pointer-events-none opacity-50",
          )}
        >
          <Link href={createPageHref(isFirstPage ? 1 : prevPage, preserveParams)}>
            <span className="inline sm:hidden">&lt;&lt;</span>
            <span className="hidden sm:inline">Previous</span>
          </Link>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {pageItems.map((item, index) =>
            item === "dots" ? (
              <span
                key={`dots-${index}`}
                className="px-2 text-xs text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                asChild
                size="sm"
                variant={item === currentPage ? "default" : "outline"}
                aria-current={item === currentPage ? "page" : undefined}
                className="min-w-8 px-2 text-xs sm:text-sm"
              >
                <Link href={createPageHref(item, preserveParams)}>{item}</Link>
              </Button>
            ),
          )}
        </div>

        {/* Next */}
        <Button
          asChild
          variant="outline"
          size="sm"
          aria-disabled={isLastPage}
          className={cn(
            "min-w-8 px-2 text-xs sm:min-w-[72px] sm:px-3 sm:text-sm",
            isLastPage && "pointer-events-none opacity-50",
          )}
        >
          <Link href={createPageHref(isLastPage ? totalPages : nextPage, preserveParams)}>
            <span className="inline sm:hidden">&gt;&gt;</span>
            <span className="hidden sm:inline">Next</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
};
