interface SkillListProps {
  title: string;
  skills: string[];
}

export function SkillList({ title, skills }: SkillListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-sm font-medium font-heading text-neutral-500 dark:text-neutral-500 mb-3 tracking-widest uppercase">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm font-normal font-body bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 tracking-wide"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
