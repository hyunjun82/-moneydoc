#!/usr/bin/env node
/**
 * 검색어 실측 수집기 — 글을 쓰기 **전에** 제목 재료를 확보한다.
 *
 *   왜 만들었나. 건강보험료 글에서 제목을 지어냈고, 게이트가 그걸 잡은 건 글을 다 쓴 뒤였다.
 *   원인은 검사기가 아니라 재료였다. keyword-data 에 그 주제 검색어가 한 건도 없었다.
 *   재료가 없으면 사람은 지어낸다. 그래서 재료를 먼저 채운다.
 *
 *   계획서의 각 스포크 mustCover 로 씨앗 질의를 만들고 네이버 자동완성을 그대로 받아 적는다.
 *   결과는 두 군데로 간다.
 *     scripts/keyword-data/merged.json          게이트가 제목을 대조하는 코퍼스
 *     scripts/keyword-data/terms.<주제>.json    슬러그별 원본 (제목 지을 때 여기서 고른다)
 *
 *   node scripts/title-system/collect-terms.mjs <주제> [--only=slug1,slug2] [--todo]
 *     --todo   아직 글이 없는 스포크만 (기본은 전부)
 */
import fs from 'node:fs';

const [hub, ...flags] = process.argv.slice(2);
if (!hub) { console.error('usage: collect-terms.mjs <주제> [--only=a,b] [--todo]'); process.exit(1); }
const only = (flags.find((f) => f.startsWith('--only=')) ?? '').slice(7).split(',').filter(Boolean);
const todoOnly = flags.includes('--todo');

const PLAN = `scripts/title-system/titles.${hub}-v2.json`;
const MERGED = 'scripts/keyword-data/merged.json';
const OUT = `scripts/keyword-data/terms.${hub}.json`;
const today = new Date().toISOString().slice(0, 10);

const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const spokes = plan.groups.flatMap((g) => g.spokes);
const written = (s) => fs.existsSync(`scripts/article-template/articles/${hub}-${s}-guide.mjs`);

let targets = spokes;
if (only.length) targets = targets.filter((s) => only.includes(s.slug));
else if (todoOnly) targets = targets.filter((s) => !written(s.slug));

/** 네이버 자동완성. 사람이 실제로 치는 말만 돌아온다 */
async function suggest(q) {
  const u = 'https://ac.search.naver.com/nx/ac?q=' + encodeURIComponent(q) +
    '&con=0&frm=nv&ans=2&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&run=2&rev=4&q_enc=UTF-8&st=100';
  const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://search.naver.com/' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return (j.items?.[0] ?? []).map((x) => x[0]).filter(Boolean);
}

const main = plan.keyword ?? hub;
const seedsOf = (s) => {
  const seeds = new Set([`${main} ${s.slug}`.replace(/-/g, ' ')]);
  for (const w of s.mustCover ?? []) { seeds.add(`${main} ${w}`); seeds.add(w); }
  return [...seeds].filter((x) => x.length <= 30);
};

const store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { hub, collected: {}, source: '네이버 자동완성' };
let total = 0, failed = 0;

for (const s of targets) {
  const got = new Set();
  for (const seed of seedsOf(s)) {
    try { (await suggest(seed)).forEach((t) => got.add(t)); }
    catch (e) { failed++; console.error(`  ! ${seed}: ${e.message}`); }
    await new Promise((r) => setTimeout(r, 350));
  }
  store.collected[s.slug] = { date: today, terms: [...got].sort() };
  total += got.size;
  console.log(`${got.size.toString().padStart(3)}건  ${s.slug}`);
}

fs.writeFileSync(OUT, JSON.stringify(store, null, 2) + '\n', 'utf8');

// 코퍼스에 합친다 (게이트가 제목을 여기에 대조한다)
const merged = JSON.parse(fs.readFileSync(MERGED, 'utf8'));
const have = new Set(merged.keywords.map((k) => k.word));
let added = 0;
for (const [slug, rec] of Object.entries(store.collected)) {
  for (const w of rec.terms) {
    if (have.has(w)) continue;
    merged.keywords.push({ word: w, intent: '정보형', code: 'AC', spoke: slug, src: '네이버 자동완성 실측', collected: rec.date });
    have.add(w); added++;
  }
}
fs.writeFileSync(MERGED, JSON.stringify(merged, null, 2) + '\n', 'utf8');

console.log(`\n${targets.length}개 슬러그 · 검색어 ${total}건 수집 · 코퍼스에 ${added}건 추가 (총 ${merged.keywords.length}건)`);
if (failed) console.log(`실패한 질의 ${failed}건 — 다시 돌리면 이어서 채운다`);
console.log(`원본: ${OUT}`);
