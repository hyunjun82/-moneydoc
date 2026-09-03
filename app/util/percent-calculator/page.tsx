import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/percent-calculator.json";

export const metadata: Metadata = {
  title: "퍼센트 계산기 (2026년 기준)",
  description:
    "% 계산 4가지 모드 (전체 중 일부 / 비율 / 증감률 / 증감 후). 퍼센트(%) 계산기. A의 B% 구하기, A는 B의 몇 %인지, A에서 B로 변화율(%) 등 3가지 모드. 할인율·세율·인상률·증감률 계산에 사용.",
  alternates: { canonical: "/util/percent-calculator/" },
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
