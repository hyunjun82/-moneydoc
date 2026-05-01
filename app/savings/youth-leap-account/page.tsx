import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/youth-leap-account.json";

export const metadata: Metadata = {
  title: "청년도약계좌 만기 시뮬레이터 — 2026년 기준",
  description: "월 납입금(10만~70만), 총급여(정부 기여금 결정), 은행 적용 이자율을 입력하면 5년 만기 수령액이 산출됩니다. 본인 납입 + 정부 기여금 + 이자(비과세)가 합산되어 표시됩니다.",
  alternates: { canonical: "/savings/youth-leap-account/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="서민금융진흥원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
