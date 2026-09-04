import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleV2Runtime } from "@/components/ArticleV2Runtime";
import type { ArticleV2Meta } from "@/components/ArticleV2";
import "@/components/article-v2.css";
import "@/components/topic-home.css";

/* =========================================================================
   TopicHome — 주제 허브 (/{slug}/)
   글 템플릿이 아니라 그 주제의 홈 화면. 위에서 답을 주고 아래로 내려보낸다.
     1) 히어로  2) 즉답 카드  3) 주제 안내 카드(스포크)  4) 핵심 요약
     5) 자세한 내용(총정리 본문)  6) 관련
   스포크는 이 페이지의 하위 디렉토리(/{slug}/{spoke}/)다.
   ========================================================================= */

export type Landing = {
  hero: { tag: string; line1: string; line2: string; sub1: string; sub2: string; foot: string;
          card: { label: string; big: string; unit: string; l1: string; l2: string } };
  calc: { href: string; label: string };
  badge: string;
  basis: string;
  readMinutes: number;
  quick: { chip: string; big: string; unit: string; sub: string; selected: boolean }[];
  boxes: { title: string; text: string }[];
  keyPoints: { title: string; rows: string[][] };
  sections: { id: string; h2: string; sub: string }[];
  faq: { q: string; a: string }[];
  related: { kind: string; label: string; href: string }[];
};

/** 스포크: 있으면 그 주소로, 아직 없으면 허브 본문 앵커로 보낸다 */
export type Spoke = { title: string; sub?: string; href: string; ready?: boolean };

type Props = {
  meta: ArticleV2Meta;
  landing: Landing;
  html: string;
  faqLd: object;
  scriptKey: string;
  url: string;
  catHref: string;
  catLabel: string;
  crumb: string;
  spokes?: Spoke[];
};

export function TopicHome({ meta, landing, html, faqLd, scriptKey, url, catHref, catLabel, crumb, spokes }: Props) {
  const cards: Spoke[] =
    spokes && spokes.length > 0
      ? spokes
      : landing.sections.map((s) => ({ title: s.h2, sub: s.sub, href: `#${s.id}`, ready: true }));

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
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
      { "@type": "ListItem", position: 2, name: catLabel, item: `https://moneydoc.kr${catHref}` },
      { "@type": "ListItem", position: 3, name: crumb, item: url },
    ],
  };

  return (
    <>
      <Header active={catHref.replace(/\//g, "")} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs">
        <a href="/">홈</a><span className="sep">›</span>
        <a href={catHref}>{catLabel}</a><span className="sep">›</span>
        <span>{crumb}</span>
      </nav>

      {/* 1) 히어로 */}
      <section className="th-hero">
        <div className="th-hero-in">
          <span className="th-tag">{landing.hero.tag}</span>
          <h1>{landing.hero.line1}<br /><em>{landing.hero.line2}</em></h1>
          <p className="th-sub">{landing.hero.sub1}</p>
          <p className="th-sub2">{landing.hero.sub2}</p>
          <a className="th-cta" href={landing.calc.href}>{landing.calc.label}</a>
          <p className="th-foot"><span className="dot" />{landing.badge}</p>
        </div>
        <aside className="th-card">
          <span className="th-card-lbl">{landing.hero.card.label}</span>
          <strong className="th-card-big">{landing.hero.card.big}<small>{landing.hero.card.unit}</small></strong>
          <span className="th-card-l">{landing.hero.card.l1}</span>
          <span className="th-card-l">{landing.hero.card.l2}</span>
        </aside>
      </section>

      {/* 2) 즉답 */}
      <section className="section th-quick">
        <div className="section-head">
          <h2 className="section-title">바로 답</h2>
          <p className="section-sub">{landing.basis} · 정부 산식 그대로 계산한 값</p>
        </div>
        <div className="th-quick-grid">
          {landing.quick.map((q) => (
            <div key={q.chip} className={`th-q${q.selected ? " on" : ""}`}>
              <span className="th-q-chip">{q.chip}</span>
              <strong className="th-q-big">{q.big}</strong>
              <span className="th-q-unit">{q.unit}</span>
              <span className="th-q-sub">{q.sub}</span>
            </div>
          ))}
        </div>
        <div className="th-boxes">
          {landing.boxes.map((b) => (
            <div key={b.title} className="th-box"><b>{b.title}</b><span>{b.text}</span></div>
          ))}
        </div>
      </section>

      {/* 3) 주제 안내 카드 */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">무엇이 궁금하세요</h2>
          <p className="section-sub">찾는 것을 고르면 바로 그 내용으로 갑니다</p>
        </div>
        <div className="th-cards">
          {cards.map((c) => (
            <a key={c.href} href={c.href} className={`th-c${c.ready === false ? " soon" : ""}`}>
              <span className="th-c-title">{c.title}</span>
              {c.sub && <span className="th-c-sub">{c.sub}</span>}
              <span className="th-c-go">{c.ready === false ? "준비 중" : "보기"}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 4) 핵심 요약 */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{landing.keyPoints.title}</h2>
        </div>
        <dl className="th-kk">
          {landing.keyPoints.rows.map((r) => { const [k, v] = r; return (
            <div key={k} className="th-kk-row"><dt>{k}</dt><dd dangerouslySetInnerHTML={{ __html: v }} /></div>
          ); })}
        </dl>
      </section>

      {/* 5) 자세한 내용 (총정리 본문) */}
      <section className="section th-body">
        <div className="section-head">
          <h2 className="section-title">자세한 내용</h2>
          <p className="section-sub">읽는 데 {landing.readMinutes}분</p>
        </div>
        <div className="md-v2">
          <main>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </main>
        </div>
      </section>

      <ArticleV2Runtime scriptKey={scriptKey} />
      <Footer />
    </>
  );
}
