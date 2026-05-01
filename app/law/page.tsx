import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "법률 계산기 — 7종 | MoneyDoc",
  description: "양육비·위자료·법정상속분·퇴직금 — 서울가정법원 산정기준표·민법 §1009",
  alternates: { canonical: "/law/" },
};

export default function Page() {
  return (
    <>
      <Header active="law" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>법률</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">법률 계산기</h1>
        <p className="page-sub">양육비·위자료·법정상속분·퇴직금 — 서울가정법원 산정기준표·민법 §1009</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/law/annual-leave-allowance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">연차수당 계산기</h3>
            <p className="cat-desc">월급 / 209시간 × 8시간 × 미사용 일수</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/child-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양육비 산정 계산기</h3>
            <p className="cat-desc">서울가정법원 양육비산정기준표 2024 (자녀 1인 표준)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/divorce-alimony/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">이혼 위자료 시뮬레이터</h3>
            <p className="cat-desc">[참고용 추정] 판례 통계 기반 — 실제 위자료는 법원 재량</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/inheritance-deadline/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">상속포기·한정승인 기한 계산기</h3>
            <p className="cat-desc">사망일로부터 3개월 (민법 §1019)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/inheritance-share/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">법정상속분 계산기</h3>
            <p className="cat-desc">민법 §1009 배우자·자녀·부모 비율 분배</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/severance-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직금 계산기 (법정)</h3>
            <p className="cat-desc">근로자퇴직급여보장법 §8 평균임금 기준</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/law/unpaid-wages/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">임금체불 미지급금 계산기</h3>
            <p className="cat-desc">미지급액 + 연 20% 지연이자</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
