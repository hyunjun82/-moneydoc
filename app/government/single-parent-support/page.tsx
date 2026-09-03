import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/single-parent-support.json";

export const metadata: Metadata = {
  title: "한부모가족 자녀양육비 계산기 (2026년 기준)",
  description:
    "중위소득 65% 이하 + 18세 미만 자녀 1인당 월 23만원. 한부모가족 자녀양육비 계산. 한부모 가구원수·소득 입력 시 중위 65% 이하 자격 판정 + 자녀 1인당 월 23만원 양육비 산출. 18세 미만 자녀 대상.",
  alternates: { canonical: "/government/single-parent-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여성가족부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
