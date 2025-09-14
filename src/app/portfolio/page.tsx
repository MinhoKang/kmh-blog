import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { PageHeader } from "@/components/common/PageHeader";
import { PostingCard } from "@/components/posting/PostingCard";
import { formatDateRange, sortProjectsByStartDate } from "@/lib/date-utils";
import { getReadingTimeFromMdx } from "@/lib/readingTime";

interface Project {
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
  readingTime?: string;
}
const getAllProjects = (): Project[] => {
  const projectsDirectory = path.join(process.cwd(), "src/content/portfolio");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const readingTime = getReadingTimeFromMdx(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tags: data.technologies || data.tags || [],
        link: data.link,
        github: data.github,
        image: data.image,
        startDate: data.startDate,
        endDate: data.endDate,
        date: formatDateRange(data.startDate, data.endDate),
        readingTime: readingTime,
        published: data.published !== false, // 기본값은 true, 명시적으로 false인 경우만 제외
      };
    });

  // published가 true인 것만 필터링하고 startDate 기준으로 정렬 (최신순 - 오래된 것이 아래로)
  return allProjectsData
    .filter((project) => project.published)
    .sort(sortProjectsByStartDate);
};

export default async function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl flex-col gap-8 flex h-full">
      {/* 헤더 섹션 */}
      <PageHeader title="Portfolio" />

      {/* 프로젝트 목록 */}
      <section>
        {projects.length !== 0 && (
          <div className="space-y-32">
            {projects.map((project, index) => (
              <PostingCard
                key={project.slug}
                posting={{
                  ...project,
                  type: "project" as const,
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
