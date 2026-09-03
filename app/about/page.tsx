import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "MoneyDoc 소개",
  description:
    "MoneyDoc은 한국 금융·세금·법률 계산기 66종을 운영합니다. 모든 산식을 법령 원문과 대조하고 359개 케이스로 자동 검증합니다.",
  alternates: { canonical: "/about/" },
};

const H2: React.CSSProperties = { fontSize: 18, color: "var(--text)", marginTop: 28 };

export default function Page() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">MoneyDoc 소개</h1>
        <p className="page-sub">복잡한 돈 이야기를, 정확한 산식으로 풀어드립니다.</p>
      </header>
      <section className="guide-section">
        <div
          className="guide-list"
          style={{ padding: "32px 36px", color: "var(--text-2)", lineHeight: 1.75 }}
        >
          <h2 style={{ ...H2, marginTop: 0 }}>누가 만드나</h2>
          <p>
            MoneyDoc은 <strong>MoneyDoc 편집팀</strong>이 운영하는 계산기·가이드 사이트입니다.
            세무·법률 자문을 제공하는 곳이 아니며, 공개된 법령과 정부 고시를 근거로
            계산 과정을 투명하게 보여주는 것을 목표로 합니다.
            글의 작성자는 각 페이지 상단에 표기하고, 기준 시점을 함께 적습니다.
          </p>

          <h2 style={H2}>어떻게 만드나</h2>
          <p>
            산식을 페이지마다 따로 두지 않습니다. <strong>모든 계산은 하나의 엔진 파일</strong>에서
            나오고, 계산기 화면과 가이드 글이 같은 함수를 호출합니다. 같은 항목의 값이
            페이지마다 달라지는 일을 구조적으로 막기 위해서입니다.
          </p>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>법령 원문 대조</strong> — 세율·공제액·기한은
              국가법령정보센터의 조문을 직접 확인해 반영하고, 근거 조항을 페이지에 명시합니다.
            </li>
            <li>
              <strong>359개 케이스 자동 검증</strong> — 계산기 66종에 대해 표본 케이스를
              자동 실행합니다. 하나라도 어긋나면 배포하지 않습니다.
            </li>
            <li>
              <strong>외부 계산기 교차 대조 (대출 7종)</strong> — DSR·DTI·주택담보대출·전세자금대출
              등 7종은 한국주택금융공사를 비롯한 외부 계산기와 값을 맞춰 검증합니다.
              <em>
                나머지 계산기는 이 교차 대조 없이 법령 원문 대조와 내부 회귀 검증만 거칩니다.
                검증 범위를 있는 그대로 밝히는 편이 낫다고 보아 적어 둡니다.
              </em>
            </li>
            <li>
              <strong>배선 감사</strong> — 참조하는 상수·입력값이 실제로 존재하는지,
              계산 결과에 NaN이 섞이지 않는지 전 계산기를 기계적으로 점검합니다.
            </li>
          </ul>

          <h2 style={H2}>틀리면 고칩니다</h2>
          <p>
            검증 체계를 갖춘 뒤에도 오차는 나옵니다. 최근 점검에서는 4대보험 요율,
            자녀세액공제 금액, 재산세 공정시장가액비율, 취득세 중과 시 지방교육세 등
            <strong> 23건</strong>을 찾아 법령 원문 기준으로 정정했습니다.
            발견 즉시 고치고, 무엇을 왜 고쳤는지 해당 계산기의 근거 항목에 남깁니다.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-3, var(--text-2))" }}>
            최근 전체 검증: <strong>2026년 9월 1일</strong> · 359개 케이스 통과
          </p>

          <h2 style={H2}>출처</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>국가법령정보센터 — 소득세법, 지방세법, 고용보험법, 국민기초생활 보장법 등 조문 원문</li>
            <li>국세청 — 근로소득 간이세액표, 연말정산 공제 안내</li>
            <li>국민연금공단 · 건강보험공단 — 보험료율, 상·하한 고시</li>
            <li>고용노동부 — 고용보험료, 실업급여, 퇴직금, 육아휴직 급여</li>
            <li>보건복지부 — 기준 중위소득, 기초연금, 기초생활 급여별 선정기준</li>
            <li>국토교통부 · 행정안전부 — 주거급여, 부동산 세제, 지방세</li>
            <li>금융위원회 — 대출 규제, 스트레스 DSR</li>
          </ul>

          <h2 style={H2}>한계</h2>
          <p>
            계산 결과는 <strong>참고용</strong>입니다. 개인의 소득 구성, 재산 상황, 지방자치단체
            조례, 개별 공제 항목에 따라 실제 금액은 달라집니다. 세무·법률 판단이 필요한 사안은
            관할 기관이나 전문가를 통해 확인하시기 바랍니다. 이 사이트의 계산 결과에 근거한
            결정의 책임은 이용자에게 있습니다.
          </p>

          <h2 style={H2}>제보</h2>
          <p>
            산식 오류를 발견하시면 알려주세요. 근거 조항이나 정부 계산기 결과를 함께 보내주시면
            가장 빠르게 확인할 수 있습니다.{" "}
            <a href="/contact/" style={{ color: "var(--brand)" }}>
              문의 페이지
            </a>{" "}
            또는 contact@moneydoc.kr로 보내주시면 됩니다.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
