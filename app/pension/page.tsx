import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideList } from "@/components/GuideList";

export const metadata: Metadata = {
  title: "연금 계산기 4종",
  description: "국민연금 예상수령액·국민연금 조기수령 감액·IRP·연금저축 세액공제·노란우산공제 절세 — 국민연금공단 + 소득세법 §59-3 + 조세특례제한법 §86의3 표준 산식",
  alternates: { canonical: "/pension/" },
};

export default function Page() {
  return (
    <>
      <Header active="pension" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>연금</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">연금 계산기</h1>
        <p className="page-sub">국민연금·퇴직연금·IRP·연금저축 — 국민연금공단·소득세법 §59-3</p>
      </header>

      <section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>연금 계산기로 무엇을 미리 알 수 있을까요?</h2>
          <p>
            노후 준비에서 가장 먼저 궁금한 것은 국민연금을 얼마나 받을지예요. 국민연금 예상수령액 계산기에 가입 기간과 월 평균 소득을 넣으면 기본 산식에 따른 월 예상 연금액이 나와요. 공단 홈페이지의 예상연금 조회와 같은 구조를 쓰기 때문에 가입 이력을 알고 있다면 비슷한 값을 확인할 수 있어요.
          </p>
          <p>
            수급 개시 연령보다 먼저 받고 싶은 분은 국민연금 조기수령 감액 계산기를 보세요. 몇 년 앞당겨 받는지에 따라 연금액이 줄어드는 비율과, 평생 받는 총액이 어느 시점에서 뒤바뀌는지를 함께 보여줘요. 당장 소득이 없을 때와 조금 더 기다릴 수 있을 때 어느 쪽이 유리한지 판단하는 데 도움이 돼요.
          </p>
          <p>
            세금을 줄이면서 노후 자금을 모으려면 IRP와 연금저축 계산기를 써요. 연 납입액과 총급여를 넣으면 세액공제 한도와 돌려받는 세금이 나와요. 소득 구간에 따라 공제율이 달라지니 자신의 급여를 정확히 넣는 것이 중요해요. 개인사업자나 소기업 대표라면 노란우산공제 계산기로 소득공제 효과를 따로 확인할 수 있어요.
          </p>
          <p>
            연금 제도는 법 개정으로 요율과 연령이 바뀌니 계산 기준 시점을 꼭 확인해 주세요. 제도 설명과 자주 묻는 질문은 <a href="/national-pension/guide/">국민연금 가이드</a>, <a href="/pension-early/guide/">조기수령 가이드</a>, <a href="/irp/guide/">IRP 세액공제 가이드</a>, <a href="/noranumbrella/guide/">노란우산공제 가이드</a>에 담았어요.
          </p>
          <p>
            입력에 필요한 가입 기간과 소득 이력은 국민연금공단 내연금 조회 화면에서 확인할 수 있어요. IRP와 연금저축은 연말정산 간소화 자료의 납입액을 넣으면 돼요. 결과 화면에는 월 연금액이나 환급 세액뿐 아니라 적용된 공제율과 한도가 함께 나와 어떤 조건에서 혜택이 달라지는지 바로 볼 수 있어요. 납입액을 조금씩 바꿔 넣어 보면 공제 한도를 꽉 채우는 지점을 찾는 데 도움이 돼요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="cats">
        <a href="/irp/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">IRP·연금저축 세액공제 계산기</h3>
            <p className="cat-desc">소득세법 §59의3 연금계좌 세액공제 환급 산출</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/pension-early/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 조기수령 감액 계산기</h3>
            <p className="cat-desc">60~64세 조기수령 시 1년당 6% 감액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/national-pension/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">국민연금 예상수령액 계산기</h3>
            <p className="cat-desc">국민연금공단 공식 산식 기반 노령연금 추정</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/noranumbrella/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">노란우산공제 절세 계산기</h3>
            <p className="cat-desc">사업소득 한계세율 × 납입액 절세효과</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <GuideList cat="pension" sub="연금 계산 기준을 법령 원문으로 확인해 정리했습니다" />
      <Footer />
    </>
  );
}
