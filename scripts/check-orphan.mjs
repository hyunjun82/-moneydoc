#!/usr/bin/env node
/**
 * 고아 문서 검사 — 사이트 안에서 아무도 링크하지 않는 페이지를 잡는다.
 *
 *   node scripts/check-orphan.mjs        out/ 을 훑는다 (next build 뒤에 돌린다)
 *
 * 왜. 2026-09-09 애드센스가 "가치가 별로 없는 콘텐츠" 로 거절했다. 글 63편을 써 놓고
 * 허브·카테고리 어디서도 링크하지 않아 사람도 크롤러도 찾을 수 없었다.
 * 사이트맵에만 있는 페이지는 "아무도 안 거는 페이지" 라 가치 없는 것으로 취급된다.
 * 페이지를 늘리는 스크립트를 만들 때 그 페이지로 가는 길을 같이 만들었는지 여기서 센다.
 *
 * 세는 법: 헤더·푸터를 뺀 본문 링크만 인바운드로 친다. 헤더·푸터는 모든 페이지에 똑같이
 * 들어가서 세면 전부 통과해 버린다. 정책 페이지(약관·개인정보 등)는 푸터에만 있는 게 정상이라 뺀다.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
if (!fs.existsSync(OUT)) { console.error('out/ 이 없다. next build 먼저.'); process.exit(1); }

// 푸터에만 있는 게 정상인 페이지
const FOOTER_ONLY = new Set(['/about/', '/privacy/', '/terms/', '/contact/', '/404/']);

const htmlOf = new Map();
(function walk(d, base = '') {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { walk(path.join(d, e.name), `${base}/${e.name}`); continue; }
    if (e.name === 'index.html') htmlOf.set(`${base}/` || '/', fs.readFileSync(path.join(d, e.name), 'utf8'));
  }
})(OUT);

// 사이트맵에 올린 페이지만 검사 대상 (리다이렉트 전용 페이지는 사이트맵에서 이미 빠진다)
const sm = fs.existsSync(path.join(OUT, 'sitemap.xml')) ? fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8') : '';
const inSitemap = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/https?:\/\/[^/]+/, '')));

const inbound = new Map([...htmlOf.keys()].map((u) => [u, 0]));
for (const [from, html] of htmlOf) {
  const body = html.replace(/<nav[\s\S]*?<\/nav>/g, ' ').replace(/<footer[\s\S]*?<\/footer>/g, ' ');
  for (const to of new Set([...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => (m[1].endsWith('/') ? m[1] : `${m[1]}/`)))) {
    if (inbound.has(to) && to !== from) inbound.set(to, inbound.get(to) + 1);
  }
}

const orphans = [...inbound]
  .filter(([u, n]) => n === 0 && u !== '/' && inSitemap.has(u) && !FOOTER_ONLY.has(u))
  .map(([u]) => u);

console.log(`사이트맵 ${inSitemap.size}개 · 실제 페이지 ${htmlOf.size}개`);
if (!orphans.length) { console.log('고아 문서 0건 — 모든 페이지가 본문 링크로 닿는다'); process.exit(0); }
console.log(`\n**고아 문서 ${orphans.length}건** (사이트맵에는 있는데 본문에서 아무도 링크하지 않는다)`);
for (const u of orphans) console.log(`  ${u}`);
console.log('\n허브·카테고리 목록에 넣어라. 목록은 moneydoc-data/articles/index.ts (prebuild 가 만든다).');
process.exit(1);
