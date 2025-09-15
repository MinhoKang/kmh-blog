import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
export const metadata: Metadata = {
  // 👈 metadataBase를 추가하여 절대 경로 문제를 해결합니다.
  metadataBase: new URL("https://kmh-blog.vercel.app"),

  title: "KMH's Blog", // 👈 더 구체적인 제목
  description: "코딩, 개발 지식과 포트폴리오를 공유하는 공간입니다.", // 👈 더 구체적인 설명
  keywords: ["블로그", "포트폴리오", "개발", "Next.js", "TypeScript", "React"],
  authors: [{ name: "KMH" }],

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  openGraph: {
    title: "KMH's Blog", // 👈 공유될 때 보일 제목
    description: "코딩, 개발 지식과 포트폴리오를 공유하는 공간입니다.",
    url: "https://kmh-blog.vercel.app",
    siteName: "KMH-BLOG",
    // 👈 og-image.jpeg 공유용 이미지를 사용합니다.
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "KMH 블로그 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // 👈 큰 이미지 카드로 변경
    title: "KMH's Blog",
    description: "코딩, 개발 지식과 포트폴리오를 공유하는 공간입니다.",
    images: ["/og-image.jpeg"], // 👈 트위터용 이미지도 동일하게 설정
  },

  // ... (robots는 그대로 두셔도 좋습니다)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-charcoal-gray dark:bg-black dark:text-light-text transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="kmh-theme"
          forcedTheme={undefined}
        >
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
