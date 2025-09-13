import { AboutSection } from "@/components/about/AboutSection";
import { SkillList } from "@/components/about/SkillList";
import { ContactInfo } from "@/components/about/ContactInfo";
import { PageHeader } from "@/components/common/PageHeader";
import {
  CONTACT_INFO,
  CAREER_EXPERIENCE,
  DEVELOPMENT_PHILOSOPHY,
  FRONTEND_SKILLS,
  STATE_MANAGEMENT,
  TESTING_TOOLS,
  DEV_TOOLS,
  API_TOOLS,
} from "@/constants/constants";

export default function AboutPage() {
  return (
    <div className="max-w-4xl flex-col gap-8 flex h-full">
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
            </div>
          </AboutSection>

          <AboutSection title="학력">
            <div className="gap-y-4 flex flex-col text-sm font-normal font-body text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 flex flex-col gap-y-2">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  한국방송통신대학교 (2025.02 ~ 재학 중)
                </p>
                <p>컴퓨터과학과 (3학년 편입)</p>
                <p className="text-neutral-500">3학년 1학기: 4.13/4.5</p>
              </div>
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 flex flex-col gap-y-2">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  중앙대학교 (2016.03 ~ 2022.02)
                </p>
                <p>교육학과</p>
                <p className="text-neutral-500">졸업학점: 4.05/4.5</p>
              </div>
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
