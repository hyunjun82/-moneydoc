import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/isa-tax-saving.json";

export const metadata: Metadata = {
  title: "ISA 계산기 (2026년 기준)",
  description:
    "ISA를 해지할 때 쌓인 이자·배당 이익에서 일반 계좌(15.4%) 대비 아끼는 세금을 계산해요. 일반형 200만원, 서민형 400만원까지 비과세, 넘는 부분은 9.9% 분리과세예요.",
  alternates: { canonical: "/isa/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="조특법 §91의18 · 5케이스 검증"
      description="ISA 해지 때 쌓인 이익에서 일반 계좌(15.4%) 대비 아끼는 세금. 일반형 200만원, 서민형 400만원 비과세"
    >
      <Client />
    </CalculatorShell>
  );
}
