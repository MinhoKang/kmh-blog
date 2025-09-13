"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { CONTACT_INFO } from "@/lib/constants";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // 홈페이지인 경우 레이아웃 없이 렌더링
  if (isHomePage) {
    return <>{children}</>;
  }

  // 다른 페이지들은 미니멀한 레이아웃 사용
  return (
    <div className="min-h-screen bg-neutral-25 dark:bg-neutral-900 transition-colors duration-500">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-neutral-25/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="grid-minimal py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-light text-neutral-900 dark:text-neutral-100 hover:opacity-60 transition-opacity duration-300 tracking-wide"
            >
              KMH
            </Link>

            <nav className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6 mr-6">
                {[
                  { href: "/writes", label: "Writes" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/about", label: "About" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-light tracking-wide transition-colors duration-300 relative group ${
                      pathname === item.href
                        ? "text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-neutral-900 dark:bg-neutral-100 transition-all duration-300 ${
                        pathname === item.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ))}
              </div>

              {/* 모바일 메뉴 */}
              <div className="md:hidden flex items-center space-x-4 mr-4">
                <Link
                  href="/writes"
                  className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                >
                  W
                </Link>
                <Link
                  href="/portfolio"
                  className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                >
                  P
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                >
                  A
                </Link>
              </div>

              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="grid-minimal py-16">{children}</main>

      {/* 푸터 */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-32">
        <div className="grid-minimal py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-wide">
                © 2024 KMH. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-6">
              {CONTACT_INFO.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
