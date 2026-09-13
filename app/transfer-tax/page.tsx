import type { Metadata } from "next";
import { TopicHub } from "@/components/TopicHub";
import { HUB } from "@/data/hubs/transfer-tax";
import spec from "@/data/calculators/realestate/transfer-tax.json";

// 양도세 허브 원페이지. 총정리 글은 /transfer-tax/guide/, 계산기는 /transfer-tax/calculator/ 에 있다.
const PAGE_URL = "https://moneydoc.kr/transfer-tax/";

export const metadata: Metadata = {
  title: HUB.title,
  description: HUB.description,
  alternates: { canonical: "/transfer-tax/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", title: HUB.title, description: HUB.description, url: PAGE_URL },
};

export default function Page() {
  return (
    <TopicHub
      hub={HUB}
      navActive="realestate"
      quick={[
        { label: "양도소득세 계산기", href: HUB.calculator.route, note: "판 금액·산 금액·보유 기간" },
        { label: "1주택 양도세 비과세 요건과 계산", href: HUB.guide.href, note: "처음이면 이 글부터" },
        { label: "취득세 계산기", href: "/acquisition-tax/", note: "살 때 낸 세금" },
        { label: "부동산 중개수수료 계산기", href: "/brokerage/", note: "팔 때 든 비용" },
      ]}
      sources={[
        { name: "소득세법 제89조·제95조·제97조·제104조·제105조", note: "비과세 · 장기보유특별공제 · 필요경비 · 세율 · 예정신고" },
        { name: "소득세법 시행령 제154조·제159조의4·제163조", note: "1세대 1주택 · 거주기간 · 필요경비 항목" },
        { name: "홈택스 양도소득세 계산", note: `계산기 대조 · ${spec.lastVerified} 검증` },
        { name: "네이버 자동완성", note: "인기검색어 근거 · 2026-09-13 수집" },
      ]}
    />
  );
}
