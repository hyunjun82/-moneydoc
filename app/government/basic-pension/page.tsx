import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/basic-pension.json";

export const metadata: Metadata = {
  title: "기초연금 수령액 계산기 — 2026년 기준",
  description: "65세 이상 가구 유형(단독/부부)과 소득인정액(월)을 입력하면 기초연금 자격과 최대 수령액이 산출됩니다.",
  alternates: { canonical: "/government/basic-pension/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
