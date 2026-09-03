import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dti-limit.json";

export const metadata: Metadata = {
  title: "DTI 계산기 (2026년 기준)",
  description:
    "총부채상환비율 기준 신규 주담대 한도. 주담대 원리금 + 기타 대출 이자만 합산. DTI(총부채상환비율) 한도 계산. 연소득·기타대출 월이자·대출기간·금리·DTI한도(50% 또는 60%) 입력. DTI = 월 원리금 / 월 소득. 정책대출(디딤돌·보금자리)은 DTI 60% 별도 적용.",
  alternates: { canonical: "/loan/dti-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="주담대 DTI 산정 기준 · 5케이스 검증"
      description="총부채상환비율 기준 신규 주담대 한도"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
