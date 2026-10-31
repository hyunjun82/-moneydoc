import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { meta, faqLd, html, scriptKey } from "@/data/articles/loan/loan-ltv-first-home-guide";

const PAGE_URL = "https://moneydoc.kr/ltv/guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/ltv/guide/" },
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
    <HubPage
      meta={meta}
      html={html}
      faqLd={faqLd}
      scriptKey={scriptKey}
      url={PAGE_URL}
      catHref="/ltv/"
      catLabel="LTV 계산기"
      navActive="loan"
      crumb="생애최초 LTV"
    />
  );
}
