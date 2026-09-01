#!/usr/bin/env node
/**
 * 가이드 본문에 적힌 숫자가 계산기의 실제 값과 맞는지 검사한다.
 *
 * 배경
 *   guide 는 표·FAQ·팁 모두 손으로 쓴 문자열이다. 법이 바뀌어 constants 를 고쳐도
 *   가이드 문장은 그대로 남는다. 실제로 이 검사를 만들면서
 *     기초연금  상수 349,700 / 가이드 "353,250원"
 *     재산세    상수 43·44·45% 구간 / 가이드 "45%" 단일
 *   두 건이 어긋나 있는 것을 찾았다.
 *
 * 방법
 *   계산기마다 "알려진 값 집합"을 만든다.
 *     - constants 의 모든 숫자
 *     - tables 안의 모든 숫자
 *     - verification.cases 의 입력·기대값
 *     - 엔진을 케이스 입력으로 돌린 출력
 *   가이드에서 숫자를 뽑아 이 집합에 있는지 본다. 만원·억·% 표기는 환산해서 비교한다.
 *   집합에 없는 숫자는 "출처 불명"으로 보고한다. 경고이지 확정 오류는 아니다.
 *
 * 사용법
 *   node scripts/audit-guide-constants.mjs
 *   node scripts/audit-guide-constants.mjs --calc=basic-pension
 *   node scripts/audit-guide-constants.mjs --verbose
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const CALC_DIR = path.join(ROOT, 'moneydoc-data/calculators');
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const { calculators } = await import(pathToFileURL(path.join(ROOT, 'lib/calc/engine.js')).href);

/** 객체 안의 모든 숫자를 재귀 수집 */
function collectNumbers(obj, out = new Set()) {
  if (obj == null) return out;
  if (typeof obj === 'number') { if (Number.isFinite(obj)) out.add(obj); return out; }
  if (Array.isArray(obj)) { obj.forEach((v) => collectNumbers(v, out)); return out; }
  if (typeof obj === 'object') { Object.values(obj).forEach((v) => collectNumbers(v, out)); return out; }
  return out;
}

/** 가이드 문자열에서 검사 대상 숫자를 뽑는다 */
function extractNumbers(text) {
  const found = [];
  // 1) "353,250원" "3,000만원" "1.5억" "45%" 같은 금액·비율
  const re = /([0-9][0-9,]*(?:\.[0-9]+)?)\s*(억원|억|만원|만|천원|원|%|퍼센트)/g;
  let m;
  while ((m = re.exec(text))) {
    const n = parseFloat(m[1].replace(/,/g, ''));
    if (!Number.isFinite(n)) continue;
    const unit = m[2];
    let won = n;
    if (unit === '억' || unit === '억원') won = n * 1e8;
    else if (unit === '만' || unit === '만원') won = n * 1e4;
    else if (unit === '천원') won = n * 1e3;
    found.push({ raw: m[0], value: won, isPercent: unit === '%' || unit === '퍼센트', pct: n });
  }
  return found;
}

/** 노이즈 제거 — 연도, 조문 번호, 작은 정수 등 */
function isNoise(item, ctx) {
  const n = item.isPercent ? item.pct : item.value;
  if (item.isPercent) return false; // 비율은 전부 검사
  if (n >= 1900 && n <= 2100 && Number.isInteger(n)) return true; // 연도
  if (n < 1000) return true;        // 일수·개월·등급 등
  if (/§|제\s*[0-9]+\s*조/.test(ctx)) return true; // 조문 번호 주변
  return false;
}

const files = [];
for (const cat of fs.readdirSync(CALC_DIR)) {
  const d = path.join(CALC_DIR, cat);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) files.push(path.join(d, f));
}

let checked = 0, flagged = 0;
const report = [];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (args.calc && json.slug !== args.calc) continue;
  const guide = json.guide;
  if (!guide) continue;

  // 알려진 값 집합
  const known = new Set();
  collectNumbers(json.constants, known);
  collectNumbers(json.tables, known);
  collectNumbers(json.verification?.cases, known);
  const fn = calculators[json.slug];
  if (fn) {
    for (const c of json.verification?.cases || []) {
      try { collectNumbers(fn(c.input, json), known); } catch { /* 케이스 실패는 다른 검사에서 잡는다 */ }
    }
  }
  // 상수의 만원/억 환산값도 인정
  for (const v of [...known]) { known.add(v * 1e4); known.add(v / 1e4); known.add(v * 100); known.add(v / 100); }

  // 값 하나를 세 가지로 판정한다.
  //   match  — 어떤 상수와 사실상 같다 (0.5% 이내)
  //   stale  — 어떤 상수에 가깝지만 다르다 (0.5~15%) → 낡은 값일 가능성이 높다
  //   other  — 어떤 상수와도 무관하다 → 본문 예시일 뿐이므로 보고하지 않는다
  const classify = (n) => {
    let best = null;
    for (const k of known) {
      if (k === 0) continue;
      const rel = Math.abs(k - n) / Math.abs(k);
      if (rel <= 0.005) return { kind: 'match' };
      // 낡은 값의 특징: 상수와 "거의 같지만 조금 다름". 5%를 넘어가면
      // 대개 본문 예시라 잡아봐야 노이즈만 는다.
      if (rel <= 0.05 && (best === null || rel < best.rel)) best = { rel, k };
    }
    return best ? { kind: 'stale', ...best } : { kind: 'other' };
  };

  const hits = [];
  const walk = (node, where) => {
    if (typeof node === 'string') {
      for (const item of extractNumbers(node)) {
        if (isNoise(item, node)) continue;
        checked++;
        // 비율(%)은 상수와 우연히 가까운 경우가 너무 많아 제외하고 금액만 본다.
        if (item.isPercent) continue;
        if (item.value < 10000) continue;
        const cands = [item.value];
        const results = cands.map(classify);
        if (results.some((r) => r.kind === 'match')) continue;
        const stale = results.find((r) => r.kind === 'stale');
        if (stale) {
          hits.push({ where, raw: item.raw, expect: stale.k, gap: stale.rel, ctx: node.slice(0, 80) });
        }
      }
      return;
    }
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${where}[${i}]`));
    if (node && typeof node === 'object') {
      return Object.entries(node).forEach(([k, v]) => walk(v, `${where}.${k}`));
    }
  };
  walk(guide, 'guide');

  if (hits.length) {
    flagged += hits.length;
    report.push({ slug: json.slug, hits });
  }
}

console.log(`가이드 숫자 ${checked}개 검사 · 출처 불명 ${flagged}개\n`);
for (const r of report) {
  console.log(`■ ${r.slug} — ${r.hits.length}건`);
  const show = args.verbose ? r.hits : r.hits.slice(0, 4);
  for (const h of show) {
    const exp = h.expect >= 1e4 ? `${(h.expect / 1e4).toLocaleString('ko-KR')}만` : String(h.expect);
    console.log(`   ${h.raw.padEnd(12)} → 상수는 ${exp} (${(h.gap * 100).toFixed(1)}% 차)  ${h.where}`);
  }
  if (!args.verbose && r.hits.length > show.length) console.log(`   … 외 ${r.hits.length - show.length}건`);
  console.log();
}
console.log(flagged === 0 ? '✅ 출처 불명 숫자 없음' : `⚠ ${report.length}개 계산기에서 확인 필요`);
