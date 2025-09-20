import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { PageHeader } from "@/components/common";
import { PostingCard } from "@/components/posting/PostingCard";
import { formatDateRange, sortProjectsByStartDate } from "@/lib/date-utils";
import { getReadingTimeFromMdx } from "@/lib/readingTime";

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

function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "src/contents/posts");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const readingTime = getReadingTimeFromMdx(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        startDate: data.startDate,
        endDate: data.endDate,
        date: formatDateRange(data.startDate, data.endDate),
        tags: data.tags || [],
        readingTime: readingTime,
        published: data.published !== false, // 기본값은 true, 명시적으로 false인 경우만 제외
      };
    });

  // published가 true인 것만 필터링하고 startDate 기준으로 정렬 (최신순 - 오래된 것이 아래로)
  return allPostsData
    .filter((post) => post.published)
    .sort(sortProjectsByStartDate);
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl flex-col gap-8 flex h-full">
      {/* 헤더 섹션 */}
      <PageHeader title="Posts" />

      {/* 포스트 목록 */}
      <section>
        {posts.length === 0 ? (
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
    </div>
  );
}
