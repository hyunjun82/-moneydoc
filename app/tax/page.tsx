import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "세금 계산기 15종",
  description: "연봉 실수령액, 4대보험료, 종합소득세, 사업소득세, 프리랜서 3.3%, 일용직 원천징수, 기타소득세, 퇴직소득세, 자녀세액공제를 계산해요. 증여세, 상속세, 주식과 가상화폐 양도세, 일반과 간이과세자 부가세까지 세금 계산기 15종이에요.",
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
        <p className="page-sub">연봉 실수령액, 종합소득세, 원천징수, 양도세, 상속세, 증여세, 부가세를 계산해요.</p>
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
            <p className="cat-desc">연 매출과 업종별 단순경비율로 사업소득세와 지방소득세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/child-credit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자녀세액공제 계산기</h3>
            <p className="cat-desc">공제대상 자녀 수와 출산, 입양 자녀로 자녀세액공제 합계 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">종합소득세 계산기</h3>
            <p className="cat-desc">종합소득금액으로 소득세와 지방소득세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/crypto-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">가상화폐 양도세 계산기</h3>
            <p className="cat-desc">2027년 양도분부터 과세되는 가상자산 소득세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/daily-wage/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">일용직 원천징수 계산기</h3>
            <p className="cat-desc">일급과 일한 날수로 일용직 원천징수액과 실수령액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/four-insurance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">4대보험료 계산기 (근로자)</h3>
            <p className="cat-desc">월 보수로 4대보험 본인 부담액과 회사 부담액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/freelancer/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">프리랜서 3.3% 원천징수 계산기</h3>
            <p className="cat-desc">프리랜서 보수에서 떼는 3.3% 원천징수와 실수령액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/gift-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">증여세 계산기</h3>
            <p className="cat-desc">증여받은 금액과 관계로 증여세와 납부세액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/inheritance-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">상속세 계산기</h3>
            <p className="cat-desc">상속재산과 가족 구성으로 상속공제와 상속세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/other-income/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기타소득세 계산기</h3>
            <p className="cat-desc">총수입에서 필요경비를 뺀 기타소득 원천징수 세액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/retirement-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직소득세 계산기</h3>
            <p className="cat-desc">퇴직금과 근속연수로 퇴직소득세와 지방소득세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/salary/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">연봉 실수령액 계산기</h3>
            <p className="cat-desc">연봉과 부양가족 수로 간이세액표 기준 월 실수령액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/stock-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주식 양도소득세 계산기 (국내·해외 통합)</h3>
            <p className="cat-desc">해외주식과 국내 비상장, 대주주 주식의 양도소득세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/vat/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (일반과세자) 계산기</h3>
            <p className="cat-desc">매출 부가세에서 매입 부가세를 뺀 일반과세자 납부세액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/vat-simple/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (간이과세자) 계산기</h3>
            <p className="cat-desc">연 매출액과 업종별 부가가치율로 간이과세자 부가세 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="tax" sub="세금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
