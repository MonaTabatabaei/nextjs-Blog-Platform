import { PostCard } from "./PostCard";
import type { FunctionComponent } from "react";
import type { PostGridProps } from "./types";

export const PostGrid: FunctionComponent<PostGridProps> = (props) => {
  const { posts } = props;
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Blog posts"
    >
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};
