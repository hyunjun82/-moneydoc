import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "세금 계산기 15종",
  description: "연봉 실수령·종합소득세·증여세·상속세·퇴직소득세·주식양도세·부가세·자녀세액공제·일용직 원천징수 — 국세청 2026 간이세액표 + 소득세법 §55 누진세율",
  alternates: { canonical: "/tax/" },
};

export default function Page() {
  return (
    <>
      <Header active="tax" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>세금</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">세금 계산기</h1>
        <p className="page-sub">연봉 실수령·종합소득세·연말정산 — 국세청 2026 간이세액표 + 누진세율</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>어떤 상황에 어느 세금 계산기를 쓰면 좋을까요?</h2>
          <p>
            월급을 받는 직장인이라면 연봉 실수령액 계산기부터 시작하면 좋아요. 연봉과 부양가족 수를 넣으면 소득세와 4대보험을 뺀 실제 통장 입금액을 보여줘요. 회사 명세서는 매달 간이세액표로 떼기 때문에 연간 정산 기준인 이 결과와는 조금 다를 수 있어요. 연말정산이 끝나면 비슷해지는 구조예요.
          </p>
          <p>
            프리랜서나 사업자는 사정이 달라요. 용역비에서 3.3%가 먼저 빠지는 분은 프리랜서 원천징수 계산기로 실제 입금액을 확인하고, 다음 해 신고 기간에는 종합소득세 계산기로 신고할 세금을 미리 가늠해 보세요. 장부를 쓰지 않는 소규모 사업자는 단순경비율 계산기가 더 가까운 답을 줘요. 부가세는 일반과세자와 간이과세자용을 따로 두었으니 사업자등록증의 과세 유형을 보고 고르면 돼요.
          </p>
          <p>
            가족 사이에 재산이 오가는 일이 있다면 증여세와 상속세 계산기를 써요. 받는 사람과 주는 사람의 관계, 재산 평가액을 넣으면 공제 후 세율이 적용된 예상 세액이 나와요. 퇴직을 앞둔 분은 퇴직소득세 계산기에 근속연수와 퇴직금을 넣어 실제 수령액을 확인해 보세요. 주식이나 가상자산을 팔아 이익이 난 해에는 양도세 계산기가 신고 여부를 판단하는 데 도움이 돼요.
          </p>
          <p>
            결과는 모두 법령에 적힌 세율과 공제를 그대로 적용한 값이에요. 다만 개인별 공제 항목이나 지방자치단체 조례에 따라 실제 고지액과 차이가 날 수 있으니 참고용으로 봐 주세요. 계산 과정과 근거가 더 궁금하면 <a href="/salary/guide/">연봉 실수령액 가이드</a>, <a href="/income-tax/guide/">종합소득세 가이드</a>, <a href="/four-insurance/guide/">4대보험 가이드</a>, <a href="/freelancer/guide/">프리랜서 원천징수 가이드</a>를 함께 읽어 보세요.
          </p>
          <p>
            입력값은 급여명세서, 홈택스 지급명세서, 계약서처럼 손에 있는 서류에서 그대로 옮기면 돼요. 계산기마다 어떤 서류의 어느 항목을 보면 되는지 입력란 옆에 적어 두었어요. 결과 화면에서는 세액뿐 아니라 과세표준, 적용 세율, 공제 금액을 단계별로 보여주니 어디서 세금이 결정되는지 따라가며 확인할 수 있어요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/business-income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">사업소득세 (단순경비율) 계산기</h3>
            <p className="cat-desc">추계신고 단순경비율 기반 사업소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/child-credit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자녀세액공제 계산기</h3>
            <p className="cat-desc">소득세법 §59의2 기본 자녀공제 + 출산·입양 추가공제</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">종합소득세 계산기</h3>
            <p className="cat-desc">사업소득·임대소득·기타소득 합산 종합소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/crypto-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">가상화폐 양도세 계산기</h3>
            <p className="cat-desc">연 250만 공제 + 22% 분리과세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/daily-wage/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">일용직 원천징수 계산기</h3>
            <p className="cat-desc">일급 15만 비과세 + 초과분 6% × 45% 공제 후</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/four-insurance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">4대보험료 계산기 (근로자)</h3>
            <p className="cat-desc">국민연금 + 건강보험 + 장기요양 + 고용보험 본인부담</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/freelancer/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">프리랜서 3.3% 원천징수 계산기</h3>
            <p className="cat-desc">사업소득 원천징수 3% + 지방세 0.3%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/gift-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">증여세 계산기</h3>
            <p className="cat-desc">상증법 §53 수증자별 증여재산공제 + 누진세율</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/inheritance-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">상속세 계산기</h3>
            <p className="cat-desc">상속세 및 증여세법 §26 누진세율 + 일괄/배우자공제</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/other-income/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기타소득세 계산기</h3>
            <p className="cat-desc">필요경비 60% 차감 후 22% 분리과세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/retirement-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직소득세 계산기</h3>
            <p className="cat-desc">근속연수공제 + 환산급여공제 적용 누진세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/salary/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">연봉 실수령액 계산기</h3>
            <p className="cat-desc">국세청 2026 — 연간 정산 기준 (회사 명세서와 ±5~10% 차이, 연말정산 후 일치)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/stock-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주식 양도소득세 계산기 (국내·해외 통합)</h3>
            <p className="cat-desc">국내 비대주주·대주주 / 해외주식 22% (대주주 3억 초과 27.5%)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/vat/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (일반과세자) 계산기</h3>
            <p className="cat-desc">매출 부가세 - 매입 부가세 = 납부세액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/vat-simple/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (간이과세자) 계산기</h3>
            <p className="cat-desc">매출액 × 업종별 부가가치율 × 10%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="tax" sub="세금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
