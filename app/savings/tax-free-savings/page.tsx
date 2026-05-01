import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/tax-free-savings.json";

export const metadata: Metadata = {
  title: "비과세종합저축 계산기 — 2026년 기준",
  description: "65세 이상·장애인·국가유공자 등 비과세종합저축 가입 자격자가 사용. 1인당 5천만 한도까지 이자소득세 0원.",
  alternates: { canonical: "/savings/tax-free-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
