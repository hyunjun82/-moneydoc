// 주제 허브 원페이지(/{주제}/)에 실을 묶음·글 목록을 계획서에서 만든다.
// 실행: node scripts/gen-hub-index.mjs   (prebuild 에 들어 있다)
//
// 왜. 허브는 그 주제의 모든 글이 들어가는 메인 원페이지다. 목록을 손으로 쓰면
// 글을 추가할 때 허브가 낡는다(2026-09-09 고아 63편). 계획서 groups 를 그대로 읽고
// 제목·설명은 글 파일의 meta 에서 뽑아 글과 허브가 어긋나지 않게 한다.
//
// 허브 데이터 파일 모양 (titles.{주제}-v2.json 또는 hub.{주제}.json)
//   keyword · hub.route · hub.landing{title,h1,description,guideRoute,guideFile?,popular[]} · calculator.route
//   groups[{ group:"A 이름", hubIntro, spokes[{ slug, file?, route? }] }]
//   file 기본값 {주제}-{slug}-guide · route 기본값 /{주제}/{slug}/ · guideFile 기본값 {주제}-benefit-guide
//   popular[{ term, slug }] 는 그 스포크로, [{ term, href }] 는 사이트 안 아무 페이지로 건다
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HUBS = [
  { topic: 'unemployment', cat: 'government', plan: 'titles.unemployment-v2.json' },
  { topic: 'severance', cat: 'law', plan: 'hub.severance.json' },
  { topic: 'transfer-tax', cat: 'realestate', plan: 'hub.transfer-tax.json' },
  { topic: 'basic-pension', cat: 'government', plan: 'hub.basic-pension.json' },
];

const metaOf = (cat, file) => {
  const src = fs.readFileSync(path.join(ROOT, 'moneydoc-data/articles', cat, `${file}.ts`), 'utf8');
  const pick = (k) => {
    const m = new RegExp(`${k}: "((?:[^"\\\\]|\\\\.)*)"`).exec(src);
    if (!m) throw new Error(`${file}: meta.${k} 추출 실패`);
    return JSON.parse(`"${m[1]}"`);
  };
  return { title: pick('title'), description: pick('description') };
};
// 링크가 실제 페이지인지. 없는 주소를 허브에 걸면 죽은 링크가 된다
const pageExists = (href) => fs.existsSync(path.join(ROOT, 'app', ...href.split('/').filter(Boolean), 'page.tsx'));

const OUT_DIR = path.join(ROOT, 'moneydoc-data/hubs');
fs.mkdirSync(OUT_DIR, { recursive: true });

fs.writeFileSync(path.join(OUT_DIR, 'types.ts'), `// 자동 생성: scripts/gen-hub-index.mjs — 직접 수정하지 말 것
export type HubSpoke = { href: string; title: string; description: string };
export type HubGroup = { key: string; name: string; intro: string; spokes: HubSpoke[] };
export type HubPopular = { term: string; href: string };
export type HubData = {
  slug: string; route: string; keyword: string; title: string; h1: string; description: string;
  guide: HubSpoke; calculator: { route: string }; popular: HubPopular[]; groups: HubGroup[];
};
`, 'utf8');

for (const h of HUBS) {
  const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/title-system', h.plan), 'utf8'));
  const landing = plan.hub.landing;
  if (!landing) throw new Error(`${h.plan}: hub.landing 이 없다`);
  const dead = [];
  const check = (href, what) => { if (!pageExists(href)) dead.push(`${what} → ${href}`); return href; };

  const routeOf = new Map();
  const groups = plan.groups.map((g) => {
    const [key, ...rest] = g.group.split(' ');
    if (!g.hubIntro) throw new Error(`${h.plan}: ${g.group} hubIntro 가 없다`);
    return {
      key,
      name: rest.join(' '),
      intro: g.hubIntro,
      spokes: g.spokes.map((s) => {
        const href = check(s.route ?? `/${h.topic}/${s.slug}/`, `스포크 ${s.slug}`);
        routeOf.set(s.slug, href);
        return { href, ...metaOf(h.cat, s.file ?? `${h.topic}-${s.slug}-guide`) };
      }),
    };
  });
  const popular = (landing.popular ?? []).map((p) => {
    const href = p.slug ? routeOf.get(p.slug) : p.href;
    if (!href) throw new Error(`${h.plan}: 인기검색어 '${p.term}' 의 slug '${p.slug}' 가 groups 에 없다`);
    return { term: p.term, href: check(href, `인기검색어 ${p.term}`) };
  });
  const hub = {
    slug: h.topic,
    route: plan.hub.route,
    keyword: plan.keyword,
    title: landing.title,
    h1: landing.h1,
    description: landing.description,
    guide: { href: check(landing.guideRoute, '총정리 글'), ...metaOf(h.cat, landing.guideFile ?? `${h.topic}-benefit-guide`) },
    calculator: { route: check(plan.calculator.route, '계산기') },
    popular,
    groups,
  };
  if (dead.length) throw new Error(`${h.plan}: 페이지가 없는 링크\n  ${dead.join('\n  ')}`);

  const n = groups.reduce((a, g) => a + g.spokes.length, 0);
  fs.writeFileSync(path.join(OUT_DIR, `${h.topic}.ts`), `// 자동 생성: scripts/gen-hub-index.mjs — 직접 수정하지 말 것 (원본 scripts/title-system/${h.plan})
import type { HubData } from "./types";

export const HUB: HubData = ${JSON.stringify(hub, null, 2)};
`, 'utf8');
  console.log(`moneydoc-data/hubs/${h.topic}.ts 생성 — 묶음 ${groups.length} · 글 ${n}편 · 인기검색어 ${popular.length}`);
}
