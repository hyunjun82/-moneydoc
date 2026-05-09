import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "연금 계산기 — 8종 | MoneyDoc",
  description: "국민연금 예상수령액·퇴직연금 DB/DC·IRP·연금저축·기초연금·노령연금·세액공제 한도 — 국민연금공단 + 소득세법 §59-3 표준 산식",
  alternates: { canonical: "/pension/" },
};

export default function Page() {
  return (
    <>
      <Header active="pension" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>연금</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">연금 계산기</h1>
        <p className="page-sub">국민연금·퇴직연금·IRP·연금저축 — 국민연금공단·소득세법 §59-3</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/pension/irp-tax-credit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">IRP·연금저축 세액공제 계산기</h3>
            <p className="cat-desc">소득세법 §59의3 연금계좌 세액공제 환급 산출</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/national-pension-early/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 조기수령 감액 계산기</h3>
            <p className="cat-desc">60~64세 조기수령 시 1년당 6% 감액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/national-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 예상수령액 계산기</h3>
            <p className="cat-desc">국민연금공단 공식 산식 기반 노령연금 추정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/noranumbrella-tax-saving/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">노란우산공제 절세 계산기</h3>
            <p className="cat-desc">사업소득 한계세율 × 납입액 절세효과</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/public-officer-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">공무원연금 시뮬레이터</h3>
            <p className="cat-desc">평균 기준소득월액 × 재직기간 × 1.7%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/retirement-pension-db/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직연금 DB형 계산기</h3>
            <p className="cat-desc">마지막 평균임금 × 30 × 근속연수 (퇴직금과 동일)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension/retirement-pension-dc/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직연금 DC형 시뮬레이터</h3>
            <p className="cat-desc">연봉 1/12 회사 부담 + 운용수익 누적</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
