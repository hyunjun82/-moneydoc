#!/usr/bin/env node
/**
 * 자가개선기 (Dreaming 식)
 *
 * verify-3way.mjs가 FAIL 보고한 케이스에 대해:
 *   1. govExpected 값을 정답으로 잡고
 *   2. formula-search.mjs의 후보 산식들을 차례로 시도
 *   3. govExpected와 일치하는 산식을 찾으면 결과 출력 (산식 ID + diff)
 *   4. (선택) engine.js에 패치 제안 생성
 *
 * 사용법:
 *   node scripts/verify-system/auto-fix.mjs --calc=loan-amortization
 *   node scripts/verify-system/auto-fix.mjs --category=loan
 *
 * 출력: reports/{ts}-autofix-{label}.md (사람이 검토 후 적용)
 */

import { loadAllCalculators, loadByCategory, loadBySlug } from './core/case-loader.mjs';
import { Reporter } from './core/reporter.mjs';
import { findMatchingFormula, FORMULA_CANDIDATES } from './core/formula-search.mjs';

const args = parseArgs(process.argv.slice(2));

function main() {
  const calcs = pickCalcs(args);
  const reporter = new Reporter(`autofix-${args.calc || args.category || 'all'}`);

  for (const calc of calcs) {
    if (calc.category !== 'loan') {
      // 현재는 대출 카테고리만 후보 산식 정의됨 (확장 가능)
      continue;
    }

    for (const c of calc.cases) {
      const mode = c.input.mode;
      if (!FORMULA_CANDIDATES[mode]) continue;

      const govExpected = c.govSource?.govExpected || c.expected;
      if (!govExpected) continue;

      const search = findMatchingFormula(mode, c.input, govExpected, 0);
      if (search.winner) {
        console.log(`✅ ${calc.slug} ${c.name}: 일치 산식 = "${search.winner.id}"`);
        reporter.add({
          status: 'pass', calc: calc.slug, case: c.name,
          detail: `매칭 산식: ${search.winner.id} (${search.winner.label})`,
        });
      } else {
        console.log(`❌ ${calc.slug} ${c.name}: 어떤 후보 산식도 일치 안 함`);
        const diffs = search.all.map(r => `${r.id}: monthly Δ${(r.got.monthly || 0) - (govExpected.monthly || 0)}, totalInterest Δ${(r.got.totalInterest || 0) - (govExpected.totalInterest || 0)}`);
        reporter.add({
          status: 'fail', calc: calc.slug, case: c.name,
          detail: '후보 산식 모두 불일치 — 새 후보 추가 필요',
          diffs,
        });
      }
    }
  }

  const saved = reporter.save();
  console.log(`\n📄 ${saved.md}`);
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

main();
