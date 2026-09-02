/**
 * 국세청 홈택스 — 상속세 간편계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 진입: 홈택스 > 세금신고 > 재산평가하기·모의계산 > (모의계산) 상속세 자동계산 > 간편계산하기
 *   메뉴 URL tmIdx=41&tm2lIdx=4108040000&tm3lIdx=4108040200 → #mf_txppWframe_anchor1 → menuCd=UTERNAAM02
 *
 * 입력 매핑 (우리 JSON → 홈택스 폼) — 2026-09 DOM 확인
 *   totalEstate           → 부동산가액 #mf_txppWframe_input12 (금융·기타는 0)
 *   hasSpouse             → 배우자 #mf_txppWframe_selectbox2 ('있음'/'없음')
 *   children              → 자녀 #mf_txppWframe_cbo_chld_cnt ('N명')
 *   elderlyCount          → 연로자 #mf_txppWframe_cbo_odpp_cnt ('N명')
 *   disabledExpectedYears → 장애인공제액 #mf_txppWframe_input28 = 연수 × 1,000만
 *   minorYearsTotal       → 홈택스 간편계산은 미성년자 '명수'만 받아 잔여연수를 넣을 수 없다. 0이 아니면 AdapterError.
 *   장례비 #mf_txppWframe_input2 는 홈택스 기본 5,000,000 (상증세법 시행령 §9 최소 공제) 그대로 둔다.
 *   배우자가 실제 상속받은 금액 #mf_txppWframe_input50 = 상속재산 전액 → 배우자공제는 법정지분 한도액으로 결정
 *     (엔진 가정과 동일: 배우자공제 = max(5억, min(법정지분, 30억)))
 *   '배우자 공제 법정지분 한도액 계산하기' #mf_txppWframe_trigger22 → 한도액 자동 산출
 *   '상속공제적용한도액 상세' #mf_txppWframe_trigger24 → 팝업 저장하기 #mf_trigger14 (필수, 안 하면 세액계산 거부)
 *   세액계산하기 #mf_txppWframe_trigger19 → 결과는 같은 페이지 본문(UTERNAAM03)에 표시
 *
 * 결과 텍스트 (공백 정규화 후)
 *   "배우자공제 있음 N원 … 합계 N원 상속공제적용한도액 N원 상속공제액 N원 … 일반장례비용 N원 …
 *    상속세 과세가액 N원 최종 상속공제액 N원 상속세 과세표준 N원 상속세율 20% 누진공제액 N원 산출세액 N원 신고세액공제 N원 총납부예상금액 N원"
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const MENU_URL =
  'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4108040000&tm3lIdx=4108040200';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const grab = (label) => { const m = new RegExp(`${label} ([0-9][0-9,]*)원`).exec(t); return m ? num(m[1]) : null; };
  const spouse = /배우자공제 (있음|없음) ([0-9,]+)원/.exec(t);
  const out = {
    spouseDeduction: spouse ? num(spouse[2]) : null,
    deductionSum: grab('합계'),
    deductionLimit: grab('상속공제적용한도액'),
    deduction: (() => { const m = /최종\s*상속공제액\s*([0-9][0-9,]*)원/.exec(t); return m ? num(m[1]) : null; })(),
    funeral: grab('일반장례비용'),
    taxableValue: grab('상속세 과세가액'),
    taxableBase: grab('상속세 과세표준'),
    tax: grab('산출세액'),
    filingCredit: grab('신고세액공제'),
    payableTax: grab('총납부예상금액'),
  };
  if (out.taxableBase === null || out.tax === null) return null;
  // '최종 상속공제액' 라벨은 화면 구성에 따라 안 잡히기도 한다 → 과세가액 − 과세표준(둘 다 화면값)으로 확정
  if (out.deduction === null && out.taxableValue !== null) out.deduction = out.taxableValue - out.taxableBase;
  return out;
}

export class HometaxInheritanceTaxAdapter extends BaseAdapter {
  static id = 'hometax-inheritance-tax';
  static gov = true;
  static url = MENU_URL;
  static description = '국세청 홈택스 상속세 간편계산';
  static playwrightOptions = { headless: true, timeout: 45000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.totalEstate) || input.totalEstate <= 0) throw new AdapterError(this.constructor.id, 'totalEstate 필요');
    if ((input.minorYearsTotal || 0) > 0) throw new AdapterError(this.constructor.id, '홈택스 간편계산은 미성년자 잔여연수를 받지 않음 (명수만) — 이 케이스는 정부 대조 불가');
    if ((input.parents || 0) > 0) throw new AdapterError(this.constructor.id, '홈택스 간편계산에 부모 상속인 입력 없음 — 이 케이스는 정부 대조 불가');
    if ((input.children || 0) > 10) throw new AdapterError(this.constructor.id, '자녀 수 10명 초과');
  }

  async calculate(input) {
    this.validateInput(input);
    const form = {
      estate: Math.round(input.totalEstate),
      spouse: !!input.hasSpouse,
      children: input.children || 0,
      elderly: input.elderlyCount || 0,
      disabledAmt: Math.round((input.disabledExpectedYears || 0) * 10000000),
    };
    const r = await this.lookup(form);
    return {
      spouseDeduction: r.spouseDeduction ?? 0,
      deduction: r.deduction,
      taxableBase: r.taxableBase,
      tax: r.tax,
      source: '홈택스 상속세 간편계산',
      _ref: { form, funeral: r.funeral, taxableValue: r.taxableValue, deductionSum: r.deductionSum, deductionLimit: r.deductionLimit, filingCredit: r.filingCredit, payableTax: r.payableTax },
    };
  }

  async lookup(form) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const ctx = await browser.newContext({ locale: 'ko-KR' });
      const p = await ctx.newPage();
      p.setDefaultTimeout(this.constructor.playwrightOptions.timeout);
      const others = () => ctx.pages().filter((pg) => pg !== p);
      const closeOthers = async () => { for (const pg of others()) { try { await pg.close(); } catch { /* 닫힘 */ } } };
      const dialogs = [];
      p.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });

      const res = await p.goto(MENU_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (홈택스 다운)`);
      await p.waitForSelector('#mf_txppWframe_anchor1', { state: 'visible' });
      await sleep(1500); await closeOthers();
      await p.evaluate(() => document.querySelector('#mf_txppWframe_anchor1').click());
      await p.waitForSelector('#mf_txppWframe_input12', { state: 'visible' });
      await sleep(1500); await closeOthers();

      const S = '#mf_txppWframe_';
      const fill = async (id, v) => { await p.fill(S + id, String(v)); await p.press(S + id, 'Tab'); };
      await p.selectOption(S + 'selectbox2', form.spouse ? '있음' : '없음');
      await p.selectOption(S + 'cbo_chld_cnt', `${form.children}명`);
      await p.selectOption(S + 'cbo_odpp_cnt', `${form.elderly}명`);
      if (form.disabledAmt > 0) await fill('input28', form.disabledAmt);
      await fill('input12', form.estate);
      if (form.spouse) {
        await fill('input50', form.estate);
        await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger22').click());
        await sleep(2500); await closeOthers();
      }
      // 상속공제적용한도액 팝업 저장 (필수)
      await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger24').click());
      await sleep(3500);
      const pop = others()[0];
      if (!pop) throw new AdapterError(this.constructor.id, '상속공제적용한도액 팝업이 열리지 않음');
      try { await pop.evaluate(() => document.querySelector('#mf_trigger14').click()); } catch { /* 저장 즉시 닫힘 */ }
      await sleep(1500); await closeOthers();
      const limit = num(await p.inputValue(S + 'edtInhDdcApplcLmtAmt'));
      if (!Number.isFinite(limit) || limit <= 0) throw new AdapterError(this.constructor.id, '상속공제적용한도액이 채워지지 않음');

      await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger19').click());
      await p.waitForFunction(() => /총납부예상금액\s*[0-9,]+원|과세대상이 아닙니다|과세대상입니다/.test(document.body.innerText), null, { timeout: 20000 })
        .catch(() => { throw new AdapterError(this.constructor.id, `결과가 표시되지 않음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`); });
      const text = await p.evaluate(() => document.body.innerText);
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

registerAdapter(HometaxInheritanceTaxAdapter);
