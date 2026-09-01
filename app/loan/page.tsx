import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "대출 계산기 — 9종 | MoneyDoc",
  description: "원리금균등·원금균등·DSR·LTV·DTI·주담대·전세자금대출·신용대출·자동차대출 — 월 상환액·총이자·중도상환수수료 (2025.6.27 가계부채 관리방안 반영)",
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
        <p className="page-sub">원리금균등·DSR·LTV·주담대·전세자금대출 — 금감원 가이드라인, 1원 단위 정확</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/loan/loan-amortization/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">대출 계산기</h3>
            <p className="cat-desc">원리금균등·원금균등·만기일시·거치식 4가지 상환방식 통합</p>
            <span className="cat-count">한국 표준 산식 · 회차별 round 0원 일치 (8/8 케이스)</span>
          </div>
        </a>
        <a href="/loan/dsr-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DSR 계산기</h3>
            <p className="cat-desc">총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/loan/dti-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DTI 계산기</h3>
            <p className="cat-desc">총부채상환비율 기준 신규 주담대 한도</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/loan/ltv-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">LTV 계산기</h3>
            <p className="cat-desc">주택담보비율 + 방공제 + 임차보증금 + 6억 한도 통합</p>
            <span className="cat-count">국토부·금감원 + 주임법 시행령</span>
          </div>
        </a>
        <a href="/loan/mortgage-loan-limit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주담대 계산기</h3>
            <p className="cat-desc">LTV·DSR 통합 — 두 한도 중 작은 것 = 실제 한도</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/loan/credit-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">신용대출 계산기</h3>
            <p className="cat-desc">연소득 기준 한도 (관행 1.5배) + DSR 동시 적용</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/loan/jeonse-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">전세자금대출 계산기</h3>
            <p className="cat-desc">주택금융공사·HUG 일반 전세대출 보증금 80% 기준</p>
            <span className="cat-count">HF·HUG 보증 기준</span>
          </div>
        </a>
        <a href="/loan/loan-refinance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">대출 갈아타기 계산기</h3>
            <p className="cat-desc">기존 대출 vs 신규 대출 월 상환·총 상환 비교</p>
            <span className="cat-count">대환대출 비교 산식</span>
          </div>
        </a>
        <a href="/loan/prepayment-fee/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">중도상환수수료 계산기</h3>
            <p className="cat-desc">잔액 × 수수료율 × (잔여기간 / 총기간)</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="loan" sub="대출 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
