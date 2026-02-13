"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { usePersistedComments } from "@/hooks/usePersistedComments";
import type { FunctionComponent } from "react";
import type { PostCardProps } from "./types";

const EXCERPT_LENGTH = 150;

function getExcerpt(body: string): string {
  const trimmed = body.trim();
  if (trimmed.length <= EXCERPT_LENGTH) return trimmed;
  return `${trimmed.slice(0, EXCERPT_LENGTH).trim()}…`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const PostCard: FunctionComponent<PostCardProps> = (props) => {
  const { post } = props;
  const excerpt = getExcerpt(post.body);
  const initials = getInitials(post.authorName);

  // Only local (user-added) comments; API count already in post.commentCount
  const { localCount } = usePersistedComments(post.id, []);
  const totalComments = post.commentCount + localCount;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50">
      <div className="block flex-1">
        <Link href={`/posts/${post.id}`} className="block">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={`https://picsum.photos/seed/${post.id}/600/400`}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
        <CardHeader className="space-y-2 pb-2">
          <Link href={`/posts/${post.id}`} className="block">
            <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <Link
              href={`/authors/${post.userId}`}
              className="font-medium text-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              {post.authorName}
            </Link>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {excerpt}
          </p>
        </CardContent>
      </div>
      <CardFooter className="mt-auto border-t border-border pt-4">
        <Badge variant="secondary" className="gap-1">
          <MessageCircle className="size-3" aria-hidden />
          <span>{totalComments} comments</span>
        </Badge>
      </CardFooter>
    </Card>
  );
};
