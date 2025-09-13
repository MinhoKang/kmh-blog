import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "src/content/posts");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "2024-01-01",
    tags: data.tags || [],
    content,
  };
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      {/* 뒤로가기 */}
      <div className="mb-12 animate-fade-in">
        <Link
          href="/writes"
          className="inline-flex items-center text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group"
        >
          <svg
            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Writes
        </Link>
      </div>

      {/* 포스트 헤더 */}
      <header className="mb-16 animate-fade-in delay-200">
        {/* 날짜 */}
        <div className="mb-6">
          <time className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* 제목 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
          {post.title}
        </h1>

        {/* 설명 */}
        {post.description && (
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-wide mb-8">
            {post.description}
          </p>
        )}

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-light bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 구분선 */}
        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mt-12"></div>
      </header>

      {/* 포스트 내용 */}
      <article className="animate-fade-in delay-300">
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* 하단 내비게이션 */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20 pt-12 animate-fade-in delay-400">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link
            href="/writes"
            className="inline-flex items-center text-base font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            More Writes
          </Link>

          <div className="flex gap-6">
            <a
              href={`mailto:hello@kmh.dev?subject=About "${post.title}"`}
              className="text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
            >
              Discuss
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Check out "${
                post.title
              }" by KMH&url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
            >
              Share
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/content/posts");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ""),
    }));
}
