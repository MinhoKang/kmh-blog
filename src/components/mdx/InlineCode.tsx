import { ComponentProps } from "react";

// 인라인 코드 컴포넌트 (코드블록이 아닌 경우만)
export const InlineCode = (props: ComponentProps<"code">) => {
  // 코드블록인 경우 (pre 태그 안에 있는 경우)는 rehype-pretty-code가 처리
  if (props.className?.includes("language-")) {
    return <code {...props} />;
  }

  // 인라인 코드인 경우만 커스텀 스타일 적용
  return (
    <code
      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-1 rounded text-sm font-mono"
      {...props}
    />
  );
};
