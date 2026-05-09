import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "이용약관",
  description: "MoneyDoc 이용약관. 모든 계산 결과는 정부 공식 산식 기반 참고용입니다.",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">이용약관</h1>
        <p className="page-sub">마지막 업데이트: 2026년 5월 9일</p>
      </header>
      <section className="guide-section">
        <div className="guide-list" style={{ padding: "32px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>제1조 (목적)</h2>
          <p>본 약관은 MoneyDoc(이하 "사이트")이 제공하는 금융·세금·법률 계산기 서비스의 이용 조건과 절차를 규정합니다.</p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제2조 (서비스 내용)</h2>
          <p>사이트는 정부 공식 자료(소득세법, 시행령, 공단 고시 등)를 기반으로 자동 계산을 제공합니다. 계산 결과는 참고용이며, 실제 세금·급여·연금 등은 정부기관·금융기관의 정식 통지서·증빙서류에 따라 확정됩니다.</p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제3조 (책임의 제한)</h2>
          <p>사이트는 제공된 산식의 정확성을 위해 최선을 다하나, 산식 변경·요율 개정·사용자 입력 오류 등으로 인해 결과가 실제와 다를 수 있습니다. 사이트는 계산 결과를 근거로 한 의사결정으로 발생한 손실에 대해 책임지지 않습니다.</p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제4조 (저작권)</h2>
          <p>사이트의 산식 구현, 가이드 콘텐츠, 디자인 등 모든 자료는 MoneyDoc의 저작물입니다. 정부 공식 자료(법령·고시)는 해당 기관의 공개 자료입니다.</p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제5조 (광고)</h2>
          <p>사이트는 Google AdSense 등 제3자 광고를 운영할 수 있습니다. 광고 클릭 후 발생하는 거래·결제는 해당 광고주와 사용자 간의 별도 거래이며, 사이트는 이에 관여하지 않습니다.</p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제6조 (약관 변경)</h2>
          <p>본 약관은 사이트 운영 정책에 따라 변경될 수 있으며, 변경 시 사이트 내 공지를 통해 안내됩니다.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
