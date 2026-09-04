import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleV2Runtime } from "@/components/ArticleV2Runtime";
import type { ArticleV2Meta } from "@/components/ArticleV2";
import "@/components/article-v2.css";

/* =========================================================================
   HubPage — 주제 허브 (/{slug}/)
   - 한 주제의 최상위 페이지. 총정리 글 안에 계산기가 들어간다.
   - 글 HTML 의 <!--CALC_START--> ~ <!--CALC_END--> 자리(계산기 바로가기 버튼)를
     실제 계산기로 갈아 끼운다. 계산기가 없는 주제면 그 버튼을 그대로 둔다.
   - 스포크는 이 페이지의 하위 디렉토리(/{slug}/{spoke}/)로 들어간다.
   ========================================================================= */

const START = "<!--CALC_START-->";
const END = "<!--CALC_END-->";

type Props = {
  meta: ArticleV2Meta;
  html: string;
  faqLd: object;
  scriptKey: string;
  url: string;
  catLabel: string;
  crumb: string;
  catHref: string;
  /** 헤더에서 켤 카테고리. 빵부스러기(주제 구조)와 별개다 */
  navActive?: string;
  calculator?: React.ReactNode;
};

export function HubPage({ meta, html, faqLd, scriptKey, url, catLabel, crumb, catHref, navActive, calculator }: Props) {
  const i = html.indexOf(START);
  const j = html.indexOf(END);
  const hasSlot = i >= 0 && j > i;
  const before = hasSlot ? html.slice(0, i) : html;
  const inner = hasSlot ? html.slice(i + START.length, j) : "";
  // 계산기를 이 페이지에 끼워 넣은 경우에만, 아래쪽 "계산기 바로가기" 를 페이지 안 계산기로 내려보낸다
  const rest = hasSlot ? html.slice(j + END.length) : "";
  const after = calculator ? rest.replace(/class="v2-cta" href="[^"]*"/g, 'class="v2-cta" href="#calc"') : rest;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    inLanguage: "ko",
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [meta.image],
    author: { "@type": "Organization", name: "MoneyDoc 편집팀" },
    publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" },
  };

  // 허브(catHref === "/")는 홈 › 실업급여 두 단계, 스포크는 홈 › 실업급여 › 수급자격 세 단계
  const isHub = catHref === "/";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: isHub
      ? [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ]
      : [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
          { "@type": "ListItem", position: 2, name: catLabel, item: `https://moneydoc.kr${catHref}` },
          { "@type": "ListItem", position: 3, name: crumb, item: url },
        ],
  };

  return (
    <>
      <Header active={navActive ?? catHref.replace(/\//g, "")} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="md-v2">
        <main>
          <div className="v2-crumb">
            <a href="/">홈</a> ›{" "}
            {isHub ? crumb : (<><a href={catHref}>{catLabel}</a> › {crumb}</>)}
          </div>
          <div dangerouslySetInnerHTML={{ __html: before }} />
          {calculator ? <div id="calc">{calculator}</div> : <div dangerouslySetInnerHTML={{ __html: inner }} />}
          <div dangerouslySetInnerHTML={{ __html: after }} />
        </main>
      </div>
      <ArticleV2Runtime scriptKey={scriptKey} />
      <Footer />
    </>
  );
}
