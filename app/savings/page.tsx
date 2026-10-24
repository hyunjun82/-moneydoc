import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "저축 계산기 4종",
  description: "적금, 정기예금, 자유적금, ISA 계산기 4종이에요. 납입액과 기간, 금리를 넣으면 세전 이자와 이자소득세, 세후 만기 금액이 나오고 ISA로 아끼는 세금도 확인할 수 있어요.",
  alternates: { canonical: "/savings/" },
};

export default function Page() {
  return (
    <>
      <Header active="savings" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>저축</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">저축 계산기</h1>
        <p className="page-sub">적금, 정기예금, 자유적금 만기 수령액과 ISA 절세 효과를 계산해요.</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>예금과 적금, 어떤 계산기로 비교하면 될까요?</h2>
          <p>
            목돈을 한 번에 맡길 거라면 정기예금 계산기를, 매달 일정 금액을 넣을 거라면 적금 계산기를 쓰면 돼요. 금액, 금리, 기간을 넣으면 세전 이자와 이자소득세를 뗀 세후 수령액이 함께 나와요. 은행 광고에 적힌 금리는 세전 기준이라 실제 받는 돈은 그보다 적어요. 이 차이를 미리 확인하는 것이 계산기의 가장 큰 쓸모예요.
          </p>
          <p>
            매달 넣는 금액이 들쭉날쭉하다면 자유적금 계산기가 맞아요. 납입한 날짜와 금액을 하나씩 넣으면 각 납입분이 만기까지 쌓은 이자를 따로 계산해 합산해 줘요. 같은 총액이라도 일찍 넣을수록 이자가 커지는 구조를 눈으로 확인할 수 있어요.
          </p>
          <p>
            비과세 혜택까지 고려한다면 ISA 계산기를 보세요. 일반형과 서민형 중 어디에 해당하는지, 운용 수익이 얼마인지 넣으면 비과세 한도를 넘는 부분에 대한 분리과세 세금과 일반 계좌 대비 절세 금액이 나와요. 예금과 적금을 ISA 안에서 운용할 때 유리한지 비교하는 데 쓸 수 있어요.
          </p>
          <p>
            결과는 단리와 복리 중 선택한 방식으로 계산되며, 이자소득세는 현행 세율을 그대로 적용해요. 은행마다 우대금리 조건이 달라 실제 금리는 상품 약관을 확인해야 해요. 자세한 내용은 <a href="/deposit/guide/">정기예금 가이드</a>, <a href="/installment/guide/">적금 가이드</a>, <a href="/isa/guide/">ISA 가이드</a>에서 이어 읽어 보세요.
          </p>
          <p>
            입력은 가입 금액, 약정 금리, 기간 세 가지가 기본이에요. 월 납입형은 매달 넣는 금액을, 거치형은 한 번에 맡기는 금액을 넣어요. 결과 화면에는 세전 이자, 이자소득세, 세후 수령액이 나뉘어 나오고, 만기에 통장에 들어올 총액을 바로 확인할 수 있어요. 여러 은행 상품의 금리를 바꿔 넣어 비교하면 어느 상품이 유리한지 한눈에 보여요. 비과세 종합저축 대상이라면 세금을 빼지 않은 금액이 실제 수령액에 가까워요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/installment/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">적금 계산기</h3>
            <p className="cat-desc">매월 같은 금액을 넣는 적금의 세후 만기 수령액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/deposit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">정기예금 계산기</h3>
            <p className="cat-desc">목돈을 한 번에 맡길 때 받는 세후 만기 금액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/free-savings/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자유적금 계산기</h3>
            <p className="cat-desc">월 평균 납입금으로 자유적금 세후 만기 수령액 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        <a href="/isa/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">ISA 계산기</h3>
            <p className="cat-desc">ISA 해지 때 일반 계좌보다 아끼는 세금 계산</p>
            <span className="cat-count">2026년 기준</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="savings" sub="예금·적금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
