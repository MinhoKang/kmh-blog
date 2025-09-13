# 콘텐츠 작성 가이드

이 문서는 블로그 포스트와 포트폴리오 프로젝트 작성 시 따라야 할 양식과 규칙을 설명합니다.

## 📁 디렉토리 구조

```
src/content/
├── posts/           # 블로그 포스트
└── portfolio/       # 포트폴리오 프로젝트
```

## 📝 블로그 포스트 (`posts/`)

### 필수 필드

- `title`: 포스트 제목
- `description`: 포스트 설명 (SEO용)
- `date`: 작성일 (YYYY-MM-DD 형식)
- `category`: 반드시 `"posts"`
- `excerpt`: 포스트 요약 (홈페이지/목록에서 표시)
- `tags`: 태그 배열

### 선택 필드

- `author`: 작성자 (기본값: "KMH")
- `featured`: 추천 포스트 여부
- `heroImage`: 대표 이미지 경로

### 예시

```yaml
---
title: "Next.js App Router와 TanStack Query 최적화"
description: "Next.js App Router 환경에서 TanStack Query 캐싱 문제와 해결 방법을 소개합니다."
date: "2024-12-01"
category: "posts"
excerpt: "App Router에서 TanStack Query 캐싱이 동작하지 않는 이유와 올바른 해결 방법을 제시합니다."
author: "KMH"
tags: ["Next.js", "TanStack Query", "App Router", "Performance"]
featured: true
heroImage: "/blog/nextjs-tanstack-query.jpg"
---
```

### 작성 가이드라인

- **기술적 내용**: 실제 개발 경험을 바탕으로 작성
- **문제 해결**: 구체적인 문제와 해결 과정 포함
- **코드 예시**: 실제 동작하는 코드 스니펫 제공
- **학습 내용**: 개발자가 얻은 인사이트 공유

## 🚀 포트폴리오 프로젝트 (`portfolio/`)

### 필수 필드

- `title`: 프로젝트 제목
- `description`: 프로젝트 설명
- `date`: 완료일 (YYYY-MM-DD 형식)
- `category`: 반드시 `"portfolio"`
- `tags`: 기술 스택 태그

### 선택 필드

- `featured`: 추천 프로젝트 여부
- `heroImage`: 프로젝트 대표 이미지
- `githubUrl`: GitHub 저장소 URL
- `liveUrl`: 라이브 데모 URL
- `technologies`: 사용 기술 스택 배열

### 예시

```yaml
---
title: "실시간 채팅 시스템"
description: "1000+ 동시 사용자를 지원하는 실시간 채팅 시스템을 개발하여 성능을 97% 향상시켰습니다."
date: "2024-11-15"
category: "portfolio"
tags: ["React", "Node.js", "Socket.io", "Performance"]
featured: true
heroImage: "/projects/chat-system-hero.jpg"
githubUrl: "https://github.com/MinhoKang/chat-system"
liveUrl: "https://chat-system-demo.vercel.app"
technologies:
  ["React 18", "TypeScript", "Node.js", "Socket.io", "MongoDB", "Redis", "AWS"]
---
```

### 작성 가이드라인

- **프로젝트 개요**: 명확한 목적과 목표
- **주요 성과**: 정량적/정성적 결과
- **기술적 도전**: 해결한 문제와 방법
- **학습 내용**: 프로젝트를 통해 얻은 경험

## 🔧 타입 안전성

### TypeScript 지원

모든 콘텐츠는 `src/types/content.ts`에 정의된 타입을 따릅니다:

```typescript
// 포스트 작성 시
const post: PostContent = {
  title: "제목",
  description: "설명",
  date: "2024-12-01",
  category: "posts", // 필수
  excerpt: "요약", // 필수
  tags: ["React", "Next.js"],
  // githubUrl, liveUrl, technologies는 사용 불가
};

// 포트폴리오 작성 시
const portfolio: PortfolioContent = {
  title: "프로젝트명",
  description: "설명",
  date: "2024-12-01",
  category: "portfolio", // 필수
  tags: ["React", "Node.js"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://demo.com",
  // excerpt는 사용 불가
};
```

### 타입 가드 함수

```typescript
import { isPostContent, isPortfolioContent } from "@/types/content";

if (isPostContent(content)) {
  // content.excerpt 사용 가능
  console.log(content.excerpt);
}

if (isPortfolioContent(content)) {
  // content.githubUrl 사용 가능
  console.log(content.githubUrl);
}
```

## 📋 체크리스트

### 포스트 작성 시

- [ ] `category: "posts"` 설정
- [ ] `excerpt` 필드 포함
- [ ] 실제 개발 경험 기반 내용
- [ ] 코드 예시 포함
- [ ] 문제 해결 과정 상세 설명

### 포트폴리오 작성 시

- [ ] `category: "portfolio"` 설정
- [ ] `excerpt` 필드 제외
- [ ] 프로젝트 개요 명확히 작성
- [ ] 정량적 성과 포함
- [ ] 기술적 도전과 해결 과정

## 🚫 주의사항

### 포스트에서 사용 금지

- `githubUrl`, `liveUrl`, `technologies` 필드

### 포트폴리오에서 사용 금지

- `excerpt` 필드

### 공통 주의사항

- `date`는 YYYY-MM-DD 형식 준수
- `tags`는 배열 형태로 작성
- 이미지 경로는 `/`로 시작
- URL은 완전한 형태로 작성

## 🔍 검증 방법

### 자동 검증

```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

### 수동 검증

1. 개발 서버에서 콘텐츠 확인
2. 타입 에러 없는지 확인
3. 필수 필드 누락 여부 확인
4. 카테고리별 필드 사용 규칙 준수

---

이 가이드를 따라 작성하면 타입 안전하고 일관된 콘텐츠를 만들 수 있습니다.
