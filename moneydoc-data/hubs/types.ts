// 자동 생성: scripts/gen-hub-index.mjs — 직접 수정하지 말 것
export type HubQA = { q: string; a: string };
export type HubSpoke = { href: string; title: string; description: string; answers: HubQA[] };
export type HubGroup = { key: string; name: string; intro: string; spokes: HubSpoke[] };
export type HubPopular = { term: string; href: string };
export type HubData = {
  slug: string; route: string; keyword: string; title: string; h1: string; description: string;
  guide: HubSpoke; calculator: { route: string }; popular: HubPopular[]; groups: HubGroup[];
};
