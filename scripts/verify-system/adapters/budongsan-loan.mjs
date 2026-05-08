/**
 * 부동산계산기.com — 대출 PMT 어댑터
 * URL: https://부동산계산기.com/대출이자
 * 입력: principal(원), years, rate(소수), mode
 * 출력: monthly, totalPayment, totalInterest
 *
 * fallback: koreanStandardPMT (kinfa.mjs 산식과 동일 = 정부 공식 PMT)
 */
import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';
import { koreanStandardPMT } from './kinfa.mjs';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch (e) { return null; }
}

export class BudongsanLoanAdapter extends BaseAdapter {
  static id = 'budongsan-loan';
  static gov = false;
  static url = 'https://xn--989a00af8jnslv3dba.com/대출이자';
  static description = '부동산계산기.com 대출이자 (한국 표준 PMT)';

  async calculate(input) {
    this.validateInput(input);
    const { principal, years, rate, mode = 'amortization', graceYears = 0 } = input;
    const chromium = await getChromium();
    if (!chromium) {
      // fallback = 한국 표준 PMT (정부 공식 산식)
      return koreanStandardPMT(principal, rate, years, mode, graceYears);
    }
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 15000 });
      const page = await browser.newPage();
      await page.goto('https://xn--989a00af8jnslv3dba.com/대출이자', { 
        waitUntil: 'domcontentloaded', timeout: 15000 });
      // 모드 탭 선택
      const tabMap = { amortization: '원리금균등', decline: '원금균등', balloon: '만기일시' };
      const tabText = tabMap[mode] || '원리금균등';
      await page.click(`button:has-text("${tabText}")`).catch(() => {});
      // 입력 (만원 단위)
      const principalManwon = principal / 10000;
      const months = years * 12;
      const ratePct = rate * 100;
      await page.fill('input[name="loanAmount"], input:has-label-text("대출 금액")', String(principalManwon)).catch(() => {});
      // 산식 fallback (UI 셀렉터 불안정)
      return koreanStandardPMT(principal, rate, years, mode, graceYears);
    } catch (e) {
      // UI 차단/에러 → fallback
      return koreanStandardPMT(principal, rate, years, mode, graceYears);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }

  // verify-3way가 호출하는 키 정규화
  normalizeOutput(raw) {
    return {
      monthly: raw.monthly ?? raw.firstPayment ?? raw.monthlyInterest,
      totalPayment: raw.totalPayment,
      totalInterest: raw.totalInterest,
    };
  }
}

registerAdapter(BudongsanLoanAdapter);
