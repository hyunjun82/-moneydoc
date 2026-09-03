import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/comprehensive-income-tax.json";

export const metadata: Metadata = {
  title: "종합소득세 계산기 (2026년 기준)",
  description:
    "사업소득·임대소득·기타소득 합산 종합소득세. 근로소득·사업소득·이자·배당·임대·연금·기타소득 등 1년치 총합을 입력하면 부양가족 인적공제 → 누진세율 → 자녀세액공제 → 표준세액공제 7만 → 지방세 10% 순으로 자동 계산. 5월 종합소득세 신고 시 활용.",
  alternates: { canonical: "/tax/comprehensive-income-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 5케이스 검증 완료"
      description="근로소득 외 사업·임대·기타소득이 있는 분이 매년 5월 신고하는 종합소득세를 누진세율(6~45%)로 정확히 계산해드립니다."
    >
      <Client />
    </CalculatorShell>
  );
}
