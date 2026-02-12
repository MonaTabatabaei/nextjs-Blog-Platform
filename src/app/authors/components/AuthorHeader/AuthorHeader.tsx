import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { AuthorHeaderProps } from "./types";
import type { FunctionComponent } from "react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .join("")
    .slice(0, 2);
}

export const AuthorHeader: FunctionComponent<AuthorHeaderProps> = (props) => {
  const { author, totalPosts } = props;
  const initials = getInitials(author.name);

  return (
    <section aria-label="Author information">
      <Card className="flex items-center gap-4 border border-border bg-card p-4 sm:p-6">
        <Avatar className="size-14 sm:size-16">
          <AvatarFallback className="text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {author.name}
          </h1>
          <p className="text-sm text-muted-foreground">{author.email}</p>
          {author.companyName && (
            <p className="text-xs text-muted-foreground">
              {author.companyName}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {totalPosts} post{totalPosts === 1 ? "" : "s"}
          </p>
        </div>
      </Card>
    </section>
  );
};
