/**
 * 콘텐츠 타입 정의
 * 각 카테고리별로 필수/선택 필드가 정의되어 있습니다.
 */

// 공통 메타데이터 타입
export interface BaseContent {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD 형식
  author?: string;
  tags: string[];
}

// 블로그 포스트 타입
export interface PostContent extends BaseContent {
  category: "posts";
  excerpt: string; // 필수
  featured?: boolean;
  heroImage?: string;
  // portfolio 관련 필드는 없음
  githubUrl?: never;
  liveUrl?: never;
  technologies?: never;
}

// 포트폴리오 프로젝트 타입
export interface PortfolioContent extends BaseContent {
  category: "portfolio";
  featured?: boolean;
  heroImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  // posts 관련 필드는 없음
  excerpt?: never;
}

// 통합 콘텐츠 타입
export type Content = PostContent | PortfolioContent;

// 카테고리별 타입 가드
export function isPostContent(content: Content): content is PostContent {
  return content.category === "posts";
}

export function isPortfolioContent(
  content: Content
): content is PortfolioContent {
  return content.category === "portfolio";
}

// 메타데이터 추출 타입
export interface ContentMetadata {
  slug: string;
  category: "posts" | "portfolio";
  title: string;
  description: string;
  date: string;
  author?: string;
  tags: string[];
  featured?: boolean;
  heroImage?: string;
  // 포트폴리오 전용
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  // 포스트 전용
  excerpt?: string;
}
