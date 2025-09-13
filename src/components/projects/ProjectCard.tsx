import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="group animate-fade-in"
      style={{ animationDelay: `${300 + index * 150}ms` }}
    >
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-16 last:border-b-0">
        {/* 프로젝트 이미지 (있는 경우) */}
        {project.image && (
          <div className="mb-8 overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[16/9] group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* 왼쪽: 프로젝트 정보 */}
          <div>
            <div className="mb-4">
              <time className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
                {new Date(project.date).getFullYear()}
              </time>
            </div>

            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight leading-tight">
              <Link
                href={`/portfolio/${project.slug}`}
                className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-300"
              >
                {project.title}
              </Link>
            </h2>

            {project.description && (
              <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-6">
                {project.description}
              </p>
            )}

            {/* 기술 스택 */}
            {project.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-light text-neutral-500 dark:text-neutral-500 mb-3 tracking-widest uppercase">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-light bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 링크들 */}
            <div className="flex gap-6">
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group/link"
              >
                View Details
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

              {project.link && (
                <a
                  href={project.link}
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

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* 오른쪽: 추가 정보나 여백 */}
          <div className="hidden md:block">{/* 여백 또는 추가 정보 */}</div>
        </div>
      </div>
    </article>
  );
}
