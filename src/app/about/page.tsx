import { AboutSection } from "@/components/about/AboutSection";
import { SkillList } from "@/components/about/SkillList";
import { ContactInfo } from "@/components/about/ContactInfo";

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
    "Real-time Web Applications",
    "Mobile App Development",
    "Performance Optimization",
    "User Experience Design",
    "State Management Architecture",
    "Cross-Platform Development",
  ];

  const contactInfo = [
    {
      href: "mailto:hello@kmh.dev",
      label: "hello@kmh.dev",
      type: "Email",
    },
    {
      href: "https://github.com/MinhoKang",
      label: "github.com/MinhoKang",
      type: "GitHub",
    },
    {
      href: "https://linkedin.com/in/kmh",
      label: "linkedin.com/in/kmh",
      type: "LinkedIn",
    },
  ];

  return (
    <div className="max-w-4xl">
      {/* 헤더 */}
      <section className="mb-28">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extralight text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
            About
          </h1>
          <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-8"></div>
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl tracking-wide leading-relaxed">
            Frontend Developer with 2+ years of experience building modern web
            and mobile applications. Specialized in React ecosystem and
            passionate about performance optimization.
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        {/* 왼쪽 컬럼 */}
        <div className="space-y-12">
          <AboutSection title="Journey" delay="delay-200">
            <div className="space-y-4 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <p>
                Started as a student management team leader, then transitioned
                to frontend development in 2024. Currently pursuing Computer
                Science at Korea National Open University while working as a
                professional developer.
              </p>
              <p>
                My unique background in education and management gives me a deep
                understanding of user needs and the importance of intuitive,
                accessible interfaces.
              </p>
            </div>
          </AboutSection>

          <AboutSection title="Philosophy">
            <div className="space-y-4 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <p>
                I believe in writing clean, maintainable code that not only
                works but tells a story. Every component should be reusable,
                every function should have a single responsibility.
              </p>
              <p>
                Performance isn&apos;t just about fast loading times—it&apos;s
                about creating seamless experiences that make users forget
                they&apos;re using technology.
              </p>
            </div>
          </AboutSection>

          <AboutSection title="Recent Achievements">
            <div className="space-y-3 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>
                  Improved chat system INP from 3217ms to 87ms using React.memo
                </span>
              </div>
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>
                  Published mobile app on Google Play Store with 100+ downloads
                </span>
              </div>
              <div className="flex items-start">
                <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full mr-4 mt-3"></div>
                <span>
                  Built real-time chat system serving 1000+ concurrent users
                </span>
              </div>
            </div>
          </AboutSection>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-12">
          <AboutSection title="Current Focus" delay="delay-300">
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

          <AboutSection title="Technology Stack">
            <div className="space-y-6">
              <SkillList title="Frontend & Mobile" skills={frontendSkills} />
              <SkillList title="State Management" skills={stateManagement} />
              <SkillList title="Testing & Quality" skills={testingTools} />
              <SkillList title="Development Tools" skills={devTools} />
            </div>
          </AboutSection>

          <AboutSection title="Education">
            <div className="space-y-4 text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  Computer Science
                </p>
                <p>Korea National Open University (2025 - Present)</p>
                <p className="text-neutral-500">GPA: 4.13/4.5</p>
              </div>
              <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  Education
                </p>
                <p>Chung-Ang University (2016 - 2022)</p>
                <p className="text-neutral-500">GPA: 4.05/4.5</p>
              </div>
            </div>
          </AboutSection>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 pt-16 animate-fade-in delay-400">
        <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-8 tracking-wide">
          Let&apos;s Connect
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide mb-6">
              I&apos;m always interested in challenging projects, especially
              those involving real-time systems, mobile development, or
              performance optimization.
            </p>
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              Currently based in Seoul, South Korea. Open to remote
              opportunities and collaborative projects worldwide.
            </p>
          </div>

          <ContactInfo contacts={contactInfo} />
        </div>
      </section>
    </div>
  );
}
