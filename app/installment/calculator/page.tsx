import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/savings/installment-savings.json";

export const metadata: Metadata = {
  title: "적금 계산기 (2026년 기준)",
  description:
    "월 적금 만기 수령액. 단리·복리 선택, 이자에서 세금 15.4% 자동 차감 (만 65세 이상 등 비과세 자격자는 0%). 정해진 금액 매월 납입하는 정기적금 만기 계산. 월 납입액·이자율·기간 입력. 단리 기준 (첫 달 납입금만 만기까지 12개월 이자, 마지막 달은 1개월 이자).",
  alternates: { canonical: "/installment/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="월 X원 납입 시 만기 수령액 — 단리/복리 토글, 이자소득세 15.4% 차감 (비과세 자격 시 0%)"
    >
      <Client />
    </CalculatorShell>
  );
}
