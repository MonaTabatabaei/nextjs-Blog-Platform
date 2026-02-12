import { cn } from "@/lib/utils";
import type { ContainerProps } from "./types";
import type { FunctionComponent } from "react";

export const Container: FunctionComponent<ContainerProps> = (props) => {
  const { children, className } = props;

  return (
    <main
      role="main"
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
        // Mobile-first: responsive from 375px and up
        className,
      )}
    >
      {children}
    </main>
  );
};
