/**
 * 국민연금공단 — 예상연금 간단계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.nps.or.kr/comm/quick/getOHAH0011P0.do (비회원, 팝업 페이지)
 *   월 납입보험료 #ntpsIsfe → [예상연금액 조회하기] #btnSearch
 *   → "소득기준은 N원이며 … 노령연금 (매월 지급예상액) 10년 가입 N 15년 가입 N 20년 가입 N … 40년 가입 N"
 *   공단 산식(화면 안내): (1.29(A+B)×P21/P)×(1+0.05n/12)×지급률, 2026 A값 3,193,511원, 2026.1 최초 가입 가정
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   avgIncome(B값) → 월 납입보험료 = round(B × 9.5%) (2026 보험료율). 화면이 되돌려주는 '소득기준'이 B와 같은지 확인한다.
 *   monthsContributed → 화면 표(10·15·…·40년)에서 해당 행. 60개월 단위가 아니면 이 도구로는 대조 불가 → AdapterError.
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.nps.or.kr/comm/quick/getOHAH0011P0.do';
const PREMIUM_RATE = 0.095;

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const inc = /소득기준은 ([0-9,]+)원/.exec(t);
  // 노령연금 표만 본다 — 아래 유족연금 표에도 '20년 가입 N'이 있어 덮어쓰인다
  const a = t.indexOf('노령연금 (매월 지급예상액)'); const z = t.indexOf('장애연금', a);
  const old = a >= 0 ? t.slice(a, z > a ? z : undefined) : t;
  const rows = {};
  // 값이 그려지기 전엔 '20년 가입 25년 가입' 처럼 라벨만 이어져 '2'가 잡히므로 천단위 구분자가 있는 금액만 인정
  for (const m of old.matchAll(/([0-9]{2})년 가입 ([0-9]{1,3}(?:,[0-9]{3})+)/g)) rows[parseInt(m[1], 10)] = num(m[2]);
  if (!inc || !rows[20]) return null;
  return { incomeBase: num(inc[1]), byYears: rows };
}

export class NpsSimplePensionAdapter extends BaseAdapter {
  static id = 'nps-simple-pension';
  static gov = true;
  static url = PAGE_URL;
  static description = '국민연금공단 예상연금 간단계산 (노령연금, 2026 A값)';
  static playwrightOptions = { headless: true, timeout: 40000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.avgIncome) || input.avgIncome <= 0) throw new AdapterError(this.constructor.id, 'avgIncome 필요');
    if (!Number.isInteger(input.monthsContributed) || input.monthsContributed % 60 !== 0 || input.monthsContributed < 120 || input.monthsContributed > 480) {
      throw new AdapterError(this.constructor.id, `가입월수 ${input.monthsContributed} — 공단 간단계산은 10·15·…·40년 행만 제공 (법령 산식 케이스)`);
    }
  }

  async calculate(input) {
    this.validateInput(input);
    const premium = Math.round(input.avgIncome * PREMIUM_RATE);
    const r = await this.lookup(premium);
    if (r.incomeBase !== Math.round(input.avgIncome)) throw new AdapterError(this.constructor.id, `소득기준 불일치: 화면 ${r.incomeBase} ≠ 입력 ${input.avgIncome}`);
    const years = input.monthsContributed / 12;
    const monthlyPension = r.byYears[years];
    if (!Number.isFinite(monthlyPension)) throw new AdapterError(this.constructor.id, `${years}년 행 없음`);
    return { monthlyPension, annualPension: monthlyPension * 12, source: '국민연금공단 예상연금 간단계산', _ref: { premium, byYears: r.byYears } };
  }

  async lookup(premium) {
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
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (공단 다운)`);
      await p.waitForSelector('#ntpsIsfe', { state: 'visible' });
      await p.fill('#ntpsIsfe', String(premium)); await p.press('#ntpsIsfe', 'Tab');
      await p.click('#btnSearch');
      await p.waitForFunction(() => /소득기준은\s*[0-9,]+원/.test(document.body.innerText) && /20년\s*가입\s*[0-9]{1,3},[0-9]{3}/.test(document.body.innerText), null, { timeout: 15000 })
        .catch(() => { throw new AdapterError(this.constructor.id, `결과 미표시${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`); });
      const parsed = parseResult(await p.evaluate(() => document.body.innerText));
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

registerAdapter(NpsSimplePensionAdapter);
