#!/usr/bin/env node
// 검증된 titles.{slug}.json → 허브·스포크·계산기 라우트 + funnel 링크맵 산출.
// 페이지 생성(Article + page.tsx)의 입력이 된다.
// 사용: node scripts/title-system/build-architecture.mjs scripts/title-system/titles.unemployment.json

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];
if (!file) { console.error("usage: node build-architecture.mjs <titles.{slug}.json>"); process.exit(2); }

const d = JSON.parse(readFileSync(resolve(process.cwd(), file), "utf8"));
const cat = d.category, base = d.baseSlug;

const spokes = (d.spokes || []).map((s) => ({
  slug: s.slug,
  cluster: s.cluster,
  title: s.title,
  format: s.format,
  route: `/${cat}/${base}-${s.slug}/`,
  dataFile: `moneydoc-data/articles/${cat}/${base}-${s.slug}.ts`,
  pageFile: `app/${cat}/${base}-${s.slug}/page.tsx`,
  funnel: { hub: d.hub.route, calculator: d.calculator.route } // 나무위키식: 모든 스포크 → 허브+계산기
}));

const out = {
  keyword: d.keyword,
  hub: d.hub,
  calculator: d.calculator,
  spokeCount: spokes.length,
  spokes
};

const outDir = resolve(__dir, "out");
mkdirSync(outDir, { recursive: true });
const jsonPath = resolve(outDir, `${base}.architecture.json`);
writeFileSync(jsonPath, JSON.stringify(out, null, 2) + "\n", "utf8");

// 사람이 읽는 프리뷰
let md = `# ${d.keyword} 콘텐츠 아키텍처\n\n`;
md += `허브: ${d.hub.title} → ${d.hub.route}\n`;
md += `계산기: ${d.calculator.title} → ${d.calculator.route}\n\n`;
md += `스포크 ${spokes.length}개 (모두 허브+계산기로 funnel)\n\n`;
let cur = "";
for (const s of spokes) {
  if (s.cluster !== cur) { md += `\n## ${s.cluster}\n`; cur = s.cluster; }
  md += `- ${s.title}\n  - ${s.route}  [${s.format}]\n`;
}
const mdPath = resolve(outDir, `${base}.architecture.md`);
writeFileSync(mdPath, md, "utf8");

console.log(`아키텍처 산출 완료:`);
console.log(`  ${jsonPath}`);
console.log(`  ${mdPath}`);
console.log(`  허브 1 + 계산기 1 + 스포크 ${spokes.length} (각 스포크 → funnel: 허브, 계산기)`);
