import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "연금 계산기 4종 | MoneyDoc",
  description: "국민연금 예상수령액·국민연금 조기수령 감액·IRP·연금저축 세액공제·노란우산공제 절세 — 국민연금공단 + 소득세법 §59-3 + 조세특례제한법 §86의3 표준 산식",
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
        <a href="/irp/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">IRP·연금저축 세액공제 계산기</h3>
            <p className="cat-desc">소득세법 §59의3 연금계좌 세액공제 환급 산출</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension-early/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 조기수령 감액 계산기</h3>
            <p className="cat-desc">60~64세 조기수령 시 1년당 6% 감액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/national-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 예상수령액 계산기</h3>
            <p className="cat-desc">국민연금공단 공식 산식 기반 노령연금 추정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/noranumbrella/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">노란우산공제 절세 계산기</h3>
            <p className="cat-desc">사업소득 한계세율 × 납입액 절세효과</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="pension" sub="연금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
