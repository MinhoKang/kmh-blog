"use client";

import { ViewTypeToggle, GridView } from "@/components/common";
import { PostingCard } from "@/components/posting/PostingCard";
import { useViewType } from "@/hooks";

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

interface PortfolioViewProps {
  projects: Project[];
}

export function PortfolioView({ projects }: PortfolioViewProps) {
  const { viewType, setViewType } = useViewType("portfolio-view-type", "list");

  return (
    <>
      {/* 뷰타입 토글 */}
      <div className="flex justify-end mb-8">
        <ViewTypeToggle viewType={viewType} onViewTypeChange={setViewType} />
      </div>

      {/* 프로젝트 목록 */}
      <section>
        {viewType === "grid" ? (
          <GridView
            postings={projects.map((project) => ({
              ...project,
              type: "project" as const,
            }))}
            basePath="/portfolio"
          />
        ) : (
          projects.length !== 0 && (
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
          )
        )}
      </section>
    </>
  );
}
