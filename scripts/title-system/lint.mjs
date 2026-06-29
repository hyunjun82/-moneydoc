#!/usr/bin/env node
// 타이틀 품질 게이트. KB Think 패턴(pattern.json) 규칙을 코드로 강제한다.
// 사용: node scripts/title-system/lint.mjs scripts/title-system/titles.unemployment.json
// 통과 = exit 0, 위반 = exit 1 (위반 목록 출력).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const pattern = JSON.parse(readFileSync(resolve(__dir, "pattern.json"), "utf8"));
const R = pattern.rules;

const file = process.argv[2];
if (!file) {
  console.error("usage: node lint.mjs <titles.{slug}.json>");
  process.exit(2);
}
const data = JSON.parse(readFileSync(resolve(process.cwd(), file), "utf8"));
const spokes = data.spokes || [];

const fails = [];
const charLen = (s) => [...s].length; // 한글 글자 수
const hasPipe = (s) => s.includes("ㅣ") || s.includes("｜") || s.includes("|");

// ── per-title 검사 ────────────────────────────────
for (const s of spokes) {
  const t = s.title || "";
  const tag = s.slug || t;

  if (charLen(t) < R.minTitleLen) fails.push(`[${tag}] 너무 짧음 (${charLen(t)}자 < ${R.minTitleLen})`);
  if (charLen(t) > R.maxTitleLen) fails.push(`[${tag}] 너무 김 (${charLen(t)}자 > ${R.maxTitleLen})`);

  if (R.requireKeywordPresent) {
    for (const kw of s.mustInclude || []) {
      if (!t.includes(kw)) fails.push(`[${tag}] 필수 키워드 누락: "${kw}"`);
    }
    if (!(s.mustInclude || []).length) fails.push(`[${tag}] mustInclude 미정의 (키워드 검증 불가)`);
  }

  for (const bad of pattern.bannedClickbait) {
    if (t.includes(bad)) fails.push(`[${tag}] 클릭베이트 금지어 포함: "${bad}"`);
  }

  if (!pattern.formats.includes(s.format)) fails.push(`[${tag}] 알 수 없는 format: "${s.format}"`);

  if (R.requireSourceQuery && !(s.sourceQuery && String(s.sourceQuery).trim()))
    fails.push(`[${tag}] sourceQuery 누락 — 실측 포털 검색어 근거 없음(추측 제목 차단)`);

  if (R.requireSubOrTail) {
    const hasTail = /[?:!]/.test(t) || t.includes(",") || /총정리|까지|방법|정리|기준/.test(t);
    if (!hasTail) fails.push(`[${tag}] 롱테일 sub/꼬리 없음 (쉼표·물음표·'~까지'·총정리 등 필요)`);
  }
}

// ── aggregate 검사 ────────────────────────────────
const n = spokes.length || 1;

if (R.requireUnique) {
  const seen = new Map();
  for (const s of spokes) {
    const k = s.title.trim();
    if (seen.has(k)) fails.push(`중복 타이틀: "${k}"`);
    seen.set(k, true);
  }
}

const pipeCount = spokes.filter((s) => hasPipe(s.title)).length;
const pipeShare = pipeCount / n;
if (pipeShare > R.maxPipeShare)
  fails.push(`ㅣ 남발: ${pipeCount}/${n} = ${(pipeShare * 100).toFixed(0)}% > ${(R.maxPipeShare * 100).toFixed(0)}%`);

const byFormat = {};
for (const s of spokes) byFormat[s.format] = (byFormat[s.format] || 0) + 1;
const distinct = Object.keys(byFormat).length;
if (distinct < R.minDistinctFormats)
  fails.push(`포맷 다양성 부족: ${distinct}종 < ${R.minDistinctFormats}종`);
for (const [f, c] of Object.entries(byFormat)) {
  if (c / n > R.maxSingleFormatShare)
    fails.push(`포맷 쏠림: ${f} ${c}/${n} = ${((c / n) * 100).toFixed(0)}% > ${(R.maxSingleFormatShare * 100).toFixed(0)}%`);
}

// ── 리포트 ────────────────────────────────────────
console.log(`\n타이틀 품질 검사: ${data.keyword || file}  (스포크 ${spokes.length}개)`);
console.log(`포맷 분포: ${Object.entries(byFormat).map(([f, c]) => `${f} ${c}`).join(" / ")}`);
console.log(`ㅣ 사용: ${pipeCount}/${n} (${(pipeShare * 100).toFixed(0)}%)`);

if (fails.length) {
  console.log(`\n❌ FAIL (${fails.length}건)`);
  for (const f of fails) console.log("  - " + f);
  process.exit(1);
} else {
  console.log(`\n✅ PASS — 모든 규칙 통과`);
  process.exit(0);
}
