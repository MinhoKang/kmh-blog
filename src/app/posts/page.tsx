import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { PageHeader } from "@/components/common";
import { PostsView } from "@/components/posts/PostsView";
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
    <div className="flex-col gap-8 flex h-full">
      {/* 헤더 섹션 */}
      <PageHeader title="Posts" />

      {/* 포스트 뷰 */}
      <PostsView posts={posts} />
    </div>
  );
}
