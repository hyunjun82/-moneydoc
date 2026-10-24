import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "유틸 계산기 5종",
  description: "퍼센트, 나이, 날짜, 신용카드 할부 수수료, 현금서비스 수수료를 계산하는 유틸 계산기 5종이에요. 만 나이와 D-Day, 비율과 증감률, 할부 수수료처럼 생활 속 계산을 빠르게 할 수 있어요.",
  alternates: { canonical: "/util/" },
};

export default function Page() {
  return (
    <>
      <Header active="util" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>유틸</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">유틸 계산기</h1>
        <p className="page-sub">퍼센트, 나이, 날짜, 카드 할부 수수료, 현금서비스 이자를 계산하는 생활 도구예요.</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>일상 계산 도구는 어떻게 쓰나요?</h2>
          <p>
            이 페이지의 계산기는 세금이나 법령과 관계없는 생활 속 계산 도구예요. 그래서 정부 산식 검증 대상이 아니고, 수학적으로 정의된 방식 그대로 계산해요. 할인율이 얼마인지, 전체 중 비율이 몇 퍼센트인지, 지난달보다 몇 퍼센트 늘었는지 헷갈릴 때 퍼센트 계산기를 쓰면 네 가지 모드 중 맞는 것을 골라 바로 답을 얻을 수 있어요.
          </p>
          <p>
            나이 계산기는 생년월일을 넣으면 만 나이와 한국식 나이, 띠를 함께 보여줘요. 공문서와 병원은 만 나이를 쓰고, 일상 대화는 여전히 한국식 나이를 쓰는 경우가 많아 두 값을 같이 알아 두면 편해요. 날짜 계산기는 두 날짜 사이의 일수와 년월일 차이를 세어 주고, 특정 날짜까지 남은 디데이도 계산해요. 계약 만기, 시험일, 기념일 계산에 쓸 수 있어요.
          </p>
          <p>
            카드로 큰 금액을 결제할 때는 신용카드 할부 수수료 계산기를 먼저 보세요. 결제 금액, 할부 개월 수, 수수료율을 넣으면 매달 낼 금액과 총 수수료가 나와요. 무이자 할부가 아닐 때 수수료가 얼마나 붙는지 미리 알 수 있어요. 현금서비스 수수료 계산기는 이용 금액과 연이율, 사용 일수를 넣어 단리로 계산한 수수료를 보여줘요. 며칠만 쓰고 바로 갚을 때 비용이 얼마인지 확인하는 데 유용해요.
          </p>
          <p>
            카드 수수료율은 카드사와 개인 신용도에 따라 다르니 실제 적용 요율은 카드사 안내를 확인해 넣어 주세요. 결과는 입력한 조건 그대로의 산술 계산이에요.
          </p>
          <p>
            모든 결과는 입력을 바꾸는 즉시 다시 계산되고, 계산 방식은 결과 아래에 식으로 적어 두었어요. 어떤 값이 어디에 들어갔는지 눈으로 확인할 수 있어 암산이나 엑셀 계산과 비교하기도 쉬워요. 급하게 비율이나 날짜를 확인해야 할 때 바로 쓸 수 있도록 입력란을 최소한으로 줄였어요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/age/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">나이 계산기</h3>
            <p className="cat-desc">생년월일과 기준일로 만 나이, 세는 나이, 띠 계산</p>
          </div>
        </a>
        <a href="/cash-service/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">현금서비스 수수료 계산기</h3>
            <p className="cat-desc">이용금액, 연 수수료율, 사용일수로 현금서비스 이자 계산</p>
          </div>
        </a>
        <a href="/date/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">날짜 계산기 (D-Day)</h3>
            <p className="cat-desc">두 날짜 사이 날수를 세고 디데이 계산</p>
          </div>
        </a>
        <a href="/card-installment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">신용카드 할부 수수료 계산기</h3>
            <p className="cat-desc">신용카드 할부의 월 결제액과 총 수수료 계산</p>
          </div>
        </a>
        <a href="/percent/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퍼센트 계산기</h3>
            <p className="cat-desc">전체 중 일부, 비율, 증감률, 늘리거나 줄인 값 계산</p>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
