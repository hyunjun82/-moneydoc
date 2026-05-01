import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "대출 계산기 — 12종 | MoneyDoc",
  description: "DSR·DTI·LTV·중도상환수수료 — 금감원 가이드라인 기반 대출 한도 계산",
  alternates: { canonical: "/loan/" },
};

export default function Page() {
  return (
    <>
      <Header active="loan" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>대출</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">대출 계산기</h1>
        <p className="page-sub">DSR·DTI·LTV·중도상환수수료 — 금감원 가이드라인 기반 대출 한도 계산</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/loan/balloon-payment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">만기일시상환 계산기</h3>
            <p className="cat-desc">매월 이자만 + 만기 원금 일시상환</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/credit-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">신용대출 한도 계산기</h3>
            <p className="cat-desc">연소득 기준 신용대출 한도 (관행 1.5배)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/dsr-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DSR 한도 계산기</h3>
            <p className="cat-desc">총부채원리금상환비율 기준 신규대출 한도</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/dti-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DTI 한도 계산기</h3>
            <p className="cat-desc">총부채상환비율 기준 신규 주담대 한도</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/grace-period-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">거치식 상환 계산기</h3>
            <p className="cat-desc">거치기간(이자만) + 상환기간(원리금균등)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/jeonse-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">전세자금대출 한도 계산기</h3>
            <p className="cat-desc">주택금융공사 일반 전세대출 보증금 80% 기준</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/loan-amortization/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">원리금균등상환 계산기</h3>
            <p className="cat-desc">PMT 산식 기반 월 상환액 + 총 이자</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/loan-decline/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">원금균등상환 계산기</h3>
            <p className="cat-desc">월 원금 일정, 이자는 잔액에 따라 감소</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/loan-refinance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">대환대출 비교 계산기</h3>
            <p className="cat-desc">기존 대출 vs 신규 대출 월 상환·총 상환 비교</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/ltv-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">LTV 한도 계산기</h3>
            <p className="cat-desc">주택담보비율 기준 대출 한도</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/mortgage-loan-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주담대 한도 계산기 (LTV+DSR 통합)</h3>
            <p className="cat-desc">LTV·DSR 두 한도 중 작은 것 = 실제 한도</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/loan/prepayment-fee/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">중도상환수수료 계산기</h3>
            <p className="cat-desc">잔액 × 수수료율 × (잔여기간 / 총기간)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
