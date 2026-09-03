import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/age-calculator.json";

export const metadata: Metadata = {
  title: "나이 계산기 (2026년 기준)",
  description:
    "만 나이 + 한국 나이 + 띠 자동 산출. 만 나이 계산. 생년월일과 기준일을 입력하면 만 나이·연 나이·일수가 자동 산출. 2023년 6월부터 만 나이 통일 시행으로 모든 행정·법령에 만 나이 적용 (단, 학년·청소년보호법 등 일부 예외).",
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
