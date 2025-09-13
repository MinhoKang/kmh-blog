"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAVIGATION_CARDS } from "@/lib/constants";

interface NavigationCard {
  href: string;
  label: string;
  desc: string;
}

export function NavigationCards() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl">
      <div
        className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1100 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {NAVIGATION_CARDS.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative block p-6 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 bg-ghost-white/50 dark:bg-neutral-800/30 backdrop-blur-sm"
            style={{ animationDelay: `${1200 + index * 100}ms` }}
          >
            <div className="flex flex-col">
              <span className="text-lg font-medium font-heading text-charcoal-gray dark:text-light-text mb-1 tracking-wide">
                {item.label}
              </span>
              <span className="text-sm font-body text-neutral-500 dark:text-neutral-500 tracking-wide">
                {item.desc}
              </span>
            </div>

            {/* 호버 효과 */}
            <div className="absolute inset-0 border border-transparent group-hover:border-charcoal-gray dark:group-hover:border-light-text transition-all duration-300 translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
