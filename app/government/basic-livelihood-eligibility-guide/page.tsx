import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleWidget } from "@/components/ArticleWidget";
import { meta, faqLd, widgetKey, widgetHtml, htmlBefore, htmlAfter, asideHtml } from "@/data/articles/government/basic-livelihood-eligibility-guide";
import "@/components/article.css";

const PAGE_URL = "https://moneydoc.kr/government/basic-livelihood-eligibility-guide/";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/government/basic-livelihood-eligibility-guide/" },
  openGraph: { type: "article", title: meta.title, description: meta.description, url: PAGE_URL },
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
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
    { "@type": "ListItem", position: 2, name: "정부지원금", item: "https://moneydoc.kr/government/" },
    { "@type": "ListItem", position: 3, name: "기초생활수급 조건", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <Header active="government" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="md-article">
        <main>
          <div className="crumb">
            <a href="/">홈</a> › <a href="/government/">정부지원금</a> › 기초생활수급 조건
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
          <ArticleWidget widgetKey={widgetKey} html={widgetHtml} />
          <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
        </main>
        <aside dangerouslySetInnerHTML={{ __html: asideHtml }} />
      </div>
      <Footer />
    </>
  );
}
