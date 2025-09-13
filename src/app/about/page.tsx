import { AboutSection } from "@/components/about/AboutSection";
import { SkillList } from "@/components/about/SkillList";
import { ContactInfo } from "@/components/about/ContactInfo";
import { CONTACT_INFO } from "@/lib/constants";

export default function AboutPage() {
  const frontendSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "React Native",
    "Expo",
  ];

  const stateManagement = ["TanStack Query", "Zustand", "Recoil"];

  const testingTools = ["Jest", "React Testing Library", "MSW"];

  const devTools = [
    "GitHub",
    "Cursor",
    "Jira",
    "Confluence",
    "Slack",
    "Sentry",
    "Socket.io",
  ];

  const focusAreas = [
    "실시간 웹 애플리케이션",
    "모바일 앱 개발",
    "성능 최적화",
    "사용자 경험 설계",
    "상태 관리 아키텍처",
    "크로스 플랫폼 개발",
  ];

  return (
    <div className="max-w-4xl flex-col gap-16 flex h-full">
      {/* 헤더 */}
      <section className="mb-28">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
            About
          </h1>
          <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-8"></div>
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl tracking-wide leading-relaxed">
            교육학 전공에서 개발자로 전향한 프론트엔드 개발자입니다. 학생 관리
            경험을 바탕으로 사용자 중심의 웹 애플리케이션을 개발합니다.
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        {/* 왼쪽 컬럼 */}
        <div className="space-y-12">
          <AboutSection title="경력" delay="delay-200">
            <div className="space-y-6 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-6">
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                  프론트엔드 개발자 (2024.01 ~ 현재)
                </h4>
                <p className="text-sm text-neutral-500 mb-3">개발팀</p>
                <p>
                  React 기반 웹 애플리케이션과 React Native 모바일 앱 개발을
                  담당하고 있습니다. 실시간 채팅 시스템, 학생 관리 플랫폼 등
                  다양한 프로젝트를 진행했습니다.
                </p>
              </div>
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-6">
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                  학생 관리 팀장 (2022.09 ~ 2023.12)
                </h4>
                <p className="text-sm text-neutral-500 mb-3">매니징팀</p>
                <p>
                  학생 관리 업무를 맡으며 팀원에서 팀장으로 성장했습니다. 이
                  경험을 통해 사용자의 니즈를 깊이 이해하고 효율적인 시스템의
                  중요성을 깨달았습니다.
                </p>
              </div>
            </div>
          </AboutSection>

          <AboutSection title="개발 철학">
            <div className="space-y-4 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <p>
                깨끗하고 유지보수가 쉬운 코드를 작성하는 것을 중요하게
                생각합니다. 모든 컴포넌트는 재사용 가능해야 하고, 각 함수는 단일
                책임을 가져야 한다고 믿습니다.
              </p>
              <p>
                성능은 단순히 빠른 로딩 시간이 아닌, 사용자가 기술을 사용하고
                있다는 것을 잊을 정도로 자연스러운 경험을 만드는 것이라고
                생각합니다.
              </p>
            </div>
          </AboutSection>

          <AboutSection title="주요 성과">
            <div className="space-y-3 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>채팅 시스템 성능 97% 향상 (INP 3217ms → 87ms)</span>
              </div>
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>구글 플레이스토어 앱 출시 (100+ 다운로드)</span>
              </div>
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>1000+ 동시 사용자 지원하는 실시간 채팅 시스템 구축</span>
              </div>
            </div>
          </AboutSection>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-12">
          <AboutSection title="관심 분야" delay="delay-300">
            <ul className="space-y-3">
              {focusAreas.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center text-base font-light text-neutral-600 dark:text-neutral-400 tracking-wide"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4"></div>
                  {item}
                </li>
              ))}
            </ul>
          </AboutSection>

          <AboutSection title="기술 스택">
            <div className="space-y-6">
              <SkillList title="프론트엔드 & 모바일" skills={frontendSkills} />
              <SkillList title="상태 관리" skills={stateManagement} />
              <SkillList title="테스팅 & 품질관리" skills={testingTools} />
              <SkillList title="개발 도구" skills={devTools} />
            </div>
          </AboutSection>

          <AboutSection title="학력">
            <div className="space-y-4 text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  컴퓨터과학과 (3학년 편입)
                </p>
                <p>한국방송통신대학교 (2025.02 ~ 재학 중)</p>
                <p className="text-neutral-500">3학년 1학기: 4.13/4.5</p>
              </div>
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  교육학과
                </p>
                <p>중앙대학교 (2016.03 ~ 2022.02)</p>
                <p className="text-neutral-500">졸업학점: 4.05/4.5</p>
              </div>
            </div>
          </AboutSection>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 pt-16 animate-fade-in delay-400">
        <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-8 tracking-wide">
          연락하기
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-6">
              실시간 시스템, 모바일 개발, 성능 최적화 등 도전적인 프로젝트에
              항상 관심이 있습니다.
            </p>
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              현재 서울에 거주하고 있으며, 원격 근무 기회와 전 세계 협업
              프로젝트에 열려있습니다.
            </p>
          </div>

          <ContactInfo contacts={CONTACT_INFO} />
        </div>
      </section>
    </div>
  );
}
