import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | KMH-BLOG",
  description: "Portfolio",
  openGraph: {
    title: "Portfolio | KMH-BLOG",
    description: "Portfolio",
  },
  twitter: {
    title: "Portfolio | KMH-BLOG",
    description: "Portfolio",
  },
};

export default function PortfolioPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
