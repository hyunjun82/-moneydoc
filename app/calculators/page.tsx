import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CALCULATORS_INDEX, CATEGORIES, type CategorySlug } from "@/lib/calculators-index";

export const metadata: Metadata = {
  title: "전체 계산기 목록 66종",
  description: "한국 금융·세금·부동산·연금·법률·정부지원금·보험 계산기 66종 전체 목록 — 저축·대출·세금·부동산·보험·연금·법률·정부지원금·유틸리티 9개 카테고리 (정부 공식 산식 기반).",
  alternates: { canonical: "/calculators/" },
};

export default function Page() {
  const grouped: Record<string, typeof CALCULATORS_INDEX[string][]> = {};
  for (const meta of Object.values(CALCULATORS_INDEX)) {
    if (!grouped[meta.category]) grouped[meta.category] = [];
    grouped[meta.category].push(meta);
  }
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => a.title.localeCompare(b.title, "ko"));
  }

  const totalCount = Object.values(CALCULATORS_INDEX).length;
  const categoryOrder: CategorySlug[] = [
    "tax",
    "realestate",
    "loan",
    "savings",
    "pension",
    "law",
    "government",
    "insurance",
    "util",
  ];

  return (
    <>
      <Header />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>전체 계산기</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">전체 계산기 — {totalCount}종</h1>
        <p className="page-sub">정부 공식 산식으로 검증된 한국 금융·세금·법률 계산기. 카테고리별 정리.</p>
      </header>

      <section className="section">
        {categoryOrder.map((catSlug) => {
          const items = grouped[catSlug];
          if (!items || items.length === 0) return null;
          const cat = CATEGORIES[catSlug];
          return (
            <div key={catSlug} style={{ marginBottom: 48 }}>
              <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: "2px solid var(--brand)" }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)" }}>
                  <a href={cat.href} style={{ color: "inherit" }}>{cat.name}</a>
                  <span style={{ marginLeft: 10, fontSize: 14, fontWeight: 500, color: "var(--text-3)" }}>
                    {items.length}종
                  </span>
                </h2>
              </div>
              <div className="cats">
                {items.map((c) => (
                  <a key={c.slug} href={c.href} className="cat" style={{ textDecoration: "none" }}>
                    <div className="cat-body">
                      <h3 className="cat-name">{c.title}</h3>
                      <p className="cat-desc">{c.subtitle}</p>
                      <span className="cat-count">정부 공식 산식 검증</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </>
  );
}
