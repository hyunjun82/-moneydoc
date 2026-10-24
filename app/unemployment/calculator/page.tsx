import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/government/unemployment-benefit.json";

export const metadata: Metadata = {
  title: "실업급여 계산기 (2026년 기준)",
  description:
    "월 평균임금과 고용보험 가입연수, 50세 이상 또는 장애인 여부를 넣으면 실업급여 하루 금액과 받는 날수, 총액을 계산해요. 하루 금액은 1일 평균임금의 60%이고, 2026년 상한은 68,100원, 하한은 66,048원이에요.",
  alternates: { canonical: "/unemployment/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell spec={spec} sourceBadge="고용노동부 2026 · 검증 완료">
      <Client />
      <div className="main" style={{ paddingTop: 18 }}>
        <a href="/unemployment/" style={{ color: "var(--brand)", fontWeight: 600, fontSize: 15 }}>
          2026년 실업급여 얼마나 받나요, 조건부터 신청 방법까지 가이드 보기 →
        </a>
      </div>
    </CalculatorShell>
  );
}
