#!/usr/bin/env node
/**
 * 가이드 즉답 표를 엔진에서 생성한다.
 *
 * 왜 필요한가
 *   guide.tables 에는 66개 계산기에 걸쳐 1,195행의 숫자가 문자열로 박혀 있다.
 *   요율이 바뀌어도 표는 그대로 남아 조용히 낡는다. 실제로 오늘
 *   화면 라벨이 국민연금 4.5%(옛 요율)로 남아 있는 채 계산은 4.75%로 되고 있었다.
 *   verify-guide-numbers.mjs 가 있긴 하나 대출 9종만 보고, 값에 "약"이 붙으면
 *   통째로 건너뛰기 때문에 이런 표는 애초에 검사 대상이 아니었다.
 *
 * 설계
 *   guide.tables[name]  = 렌더링용 행 배열 (기존 그대로, 렌더러 수정 불필요)
 *   guide.tableSpecs[name] = 그 표를 어떻게 만드는지에 대한 명세
 *   생성기가 명세를 읽어 엔진을 돌리고 tables 를 채운다.
 *   명세가 없는 표는 손으로 쓴 것으로 보고 건드리지 않는다 (점진 이행).
 *
 * 사용법
 *   node scripts/gen-guide-tables.mjs            # 검사만 (드리프트 시 exit 1)
 *   node scripts/gen-guide-tables.mjs --write    # 표 갱신
 *   node scripts/gen-guide-tables.mjs --calc=salary-net-pay --write
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

// ── 표시 형식 ──────────────────────────────────────────────────────────────
const comma = (n) => Math.round(n).toLocaleString('ko-KR');

const FORMATS = {
  /** 12345678 → "1,234만" (만원 단위 반올림) */
  manwon: (v) => `${comma(v / 1e4)}만`,
  /** 242920 → "약 24.3만" (만원 단위 소수 1자리) */
  manwon1: (v) => `약 ${(v / 1e4).toFixed(1)}만`,
  /** 100000000 → "1억" / 150000000 → "1.5억" */
  eok: (v) => {
    const e = v / 1e8;
    return `${Number.isInteger(e) ? e : e.toFixed(1)}억`;
  },
  /** 큰 금액은 억, 작으면 만원 */
  auto: (v) => (Math.abs(v) >= 1e8 ? FORMATS.eok(v) : FORMATS.manwon(v)),
  /** 원 단위 그대로 */
  won: (v) => `${comma(v)}원`,
  /** 0.0475 → "4.75%" */
  percent: (v) => `${+(v * 100).toFixed(3)}%`,
  /** 104,070,000 → "1억 607만" (억 + 만 조합, 한국식 읽기) */
  koreanWon: (v) => {
    const man = Math.round(v / 1e4);
    const eok = Math.floor(man / 1e4);
    const rest = man % 1e4;
    if (!eok) return `${comma(man)}만`;
    return rest ? `${eok}억 ${comma(rest)}만` : `${eok}억`;
  },
  /** 숫자 그대로 (콤마) */
  num: (v) => comma(v),
  /** 값을 손대지 않음 */
  raw: (v) => String(v),
};

function resolve(pathStr, ctx) {
  // "out.totalInsurance" / "input.annual" / "sum:out.a,out.b"
  if (pathStr.startsWith('sum:')) {
    return pathStr
      .slice(4)
      .split(',')
      .reduce((acc, p) => acc + (resolve(p.trim(), ctx) ?? 0), 0);
  }
  return pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), ctx);
}

/** 명세 하나로 행 배열을 만든다 */
function buildRows(spec, json) {
  const fn = calculators[spec.calc];
  if (!fn) throw new Error(`엔진에 '${spec.calc}' 없음`);
  const values = spec.vary.values;
  return values.map((v, idx) => {
    const input = { ...(spec.fixed || {}), [spec.vary.input]: v };
    const out = fn(input, json);
    // 축 열은 표기가 제각각이라("1인" "3,000만" "84㎡") 원문 라벨을 그대로 쓴다
    const vary = { label: spec.vary.labels?.[idx] };
    const ctx = { input, out, vary };
    const row = {};
    for (const col of spec.columns) {
      let raw = resolve(col.from, ctx);
      if (raw === undefined) throw new Error(`'${col.from}' 값을 찾을 수 없음 (${spec.calc})`);
      if (col.scale) raw *= col.scale; // 예: 월 → 연 (scale 12)
      if (col.from === 'vary.label') { row[col.label] = String(raw); continue; }
      const fmt = FORMATS[col.format || 'num'];
      if (!fmt) throw new Error(`알 수 없는 format '${col.format}'`);
      row[col.label] = fmt(raw);
    }
    return row;
  });
}

// ── 실행 ───────────────────────────────────────────────────────────────────
const files = [];
for (const cat of fs.readdirSync(CALC_DIR)) {
  const d = path.join(CALC_DIR, cat);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) files.push(path.join(d, f));
}

let specced = 0, drifted = 0, written = 0;
const problems = [];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const specs = json.guide?.tableSpecs;
  if (!specs) continue;
  if (args.calc && json.slug !== args.calc) continue;

  let changed = false;
  for (const [name, spec] of Object.entries(specs)) {
    specced++;
    let rows;
    try {
      rows = buildRows(spec, json);
    } catch (e) {
      problems.push(`${json.slug} / ${name} — ${e.message}`);
      continue;
    }
    const current = json.guide.tables?.[name];
    const same = JSON.stringify(current) === JSON.stringify(rows);
    if (same) {
      console.log(`  ✅ ${json.slug} / ${name} — ${rows.length}행 일치`);
      continue;
    }
    drifted++;
    console.log(`  ${args.write ? '✏️' : '❌'} ${json.slug} / ${name} — 엔진 값과 다름`);
    if (!args.write) {
      const a = JSON.stringify(current?.[0] ?? null);
      const b = JSON.stringify(rows[0]);
      console.log(`       현재: ${a}`);
      console.log(`       엔진: ${b}`);
    } else {
      json.guide.tables = json.guide.tables || {};
      json.guide.tables[name] = rows;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
    written++;
  }
}

console.log(
  `\n명세 있는 표 ${specced}개 · ${args.write ? `갱신 ${drifted}개 (파일 ${written})` : `드리프트 ${drifted}개`}`
);
if (problems.length) {
  console.log(`\n❌ 생성 실패 ${problems.length}건:`);
  problems.forEach((p) => console.log('  ' + p));
}
const fail = problems.length > 0 || (!args.write && drifted > 0);
if (!fail) console.log('✅ 이상 없음');
process.exit(fail ? 1 : 0);
