#!/usr/bin/env node
/**
 * 손으로 쓴 guide.tables 에서 생성 명세(tableSpecs)를 역추론한다.
 *
 * 66개 계산기에 1,195행이 문자열로 박혀 있다. 명세를 손으로 쓰면 오래 걸리고
 * 사람이 컬럼을 잘못 맞출 위험이 있다. 대신 엔진을 돌려서
 * "첫 열을 어떤 입력으로 보고, 나머지 열이 어떤 출력·형식이면 이 값이 나오는가"를
 * 탐색한다. 전 행이 재현되는 조합만 명세로 인정한다.
 *
 * 결과 3분류
 *   computed  — 전 열이 엔진 출력으로 재현됨 → 명세 생성 가능
 *   partial   — 일부 열만 재현 (나머지는 법령 상수표이거나 설명 텍스트)
 *   manual    — 재현 불가 (자격 요건표 등 계산과 무관한 표)
 *
 * 사용법
 *   node scripts/infer-guide-specs.mjs                 # 전체 분류 리포트
 *   node scripts/infer-guide-specs.mjs --calc=salary-net-pay
 *   node scripts/infer-guide-specs.mjs --write         # computed 인 표에 명세 기록
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

const comma = (n) => Math.round(n).toLocaleString('ko-KR');

// gen-guide-tables.mjs 와 같은 형식 집합을 쓴다 (동기화 필요)
const FORMATS = {
  manwon: (v) => `${comma(v / 1e4)}만`,
  manwon1: (v) => `약 ${(v / 1e4).toFixed(1)}만`,
  eok: (v) => {
    const e = v / 1e8;
    return `${Number.isInteger(e) ? e : e.toFixed(1)}억`;
  },
  auto: (v) => (Math.abs(v) >= 1e8 ? FORMATS.eok(v) : FORMATS.manwon(v)),
  koreanWon: (v) => {
    const man = Math.round(v / 1e4);
    const eok = Math.floor(man / 1e4);
    const rest = man % 1e4;
    if (!eok) return `${comma(man)}만`;
    return rest ? `${eok}억 ${comma(rest)}만` : `${eok}억`;
  },
  won: (v) => `${comma(v)}원`,
  percent: (v) => `${+(v * 100).toFixed(3)}%`,
  num: (v) => comma(v),
};
const FORMAT_NAMES = Object.keys(FORMATS);
const SCALES = [1, 12];

/** "3,000만" / "1.5억" / "약 24.3만" / "350,000원" → 원 단위 숫자 (실패 시 null) */
function parseKoreanWon(str) {
  if (typeof str === 'number') return str;
  if (typeof str !== 'string') return null;
  let s = str.replace(/약|최대|이하|이상|\s|원/g, '');
  if (!/[0-9]/.test(s)) return null;
  let total = 0, matched = false;
  const eok = s.match(/([0-9][0-9.,]*)억/);
  if (eok) { total += parseFloat(eok[1].replace(/,/g, '')) * 1e8; s = s.replace(eok[0], ''); matched = true; }
  const man = s.match(/([0-9][0-9.,]*)만/);
  if (man) { total += parseFloat(man[1].replace(/,/g, '')) * 1e4; s = s.replace(man[0], ''); matched = true; }
  const rest = s.match(/^([0-9][0-9,]*(?:\.[0-9]+)?)/);
  if (rest && !matched) { total += parseFloat(rest[1].replace(/,/g, '')); matched = true; }
  else if (rest && matched && /^[0-9]/.test(s)) { total += parseFloat(rest[1].replace(/,/g, '')); }
  return matched ? total : null;
}

function defaultsOf(json) {
  const d = {};
  for (const i of json.inputs || []) if (i.default !== undefined) d[i.id] = i.default;
  return d;
}

