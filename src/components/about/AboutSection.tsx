interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
}

export function AboutSection({ title, children }: AboutSectionProps) {
  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold font-heading text-charcoal-gray dark:text-light-text mb-6 tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}
