import type { ReactNode } from "react";

/* =========================================================================
   ArticleBody — 독립 텍스트 가이드 페이지 본문 템플릿
   - 단일 컬러(--brand), 메인 UI 토큰 그대로
   - 제목 H1 + 작성자(MoneyDoc 편집팀) + 게시일/수정일 + Article·FAQ JSON-LD
   - 관련 계산기로 교차링크(내부링크 → 노출 유리)
   - 콘텐츠는 moneydoc-data/articles/{cat}/{slug}.ts 에서 주입.
   ========================================================================= */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "key"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][]; note?: string }
  | { type: "steps"; steps: { step: string; detail: string }[] };

export type ArticleSection = {
  id: string;
  eyebrow?: string;
  heading: string;
  navLabel?: string;
  blocks: ArticleBlock[];
};

export type Article = {
  keyword: string;
  title: string;
  description?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  calculatorUrl?: string;
  calculatorLabel?: string;
  readMinutes?: number;
  lead: string;
  keyPoints: string[];
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
};

/** **굵게** + [텍스트](링크) 인라인 파싱 */
function rich(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) return <a key={i} href={link[2]}>{link[1]}</a>;
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <span key={i}>{part}</span>;
  });
}

/** "2026-06-16" → "2026년 6월 16일" */
function fmtDate(iso?: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[1]}년 ${Number(m[2])}월 ${Number(m[3])}일` : iso;
}

function renderBlock(b: ArticleBlock, i: number): ReactNode {
  switch (b.type) {
    case "p":
      return <p key={i}>{rich(b.text)}</p>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "key":
      return <div key={i} className="key-callout">{rich(b.text)}</div>;
    case "quote":
      return <p key={i} className="article-quote">{rich(b.text)}</p>;
    case "list":
      return b.ordered ? (
        <ol key={i}>{b.items.map((it, j) => <li key={j}>{rich(it)}</li>)}</ol>
      ) : (
        <ul key={i}>{b.items.map((it, j) => <li key={j}>{rich(it)}</li>)}</ul>
      );
    case "table":
      return (
        <div key={i} className="article-table">
          <table>
            <thead>
              <tr>{b.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((row, j) => (
                <tr key={j}>{row.map((cell, k) => <td key={k}>{rich(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
          {b.note && <p className="table-note">{rich(b.note)}</p>}
        </div>
      );
    case "steps":
      return (
        <ol key={i} className="art-steps">
          {b.steps.map((st, j) => (
            <li key={j}>
              <span className="art-step-num">{j + 1}</span>
              <div className="art-step-body">
                <strong>{st.step}</strong>
                <p>{rich(st.detail)}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export function ArticleBody({ article, url }: { article?: Article; url?: string }) {
  if (!article) return null;
  const author = article.author ?? "MoneyDoc 편집팀";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ko",
    ...(url ? { mainEntityOfPage: { "@type": "WebPage", "@id": url } } : {}),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "MoneyDoc",
      url: "https://moneydoc.kr/",
    },
  };
  const faqLd =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((qa) => ({
            "@type": "Question",
            name: qa.q,
            acceptedAnswer: { "@type": "Answer", text: qa.a },
          })),
        }
      : null;

  return (
    <article className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <div className="article-inner">
        <h1 className="article-headline">{article.title}</h1>

        <div className="article-byline">
          <span className="byline-author">{author}</span>
          {article.datePublished && (
            <>
              <span className="dot" />
              <time dateTime={article.datePublished}>{fmtDate(article.datePublished)} 작성</time>
            </>
          )}
          {article.dateModified && article.dateModified !== article.datePublished && (
            <>
              <span className="dot" />
              <time dateTime={article.dateModified}>{fmtDate(article.dateModified)} 수정</time>
            </>
          )}
          {article.readMinutes && (
            <>
              <span className="dot" />
              <span>약 {article.readMinutes}분</span>
            </>
          )}
        </div>

        <p className="article-lead">{rich(article.lead)}</p>

        {article.keyPoints.length > 0 && (
          <div className="keypoints">
            <div className="keypoints-title">핵심만 빠르게</div>
            <ul>{article.keyPoints.map((k, i) => <li key={i}>{rich(k)}</li>)}</ul>
          </div>
        )}

        {article.calculatorUrl && (
          <a className="article-cta" href={article.calculatorUrl}>
            {article.calculatorLabel ?? "관련 계산기 바로가기"} →
          </a>
        )}

        {article.sections.length > 1 && (
          <nav className="toc" aria-label="목차">
            <div className="toc-title">이 글에서 다루는 내용</div>
            <ol>
              {article.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.navLabel ?? s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {article.sections.map((s) => (
          <section key={s.id} id={s.id} className="article-sec">
            {s.eyebrow && <div className="sec-eyebrow">{s.eyebrow}</div>}
            <h2>{s.heading}</h2>
            {s.blocks.map(renderBlock)}
          </section>
        ))}

        {article.faq.length > 0 && (
          <section id="faq" className="article-sec">
            <h2>자주 묻는 질문</h2>
            <div className="article-faq">
              {article.faq.map((qa, i) => (
                <div key={i} className="afaq">
                  <p className="q"><span className="qmark">Q</span>{qa.q}</p>
                  <p className="a">{rich(qa.a)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
