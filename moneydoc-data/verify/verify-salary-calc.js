#!/usr/bin/env node
/**
 * 연봉 실수령액 계산기 산식 검증
 * - JSON의 tables/constants를 읽어 정부 산식 그대로 적용
 * - 5개 verification.cases의 expected와 매칭
 * - 모두 일치하면 PASS
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'calculators', 'tax', 'salary-net-pay.json');
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const C = data.constants;
const T = data.tables;

// ───────── lookup helpers ─────────
function lookupBracket(brackets, value) {
  for (const b of brackets) {
    if (b.upperBound === null || value <= b.upperBound) return b;
  }
  return brackets[brackets.length - 1];
}

function calcEarnedIncomeDeduction(annual) {
  const b = lookupBracket(T.earnedIncomeDeduction.brackets, annual);
  let result = b.fixed + (annual - b.lowerBound) * b.rate;
  if (T.earnedIncomeDeduction.limit) {
    result = Math.min(result, T.earnedIncomeDeduction.limit);
  }
  return result;
}

function calcTaxBeforeCredit(taxableIncome) {
  const b = lookupBracket(T.incomeTaxBrackets.brackets, taxableIncome);
  return taxableIncome * b.rate - b.progressiveDeduction;
}

function calcEarnedIncomeCreditRaw(taxBeforeCredit) {
  // 공제 산식: 130만 이하 산출세액의 55%, 초과분은 71.5만 + (초과 × 30%)
  const comp = T.earnedIncomeTaxCredit.computation;
  for (const c of comp) {
    if (c.salaryThreshold === null || taxBeforeCredit <= c.salaryThreshold) {
      return c.fixed + (taxBeforeCredit - c.lowerSalary) * c.rate;
    }
  }
  return 0;
}

function calcEarnedIncomeCreditLimit(annual) {
  for (const l of T.earnedIncomeTaxCredit.limits) {
    if (l.totalSalaryUpper === null || annual <= l.totalSalaryUpper) {
      if (l.type === 'fixed') return l.amount;
      const v = l.base - (annual - l.subtractAfter) * l.subtractRate;
      return Math.max(l.minLimit, v);
    }
  }
  return 0;
}

function calcChildCredit(kids) {
  const amounts = T.childTaxCredit.amounts;
  const found = amounts.find(a => a.kids === kids);
  if (found) return found.credit;
  // kids > 3: 950000 + (kids - 3) * 400000
  const last = amounts[amounts.length - 1];
  return last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
}

// ───────── main calc ─────────
function calculate(input) {
  const { annual, dependents, kids } = input;

  const monthly = annual / 12;
  const npBase = Math.min(monthly, C.NP_CAP_MONTHLY);
  const nationalPension = Math.round(npBase * C.NP_RATE);
  const healthInsurance = Math.round(monthly * C.HI_RATE);
  const longTermCare = Math.round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = Math.round(monthly * C.EI_RATE);
  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

  const earnedIncomeDeduction = calcEarnedIncomeDeduction(annual);
  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = Math.max(0, annual - earnedIncomeDeduction - personalDeduction);
  const taxBeforeCredit = calcTaxBeforeCredit(taxableIncome);
  const earnedIncomeCreditRaw = calcEarnedIncomeCreditRaw(taxBeforeCredit);
  const earnedIncomeCreditLimit = calcEarnedIncomeCreditLimit(annual);
  const earnedIncomeCredit = Math.min(earnedIncomeCreditRaw, earnedIncomeCreditLimit);
  const childCredit = calcChildCredit(kids);
  const annualIncomeTax = Math.max(0, taxBeforeCredit - earnedIncomeCredit - childCredit);
  const monthlyIncomeTax = Math.round(annualIncomeTax / 12);
  const monthlyLocalTax = Math.round(monthlyIncomeTax * C.LOCAL_TAX_RATE);
  const totalDeduction = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
  const netMonthly = Math.round(monthly - totalDeduction);
  const deductRatePct = +(totalDeduction / monthly * 100).toFixed(1);

  return {
    grossMonthly: Math.round(monthly),
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    totalInsurance,
    monthlyIncomeTax,
    monthlyLocalTax,
    totalDeduction,
    netMonthly,
    deductRatePct,
    _intermediate: {
      earnedIncomeDeduction,
      personalDeduction,
      taxableIncome,
      taxBeforeCredit,
      earnedIncomeCreditRaw,
      earnedIncomeCreditLimit,
      earnedIncomeCredit,
      childCredit,
      annualIncomeTax
    }
  };
}

// ───────── run verification ─────────
console.log('═══════════════════════════════════════════════════════');
console.log(' ' + data.title + ' — 산식 검증');
console.log(' 출처: ' + data.source.primary.agency + ' / ' + data.source.primary.document);
console.log('═══════════════════════════════════════════════════════\n');

let passed = 0, failed = 0;
const TOL = 2; // 반올림 오차 허용 ±2원

for (const c of data.verification.cases) {
  console.log('▶ ' + c.name);
  console.log('  Input: 연봉 ' + c.input.annual.toLocaleString() + '원, 부양 ' + c.input.dependents + '명, 자녀 ' + c.input.kids + '명');
  const actual = calculate(c.input);

  let caseOk = true;
  const diffs = [];

  // intermediate 검증
  if (c.intermediate) {
    for (const k of Object.keys(c.intermediate)) {
      const exp = c.intermediate[k];
      const act = actual._intermediate[k];
      if (act === undefined) continue;
      const diff = Math.abs(exp - act);
      if (diff > TOL) {
        caseOk = false;
        diffs.push(`  ✗ [intermediate] ${k}: expected ${exp.toLocaleString()}, actual ${Math.round(act).toLocaleString()} (diff ${(act - exp).toLocaleString()})`);
      }
    }
  }

  // expected 검증
  for (const k of Object.keys(c.expected)) {
    const exp = c.expected[k];
    const act = actual[k];
    if (act === undefined) continue;
    if (k === 'deductRatePct') {
      const diff = Math.abs(exp - act);
      if (diff > 0.2) {
        caseOk = false;
        diffs.push(`  ✗ ${k}: expected ${exp}%, actual ${act}%`);
      }
      continue;
    }
    const diff = Math.abs(exp - act);
    if (diff > TOL) {
      caseOk = false;
      diffs.push(`  ✗ ${k}: expected ${exp.toLocaleString()}, actual ${act.toLocaleString()} (diff ${(act - exp).toLocaleString()})`);
    }
  }

  if (caseOk) {
    console.log('  ✓ PASS');
    console.log('  → 월 실수령 ' + actual.netMonthly.toLocaleString() + '원, 공제율 ' + actual.deductRatePct + '%');
    passed++;
  } else {
    console.log('  ✗ FAIL');
    diffs.forEach(d => console.log(d));
    failed++;
  }
  console.log();
}

console.log('═══════════════════════════════════════════════════════');
console.log(` 결과: ${passed} 통과 / ${failed} 실패 / 총 ${passed + failed}`);
console.log('═══════════════════════════════════════════════════════');

process.exit(failed > 0 ? 1 : 0);
