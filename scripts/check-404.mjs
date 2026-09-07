#!/usr/bin/env node
/**
 * 죽은 주소(404) 전수 검사. 옛 커밋의 라우트가 지금도 살아 있거나 301 로 넘어가는지 본다.
 *
 *   node scripts/check-404.mjs [기준커밋]      기본값: origin/main
 *
 * 왜. 2026-09-07 에 같은 글이 두 주소에 있어 4개를 지웠는데, 그 옛 주소에 넘김이 없었다.
 * 게다가 스포크 48편 중 43편이 넘김 없이 방치돼 있었다. 사람이 기억으로 막을 일이 아니다.
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const OLD = process.argv[2] ?? 'origin/main';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

// 옛 커밋의 app/**/page.tsx → 라우트
const oldRoutes = git('ls-tree', '-r', '--name-only', OLD)
  .split('\n').filter((f) => /^app\/.+\/page\.tsx$/.test(f))
  .map((f) => `/${f.replace(/^app\//, '').replace(/\/page\.tsx$/, '')}/`)
  .filter((r) => !r.includes('[')); // 동적 라우트 제외

// 지금 out/ 에 실제로 나간 것
const outDirs = new Set();
(function walk(d, base = '') {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory()) { if (e.name === 'index.html' && base) outDirs.add(`${base}/`); continue; }
    walk(`${d}/${e.name}`, `${base}/${e.name}`);
  }
})('out');

// _redirects 규칙
const rules = fs.readFileSync('public/_redirects', 'utf8').split('\n')
  .map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  .map((l) => { const [from, to] = l.split(/\s+/); return { from, to }; });
const covered = (r) => rules.find((x) => x.from === r || (x.from.endsWith('*') && r.startsWith(x.from.slice(0, -1))));

const dead = [];
for (const r of oldRoutes) {
  if (outDirs.has(r)) continue;
  const rule = covered(r);
  if (!rule) { dead.push({ r, why: '넘김 규칙 없음' }); continue; }
  // 넘어간 곳이 실제로 있는지
  const target = rule.to.replace(':splat', r.slice(rule.from.length - 1));
  if (!outDirs.has(target) && target !== '/') dead.push({ r, why: `넘김은 있는데 도착지 ${target} 가 없음` });
}

console.log(`옛 라우트 ${oldRoutes.length}개 · 지금 나간 페이지 ${outDirs.size}개`);
if (!dead.length) { console.log('\n죽은 주소 0건 — 전부 살아 있거나 301 로 넘어간다'); process.exit(0); }
console.log(`\n**죽는 주소 ${dead.length}건**`);
for (const d of dead) console.log(`  ${d.r}  ← ${d.why}`);
process.exit(1);
