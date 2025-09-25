import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | KMH-BLOG",
  description: "Posts",
  openGraph: {
    title: "Posts | KMH-BLOG",
    description: "Posts",
  },
  twitter: {
    title: "Posts | KMH-BLOG",
    description: "Posts",
  },
};

export default function PostsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
