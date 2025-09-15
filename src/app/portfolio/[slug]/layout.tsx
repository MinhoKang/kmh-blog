import type { Metadata } from "next";

import { getProject } from "./page";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  // 만약 프로젝트가 없다면 기본 메타데이터를 반환하거나 에러 처리합니다.
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  // 프로젝트 데이터로 메타데이터 객체를 생성하여 반환합니다.
  return {
    title: `${project.title} | KMH's Blog`, // 페이지 제목
    description: project.description, // 페이지 설명
    openGraph: {
      title: `${project.title} | KMH's Blog`, // 공유될 때의 제목
      description: project.description, // 공유될 때의 설명
      // 👈 프로젝트에 이미지가 있다면 그 이미지를, 없다면 기본 OG 이미지를 사용합니다.
      images: [
        {
          url: project.image || "/og-image.jpeg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title: `${project.title} | KMH's Blog`,
      description: project.description,
      images: [project.image || "/og-image.jpeg"],
    },
  };
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
