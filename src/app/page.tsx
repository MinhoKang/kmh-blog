import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { NavigationCards } from "@/components/home/NavigationCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ghost-white dark:bg-charcoal-gray transition-colors duration-700">
      {/* 그리드 시스템 */}
      <div className="grid-minimal min-h-screen h-full">
        <Header variant="home" />

        {/* 메인 콘텐츠 */}
        <main className="flex flex-col justify-center min-h-screen pt-20">
          <HeroSection />
          <NavigationCards />
          <Footer variant="home" />
        </main>
      </div>
    </div>
  );
}
