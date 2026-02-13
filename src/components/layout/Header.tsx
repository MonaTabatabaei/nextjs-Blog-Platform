import Link from "next/link";
import { ThemeToggle } from "@/theme/ThemeToggle";
import type { FunctionComponent } from "react";

const SITE_TITLE = "Blog Platform";

export const Header: FunctionComponent = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 min-h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors"
        >
          {SITE_TITLE}
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Home
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
