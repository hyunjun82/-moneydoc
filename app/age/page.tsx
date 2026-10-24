import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/age-calculator.json";

export const metadata: Metadata = {
  title: "나이 계산기 (2026년 기준)",
  description:
    "생년월일과 기준일을 넣으면 만 나이, 세는 나이, 띠를 계산해요. 생일이 지났는지 따져 만 나이를 구해요. 1990년 5월 10일생은 2026년 5월 9일 기준 만 35세, 세는 나이 37세예요.",
  alternates: { canonical: "/age/" },
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
