#!/usr/bin/env node
/**
 * lib/calc/engine.js(단일 파일, 검증의 원본) → 계산기별 모듈 lib/calc/gen/<slug>.js 로 쪼갠다.
 *
 * 왜: 계산기 페이지마다 엔진 전체(104KB + 간이세액표 44KB)가 실려 첫 로드 JS 가 140KB 였다.
 *     페이지는 자기 산식만 싣게 하고, 정답 원본(engine.js)은 그대로 둔다.
 *
 * 방법: TypeScript 파서로 engine.js 의 최상위 선언(함수·상수·require)을 읽고,
 *       각 slug 의 함수가 참조하는 식별자를 재귀로 모아 그 선언들만 원문 순서대로 복사한다.
 *       텍스트를 한 글자도 바꾸지 않으므로 산식이 달라질 수 없고, 그래도 마지막에
 *       verification.cases 전부를 두 모듈에 넣어 결과가 완전히 같은지 대조한다 (다르면 실패).
 *
 * 실행: node scripts/split-engine.mjs   (engine.js 를 고치면 다시 실행)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const SRC = path.join(ROOT, 'lib/calc/engine.js');
const OUT = path.join(ROOT, 'lib/calc/gen');
const code = fs.readFileSync(SRC, 'utf8');
const sf = ts.createSourceFile('engine.js', code, ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS);

// ── 최상위 선언 수집: name → { text, deps }
const decls = new Map();          // 선언 이름 → 선언 텍스트 (같은 statement 의 여러 이름은 같은 텍스트)
const order = [];                 // 원문 순서
let calcMapNode = null;

const collectNames = (node, out) => {
  if (ts.isIdentifier(node)) out.add(node.text);
  else if (ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) node.elements.forEach((e) => e.name && collectNames(e.name, out));
};
for (const st of sf.statements) {
  const text = code.slice(st.getFullStart(), st.getEnd()).replace(/^\s*\n/, '');
  const names = new Set();
  if (ts.isFunctionDeclaration(st) && st.name) names.add(st.name.text);
  else if (ts.isVariableStatement(st)) {
    for (const d of st.declarationList.declarations) {
      collectNames(d.name, names);
      if (ts.isIdentifier(d.name) && d.name.text === 'calculators') calcMapNode = d;
    }
  } else if (ts.isExpressionStatement(st)) continue; // module.exports 등
  else continue;
  if (names.has('calculators')) continue;
  const key = [...names].join(',');
  order.push({ key, names, text, node: st });
  for (const n of names) decls.set(n, key);
}
const byKey = new Map(order.map((o) => [o.key, o]));

// 선언이 참조하는 식별자 → 다른 최상위 선언
function refsOf(node) {
  const out = new Set();
  const walk = (n) => { if (ts.isIdentifier(n) && decls.has(n.text)) out.add(decls.get(n.text)); ts.forEachChild(n, walk); };
  walk(node);
  return out;
}
const depCache = new Map();
function closure(key, acc = new Set()) {
  if (acc.has(key)) return acc;
  acc.add(key);
  if (!depCache.has(key)) depCache.set(key, refsOf(byKey.get(key).node));
  for (const d of depCache.get(key)) closure(d, acc);
  return acc;
}

// ── calculators 맵: slug → 함수 이름
if (!calcMapNode || !ts.isObjectLiteralExpression(calcMapNode.initializer)) throw new Error('calculators 맵을 찾지 못함');
const map = {};
for (const p of calcMapNode.initializer.properties) {
  if (!ts.isPropertyAssignment(p)) continue;
  const slug = ts.isStringLiteral(p.name) ? p.name.text : p.name.getText();
  if (!ts.isIdentifier(p.initializer)) throw new Error(`${slug}: 함수 이름이 아님`);
  map[slug] = p.initializer.text;
}

// ── 파일 생성
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const { calculators } = require(SRC);
let total = 0, checked = 0, mismatch = 0;
const sizes = [];
for (const [slug, fn] of Object.entries(map)) {
  const need = closure(decls.get(fn));
  const body = order.filter((o) => need.has(o.key)).map((o) => o.text.replace(/require\('\.\/tables\//g, "require('../tables/")).join('\n\n');
  const out = `// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)\n// 계산기: ${slug}\n${body}\n\nmodule.exports = { calc: ${fn} };\n`;
  const file = path.join(OUT, `${slug}.js`);
  fs.writeFileSync(file, out, 'utf8');
  sizes.push([slug, out.length]);
  total++;

  // 대조: 스펙의 verification.cases 전부 (입력 → 결과 완전 일치)
  const specPath = findSpec(slug);
  if (!specPath) continue;
  const spec = require(specPath);
  const gen = require(file).calc;
  for (const c of spec.verification?.cases ?? []) {
    checked++;
    const a = JSON.stringify(safe(() => calculators[slug](c.input, spec)));
    const b = JSON.stringify(safe(() => gen(c.input, spec)));
    if (a !== b) { mismatch++; console.error(`✗ ${slug}: 결과 불일치\n  engine ${a}\n  gen    ${b}`); }
  }
}
function safe(f) { try { return f(); } catch (e) { return { __error: String(e.message) }; } }
function findSpec(slug) {
  const root = path.join(ROOT, 'moneydoc-data/calculators');
  for (const cat of fs.readdirSync(root)) {
    const p = path.join(root, cat, `${slug}.json`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}
// 타입은 lib/calc/gen-modules.d.ts 의 와일드카드 선언 하나로 처리

sizes.sort((a, b) => b[1] - a[1]);
console.log(`gen ${total}개 · 케이스 대조 ${checked}건 · 불일치 ${mismatch}`);
console.log('가장 큰 5개:', sizes.slice(0, 5).map(([s, n]) => `${s} ${(n / 1024).toFixed(1)}KB`).join(', '));
console.log('가장 작은 5개:', sizes.slice(-5).map(([s, n]) => `${s} ${(n / 1024).toFixed(1)}KB`).join(', '));
if (mismatch) process.exit(1);
