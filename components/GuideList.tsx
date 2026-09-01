import { guidesFor, GUIDES, type GuideLink } from "@/data/articles/index";

/**
 * 카테고리 페이지·홈에 붙는 가이드 글 목록.
 * 목록 자체는 moneydoc-data/articles/index.ts 에서 자동 생성되므로
 * 글을 추가하면 링크가 저절로 따라온다 (고아 문서 방지).
 */
export function GuideList({
  cat,
  title,
  sub,
  limit,
}: {
  cat?: string;
  title?: string;
  sub?: string;
  limit?: number;
}) {
  const all: GuideLink[] = cat ? guidesFor(cat) : GUIDES;
  const items = limit ? all.slice(0, limit) : all;
  if (!items.length) return null;

  // 카테고리 페이지에서는 "세금 가이드"처럼 그 카테고리 이름을 쓴다.
  // ("계산기 가이드"는 계산기 페이지 안 가이드 블록의 헤더라 여기 쓰면 헷갈린다.)
  const heading = title ?? (cat ? `${items[0].catLabel} 가이드` : "가이드");

  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">{heading}</h2>
        {sub ? <p className="section-sub">{sub}</p> : null}
      </div>
      <div className="articles">
        {items.map((g, i) => (
          <a key={g.href} href={g.href} className="article">
            <span className="article-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="article-body">
              <span className="article-cat">{g.catLabel}</span>
              <h3 className="article-title">{g.title}</h3>
              <span className="article-meta">{g.blurb}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
