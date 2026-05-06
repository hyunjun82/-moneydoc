import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "저축 계산기 — 5종 | MoneyDoc",
  description: "적금·정기예금·자유적금·ISA·비과세종합저축 — 금감원 finlife.fss.or.kr 검증, 1원 단위 정확",
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
        <p className="page-sub">매월 적금부터 ISA·비과세종합저축까지, 사용자가 진짜 검색하는 저축 계산기</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/savings/installment-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">적금 계산기</h3>
            <p className="cat-desc">월 X원 납입 시 만기 수령액 — 단리·복리 토글, 이자소득세 차감</p>
            <span className="cat-count">금감원 finlife 검증</span>
          </div>
        </a>
        <a href="/savings/fixed-deposit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">정기예금 계산기</h3>
            <p className="cat-desc">목돈 일시 예치 시 만기 수령액 — 단리, 이자소득세 차감</p>
            <span className="cat-count">금감원 finlife 검증</span>
          </div>
        </a>
        <a href="/savings/free-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자유적금 계산기</h3>
            <p className="cat-desc">자유 입금 적금 만기 수령액 — 일별 단리, 이자소득세 차감</p>
            <span className="cat-count">금감원 finlife 검증</span>
          </div>
        </a>
        <a href="/savings/isa-tax-saving/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">ISA 계산기</h3>
            <p className="cat-desc">200만 비과세 + 초과분 9.9% 분리과세 절세효과</p>
            <span className="cat-count">조세특례제한법 §91의18</span>
          </div>
        </a>
        <a href="/savings/tax-free-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">비과세종합저축 계산기</h3>
            <p className="cat-desc">만 65세 이상 등 1인당 5천만 한도 비과세 적금</p>
            <span className="cat-count">조세특례제한법 §88의2</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
