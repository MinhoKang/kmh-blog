export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://kmh-blog.vercel.app/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
