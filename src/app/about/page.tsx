import { AboutSection } from "@/components/about/AboutSection";
import { SkillList } from "@/components/about/SkillList";
import { ContactInfo } from "@/components/about/ContactInfo";

export default function AboutPage() {
  const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS"];
  const designSkills = ["Figma", "Adobe Creative Suite", "Framer", "Principle"];

  const focusAreas = [
    "Modern Web Technologies",
    "User Experience Design",
    "Performance Optimization",
    "Accessibility Standards",
    "Design Systems",
    "Creative Coding",
  ];

  const contactInfo = [
    {
      href: "mailto:hello@kmh.dev",
      label: "hello@kmh.dev",
      type: "Email",
    },
    {
      href: "https://github.com/kmh",
      label: "github.com/kmh",
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
            Creating meaningful digital experiences through thoughtful design
            and precise engineering.
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        {/* 왼쪽 컬럼 */}
        <div className="space-y-12">
          <AboutSection title="Philosophy" delay="delay-200">
            <div className="space-y-4 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <p>
                I believe in the power of simplicity. Every line of code, every
                design decision, and every user interaction should serve a
                purpose and contribute to a greater whole.
              </p>
              <p>
                My approach combines technical precision with creative vision,
                always keeping the human experience at the center of what I
                create.
              </p>
            </div>
          </AboutSection>

          <AboutSection title="Background">
            <div className="space-y-4 text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              <p>
                With years of experience in web development and digital design,
                I specialize in creating scalable, accessible, and beautiful
                digital products.
              </p>
              <p>
                I&apos;m passionate about emerging technologies, clean code
                practices, and the intersection of design and development.
              </p>
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
              <SkillList title="Frontend" skills={frontendSkills} />
              <SkillList title="Design & Tools" skills={designSkills} />
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
              I&apos;m always interested in new opportunities, creative
              collaborations, and meaningful conversations about design and
              technology.
            </p>
            <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
              Currently based in Seoul, South Korea, but open to remote work
              worldwide.
            </p>
          </div>

          <ContactInfo contacts={contactInfo} />
        </div>
      </section>
    </div>
  );
}
