import type { Metadata } from "next";
import { TopicHub } from "@/components/TopicHub";
import { HUB } from "@/data/hubs/acquisition-tax";
import spec from "@/data/calculators/realestate/acquisition-tax.json";

// 취득세 허브 원페이지. 총정리 글은 /acquisition-tax/guide/, 계산기는 /acquisition-tax/calculator/ 에 있다.
const PAGE_URL = "https://moneydoc.kr/acquisition-tax/";

export const metadata: Metadata = {
  title: HUB.title,
  description: HUB.description,
  alternates: { canonical: "/acquisition-tax/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", title: HUB.title, description: HUB.description, url: PAGE_URL },
};

export default function Page() {
  return (
    <TopicHub
      hub={HUB}
      navActive="realestate"
      quick={[
        { label: "취득세 계산기", href: HUB.calculator.route, note: "집값·주택 수·조정대상지역" },
        { label: "집 살 때 취득세 세율과 계산", href: HUB.guide.href, note: "처음이면 이 글부터" },
        { label: "재산세", href: "/property-tax/", note: "집을 가지고 있을 때" },
        { label: "양도세", href: "/transfer-tax/", note: "집을 팔 때" },
      ]}
      sources={[
        { name: "지방세법 §11 · §13의2 · §20", note: "부동산 취득 세율 · 주택 중과 · 60일 신고납부" },
        { name: "지방세특례제한법 §36의3 · §36의5", note: "생애최초 주택 구입 감면 · 출산 양육 주택 감면" },
        { name: "위택스 지방세 미리계산", note: `계산기 대조 · ${spec.lastVerified} 검증` },
        { name: "네이버 자동완성", note: "인기검색어 근거 · 2026-09-16 수집" },
      ]}
    />
  );
}
