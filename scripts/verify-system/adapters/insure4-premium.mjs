/**
 * 4대사회보험 정보연계센터 — 4대사회보험료 모의계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.4insure.or.kr/pbiz/ntcn/inscSmlCalcView.do (2026년 기준, 로그인 불필요)
 *   월 급여 #allSalAmt · 근로자수 #lbt01_01(150인 미만) … #lbt01_04 · [계산] #btnCalc (fn_allCalc)
 *   결과: 국민연금 #npsTotAmtWhol/#npsWrkrAmtWhol/#npsBizprAmtWhol, 건강보험 #nhi…, 장기요양 #nhiLngtCnvl…, 고용보험 #epi…,
 *         합계 #inscTotAmt/#wrkrTotAmt/#bizprTotAmt  (산재보험은 이 도구에 없음 → 비교 제외)
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   monthlySalary − nontaxable → 월 급여 (보수월액). 근로자수는 150인 미만(고용안정·직업능력 0.25% → 사업주 고용보험 1.15%)
 *   = 엔진 상수 EI_RATE_EMPLOYER 0.0115 와 같은 가정.
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.4insure.or.kr/pbiz/ntcn/inscSmlCalcView.do';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export class Insure4PremiumAdapter extends BaseAdapter {
  static id = 'insure4-premium';
  static gov = true;
  static url = PAGE_URL;
  static description = '4대사회보험 정보연계센터 4대사회보험료 모의계산 (150인 미만 기업)';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.monthlySalary) || input.monthlySalary <= 0) throw new AdapterError(this.constructor.id, 'monthlySalary 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const base = Math.max(0, Math.round(input.monthlySalary - (input.nontaxable || 0)));
    const r = await this.lookup(base);
    return {
      employeeNP: r.npsWrkr, employerNP: r.npsBizpr,
      employeeHI: r.nhiWrkr, employerHI: r.nhiBizpr,
      employeeLTC: r.ltcWrkr, employerLTC: r.ltcBizpr,
      employeeEI: r.epiWrkr, employerEI: r.epiBizpr,
      employeeTotal: r.wrkrTot,
      source: '4대사회보험 정보연계센터 모의계산 (2026)',
      _ref: { base, bizprTotalExclWC: r.bizprTot, grandTotalExclWC: r.inscTot },
    };
  }

  async lookup(base) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const p = await browser.newPage({ locale: 'ko-KR' });
      p.setDefaultTimeout(this.constructor.playwrightOptions.timeout);
      const dialogs = [];
      p.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
      const res = await p.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (정보연계센터 다운)`);
      await p.waitForSelector('#allSalAmt', { state: 'visible' });
      await p.click('#lbt01_01', { force: true });
      await p.fill('#allSalAmt', String(base)); await p.press('#allSalAmt', 'Tab');
      await p.click('#btnCalc');
      await p.waitForFunction(() => /[0-9]/.test(document.getElementById('inscTotAmt').value), null, { timeout: 15000 })
        .catch(() => { throw new AdapterError(this.constructor.id, `결과 미표시${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`); });
      await sleep(300);
      const v = await p.evaluate(() => {
        const g = (id) => document.getElementById(id).value;
        return { npsWrkr: g('npsWrkrAmtWhol'), npsBizpr: g('npsBizprAmtWhol'), nhiWrkr: g('nhiWrkrAmtWhol'), nhiBizpr: g('nhiBizprAmtWhol'),
          ltcWrkr: g('nhiLngtCnvlWrkrAmtWhol'), ltcBizpr: g('nhiLngtCnvlBizprAmtWhol'), epiWrkr: g('epiWrkrAmtWhol'), epiBizpr: g('epiBizprAmtWhol'),
          wrkrTot: g('wrkrTotAmt'), bizprTot: g('bizprTotAmt'), inscTot: g('inscTotAmt') };
      });
      const out = {}; for (const k of Object.keys(v)) out[k] = num(v[k]);
      if (!Number.isFinite(out.npsWrkr)) throw new AdapterError(this.constructor.id, '결과 파싱 실패');
      return out;
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(Insure4PremiumAdapter);
