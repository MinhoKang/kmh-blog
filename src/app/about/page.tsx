import type { Metadata } from "next";

import { AboutSection } from "@/components/about/AboutSection";
import { ContactInfo } from "@/components/about/ContactInfo";
import { SkillList } from "@/components/about/SkillList";
import { PageHeader } from "@/components/common";
import {
  CONTACT_INFO,
  CAREER_EXPERIENCE,
  DEVELOPMENT_PHILOSOPHY,
  FRONTEND_SKILLS,
  STATE_MANAGEMENT,
  TESTING_TOOLS,
  DEV_TOOLS,
  API_TOOLS,
  EDUCATION,
  AI_TOOLS,
} from "@/constants/constants";

export const metadata: Metadata = {
  title: "About | KMH's Blog",
  description: "저의 경력, 기술 스택, 개발 철학에 대해 소개하는 페이지입니다.",
  openGraph: {
    title: "About | KMH's Blog",
    description:
      "저의 경력, 기술 스택, 개발 철학에 대해 소개하는 페이지입니다.",
    url: "/about", // 👈 metadataBase 덕분에 자동으로 절대 경로로 변환됩니다.
    images: [
      {
        url: "/og-image.jpeg", // 👈 이 페이지를 위한 별도 이미지가 없으므로 기본 공유 이미지를 사용합니다.
        width: 1200,
        height: 630,
        alt: "KMH 블로그 소개",
      },
    ],
  },
  twitter: {
    title: "About | KMH's Blog",
    description:
      "저의 경력, 기술 스택, 개발 철학에 대해 소개하는 페이지입니다.",
    images: ["/og-image.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <div className="flex-col gap-8 flex h-full">
      {/* 헤더 */}
      <PageHeader title="About" />

      {/* 메인 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        {/* 왼쪽 컬럼 */}
        <div className="gap-y-12 flex flex-col">
          <AboutSection title="경력">
            <div className="flex flex-col gap-y-6 text-base font-normal font-body text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              {CAREER_EXPERIENCE.map((career, index) => (
                <div
                  key={index}
                  className="border-l-4 border-neutral-300 dark:border-neutral-700 !pl-6 flex flex-col gap-y-2"
                >
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                    {career.title}
                  </h4>
                  <p className="text-sm text-neutral-500 mb-3">{career.team}</p>
                  <p>{career.description}</p>
                </div>
              ))}
            </div>
          </AboutSection>

          <AboutSection title="개발 철학">
            <div className="space-y-4 text-base font-normal font-body text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              {DEVELOPMENT_PHILOSOPHY.map((philosophy, index) => (
                <p key={index}>{philosophy}</p>
              ))}
            </div>
          </AboutSection>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="gap-y-12 flex flex-col">
          {/* <AboutSection title="관심 분야" delay="delay-300">
            <ul className="space-y-3">
              {FOCUS_AREAS.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center text-base font-normal font-body text-neutral-600 dark:text-neutral-400 tracking-wide"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4"></div>
                  {item}
                </li>
              ))}
            </ul>
          </AboutSection> */}

          <AboutSection title="기술 스택">
            <div className="gap-y-6 flex flex-col">
              <SkillList title="프론트엔드 & 모바일" skills={FRONTEND_SKILLS} />
              <SkillList title="상태 관리" skills={STATE_MANAGEMENT} />
              <SkillList title="통신" skills={API_TOOLS} />
              <SkillList title="테스팅 & 품질관리" skills={TESTING_TOOLS} />
              <SkillList title="개발 도구" skills={DEV_TOOLS} />
              <SkillList title="AI 도구" skills={AI_TOOLS} />
            </div>
          </AboutSection>

          <AboutSection title="학력">
            <div className="gap-y-4 flex flex-col text-sm font-normal font-body text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              {EDUCATION.map((education, index) => (
                <div
                  key={index}
                  className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 flex flex-col gap-y-2"
                >
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    {education.school}
                  </p>
                  <p>{education.major}</p>
                  <p className="text-neutral-500">{education.grade}</p>
                </div>
              ))}
            </div>
          </AboutSection>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col gap-y-2">
        <h2 className="text-xl font-semibold font-heading text-charcoal-gray dark:text-light-text mb-8 tracking-wide">
          연락하기
        </h2>
        <ContactInfo contacts={CONTACT_INFO} />
      </section>
    </div>
  );
}
