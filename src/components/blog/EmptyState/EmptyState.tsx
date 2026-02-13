import { FileQuestion } from "lucide-react";
import { FunctionComponent } from "react";
import type { EmptyStateProps } from "./types";

export const EmptyState: FunctionComponent<EmptyStateProps> = (props) => {
  const {
    title = "No results found",
    description = "Try adjusting your search keywords.",
  } = props;

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center"
      role="status"
      aria-label="No matching posts"
    >
      <FileQuestion
        className="mb-4 size-12 text-muted-foreground"
        aria-hidden
      />
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

