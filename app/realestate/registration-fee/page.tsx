import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/registration-fee.json";

export const metadata: Metadata = {
  title: "등기비용 계산기 — 2026년 기준",
  description: "매매가 입력 시 등기비용(등록면허세 + 지방교육세) 산출.",
  alternates: { canonical: "/realestate/registration-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="행정안전부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
