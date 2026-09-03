import { GUIDES } from "@/data/articles/index";
import { TILES } from "./CategoryTiles";

/* 홈 인기글: 검색 유입 상위 가이드 6편. 목록은 articles/index.ts (자동 생성) 에서 가져온다 */

const TOP: string[] = [
  "/government/unemployment-benefit-guide/",
  "/tax/salary-net-pay-guide/",
  "/law/severance-pay-guide/",
  "/tax/four-major-insurance-guide/",
  "/realestate/transfer-tax-guide/",
  "/government/basic-pension-guide/",
];

export function PopularGuides() {
  const items = TOP.map((href) => GUIDES.find((g) => g.href === href)).filter((g): g is NonNullable<typeof g> => !!g);
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">인기글</h2>
        <p className="section-sub">계산 기준과 근거 법령을 쉬운 말로 정리한 가이드</p>
      </div>
      <div className="cards guides">
        {items.map((g) => {
          const tile = TILES.find((t) => t.slug === g.cat) ?? TILES[0];
          return (
            <a key={g.href} href={g.href} className="card" style={{ ["--tint" as string]: tile.tint, ["--ink" as string]: tile.ink }}>
              <span className="card-ico">{tile.icon}</span>
              <span className="card-tag">{g.catLabel} 가이드</span>
              <span className="card-name">{g.title}</span>
              <span className="card-note">{g.blurb}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
