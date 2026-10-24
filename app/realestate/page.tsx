import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "부동산 계산기 10종",
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

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>부동산 세금은 언제 어떤 계산기를 보면 될까요?</h2>
          <p>
            부동산은 사는 순간, 가지고 있는 동안, 파는 순간마다 다른 세금이 붙어요. 집을 계약하기 전에는 취득세 계산기에 매매가, 주택 수, 조정대상지역 여부를 넣어 잔금 때 내야 할 세금을 확인하세요. 중개수수료 계산기는 거래 금액과 거래 종류를 넣으면 법정 상한 요율로 계산한 수수료를 보여줘요. 공인중개사와 협의하기 전에 기준을 알아 두면 도움이 돼요.
          </p>
          <p>
            집을 보유하는 동안에는 매년 재산세가, 공시가격이 일정 기준을 넘으면 종합부동산세가 더해져요. 두 세금을 한 번에 보고 싶다면 보유세 통합 시뮬레이터를 쓰면 돼요. 공시가격과 주택 수만 넣으면 올해 부담할 보유세 합계가 나와요. 공시가격은 부동산공시가격알리미에서 확인할 수 있어요.
          </p>
          <p>
            집을 팔 때는 양도소득세 계산기가 가장 중요해요. 취득가, 양도가, 보유 기간, 거주 기간, 주택 수를 넣으면 비과세 여부와 장기보유특별공제까지 반영된 세액이 나와요. 1세대 1주택 요건을 충족하는지에 따라 결과가 크게 달라지니 입력을 꼼꼼히 해 주세요.
          </p>
          <p>
            청약을 준비하는 분은 청약 가점 계산기로 무주택 기간, 부양가족, 청약통장 가입 기간에 따른 점수를 확인할 수 있어요. 임대인이나 투자자는 전월세 전환율, 임대수익률, 부동산 ROI 계산기로 수익 구조를 비교해 보세요. 더 깊은 설명은 <a href="/acquisition-tax/guide/">취득세 가이드</a>, <a href="/property-tax/guide/">재산세 가이드</a>, <a href="/comprehensive-tax/guide/">종부세 가이드</a>, <a href="/transfer-tax/guide/">양도세 가이드</a>에 정리해 두었어요.
          </p>
          <p>
            입력에 필요한 공시가격, 취득가, 보유 기간은 등기부등본과 공시가격 조회 화면에서 확인할 수 있어요. 결과는 세액만 보여주지 않고 세율 구간, 공제 적용 여부, 농어촌특별세와 지방교육세 같은 부가 세목까지 나눠서 보여줘요. 계약 전 자금 계획을 세울 때 잔금일에 필요한 현금을 미리 파악하는 용도로 쓰면 좋아요.
          </p>
        </div>
      </section>

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
