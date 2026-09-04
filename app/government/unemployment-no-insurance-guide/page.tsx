import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { meta, faqLd, html, scriptKey } from "@/data/articles/government/unemployment-no-insurance-guide";

const PAGE_URL = "https://moneydoc.kr/government/unemployment-no-insurance-guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/government/unemployment-no-insurance-guide/" },
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
      catHref="/government/"
      catLabel="government"
      navActive="gov"
      crumb="고용보험 미가입"
    />
  );
}
