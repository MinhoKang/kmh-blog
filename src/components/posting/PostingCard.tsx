import Link from "next/link";

interface Posting {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  github?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  date: string;
  type: "project" | "post";
}

interface PostingCardProps {
  posting: Posting;
  index: number;
}

export function PostingCard({ posting, index }: PostingCardProps) {
  return (
    <article className="group">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-16 last:border-b-0">
        {/* 이미지 (있는 경우) */}
        {posting.image && (
          <div className="mb-8 overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[16/9] group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posting.image}
              alt={posting.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        <div className="w-full">
          {/* 포스팅 정보 */}
          <div className="w-full flex flex-col gap-y-2">
            <div className="mb-4">
              <time className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
                {posting.date}
              </time>
            </div>

            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight leading-tight">
              <Link
                href={`/${posting.type === "project" ? "portfolio" : "posts"}/${posting.slug}`}
                className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-300"
              >
                {posting.title}
              </Link>
            </h2>

            {posting.description && (
              <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-6">
                {posting.description}
              </p>
            )}

            {/* 태그 */}
            {posting.tags && posting.tags.length > 0 && (
              <div className="flex flex-col gap-y-1">
                <h3 className="text-sm font-light text-neutral-500 dark:text-neutral-500 mb-3 tracking-widest uppercase">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {posting.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-light bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 링크들 */}
            <div className="flex gap-6">
              <Link
                href={`/${posting.type === "project" ? "portfolio" : "posts"}/${posting.slug}`}
                className="inline-flex items-center text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group/link gap-x-1"
              >
                {posting.type === "project" ? "View Details" : "Read More"}
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
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
              </Link>

              {posting.link && (
                <a
                  href={posting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group/link"
                >
                  Live Site
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}

              {posting.github && (
                <a
                  href={posting.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
