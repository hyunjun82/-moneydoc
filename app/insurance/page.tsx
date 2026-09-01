import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "보험·자동차 계산기 — 2종 | MoneyDoc",
  description: "실손보험 자기부담금·자동차세 (배기량·연식)·지방교육세 — 1~4세대 표준약관 + 지방세법 §127 (금감원·행정안전부 공식 산식)",
  alternates: { canonical: "/insurance/" },
};

export default function Page() {
  return (
    <>
      <Header active="insurance" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>보험</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">보험·자동차 계산기</h1>
        <p className="page-sub">실손보험·자동차세 — 금감원·행정안전부 표준 산식</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/insurance/medical-insurance-payout/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실손보험 자기부담금 계산기</h3>
            <p className="cat-desc">의료비 - 면책금 - 자기부담률 = 보험금 (1~4세대 모두)</p>
            <span className="cat-count">금감원 표준약관</span>
          </div>
        </a>
        <a href="/insurance/auto-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자동차세 계산기</h3>
            <p className="cat-desc">배기량·연식·영업용 → 자동차세 + 지방교육세 자동 산출</p>
            <span className="cat-count">행정안전부 표준 (지방세법 §127)</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="insurance" sub="자동차세 등 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
