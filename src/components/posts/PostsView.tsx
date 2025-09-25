"use client";

import { ViewTypeToggle, GridView } from "@/components/common";
import { PostingCard } from "@/components/posting/PostingCard";
import { useViewType } from "@/hooks";

interface Post {
  slug: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  date: string;
  tags?: string[];
  readingTime?: string;
}

interface PostsViewProps {
  posts: Post[];
}

export function PostsView({ posts }: PostsViewProps) {
  const { viewType, setViewType } = useViewType("posts-view-type", "list");

  return (
    <>
      {/* 뷰타입 토글 */}
      <div className="flex justify-end mb-8">
        <ViewTypeToggle viewType={viewType} onViewTypeChange={setViewType} />
      </div>

      {/* 포스트 목록 */}
      <section>
        {viewType === "grid" ? (
          <GridView
            postings={posts.map((post) => ({ ...post, type: "post" as const }))}
            basePath="/posts"
          />
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mx-auto mb-8"></div>
            <p className="text-lg font-light text-neutral-500 dark:text-neutral-500 mb-2 tracking-wide">
              No posts yet.
            </p>
            <p className="text-sm font-light text-neutral-400 dark:text-neutral-600 tracking-wide">
              Check back soon for new content.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {posts.map((post, index) => (
              <PostingCard
                key={post.slug}
                posting={{
                  ...post,
                  type: "post" as const,
                }}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
