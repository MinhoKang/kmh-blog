import { NextRequest, NextResponse } from "next/server";

interface LinkPreviewData {
  title: string;
  description: string;
  image?: string;
  url: string;
  siteName?: string;
  publishedTime?: string;
  author?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // URL 유효성 검사
    new URL(url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // 간단한 메타데이터 추출
    const title =
      extractMetaContent(html, "og:title") ||
      extractMetaContent(html, "twitter:title") ||
      extractTitle(html) ||
      new URL(url).hostname;

    const description =
      extractMetaContent(html, "og:description") ||
      extractMetaContent(html, "twitter:description") ||
      extractMetaContent(html, "description") ||
      "";

    const image =
      extractMetaContent(html, "og:image") ||
      extractMetaContent(html, "twitter:image") ||
      extractMetaContent(html, "twitter:image:src");

    const siteName =
      extractMetaContent(html, "og:site_name") ||
      extractMetaContent(html, "twitter:site") ||
      new URL(url).hostname;

    const publishedTime =
      extractMetaContent(html, "article:published_time") ||
      extractMetaContent(html, "og:updated_time") ||
      undefined;

    const author =
      extractMetaContent(html, "article:author") ||
      extractMetaContent(html, "twitter:creator") ||
      extractMetaContent(html, "author") ||
      undefined;

    const previewData: LinkPreviewData = {
      title,
      description,
      image: image
        ? image.startsWith("http")
          ? image
          : new URL(image, url).href
        : undefined,
      url,
      siteName,
      publishedTime,
      author,
    };

    return NextResponse.json(previewData);
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return NextResponse.json(
      { error: "Failed to fetch preview" },
      { status: 500 }
    );
  }
}

function extractMetaContent(html: string, property: string): string | null {
  const regex = new RegExp(
    `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`,
    "i"
  );
  const match = html.match(regex);
  return match ? match[1] : null;
}

function extractTitle(html: string): string | null {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : null;
}
