interface LinkPreviewData {
  title: string;
  description: string;
  image?: string;
  url: string;
  siteName?: string;
  publishedTime?: string;
  author?: string;
}

export async function fetchLinkPreview(
  url: string
): Promise<LinkPreviewData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/link-preview?url=${encodeURIComponent(url)}`,
      {
        next: { revalidate: 3600 }, // 1시간 캐시
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch preview");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return null;
  }
}
