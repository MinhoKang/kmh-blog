"use client";

interface HomeFooterProps {
  isLoaded: boolean;
}

interface ContactLink {
  href: string;
  label: string;
}

export function HomeFooter({ isLoaded }: HomeFooterProps) {
  const contactLinks: ContactLink[] = [
    { href: "mailto:hello@kmh.dev", label: "Email" },
    { href: "https://github.com/kmh", label: "GitHub" },
    { href: "https://linkedin.com/in/kmh", label: "LinkedIn" },
  ];

  return (
    <section
      className={`py-16 border-t border-neutral-200 dark:border-neutral-800 mt-20 transition-all duration-1000 delay-1400 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-wide">
            Currently available for new opportunities
          </p>
          <p className="text-sm font-light text-neutral-400 dark:text-neutral-600 tracking-wide mt-1">
            Based in Seoul, South Korea
          </p>
        </div>

        <div className="flex space-x-6">
          {contactLinks.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
              style={{ animationDelay: `${1500 + index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
