import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/pension/national-pension.json";

export const metadata: Metadata = {
  title: "국민연금 예상수령액 계산기 (2026년 기준)",
  description:
    "가입월수와 평균소득을 넣으면 2026년 산식(비례상수 1.29, A값 3,193,511원)으로 국민연금 월 노령연금액을 어림해요. 20년 미만은 50%에 1년마다 5%, 20년을 넘으면 1년마다 5%를 더해요. 2025년 이전 가입분의 비례상수 차이는 반영하지 않아요.",
  alternates: { canonical: "/national-pension/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국민연금법 제51조 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
