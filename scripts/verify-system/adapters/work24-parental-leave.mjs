/**
 * 고용24 — 육아휴직급여 간편 모의계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.work24.go.kr/cm/c/f/1100/selecSimulate12.do?systId=SI00000402
 *   STEP1 #rdo01_21(간편 모의계산) → 휴직 시작일 #strAllwStaDt · 종료일 #strAllwEndDt · 통상임금 #aveSal → [계산]
 *   → "귀하는 총 N원의 모성보호급여를 받으실 수 있습니다."
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   leaveMonths → 시작 2026-01-01, 종료 = 시작 + 개월 − 1일 (예: 12개월 → 2026-12-31)
 *   monthlySalary(통상임금) → #aveSal
 * 2026 급여: 1~3개월 100%(상한 250만) · 4~6개월 100%(상한 200만) · 7개월~ 80%(상한 160만) · 하한 70만
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.work24.go.kr/cm/c/f/1100/selecSimulate12.do?systId=SI00000402';
const START = '2026-01-01';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function endDateFor(startIso, months) {
  const [y, m, d] = startIso.split('-').map(Number);
  const end = new Date(y, m - 1 + months, d); // 시작 + n개월
  end.setDate(end.getDate() - 1);            // 하루 전 = 마지막 날
  return fmt(end);
}

export class Work24ParentalLeaveAdapter extends BaseAdapter {
  static id = 'work24-parental-leave';
  static gov = true;
  static url = PAGE_URL;
  static description = '고용24 육아휴직급여 간편 모의계산';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.monthlySalary) || input.monthlySalary <= 0) throw new AdapterError(this.constructor.id, 'monthlySalary 필요');
    if (!Number.isInteger(input.leaveMonths) || input.leaveMonths < 1 || input.leaveMonths > 18) throw new AdapterError(this.constructor.id, 'leaveMonths 1~18 정수 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const form = { start: START, end: endDateFor(START, input.leaveMonths), salary: Math.round(input.monthlySalary) };
    const total = await this.lookup(form);
    return { totalPay: total, source: '고용24 육아휴직급여 간편 모의계산', _ref: { form } };
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

registerAdapter(Work24ParentalLeaveAdapter);
