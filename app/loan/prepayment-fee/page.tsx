import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/prepayment-fee.json";

export const metadata: Metadata = {
  title: "중도상환수수료 계산기 (2026년 기준)",
  description:
    "잔액 × 수수료율 × (잔여기간 / 총기간 36개월). 3년 경과 후 0%. 대출 중도상환 수수료 계산. 잔액·잔여기간·면제 기준(3년) 입력. 잔액 × 1.0~1.4% × (잔여기간/3년). 3년 경과 시 면제. 5천만 잔액·2년 경과 = 약 23만원 수수료.",
  alternates: { canonical: "/loan/prepayment-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행업감독규정 중도상환수수료 가이드 · 5케이스 검증"
      description="잔액 × 수수료율 × (잔여기간 / 총기간 36개월) — 3년 경과 후 0%"
    >
      <Client />
    </CalculatorShell>
  );
}
