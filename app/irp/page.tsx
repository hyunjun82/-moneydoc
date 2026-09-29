import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/pension/irp-tax-credit.json";

export const metadata: Metadata = {
  title: "IRP·연금저축 세액공제 계산기 (2026년 기준)",
  description:
    "IRP·연금저축 납입액과 총급여를 넣으면 돌려받는 세금(세액공제)을 계산해요. 연금저축 600만원, IRP와 합쳐 900만원까지 인정하고, 총급여 5,500만원 이하면 16.5%, 넘으면 13.2%예요(소득세법 제59조의3).",
  alternates: { canonical: "/irp/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="소득세법 제59조의3 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
