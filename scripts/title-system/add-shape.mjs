/**
 * 편마다 쓸 시각 장치를 정한다.
 *
 * 지금까지는 25편이 거의 같은 조합(flow + table + tips)을 썼다.
 * 내용이 부르는 장치만 쓴다. 부르지 않으면 문단만으로 간다.
 *
 *   tree     예/아니오로 갈리는 자격 판단
 *   steps    순서가 있는 절차
 *   timeline 날짜가 박힌 일정
 *   table    구간·금액·비교
 *   flow     상황에 따라 길이 갈릴 때
 *   tips     따로 떼어 둘 주의사항이 실제로 있을 때만
 *
 * 실행: node scripts/title-system/add-shape.mjs
 */
import fs from 'node:fs';

const FILE = 'scripts/title-system/titles.unemployment-v2.json';
const d = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const SHAPE = {
  eligibility: ['tree'], '180days': ['table'], 'no-insurance': ['steps'], 'merge-periods': ['timeline'],
  'short-hours': ['tree'], elderly: ['tree'], student: ['tree'], 'special-worker': ['table'], artist: ['table'],

  voluntary: ['table'], layoff: ['flow'], 'contract-end': ['tree'], harassment: ['steps'],
  'unpaid-wage-quit': ['steps'], 'unfair-dismissal': ['timeline'], commute: ['table'], sickness: ['flow'],
  pregnancy: ['timeline'], 'exit-code': ['table'],

  amount: ['table'], 'by-salary': ['table'], 'average-wage': [], total: ['table'], tax: [],

  days: ['table'], waiting: ['timeline'], deadline: ['timeline'], extension: ['table'],

  apply: ['steps'], documents: ['table'], confirmation: ['flow'], center: [], education: ['table'],

  'job-search': ['table'], 'round-1': ['steps'], 'round-4': ['table'], interview: ['flow'],
  'other-activity': ['table'], 'change-date': ['steps'],

  'part-time-job': ['table'], 'daily-worker': ['table'], platform: ['flow'], freelance: ['flow'],
  startup: ['tree'], overseas: ['steps'], study: [],

  fraud: ['table'], 'fraud-report': ['steps'], repeat: ['table'], 'early-reemployment': ['tree'],
  'report-job': ['timeline'], 'give-up': ['flow'],

  payday: ['timeline'], 'last-round': ['timeline'],

  'health-insurance': ['table'], 'pension-credit': ['table'], severance: ['timeline'], eitc: ['table'],
  'job-support': ['table'], 'industrial-accident': ['flow'],

  employer: ['table'], 'changes-2026': ['table'],
};

const spokes = d.groups.flatMap((g) => g.spokes);
const missing = spokes.filter((s) => !(s.slug in SHAPE)).map((s) => s.slug);
if (missing.length) { console.error('FAIL: 시각 장치 미지정 — ' + missing.join(', ')); process.exit(1); }

for (const s of spokes) s.shape = SHAPE[s.slug];

d._구조규칙 = '시각 장치는 내용이 부를 때만 쓴다. 한 편에 하나면 충분하고, 없어도 된다. 모든 글에 같은 조합을 찍지 않는다';

const dist = {};
for (const s of spokes) { const k = s.shape.join('+') || '문단만'; dist[k] = (dist[k] ?? 0) + 1; }
const top = Math.max(...Object.values(dist));
console.log('시각 장치 분포:');
Object.entries(dist).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(2)}편  ${k}  (${Math.round(v / spokes.length * 100)}%)`));
if (top / spokes.length > 0.45) { console.error(`\nFAIL: 한 조합이 ${Math.round(top / spokes.length * 100)}% 다. 45% 를 넘기지 않는다`); process.exit(1); }

fs.writeFileSync(FILE, JSON.stringify(d, null, 2).replace(/\r\n/g, '\n') + '\n', 'utf8');
console.log(`\nPASS · 가장 많은 조합이 ${Math.round(top / spokes.length * 100)}%`);
