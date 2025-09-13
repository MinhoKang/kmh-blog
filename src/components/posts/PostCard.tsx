import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <article
      className="group animate-fade-in"
      style={{ animationDelay: `${300 + index * 100}ms` }}
    >
      <Link href={`/writes/${post.slug}`} className="block">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-12 transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600">
          {/* 날짜 */}
          <div className="mb-4">
            <time className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* 제목 */}
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight leading-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">
            {post.title}
          </h2>

          {/* 설명 */}
          {post.description && (
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-6 max-w-2xl">
              {post.description}
            </p>
          )}

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-light bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 읽기 표시 */}
          <div className="mt-6 flex items-center">
            <span className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-wide group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
              Read more
            </span>
            <svg
              className="w-4 h-4 ml-2 text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
