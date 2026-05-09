import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "정부지원금 계산기 — 17종 | MoneyDoc",
  description: "기초연금·실업급여·육아휴직급여·산재보험·근로/자녀장려금·기초생활수급·청년월세지원·기준중위소득 — 2026년 기준 보건복지부·고용노동부 공식 산식",
  alternates: { canonical: "/government/" },
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

      <section className="section">
        <div className="cats">
        <a href="/government/basic-livelihood-eligibility/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기초생활수급자 자격 모의계산</h3>
            <p className="cat-desc">생계 30% / 의료 40% / 주거 47% / 교육 50% 4종 급여 자격</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/basic-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기초연금 수령액 계산기</h3>
            <p className="cat-desc">65세 이상 소득인정액 기준 자격 + 최대수령</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/birth-childcare-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">출산·육아 지원금 통합 계산기</h3>
            <p className="cat-desc">첫만남 200만 + 부모급여 + 아동수당 통합</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/child-allowance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자녀장려금 자격·예상액 계산기</h3>
            <p className="cat-desc">총소득 7천만 이하 + 자녀 1인당 최대 100만</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/durunuri-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">두루누리 사회보험료 지원 계산기</h3>
            <p className="cat-desc">5인 미만 사업장 + 월 270만 미만 근로자 80% 지원</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/earned-income-tax-credit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">근로장려금 자격·예상액 계산기</h3>
            <p className="cat-desc">단독·외벌이·맞벌이 가구별 한도와 추정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/industrial-accident-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">산재 휴업급여 계산기</h3>
            <p className="cat-desc">평균임금의 70% × 휴업 일수</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/maternity-leave-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">출산휴가 급여 계산기</h3>
            <p className="cat-desc">90일 (다태 120일) + 회사·고용보험 분담</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/median-income/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">중위소득 계산기</h3>
            <p className="cat-desc">가구원수별 중위소득 100/50/47/40/30% + 본인 소득 비율</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/national-scholarship/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국가장학금 소득분위 계산기</h3>
            <p className="cat-desc">소득분위별 학기당 장학금 지원</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/near-poor-eligibility/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">차상위계층 자격 모의계산</h3>
            <p className="cat-desc">중위소득 50% 이하 가구 판정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/parental-leave-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">육아휴직 급여 계산기</h3>
            <p className="cat-desc">고용보험법 §70 첫 6개월 100% / 7~12개월 80%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/single-parent-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">한부모가족 자녀양육비 계산기</h3>
            <p className="cat-desc">중위소득 60% 이하 + 18세 미만 자녀 1인당 월 21만원</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/unemployment-benefit-days/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실업급여 수급기간 계산기</h3>
            <p className="cat-desc">가입연수 + 50세 이상/장애인 가산일 적용</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/unemployment-benefit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실업급여 일액 계산기</h3>
            <p className="cat-desc">고용보험법 §46 구직급여 일액 + 소정급여일수</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/youth-housing-allowance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청년 주거급여 계산기</h3>
            <p className="cat-desc">주거급여법 정확 산식 — 기준임차료 - 자기부담분</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/government/youth-rent-support/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">청년 월세 지원 계산기</h3>
            <p className="cat-desc">월 최대 20만원 × 12개월</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
