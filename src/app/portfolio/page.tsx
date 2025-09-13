import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectCard } from "@/components/projects/ProjectCard";

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

function getAllProjects(): Project[] {
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

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        technologies: data.technologies || [],
        link: data.link,
        github: data.github,
        image: data.image,
        date: data.date || "2024-01-01",
      };
    });

  return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl flex-col gap-8 flex h-full">
      {/* 헤더 섹션 */}
      <section className="">
        <div className="animate-fade-in flex flex-col gap-y-2">
          <h1 className="text-4xl md:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
            Portfolio
          </h1>
          <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-8"></div>
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl tracking-wide leading-relaxed">
            A curated selection of projects that showcase my passion for
            creating exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* 프로젝트 목록 */}
      <section className="animate-fade-in delay-200">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mx-auto mb-8"></div>
            <p className="text-lg font-light text-neutral-500 dark:text-neutral-500 mb-2 tracking-wide">
              Projects coming soon.
            </p>
            <p className="text-sm font-light text-neutral-400 dark:text-neutral-600 tracking-wide">
              Currently working on some exciting new projects.
            </p>
          </div>
        ) : (
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
