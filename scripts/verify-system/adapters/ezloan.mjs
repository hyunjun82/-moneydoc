/**
 * 이지론 (ezloan.io) 어댑터 — 대출 PMT (4가지 모드)
 * 한국 표준과 ±10원 오차 가능 → gov=false (대형 표준), 토러런스 ±100
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch (e) {
    throw new AdapterError('ezloan', 'playwright not installed (run: npm i -D playwright && npx playwright install chromium)');
  }
}

const MODE_INDEX = {
  amortization: 0,
  decline: 1,
  balloon: 2,
  grace: 0,
};

export class EzloanAdapter extends BaseAdapter {
  static id = 'ezloan';
  static gov = false;
  static url = 'https://www.ezloan.io/calc/loan';
  static description = '이지론 대출이자 계산기 (PMT 4가지 모드)';

  async calculate(input) {
    this.validateInput(input);
    const { principal, years, rate, mode = 'amortization', graceYears = 0 } = input;

    if (mode === 'balloon') {
      const monthlyInterest = Math.round(principal * rate / 12);
      const totalInterest = monthlyInterest * years * 12;
      return { monthlyInterest, totalInterest, totalPayment: principal + totalInterest };
    }

    const months = years * 12;
    const ratePct = (rate * 100).toFixed(3).replace(/\.?0+$/, '');
    const graceMonths = graceYears * 12;
    const url = `https://www.ezloan.io/calc/loan/${graceMonths}/${principal}/${ratePct}/${months}/0`;

    let browser;
    try {
      const chromium = await getChromium();
      browser = await chromium.launch(BaseAdapter.playwrightOptions);
      const ctx = await browser.newContext();
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('text=상환해야 해요', { timeout: 15000 }).catch(() => null);
      const text = await page.textContent('body');
      const totalMatch = text.match(/총\s*([0-9억만,\s]+)\s*원\s*을 상환/);
      const interestMatch = text.match(/(?:예상\s*)?이자\s*금액(?:은|이)?\s*([0-9억만,\s]+)\s*원/);
      const totalPayment = parseKoreanWon(totalMatch?.[1] || '');
      const totalInterest = parseKoreanWon(interestMatch?.[1] || '');
      return { totalPayment, totalInterest, principal, url };
    } catch (e) {
      throw new AdapterError(this.constructor.id, 'fetch failed', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

/**
 * 한국식 금액 문자열 파서
 *   "1억 7,186만 9,514" → 171869514
 *   "7,186만 9,514"     → 71869514
 */
function parseKoreanWon(str) {
  if (!str) return null;
  const cleaned = str.replace(/\s|,/g, '');
  let total = 0;
  let rest = cleaned;
  const eokMatch = rest.match(/^(\d+)억/);
  if (eokMatch) {
    total += parseInt(eokMatch[1]) * 100000000;
    rest = rest.slice(eokMatch[0].length);
  }
  const manMatch = rest.match(/^(\d+)만/);
  if (manMatch) {
    total += parseInt(manMatch[1]) * 10000;
    rest = rest.slice(manMatch[0].length);
  }
  if (rest && /^\d+$/.test(rest)) {
    total += parseInt(rest);
  }
  return total || null;
}

registerAdapter(EzloanAdapter);
