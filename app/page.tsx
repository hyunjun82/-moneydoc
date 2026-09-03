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
            정부 공식 산식 검증 · 오차 0
          </span>
          <h1>
            돈 계산은,<br />
            <em>정확하게</em>
          </h1>
          <p>
            연봉 실수령액부터 양도세·국민연금·실업급여까지. 정부 공식 산식으로
            검증된 한국 금융·세금·법률 계산기 66종을 한 곳에서.
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
