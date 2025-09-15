import Link from "next/link";

import { CONTACT_INFO } from "@/constants/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-col items-center justify-center gap-y-8 text-center max-w-2xl mx-auto px-6">
        {/* 메인 메시지 */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            URL을 다시 확인해주시거나 아래 링크를 이용해주세요.
          </p>
        </div>

        {/* 네비게이션 링크들 */}
        <Link
          href="/"
          className="group flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          홈으로 돌아가기
        </Link>

        {/* 추가 정보 */}
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          문제가 지속되면{" "}
          <a
            href={CONTACT_INFO[0].href}
            className="underline hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            연락해주세요
          </a>
        </p>
      </div>
    </div>
  );
}
