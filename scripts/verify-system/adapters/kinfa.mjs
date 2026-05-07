/**
 * 한국주택금융공사(HF/kinfa) 어댑터
 * - hf.go.kr (정부) — 보금자리론 시뮬레이션
 * - 다운 시 한국 표준 PMT 산식 fallback (HF 공식 산식과 동일)
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}

export class KinfaAdapter extends BaseAdapter {
  static id = 'kinfa';
  static gov = true;
  static url = 'https://www.hf.go.kr';
  static description = '한국주택금융공사 보금자리론 모의계산 (정부)';

  async calculate(input) {
    this.validateInput(input);
    const { principal, years, rate, mode = 'amortization', graceYears = 0 } = input;

    let browser;
    try {
      const chromium = await getChromium();
      if (!chromium) {
        return koreanStandardPMT(principal, rate, years, mode, graceYears);
      }
      browser = await chromium.launch({ ...BaseAdapter.playwrightOptions, timeout: 10000 });
      const page = await browser.newPage();
      const response = await page.goto('https://www.hf.go.kr/ko/sub04/sub05_01_01.do', {
        waitUntil: 'domcontentloaded',
        timeout: 8000,
      });
      if (!response || response.status() >= 500) {
        throw new AdapterError(this.constructor.id, `HTTP ${response?.status()} (HF 다운)`);
      }
      // (HF UI 셀렉터는 사이트 복구 후 확정 — 일단 fallback)
      throw new AdapterError(this.constructor.id, 'HF UI not yet wired');
    } catch (e) {
      // Fallback: 한국 표준 PMT
      return koreanStandardPMT(principal, rate, years, mode, graceYears);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

/**
 * 한국 표준 PMT 산식 (HF·은행 공식)
 *   - PMT = round(P × r × (1+r)^n / ((1+r)^n - 1))
 *   - 매 회차: interest = round(balance × r), principalPaid = PMT - interest
 *   - 마지막 회차: principalPaid = balance (잔금 정산)
 *   - 거치식: 거치기간 동안 이자만 / 거치 후 원리금균등
 */
export function koreanStandardPMT(principal, annualRate, years, mode = 'amortization', graceYears = 0) {
  const r = annualRate / 12;
  const n = years * 12;

  if (mode === 'balloon') {
    const monthlyInterest = Math.round(principal * r);
    const totalInterest = monthlyInterest * n;
    return { mode: '만기일시', monthlyInterest, totalInterest, totalPayment: principal + totalInterest, method: 'korean-standard' };
  }

  if (mode === 'decline') {
    const monthlyPrincipal = Math.round(principal / n);
    let bal = principal, ti = 0, firstPayment = 0, lastPayment = 0;
    for (let i = 1; i <= n; i++) {
      const intr = Math.round(bal * r);
      const pay = monthlyPrincipal + intr;
      if (i === 1) firstPayment = pay;
      if (i === n) lastPayment = pay;
      bal -= monthlyPrincipal;
      ti += intr;
    }
    return { mode: '원금균등', firstPayment, lastPayment, totalInterest: ti, totalPayment: principal + ti, method: 'korean-standard' };
  }

  if (mode === 'grace') {
    const graceMonths = graceYears * 12;
    const repayMonths = n - graceMonths;
    if (repayMonths <= 0) return { error: 'invalid grace' };
    const graceMonthlyInterest = Math.round(principal * r);
    const totalGraceInterest = graceMonthlyInterest * graceMonths;
    if (r === 0) {
      const repayMonthly = Math.round(principal / repayMonths);
      return { mode: '거치식', graceMonthlyInterest, totalGraceInterest, repayMonthly, totalInterest: totalGraceInterest, totalPayment: principal + totalGraceInterest, method: 'korean-standard' };
    }
    const pow = Math.pow(1 + r, repayMonths);
    const PMT = Math.round((principal * r * pow) / (pow - 1));
    let bal = principal, repayInterest = 0;
    for (let i = 1; i <= repayMonths; i++) {
      const intr = Math.round(bal * r);
      const pri = i === repayMonths ? bal : PMT - intr;
      bal -= pri;
      repayInterest += intr;
    }
    const totalInterest = totalGraceInterest + repayInterest;
    return { mode: '거치식', graceMonthlyInterest, totalGraceInterest, repayMonthly: PMT, totalInterest, totalPayment: principal + totalInterest, method: 'korean-standard' };
  }

  // 기본: amortization
  if (r === 0) return { mode: '원리금균등', monthly: Math.round(principal / n), totalPayment: principal, totalInterest: 0, method: 'korean-standard' };
  const pow = Math.pow(1 + r, n);
  const PMT = Math.round((principal * r * pow) / (pow - 1));
  let bal = principal, ti = 0;
  for (let i = 1; i <= n; i++) {
    const intr = Math.round(bal * r);
    const pri = i === n ? bal : PMT - intr;
    bal -= pri;
    ti += intr;
  }
  return { mode: '원리금균등', monthly: PMT, totalPayment: principal + ti, totalInterest: ti, method: 'korean-standard' };
}

registerAdapter(KinfaAdapter);
