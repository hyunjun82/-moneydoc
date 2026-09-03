import type { Metadata } from "next";
import { ArticleV2 } from "@/components/ArticleV2";
import { meta, faqLd, html, scriptKey } from "@/data/articles/government/basic-livelihood-eligibility-guide";

const PAGE_URL = "https://moneydoc.kr/government/basic-livelihood-eligibility-guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/government/basic-livelihood-eligibility-guide/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "article",
    title: meta.title,
    description: meta.description,
    url: PAGE_URL,
    publishedTime: meta.datePublished,
    modifiedTime: meta.dateModified,
    images: [{ url: meta.image, width: 1200, height: 630, alt: meta.imageAlt }],
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [meta.image] },
};

export default function Page() {
  return (
    <ArticleV2
      meta={meta}
      html={html}
      faqLd={faqLd}
      scriptKey={scriptKey}
      url={PAGE_URL}
      cat="government"
      catLabel="정부지원금"
      crumb="기초생활수급"
    />
  );
}
