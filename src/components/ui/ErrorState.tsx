import type { FunctionComponent } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: FunctionComponent<ErrorStateProps> = ({
  title,
  description,
  onRetry,
  className,
}) => {
  return (
    <div className={cn("flex justify-center px-4 sm:px-0", className)}>
      <Card
        role="alert"
        aria-live="assertive"
        className="w-full max-w-xl space-y-4 border-destructive/30 bg-destructive/5 p-6 text-sm shadow-sm"
      >
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {onRetry && (
          <div className="pt-2">
            <Button type="button" size="sm" onClick={onRetry}>
              Retry
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
