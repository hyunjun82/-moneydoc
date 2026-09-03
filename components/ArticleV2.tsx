import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleV2Runtime } from "@/components/ArticleV2Runtime";
import "@/components/article-v2.css";

/* =========================================================================
   ArticleV2 — 가이드 글 v2 템플릿 (즉답 카드 · 핵심콕콕 · PAA 소제목 · 표 캡션 · 출처)
   - 본문 HTML/CSS/JS 는 scripts/article-template/build-*-v2.mjs 가 엔진 값으로 생성하고
     convert-v2.mjs 가 여기에 맞게 변환한다 (클래스 접두사 v2-, .md-v2 한정).
   - Article · FAQ · BreadcrumbList JSON-LD 와 og:image(1200×630) 를 여기서 낸다.
   ========================================================================= */

export type ArticleV2Meta = {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image: string;
  imageAlt: string;
};

type Props = {
  meta: ArticleV2Meta;
  html: string;
  faqLd: object;
  scriptKey: string;
  url: string;
  cat: string;
  catLabel: string;
  crumb: string;
};

export function ArticleV2({ meta, html, faqLd, scriptKey, url, cat, catLabel, crumb }: Props) {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    inLanguage: "ko",
    image: [meta.image],
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "MoneyDoc 편집팀", url: "https://moneydoc.kr/" },
    publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
      { "@type": "ListItem", position: 2, name: catLabel, item: `https://moneydoc.kr/${cat}/` },
      { "@type": "ListItem", position: 3, name: crumb, item: url },
    ],
  };
  return (
    <>
      <Header active={cat} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="md-v2">
        <main>
          <div className="v2-crumb">
            <a href="/">홈</a> › <a href={`/${cat}/`}>{catLabel}</a> › {crumb}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </div>
      <ArticleV2Runtime scriptKey={scriptKey} />
      <Footer />
    </>
  );
}
