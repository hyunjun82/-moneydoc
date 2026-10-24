import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/government/basic-pension.json";

export const metadata: Metadata = {
  title: "기초연금 수령액 계산기 (2026)",
  description:
    "만 65세 이상 단독가구나 부부가구의 월 소득인정액으로 2026년 기초연금 자격과 금액을 계산해요. 기준연금액은 단독가구 월 349,700원, 부부가 함께 받으면 합쳐서 월 559,520원이에요. 국민연금 연계 감액과 선정기준액 근처 감액은 반영하지 않아요.",
  alternates: { canonical: "/basic-pension/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
