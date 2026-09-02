#!/usr/bin/env node
/**
 * 죽은 입력 검출 — 선언된 입력을 바꿔도 출력이 하나도 안 변하면 실패.
 *
 * 배경
 *   연봉 실수령액 계산기의 '자녀 8~20세' 입력이 라이브에 떠 있었지만 엔진은
 *   부양가족 수만 쓰고 자녀 수는 버리고 있었다. 사용자가 값을 바꿔도 숫자가
 *   그대로인 입력칸은 계산기 전체를 의심하게 만든다. 사람 눈으로 하나 찾았으니
 *   같은 유형을 66개 전체에서 기계가 잡도록 한다.
 *
 * 방법
 *   각 계산기의 기본 입력에서 입력 하나씩을 여러 방식으로 흔든다.
 *     숫자   : ×0.5, ×2, +1, 0, 큰 값
 *     불리언 : 반전
 *     선택   : 다른 옵션 전부
 *   어떤 흔들기에도 출력이 전부 동일하면 "죽은 입력"으로 보고한다.
 *   (임계값 때문에 한두 번 안 변하는 건 정상이라 전부 안 변할 때만 잡는다.)
 *
 * 사용법
 *   node scripts/verify-system/audit-input-effect.mjs            # 전체
 *   node scripts/verify-system/audit-input-effect.mjs --calc=salary-net-pay
 *   exit 1 = 죽은 입력 있음
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const CALC_DIR = path.join(ROOT, 'moneydoc-data/calculators');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const { calculators } = await import(pathToFileURL(path.join(ROOT, 'lib/calc/engine.js')).href);

const files = [];
for (const cat of fs.readdirSync(CALC_DIR)) {
  const d = path.join(CALC_DIR, cat);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) files.push(path.join(d, f));
}

const defaultsOf = (json) => Object.fromEntries((json.inputs || []).filter((i) => i.default !== undefined).map((i) => [i.id, i.default]));
// 엔진 출력은 키 순서가 결정적이므로 그대로 직렬화한다.
// (replacer 배열을 쓰면 중첩 객체의 키가 전부 빠져 {threshold,isEligible} 같은 출력이 항상 같아 보인다)
const sig = (o) => JSON.stringify(o);

function variants(input) {
  const v = input.default;
  if (typeof v === 'boolean') return [!v];
  if (input.type === 'select' || Array.isArray(input.options)) {
    return (input.options || []).map((o) => (typeof o === 'object' ? o.value : o)).filter((x) => x !== v);
  }
  if (typeof v === 'number') {
    const out = new Set([v * 0.5, v * 2, v + 1, 0, v + 10_000_000, Math.max(1, Math.round(v * 0.1))]);
    if (input.min !== undefined) out.add(input.min);
    if (input.max !== undefined) out.add(input.max);
    out.delete(v);
    return [...out];
  }
  if (typeof v === 'string') {
    // 날짜 등 — 하루 뒤로
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return [];
    const shift = (days) => new Date(d.getTime() + days * 86400000).toISOString().slice(0, 10);
    return [shift(1), shift(400), shift(3700), shift(-3700)];
  }
  return [];
}

let dead = 0, checked = 0, skipped = 0;
const report = [];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (args.calc && json.slug !== args.calc) continue;
  const fn = calculators[json.slug];
  if (!fn) { skipped++; continue; }
  const base = defaultsOf(json);
  let baseOut;
  try { baseOut = sig(fn({ ...base }, json)); } catch (e) { report.push(`  ⚠ ${json.slug}: 기본값 실행 실패 — ${e.message}`); skipped++; continue; }

  // 문맥 목록: 기본값 + (선택/불리언 형제 입력 하나를 다른 값으로 바꾼 상태들)
  // adjustedArea 는 houseCountAfter ≥ 2 일 때만, monthlyRent 는 type=rent 일 때만 살아난다.
  const contexts = [base];
  for (const sib of json.inputs || []) {
    if (sib.default === undefined) continue;
    if (typeof sib.default === 'boolean' || sib.type === 'select' || Array.isArray(sib.options)) {
      for (const v of variants(sib)) contexts.push({ ...base, [sib.id]: v });
    } else if (typeof sib.default === 'number' && sib.max !== undefined && sib.max <= 20) {
      // 주택 수처럼 작은 정수 입력은 값 자체가 분기 조건이다 — 각 값을 문맥으로 넣는다
      for (let v = sib.min ?? 0; v <= sib.max; v++) if (v !== sib.default) contexts.push({ ...base, [sib.id]: v });
    } else if (typeof sib.default === 'number') {
      // 거주연수 2년 미만일 때만 조정대상지역이 의미를 갖는 식의 임계 분기 — 0·1·절반도 문맥에 넣는다
      for (const v of [0, 1, Math.floor(sib.default / 2)]) if (v !== sib.default) contexts.push({ ...base, [sib.id]: v });
    }
  }

  for (const input of json.inputs || []) {
    if (input.default === undefined) continue;
    const vs = variants(input);
    if (!vs.length) continue;
    checked++;
    let changed = false;
    outer: for (const ctx of contexts) {
      let ctxOut;
      try { ctxOut = sig(fn({ ...ctx }, json)); } catch { continue; }
      for (const val of vs) {
        try {
          if (sig(fn({ ...ctx, [input.id]: val }, json)) !== ctxOut) { changed = true; break outer; }
        } catch { /* 일부 값에서 던지는 건 무시 */ }
      }
    }
    if (!changed) {
      dead++;
      report.push(`  ❌ ${json.slug} / ${input.id} (${input.label ?? ''}) — 어떤 값을 넣어도 출력 불변`);
    }
  }
}

console.log(`입력 ${checked}개 검사 · 죽은 입력 ${dead}개 · 건너뜀 ${skipped}`);
if (report.length) console.log(report.join('\n'));
console.log(dead === 0 ? '✅ 결과에 영향 없는 입력 없음' : `❌ ${dead}건 — 입력을 제거하거나 엔진에 반영해야 함`);
process.exit(dead === 0 ? 0 : 1);
