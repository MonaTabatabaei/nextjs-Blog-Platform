"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/sortPosts";
import type { SortDropdownProps } from "./types";
import type { FunctionComponent } from "react";

const SORT_LABELS: Record<SortOption, string> = {
  date_desc: "Date (newest first)",
  date_asc: "Date (oldest first)",
  title_asc: "Title (A-Z)",
  title_desc: "Title (Z-A)",
  comments_desc: "Comments (most first)",
  comments_asc: "Comments (least first)",
};

export const SortDropdown: FunctionComponent<SortDropdownProps> = (props) => {
  const { currentSort } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const sort = value as SortOption;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (sort === "date_desc") {
        // default sort – می‌تونی حذفش کنی اگر نخواستی تو URL باشه
        params.delete("sort");
      } else {
        params.set("sort", sort);
      }
      // روی تغییر sort همیشه صفحه رو برگردون روی ۱
      params.delete("page");

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      router.push(href);
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      <span className="text-sm font-medium text-muted-foreground">Sort by</span>
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Sort blog posts"
        className={cn(
          "h-10 rounded-full border border-input bg-muted/60 px-3 pr-8 text-sm shadow-sm",
          "transition-colors focus-visible:bg-background",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        disabled={isPending}
      >
        {(
          [
            "date_desc",
            "date_asc",
            "title_asc",
            "title_desc",
            "comments_desc",
            "comments_asc",
          ] as SortOption[]
        ).map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
    </div>
  );
};
