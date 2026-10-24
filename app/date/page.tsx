import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/date-calculator.json";

export const metadata: Metadata = {
  title: "날짜 계산기 (D-Day) (2026년 기준)",
  description:
    "시작일과 종료일을 넣으면 두 날짜 사이 날수를 계산하고 디데이를 셀 수 있어요. 날수는 시작일을 빼고 종료일까지 센 값이에요. 2026년 1월 1일부터 5월 9일까지는 128일이고, 주말과 공휴일은 빼지 않아요.",
  alternates: { canonical: "/date/" },
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
