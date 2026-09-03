import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "부동산 계산기 10종 | MoneyDoc",
  description: "양도세·취득세·중개수수료·종부세·재산세·ROI — 지방세법·소득세법 §89 기반",
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
        <p className="page-sub">양도세·취득세·중개수수료·종부세·재산세·ROI — 정부 공식 산식</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/acquisition-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">취득세 계산기</h3>
            <p className="cat-desc">주택 매매·취득 시 납부 취득세 + 농특세 + 지방교육세</p>
            <span className="cat-count">지방세법 §11</span>
          </div>
        </a>
        <a href="/brokerage/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부동산 중개수수료 계산기</h3>
            <p className="cat-desc">공인중개사법 시행규칙 표준 한도 적용</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/property-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">재산세 계산기</h3>
            <p className="cat-desc">지방세법 §111 + 1주택 9억 이하 특례 (43% 비율 + 우대세율)</p>
            <span className="cat-count">지방세법 §111의2</span>
          </div>
        </a>
        <a href="/comprehensive-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">종합부동산세 계산기</h3>
            <p className="cat-desc">공정시장가액 60% + 1주택자 12억 공제</p>
            <span className="cat-count">종부세법</span>
          </div>
        </a>
        <a href="/holding-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">보유세 통합 시뮬레이터</h3>
            <p className="cat-desc">재산세 + 종합부동산세 + 지방교육세 통합 산정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/transfer-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양도소득세 계산기 (통합)</h3>
            <p className="cat-desc">1세대 1주택 / 다주택자 / 조정 다주택 — 양도 상황별 토글 한 화면</p>
            <span className="cat-count">소득세법 §89·§95·§104 · 17 case 검증</span>
          </div>
        </a>
        <a href="/subscription-score/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청약 가점·자격 계산기</h3>
            <p className="cat-desc">무주택기간 + 부양가족 + 청약통장 가입기간 합산 (총 84점)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/jeonse-conversion/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">전월세 전환율 계산기</h3>
            <p className="cat-desc">주택임대차보호법 §7-2 전세 → 월세 전환</p>
            <span className="cat-count">주임법 §7-2</span>
          </div>
        </a>
        <a href="/roi/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부동산 ROI 계산기</h3>
            <p className="cat-desc">임대수익 + 자본이득 통합 ROI</p>
            <span className="cat-count">표준 ROI 산식</span>
          </div>
        </a>
        <a href="/rental-yield/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">임대수익률 계산기</h3>
            <p className="cat-desc">매매가·보증금·월세·연간 비용 기반 총수익률·순수익률</p>
            <span className="cat-count">표준 임대수익률 산식</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="realestate" sub="부동산 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
