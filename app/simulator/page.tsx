import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "시뮬레이션 계산기 — 5종 | MoneyDoc",
  description: "노후자금·매매vs전세·결혼비용·자녀 학자금 시뮬레이션",
  alternates: { canonical: "/simulator/" },
};

export default function Page() {
  return (
    <>
      <Header active="simulator" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>시뮬레이션</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">시뮬레이션 계산기</h1>
        <p className="page-sub">노후자금·매매vs전세·결혼비용·자녀 학자금 시뮬레이션</p>
      </header>

      <section className="section">
        <div className="cats">
        <a href="/simulator/buy-vs-jeonse/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">매매 vs 전세 비용 비교</h3>
            <p className="cat-desc">보유세·이자·기회비용 통합 비교</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/simulator/child-rearing-cost/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">출산·양육비 시뮬레이터</h3>
            <p className="cat-desc">0세~22세까지 자녀 양육 총비용</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/simulator/child-tuition-sim/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자녀 학자금 시뮬레이터</h3>
            <p className="cat-desc">자녀 대학 등록금 + 매월 저축 필요액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/simulator/savings-vs-fund/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">적금 vs 예금 vs 펀드 수익 비교</h3>
            <p className="cat-desc">동일 원금 기준 세후 수익 비교</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/simulator/wedding-cost/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">결혼 비용 시뮬레이터</h3>
            <p className="cat-desc">예식 + 신혼집 + 가구 등 통합</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
