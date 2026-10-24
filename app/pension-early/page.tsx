import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/pension/national-pension-early.json";

export const metadata: Metadata = {
  title: "국민연금 조기수령 감액 계산기 (2026년 기준)",
  description:
    "정상 수령 때 받을 월 연금액과 조기 수령 시작 나이를 넣으면 줄어든 월 수령액을 계산해요. 1969년 이후 출생자의 정상 수령 나이 65세보다 1년 일찍 받을 때마다 6%씩 줄고, 60세부터 받으면 최대 30%가 줄어요.",
  alternates: { canonical: "/pension-early/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국민연금공단 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
