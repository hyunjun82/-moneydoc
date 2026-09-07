#!/usr/bin/env node
/**
 * 바깥 링크 죽음 검사기 — 정부 사이트는 말없이 개편한다.
 *
 *   왜 만들었나. 건강보험료 글에 넣은 공단 링크 두 개가 둘 다 404 였다.
 *   공단이 홈페이지를 개편하면서 옛 주소를 "메뉴구조 개편안내" 페이지로 바꿔 놓았다.
 *   HTTP 상태는 200 이라 상태 코드만 보면 살아 있는 것처럼 보인다. 제목까지 봐야 죽은 걸 안다.
 *   게이트는 안쪽 링크만 봤다. 그래서 독자만 헛걸음했다.
 *
 *   무엇을 죽었다고 보나
 *     · 4xx / 5xx
 *     · 200 인데 제목이 개편·이전·오류 안내인 것 (소프트 404)
 *     · 연결 자체가 안 되는 것
 *
 *   node scripts/link-check.mjs [--hub=unemployment] [--slug=...] [--json]
 *   결과는 scripts/link-check.state.json 에 남는다 (하루 안에 확인한 주소는 다시 안 두드린다).
 */
import fs from 'node:fs';
import path from 'node:path';

const flags = process.argv.slice(2);
const val = (k) => (flags.find((f) => f.startsWith(`--${k}=`)) ?? '').slice(k.length + 3);
const hub = val('hub');
const slug = val('slug');
const asJson = flags.includes('--json');

const PREVIEW = 'public/_preview';
const STATE = 'scripts/link-check.state.json';
const today = new Date().toISOString().slice(0, 10);

/** 200 을 주면서 실제로는 죽은 페이지 (소프트 404) */
const SOFT_404 = /메뉴\s*구조\s*개편|페이지를 찾을 수 없|요청하신 페이지|잘못된 (접근|경로)|Not Found|error\s*page|서비스가 종료/i;

const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};

let files = fs.readdirSync(PREVIEW).filter((f) => /^article-v2-.*\.html$/.test(f));
if (hub) files = files.filter((f) => f.startsWith(`article-v2-${hub}-`));
if (slug) files = files.filter((f) => f.includes(slug));

/** 파일별로 바깥 링크를 모은다 */
const byUrl = new Map();
for (const f of files) {
  const h = fs.readFileSync(path.join(PREVIEW, f), 'utf8');
  for (const m of h.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const u = m[1].replace(/&amp;/g, '&');
    if (!byUrl.has(u)) byUrl.set(u, new Set());
    byUrl.get(u).add(f.replace('article-v2-', '').replace('.html', ''));
  }
}

const results = [];
let checked = 0, skipped = 0;

for (const [url, where] of byUrl) {
  const cached = state[url];
  if (cached && cached.date === today) { skipped++; if (!cached.ok) results.push({ url, where: [...where], ...cached }); continue; }
  let rec;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, redirect: 'follow' });
    const body = await r.text();
    const title = (body.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1]?.replace(/\s+/g, ' ').trim().slice(0, 70) ?? '';
    const soft = SOFT_404.test(title);
    rec = { date: today, status: r.status, title, ok: r.ok && !soft, why: !r.ok ? `HTTP ${r.status}` : soft ? `소프트 404: "${title}"` : '' };
  } catch (e) {
    rec = { date: today, status: 0, title: '', ok: false, why: `연결 실패: ${e.message}` };
  }
  state[url] = rec;
  checked++;
  if (!rec.ok) results.push({ url, where: [...where], ...rec });
  await new Promise((r) => setTimeout(r, 250));
}

fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n', 'utf8');

if (asJson) { console.log(JSON.stringify(results, null, 2)); process.exit(results.length ? 1 : 0); }

console.log(`바깥 링크 ${byUrl.size}개 (새로 확인 ${checked} · 오늘 확인함 ${skipped})`);
if (!results.length) { console.log('죽은 링크 없음'); process.exit(0); }
console.log(`\n죽은 링크 ${results.length}건`);
for (const r of results) console.log(`  [${r.where.join(' ')}] ${r.why}\n    ${r.url}`);
process.exit(1);
