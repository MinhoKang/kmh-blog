import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [["remark-gfm", { strict: true, throwOnError: true }]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
