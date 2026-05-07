import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/ltv-limit.json";

export const metadata: Metadata = {
  title: "LTV 계산기 — 2026 지역별 LTV + 방공제 + 6억 한도 | MoneyDoc",
  description: "주택가격·지역·주택보유·방수·임차보증금 입력 시 LTV 한도 자동 계산. 2026 주택임대차보호법 + 2025.6.27 가계부채 관리방안 반영. MCI/MCG 토글.",
  alternates: { canonical: "/loan/ltv-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토부·금감원 + 주임법 시행령 · 8케이스 검증"
      description="주택담보비율 + 방공제 + 임차보증금 + 절대한도 (수도권 규제 6억, 25억 초과 8억) 통합"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
