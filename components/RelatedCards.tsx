import { CALCULATORS_INDEX } from "@/lib/calculators-index";

export function RelatedCards({ related }: { related: string[] }) {
  const items = related
    .map((slug) => CALCULATORS_INDEX[slug])
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (items.length === 0) return null;

  return (
    <section className="related-section">
      <div className="related-inner">
        <div className="related-head">
          <h2 className="related-title">함께 보면 좋은 계산기</h2>
          <p className="related-sub">이 계산기와 자주 같이 쓰는 도구</p>
        </div>
        <div className="related-grid">
          {items.map((m) => (
            <a key={m.slug} href={m.href} className="related-card">
              <div className="cat">{m.categoryName}</div>
              <h3 className="title">{m.title}</h3>
              <p className="meta">{m.subtitle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
