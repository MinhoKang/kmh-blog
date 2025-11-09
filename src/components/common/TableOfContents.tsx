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
  const observerRef = useRef<IntersectionObserver | null>(null); // Obsever 참조 추가

  // 1. 헤딩 요소들을 추출하여 TOC 생성 (기존과 동일)
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

  // 2. 스크롤에 따른 활성 섹션 감지 (IntersectionObserver로 변경)
  useEffect(() => {
    // tocItems가 로드되지 않았으면 아무것도 하지 않음
    if (tocItems.length === 0) return;

    // 기존 Observer가 있다면 연결 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Observer 콜백: 화면 영역에 들어온(intersecting) 항목을 활성화
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Observer 생성
    observerRef.current = new IntersectionObserver(callback, {
      // 뷰포트 상단에서 100px 아래 ~ 뷰포트 하단에서 40% 위
      // 이 영역(Trigger Zone)에 헤딩이 들어오면 활성화됨
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0, // 1px라도 보이면 바로 실행
    });

    // 모든 헤딩 요소를 가져와서 관찰 시작
    const elements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observerRef.current?.observe(el));

    // 컴포넌트 언마운트 시 Observer 연결 해제
    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocItems]); // tocItems가 로드되면 이 effect를 실행

  // 3. 헤딩으로 스크롤 (기존과 동일)
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

  // 4. JSX (기존과 동일)
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* 데스크톱 버전 */}
      <div className={`hidden lg:block ${className}`}>
        <div className="sticky top-24 w-64">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 dark:text-neutral-100 tracking-wide">
              목차
            </h3>
            <nav className="mt-4 flex flex-col gap-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`cursor-pointer block w-full text-left text-sm transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
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

      {/* 모바일 버전 */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
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

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed bottom-20 right-6 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 mb-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 tracking-wide">
                  목차
                </h3>
              </div>
              <nav className="flex flex-col gap-y-1 p-4">
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