/** 이 표가 어떤 입력의 변화인지 찾고, 나머지 열의 출력·형식을 맞춘다 */
function inferSpec(json, rows) {
  const fn = calculators[json.slug];
  if (!fn) return { kind: 'manual', reason: '엔진에 없음' };

  const labels = Object.keys(rows[0] || {});
  if (labels.length < 2) return { kind: 'manual', reason: '열 부족' };

  const defaults = defaultsOf(json);
  const numericInputs = (json.inputs || [])
    .filter((i) => typeof i.default === 'number')
    .map((i) => i.id);

  // 첫 열을 축으로 가정하고, 그 값이 어떤 입력인지 탐색
  const axisLabel = labels[0];
  const axisValues = rows.map((r) => parseKoreanWon(r[axisLabel]));
  if (axisValues.some((v) => v === null)) return { kind: 'manual', reason: `첫 열 '${axisLabel}' 파싱 불가` };

  const median = [...axisValues].sort((a, b) => a - b)[Math.floor(axisValues.length / 2)];

  for (const inputId of numericInputs) {
    // 자릿수가 동떨어진 입력에는 넣지 않는다.
    // "3,000만"을 30,000,000 으로 읽어 months 같은 입력에 넣으면
    // 엔진이 3천만 번 반복하며 사실상 멈춘다.
    const def = defaults[inputId];
    if (!def || median <= 0) continue;
    const ratio = median / def;
    if (ratio < 0.001 || ratio > 1000) continue;

    let outs;
    try {
      outs = axisValues.map((v) => fn({ ...defaults, [inputId]: v }, json));
    } catch { continue; }
    if (outs.some((o) => !o || typeof o !== 'object')) continue;

    // 축 열은 형식을 맞추려 하지 않는다. "1인" "3,000만" "84㎡" 처럼 표기가 제각각이라
    // 원문 문자열을 명세에 그대로 담고 생성 시 재사용한다.
    const columns = [{ label: axisLabel, from: 'vary.label' }];
    const unresolved = [];

    for (const label of labels.slice(1)) {
      let found = null;
      const outKeys = Object.keys(outs[0] || {}).filter((k) => typeof outs[0][k] === 'number');
      outer: for (const key of outKeys) {
        for (const scale of SCALES) {
          for (const f of FORMAT_NAMES) {
            if (rows.every((r, i) => FORMATS[f](outs[i][key] * scale) === r[label])) {
              found = { label, from: `out.${key}`, format: f, ...(scale !== 1 ? { scale } : {}) };
              break outer;
            }
          }
        }
      }
      if (found) columns.push(found);
      else unresolved.push(label);
    }

    if (columns.length > 1) {
      const spec = {
        calc: json.slug,
        vary: { input: inputId, values: axisValues, labels: rows.map((r) => r[axisLabel]) },
        fixed: Object.fromEntries(Object.entries(defaults).filter(([k]) => k !== inputId)),
        columns,
      };
      return unresolved.length === 0
        ? { kind: 'computed', spec }
        : { kind: 'partial', spec, unresolved };
    }
  }
  return { kind: 'manual', reason: '재현되는 입력 축 없음' };
}

// ── 실행 ───────────────────────────────────────────────────────────────────
const files = [];
for (const cat of fs.readdirSync(CALC_DIR)) {
  const d = path.join(CALC_DIR, cat);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) files.push(path.join(d, f));
}

const stat = { computed: 0, partial: 0, manual: 0 };
let rowsComputed = 0, rowsTotal = 0, filesWritten = 0;
const partials = [], manuals = [];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (args.calc && json.slug !== args.calc) continue;
  const tables = json.guide?.tables || {};
  let changed = false;

  for (const [name, rows] of Object.entries(tables)) {
    if (!Array.isArray(rows) || rows.length < 2) continue;
    rowsTotal += rows.length;
    // 이미 명세가 있으면 건너뜀
    if (json.guide?.tableSpecs?.[name]) { stat.computed++; rowsComputed += rows.length; continue; }

    const res = inferSpec(json, rows);
    stat[res.kind]++;
    if (res.kind === 'computed') {
      rowsComputed += rows.length;
      console.log(`  ✅ ${json.slug} / ${name} — ${rows.length}행, 전 열 재현`);
      if (args.write) {
        json.guide.tableSpecs = json.guide.tableSpecs || {};
        json.guide.tableSpecs[name] = res.spec;
        changed = true;
      }
    } else if (res.kind === 'partial') {
      partials.push(`${json.slug} / ${name} — 미재현 열: ${res.unresolved.join(', ')}`);
    } else {
      manuals.push(`${json.slug} / ${name} — ${res.reason}`);
    }
  }
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
    filesWritten++;
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`표 분류 — computed ${stat.computed} / partial ${stat.partial} / manual ${stat.manual}`);
console.log(`행 기준 — 엔진 재현 ${rowsComputed} / 전체 ${rowsTotal} (${((rowsComputed / rowsTotal) * 100).toFixed(1)}%)`);
if (args.write) console.log(`명세 기록: 파일 ${filesWritten}개`);

if (partials.length) {
  console.log(`\n일부만 재현 (${partials.length}) — 나머지 열은 법령 상수표일 가능성:`);
  partials.slice(0, 20).forEach((p) => console.log('  ' + p));
  if (partials.length > 20) console.log(`  … 외 ${partials.length - 20}건`);
}
if (manuals.length) {
  console.log(`\n재현 불가 (${manuals.length}) — 계산과 무관한 표로 보임:`);
  manuals.slice(0, 20).forEach((p) => console.log('  ' + p));
  if (manuals.length > 20) console.log(`  … 외 ${manuals.length - 20}건`);
}
