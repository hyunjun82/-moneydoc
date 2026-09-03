import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "유틸 계산기 5종 | MoneyDoc",
  description: "퍼센트·나이·날짜·할부·현금서비스 — 일상 계산 도구",
  alternates: { canonical: "/util/" },
};

export default function Page() {
  return (
    <>
      <Header active="util" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>유틸</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">유틸 계산기</h1>
        <p className="page-sub">퍼센트·나이·날짜·할부·현금서비스 — 일상 계산 도구</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/age/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">나이 계산기</h3>
            <p className="cat-desc">만 나이 + 한국 나이 + 띠 자동 산출</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/cash-service/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">현금서비스 수수료 계산기</h3>
            <p className="cat-desc">이용금액 × 연이율 / 365 × 사용일수 (단리)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/date/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">날짜 계산기 (D-Day)</h3>
            <p className="cat-desc">두 날짜 사이 일수·년월일 + 디데이</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/card-installment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">신용카드 할부 수수료 계산기</h3>
            <p className="cat-desc">원리금균등 방식 월 결제액 + 총 수수료</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/percent/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퍼센트 계산기</h3>
            <p className="cat-desc">% 계산 4가지 모드 (전체 중 일부 / 비율 / 증감률 / 증감 후)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
