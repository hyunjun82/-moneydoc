import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { PopularCalcs } from "@/components/home/PopularCalcs";
import { PopularGuides } from "@/components/home/PopularGuides";

export default function HomePage() {
  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            법령 원문 대조 · 359개 케이스 자동 검증
          </span>
          <h1>
            돈 계산은,<br />
            <em>정확하게</em>
          </h1>
          <p>
            연봉 실수령액부터 양도세·국민연금·실업급여까지. 법령 원문을 대조하고
            자동 검증한 한국 금융·세금·법률 계산기 66종을 한 곳에서.
          </p>
        </div>
      </section>

<section className="guide-section">
        <div className="guide-list" style={{ padding: "28px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>MoneyDoc은 어떤 사이트인가요?</h2>
          <p>
            MoneyDoc은 한결(필명)이 개인으로 운영하는 금융, 세금, 법률 계산기와 가이드 사이트예요. 연봉 실수령액, 양도소득세, 국민연금, 실업급여처럼 생활에서 자주 마주치는 돈 계산을 한 곳에 모았어요. 계산기 66종이 모두 하나의 엔진에서 돌아가고, 법령 원문과 정부 고시를 근거로 산식을 만들어요. 세무나 법률 자문을 하는 곳은 아니고, 계산 과정을 투명하게 보여주는 것이 목표예요.
          </p>
          <p>
            정확도는 말로 하지 않고 검사로 확인해요. 359개 케이스를 자동으로 실행해 하나라도 어긋나면 배포하지 않아요. 대출 계산기 7종은 한국주택금융공사 등 외부 계산기와 값을 맞춰 교차 대조하고, 나머지는 법령 원문 대조와 내부 회귀 검증을 거쳐요. 틀린 곳을 찾으면 바로 고치고 무엇을 왜 고쳤는지 해당 계산기에 남겨요.
          </p>
          <p>
            사용법은 간단해요. 위의 분야 중 하나를 고르거나 자주 쓰는 계산기 목록에서 바로 들어가면 돼요. 각 계산기 페이지에는 입력 항목 설명과 결과 해석, 근거 법령이 함께 있어요. 더 깊이 알고 싶으면 가이드 글로 이어가면 돼요. 결과는 참고용이며 실제 금액은 개인 사정과 기관 심사에 따라 달라질 수 있어요. 자세한 운영 방식은 <a href="/about/">소개 페이지</a>에서 확인할 수 있어요.
          </p>
        </div>
      </section>

      <CategoryTiles />
      <PopularCalcs />
      <PopularGuides />

      <Footer />
    </>
  );
}
