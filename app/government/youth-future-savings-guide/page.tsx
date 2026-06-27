import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { meta, css, bodyHtml, faqLd } from "@/data/articles/government/youth-future-savings";

const PAGE_URL = "https://moneydoc.kr/government/youth-future-savings-guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/government/youth-future-savings-guide/" },
  openGraph: {
    type: "article",
    title: meta.title,
    description: meta.description,
    url: PAGE_URL,
    images: meta.ogImage ? [meta.ogImage] : undefined,
  },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: meta.title,
  description: meta.description,
  inLanguage: "ko",
  datePublished: meta.datePublished,
  dateModified: meta.dateModified,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  author: { "@type": "Organization", name: "MoneyDoc 편집팀" },
  publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" },
  ...(meta.ogImage ? { image: [meta.ogImage] } : {}),
};

export default function Page() {
  return (
    <>
      <Header active="government" />
      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <a href="/government/">정부지원금</a>
        <span className="sep">›</span>
        <span>청년미래적금 총정리</span>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="cardnews" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <Footer />
    </>
  );
}
