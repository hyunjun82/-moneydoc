import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/acquisition-tax.json";

export const metadata: Metadata = {
  title: "취득세 계산기 — 2026년 기준",
  description: "주택 매매 시 부담하는 취득세를 계산합니다. 매매가액·보유 주택 수(취득 후 기준)·조정대상지역 여부·전용면적을 입력하면 취득세 + 농어촌특별세 + 지방교육세 합계가 자동 산출됩니다.",
  alternates: { canonical: "/realestate/acquisition-tax/" },
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
