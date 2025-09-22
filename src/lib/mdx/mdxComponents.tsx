import { ComponentProps } from "react";

import { LinkPreview } from "@/components/common";
import { ImageContainer, InlineCode, ProblemBox } from "@/components/mdx";

export const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      {...props}
      className="md:text-4xl mb-8 mt-12 first:mt-0 text-neutral-900 dark:text-neutral-100 font-heading"
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="text-2xl md:text-3xl font-extrabold mb-6 mt-6 text-neutral-900 dark:text-neutral-100 font-heading"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="text-xl md:text-2xl font-bold mb-5 mt-10 text-neutral-900 dark:text-neutral-100 font-heading"
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      {...props}
      className="text-lg md:text-xl font-semibold mb-4 mt-8 text-neutral-900 dark:text-neutral-100 font-heading"
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
      className="border-l-4 !ml-5 !flex !gap-x-2 border-neutral-300 dark:border-neutral-600 !pl-8 mb-8 mt-8 italic text-neutral-600 dark:text-neutral-400"
    />
  ),
  code: InlineCode,
  strong: (props: ComponentProps<"strong">) => (
    <strong
      {...props}
      className="font-semibold text-neutral-900 dark:text-neutral-100"
    />
  ),
  ImageContainer,
  LinkPreview,
  ProblemBox,
  table: (props: ComponentProps<"table">) => (
    <table
      {...props}
      className="w-full border-collapse border border-neutral-200 dark:border-neutral-700 mb-6"
    />
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead {...props} className="bg-neutral-50 dark:bg-neutral-800" />
  ),
  tbody: (props: ComponentProps<"tbody">) => <tbody {...props} />,
  tr: (props: ComponentProps<"tr">) => (
    <tr
      {...props}
      className="border-b border-neutral-200 dark:border-neutral-700"
    />
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      {...props}
      className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100"
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      {...props}
      className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-neutral-700 dark:text-neutral-300"
    />
  ),
};
