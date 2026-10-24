import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/percent-calculator.json";

export const metadata: Metadata = {
  title: "퍼센트 계산기 (2026년 기준)",
  description:
    "퍼센트 계산을 네 가지 모드로 해요. A의 X% 구하기, A가 B의 몇 %인지, A에서 B로 바뀐 증감률, A에 X%를 늘리거나 줄인 값을 바로 구해요. 할인율, 세율, 인상률, 수익률 계산에 쓰면 돼요.",
  alternates: { canonical: "/percent/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 산식 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
