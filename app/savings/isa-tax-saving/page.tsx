import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/isa-tax-saving.json";

export const metadata: Metadata = {
  title: "ISA 계산기 (2026년 기준)",
  description:
    "ISA 5년 만기 누적 이자에서 일반과세 대비 절세액. 일반형 200만, 서민형 400만 비과세. ISA(개인종합자산관리계좌) 5년 만기 절세 효과 계산. 누적 이자에 일반형 200만(서민형 400만) 비과세 + 초과분 9.9% 분리과세 적용. 일반 계좌(15.4%) 대비 절세액 자동.",
  alternates: { canonical: "/savings/isa-tax-saving/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="조특법 §91의18 · 5케이스 검증"
      description="ISA 5년 누적 이자에서 일반과세(15.4%) 대비 절세액 — 일반형 200만 / 서민형 400만 비과세"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
