import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/cash-service-fee.json";

export const metadata: Metadata = {
  title: "현금서비스 수수료 계산기 (2026년 기준)",
  description:
    "이용금액 × 연이율 / 365 × 사용일수 (단리). 신용카드 단기카드대출(현금서비스) 수수료 계산. 이용액·이자율(연 19~22%)·이용기간 입력. 신용카드 현금서비스는 즉시 이자 발생, 일할 계산. 단기카드대출 한도와 무관한 별도 한도 (보통 300~1,000만).",
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
