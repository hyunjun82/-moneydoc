import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/realestate/acquisition-tax.json";

export const metadata: Metadata = {
  title: "취득세 계산기 (2026년 기준)",
  description:
    "주택 매매·취득 시 납부 취득세 + 농특세 + 지방교육세. 주택 매매 시 잔금 60일 이내 납부하는 취득세를 계산. 매매가 + 취득 후 보유 주택 수 + 조정대상지역 + 전용면적 입력. 1주택 6억 이하 1.1%부터 다주택 조정 12%(+지방교육)까지 케이스별 자동 적용.",
  alternates: { canonical: "/acquisition-tax/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="행정안전부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
