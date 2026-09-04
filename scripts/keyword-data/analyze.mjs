/**
 * 실측 검색어(연관검색어 xlsx + 지식iN csv)를 합쳐 중복 없이 스포크 후보를 뽑는다.
 *   - 연관검색어: 이미 검색의도·스포크로 분류돼 있다
 *   - 지식iN: 실제 질문 제목. 태그와 분류로 같은 축에 맞춘다
 * 실행: node scripts/keyword-data/analyze.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'scripts/keyword-data';
const related = JSON.parse(fs.readFileSync(path.join(DIR, 'related.json'), 'utf8'));

// ── 1) 연관검색어 ─────────────────────────────────────────────────────────
const rows = related['xl/worksheets/sheet1.xml'] ?? [];
const head = rows[0] ?? [];
const idx = (name) => head.indexOf(name);
const kw = [];
for (const r of rows.slice(1)) {
  const word = (r[idx('키워드')] ?? '').trim();
  if (!word) continue;
  kw.push({
    word,
    intent: r[idx('검색의도')] ?? '',
    code: r[idx('스포크코드')] ?? '',
    spoke: r[idx('스포크')] ?? '',
  });
}

// ── 2) 지식iN ────────────────────────────────────────────────────────────
const csv = fs.readFileSync(path.join(DIR, '실업급여_지식인.csv'), 'utf8').replace(/^﻿/, '');
/** 따옴표를 지키는 최소 CSV 파서 */
function parseCsv(text) {
  const out = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); out.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); out.push(row); }
  return out;
}
const kin = parseCsv(csv);
const kh = kin[0];
const qTitle = kh.indexOf('질문제목'), qCat = kh.indexOf('분류'), qTag = kh.indexOf('태그'), qAns = kh.indexOf('답변수');
const questions = kin.slice(1).filter((r) => r[qTitle]).map((r) => ({
  title: r[qTitle].trim(),
  cat: (r[qCat] ?? '').trim(),
  tags: (r[qTag] ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  answers: Number(r[qAns] ?? 0) || 0,
}));

// ── 3) 축(스포크)별로 모으기 ─────────────────────────────────────────────
const byCode = new Map();
for (const k of kw) {
  const key = `${k.code} ${k.spoke}`;
  if (!byCode.has(key)) byCode.set(key, { code: k.code, spoke: k.spoke, words: [], intents: new Set() });
  byCode.get(key).words.push(k.word);
  byCode.get(key).intents.add(k.intent);
}

// 지식iN 태그 빈도
const tagCount = new Map();
for (const q of questions) for (const t of q.tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
const catCount = new Map();
for (const q of questions) catCount.set(q.cat, (catCount.get(q.cat) ?? 0) + 1);

console.log(`연관검색어 ${kw.length}개 · 지식iN 질문 ${questions.length}개\n`);

console.log('── 검색의도 분포 ──');
const intentCount = new Map();
for (const k of kw) intentCount.set(k.intent, (intentCount.get(k.intent) ?? 0) + 1);
[...intentCount].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}  ${v}개`));

console.log('\n── 스포크 축 (연관검색어 기준) ──');
[...byCode.values()].sort((a, b) => b.words.length - a.words.length).forEach((s) => {
  console.log(`\n[${s.code}] ${s.spoke}  ${s.words.length}개  (${[...s.intents].join('/')})`);
  console.log('   ' + s.words.join(' · '));
});

console.log('\n── 지식iN 분류 상위 ──');
[...catCount].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, v]) => console.log(`  ${k}  ${v}건`));

console.log('\n── 지식iN 태그 상위 30 ──');
[...tagCount].sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => console.log(`  ${k}  ${v}건`));

fs.writeFileSync(path.join(DIR, 'merged.json'), JSON.stringify({ keywords: kw, questions, tagCount: [...tagCount], catCount: [...catCount] }, null, 1), 'utf8');
