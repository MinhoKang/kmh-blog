"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { NAVIGATION_ITEMS } from "@/lib/constants";

interface HeaderProps {
  variant?: "home" | "page";
}

export function Header({ variant = "page" }: HeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (variant === "home") {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [variant]);

  const isHomePage = variant === "home";

  return (
    <header
      className={`z-50 backdrop-blur-sm ${
        isHomePage
          ? "fixed top-0 left-0 right-0"
          : "sticky top-0 bg-ghost-white/80 dark:bg-charcoal-gray/80 border-b border-neutral-200 dark:border-neutral-800"
      }`}
    >
      <div className={`grid-minimal !py-5 ${isHomePage ? "py-10" : "py-8"}`}>
        <div className="flex items-center justify-between">
          <div
            className={`${
              isHomePage
                ? `transition-all duration-1000 delay-200 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4"
                  }`
                : ""
            }`}
          >
            <Link
              href="/"
              className={`font-medium font-heading text-charcoal-gray dark:text-light-text tracking-wide hover:opacity-60 transition-opacity duration-300 ${
                isHomePage ? "text-xl" : "text-lg"
              }`}
            >
              KMH
            </Link>
          </div>

          <nav
            className={`flex items-center gap-x-6 ${
              isHomePage
                ? `transition-all duration-1000 delay-300 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4"
                  }`
                : ""
            }`}
          >
            <div
              className={`hidden md:flex items-center ${isHomePage ? "gap-x-8 mr-8" : "gap-x-6 mr-6"}`}
            >
              {NAVIGATION_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-light tracking-wide transition-all duration-300 relative group ${
                    isHomePage
                      ? "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      : pathname === item.href
                        ? "text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                  style={
                    isHomePage
                      ? { animationDelay: `${400 + index * 100}ms` }
                      : {}
                  }
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-neutral-900 dark:bg-neutral-100 transition-all duration-300 ${
                      isHomePage
                        ? "w-0 group-hover:w-full"
                        : pathname === item.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* 모바일 메뉴 */}
            {!isHomePage && (
              <div className="md:hidden flex items-center gap-x-4">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                  >
                    {item.label.charAt(0)}
                  </Link>
                ))}
              </div>
            )}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
