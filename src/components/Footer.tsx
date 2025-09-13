"use client";

import { useState, useEffect } from "react";
import { CONTACT_INFO } from "@/constants/constants";

interface FooterProps {
  variant?: "home" | "page";
}

export function Footer({ variant = "page" }: FooterProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (variant === "home") {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [variant]);

  const isHomePage = variant === "home";
  const Component = isHomePage ? "section" : "footer";

  return (
    <Component
      className={`border-t border-neutral-200 dark:border-neutral-800 ${
        isHomePage
          ? `!py-5 mt-20 transition-all duration-1000 delay-1400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`
          : "mt-auto"
      }`}
    >
      <div className={`${isHomePage ? "" : "grid-minimal !py-5"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            {isHomePage ? (
              <>
                {/* <p className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-wide">
                  Currently available for new opportunities
                </p> */}
                <p className="text-sm font-light text-neutral-400 dark:text-neutral-600 tracking-wide mt-1">
                  Based in Seoul, South Korea
                </p>
              </>
            ) : (
              <p className="text-sm font-light text-neutral-500 dark:text-neutral-500 tracking-wide">
                © 2025 KMH. All rights reserved.
              </p>
            )}
          </div>

          <div className="flex gap-x-6">
            {CONTACT_INFO.map((item, index) => (
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
                style={
                  isHomePage
                    ? { animationDelay: `${1500 + index * 100}ms` }
                    : {}
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Component>
  );
}
