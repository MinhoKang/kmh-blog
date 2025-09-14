"use client";

import { useState, useEffect, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export const TableOfContents = ({ className = "" }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  // 헤딩 요소들을 추출하여 TOC 생성
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.charAt(1));

      if (id && text) {
        items.push({ id, text, level });
      }
    });

    setTocItems(items);
  }, []);

  // 스크롤에 따른 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let current = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 헤딩으로 스크롤
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 헤더 높이 고려
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // 모바일에서 클릭 후 닫기
  };

  // TOC가 비어있으면 렌더링하지 않음
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* 데스크톱 버전 - 오른쪽 고정 */}
      <div className={`hidden md:block ${className}`}>
        <div className="sticky top-24 w-64">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4 tracking-wide">
              목차
            </h3>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left text-sm transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                    activeId === item.id
                      ? "text-neutral-900 dark:text-neutral-100 font-medium"
                      : "text-neutral-600 dark:text-neutral-400"
                  } ${
                    item.level === 1
                      ? "pl-0"
                      : item.level === 2
                        ? "pl-3"
                        : item.level === 3
                          ? "pl-6"
                          : "pl-9"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 모바일 버전 - 플로팅 버튼 */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        {/* TOC 토글 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="목차 열기"
        >
          <svg
            className={`w-5 h-5 text-neutral-700 dark:text-neutral-300 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* TOC 팝업 */}
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* TOC 패널 */}
            <div
              ref={tocRef}
              className="fixed bottom-20 right-6 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
            >
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 tracking-wide">
                  목차
                </h3>
              </div>
              <nav className="p-4 space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left text-sm transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                      activeId === item.id
                        ? "text-neutral-900 dark:text-neutral-100 font-medium"
                        : "text-neutral-600 dark:text-neutral-400"
                    } ${
                      item.level === 1
                        ? "pl-0"
                        : item.level === 2
                          ? "pl-3"
                          : item.level === 3
                            ? "pl-6"
                            : "pl-9"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
};
