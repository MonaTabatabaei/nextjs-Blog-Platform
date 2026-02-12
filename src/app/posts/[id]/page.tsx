import { CommentsSection } from "@/app/posts/components/CommentsSection/CommentsSection";
import { getBlogPosts } from "@/lib/api";
import { getComments as apiGetComments } from "@/lib/generated/blog-api";
import { PostDetail } from "./components/PostDetail";
import { CommentWithMeta, PageProps, PostData, RawComment } from "./types";
import { FunctionComponent } from "react";

function formatCommentDate(index: number): string {
  const date = new Date(2024, 0, 20 + (index % 10), 9 + (index % 5));
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function fetchPostWithRelations(postId: number): Promise<PostData> {
  // استفاده از همان منبعی که صفحه اصلی استفاده می‌کند
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // گرفتن کامنت‌ها از طریق کلاینت Orval (TanStack Query backend)
  const rawCommentsResponse = await apiGetComments({ postId });
  const rawComments = rawCommentsResponse as RawComment[];

  const comments: CommentWithMeta[] = rawComments.map((comment, index) => ({
    id: comment.id,
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
    createdAt: formatCommentDate(index),
  }));

  return {
    post,
    comments,
  };
}

const PostPage: FunctionComponent<PageProps> = async (props) => {
  const { params } = props;
  const { id } = await params;
  const postId = Number(id);

  const data = await fetchPostWithRelations(postId);
  const { post, comments } = data;

  return (
    <div className="space-y-10">
      <PostDetail post={post} />

      <CommentsSection postId={post.id} initialComments={comments} />
    </div>
  );
};

export default PostPage;
