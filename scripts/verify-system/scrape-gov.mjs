#!/usr/bin/env node
/**
 * 정부값 자동 수집기
 *
 * 각 계산기 JSON의 verification.cases에 대해 정부/대형 어댑터 호출 →
 * 결과를 case.govSource.govExpected 에 저장.
 *
 * 사용법:
 *   node scripts/verify-system/scrape-gov.mjs --calc=loan-amortization
 *   node scripts/verify-system/scrape-gov.mjs --category=loan
 *   node scripts/verify-system/scrape-gov.mjs --all
 *
 * 옵션:
 *   --adapter=ezloan   특정 어댑터로 강제 (기본: case별 govSource.adapter 또는 자동 추론)
 *   --dry-run          JSON 저장 안 함 (출력만)
 *   --skip-existing    이미 govExpected 있으면 건너뛰기
 */

import fs from 'node:fs';
import { loadAllCalculators, loadByCategory, loadBySlug } from './core/case-loader.mjs';
import { Reporter } from './core/reporter.mjs';
import { getAdapter, AdapterError } from './adapters/_base.mjs';

import './adapters/ezloan.mjs';
import './adapters/kinfa.mjs';

const args = parseArgs(process.argv.slice(2));

async function main() {
  const calcs = pickCalcs(args);
  if (calcs.length === 0) {
    console.error('❌ 대상 계산기 없음. --calc / --category / --all 중 하나 지정');
    process.exit(1);
  }

  const reporter = new Reporter(`scrape-${args.calc || args.category || 'all'}`);

  for (const calc of calcs) {
    console.log(`\n🔍 ${calc.slug} (${calc.cases.length} cases)`);
    const json = JSON.parse(fs.readFileSync(calc.sourceFile, 'utf-8'));

    for (let i = 0; i < calc.cases.length; i++) {
      const c = calc.cases[i];
      const adapterId = args.adapter || c.govSource?.adapter || calc.defaultAdapter;
      if (!adapterId) {
        console.log(`  ⏭ ${c.name} — 어댑터 없음`);
        continue;
      }

      if (args.skipExisting && c.govSource?.govExpected) {
        console.log(`  ⏭ ${c.name} — 이미 수집됨`);
        continue;
      }

      try {
        const adapter = getAdapter(adapterId);
        console.log(`  ⏳ ${c.name} via ${adapterId}...`);
        const govExpected = await adapter.calculate(c.input);

        json.verification.cases[i].govSource = {
          adapter: adapterId,
          url: adapter.constructor.url,
          gov: adapter.constructor.gov,
          lastVerified: new Date().toISOString().slice(0, 10),
          govExpected,
        };

        console.log(`  ✅ ${c.name} → ${JSON.stringify(govExpected)}`);
        reporter.add({ status: 'pass', calc: calc.slug, case: c.name, adapter: adapterId });
      } catch (e) {
        const reason = e instanceof AdapterError ? e.reason : e.message;
        console.log(`  ⚠️ ${c.name} — ${reason}`);
        reporter.add({ status: 'error', calc: calc.slug, case: c.name, adapter: adapterId, detail: reason });
      }
    }

    if (!args.dryRun) {
      fs.writeFileSync(calc.sourceFile, JSON.stringify(json, null, 2) + '\n', 'utf-8');
    }
  }

  const saved = reporter.save();
  console.log(`\n=== ${reporter.passCount()} 수집 / ${reporter.errorCount()} 실패 ===`);
  console.log(`📄 ${saved.md}`);
}

function pickCalcs(args) {
  if (args.calc) {
    const c = loadBySlug(args.calc);
    return c ? [c] : [];
  }
  if (args.category) return loadByCategory(args.category);
  if (args.all) return loadAllCalculators();
  return [];
}

function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      out[toCamel(k)] = v ?? true;
    }
  }
  return out;
}

function toCamel(s) { return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }

main().catch(e => { console.error(e); process.exit(1); });
