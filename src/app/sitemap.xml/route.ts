import { readdir } from "fs/promises";
import { join } from "path";

export async function GET(): Promise<Response> {
  const baseUrl = "https://kmh-blog.vercel.app";

  // 정적 페이지들
  const staticPages = ["", "/about", "/portfolio", "/posts"];

  // 포트폴리오 페이지들
  const portfolioDir = join(process.cwd(), "src/contents/portfolio");
  const portfolioFiles = await readdir(portfolioDir);
  const portfolioPages = portfolioFiles
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `/portfolio/${file.replace(".mdx", "")}`);

  // 포스트 페이지들
  const postsDir = join(process.cwd(), "src/contents/posts");
  const postsFiles = await readdir(postsDir);
  const postsPages = postsFiles
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `/posts/${file.replace(".mdx", "")}`);

  const allPages = [...staticPages, ...portfolioPages, ...postsPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
