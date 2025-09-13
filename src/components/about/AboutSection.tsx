interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: string;
}

export function AboutSection({ title, children, delay }: AboutSectionProps) {
  return (
    <section className={`animate-fade-in ${delay || ""}`}>
      <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-6 tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}
