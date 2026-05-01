import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "저축 계산기 — 10종 | MoneyDoc",
  description: "예금·적금·청년도약·ISA — 한국은행 표준 산식 기반 저축 계산기",
  alternates: { canonical: "/savings/" },
};

export default function Page() {
  return (
    <>
      <Header active="savings" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>저축</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">저축 계산기</h1>
        <p className="page-sub">예금·적금·청년도약·ISA — 한국은행 표준 산식 기반 저축 계산기</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/savings/compound-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">복리 적금 만기 계산기</h3>
            <p className="cat-desc">월복리 적금 만기 + 이자소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/fixed-deposit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">정기예금 이자 계산기 (단리)</h3>
            <p className="cat-desc">단리 정기예금 만기 시 수령액 + 이자소득세 차감</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/free-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자유적금 만기 계산기</h3>
            <p className="cat-desc">자유 납입 적금 단리 만기 + 이자소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/housing-subscription/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주택청약종합저축 만기 계산기</h3>
            <p className="cat-desc">청약통장 단리 적립 + 이자소득세 차감</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/installment-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">적금 만기 계산기 (단리)</h3>
            <p className="cat-desc">월적립 단리 적금 만기 수령액 + 이자소득세 차감</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/isa-tax-saving/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">ISA 절세효과 계산기</h3>
            <p className="cat-desc">200만 비과세 + 초과분 9.9% 분리과세 절감액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/simple-vs-compound/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">단리 vs 복리 비교 계산기</h3>
            <p className="cat-desc">동일 원금·기간·이율에서 단리와 월복리의 만기 차이</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/tax-free-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">비과세종합저축 계산기</h3>
            <p className="cat-desc">1인당 5천만 한도 비과세 적금</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/youth-hope-deposit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청년희망적금 만기 시뮬레이터</h3>
            <p className="cat-desc">2년 만기 + 정부 저축장려금 (1년차 2% / 2년차 4%) + 비과세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/savings/youth-leap-account/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청년도약계좌 만기 시뮬레이터</h3>
            <p className="cat-desc">5년 적립 + 정부 기여금 + 비과세 이자</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
