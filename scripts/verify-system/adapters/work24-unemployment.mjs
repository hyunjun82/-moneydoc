/**
 * 고용24(고용노동부·한국고용정보원) — 실업급여(구직급여) 간편 모의계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.work24.go.kr/cm/c/f/1100/selecSimulate.do?systId=SI00000001
 *   STEP1 수급자격 유형 라디오 #rdo03_11(상용근로자) → STEP2 #rdo03_21(간편 모의계산) → STEP3 폼
 *   #old1 퇴사 당시 만 나이 · #dspsnAt1/#dspsnAt2 장애 예/아니오 · #prd1 근로기간(개월) · #appontWorkHr1 1일 소정근로시간(1~8)
 *   #aveSal1 월간 평균임금 · [계산] 버튼 → "귀하는 총 N일 동안 총 N원의 실업급여를 받으실 수 있습니다."
 *
 * 입력 매핑 (우리 JSON → 고용24)
 *   monthlySalary → 월간 평균임금, insuredYears → 근로기간 개월 = round(연수×12), 소정근로시간 8시간(엔진 가정)
 *   isElderlyOrDisabled → 만 나이 55세(true) / 35세(false), 장애 아니오
 *
 * ⚠ 한계 (2026-09-02 실측): 이 도구는 월급이 아무리 높아도 1일 66,048원(2026 하한)으로 자른다. 즉 2025.12.23 개정
 *   고용보험법 시행령 §68(기초일액 상한 113,500원 → 구직급여 상한 68,100원)을 반영하지 않은 상태다.
 *   따라서 상한이 걸리는 케이스(1일 평균임금×60% > 66,048)는 이 어댑터로 대조하지 않는다 → AdapterError.
 *   그런 케이스는 JSON 에 lawSource(시행령 §68, 정책브리핑 2025.12)를 적고 엔진 상한 68,100원을 유지한다.
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.work24.go.kr/cm/c/f/1100/selecSimulate.do?systId=SI00000001';
const TOOL_CAP = 66048; // 고용24 간편계산이 실제로 적용하는 1일 상한 (2026-09 실측, 법령 68,100과 다름)

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export function parseResult(text) {
  const m = /귀하는 총 ([0-9,]+)일 동안 총 ([0-9,]+)원/.exec(text.replace(/\s+/g, ' '));
  return m ? { benefitDays: num(m[1]), totalBenefit: num(m[2]) } : null;
}

export class Work24UnemploymentAdapter extends BaseAdapter {
  static id = 'work24-unemployment';
  static gov = true;
  static url = PAGE_URL;
  static description = '고용24 실업급여(구직급여) 간편 모의계산 — 상용근로자';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.monthlySalary) || input.monthlySalary <= 0) throw new AdapterError(this.constructor.id, 'monthlySalary 필요');
    if (!Number.isFinite(input.insuredYears) || input.insuredYears < 0) throw new AdapterError(this.constructor.id, 'insuredYears 필요');
    const rawBenefit = Math.round(Math.round(input.monthlySalary * 3 / 90) * 0.6);
    if (rawBenefit > TOOL_CAP) throw new AdapterError(this.constructor.id, `상한 케이스(1일 ${rawBenefit}원 > ${TOOL_CAP}) — 고용24 도구가 2026 상한 68,100원을 미반영, 법령 대조 케이스`);
  }

  async calculate(input) {
    this.validateInput(input);
    const form = {
      age: input.isElderlyOrDisabled ? 55 : 35,
      disabled: false,
      months: Math.round(input.insuredYears * 12),
      hours: 8,
      salary: Math.round(input.monthlySalary),
    };
    const r = await this.lookup(form);
    if (r.benefitDays <= 0 || r.totalBenefit % r.benefitDays !== 0) throw new AdapterError(this.constructor.id, `총액이 일수로 나누어떨어지지 않음: ${r.totalBenefit}/${r.benefitDays}`);
    return {
      dailyBenefit: r.totalBenefit / r.benefitDays,
      benefitDays: r.benefitDays,
      totalBenefit: r.totalBenefit,
      source: '고용24 실업급여 간편 모의계산',
      _ref: { form },
    };
  }

  async lookup(form) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const ctx = await browser.newContext({
        locale: 'ko-KR',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
        viewport: { width: 1400, height: 1000 },
      });
      const p = await ctx.newPage();
      p.setDefaultTimeout(this.constructor.playwrightOptions.timeout);
      const dialogs = [];
      p.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
      const res = await p.goto(PAGE_URL, { waitUntil: 'load' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (고용24 다운)`);
      await p.waitForSelector('#rdo03_11', { state: 'attached' });
      await sleep(1500);
      await p.click('#rdo03_11', { force: true }); await sleep(1200);
      await p.click('#rdo03_21', { force: true });
      await p.waitForSelector('#aveSal1', { state: 'visible' });
      // 입력칸에 마스크가 걸려 있어 값이 잘리는 경우가 있다 → 채운 뒤 되읽어 다를 때 타이핑으로 재입력 (최대 3회)
      const readVal = (sel) => p.evaluate((q) => String(document.querySelector(q).value), sel);
      const fillSure = async (sel, v) => {
        for (let k = 0; k < 3; k++) {
          await p.fill(sel, String(v)); await p.press(sel, 'Tab'); await sleep(400);
          if (num(await readVal(sel)) === v) return;
          await p.click(sel, { clickCount: 3 }); await p.keyboard.press('Backspace'); await p.keyboard.type(String(v), { delay: 40 }); await p.press(sel, 'Tab'); await sleep(400);
          if (num(await readVal(sel)) === v) return;
        }
        throw new AdapterError(this.constructor.id, `입력 반영 불일치 ${sel}: 화면 ${await readVal(sel)} ≠ ${v}`);
      };
      await fillSure('#old1', form.age);
      await p.click(form.disabled ? '#dspsnAt1' : '#dspsnAt2', { force: true });
      await fillSure('#prd1', form.months);
      await p.selectOption('#appontWorkHr1', String(form.hours));
      await fillSure('#aveSal1', form.salary);
      await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.offsetParent !== null && x.textContent.trim() === '계산'); if (b) b.click(); });
      // 이 사이트는 page.evaluate/waitForFunction 의 불리언·객체 반환이 깨진다 → 본문 문자열을 받아 Node 쪽에서 판정
      let text = null;
      for (let k = 0; k < 20 && !text; k++) {
        await sleep(1000);
        const t = String(await p.evaluate(() => document.body.innerText));
        if (/귀하는 총 [0-9,]+일 동안 총 [0-9,]+원/.test(t.replace(/\s+/g, ' '))) text = t;
        else if (k === 8) await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.offsetParent !== null && x.textContent.trim() === '계산'); if (b) b.click(); });
      }
      if (!text) throw new AdapterError(this.constructor.id, `결과가 표시되지 않음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      const parsed = parseResult(text);
      if (!parsed) throw new AdapterError(this.constructor.id, '결과 파싱 실패');
      return parsed;
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(Work24UnemploymentAdapter);
