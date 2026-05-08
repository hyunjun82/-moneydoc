#!/usr/bin/env node
/**
 * 3-way 검증: 엔진 산식 vs 라이브 사이트 vs 정부값
 * 사용법:
 *   node scripts/verify-system/verify-3way.mjs --calc=loan-amortization
 *   node scripts/verify-system/verify-3way.mjs --category=loan
 *   node scripts/verify-system/verify-3way.mjs --all
 * 옵션:
 *   --no-live, --no-gov, --tolerance=N
 */

import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadAllCalculators, loadByCategory, loadBySlug } from './core/case-loader.mjs';
import { Reporter } from './core/reporter.mjs';
import { getAdapter, AdapterError } from './adapters/_base.mjs';

import './adapters/ezloan.mjs';
import './adapters/kinfa.mjs';
import './adapters/budongsan-loan.mjs';
import './adapters/loan-formulas.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENGINE_PATH = path.resolve(__dirname, '../../lib/calc/engine.js');
const args = parseArgs(process.argv.slice(2));

async function main() {
  const calcs = pickCalcs(args);
  if (calcs.length === 0) {
    console.error('❌ 대상 계산기 없음. --calc / --category / --all 중 하나 지정');
    process.exit(1);
  }
  const engineUrl = pathToFileURL(ENGINE_PATH).href;
  const { calculators } = await import(engineUrl);
  const reporter = new Reporter(args.calc || args.category || 'all');

  for (const calc of calcs) {
    const engineFn = calculators[calc.slug];
    if (!engineFn) {
      reporter.add({ status: 'error', calc: calc.slug, case: '(no fn)', detail: '엔진에 함수 없음' });
      continue;
    }
    for (const c of calc.cases) {
      const result = await verifyOneCase(calc, c, engineFn, args);
      reporter.add(result);
      const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
      console.log(`${icon} ${calc.slug} — ${c.name}`);
      if (result.diffs) result.diffs.forEach(d => console.log(`    ${d}`));
    }
  }
  const saved = reporter.save();
  console.log(`\n=== ${reporter.passCount()} pass / ${reporter.failCount()} fail / ${reporter.errorCount()} error ===`);
  console.log(`📄 ${saved.md}`);
}

async function verifyOneCase(calc, c, engineFn, opts) {
  let engineOut;
  try {
    engineOut = engineFn(c.input, calc.json);
  } catch (e) {
    return { status: 'error', calc: calc.slug, case: c.name, detail: `엔진 throw: ${e.message}` };
  }
  const expected = c.expected || {};
  const engineDiffs = compareFields(engineOut, expected);
  if (engineDiffs.length > 0) {
    return {
      status: 'fail', calc: calc.slug, case: c.name,
      detail: '엔진 ≠ JSON expected',
      diffs: engineDiffs.map(d => `${d.k}: engine=${d.got} vs expected=${d.exp} (Δ${d.diff})`),
    };
  }
  if (!opts.noGov && c.govSource?.adapter) {
    try {
      const adapter = getAdapter(c.govSource.adapter);
      const govOut = await adapter.calculate(c.input, calc.slug);
      const tolerance = opts.tolerance ?? (adapter.constructor.gov ? 0 : 100);
      const govDiffs = compareFields(engineOut, govOut, tolerance);
      if (govDiffs.length > 0) {
        return {
          status: 'fail', calc: calc.slug, case: c.name,
          adapter: c.govSource.adapter,
          detail: `엔진 ≠ ${c.govSource.adapter} (tolerance ±${tolerance})`,
          diffs: govDiffs.map(d => `${d.k}: engine=${d.got} vs gov=${d.exp} (Δ${d.diff})`),
        };
      }
    } catch (e) {
      const reason = e instanceof AdapterError ? e.reason : e.message;
      return { status: 'error', calc: calc.slug, case: c.name, adapter: c.govSource.adapter, detail: `어댑터 에러: ${reason}` };
    }
  }
  return { status: 'pass', calc: calc.slug, case: c.name };
}

function compareFields(got, exp, tolerance = 0, prefix = '') {
  const diffs = [];
  for (const k of Object.keys(exp)) {
    const kk = prefix ? `${prefix}.${k}` : k;
    const e = exp[k], g = got?.[k];
    if (g === undefined) continue;
    if (typeof e === 'number' && typeof g === 'number') {
      const d = Math.abs(g - e);
      if (d > tolerance) diffs.push({ k: kk, got: g, exp: e, diff: g - e });
    } else if (typeof e === 'object' && e !== null && typeof g === 'object' && g !== null) {
      diffs.push(...compareFields(g, e, tolerance, kk));
    } else if (g !== e) {
      diffs.push({ k: kk, got: g, exp: e, diff: 'string' });
    }
  }
  return diffs;
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
