#!/usr/bin/env node
/**
 * 계산기 배선(wiring) 감사 — 값이 아니라 "연결"이 끊긴 곳을 찾는다.
 *
 * 2026-09-01에 실제로 발견된 버그 유형을 자동 검출한다:
 *   A. 엔진이 C.XXX 를 쓰는데 JSON constants 에 없음   → undefined → NaN/오계산
 *      (예: transfer-tax 의 SHORT_TERM_1Y_TO_2Y_RATE)
 *   B. 엔진이 T.XXX 를 쓰는데 JSON tables 에 없음
 *   C. 엔진이 input.XXX 를 쓰는데 JSON inputs 에 그 id 가 없음
 *      (예: transfer-tax 의 isOneHome — UI가 안 넘겨서 1주택 로직 전체가 무력화)
 *   D. JSON inputs 기본값으로 돌렸을 때 NaN/Infinity/undefined 가 나오는 필드
 *
 * 사용: node scripts/verify-system/audit-wiring.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const ENGINE_PATH = path.join(ROOT, "lib", "calc", "engine.js");
const CALC_DIR = path.join(ROOT, "moneydoc-data", "calculators");

const { calculators } = require(ENGINE_PATH);
const engineSrc = fs.readFileSync(ENGINE_PATH, "utf-8");

/** slug -> 엔진 함수 이름 (calculators 맵에서) */
function fnNameFor(slug) {
  const re = new RegExp(`['"]${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"]\\s*:\\s*(\\w+)`);
  const m = engineSrc.match(re);
  return m ? m[1] : null;
}

/** 함수 본문을 중괄호 균형으로 추출 (호출되는 하위 함수까지 1단계 따라감) */
function fnBody(name, seen = new Set()) {
  if (!name || seen.has(name)) return "";
  seen.add(name);
  const start = engineSrc.indexOf(`function ${name}(`);
  if (start === -1) return "";
  let i = engineSrc.indexOf("{", start);
  if (i === -1) return "";
  let depth = 0, end = i;
  for (; end < engineSrc.length; end++) {
    const ch = engineSrc[end];
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) { end++; break; } }
  }
  let body = engineSrc.slice(start, end);
  // 이 함수가 부르는 다른 calc_ 함수도 포함 (dispatcher 대응)
  for (const call of body.matchAll(/\b(calc_\w+)\s*\(/g)) {
    if (call[1] !== name) body += "\n" + fnBody(call[1], seen);
  }
  return body;
}

const findings = [];
let checked = 0;

for (const cat of fs.readdirSync(CALC_DIR).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const spec = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));
    const slug = spec.slug;
    const fn = calculators[slug];
    if (!fn) { findings.push({ slug, type: "ENGINE", msg: "엔진에 계산 함수 없음" }); continue; }
    checked++;

    const name = fnNameFor(slug);
    const body = fnBody(name);
    const constKeys = new Set(Object.keys(spec.constants || {}));
    const tableKeys = new Set(Object.keys(spec.tables || {}));
    const inputIds = new Set((spec.inputs || []).map((i) => i.id));

    // ?? 나 || 로 폴백이 걸렸거나 !== undefined 로 방어된 참조는 의도된 것 → 제외
    const guarded = (expr) => {
      const e = expr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(\\?\\?|\\|\\|)\\s*${e}`).test(body)
        || new RegExp(`${e}\\s*(\\?\\?|\\|\\|)`).test(body)
        || new RegExp(`${e}\\s*!==\\s*undefined`).test(body);
    };

    if (body) {
      // A. C.XXX
      for (const m of new Set([...body.matchAll(/\bC\.([A-Za-z_]\w*)/g)].map((x) => x[1]))) {
        if (!constKeys.has(m) && !guarded(`C.${m}`)) findings.push({ slug, type: "CONST", msg: `constants 누락: C.${m}` });
      }
      // B. T.XXX
      for (const m of new Set([...body.matchAll(/\bT\.([A-Za-z_]\w*)/g)].map((x) => x[1]))) {
        if (!tableKeys.has(m)) findings.push({ slug, type: "TABLE", msg: `tables 누락: T.${m}` });
      }
      // C. input.XXX 와 구조분해 { a, b } = input
      const used = new Set([...body.matchAll(/\binput\.([A-Za-z_]\w*)/g)].map((x) => x[1]));
      for (const d of body.matchAll(/const\s*\{([^}]+)\}\s*=\s*input\s*;/g)) {
        for (const part of d[1].split(",")) {
          const id = part.split("=")[0].trim();
          if (/^[A-Za-z_]\w*$/.test(id)) used.add(id);
        }
      }
      for (const id of used) {
        if (!inputIds.has(id) && !guarded(`input.${id}`)) {
          findings.push({ slug, type: "INPUT", msg: `inputs 에 없는 입력 참조: input.${id}` });
        }
      }
    }

    // D. 기본값으로 실행
    const defaults = {};
    for (const i of spec.inputs || []) if (i.default !== undefined) defaults[i.id] = i.default;
    try {
      const out = fn(defaults, spec);
      for (const [k, v] of Object.entries(out || {})) {
        if (typeof v === "number" && !Number.isFinite(v)) findings.push({ slug, type: "NaN", msg: `기본값 실행 시 ${k} = ${v}` });
      }
    } catch (e) {
      findings.push({ slug, type: "THROW", msg: `기본값 실행 중 예외: ${e.message}` });
    }
  }
}

const byType = {};
for (const f of findings) (byType[f.type] ??= []).push(f);

console.log(`\n계산기 배선 감사 — ${checked}개 계산기\n${"=".repeat(60)}`);
const LABEL = {
  ENGINE: "엔진 함수 없음",
  CONST: "constants 누락 (undefined → 오계산)",
  TABLE: "tables 누락",
  INPUT: "UI가 넘기지 않는 입력 참조 (로직 무력화 위험)",
  NaN: "기본값 실행 시 NaN/Infinity",
  THROW: "기본값 실행 중 예외",
};
for (const t of ["ENGINE", "CONST", "TABLE", "NaN", "THROW", "INPUT"]) {
  const list = byType[t];
  if (!list?.length) continue;
  console.log(`\n### ${LABEL[t]} — ${list.length}건`);
  for (const f of list) console.log(`  ${f.slug.padEnd(30)} ${f.msg}`);
}
console.log(`\n${"=".repeat(60)}`);
console.log(findings.length ? `총 ${findings.length}건 발견` : "이상 없음");
process.exit(0);
