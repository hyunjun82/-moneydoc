import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/jeonse-loan.json";

export const metadata: Metadata = {
  title: "전세자금대출 계산기 (2026년 기준)",
  description:
    "보증금 80% (HF·HUG·청년) + 한도 차등. 정책별 적용. 전세자금대출 한도 계산. 보증금·연소득·보증기관(HF=주택금융공사 / HUG=주택도시보증공사 / SGI=서울보증보험) 입력. HF 80%(연 4억 한도), HUG 90%(연 5억), SGI 80%(연 5억). 최저.",
  alternates: { canonical: "/loan/jeonse-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="HF·HUG 보증 한도 기준 · 5케이스 검증"
      description="보증금 80% (HF·HUG·청년) + 한도 차등"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
