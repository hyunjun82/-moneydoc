import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/irp-tax-credit.json";

export const metadata: Metadata = {
  title: "IRP·연금저축 세액공제 계산기 — 2026년 기준",
  description: "IRP·연금저축 납입액과 총급여를 입력하면 연말정산 환급액(세액공제)이 산출됩니다. 합산 한도 700만원, 공제율은 총급여 5,500만 기준 차등.",
  alternates: { canonical: "/pension/irp-tax-credit/" },
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
