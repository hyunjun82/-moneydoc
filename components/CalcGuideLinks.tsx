import { GUIDES } from "@/data/articles/index";

/**
 * 계산기 아래에 붙는 "이 계산기의 가이드 글" 목록.
 * 글 주소가 계산기 주소 아래에 있는 것만 고른다 (/daily-wage/ → /daily-wage/guide/, /ltv/ → /ltv/guide/ …).
 * 허브 아래 /calculator/ 에 있는 계산기는 허브 주소를 기준으로 삼는다.
 */
export function CalcGuideLinks({ pagePath, max = 6 }: { pagePath: string; max?: number }) {
  const base = pagePath.replace(/calculator\/$/, "");
  if (!base || base === "/") return null;
  const mine = GUIDES.filter((g) => g.href.startsWith(base) && g.href !== pagePath);
  if (mine.length === 0) return null;
  const main = `${base}guide/`;
  const items = [...mine].sort((a, b) => Number(b.href === main) - Number(a.href === main)).slice(0, max);

  return (
    <section className="related-section">
      <div className="related-inner">
        <div className="related-head">
          <h2 className="related-title">이 계산기의 가이드 글</h2>
          <p className="related-sub">계산 결과가 왜 그렇게 나오는지, 조건과 예외를 글로 풀었어요</p>
        </div>
        <div className="related-grid">
          {items.map((g) => (
            <a key={g.href} href={g.href} className="related-card">
              <div className="cat">{g.catLabel} 가이드</div>
              <h3 className="title">{g.title}</h3>
              <p className="meta">{g.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
