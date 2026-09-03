import type { Metadata } from "next";
import { ArticleV2 } from "@/components/ArticleV2";
import { meta, faqLd, html, scriptKey } from "@/data/articles/law/certified-mail-guide";

const PAGE_URL = "https://moneydoc.kr/law/certified-mail-guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/law/certified-mail-guide/" },
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
      cat="law"
      catLabel="법률"
      crumb="내용증명"
    />
  );
}
