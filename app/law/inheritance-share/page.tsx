import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/inheritance-share.json";

export const metadata: Metadata = {
  title: "법정상속분 계산기 — 2026년 기준",
  description: "상속재산 + 가족 구성 입력 시 법정상속분 산출.",
  alternates: { canonical: "/law/inheritance-share/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대법원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
