import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostCard } from "@/components/posts/PostCard";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "src/content/posts");

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

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "2024-01-01",
        tags: data.tags || [],
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl flex-col gap-8 flex h-full">
      {/* 헤더 섹션 */}
      <section className="">
        <div className="animate-fade-in flex flex-col gap-y-2">
          <h1 className="text-4xl md:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
            Posts
          </h1>
          <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-8"></div>
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl tracking-wide leading-relaxed">
            Thoughts, ideas, and insights on technology, design, and life. A
            collection of words that matter.
          </p>
        </div>
      </section>

      {/* 포스트 목록 */}
      <section className="animate-fade-in delay-200">
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
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
