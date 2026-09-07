#!/usr/bin/env node
/**
 * 세부 키워드 뽑기 — 제목과 소제목의 재료를 실측 데이터에서만 고른다.
 *
 *   node scripts/title-system/subkeywords.mjs <메인키워드> [--top=12]
 *
 * 규칙 (2026-09-04, 사용자 지시)
 *   제목에 세부 키워드가 4개 들어가고, 그 4개가 그대로 소제목 4개가 된다.
 *   그래서 세부 키워드가 4개 안 나오는 주제는 글 한 편으로 세우지 않는다.
 *   4개가 안 나오면 다른 글에 섹션으로 붙이거나, 상위 키워드로 주제를 넓힌다.
 *
 * 무엇을 세나
 *   연관검색어 139개와 지식iN 702건에서, 메인키워드와 같이 나오는 낱말을 센다.
 *   "실업급여" 같은 메인키워드 자체와 조사·흔한 말은 뺀다.
 */
import fs from 'node:fs';

const main = process.argv[2];
const top = Number((process.argv.find((x) => x.startsWith('--top=')) ?? '').slice(6)) || 15;
if (!main) { console.error('usage: subkeywords.mjs <메인키워드> [--top=12]'); process.exit(1); }

const m = JSON.parse(fs.readFileSync('scripts/keyword-data/merged.json', 'utf8'));
const kw = m.keywords.map((k) => k.word);
const qs = m.questions.map((q) => `${q.title} ${(q.tags ?? []).join(' ')}`);
const lines = kw.concat(qs);

const STOP = new Set(['실업급여', '고용보험', '있나요', '되나요', '하나요', '인가요', '받나요', '어떻게', '무엇',
  '언제', '어디', '얼마', '질문', '궁금', '문의', '경우', '가능', '관련', '대한', '있는', '해야', '알려',
  '주세요', '드립니다', '합니다', '입니다', '이거', '저는', '제가', '지금', '이번', '해서', '하고', '하는']);
const norm = (w) => w.replace(/(은|는|이|가|을|를|의|에|도|만|과|와|로|랑|요|죠|나요)$/, '');

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

const rank = [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, top);
console.log(`메인키워드 "${main}" 가 들어간 실측 문장 ${hit.length}건`);
if (hit.length < 5) console.log('  ⚠ 5건 미만이다. 글 한 편으로 세우기엔 수요가 얇다.');
console.log(`\n세부 키워드 후보 (같이 나온 횟수)`);
for (const [w, c] of rank) console.log(`  ${String(c).padStart(3)}회  ${w}`);

const usable = rank.filter(([, c]) => c >= 2);
console.log(`\n2회 이상 나온 세부 키워드 ${usable.length}개`);
if (usable.length < 4) console.log('  ⚠ 4개가 안 된다. 소제목 4개를 실측으로 채울 수 없다.');
else console.log('  → 이 중 4개를 골라 제목에 넣고, 그 4개를 소제목으로 만든다.');
