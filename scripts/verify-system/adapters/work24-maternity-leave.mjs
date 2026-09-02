/**
 * 고용24 — 출산전후휴가급여 간편 모의계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.work24.go.kr/cm/c/f/1100/selecSimulate11.do?systId=SI00000406
 *   STEP1 #rdo01_21(간편) → 휴가 시작일 #strAllwStaDt · 종료일 #strAllwEndDt · 대규모기업여부 #mocorpbig1(예)/#mocorpbig2(아니오)
 *   · 월 소정근로시간 #strFxTm · 통상임금 #aveSal → [계산] → "귀하는 총 N원의 모성보호급여를 받으실 수 있습니다."
 *   결과는 고용보험(정부)이 지급하는 출산전후휴가급여 (사업주 부담분 제외) — 엔진 govPay 와 대조
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   isMultiple → 휴가일수 90일(단태) / 120일(다태): 시작 2026-01-01, 종료 = 시작 + 일수 − 1
 *   isSME(우선지원대상기업) → 대규모기업여부 '아니오' / 대기업 '예'
 *   monthlySalary(통상임금) → #aveSal, 월 소정근로시간 209 (주 40시간 기준, 엔진 가정)
 * 2026: 우선지원대상기업은 휴가 전 기간 정부 지급(월 상한 220만), 대규모기업은 마지막 30일(다태아 45일)만 정부 지급
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.work24.go.kr/cm/c/f/1100/selecSimulate11.do?systId=SI00000406';
const START = '2026-01-01';
const MONTHLY_HOURS = 209;

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); const x = new Date(y, m - 1, d + n); return fmt(x); };

export class Work24MaternityLeaveAdapter extends BaseAdapter {
  static id = 'work24-maternity-leave';
  static gov = true;
  static url = PAGE_URL;
  static description = '고용24 출산전후휴가급여 간편 모의계산';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.monthlySalary) || input.monthlySalary <= 0) throw new AdapterError(this.constructor.id, 'monthlySalary 필요');
    if (input.isMultiple) throw new AdapterError(this.constructor.id, '고용24 간편 모의계산은 다태아(120일) 입력이 없음 — 법령(고용보험법 §76) 대조 케이스');
  }

  async calculate(input) {
    this.validateInput(input);
    const days = input.isMultiple ? 120 : 90;
    const form = { start: START, end: addDays(START, days - 1), big: input.isSME === false, hours: MONTHLY_HOURS, salary: Math.round(input.monthlySalary), days };
    const total = await this.lookup(form);
    return { govPay: total, totalDays: days, source: '고용24 출산전후휴가급여 간편 모의계산', _ref: { form } };
  }

  async lookup(form) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const ctx = await browser.newContext({ locale: 'ko-KR', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36', viewport: { width: 1400, height: 1000 } });
      const p = await ctx.newPage();
      p.setDefaultTimeout(this.constructor.playwrightOptions.timeout);
      const dialogs = [];
      p.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
      const res = await p.goto(PAGE_URL, { waitUntil: 'load' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (고용24 다운)`);
      await p.waitForSelector('#rdo01_21', { state: 'attached' }); await sleep(1500);
      await p.click('#rdo01_21', { force: true });
      await p.waitForSelector('#aveSal', { state: 'visible' });
      const readVal = (sel) => p.evaluate((q) => String(document.querySelector(q).value), sel);
      const fillSure = async (sel, v, cmp) => {
        for (let k = 0; k < 3; k++) {
          await p.fill(sel, String(v)); await p.press(sel, 'Tab'); await sleep(400);
          if (cmp(await readVal(sel))) return;
        }
        throw new AdapterError(this.constructor.id, `입력 반영 불일치 ${sel}: 화면 ${await readVal(sel)} ≠ ${v}`);
      };
      await fillSure('#strAllwStaDt', form.start, (s) => s.replace(/[^0-9]/g, '') === form.start.replace(/-/g, ''));
      await fillSure('#strAllwEndDt', form.end, (s) => s.replace(/[^0-9]/g, '') === form.end.replace(/-/g, ''));
      await p.click(form.big ? '#mocorpbig1' : '#mocorpbig2', { force: true });
      await fillSure('#strFxTm', form.hours, (s) => num(s) === form.hours);
      await fillSure('#aveSal', form.salary, (s) => num(s) === form.salary);
      await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.offsetParent !== null && x.textContent.trim() === '계산'); if (b) b.click(); });
      let text = null;
      for (let k = 0; k < 20 && !text; k++) {
        await sleep(1000);
        const t = String(await p.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ');
        if (/귀하는 총 [0-9,]+원의 모성보호급여/.test(t)) text = t;
      }
      if (!text) throw new AdapterError(this.constructor.id, `결과가 표시되지 않음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      return num(/귀하는 총 ([0-9,]+)원의 모성보호급여/.exec(text)[1]);
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(Work24MaternityLeaveAdapter);
