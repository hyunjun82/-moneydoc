import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/unemployment-benefit.json";

export const metadata: Metadata = {
  title: "실업급여 일액 계산기 (2026년 기준)",
  description: "월 평균임금과 고용보험 가입연수, 50세 이상 또는 장애인 여부를 입력하면 실업급여 일액과 총 수령액이 산출됩니다. 일액은 평균임금의 60%이며, 상·하한이 적용됩니다.",
  alternates: { canonical: "/government/unemployment-benefit/" },
};

export default function Page() {
  return (
    <CalculatorShell spec={spec} sourceBadge="고용노동부 2026 · 검증 완료">
      <GenericCalculator spec={spec} />
      <div className="main" style={{ paddingTop: 18 }}>
        <a href="/government/unemployment-benefit-guide/" style={{ color: "var(--brand)", fontWeight: 600, fontSize: 15 }}>
          실업급여 조건·금액·신청방법 총정리 가이드 보기 →
        </a>
      </div>
    </CalculatorShell>
  );
}
