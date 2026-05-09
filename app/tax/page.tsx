import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "세금 계산기 — 15종 | MoneyDoc",
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

      <section className="section">
        <div className="cats">
        <a href="/tax/business-income-tax-simple/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">사업소득세 (단순경비율) 계산기</h3>
            <p className="cat-desc">추계신고 단순경비율 기반 사업소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/child-tax-credit/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">자녀세액공제 계산기</h3>
            <p className="cat-desc">소득세법 §59의2 기본 자녀공제 + 출산·입양 추가공제</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/comprehensive-income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">종합소득세 계산기</h3>
            <p className="cat-desc">사업소득·임대소득·기타소득 합산 종합소득세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/crypto-transfer-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">가상화폐 양도세 계산기</h3>
            <p className="cat-desc">연 250만 공제 + 22% 분리과세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/daily-wage-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">일용직 원천징수 계산기</h3>
            <p className="cat-desc">일급 15만 비과세 + 초과분 6% × 45% 공제 후</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/four-major-insurance/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">4대보험료 계산기 (근로자)</h3>
            <p className="cat-desc">국민연금 + 건강보험 + 장기요양 + 고용보험 본인부담</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/freelancer-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">프리랜서 3.3% 원천징수 계산기</h3>
            <p className="cat-desc">사업소득 원천징수 3% + 지방세 0.3%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/gift-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">증여세 계산기</h3>
            <p className="cat-desc">상증법 §53 수증자별 증여재산공제 + 누진세율</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/inheritance-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">상속세 계산기</h3>
            <p className="cat-desc">상속세 및 증여세법 §26 누진세율 + 일괄/배우자공제</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/other-income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">기타소득세 계산기</h3>
            <p className="cat-desc">필요경비 60% 차감 후 22% 분리과세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/retirement-income-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">퇴직소득세 계산기</h3>
            <p className="cat-desc">근속연수공제 + 환산급여공제 적용 누진세</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/salary-net-pay/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">연봉 실수령액 계산기</h3>
            <p className="cat-desc">국세청 2026 — 연간 정산 기준 (회사 명세서와 ±5~10% 차이, 연말정산 후 일치)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/stock-transfer-tax/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">주식 양도소득세 계산기 (국내·해외 통합)</h3>
            <p className="cat-desc">국내 비대주주·대주주 / 해외주식 22% (대주주 3억 초과 27.5%)</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/vat-general/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (일반과세자) 계산기</h3>
            <p className="cat-desc">매출 부가세 - 매입 부가세 = 납부세액</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        <a href="/tax/vat-simplified/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">부가세 (간이과세자) 계산기</h3>
            <p className="cat-desc">매출액 × 업종별 부가가치율 × 10%</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
