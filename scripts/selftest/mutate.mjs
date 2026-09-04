#!/usr/bin/env node
/**
 * 돌연변이 시험 — 검사기를 공격한다.
 *
 *   node scripts/selftest/mutate.mjs [--only=번호]
 *
 * 왜 하나. 구멍을 이론으로 하나씩 찾아 규칙을 덧붙이면 끝이 없다. 그래서 반대로 한다.
 * 실제로 나올 법한 결함 20종을 글에 심고, 파이프라인이 **몇 종을 잡는지** 숫자로 잰다.
 * 빠져나간 종류가 곧 진짜 구멍이다. 검사기를 고치면 이 시험부터 다시 돌린다.
 *
 * 규칙: 각 돌연변이는 반드시 원상복구된다(finally). 끝나고 git status 가 깨끗해야 한다.
 */
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const A = 'scripts/article-template/articles';
const PLAN = 'scripts/title-system/titles.unemployment-v2.json';
const only = Number((process.argv.find((x) => x.startsWith('--only=')) ?? '').slice(7)) || 0;

const run = (args, ms = 300000) => {
  const r = spawnSync(process.execPath, args, { encoding: 'utf8', timeout: ms });
  return { out: (r.stdout ?? '') + (r.stderr ?? ''), code: r.status };
};
const build = (slug) => run(['scripts/article-template/build.mjs', slug]);
const gate = () => run(['scripts/gate.mjs', 'unemployment', '--quick']);

/** 파일 한 곳을 바꿔 치고, 빌드/게이트가 막는지 본다 */
function mutateFile({ file, from, to, slug, useGate, all }) {
  const orig = fs.readFileSync(file, 'utf8');
  if (!orig.includes(from)) return { skip: `기준 문장 없음: ${from.slice(0, 40)}` };
  try {
    fs.writeFileSync(file, all ? orig.split(from).join(to) : orig.replace(from, to));
    const b = build(slug);
    let caught = b.code !== 0;
    let where = caught ? '빌드' : '';
    let out = b.out;
    if (!caught && useGate) { const g = gate(); caught = g.code !== 0; where = caught ? '게이트' : ''; out = g.out; }
    return { caught, where, out };
  } finally {
    fs.writeFileSync(file, orig);
    build(slug);
  }
}

const S = (n) => `${A}/unemployment-${n}-guide.mjs`;

