/**
 * 고용노동부 — 퇴직금 계산기 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.moel.go.kr/retirementpayCal.do (팝업용 단독 페이지, 로그인 불필요)
 *   입사일 #syear/#smon/#sday · 퇴직일 #eyear/#emon/#eday → [평균임금계산기간보기] setDate()
 *   → 퇴직 전 3개월 구간 4행 #fymd{i}/#tymd{i}/#cntday{i} 자동 생성 → 행별 기본급 #basic{i}, 기타수당 #bonus{i}
 *   연간상여금 #yy_pay, 연차수당 #yy_pay2 → [평균임금계산] avrPayCal() → [퇴직금계산] calRet()
 *   결과: #sumday(일수) #basicSum #etcSum #totalBunus(3개월 임금총액) #dd_pay1(1일 평균임금) #dd_pay3(퇴직금)
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   hireDate/retireDate → 날짜 셀렉트. monthlySalary(월 기본급) → 구간별 기본급: 온전한 달은 월급 그대로,
 *   부분 달은 round(월급 × 일수 / 그 달 일수) — 엔진 calc_severance 와 같은 규칙. 기타수당 0.
 *   annualBonus → #yy_pay, unusedAnnualLeavePay → #yy_pay2 (계산기가 3/12 를 반영)
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.moel.go.kr/retirementpayCal.do';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);
const numF = (s) => parseFloat(String(s).replace(/[^0-9.]/g, ''));

export class MoelSeveranceAdapter extends BaseAdapter {
  static id = 'moel-severance';
  static gov = true;
  static url = PAGE_URL;
  static description = '고용노동부 퇴직금 계산기';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.hireDate || '') || !/^\d{4}-\d{2}-\d{2}$/.test(input.retireDate || '')) throw new AdapterError(this.constructor.id, 'hireDate/retireDate (YYYY-MM-DD) 필요');
    if (!Number.isFinite(input.monthlySalary) || input.monthlySalary < 0) throw new AdapterError(this.constructor.id, 'monthlySalary 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const form = {
      hire: input.hireDate.split('-').map(Number),
      retire: input.retireDate.split('-').map(Number),
      monthly: Math.round(input.monthlySalary),
      annualBonus: Math.round(input.annualBonus || 0),
      leavePay: Math.round(input.unusedAnnualLeavePay || 0),
    };
    const r = await this.lookup(form);
    return {
      termDays: r.termDays,
      sumday: r.sumday,
      threeMonthTotal: r.totalPay,
      avgDailyWage: r.avgDailyWage,
      severance: r.severance,
      source: '고용노동부 퇴직금 계산기',
      _ref: { form, rows: r.rows },
    };
  }

  async lookup(form) {
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
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (고용노동부 다운)`);
      await p.waitForSelector('#syear', { state: 'visible' });
      await sleep(800);
      const sel = async (id, v) => p.selectOption('#' + id, String(v));
      await sel('syear', form.hire[0]); await sel('smon', form.hire[1]); await sel('sday', form.hire[2]);
      await sel('eyear', form.retire[0]); await sel('emon', form.retire[1]); await sel('eday', form.retire[2]);
      await p.evaluate(() => setDate()); await sleep(1200);
      const termDays = num(await p.inputValue('#termDays'));
      if (!Number.isFinite(termDays)) throw new AdapterError(this.constructor.id, `재직일수 미계산${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      if (termDays < 365) {
        return { termDays, sumday: 0, totalPay: 0, avgDailyWage: 0, severance: 0, rows: [] };
      }
      const rows = await p.evaluate(() => [1, 2, 3, 4].map((i) => ({ i, f: document.querySelector('#fymd' + i).value, cnt: document.querySelector('#cntday' + i).value })));
      const maxDay = (yy, mm) => new Date(yy, mm, 0).getDate();
      for (const r of rows) {
        const cnt = parseInt(r.cnt || '0', 10); if (!cnt) continue;
        const [yy, mm] = r.f.split(/[.\-/]/).map(Number);
        const md = maxDay(yy, mm);
        const basic = cnt === md ? form.monthly : Math.round(form.monthly * cnt / md);
        await p.fill('#basic' + r.i, String(basic)); await p.press('#basic' + r.i, 'Tab');
        await p.fill('#bonus' + r.i, '0'); await p.press('#bonus' + r.i, 'Tab');
        r.basic = basic;
      }
      await p.fill('#yy_pay', String(form.annualBonus)); await p.press('#yy_pay', 'Tab');
      await p.fill('#yy_pay2', String(form.leavePay)); await p.press('#yy_pay2', 'Tab');
      await p.evaluate(() => avrPayCal()); await sleep(1000);
      await p.evaluate(() => calRet()); await sleep(1200);
      const out = await p.evaluate(() => ({ sumday: document.querySelector('#sumday').value, total: document.querySelector('#totalBunus').value, avr: document.querySelector('#dd_pay1').value, retire: document.querySelector('#dd_pay3').value }));
      const severance = num(out.retire);
      if (!Number.isFinite(severance)) throw new AdapterError(this.constructor.id, `퇴직금 미계산${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      return { termDays, sumday: num(out.sumday), totalPay: num(out.total), avgDailyWage: numF(out.avr), severance, rows };
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(MoelSeveranceAdapter);
