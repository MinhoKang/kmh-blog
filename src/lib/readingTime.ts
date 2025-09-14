import readingTime from "reading-time";

/**
 * MDX 콘텐츠에서 읽기 시간 계산
 */
export const getReadingTimeFromMdx = (mdxContent: string): string => {
  // frontmatter 제거
  const contentWithoutFrontmatter = mdxContent.replace(/^---[\s\S]*?---\n/, "");

  // reading-time 라이브러리 사용
  const stats = readingTime(contentWithoutFrontmatter);

  // 영어로 변환 (21 min read 형태)
  const minutes = Math.ceil(stats.minutes);
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
};
