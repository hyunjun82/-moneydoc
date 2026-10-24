import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "보험·자동차 계산기 2종",
  description: "실손보험 자기부담금·자동차세 (배기량·연식)·지방교육세 — 1~4세대 표준약관 + 지방세법 §127 (금감원·행정안전부 공식 산식)",
  alternates: { canonical: "/insurance/" },
};

export default function Page() {
  return (
    <>
      <Header active="insurance" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>보험</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">보험·자동차 계산기</h1>
        <p className="page-sub">실손보험·자동차세 — 금감원·행정안전부 표준 산식</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>보험과 자동차세 계산기는 언제 쓰면 좋을까요?</h2>
          <p>
            병원비를 내고 실손보험을 청구하기 전에 실제로 얼마가 돌아올지 궁금할 때 실손보험 자기부담금 계산기를 써요. 가입 시기에 따라 세대가 나뉘고, 세대마다 급여와 비급여 항목의 자기부담 비율이 달라요. 가입 연도, 급여 진료비, 비급여 진료비, 입원과 통원 여부를 넣으면 보험사가 지급할 금액과 내가 부담하는 금액이 나뉘어 나와요.
          </p>
          <p>
            청구액이 적을 때 통원 공제금액 때문에 지급액이 0원이 되는 경우도 미리 확인할 수 있어요. 결과는 표준약관 기준이라 특약이나 개별 약관에 따라 실제 지급액은 다를 수 있어요. 보험사 안내와 차이가 크다면 약관의 보장 비율을 먼저 확인해 보세요.
          </p>
          <p>
            자동차를 가지고 있다면 매년 두 번 자동차세 고지서를 받아요. 자동차세 계산기에 배기량과 차령을 넣으면 연간 세액과 지방교육세가 나와요. 차량이 오래될수록 적용되는 경감률이 커지는 구조라 중고차를 살 때 연식별 세금을 비교하는 데도 쓸 수 있어요. 한 해 세금을 연초에 한 번에 미리 내면 받는 연납 할인도 함께 보여줘요. 고지서가 오기 전에 미리 금액을 알고 있으면 가계 지출을 계획하기 쉬워요.
          </p>
          <p>
            두 계산기의 기준과 자주 묻는 질문은 <a href="/medical-payout/guide/">실손보험 자기부담금 가이드</a>와 <a href="/auto-tax/guide/">자동차세 가이드</a>에 정리했어요. 계산 결과는 참고용이며 실제 보험금 지급과 세액은 보험사와 지방자치단체의 결정을 따라요.
          </p>
          <p>
            입력에 필요한 진료비 내역은 병원 영수증의 급여와 비급여 구분, 본인부담금 항목에서 그대로 옮기면 돼요. 보험 세대는 가입 당시 증권의 가입일자로 확인할 수 있어요. 결과 화면에는 항목별 자기부담금과 보험사 지급 예상액이 나뉘어 나오고, 청구 전 꼭 챙길 서류도 함께 안내해요. 자동차세는 자동차등록증의 배기량과 최초 등록일을 넣으면 돼요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/medical-payout/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">실손보험 자기부담금 계산기</h3>
            <p className="cat-desc">의료비 - 면책금 - 자기부담률 = 보험금 (1~4세대 모두)</p>
            <span className="cat-count">금감원 표준약관</span>
          </div>
        </a>
        <a href="/auto-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자동차세 계산기</h3>
            <p className="cat-desc">배기량·연식·영업용 → 자동차세 + 지방교육세 자동 산출</p>
            <span className="cat-count">행정안전부 표준 (지방세법 §127)</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="insurance" sub="자동차세 등 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
