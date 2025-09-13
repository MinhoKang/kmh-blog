"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HomeHeaderProps {
  isLoaded: boolean;
}

export function HomeHeader({ isLoaded }: HomeHeaderProps) {
  const navigationItems = [
    { href: "/writes", label: "Writes" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="grid-minimal py-10">
        <div className="flex items-center justify-between">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <Link
              href="/"
              className="text-xl font-light text-neutral-900 dark:text-neutral-100 tracking-wide hover:opacity-60 transition-opacity duration-300"
            >
              KMH
            </Link>
          </div>

          <nav
            className={`flex items-center space-x-8 transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="hidden md:flex items-center space-x-8 mr-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 tracking-wide relative group"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 dark:bg-neutral-100 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            {/* <ThemeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
