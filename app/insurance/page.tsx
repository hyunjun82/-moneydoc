import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "보험 계산기 — 2종 | MoneyDoc",
  description: "자동차·실손보험 — 손보협회·금감원 표준약관 기반",
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
        <h1 className="page-title">보험 계산기</h1>
        <p className="page-sub">자동차·실손보험 — 손보협회·금감원 표준약관 기반</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/insurance/auto-insurance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자동차보험 할인할증 계산기</h3>
            <p className="cat-desc">표준 적립등급 1~29급 기준 할인할증율 산출</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/insurance/medical-insurance-payout/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실손보험 자기부담금 계산기</h3>
            <p className="cat-desc">의료비 - 면책금 - 자기부담률 = 보험금</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
