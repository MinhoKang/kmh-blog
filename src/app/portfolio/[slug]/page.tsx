import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateRange } from "@/lib/date-utils";
import { TableOfContents } from "@/components/common/TableOfContents";
import { CustomMdxRemote } from "@/components/mdx/CustomMdxRemote";

interface Props {
  params: {
    slug: string;
  };
}

export async function getProject(slug: string) {
  const projectsDirectory = path.join(process.cwd(), "src/content/portfolio");
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || slug,
    description: data.description || "",
    tags: data.tags || [],
    link: data.link,
    github: data.github,
    image: data.image,
    startDate: data.startDate,
    endDate: data.endDate,
    date: formatDateRange(data.startDate, data.endDate),
    content,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-6xl flex flex-col gap-y-8 relative">
      {/* 뒤로가기 */}
      <div className="mb-12">
        <Link
          href="/portfolio"
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
          Back to Portfolio
        </Link>
      </div>

      {/* 프로젝트 헤더 */}
      <header className="mb-16 animate-fade-in delay-200 flex flex-col gap-y-4">
        {/* 프로젝트 이미지 */}
        {project.image && (
          <div className="mb-12 overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-12">
          {/* 왼쪽: 메인 정보 */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <time className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
                {project.date}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
              {project.title}
            </h1>

            {project.description && (
              <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-8">
                {project.description}
              </p>
            )}
          </div>

          {/* 오른쪽: 메타 정보 */}
          <div className="flex flex-col gap-y-8">
            {/* 기술 스택 */}
            {project.tags.length > 0 && (
              <div>
                <h2 className="text-sm font-light text-neutral-500 dark:text-neutral-500 mb-4 tracking-widest uppercase">
                  Technologies
                </h2>
                <div className="space-y-2">
                  {project.tags.map((tech: string) => (
                    <div
                      key={tech}
                      className="text-base font-light text-neutral-700 dark:text-neutral-300 tracking-wide"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 링크들 */}
            <div>
              <h2 className="text-sm font-light text-neutral-500 dark:text-neutral-500 mb-4 tracking-widest uppercase">
                Links
              </h2>
              <div className="space-y-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-base font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide group"
                  >
                    Live Site
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:-translate-y-1"
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
                    className="items-center text-base font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide block"
                  >
                    GitHub Repository
                    <svg
                      className="w-4 h-4 ml-2"
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
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800"></div>
      </header>

      {/* 프로젝트 상세 내용 */}
      <main className="flex gap-8">
        <div className="flex-1">
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <CustomMdxRemote source={project.content} />
          </div>
        </div>

        {/* TOC - 데스크톱에서만 표시 */}
        <TableOfContents />
      </main>

      {/* 하단 내비게이션 */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link
            href="/portfolio"
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
            More Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), "src/content/portfolio");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ""),
    }));
}
