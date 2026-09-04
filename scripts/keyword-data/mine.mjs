/**
 * 실업급여 질문·검색어에서 세부 주제를 캐낸다.
 *   묶기 전에 "무엇을 묻는가" 를 먼저 본다. 토큰 빈도 + 동시출현으로 후보를 뽑는다.
 * 실행: node scripts/keyword-data/mine.mjs [top]
 */
import fs from 'node:fs';

const { keywords, questions } = JSON.parse(fs.readFileSync('scripts/keyword-data/merged.json', 'utf8'));
const TOP = Number(process.argv[2] ?? 90);

const STOP = new Set([
  '실업급여', '실업', '급여', '질문', '문의', '관련', '드립니다', '합니다', '있나요', '되나요', '인가요', '가능', '여부',
  '어떻게', '얼마', '언제', '어디', '무엇', '그리고', '해서', '해도', '하면', '하나요', '입니다', '있을까요', '싶습니다',
  '경우', '때문', '대해', '대한', '관해', '이번', '지금', '오늘', '내일', '이런', '저런', '요청', '부탁', '답변', '알려',
  '궁금', '해요', '이거', '그거', '많이', '조금', '정도', '이나', '에서', '으로', '까지', '부터', '보다', '처럼',
]);

const tok = (s) =>
  s.replace(/[^가-힣0-9a-zA-Z ]/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/(은|는|이|가|을|를|의|에|도|만|과|와|로|랑|께|요)$/, ''))
    .filter((w) => w.length >= 2 && !STOP.has(w) && !/^\d+$/.test(w));

const count = new Map();
const bump = (w, n = 1) => count.set(w, (count.get(w) ?? 0) + n);

for (const q of questions) { for (const w of tok(q.title)) bump(w); for (const t of q.tags) for (const w of tok(t)) bump(w); }
for (const k of keywords) for (const w of tok(k.word)) bump(w, 3); // 검색어는 가중치

const rows = [...count].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]);
console.log(`후보 토큰 ${rows.length}개 (3회 이상)\n`);
for (let i = 0; i < Math.min(TOP, rows.length); i += 3) {
  console.log(rows.slice(i, i + 3).map(([w, n]) => `${(w + '              ').slice(0, 14)}${String(n).padStart(4)}`).join('   '));
}
fs.writeFileSync('scripts/keyword-data/tokens.json', JSON.stringify(rows, null, 1), 'utf8');
