import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "소개 — MoneyDoc",
  description: "정부 공식 산식으로 검증된 한국 금융·세금·법률 계산기 66종을 한 곳에서.",
  alternates: { canonical: "/about/" },
};

export default function Page() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">MoneyDoc 소개</h1>
        <p className="page-sub">복잡한 돈 이야기를, 정확한 산식으로 풀어드립니다.</p>
      </header>
      <section className="guide-section">
        <div className="guide-list" style={{ padding: "32px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>우리가 만든 것</h2>
          <p>
            저축·대출·부동산·세금·보험·연금·법률·정부지원금 — <strong>한국 금융·세금·법률 계산기 66종</strong>을 한 곳에 모았습니다.
            모든 산식은 정부 공식 자료(소득세법, 지방세법, 시행령, 공단 고시 등)를 기반으로 구현되었으며, 정부 예시값으로 검증을 거칩니다.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>왜 다른가</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li><strong>정부 공식 출처 명시</strong> — 각 계산기마다 근거 법령과 고시를 페이지에 명시.</li>
            <li><strong>5케이스 자동 검증</strong> — 모든 산식은 5개 표본 케이스로 자동 검증 통과.</li>
            <li><strong>1년 정확 환산 + 매월 추정 동시 표시</strong> — 연봉 실수령 등은 §55 누진세율과 §134 간이세액표 결과를 모두 보여줍니다.</li>
            <li><strong>2026년 최신 요율 반영</strong> — 매년 변경되는 4대보험 요율, 누진세율, 공제 금액 즉시 반영.</li>
          </ul>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>출처</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>국세청 — 소득세법, 근로소득 간이세액표</li>
            <li>국민연금공단 — 보험료율 고시</li>
            <li>건강보험공단 — 건강보험·장기요양 보험료율</li>
            <li>고용노동부 — 고용보험료, 실업급여, 퇴직금</li>
            <li>보건복지부 — 기초연금, 기초생활수급, 부모급여</li>
            <li>국토교통부 — 청약, 주거급여, 부동산 관련</li>
            <li>법무부·법원 — 양육비 산정기준표, 법정상속</li>
          </ul>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>참여</h2>
          <p>
            산식 오류·개선 의견은 <a href="/contact/" style={{ color: "var(--brand)" }}>문의 페이지</a>로 보내주세요.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
