#!/usr/bin/env node
/**
 * 102개 calc 함수 (engine.js) × 각 JSON의 verification.cases 자동 비교.
 * Generic UI가 받을 입력 그대로 calc 호출 → expected와 1:1 비교.
 * 차이 있는 calc는 PROBLEM 마킹 (UI 깨짐 가능성).
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
const TOL = 2;

let pass = 0;
let fail = 0;
const fails = [];

for (const cat of fs.readdirSync(CALC_DIR).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(".json", "");
    const spec = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));
    const fn = calculators[slug];
    if (!fn) {
      fails.push({ slug, reason: "no calc function in registry" });
      fail++;
      continue;
    }
    const cases = spec.verification?.cases || [];
    if (!cases.length) {
      fails.push({ slug, reason: "no verification cases" });
      fail++;
      continue;
    }
    let allMatch = true;
    const diffs = [];
    for (const c of cases) {
      let actual;
      try {
        actual = fn(c.input || {}, spec);
      } catch (e) {
        allMatch = false;
        diffs.push(`case "${c.name}": THROW ${e.message}`);
        continue;
      }
      for (const [k, expV] of Object.entries(c.expected || {})) {
        const actV = actual?.[k];
        if (typeof expV === "boolean") {
          if (expV !== actV) {
            allMatch = false;
            diffs.push(`${c.name}.${k}: expected ${expV}, actual ${actV}`);
          }
        } else if (typeof expV === "number") {
          if (typeof actV !== "number" || Math.abs(expV - actV) > TOL) {
            allMatch = false;
            diffs.push(`${c.name}.${k}: expected ${expV}, actual ${actV}`);
          }
        } else if (typeof expV === "object" && expV !== null) {
          for (const [k2, v2] of Object.entries(expV)) {
            const actV2 = actV?.[k2];
            if (typeof v2 === "boolean" && v2 !== actV2) {
              allMatch = false;
              diffs.push(`${c.name}.${k}.${k2}: expected ${v2}, actual ${actV2}`);
            } else if (typeof v2 === "number" && (typeof actV2 !== "number" || Math.abs(v2 - actV2) > TOL)) {
              allMatch = false;
              diffs.push(`${c.name}.${k}.${k2}: expected ${v2}, actual ${actV2}`);
            }
          }
        }
      }
    }
    if (allMatch) {
      pass++;
    } else {
      fail++;
      fails.push({ slug, reason: diffs.slice(0, 3).join(" | ") });
    }
  }
}

console.log(`\n결과: ${pass} pass / ${fail} fail (총 ${pass + fail})\n`);
if (fails.length) {
  console.log("실패 calc:");
  for (const f of fails.slice(0, 30)) {
    console.log(`  ✗ ${f.slug} — ${f.reason}`);
  }
}
process.exit(fail > 0 ? 1 : 0);
