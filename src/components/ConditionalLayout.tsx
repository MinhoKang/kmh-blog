"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
    <div className="min-h-screen bg-neutral-25 dark:bg-neutral-900 transition-colors duration-500 flex flex-col">
      <Header variant="page" />

      {/* 메인 콘텐츠 */}
      <main className="grid-minimal py-16 flex-1 min-h-0">{children}</main>

      <Footer variant="page" />
    </div>
  );
}
