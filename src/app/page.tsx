"use client";

import { useState, useEffect } from "react";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { NavigationCards } from "@/components/home/NavigationCards";
import { HomeFooter } from "@/components/home/HomeFooter";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 하이드레이션 전에는 애니메이션 없이 표시
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-25 dark:bg-neutral-900 transition-colors duration-700">
        <div className="grid-minimal min-h-screen">
          <HomeHeader isLoaded={true} />
          <main className="flex flex-col justify-center min-h-screen pt-20">
            <HeroSection isLoaded={true} />
            <NavigationCards isLoaded={true} />
            <HomeFooter isLoaded={true} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-25 dark:bg-neutral-900 transition-colors duration-700">
      {/* 그리드 시스템 */}
      <div className="grid-minimal min-h-screen">
        <HomeHeader isLoaded={isLoaded} />

        {/* 메인 콘텐츠 */}
        <main className="flex flex-col justify-center min-h-screen pt-20">
          <HeroSection isLoaded={isLoaded} />
          <NavigationCards isLoaded={isLoaded} />
          <HomeFooter isLoaded={isLoaded} />
        </main>
      </div>
    </div>
  );
}
