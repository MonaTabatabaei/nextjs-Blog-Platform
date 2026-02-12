"use client";

import { useState } from "react";
import type { Theme } from "./types";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", initial === "dark");
    return initial;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return { theme, setTheme };
}
