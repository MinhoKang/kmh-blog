interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-50 mb-6 tracking-tighter leading-tight">
          {title}
        </h1>
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-8" />
        {description && (
          <p className="text-xl font-light text-neutral-600 dark:text-neutral-400 max-w-3xl tracking-wide leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
