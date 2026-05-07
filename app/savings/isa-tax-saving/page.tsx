import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/isa-tax-saving.json";

export const metadata: Metadata = {
  title: "ISA 계산기 — 일반형 200만 / 서민형 400만 비과세 절세효과 | MoneyDoc",
  description: "ISA 5년 만기 누적 이자수익 입력 시 일반과세(15.4%) 대비 절세액 자동 계산. 일반형/서민형 토글, 조세특례제한법 §91의18 검증.",
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