const CASES = [
  { n: 1, name: '엔진에 없는 숫자를 본문에 씀',
    file: S('amount'), slug: 'unemployment-amount-guide',
    from: '하루 얼마까지 받나요', to: '하루 89,400원까지 받나요' },

  { n: 2, name: '일수와 총액이 안 맞음',
    file: S('total'), slug: 'unemployment-total-guide',
    from: 'won(ub(3e6, 0.5).totalBenefit)', to: 'won(ub(3e6, 1).totalBenefit)' },

  { n: 3, name: '소제목 답을 회피로 바꿈',
    file: S('payday'), slug: 'unemployment-payday-guide',
    from: "ans: '통상 실업인정을 받은 다음 날에 본인이 지정한 계좌로 들어와요.'",
    to: "ans: '인정일이 사람마다 달라서 입금일도 사람마다 달라요.'" },

  { n: 4, name: '소제목의 답 문장(ans)을 지움',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "ans: '실업 신고일부터 7일간은 대기기간으로 보아 구직급여를 지급하지 않아요.', ",
    to: '' },

  { n: 5, name: '단위가 겹쳐 붙음 (만만원)',
    file: S('by-salary'), slug: 'unemployment-by-salary-guide',
    from: '${man(2e6)}원', to: '${man(2e6)}만원', useGate: true },

  { n: 6, name: '인용문을 한 군데 고침 (근거에 없는 문장이 됨)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '7일간은 대기기간으로 보아 구직급여를 지급하지 아니한다',
    to: '10일간은 대기기간으로 보아 구직급여를 지급하지 아니한다' },

  { n: 7, name: '조문 번호를 없는 것으로 바꿈',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '고용보험법 제49조제1항', to: '고용보험법 제491조제1항' },

  { n: 8, name: '해요체를 합니다체로',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '나오지 않아요. 뒤로 밀리는 것도 아니라 그냥 없는 날이 돼요.',
    to: '나오지 않습니다. 뒤로 밀리는 것도 아니라 그냥 없는 날이 됩니다.' },

  { n: 9, name: '대시를 넣음',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '실업 신고일부터 7일간은 대기기간으로', to: '실업 신고일부터 7일간은 — 대기기간으로' },

  { n: 10, name: '표 캡션을 지움',
    file: S('days'), slug: 'unemployment-days-guide',
    from: "caption: '나이와 가입기간별 실업급여 소정급여일수'", to: "caption: ''" },

  { n: 11, name: '소제목을 질문형이 아닌 것으로',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "h2: '실업급여 대기기간 7일은 무엇인가요'", to: "h2: '실업급여 대기기간 7일 정리'" },

  { n: 12, name: '계획에 없는 형제 글로 내부링크 (난발)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "link: { href: '/unemployment/payday/'", to: "link: { href: '/unemployment/fraud/'", useGate: true },

  { n: 13, name: '죽은 내부링크',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "link: { href: '/unemployment/payday/'", to: "link: { href: '/unemployment/nope-없는글/'", useGate: true },

  { n: 14, name: '형제 글 문장을 그대로 베낌',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '나오지 않아요. 뒤로 밀리는 것도 아니라 그냥 없는 날이 돼요.',
    to: '취업한 날은 실업으로 인정되지 않아 그 날치가 빠지고, 나머지 날은 그대로 나와요.', useGate: true },

  { n: 15, name: '렌더 사고 (undefined 노출)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "sub: '이 기간은 급여가 나오지 않아요'", to: "sub: `${globalThis.__none?.x}이 기간은 급여가 나오지 않아요`" },

  { n: 16, name: '번역투 (~을 통해)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '1차 실업인정일에 인정을 받은 뒤에', to: '1차 실업인정일을 통하여 인정을 받은 뒤에' },

  { n: 17, name: '필수 키워드를 소제목·FAQ 에서 뺌',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '대기기간', to: '기다리는 기간', all: true },

  { n: 18, name: '100자 넘는 문장',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '나오지 않아요. 뒤로 밀리는 것도 아니라 그냥 없는 날이 돼요.',
    to: '나오지 않아요 그리고 뒤로 밀리는 것도 아니라 그냥 없는 날이 되고 그래서 첫 회차 금액이 적게 나오며 이 점을 미리 알아 두면 통장을 보고 당황하지 않게 되고 계산이 맞는지도 알 수 있어요.' },

  { n: 19, name: '제목에 1인칭 (클릭베이트)',
    plan: true, slug: 'waiting', field: 'title',
    to: '실업급여 대기기간, 내 첫 급여는 언제 나오나요', useGate: true },

  { n: 20, name: '검토 기록의 답을 페이지에 없는 문장으로',
    plan: true, slug: 'waiting', field: 'reviewAns',
    to: '이 문장은 페이지 어디에도 없습니다', useGate: true },

  // ── 2차 (2026-09-04): 아직 시험하지 않은 결함 유형 ───────────────────────
  { n: 21, name: '계산기 버튼을 계획과 반대로', plan: true, slug: 'waiting', field: 'calcFlip' },
  { n: 22, name: '계획에 있는 시각 장치를 글에 안 넣음', plan: true, slug: 'waiting', field: 'shapeAdd' },
  { n: 23, name: 'mustCover 에 제목에 없는 말', plan: true, slug: 'waiting', field: 'mustCoverBogus' },
  { n: 24, name: 'titleKeyword 를 검색어에 없는 말로', plan: true, slug: 'waiting', field: 'titleKeywordBogus' },
  { n: 25, name: '검토한 답 개수가 소제목보다 적음', plan: true, slug: 'waiting', field: 'dropAnswer' },
  { n: 26, name: '두 글이 같은 제목', plan: true, slug: 'waiting', field: 'dupTitle' },

  { n: 27, name: 'FAQ 질문이 물음표로 안 끝남',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "['실업급여 대기기간은 언제부터 세나요?'", to: "['실업급여 대기기간은 언제부터 세나'" },

  { n: 28, name: 'FAQ 답이 회피',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "'퇴사일이 아니라 고용센터에 실업을 신고한 날부터 7일이에요.'",
    to: "'사람마다 달라요. 고용센터에 문의하세요.'" },

  { n: 29, name: '한 글에 같은 소제목 두 번',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "h2: '대기기간에도 급여가 나오나요'", to: "h2: '실업급여 대기기간 7일은 무엇인가요'" },

  { n: 30, name: '외부 링크가 https 가 아님',
    file: S('180days'), slug: 'unemployment-180days-guide',
    from: "'https://www.ei.go.kr'", to: "'http://www.ei.go.kr'" },

  { n: 31, name: '표 헤더를 지움',
    file: S('days'), slug: 'unemployment-days-guide',
    from: "headers: ['고용보험 가입기간', '50세 미만', '50세 이상 또는 장애인', '차이']", to: "headers: []" },

  { n: 32, name: '근거에 없는 조문을 각주에 씀',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '제49조', to: '제999조', all: true },

  // ── 3차 (2026-09-04): 검사가 없어 보이는 곳을 노린다 ─────────────────────
  { n: 33, name: '연도를 위조 (2026 → 2030)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "basis: '2026년 9월 기준'", to: "basis: '2030년 9월 기준'" },

  { n: 34, name: '히어로 카드에 글 어디에도 없는 숫자',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "card: { label: '대기기간', big: String(WAIT)", to: "card: { label: '대기기간', big: '937'" },

  { n: 35, name: '인용의 근거 번호가 없는 번호',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "{ src: 1, quote: '실업의 신고일부터", to: "{ src: 77, quote: '실업의 신고일부터" },

  { n: 36, name: '퍼센트 값 위조',
    file: S('amount'), slug: 'unemployment-amount-guide',
    from: '평균임금의 60퍼센트', to: '평균임금의 65퍼센트', all: true },

  { n: 37, name: '반말 종결 (~한다)',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: '나오지 않아요. 뒤로 밀리는 것도 아니라 그냥 없는 날이 돼요.',
    to: '나오지 않는다. 뒤로 밀리는 것도 아니라 그냥 없는 날이 된다.' },

  { n: 38, name: '자기 자신을 가리키는 내부링크',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "link: { href: '/unemployment/payday/'", to: "link: { href: '/unemployment/waiting/'", useGate: true },

  { n: 39, name: 'related 에 죽은 링크',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "href: '/unemployment/round-1/' }", to: "href: '/unemployment/없는글999/' }", useGate: true },

  { n: 40, name: '같은 문장을 한 글 안에서 두 번',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "text: '퇴사하고 한 달 뒤에 신고했다면 그 신고일부터 7일을 세요.",
    to: "text: '신고일부터 이레 동안은 급여가 나오지 않는 기간이에요. 신고일부터 이레 동안은 급여가 나오지 않는 기간이에요." },

  { n: 41, name: '히어로 alt 를 지움',
    file: S('waiting'), slug: 'unemployment-waiting-guide',
    from: "alt: `실업급여 대기기간 7일과 첫 회차 ${FIRST_DAYS}일치`", to: "alt: ''" },

  { n: 42, name: '검토 기록의 query 를 지움', plan: true, slug: 'waiting', field: 'dropQuery' },
  { n: 43, name: '검토 기록의 hardWords 를 지움', plan: true, slug: 'waiting', field: 'dropHard' },
  { n: 44, name: 'deeperThanHub 를 한 낱말로', plan: true, slug: 'waiting', field: 'shortDeeper' },
  { n: 45, name: '검토 기록의 specHash 를 지움', plan: true, slug: 'waiting', field: 'dropHash' },
  { n: 46, name: '계획서에만 있는 소제목 추가', plan: true, slug: 'waiting', field: 'addH2' },

  { n: 47, name: '근거 파일을 하나 지움', evidenceDrop: true, slug: 'unemployment-waiting-guide' },

  { n: 48, name: '표 행의 셀 수가 헤더와 다름',
    file: S('days'), slug: 'unemployment-days-guide',
    from: "cells: [b.label, `${b.under}일`, `${b.over}일`, b.gap ? `+${b.gap}일` : '가산 없음']", to: "cells: [b.label, `${b.under}일`, `${b.over}일`]" },
];

/** 계획서를 바꾸는 돌연변이 */
function mutatePlan(c) {
  const orig = fs.readFileSync(PLAN, 'utf8');
  try {
    const d = JSON.parse(orig);
    let hit = null;
    (function w(o) {
      if (Array.isArray(o)) o.forEach(w);
      else if (o && typeof o === 'object') { if (o.slug === c.slug) hit = o; else Object.values(o).forEach(w); }
    })(d);
    if (!hit) return { skip: `계획서에 ${c.slug} 없음` };
    if (c.field === 'title') hit.title = c.to;
    if (c.field === 'reviewAns') { if (!hit.review?.h2Answers?.length) return { skip: '검토 기록 없음' }; hit.review.h2Answers[0].ans = c.to; }
    if (c.field === 'calcFlip') { if (!hit.calc) return { skip: 'calc 없음' }; hit.calc.on = !hit.calc.on; }
    if (c.field === 'shapeAdd') hit.shape = [...(hit.shape ?? []), 'tree'];
    if (c.field === 'mustCoverBogus') hit.mustCover = [...(hit.mustCover ?? []), '없는말123'];
    if (c.field === 'titleKeywordBogus') { if (!hit.review) return { skip: '검토 기록 없음' }; hit.review.titleKeyword = '아무도검색하지않는말'; }
    if (c.field === 'dropAnswer') { if (!hit.review?.h2Answers?.length) return { skip: '검토 기록 없음' }; hit.review.h2Answers.pop(); }
    if (c.field === 'dropQuery') { if (!hit.review) return { skip: '검토 기록 없음' }; delete hit.review.query; }
    if (c.field === 'dropHard') { if (!hit.review) return { skip: '검토 기록 없음' }; delete hit.review.hardWords; }
    if (c.field === 'shortDeeper') { if (!hit.review) return { skip: '검토 기록 없음' }; hit.review.deeperThanHub = '깊음'; }
    if (c.field === 'dropHash') { if (!hit.review) return { skip: '검토 기록 없음' }; delete hit.review.specHash; }
    if (c.field === 'addH2') hit.h2 = [...(hit.h2 ?? []), '계획서에만 있는 소제목인가요'];
    if (c.field === 'dupTitle') {
      let other = null;
      (function w2(o) { if (Array.isArray(o)) o.forEach(w2); else if (o && typeof o === 'object') { if (o.slug && o.slug !== c.slug && o.title && !other) other = o; else Object.values(o).forEach(w2); } })(d);
      if (!other) return { skip: '다른 글 없음' };
      hit.title = other.title;
    }
    fs.writeFileSync(PLAN, JSON.stringify(d, null, 2) + '\n');
    const g = gate();
    return { caught: g.code !== 0, where: '게이트', out: g.out };
  } finally { fs.writeFileSync(PLAN, orig); }
}

/** 근거 파일 하나를 잠시 치운다 */
function mutateEvidence(c) {
  const dir = 'scripts/article-template/evidence/unemployment-benefit-guide';
  if (!fs.existsSync(dir)) return { skip: '근거 폴더 없음' };
  const files = fs.readdirSync(dir).filter((x) => x.endsWith('.json'));
  if (!files.length) return { skip: '근거 파일 없음' };
  const target = `${dir}/${files[files.length - 1]}`;
  const orig = fs.readFileSync(target, 'utf8');
  try {
    fs.unlinkSync(target);
    const b = build(c.slug);
    return { caught: b.code !== 0, where: '빌드', out: b.out };
  } finally { fs.writeFileSync(target, orig); build(c.slug); }
}

let caught = 0, tested = 0, escaped = [];
for (const c of CASES) {
  if (only && c.n !== only) continue;
  const r = c.evidenceDrop ? mutateEvidence(c) : c.plan ? mutatePlan(c) : mutateFile(c);
  if (r.skip) { console.log(`— ${String(c.n).padStart(2)} ${c.name}  (건너뜀: ${r.skip})`); continue; }
  tested++;
  if (r.caught) { caught++; console.log(`✓ ${String(c.n).padStart(2)} ${c.name}  [${r.where}]`); }
  else { escaped.push(c); console.log(`✗ ${String(c.n).padStart(2)} ${c.name}  ← 빠져나감`); }
}
console.log(`\n잡음 ${caught}/${tested}`);
if (escaped.length) {
  console.log('\n빠져나간 결함 (여기가 진짜 구멍이다):');
  escaped.forEach((c) => console.log(`  ${c.n}. ${c.name}`));
}
process.exit(escaped.length ? 1 : 0);
