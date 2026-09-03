import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/credit-loan.json";

export const metadata: Metadata = {
  title: "신용대출 계산기 (2026년 기준)",
  description:
    "연소득 기준 신용대출 한도 (관행 1.5배) + DSR·신용도 추가 적용. 연소득과 신용 한도 배수(보통 1~1.5배) 입력 시 신용대출 가능 한도 산출. 1금융권은 신용 1등급 1.5배·4~6등급 1배가 관행. DSR 40%와 동시 적용되므로 기존 부채 있으면 한도 줄어듦.",
  alternates: { canonical: "/credit-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행권 신용대출 표준 산식 · 5케이스 자체 검증"
      description="연소득 기준 한도 (관행 1.5배) + DSR·신용도 추가 적용"
    >
      <Client />
    </CalculatorShell>
  );
}
