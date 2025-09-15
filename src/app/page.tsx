import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { NavigationCards } from "@/components/home/NavigationCards";

export const metadata: Metadata = {
  title: "KMH's Blog - 포트폴리오 & 개발 블로그",
  description:
    "Next.js, TypeScript, Tailwind CSS로 개발한 개인 포트폴리오와 기술 블로그입니다. 개발 경험과 프로젝트를 공유합니다.",
  openGraph: {
    title: "KMH's Blog - 포트폴리오 & 개발 블로그",
    description:
      "Next.js, TypeScript, Tailwind CSS로 개발한 개인 포트폴리오와 기술 블로그입니다. 개발 경험과 프로젝트를 공유합니다.",
    url: "https://kmh-blog.vercel.app",
    siteName: "KMH's Blog",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "KMH 블로그 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KMH's Blog - 포트폴리오 & 개발 블로그",
    description:
      "Next.js, TypeScript, Tailwind CSS로 개발한 개인 포트폴리오와 기술 블로그입니다. 개발 경험과 프로젝트를 공유합니다.",
    images: ["/og-image.jpeg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ghost-white dark:bg-charcoal-gray transition-colors duration-700">
      {/* 그리드 시스템 */}
      <div className="grid-minimal min-h-screen h-full">
        <Header variant="home" />

        {/* 메인 콘텐츠 */}
        <main className="flex flex-col justify-center min-h-screen gap-y-10">
          <HeroSection />
          <NavigationCards />
          <Footer variant="home" />
        </main>
      </div>
    </div>
  );
}
