import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "대출 계산기 9종",
  description: "원리금균등·원금균등·DSR·LTV·DTI·주담대·전세자금대출·신용대출·자동차대출 — 월 상환액·총이자·중도상환수수료 (2025.6.27 가계부채 관리방안 반영)",
  alternates: { canonical: "/loan/" },
};

export default function Page() {
  return (
    <>
      <Header active="loan" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>대출</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">대출 계산기</h1>
        <p className="page-sub">원리금균등·DSR·LTV·주담대·전세자금대출 — 금감원 가이드라인, 1원 단위 정확</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>대출 계산기는 어떤 순서로 쓰면 좋을까요?</h2>
          <p>
            집을 사거나 전세를 구하면서 대출을 알아보는 분이 가장 많이 찾는 페이지예요. 먼저 내가 얼마까지 빌릴 수 있는지를 알아야 하는데, 이때 쓰는 것이 DSR, DTI, LTV 계산기예요. DSR은 연소득 대비 모든 대출의 연간 원리금 비율이고, DTI는 주택대출 원리금과 다른 대출 이자를 기준으로 봐요. LTV는 집값에 대한 대출 한도 비율이에요. 연소득, 기존 대출, 집값과 지역을 넣으면 규제 기준 안에서 가능한 금액이 나와요.
          </p>
          <p>
            한도를 알았다면 다음은 매달 얼마를 갚게 되는지예요. 대출 계산기에 금액, 금리, 기간을 넣고 원리금균등, 원금균등, 만기일시 중 상환 방식을 고르면 월 상환액과 총 이자가 나와요. 주담대 계산기와 전세자금대출 계산기는 각 상품의 조건에 맞게 입력 항목을 정리해 두었어요. 신용대출은 금리가 높은 편이라 기간을 조금만 바꿔도 총 이자가 크게 달라지니 여러 조건을 비교해 보세요.
          </p>
          <p>
            이미 대출이 있는 분은 갈아타기 계산기로 기존 대출과 새 대출의 총 비용을 비교할 수 있어요. 이때 중도상환수수료가 얼마나 나오는지가 관건인데, 남은 기간과 수수료율을 넣으면 바로 확인돼요. 수수료를 내고도 이자가 더 줄어드는지가 판단 기준이에요.
          </p>
          <p>
            이 페이지의 계산기는 외부 공적 기관 계산기와 값을 맞춰 검증한 항목이에요. 실제 은행 심사에서는 신용등급과 상품별 우대 조건이 더해져 결과가 달라질 수 있어요. 자세한 개념은 <a href="/dsr/guide/">DSR 가이드</a>, <a href="/repayment/guide/">대출 상환 방식 가이드</a>, <a href="/jeonse-loan/guide/">전세자금대출 가이드</a>, <a href="/refinance/guide/">대출 갈아타기 가이드</a>, <a href="/prepayment/guide/">중도상환수수료 가이드</a>에서 다뤄요.
          </p>
          <p>
            입력할 때 금리는 은행이 안내한 최종 금리를 쓰고, 소득은 세전 연소득을 넣어 주세요. 결과 화면에는 월 상환액과 함께 매달 원금과 이자가 어떻게 나뉘는지 상환 일정표가 나와요. 몇 년째에 이자 부담이 줄어드는지, 중간에 금리가 바뀌면 월 납입액이 어떻게 달라지는지 비교하는 데 쓸 수 있어요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/repayment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">대출 계산기</h3>
            <p className="cat-desc">원리금균등·원금균등·만기일시·거치식 4가지 상환방식 통합</p>
            <span className="cat-count">한국 표준 산식 · 회차별 round 0원 일치 (8/8 케이스)</span>
          </div>
        </a>
        <a href="/dsr/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DSR 계산기</h3>
            <p className="cat-desc">총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/dti/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">DTI 계산기</h3>
            <p className="cat-desc">총부채상환비율 기준 신규 주담대 한도</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/ltv/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">LTV 계산기</h3>
            <p className="cat-desc">주택담보비율 + 방공제 + 임차보증금 + 6억 한도 통합</p>
            <span className="cat-count">국토부·금감원 + 주임법 시행령</span>
          </div>
        </a>
        <a href="/mortgage/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주담대 계산기</h3>
            <p className="cat-desc">LTV·DSR 통합 — 두 한도 중 작은 것 = 실제 한도</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/credit-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">신용대출 계산기</h3>
            <p className="cat-desc">연소득 기준 한도 (관행 1.5배) + DSR 동시 적용</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        <a href="/jeonse-loan/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">전세자금대출 계산기</h3>
            <p className="cat-desc">주택금융공사·HUG 일반 전세대출 보증금 80% 기준</p>
            <span className="cat-count">HF·HUG 보증 기준</span>
          </div>
        </a>
        <a href="/refinance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">대출 갈아타기 계산기</h3>
            <p className="cat-desc">기존 대출 vs 신규 대출 월 상환·총 상환 비교</p>
            <span className="cat-count">대환대출 비교 산식</span>
          </div>
        </a>
        <a href="/prepayment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">중도상환수수료 계산기</h3>
            <p className="cat-desc">잔액 × 수수료율 × (잔여기간 / 총기간)</p>
            <span className="cat-count">금감원 가이드라인</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="loan" sub="대출 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
