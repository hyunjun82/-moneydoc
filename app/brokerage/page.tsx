import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/brokerage-fee.json";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산기 (2026년 기준)",
  description:
    "매매, 전세, 월세 거래금액으로 법정 중개수수료 한도와 부가가치세를 더한 금액을 계산해요. 월세는 보증금에 월세의 100배를 더해 환산하고, 그 금액이 5천만원 미만이면 70배로 다시 계산해요. 9억원 매매는 상한요율 0.5%라 한도가 4,500,000원이에요.",
  alternates: { canonical: "/brokerage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
