import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "KMH-BLOG",
  description: "KMH-BLOG",
  keywords: [
    "blog",
    "portfolio",
    "development",
    "writing",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
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
    title: "KMH-BLOG",
    description: "KMH-BLOG",
    url: "https://kmh-blog.vercel.app",
    siteName: "KMH-BLOG",
    images: [
      {
        url: "/favicon.svg",
        width: 64,
        height: 64,
        alt: "KMH-BLOG",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "KMH-BLOG",
    description:
      "Personal blog and portfolio by KMH - Next.js, TypeScript, Tailwind CSS를 활용한 현대적인 웹사이트",
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
