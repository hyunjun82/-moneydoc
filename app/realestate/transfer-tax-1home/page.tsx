import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/transfer-tax-1home.json";

export const metadata: Metadata = {
  title: "양도소득세 계산기 (1세대 1주택) — 2026년 기준",
  description: "양도가액·취득가액·보유/거주 연수와 1세대 1주택 여부를 입력하면 양도세가 자동 산출됩니다. 1세대 1주택 + 보유 2년 이상 + 거주 2년 이상이면 12억까지 비과세이며, 12억 초과분만 과세됩니다.",
  alternates: { canonical: "/realestate/transfer-tax-1home/" },
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
