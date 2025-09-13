# 콘텐츠 작성 양식 가이드

## 📝 블로그 포스트 (`posts/`)

```yaml
---
title: "제목"
description: "설명"
date: "2024-12-01"
category: "posts"
excerpt: "요약 (필수)"
author: "KMH"
tags: ["React", "Next.js"]
featured: true
heroImage: "/blog/image.jpg"
---
```

**필수 필드:**

- `title`, `description`, `date`, `category: "posts"`, `excerpt`, `tags`

**사용 금지:**

- `githubUrl`, `liveUrl`, `technologies`

## 🚀 포트폴리오 (`portfolio/`)

```yaml
---
title: "프로젝트명"
description: "프로젝트 설명"
date: "2024-12-01"
category: "portfolio"
tags: ["React", "Node.js"]
featured: true
heroImage: "/projects/image.jpg"
githubUrl: "https://github.com/..."
liveUrl: "https://demo.com"
technologies: ["React", "TypeScript", "Node.js"]
---
```

**필수 필드:**

- `title`, `description`, `date`, `category: "portfolio"`, `tags`

**사용 금지:**

- `excerpt`

## 📋 체크리스트

### 포스트 작성 시

- [ ] `category: "posts"` 설정
- [ ] `excerpt` 필드 포함
- [ ] `githubUrl`, `liveUrl`, `technologies` 사용 안함

### 포트폴리오 작성 시

- [ ] `category: "portfolio"` 설정
- [ ] `excerpt` 필드 사용 안함
- [ ] `githubUrl`, `liveUrl`, `technologies` 사용 가능

## ⚠️ 주의사항

- `date`: YYYY-MM-DD 형식
- `tags`: 배열 형태
- 이미지 경로: `/`로 시작
- URL: 완전한 형태로 작성
