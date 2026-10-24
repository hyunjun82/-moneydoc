import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/comprehensive-income-tax.json";

export const metadata: Metadata = {
  title: "종합소득세 계산기 (2026년 기준)",
  description:
    "종합소득금액과 부양가족, 자녀 수로 소득세와 지방소득세를 계산해요. 인적공제와 누진세율, 자녀세액공제, 표준세액공제 7만원을 차례로 반영해요. 근로소득세액공제는 빼지 않으니 근로소득이 있으면 실제보다 많게 나와요.",
  alternates: { canonical: "/income-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 5케이스 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
