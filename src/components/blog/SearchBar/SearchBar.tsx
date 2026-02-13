"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { SearchBarProps } from "./types";
import type { FunctionComponent } from "react";

const DEBOUNCE_MS = 300;

export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const { initialValue, placeholder = "Search posts by title or content…" } =
    props;

  const router = useRouter();
  const pathname = usePathname();

  const [internalValue, setInternalValue] = useState(initialValue);

  // Keep internal state in sync if server-side searchQuery changes
  useEffect(() => {
    setInternalValue(initialValue);
  }, [initialValue]);

  // Debounce updates to URL (?q=...)
  useEffect(() => {
    const handle = setTimeout(() => {
      const trimmed = internalValue.trim();

      // فقط روی کلاینت از window.location استفاده می‌کنیم
      const currentSearch =
        typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(currentSearch);

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      // روی تغییر سرچ، صفحه رو برگردون روی ۱
      params.delete("page");

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      router.push(href);
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [internalValue, pathname, router]);

  return (
    <div className="w-full flex-1">
      <div className="relative w-full max-w-2xl">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search blog posts"
          className="h-10 w-full rounded-full bg-muted/60 pl-9 pr-4 text-sm shadow-sm transition-colors focus-visible:bg-background"
        />
      </div>
    </div>
  );
};
