import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { PostDetailProps } from "./types";

export const PostDetail: FunctionComponent<PostDetailProps> = (props) => {
  const { post } = props;

  function getInitials(name: string): string {
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]!.toUpperCase())
      .join("")
      .slice(0, 2);
  }
  const initials = getInitials(post.authorName);

  return (
    <article aria-label="Blog post" className="space-y-6">
      <Card className="overflow-hidden border border-border bg-card">
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={`https://picsum.photos/600/400?random=${post.id}`}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <CardHeader className="space-y-4">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <Link
                  href={`/authors/${post.userId}`}
                  className="font-medium text-foreground hover:text-primary underline-offset-4 hover:underline"
                >
                  {post.authorName}
                </Link>
              </div>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            </div>
          </header>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none text-base leading-relaxed text-foreground dark:prose-invert">
            {post.body.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
