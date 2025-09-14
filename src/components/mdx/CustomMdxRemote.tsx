import { ComponentProps } from "react";
import { compileMDX, MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

// rehype-pretty-code 옵션 설정
export const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

// 인라인 코드 컴포넌트 (코드블록이 아닌 경우만)
export const InlineCode = (props: ComponentProps<"code">) => {
  // 코드블록인 경우 (pre 태그 안에 있는 경우)는 rehype-pretty-code가 처리
  if (props.className?.includes("language-")) {
    return <code {...props} />;
  }

  // 인라인 코드인 경우만 커스텀 스타일 적용
  return (
    <code
      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-1 rounded text-sm font-mono"
      {...props}
    />
  );
};

export const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      {...props}
      className="text-3xl md:text-4xl font-extrabold mb-8 mt-12 first:mt-0 text-neutral-900 dark:text-neutral-100"
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="text-2xl md:text-3xl font-extrabold mb-6 mt-6 text-neutral-900 dark:text-neutral-100"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="text-xl md:text-2xl font-bold mb-5 mt-10 text-neutral-900 dark:text-neutral-100"
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      {...props}
      className="text-lg md:text-xl font-semibold mb-4 mt-8 text-neutral-900 dark:text-neutral-100"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p
      {...props}
      className="mb-6 leading-7 text-neutral-700 dark:text-neutral-300"
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="mb-6 flex flex-col gap-y-3 pl-6" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="mb-6 flex flex-col gap-y-3 pl-6" />
  ),
  li: (props: ComponentProps<"li">) => (
    <li {...props} className="mb-2 leading-7" />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-6 mb-8 mt-8 italic text-neutral-600 dark:text-neutral-400"
    />
  ),
  code: InlineCode,
  strong: (props: ComponentProps<"strong">) => (
    <strong
      {...props}
      className="font-semibold text-neutral-900 dark:text-neutral-100"
    />
  ),
};

export const CustomMdxRemote = async ({
  source,
  ...props
}: ComponentProps<typeof MDXRemote>) => {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        // 👇 기존 CustomMdxRemote에 있던 rehype 플러그인들을 그대로 가져옵니다.
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

  return (
    <div className="prose-wrapper text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
      <MDXRemote
        source={source}
        {...props}
        components={components}
        options={{
          mdxOptions: {
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
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
};
