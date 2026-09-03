import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/industrial-accident-pay.json";

export const metadata: Metadata = {
  title: "산재 휴업급여 계산기 (2026년 기준)",
  description:
    "평균임금의 70% × 휴업일수 (최저 82,560원/일). 산재 휴업급여 계산. 사고로 일하지 못한 기간 동안 평균임금 × 70% 지급 (최저 82,560원/일, 2026 최저시급 10,320 × 8h). 근로복지공단 신청.",
  alternates: { canonical: "/government/industrial-accident-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="근로복지공단 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
