import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/transfer-tax.json";

export const metadata: Metadata = {
  title: "양도소득세 계산기 — 1세대 1주택·다주택·조정대상지역 통합 | MoneyDoc",
  description: "1세대 1주택 12억 비과세부터 조정 다주택 가산세율까지 모든 케이스 한 화면. 17 case 검증.",
  alternates: { canonical: "/realestate/transfer-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청·소득세법 §89·§95·§104 · 17 case 검증"
      description="1세대 1주택 / 다주택자 / 조정대상지역 다주택 — 양도 상황별 토글 한 화면"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
