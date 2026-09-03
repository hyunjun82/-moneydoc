/* 홈 카테고리 타일: 파스텔 아이콘 + 이름 + 개수 (가운데 정렬) */

export type Tile = { slug: string; name: string; count: number; tint: string; ink: string; icon: React.ReactNode };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const TILES: Tile[] = [
  { slug: "savings", name: "저축", count: 5, tint: "#e3ecff", ink: "#2f66d6",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><rect x="2.5" y="6" width="19" height="13" rx="3" fill="#fff" /><path d="M2.5 10.5h19" /><path d="M6 15h4" /></svg> },
  { slug: "loan", name: "대출", count: 9, tint: "#dcf3ec", ink: "#178f7a",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" fill="#fff" /><path d="M12 6.5v11" /><path d="M15 9.2H10.6a2 2 0 0 0 0 4h2.8a2 2 0 0 1 0 4H9" /></svg> },
  { slug: "realestate", name: "부동산", count: 10, tint: "#fde9dc", ink: "#d9662a",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill="#fff" /><path d="M9.5 20.5v-6h5v6" /></svg> },
  { slug: "tax", name: "세금", count: 15, tint: "#fde3e6", ink: "#d1435b",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><path d="M6 3.5h8l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V5a1.5 1.5 0 0 1 1.5-1.5z" fill="#fff" /><path d="M14 3.5v4h4" /><path d="M8 12.5h8M8 16h5" /></svg> },
  { slug: "insurance", name: "보험", count: 2, tint: "#e0f4e6", ink: "#2f9d5c",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" fill="#fff" /><path d="M9.5 12l1.8 1.8L15 10.5" /></svg> },
  { slug: "pension", name: "연금", count: 4, tint: "#ece4fb", ink: "#7a4fd1",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" fill="#fff" /><path d="M12 7.5V12l3 2" /></svg> },
  { slug: "law", name: "법률", count: 6, tint: "#e4e8f7", ink: "#4a5bb8",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><path d="M12 3.5v17M4.5 7.5h15" /><path d="M7 11 4 16h6z" fill="#fff" /><path d="M17 11l-3 5h6z" fill="#fff" /><path d="M9 20.5h6" /></svg> },
  { slug: "government", name: "정부지원금", count: 11, tint: "#dcf3ec", ink: "#1f8a6b",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" {...S}><path d="M4 20.5h16M5.5 20.5V10L12 5.5l6.5 4.5v10.5" fill="#fff" /><path d="M9.5 20.5v-5h5v5" /><path d="M9 10.5h6" /></svg> },
];

export function CategoryTiles() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">카테고리별 계산기</h2>
        <p className="section-sub">주제를 고르면 그 분야 계산기가 한 번에 보여요</p>
      </div>
      <div className="tiles">
        {TILES.map((t) => (
          <a key={t.slug} href={`/${t.slug === "government" ? "gov" : t.slug}/`} className="tile" style={{ ["--tint" as string]: t.tint, ["--ink" as string]: t.ink }}>
            <span className="tile-ico">{t.icon}</span>
            <span className="tile-name">{t.name}</span>
            <span className="tile-count">{t.count}개 계산기</span>
          </a>
        ))}
      </div>
    </section>
  );
}
