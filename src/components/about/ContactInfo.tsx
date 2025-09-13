interface ContactItem {
  href: string;
  label: string;
  type: string;
}

interface ContactInfoProps {
  contacts: ContactItem[];
}

export function ContactInfo({ contacts }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      {contacts.map((item, index) => (
        <div
          key={item.href}
          className="animate-fade-in"
          style={{ animationDelay: `${500 + index * 100}ms` }}
        >
          <span className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-widest uppercase block mb-1">
            {item.type}
          </span>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={
              item.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-base font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
          >
            {item.label}
          </a>
        </div>
      ))}
    </div>
  );
}
