import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/retirement-income-tax.json";

export const metadata: Metadata = {
  title: "퇴직소득세 계산기 (2026년 기준)",
  description:
    "홈택스 산식 1:1 동일 (소득세법 §48 + §55의2 + §55). 퇴직금(IRP·DC형 제외) 총액과 근속연수를 입력하면 근속연수공제 → 환산급여 → 환산급여공제 → 누진세율 분리과세 → 지방세 10% 자동 계산. 회사가 원천징수하지만 본인이 미리 알 수 있음.",
  alternates: { canonical: "/retirement-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
