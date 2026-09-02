/**
 * 국세청 홈택스 — 증여세 간편계산 어댑터 (정부, gov=true → 0원 허용)
 *
 * 진입: 홈택스 > 세금신고 > 재산평가하기·모의계산 > (모의계산) 증여세 자동계산 > 간편계산하기
 *   메뉴 URL tmIdx=41&tm2lIdx=4107050000&tm3lIdx=4107050200 → #mf_txppWframe_anchor1 → menuCd=UTERNAAU42
 *
 * 입력 매핑 (우리 JSON → 홈택스 폼) — 2026-09 DOM 확인
 *   relation → '증여자와의 관계' 는 텍스트 입력이 잠겨 있고 [조회](#mf_txppWframe_trigger24) 로만 넣는다.
 *     1) 관계도 레이어(UTERNAA0F031): 수증자 버튼 — 배우자 btn_sps / 자녀 btn_chid / 기타친족 btn_knfl / 기타 btn_etc → 선택완료 btn_chce
 *     2) 세부관계 레이어(UTERNAA0F012): 행 목록 (예: 직계비속 → 자·양자·계자) → 행의 [선택]
 *        id 는 목록마다 다르다: 직계비속 grp_drnRltTbody_N_tbx_detailNm ↔ grp_drnRltTbody_N_btn_Chce,
 *        기타친족(다열 표) grp_drnRltDdcTrgtTbody_N_tbx_detailDdcTrgtNmA ↔ grp_drnRltDdcTrgtTbody_N_btn_ChceDdcTrgtA
 *        → 텍스트가 일치하는 tbx_detail*Nm* 요소를 찾고 'tbx_detail'→'btn_Chce' 로 바꿔 버튼 id 를 만든다.
 *     WebSquare 앵커는 DOM click 이 먹지 않아 컴포넌트 객체(window[id]).click() 으로 누른다.
 *   lineal_adult → 자녀→'자', 미성년 아니오 / lineal_minor → 자녀→'자', 미성년 예
 *   spouse → 배우자 / sibling → 기타친족→'형제자매' 행 / other → 기타 (공제 0)
 *   giftAmount → 증여받은 재산가액 #mf_txppWframe_edtDtnPrpCft, 혼인·출산 공제 0, 채무 0, 세대생략 아니오
 *   세액계산하기 #mf_txppWframe_trigger19 → 결과는 별지 제10호 서식(증여세 과세표준 신고서) 팝업으로 뜬다.
 *
 * 결과 텍스트: 서식 뷰어라 글자마다 공백이 끼어 나온다 ("2 7 직 계 비 속 5 0 , 0 0 0 , 0 0 0 4 9 자 진 …").
 *   공백을 전부 지운 뒤 '항목번호+라벨 … 다음 항목' 사이의 숫자를 lazy 매칭으로 뽑는다.
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const MENU_URL =
  'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4107050000&tm3lIdx=4107050200';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

const RELATION = {
  spouse: { btn: 'btn_sps', row: null, minor: false },
  lineal_adult: { btn: 'btn_chid', row: '자', minor: false },
  lineal_minor: { btn: 'btn_chid', row: '자', minor: true },
  sibling: { btn: 'btn_knfl', row: '형', minor: false },   // 기타친족 표에서 '형' 행 (형제자매 공제 1천만)
  other: { btn: 'btn_etc', row: '무관계', minor: false },
};

export function parseResult(rawText) {
  const t = rawText.replace(/\s+/g, '');
  const pick = (re) => { const m = re.exec(t); return m ? num(m[1]) : null; };
  const out = {
    giftValue: pick(/17증여재산가액([0-9,]+?)39박물관/),
    dedSpouse: pick(/25배우자([0-9,]+?)47납부지연/),
    dedLinealAsc: pick(/26직계존속([0-9,]+?)48공익법인/),
    dedLinealDesc: pick(/27직계비속([0-9,]+?)49자진납부/),
    dedOther: pick(/28그밖의친족([0-9,]+?)납부방법/),
    dedMarriage: pick(/29혼인([0-9,]+?)50연부연납/),
    dedBirth: pick(/30출산([0-9,]+?)31재해손실/),
    taxableBase: pick(/33과세표준\([^)]*\)([0-9,]+?)「상속세/),
    ratePct: pick(/34세율([0-9]+)%/),
    tax: pick(/35산출세액([0-9,]+?)[0-9]{4}년/),
    skipAdd: pick(/36세대생략가산액\([^)]*\)([0-9,]+?)신청/),
    filingCredit: pick(/43신고세액공제\([^)]*\)([0-9,]+?)22채무액/),
    payableTax: pick(/49자진납부할세액\(합계액\)\([^)]*\)([0-9,]+?)28그밖의/),
  };
  if (out.taxableBase === null || out.tax === null || out.giftValue === null) return null;
  out.deduction = (out.dedSpouse ?? 0) + (out.dedLinealAsc ?? 0) + (out.dedLinealDesc ?? 0) + (out.dedOther ?? 0) + (out.dedMarriage ?? 0) + (out.dedBirth ?? 0);
  return out;
}

export class HometaxGiftTaxAdapter extends BaseAdapter {
  static id = 'hometax-gift-tax';
  static gov = true;
  static url = MENU_URL;
  static description = '국세청 홈택스 증여세 간편계산';
  static playwrightOptions = { headless: true, timeout: 45000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.giftAmount) || input.giftAmount <= 0) throw new AdapterError(this.constructor.id, 'giftAmount 필요');
    if (!RELATION[input.relation]) throw new AdapterError(this.constructor.id, `relation 매핑 없음: ${input.relation}`);
  }

  async calculate(input) {
    this.validateInput(input);
    const rel = RELATION[input.relation];
    const form = { amount: Math.round(input.giftAmount), relation: input.relation, ...rel };
    const r = await this.lookup(form);
    if (r.giftValue !== form.amount) throw new AdapterError(this.constructor.id, `재산가액 반영 불일치: ${r.giftValue} ≠ ${form.amount}`);
    return {
      deduction: r.deduction,
      taxableBase: r.taxableBase,
      tax: r.tax,
      filingCredit: r.filingCredit,
      payableTax: r.payableTax,
      source: '홈택스 증여세 간편계산',
      _ref: { form, ratePct: r.ratePct, skipAdd: r.skipAdd, dedSpouse: r.dedSpouse, dedLinealAsc: r.dedLinealAsc, dedLinealDesc: r.dedLinealDesc, dedOther: r.dedOther },
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
      await p.waitForSelector('#mf_txppWframe_edtDtnPrpCft', { state: 'visible' });
      await sleep(1500); await closeOthers();

      // 관계 선택: 관계도 → 선택완료 → 세부관계 행 [선택]
      const L1 = 'mf_txppWframe_UTERNAA0F031_wframe_';
      const L2 = 'mf_txppWframe_UTERNAA0F012_wframe_';
      await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger24').click());
      await p.waitForFunction((id) => !!window[id], L1 + form.btn, { timeout: 15000 });
      await sleep(500);
      await p.evaluate((id) => window[id].click(), L1 + form.btn); await sleep(800);
      await p.evaluate((id) => window[id].click(), L1 + 'btn_chce');
      await p.waitForFunction((pre) => document.querySelectorAll(`[id^="${pre}"][id*="tbx_detail"]`).length > 0, L2, { timeout: 15000 });
      await sleep(800);
      const rows = await p.evaluate((pre) => [...document.querySelectorAll(`[id^="${pre}"][id*="tbx_detail"]`)].map((e) => ({ id: e.id, text: (e.value || e.textContent || '').trim() })).filter((r) => r.text), L2);
      const hit = form.row ? rows.find((r) => r.text === form.row) : rows[0];
      if (!hit) throw new AdapterError(this.constructor.id, `세부관계 '${form.row ?? '(첫 행)'}' 없음: ${rows.map((r) => r.text).slice(0, 20).join('/')}`);
      const btnId = hit.id.replace(/tbx_detail/, 'btn_Chce').replace(/Nm([A-Z]?)$/, '$1');
      const clicked = await p.evaluate((id) => { const c = window[id]; if (!c) return false; c.click(); return true; }, btnId);
      if (!clicked) throw new AdapterError(this.constructor.id, `세부관계 선택 버튼 없음: ${btnId}`);
      await sleep(1200);
      const relEcho = await p.inputValue('#mf_txppWframe_edtPrpHumnRltNm');
      if (!relEcho) throw new AdapterError(this.constructor.id, '관계가 입력되지 않음');
      await closeOthers();

      await p.evaluate(() => document.querySelector('#mf_txppWframe_edtHshOmssDtnYn_input_1').click());
      await p.evaluate((minor) => document.querySelector(minor ? '#mf_txppWframe_edtMinrYn_input_0' : '#mf_txppWframe_edtMinrYn_input_1').click(), form.minor);
      const fill = async (id, v) => { await p.fill('#mf_txppWframe_' + id, String(v)); await p.press('#mf_txppWframe_' + id, 'Tab'); };
      await fill('edtDtnPrpCft', form.amount);
      // 혼인·출산 공제란은 직계존속 증여일 때만 활성화 (배우자·기타는 잠김) — 활성일 때만 0 입력
      for (const id of ['edtMrgDtnPrpDdcAmt', 'edtChbtDtnPrpDdcAmt']) {
        const enabled = await p.evaluate((i) => { const e = document.getElementById('mf_txppWframe_' + i); return !!e && !e.disabled; }, id);
        if (enabled) await fill(id, 0);
      }

      await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger19').click());
      let text = null;
      for (let i = 0; i < 25 && !text; i++) {
        await sleep(1000);
        for (const pg of others()) {
          try { const t = await pg.evaluate(() => document.body.innerText); if (/자\s*진\s*납\s*부\s*할\s*세\s*액/.test(t) && /[0-9]/.test(t)) text = t; } catch { /* 로딩 중 */ }
        }
      }
      if (!text) throw new AdapterError(this.constructor.id, `결과 팝업 없음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      const parsed = parseResult(text);
      if (!parsed) throw new AdapterError(this.constructor.id, '결과 파싱 실패');
      parsed.relEcho = relEcho;
      return parsed;
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(HometaxGiftTaxAdapter);
