import fs from "fs";
import path from "path";

import matter from "gray-matter";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | KMH's Blog",
      description: "The post you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // 게시글이 발행되지 않은 경우
  if (!post.published) {
    return {
      title: "Post Not Found | KMH's Blog",
      description: "The post you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl = "https://kmh-blog.vercel.app";
  const postUrl = `${baseUrl}/posts/${resolvedParams.slug}`;

  return {
    title: `${post.title} | KMH's Blog`,
    description: post.description,
    keywords: post.tags || [],
    authors: [{ name: "KMH" }],
    creator: "KMH",
    publisher: "KMH",

    // Open Graph 메타데이터
    openGraph: {
      title: `${post.title} | KMH's Blog`,
      description: post.description,
      url: postUrl,
      siteName: "KMH's Blog",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: ["KMH"],
      tags: post.tags || [],
      images: [
        {
          url: "/og-image.jpeg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "ko_KR",
    },

    // Twitter 메타데이터
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | KMH's Blog`,
      description: post.description,
      images: ["/og-image.jpeg"],
      creator: "@kmh_dev", // 실제 트위터 계정이 있다면 수정
    },

    // 추가 메타데이터
    alternates: {
      canonical: postUrl,
    },

    // 구조화된 데이터를 위한 메타데이터
    other: {
      "article:author": "KMH",
      "article:published_time": new Date(post.date).toISOString(),
      "article:section": "Technology",
      "article:tag": (post.tags || []).join(", "),
    },
  };
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "src/contents/posts");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: data.title || slug,
    description: data.description || "",
    date: data.date || data.startDate || "2024-01-01",
    tags: data.tags || [],
    published: data.published !== false, // 기본값은 true, 명시적으로 false인 경우만 제외
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
