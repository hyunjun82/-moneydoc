#!/usr/bin/env node
// 시스템 견고성 테스트: test-fixtures/*.json 을 lint 게이트에 통과시키고
// 각 픽스처의 _expect(PASS/FAIL)와 실제 결과가 일치하는지 검사한다.
// 사용: node scripts/title-system/test.mjs

import { readdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const fixDir = resolve(__dir, "test-fixtures");
const lint = resolve(__dir, "lint.mjs");

const files = readdirSync(fixDir).filter((f) => f.endsWith(".json")).sort();
let allOk = true;
const rows = [];

for (const f of files) {
  const meta = JSON.parse(readFileSync(join(fixDir, f), "utf8"));
  const expect = meta._expect; // "PASS" | "FAIL"
  let actual;
  try {
    execFileSync("node", [lint, join(fixDir, f)], { stdio: "pipe" });
    actual = "PASS";
  } catch {
    actual = "FAIL";
  }
  const ok = actual === expect;
  if (!ok) allOk = false;
  rows.push({ f, keyword: meta.keyword, expect, actual, ok, reason: meta._reason || "" });
}

console.log("\n=== 타이틀 시스템 견고성 테스트 (10건) ===\n");
for (const r of rows) {
  console.log(
    `${r.ok ? "✅" : "❌"}  ${r.f.padEnd(30)} ${String(r.keyword).padEnd(14)} 기대=${r.expect}  실제=${r.actual}  ${r.ok ? "" : "← 불일치!"}  ${r.reason}`
  );
}
const pass = rows.filter((r) => r.ok).length;
console.log(`\n결과: ${pass}/${rows.length} 일치`);
console.log(allOk ? "✅ 시스템 정상 — 모든 케이스 기대대로 동작" : "❌ 일부 케이스가 기대와 다름");
process.exit(allOk ? 0 : 1);
