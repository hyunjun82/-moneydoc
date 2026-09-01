import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CATEGORIES: {
  slug: string;
  name: string;
  desc: string;
  count: number;
  icon: React.ReactNode;
}[] = [
  {
    slug: "savings",
    name: "저축",
    desc: "예금·적금, 어떤 게 나한테 더 유리할까",
    count: 9,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    slug: "loan",
    name: "대출",
    desc: "한도·금리·중도상환수수료까지 한눈에",
    count: 12,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    slug: "realestate",
    name: "부동산",
    desc: "전세·매매·임대차, 실수 없이 진행하기",
    count: 14,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    slug: "tax",
    name: "세금",
    desc: "연말정산·양도세·종합소득세 한 번에",
    count: 18,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    slug: "insurance",
    name: "보험",
    desc: "실손·자동차, 실속 있게 고르는 법",
    count: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    slug: "pension",
    name: "연금",
    desc: "국민·퇴직·개인연금, 내 노후 시뮬레이션",
    count: 8,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    slug: "law",
    name: "법률",
    desc: "상속·이혼·근로, 분쟁 전에 알아둘 것",
    count: 7,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 7h18M7 11l-3 5h6l-3-5zM17 11l-3 5h6l-3-5z" />
      </svg>
    ),
  },
  {
    slug: "government",
    name: "정부지원금",
    desc: "놓치면 손해, 받을 수 있는 모든 혜택",
    count: 17,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
      </svg>
    ),
  },
];

const POPULAR_CALCS: { cat: string; href: string; title: string; meta: string }[] = [
  { cat: "세금", href: "/tax/salary-net-pay/", title: "연봉 실수령액 계산기", meta: "국세청 2026 간이세액표 · 5케이스 검증" },
  { cat: "세금", href: "/tax/comprehensive-income-tax/", title: "종합소득세 계산기", meta: "근로·사업·임대소득 합산" },
  { cat: "부동산", href: "/realestate/transfer-tax/", title: "양도소득세 계산기 (통합)", meta: "소득세법 §89 · 1세대1주택 비과세 자동 판정" },
  { cat: "부동산", href: "/realestate/acquisition-tax/", title: "취득세 계산기", meta: "지방세법 §11 · 면적·금액별 세율" },
  { cat: "법률", href: "/law/severance-pay/", title: "퇴직금 계산기 (법정 기본)", meta: "근로자퇴직급여보장법 §8" },
  { cat: "정부지원금", href: "/government/unemployment-benefit/", title: "실업급여 일액 계산기", meta: "고용보험법 §46" },
];

const GUIDES: { cat: string; href: string; title: string; meta: string }[] = [
  { cat: "정부지원금", href: "/government/unemployment-benefit-guide/", title: "실업급여 조건·금액·신청방법 총정리", meta: "2026년 상한 68,100원 · 하한 66,048원" },
  { cat: "정부지원금", href: "/government/earned-income-tax-credit-guide/", title: "근로장려금 지급일 2026, 8월 27일 지급", meta: "단독 165만 · 홑벌이 285만 · 맞벌이 330만" },
  { cat: "정부지원금", href: "/government/earned-income-tax-credit-check/", title: "근로장려금 지급액 조회 방법", meta: "홈택스·손택스 · ARS 1544-9944" },
  { cat: "정부지원금", href: "/government/youth-future-savings-guide/", title: "청년미래적금 계좌개설·가입조건·수령액", meta: "정부기여금 6% vs 12% 비교" },
  { cat: "정부지원금", href: "/government/youth-future-savings-soldier/", title: "군인도 청년미래적금 가입되나요?", meta: "군장병급여만 있어도 가입 가능" },
];

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
            검증된 한국 금융·세금·법률 계산기 91종을 한 곳에서.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">카테고리별 계산기</h2>
          <p className="section-sub">관심 있는 주제부터 차근차근 살펴보세요</p>
        </div>
        <div className="cats">
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`/${c.slug}/`} className="cat">
              <div className="cat-icon">{c.icon}</div>
              <div className="cat-body">
                <h3 className="cat-name">{c.name}</h3>
                <p className="cat-desc">{c.desc}</p>
                <span className="cat-count">{c.count}개 계산기</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="articles-wrap">
        <section className="articles-section">
          <div className="section-head">
            <h2 className="section-title">지금 가장 많이 쓰는 계산기</h2>
            <p className="section-sub">실수령·세금·복지에서 검색량 최상위 6개</p>
          </div>
          <div className="articles">
            {POPULAR_CALCS.map((p, i) => (
              <a key={p.href} href={p.href} className="article">
                <span className="article-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="article-body">
                  <span className="article-cat">{p.cat}</span>
                  <h3 className="article-title">{p.title}</h3>
                  <span className="article-meta">{p.meta}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">읽을거리 · 가이드</h2>
          <p className="section-sub">계산 결과를 실제로 어떻게 쓰는지, 법령 근거와 함께 정리했습니다</p>
        </div>
        <div className="articles">
          {GUIDES.map((g, i) => (
            <a key={g.href} href={g.href} className="article">
              <span className="article-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="article-body">
                <span className="article-cat">{g.cat}</span>
                <h3 className="article-title">{g.title}</h3>
                <span className="article-meta">{g.meta}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
