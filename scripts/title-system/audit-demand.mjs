#!/usr/bin/env node
/**
 * 수요 실측 — 계획서의 글마다 "세부 키워드가 4개 나오는가" 를 센다.
 *
 *   node scripts/title-system/audit-demand.mjs <허브>
 *
 * 규칙 (2026-09-04, 사용자 지시)
 *   제목에 세부 키워드 4개가 자연스럽게 들어가고, 그 4개가 그대로 소제목 4개가 된다.
 *   세부 키워드가 4개 안 나오는 주제는 글 한 편으로 세우지 않는다. 다른 글에 섹션으로 붙인다.
 *
 * 지금까지는 "제목 앞부분이 실측 검색어에 있느냐" 만 봤다. 있기만 하면 1건이어도 통과했다.
 * 그래서 수요가 2건뿐인 주제로 글을 세우는 일이 생겼다(merge-periods). 이 도구가 그걸 막는다.
 */
import fs from 'node:fs';

const hub = process.argv[2] ?? 'unemployment';
const m = JSON.parse(fs.readFileSync('scripts/keyword-data/merged.json', 'utf8'));
const kw = m.keywords.map((k) => k.word);
const qs = m.questions.map((q) => `${q.title} ${(q.tags ?? []).join(' ')}`);
const lines = kw.concat(qs);

const STOP = new Set(['실업급여', '고용보험', '있나요', '되나요', '하나요', '인가요', '받나요', '어떻게', '무엇',
  '언제', '어디', '얼마', '질문', '궁금', '문의', '경우', '가능', '관련', '대한', '있는', '해야', '알려',
  '주세요', '드립니다', '합니다', '입니다', '지금', '이번', '해서', '하고', '하는', '그리고', '어느']);
const norm = (w) => w.replace(/(은|는|이|가|을|를|의|에|도|만|과|와|로|랑|요|죠|나요)$/, '');

/** 메인키워드 하나의 수요와 세부 키워드를 센다 */
function demand(main) {
  const hit = lines.filter((l) => l.includes(main));
  const count = new Map();
  for (const l of hit) {
    const seen = new Set();
    for (const raw of l.replace(/[^가-힣0-9a-zA-Z ]/g, ' ').split(/\s+/)) {
      const w = norm(raw);
      if (w.length < 2 || STOP.has(w) || main.includes(w)) continue;
      if (seen.has(w)) continue;
      seen.add(w);
      count.set(w, (count.get(w) ?? 0) + 1);
    }
  }
  const sub = [...count.entries()].filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]);
  return { hits: hit.length, sub };
}

/** 계획서 글의 메인키워드는 review.titleKeyword 또는 제목 앞부분에서 뽑는다 */
const plan = JSON.parse(fs.readFileSync(`scripts/title-system/titles.${hub}-v2.json`, 'utf8'));
const spokes = [];
(function walk(o) {
  if (Array.isArray(o)) o.forEach(walk);
  else if (o && typeof o === 'object') { if (o.slug && o.title) spokes.push(o); Object.values(o).forEach(walk); }
})(plan);

const rows = spokes.map((s) => {
  const head = (s.review?.titleKeyword ?? s.title.split(',')[0])
    .replace(/실업급여|고용보험/g, '').replace(/\s+/g, ' ').trim();
  const key = head || s.title.split(',')[0];
  const d = demand(key);
  return { slug: s.slug, tier: s.tier, key, ...d, written: !!s.review };
});
rows.sort((a, b) => b.hits - a.hits);

const bar = (n) => '█'.repeat(Math.min(30, Math.round(n / 2)));
console.log(`수요 실측 · ${rows.length}편 · 자료 ${lines.length}건 (연관검색어 ${kw.length} + 지식iN ${qs.length})\n`);
console.log('쓴글 등급 슬러그              메인말        문장  세부키워드');
for (const r of rows) {
  const flag = r.sub.length >= 4 ? '  ' : r.sub.length >= 2 ? '△ ' : '✗ ';
  console.log(`${r.written ? '✔' : ' '} ${flag}${String(r.tier).padEnd(2)} ${r.slug.padEnd(20)} ${r.key.padEnd(12)} ${String(r.hits).padStart(3)}  ${r.sub.length}개 ${bar(r.hits)}`);
}
const ok = rows.filter((r) => r.sub.length >= 4).length;
const thin = rows.filter((r) => r.sub.length < 2);
console.log(`\n세부 키워드 4개 이상: ${ok}편 / ${rows.length}편`);
console.log(`세부 키워드 2개 미만(글로 세우기 어려움): ${thin.length}편`);
console.log(`  그중 이미 쓴 글: ${thin.filter((r) => r.written).length}편 — ${thin.filter((r) => r.written).map((r) => r.slug).join(' ')}`);
