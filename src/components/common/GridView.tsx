import Image from "next/image";
import Link from "next/link";

interface Posting {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime?: string;
  type: "post" | "project";
  link?: string;
  github?: string;
  image?: string;
}

interface GridViewProps {
  postings: Posting[];
  basePath: string;
}

export function GridView({ postings, basePath }: GridViewProps) {
  if (postings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mx-auto mb-8"></div>
        <p className="text-lg font-light text-neutral-500 dark:text-neutral-500 mb-2 tracking-wide">
          No content yet.
        </p>
        <p className="text-sm font-light text-neutral-400 dark:text-neutral-600 tracking-wide">
          Check back soon for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {postings.map((posting) => (
        <div
          key={posting.slug}
          className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {/* 메인 링크 영역 */}
          <Link href={`${basePath}/${posting.slug}`} className="block">
            {/* 이미지 영역 */}
            {posting.image && (
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative">
                <Image
                  src={posting.image}
                  alt={posting.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* 콘텐츠 영역 */}
            <div className="p-6">
              {/* 메타 정보 */}
              <div className="flex items-center gap-3 mb-3 text-xs font-light text-neutral-500 dark:text-neutral-500 tracking-wide uppercase">
                <time>{posting.date}</time>
                {posting.readingTime && (
                  <>
                    <span>•</span>
                    <span>{posting.readingTime}</span>
                  </>
                )}
              </div>

              {/* 제목 */}
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-200 line-clamp-2">
                {posting.title}
              </h3>

              {/* 설명 */}
              <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                {posting.description}
              </p>

              {/* 태그 */}
              {posting.tags && posting.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {posting.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-light bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {posting.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-light text-neutral-500 dark:text-neutral-500">
                      +{posting.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>

          {/* 외부 링크 (프로젝트인 경우) - Link 밖에 위치 */}
          {posting.type === "project" && (posting.link || posting.github) && (
            <div className="px-6 pb-6">
              <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {posting.link && (
                  <a
                    href={posting.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                )}
                {posting.github && (
                  <a
                    href={posting.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
