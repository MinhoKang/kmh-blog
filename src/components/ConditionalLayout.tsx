"use client";

import { usePathname } from "next/navigation";

import { Footer } from "./Footer";
import { Header } from "./Header";

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
    <div className="min-h-screen bg-ghost-white dark:bg-charcoal-gray transition-colors duration-500 flex flex-col">
      <Header variant="page" />

      {/* 메인 콘텐츠 - 헤더 높이만큼 padding-top 추가 */}
      <main className="px-30 !py-5 flex-1 min-h-0 !pt-20">{children}</main>

      <Footer variant="page" />
    </div>
  );
}
