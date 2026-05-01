import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/cash-service-fee.json";

export const metadata: Metadata = {
  title: "현금서비스 수수료 계산기 — 2026년 기준",
  description: "이용금액·연 수수료율·사용일수 입력 시 이자와 총 상환액 산출.",
  alternates: { canonical: "/util/cash-service-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여신금융협회 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
