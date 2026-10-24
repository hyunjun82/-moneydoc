import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "법률 계산기 6종",
  description: "퇴직금, 연차수당, 임금체불, 양육비, 이혼 위자료, 법정 상속분을 계산하는 법률 계산기 6종이에요. 입사일과 급여, 가족 구성 같은 조건을 넣으면 받을 금액이나 몫을 미리 가늠할 수 있어요.",
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
        <p className="page-sub">퇴직금, 연차수당, 임금체불, 양육비, 위자료, 법정상속분을 어림해요.</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>직장과 가족 문제, 어떤 계산기가 답을 줄까요?</h2>
          <p>
            회사를 그만두거나 급여 문제가 생겼을 때 가장 먼저 확인할 것은 받아야 할 돈이 얼마인지예요. 퇴직금 계산기에 입사일, 퇴사일, 마지막 석 달 급여를 넣으면 평균임금 기준 퇴직금이 나와요. 쓰지 못한 연차가 남았다면 연차수당 계산기로 수당을 따로 계산해 퇴직금과 함께 청구할 수 있어요.
          </p>
          <p>
            급여가 밀렸다면 임금체불 계산기를 써요. 체불된 금액과 기간을 넣으면 지연이자를 포함한 청구 금액이 나와요. 노동청에 신고하기 전에 금액을 정리해 두면 진정서를 쓰기가 훨씬 쉬워요. 계산 결과는 법정 기준이라 회사와 합의한 금액과 다를 수 있어요.
          </p>
          <p>
            이혼을 앞둔 분은 양육비 계산기와 위자료 산정기준표를 보세요. 양육비는 부모 합산 소득과 자녀 나이에 따라 법원이 공표한 기준표에서 금액을 찾아요. 위자료는 혼인 기간과 유책 사유에 따라 법원이 참고하는 범위를 보여주는 표라서 확정액이 아니라 참고 자료로 봐야 해요.
          </p>
          <p>
            가족이 세상을 떠난 뒤 상속 재산을 나눌 때는 상속분 계산기가 유용해요. 배우자와 자녀 수를 넣으면 법정 상속 비율에 따라 각자의 몫이 나와요. 유언이나 기여분이 있으면 실제 분할은 달라질 수 있어요. 자세한 기준은 <a href="/severance/guide/">퇴직금 가이드</a>, <a href="/annual-leave/guide/">연차수당 가이드</a>, <a href="/unpaid-wages/guide/">임금체불 가이드</a>에서 확인할 수 있어요. 법률 판단이 필요한 사안은 전문가와 상담하는 것이 안전해요.
          </p>
          <p>
            입력에 필요한 급여 정보는 급여명세서와 근로계약서에서 확인하면 돼요. 평균임금은 퇴직 전 석 달 동안 받은 임금 총액을 그 기간의 날짜 수로 나눈 값이라 상여금과 연차수당 포함 여부를 꼭 확인해야 해요. 결과 화면에는 산출 과정이 단계별로 나와 회사가 제시한 금액과 어디서 차이가 나는지 짚어볼 수 있어요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/annual-leave/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">연차수당 계산기</h3>
            <p className="cat-desc">월 통상임금과 쓰지 못한 연차 일수로 연차수당 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/child-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">양육비 계산기</h3>
            <p className="cat-desc">부모 합산 월소득과 자녀 나이로 표준 양육비와 비양육친 분담액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/alimony/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">이혼 위자료 산정기준표</h3>
            <p className="cat-desc">결혼 기간과 상대방 유책 정도로 이혼 위자료를 참고용으로 추정</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/inheritance-share/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">상속분 계산기</h3>
            <p className="cat-desc">배우자, 자녀, 부모, 형제자매가 받는 법정상속분 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/severance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직금 계산기</h3>
            <p className="cat-desc">입사일, 퇴사일, 월 기본급으로 법정 퇴직금 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/unpaid-wages/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">임금체불 계산기</h3>
            <p className="cat-desc">받지 못한 임금에 지연이자를 더한 총 청구액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="law" sub="퇴직금·연차 등 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
