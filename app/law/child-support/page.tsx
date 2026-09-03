import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/child-support.json";

export const metadata: Metadata = {
  title: "양육비 계산기 (2026년 기준)",
  description:
    "서울가정법원 양육비산정기준표 2024 (자녀 1인 표준). 부모 합산 월소득과 자녀 나이를 입력하면 표준 양육비가 산출되고, 비양육친 소득 비율로 분담액이 계산됩니다.",
  alternates: { canonical: "/law/child-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="서울가정법원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
