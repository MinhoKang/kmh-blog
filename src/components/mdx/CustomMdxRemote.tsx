import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { components } from "@/lib/mdx/mdxComponents";

// rehype-pretty-code 옵션 설정
const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

export const CustomMdxRemote = async ({ source }: { source: string }) => {
  // 1. 서버에서 MDX를 컴파일합니다.
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["heading-link"],
              },
            },
          ],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  // 2. 컴파일된 결과를 div로 감싸서 바로 반환합니다.
  //    (기존의 MDXRemote 컴포넌트는 더 이상 필요 없습니다.)
  return (
    <div className="prose-wrapper text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
      {content}
    </div>
  );
};
