import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/ltv-limit.json";

export const metadata: Metadata = {
  title: "LTV 계산기 (2026년 기준)",
  description:
    "주택담보비율 + 방공제 + 임차보증금 + 수도권 절대한도 (15억↓ 6억 / 15~25억 4억 / 25억↑ 2억) 통합. LTV(주택담보대출비율) 한도 계산. 매매가·지역(투기지역·조정대상·일반)·주택 종류 입력. 수도권·규제지역은 주택 시가별 절대한도(시가 15억 이하 6억 /.",
  alternates: { canonical: "/loan/ltv-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토부·금감원 LTV 한도 · 8케이스 검증"
      description="주택담보비율 + 방공제 + 임차보증금 + 절대한도 (수도권 규제 6억, 25억 초과 8억) 통합"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
