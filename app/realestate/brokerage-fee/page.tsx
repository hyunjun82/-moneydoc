import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/brokerage-fee.json";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산기 — 2026년 기준",
  description: "매매·전세·월세 거래의 중개수수료를 계산합니다. 거래 유형과 금액을 입력하면 법정 한도 내 최대 수수료가 산출됩니다. 월세의 경우 보증금과 월세를 따로 입력하면 환산금액으로 자동 계산됩니다.",
  alternates: { canonical: "/realestate/brokerage-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
