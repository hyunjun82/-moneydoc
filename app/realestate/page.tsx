import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "부동산 계산기 — 14종 | MoneyDoc",
  description: "양도세·취득세·중개수수료·종부세 — 지방세법·소득세법 §89 기반",
  alternates: { canonical: "/realestate/" },
};

export default function Page() {
  return (
    <>
      <Header active="realestate" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>부동산</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">부동산 계산기</h1>
        <p className="page-sub">양도세·취득세·중개수수료·종부세 — 지방세법·소득세법 §89 기반</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/realestate/acquisition-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">취득세 계산기</h3>
            <p className="cat-desc">주택 매매·취득 시 납부 취득세 + 농특세 + 지방교육세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/brokerage-fee/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부동산 중개수수료 계산기</h3>
            <p className="cat-desc">공인중개사법 시행규칙 표준 한도 적용</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/comprehensive-real-estate-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">종합부동산세 계산기</h3>
            <p className="cat-desc">공정시장가액 60% 적용 + 1주택자 12억 공제</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/holding-tax-total/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">보유세 통합 시뮬레이터</h3>
            <p className="cat-desc">재산세 + 종합부동산세 + 지방교육세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/housing-subscription-score/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청약 가점 계산기</h3>
            <p className="cat-desc">무주택기간 + 부양가족 + 청약통장 가입기간 합산 (총 84점)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/jeonse-monthly-conversion/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">전월세 전환율 계산기</h3>
            <p className="cat-desc">주택임대차보호법 §7-2 전세 → 월세 전환</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/property-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">재산세 계산기</h3>
            <p className="cat-desc">지방세법 §111 주택 재산세 + 지방교육세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/real-estate-roi/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부동산 ROI 계산기</h3>
            <p className="cat-desc">임대수익 + 자본이득 통합 ROI</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/registration-fee/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">등기비용 계산기</h3>
            <p className="cat-desc">등록면허세 0.8% + 지방교육세 0.16%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/rental-yield/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">임대수익률 계산기</h3>
            <p className="cat-desc">매매가·보증금·월세·연간 비용 기반 총수익률·순수익률</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/subscription-priority/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청약 1순위 자격 판정</h3>
            <p className="cat-desc">가입 24개월 + 납입 24회 + 무주택 충족 자격</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/transfer-tax-1home/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양도소득세 계산기 (1세대 1주택)</h3>
            <p className="cat-desc">12억 비과세부터 다주택까지 양도세 산정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/transfer-tax-adjusted/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양도세 조정대상지역 다주택 (추가세율) 계산기</h3>
            <p className="cat-desc">기본 누진 + 2주택 +20%p / 3주택+ +30%p</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/realestate/transfer-tax-multi/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양도소득세 계산기 (다주택자)</h3>
            <p className="cat-desc">다주택·단기 양도까지 일반세율 적용</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
