"use client";

import { useState, useEffect } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32">
      <div className="max-w-4xl">
        {/* 메인 타이틀 */}
        <div className="mb-16">
          <div className="overflow-hidden">
            <h1
              className={`text-6xl md:text-8xl lg:text-9xl font-extralight text-neutral-900 dark:text-neutral-50 leading-none tracking-tighter transition-all duration-1200 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              Creative
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2
              className={`text-6xl md:text-8xl lg:text-9xl font-extralight text-neutral-900 dark:text-neutral-50 leading-none tracking-tighter transition-all duration-1200 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              Developer
            </h2>
          </div>
        </div>

        {/* 설명 */}
        <div
          className={`max-w-xl mb-20 transition-all duration-1000 delay-900 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-wide">
            Crafting digital experiences with precision, passion, and purpose.
            <span className="block mt-2">Welcome to my creative space.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
