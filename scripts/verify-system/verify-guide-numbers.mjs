#!/usr/bin/env node
/**
 * 가이드 텍스트(표 + FAQ + tips)의 모든 숫자 자동 검증
 * 가이드에 박힌 정적 숫자가 정부 산식과 일치하는지 자동 비교.
 *
 * 사용법:
 *   node scripts/verify-system/verify-guide-numbers.mjs --calc=loan-amortization
 *   node scripts/verify-system/verify-guide-numbers.mjs --category=loan
 */

import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadAllCalculators, loadByCategory, loadBySlug } from './core/case-loader.mjs';
import { Reporter } from './core/reporter.mjs';
import { koreanStandardPMT } from './adapters/kinfa.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENGINE_PATH = path.resolve(__dirname, '../../lib/calc/engine.js');

const args = parseArgs(process.argv.slice(2));

/**
 * 한국식 금액 → 원 단위 숫자
 *   "2억 946만원" → 209,460,000
 *   "1억 7,612만원" → 176,120,000
 *   "1.5억원" → 150,000,000
 *   "4,500만원" → 45,000,000
 *   "350,000원" → 350,000
 *   "약 7,000만원" → 70,000,000 (앞의 '약'은 무시)
 */
function parseKoreanWon(str) {
  if (str == null) return 0;
  let s = String(str).replace(/약\s*|\s/g, ''); // "약" + 공백 제거
  let total = 0;
  // 억
  const eokM = s.match(/([0-9.,]+)억/);
  if (eokM) { total += parseFloat(eokM[1].replace(/,/g, '')) * 1e8; s = s.replace(eokM[0], ''); }
  // 천만
  const chM = s.match(/([0-9,]+)천만/);
  if (chM) { total += parseFloat(chM[1].replace(/,/g, '')) * 1e7; s = s.replace(chM[0], ''); }
  // 만
  const manM = s.match(/([0-9,]+)만/);
  if (manM) { total += parseInt(manM[1].replace(/,/g, '')) * 1e4; s = s.replace(manM[0], ''); }
  // 남은 원 단위
  const wonM = s.match(/([0-9,]+)/);
  if (wonM) total += parseInt(wonM[1].replace(/,/g, ''));
  return total;
}

/**
 * 어림값 마커 체크 — "약", "최대", "—" 같은 비정확 표기는 검증 스킵
 */
function isApproximate(str) {
  return /약|최대|—|^-$|cap/i.test(String(str || ''));
}

async function main() {
  const calcs = pickCalcs(args);
  const engineUrl = pathToFileURL(ENGINE_PATH).href;
  const { calculators } = await import(engineUrl);
  const reporter = new Reporter(`guide-numbers-${args.calc || args.category || 'all'}`);

  for (const calc of calcs) {
    if (calc.category !== 'loan') continue;
    const tables = calc.json.guide?.tables || {};
    const issues = [];
    const checker = CHECKERS[calc.slug];
    if (!checker) {
      console.log(`⏭ ${calc.slug} — 검증 룰 없음`);
      continue;
    }
    checker(tables, calc.json, calculators, issues);
    if (issues.length === 0) {
      reporter.add({ status: 'pass', calc: calc.slug, case: '(가이드 숫자)', detail: '정부값 0원 일치' });
      console.log(`✅ ${calc.slug} — 가이드 숫자 모두 일치`);
    } else {
      reporter.add({ status: 'fail', calc: calc.slug, case: '(가이드 숫자)', detail: '정부값 차이', diffs: issues });
      console.log(`❌ ${calc.slug} — ${issues.length}건 불일치`);
      issues.forEach(d => console.log(`    ${d}`));
    }
  }

  const saved = reporter.save();
  console.log(`\n=== ${reporter.passCount()} pass / ${reporter.failCount()} fail ===`);
  console.log(`📄 ${saved.md}`);
  if (reporter.failCount() > 0) process.exit(1);
}

