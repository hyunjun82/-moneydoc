#!/usr/bin/env node
// 스포크 품질 게이트 — "허브(청년 메인글) 만큼 품질이 안 나오면 FAIL".
// 허브 구조를 기준(gold)으로, 스포크가 구조·깊이·funnel·FAQ·문체를 갖췄는지 강제. PASS여야 게시.
// 사용: node scripts/spoke-system/spoke-lint.mjs moneydoc-data/articles/government/youth-future-savings-soldier.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const HUB = "moneydoc-data/articles/government/youth-future-savings.ts";

function profile(text) {
  return {
    sections: (text.match(/<section class="card"/g) || []).length,
    faqDetails: (text.match(/<details/g) || []).length,
    tables: (text.match(/<table class="cmp"/g) || []).length,
    steps: (text.match(/class="steps"/g) || []).length,
    keypts: (text.match(/class="keypts"/g) || []).length,
    faqLdQ: (text.match(/"@type":\s*"Question"/g) || []).length,
    h2: (text.match(/<h2>/g) || []).length,
  };
}

const spokeFile = process.argv[2];
if (!spokeFile) { console.error("usage: node spoke-lint.mjs <spoke.ts>"); process.exit(2); }

const hub = readFileSync(resolve(process.cwd(), HUB), "utf8");
const spoke = readFileSync(resolve(process.cwd(), spokeFile), "utf8");
const H = profile(hub), S = profile(spoke);
const fails = [];

if (!/class="applysticky"[\s\S]{0,200}신청/.test(spoke)) fails.push('상단 신청 CTA(applysticky + "신청") 없음');
if (!/<h1>/.test(spoke)) fails.push("H1 없음");
for (const cls of ["byline", "facts", "notice", "toc", "foot"])
  if (!new RegExp('class="' + cls).test(spoke)) fails.push(cls + " 블록 없음");
if (S.keypts < 1) fails.push("핵심요약(keypts, 결론 먼저) 없음");

const minSec = Math.ceil(H.sections * 0.55);
if (S.sections < minSec) fails.push("섹션 " + S.sections + "개 < 최소 " + minSec + "개 (허브 " + H.sections + "의 55%)");
if (S.tables + S.steps < 1) fails.push("깊이 요소 없음 (표 cmp 또는 steps 최소 1개 필요)");
if (S.h2 < 6) fails.push("H2 " + S.h2 + "개 < 6 (본문이 얇음)");
if (S.faqDetails < 5) fails.push("FAQ " + S.faqDetails + "개 < 5");
if (S.faqLdQ < 5) fails.push("FAQ 스키마(faqLd) 질문 " + S.faqLdQ + "개 < 5");

if (!/youth-future-savings-guide\//.test(spoke)) fails.push("허브 funnel 링크 없음");
if (!/\/savings\/|\/government\/median-income\//.test(spoke)) fails.push("계산기 funnel 링크 없음");
if (!/자료 출처/.test(spoke)) fails.push("출처(자료 출처) 표기 없음");

const bannedProse = [
  "정리했어요", "정리해드릴", "정리해 드릴", "정리해드려",
  "알아볼까요", "알아보겠습니다", "함께 알아",
  "걱정 마세요", "걱정하지 마세요", "어렵지 않아요",
  "이 글에서는", "이번 글에서는", "끝까지 정리", "한눈에 정리",
  "꼼꼼히 정리", "말씀드릴게요", "소개해 드릴", "총정리해",
];
for (const bad of bannedProse)
  if (spoke.includes(bad)) fails.push('AI 티 문구 포함: "' + bad + '" -> 사람 문체로 교체');

console.log("\n스포크 품질 게이트: " + spokeFile);
console.log("  허브 기준 -> 섹션 " + H.sections + " / H2 " + H.h2 + " / FAQ " + H.faqDetails + " / 표 " + H.tables + " / steps " + H.steps);
console.log("  이 스포크 -> 섹션 " + S.sections + " / H2 " + S.h2 + " / FAQ " + S.faqDetails + " / 표 " + S.tables + " / steps " + S.steps + " / 스키마Q " + S.faqLdQ);

if (fails.length) {
  console.log("\n❌ FAIL (" + fails.length + "건) — 허브 품질 미달, 재작성 필요");
  for (const f of fails) console.log("  - " + f);
  process.exit(1);
} else {
  console.log("\n✅ PASS — 허브 수준 구조·깊이 충족");
  process.exit(0);
}
