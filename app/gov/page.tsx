import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "정부지원금 계산기 11종",
  description: "기초연금·실업급여·육아휴직급여·산재보험·근로/자녀장려금·기초생활수급·청년월세지원·기준중위소득 — 2026년 기준 보건복지부·고용노동부 공식 산식 + 실업급여·근로장려금·청년미래적금 가이드",
  alternates: { canonical: "/gov/" },
};

export default function Page() {
  return (
    <>
      <Header active="government" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>정부지원금</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">정부지원금 계산기</h1>
        <p className="page-sub">기초연금·실업급여·육아휴직·근로/자녀장려금 — 보건복지부·고용보험법</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>정부 지원금, 내가 받을 수 있는지 어떻게 확인하나요?</h2>
          <p>
            복지 제도는 대부분 기준 중위소득의 몇 퍼센트 이하인지로 자격을 가려요. 그래서 중위소득 계산기가 출발점이에요. 가구원 수를 넣으면 올해 기준 중위소득과 주요 급여별 선정 기준 금액이 나와요. 내 가구 소득이 어느 구간에 있는지 알면 어떤 제도를 신청할 수 있을지 그림이 그려져요.
          </p>
          <p>
            소득이 낮은 가구는 기초생활수급자 모의계산과 차상위계층 모의계산을 이어서 보면 좋아요. 소득과 재산을 넣으면 소득인정액이 산출되고, 생계, 의료, 주거, 교육 급여 중 어디에 해당하는지 보여줘요. 한부모 가정은 한부모가족 양육비 계산기로 지원 대상 여부와 월 지원액을 함께 확인할 수 있어요.
          </p>
          <p>
            일하는 분에게 맞는 제도도 있어요. 일을 하지만 소득이 적다면 근로장려금 모의계산으로 가구 유형별 지급액을 확인해요. 실직했다면 실업급여 계산기에 퇴직 전 평균임금과 나이, 가입 기간을 넣어 하루 급여액과 받을 수 있는 날짜 수를 봐요. 출산과 육아를 앞둔 분은 출산휴가 급여와 육아휴직 급여 계산기로 휴직 기간 동안의 수입을 미리 계획할 수 있어요. 일하다 다쳤다면 산재 휴업급여 계산기가 평균임금 기준 지급액을 알려줘요.
          </p>
          <p>
            대학생 자녀가 있다면 국가장학금 소득분위 계산기로 예상 구간을 확인해 보세요. 어르신은 기초연금 계산기로 소득인정액과 수령 가능액을 가늠할 수 있어요. 결과는 모의계산이라 실제 결정은 주민센터와 각 기관의 심사를 따라요. 신청 방법과 자주 묻는 질문은 <a href="/basic-livelihood/guide/">기초생활수급 가이드</a>, <a href="/unemployment/guide/">실업급여 가이드</a>, <a href="/parental-leave/guide/">육아휴직 급여 가이드</a>, <a href="/basic-pension/guide/">기초연금 가이드</a>에 정리했어요.
          </p>
          <p>
            입력에는 가구원 수, 소득, 재산이 공통으로 필요해요. 소득은 세전 월 소득을 넣고, 재산은 주거용 재산과 금융 재산, 자동차를 나눠서 넣어요. 결과 화면에는 소득인정액 산출 과정과 선정 기준 금액이 함께 나와 어느 항목 때문에 기준을 넘었는지 확인할 수 있어요. 제도마다 기준이 매년 바뀌니 계산 기준 연도를 꼭 확인해 주세요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/basic-livelihood/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기초생활수급자 모의계산</h3>
            <p className="cat-desc">생계 32% / 의료 40% / 주거 48% / 교육 50% 4종 급여 자격</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/basic-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기초연금 수령액 계산기</h3>
            <p className="cat-desc">65세 이상 소득인정액 기준 자격 + 최대수령</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/eitc/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">근로장려금 모의계산</h3>
            <p className="cat-desc">단독·외벌이·맞벌이 가구별 한도와 추정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/injury-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">산재 휴업급여 계산기</h3>
            <p className="cat-desc">평균임금의 70% × 휴업 일수</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/maternity/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">출산휴가 급여 계산기</h3>
            <p className="cat-desc">90일 (다태 120일) + 회사·고용보험 분담</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/median-income/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">중위소득 계산기</h3>
            <p className="cat-desc">가구원수별 중위소득 100/50/47/40/30% + 본인 소득 비율</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/scholarship/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국가장학금 소득분위 계산기</h3>
            <p className="cat-desc">소득분위별 학기당 장학금 지원</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/near-poor/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">차상위계층 자격 모의계산</h3>
            <p className="cat-desc">중위소득 50% 이하 가구 판정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/parental-leave/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">육아휴직 급여 계산기</h3>
            <p className="cat-desc">고용보험법 §70 첫 6개월 100% / 7~12개월 80%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/single-parent/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">한부모가족 자녀양육비 계산기</h3>
            <p className="cat-desc">중위소득 60% 이하 + 18세 미만 자녀 1인당 월 21만원</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/unemployment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실업급여 계산기</h3>
            <p className="cat-desc">고용보험법 §46 구직급여 일액 + 소정급여일수</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>


      <GuideList cat="government" sub="정부지원금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