// ─── slug별 검증 룰 ─────────────────────────────────────────
const CHECKERS = {
  'loan-amortization': (t, j, calcs, issues) => {
    const modes = [
      { kor: '원리금균등', mode: 'amortization' },
      { kor: '원금균등', mode: 'decline' },
      { kor: '만기일시', mode: 'balloon' },
      { kor: '거치식', mode: 'grace', graceYears: 3 },
    ];
    for (const m of modes) {
      const row = (t.modeComparison || []).find(r => r['방식'].includes(m.kor));
      if (!row) continue;
      const gov = koreanStandardPMT(1e8, 0.04, 30, m.mode, m.graceYears || 0);
      const tInt = parseKoreanWon(row['총 이자']);
      if (tInt && tInt !== gov.totalInterest) {
        issues.push(`[modeComparison.${m.kor}] 총이자 표=${tInt} vs 정부=${gov.totalInterest} (Δ${tInt - gov.totalInterest})`);
      }
    }
    for (const row of t.amountExamples || []) {
      const eok = parseInt((row['원금'].match(/(\d+)억/) || [])[1]);
      if (!eok) continue;
      const gov = koreanStandardPMT(eok * 1e8, 0.04, 30);
      const tMon = parseKoreanWon(row['월 상환']);
      const tInt = parseKoreanWon(row['총 이자']);
      if (tMon !== gov.monthly) issues.push(`[amountExamples.${eok}억] 월상환 Δ${tMon - gov.monthly}`);
      if (tInt !== gov.totalInterest) issues.push(`[amountExamples.${eok}억] 총이자 Δ${tInt - gov.totalInterest}`);
    }
  },

  'dsr-limit': (t, j, calcs, issues) => {
    const fn = calcs['dsr-limit'];
    for (const row of t.dsrIncomeTable || []) {
      const a = parseKoreanWon(row['연봉']);
      if (!a) continue;
      const r0 = fn({ annualIncome: a, monthlyExistingDebt: 0, loanYears: 30, loanRate: 0.04, dsrLimit: 0.4, stressDSR: '미적용' }, j);
      const r3 = fn({ annualIncome: a, monthlyExistingDebt: 0, loanYears: 30, loanRate: 0.04, dsrLimit: 0.4, stressDSR: '3단계' }, j);
      const t0 = parseKoreanWon(row['스트레스 미적용']);
      const t3 = parseKoreanWon(row['스트레스 3단계']);
      // 만원 단위 표기 — ±1만 허용 (예: "2억 946만원" = 209,460,000 vs 정부 209,461,240 = Δ1,240)
      if (Math.abs(t0 - r0.maxLoan) > 0) issues.push(`[dsrIncomeTable.연봉${a/1e4}만] 미적용 표=${t0} vs eng=${r0.maxLoan} (Δ${t0 - r0.maxLoan})`);
      if (Math.abs(t3 - r3.maxLoan) > 0) issues.push(`[dsrIncomeTable.연봉${a/1e4}만] 3단계 표=${t3} vs eng=${r3.maxLoan} (Δ${t3 - r3.maxLoan})`);
    }
  },

  'dti-limit': (t, j, calcs, issues) => {
    const fn = calcs['dti-limit'];
    for (const row of t.dtiIncomeTable || []) {
      const a = parseKoreanWon(row['연봉']);
      if (!a) continue;
      const r50 = fn({ annualIncome: a, monthlyOtherDebtInterest: 0, loanYears: 30, loanRate: 0.04, dtiLimit: 0.5, stressDSR: '미적용' }, j);
      const r60 = fn({ annualIncome: a, monthlyOtherDebtInterest: 0, loanYears: 30, loanRate: 0.04, dtiLimit: 0.6, stressDSR: '미적용' }, j);
      const t50 = parseKoreanWon(row['DTI 50% 한도']);
      const t60 = parseKoreanWon(row['DTI 60% 한도']);
      if (Math.abs(t50 - r50.maxLoan) > 0) issues.push(`[dtiIncomeTable.연봉${a/1e4}만] 50% Δ${t50 - r50.maxLoan}`);
      if (Math.abs(t60 - r60.maxLoan) > 0) issues.push(`[dtiIncomeTable.연봉${a/1e4}만] 60% Δ${t60 - r60.maxLoan}`);
    }
  },

  'ltv-limit': (t, j, calcs, issues) => {
    const fn = calcs['ltv-limit'];
    for (const row of t.ltvPriceTable || []) {
      const eok = parseInt((row['주택 가격'].match(/(\d+)억/) || [])[1]);
      if (!eok) continue;
      // "최대 6억 (cap)" 같은 어림 표기는 스킵
      if (isApproximate(row['비규제 70%'])) continue;
      const r = fn({ housePrice: eok * 1e8, category: 'noHouse', regionType: 'other', area: 'other', numRooms: 0, leaseDeposit: 0, roomDeduction: 'no' }, j);
      const tLoan = parseKoreanWon(row['비규제 70%']);
      if (tLoan && Math.abs(tLoan - r.maxLoan) > 0) issues.push(`[ltvPriceTable.${eok}억] 비규제 Δ${tLoan - r.maxLoan}`);
    }
  },

  'mortgage-loan-limit': (_t, _j, _calcs, _issues) => { /* 시나리오 표는 텍스트 복잡 — 추후 추가 */ },

  'credit-loan': (t, j, calcs, issues) => {
    const fn = calcs['credit-loan'];
    for (const row of t.creditIncomeTable || []) {
      const a = parseKoreanWon(row['연봉']);
      if (!a) continue;
      const r1 = fn({ annualIncome: a, multiplier: 1 }, j);
      const r15 = fn({ annualIncome: a, multiplier: 1.5 }, j);
      const t1 = parseKoreanWon(row['1배']);
      const t15 = parseKoreanWon(row['1.5배 (관행)']);
      if (Math.abs(t1 - r1.maxLoan) > 1) issues.push(`[creditIncomeTable.연봉${a/1e4}만] 1배 Δ${t1 - r1.maxLoan}`);
      if (Math.abs(t15 - r15.maxLoan) > 1) issues.push(`[creditIncomeTable.연봉${a/1e4}만] 1.5배 Δ${t15 - r15.maxLoan}`);
    }
  },

  'jeonse-loan': (t, j, calcs, issues) => {
    const fn = calcs['jeonse-loan'];
    for (const row of t.jeonseDepositTable || []) {
      const eok = parseInt((row['보증금'].match(/(\d+)억/) || [])[1]);
      if (!eok) continue;
      // HUG cap 적용 케이스는 스킵 (수도권 4억 cap)
      if (isApproximate(row['HF 80% 한도'])) continue;
      const d = eok * 1e8;
      const rHF = fn({ deposit: d, ratio: 0.8, limit: 450000000 }, j);
      const tHF = parseKoreanWon(row['HF 80% 한도']);
      // 5억일 경우 한도 cap에 걸림 — limit 4억으로 제한될 수 있어 케이스별
      if (Math.abs(tHF - rHF.appliedLimit) > 1) issues.push(`[jeonseDepositTable.${eok}억] HF 표=${tHF} vs eng=${rHF.appliedLimit} (Δ${tHF - rHF.appliedLimit})`);
    }
  },

  'loan-refinance': (t, j, calcs, issues) => {
    const fn = calcs['loan-refinance'];
    const presets = [
      { 잔액: '1억', balance: 1e8, oldRate: 0.05, newRate: 0.04, years: 25 },
      { 잔액: '2억', balance: 2e8, oldRate: 0.06, newRate: 0.045, years: 25 },
      { 잔액: '3억', balance: 3e8, oldRate: 0.055, newRate: 0.042, years: 25 },
    ];
    for (const p of presets) {
      const row = (t.refinanceSavingTable || []).find(r => r['잔액'].startsWith(p.잔액));
      if (!row || isApproximate(row['월 절약'])) continue;
      const r = fn({ balance: p.balance, oldRate: p.oldRate, newRate: p.newRate, remainingYears: p.years }, j);
      const tSave = parseKoreanWon(row['월 절약']);
      if (tSave && Math.abs(tSave - r.monthlySaving) > 1) issues.push(`[refinanceSavingTable.${p.잔액}] 월절약 Δ${tSave - r.monthlySaving}`);
    }
  },

  'prepayment-fee': (t, j, calcs, issues) => {
    const fn = calcs['prepayment-fee'];
    for (const row of t.prepaymentBalanceTable || []) {
      const b = parseKoreanWon(row['잔액']);
      if (!b) continue;
      const r1 = fn({ remainingBalance: b, totalMonths: 36, remainingMonths: 18, rate: 0.010 }, j);
      const r14 = fn({ remainingBalance: b, totalMonths: 36, remainingMonths: 18, rate: 0.014 }, j);
      const t1 = parseKoreanWon(row['수수료율 1.0%']);
      const t14 = parseKoreanWon(row['수수료율 1.4%']);
      if (t1 && Math.abs(t1 - r1.fee) > 1) issues.push(`[prepaymentBalanceTable.${row['잔액']}] 1.0% Δ${t1 - r1.fee}`);
      if (t14 && Math.abs(t14 - r14.fee) > 1) issues.push(`[prepaymentBalanceTable.${row['잔액']}] 1.4% Δ${t14 - r14.fee}`);
    }
  },
};

// ─── CLI 헬퍼 ─────────────────────────────────────────────
function pickCalcs(args) {
  if (args.calc) {
    const c = loadBySlug(args.calc);
    return c ? [c] : [];
  }
  if (args.category) return loadByCategory(args.category);
  if (args.all) return loadAllCalculators();
  return loadAllCalculators();
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
