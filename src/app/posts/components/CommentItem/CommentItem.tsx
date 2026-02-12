import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { FunctionComponent } from "react";
import type { CommentItemProps } from "./types";


export const CommentItem: FunctionComponent<CommentItemProps> = (props) => {
  const { comment } = props;

  function getInitials(name: string): string {
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]!.toUpperCase())
      .join("")
      .slice(0, 2);
  }
  const initials = getInitials(comment.name);

  return (
    <article
      aria-label={`Comment by ${comment.name}`}
      className="rounded-lg border border-border bg-card/60 p-4 text-sm shadow-sm"
    >
      <header className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{comment.name}</p>
            <p className="text-xs text-muted-foreground">{comment.email}</p>
          </div>
        </div>
        <time
          dateTime={comment.createdAt}
          className="shrink-0 text-xs text-muted-foreground"
        >
          {comment.createdAt}
        </time>
      </header>
      <p className="mt-1 text-foreground">{comment.body}</p>
    </article>
  );
};
