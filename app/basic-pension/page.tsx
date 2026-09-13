import type { Metadata } from "next";
import { TopicHub } from "@/components/TopicHub";
import { HUB } from "@/data/hubs/basic-pension";
import spec from "@/data/calculators/government/basic-pension.json";

// 기초연금 허브 원페이지. 총정리 글은 /basic-pension/guide/, 계산기는 /basic-pension/calculator/ 에 있다.
const PAGE_URL = "https://moneydoc.kr/basic-pension/";

export const metadata: Metadata = {
  title: HUB.title,
  description: HUB.description,
  alternates: { canonical: "/basic-pension/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", title: HUB.title, description: HUB.description, url: PAGE_URL },
};

export default function Page() {
  return (
    <TopicHub
      hub={HUB}
      navActive="gov"
      quick={[
        { label: "기초연금 계산기", href: HUB.calculator.route, note: "가구 유형·소득인정액" },
        { label: "2026년 기초연금 수급 조건과 금액", href: HUB.guide.href, note: "처음이면 이 글부터" },
        { label: "국민연금 예상 수령액 계산기", href: "/national-pension/", note: "감액 기준과 비교" },
        { label: "기초생활수급 조건", href: "/basic-livelihood/", note: "소득인정액으로 보는 다른 제도" },
      ]}
      sources={[
        { name: "기초연금법 제3조·제5조·제6조·제8조", note: "수급자격 · 기초연금액 · 국민연금 감액 · 부부감액" },
        { name: "기초연금법 시행령 제10조·제11조", note: "150~200% 구간 산정 · 소득역전 감액" },
        { name: "보건복지부 고시", note: `선정기준액·기준연금액 · ${spec.lastVerified} 검증` },
        { name: "네이버 자동완성", note: "인기검색어 근거 · 2026-09-13 수집" },
      ]}
    />
  );
}
