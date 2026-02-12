"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/useTheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FunctionComponent } from "react";
import type { ThemeToggleProps } from "./types";

export const ThemeToggle: FunctionComponent<ThemeToggleProps> = (props) => {
  const { className } = props;
  
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className={cn(className)}
    >
      <Sun className="size-[1.125rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.125rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
