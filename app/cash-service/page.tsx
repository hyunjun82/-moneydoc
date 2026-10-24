import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/cash-service-fee.json";

export const metadata: Metadata = {
  title: "현금서비스 수수료 계산기 (2026년 기준)",
  description:
    "현금서비스 이용금액, 연 수수료율, 사용일수로 이자와 갚을 돈을 계산해요. 연 수수료율을 365일로 나눠 쓴 날수만큼 곱하는 단리 방식이에요. 100만원을 연 20%로 30일 쓰면 이자는 16,438원이에요.",
  alternates: { canonical: "/cash-service/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여신금융협회 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
