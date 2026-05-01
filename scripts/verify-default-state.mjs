#!/usr/bin/env node
/**
 * GenericCalculator default state 시뮬: input.default 값으로 calc 호출 → NaN/undefined/error 체크.
 * 사용자가 처음 페이지 열었을 때 결과 깨지는 calc 식별.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const { calculators } = require(path.join(ROOT, "lib/calc/engine.js"));
const CALC_DIR = path.join(ROOT, "moneydoc-data", "calculators");

let ok = 0;
let issues = 0;
const issueList = [];

for (const cat of fs.readdirSync(CALC_DIR).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(".json", "");
    const spec = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));
    const fn = calculators[slug];
    if (!fn) {
      issues++;
      issueList.push({ slug, problem: "no calc fn" });
      continue;
    }

    // GenericCalculator처럼 default 값 모음
    const input = {};
    for (const inp of spec.inputs || []) {
      input[inp.id] =
        inp.default !== undefined
          ? inp.default
          : inp.type === "stepper" || inp.type === "number"
          ? 0
          : "";
    }

    let result;
    try {
      result = fn(input, spec);
    } catch (e) {
      issues++;
      issueList.push({ slug, problem: `THROW: ${e.message.slice(0, 80)}` });
      continue;
    }

    if (!result || typeof result !== "object") {
      issues++;
      issueList.push({ slug, problem: `result not object: ${typeof result}` });
      continue;
    }

    // NaN/undefined 체크
    const nanKeys = [];
    for (const [k, v] of Object.entries(result)) {
      if (typeof v === "number" && (Number.isNaN(v) || !Number.isFinite(v))) {
        nanKeys.push(k);
      }
    }
    if (nanKeys.length) {
      issues++;
      issueList.push({ slug, problem: `NaN keys: ${nanKeys.slice(0, 5).join(",")}` });
      continue;
    }

    // expected 키 vs result 키 (UI breakdown 표시용)
    const expectedKeys = Object.keys(spec.verification?.cases?.[0]?.expected || {});
    const missing = expectedKeys.filter((k) => result[k] === undefined);
    if (missing.length) {
      issues++;
      issueList.push({ slug, problem: `missing keys in result: ${missing.slice(0, 5).join(",")}` });
      continue;
    }

    ok++;
  }
}

console.log(`\n결과: ${ok} OK / ${issues} 문제\n`);
if (issueList.length) {
  console.log("문제 calc:");
  for (const it of issueList) {
    console.log(`  ✗ ${it.slug} — ${it.problem}`);
  }
}
process.exit(issues > 0 ? 1 : 0);
