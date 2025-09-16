# KMH Portfolio

> 미니멀 디자인의 개인 포트폴리오 & 블로그 사이트

## 🌟 Features

- **🎨 미니멀 디자인**: 흑백 컬러로 구성된 세련된 디자인
- **🌓 다크모드**: 완벽한 라이트/다크 모드 지원
- **📱 반응형**: 모든 디바이스에서 완벽한 사용자 경험
- **📝 MDX 블로그**: 마크다운으로 쉽게 작성하는 블로그 포스트
- **💼 포트폴리오**: 프로젝트 쇼케이스
- **⚡ 성능 최적화**: Next.js 15 + TypeScript + Tailwind CSS 4.x

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Content**: MDX
- **Theme**: next-themes
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions + Husky

## 🛠 Development

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 빌드
npm run build
```

## 📦 CI/CD Pipeline

### Pre-commit Hooks (Husky)

- TypeScript 타입 체크
- ESLint 코드 검사
- Prettier 자동 포매팅

### Automatic Deployment

- `main` 브랜치 push → 자동 배포
- Pull Request → 자동 테스트
- 빌드 실패시 배포 중단

## 🌍 Live Site

**Production**: https://kmh-blog.vercel.app

## 📞 Contact

- **Email**: rkdalsgh0106@naver.com
- **GitHub**: [github.com/MinhoKang](https://github.com/MinhoKang)
- **LinkedIn**: [linkedin.com/in/minhokang](https://www.linkedin.com/in/%EB%AF%BC%ED%98%B8-%EA%B0%95-8838502a7/?trk=opento_sprofile_topcard)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React 컴포넌트
│   ├── home/              # 홈페이지 컴포넌트들
│   ├── posts/             # 블로그 관련 컴포넌트
│   ├── projects/          # 포트폴리오 관련 컴포넌트
│   └── about/             # About 페이지 컴포넌트
├── contents/             # MDX 콘텐츠
│   ├── posts/            # 블로그 포스트
│   └── portfolio/        # 포트폴리오 프로젝트
└── lib/                  # 유틸리티 함수들
```

## 🎨 Design System

### Colors

- **Primary**: Neutral scale (25-950)
- **Theme**: Light/Dark mode support

### Typography

- **Sans**: Inter (Google Fonts)
- **Mono**: JetBrains Mono

### Animations

- Fade-in effects
- Smooth transitions
- Micro-interactions

---

**Made with ❤️ by KMH**
