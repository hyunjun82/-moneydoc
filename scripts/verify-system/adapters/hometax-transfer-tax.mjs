/**
 * 국세청 홈택스 — 양도소득세 간편계산(1개 부동산, 비로그인) 어댑터 (정부, gov=true → 0원 허용)
 *
 * 진입: 홈택스 > 세금신고 > 모의계산 > 양도소득세 자동계산 > "양도소득세 간편계산(1개 부동산 양도) 비로그인 계산하기"
 *   메뉴 URL tmIdx=41&tm2lIdx=4104060000&tm3lIdx=4104060100 → #mf_txppWframe_btnTritxSmpcClc → menuCd=UTERNAAU62
 *
 * 입력 매핑 (우리 JSON → 홈택스 폼)  — 2026-09 DOM 확인
 *   양도일 = 오늘, 취득일 = 오늘 − round(holdingYears×12)개월   (#mf_txppWframe_selYear2/selMonth2/selDay2)
 *   양도물건종류 #mf_txppWframe_radRenGodsKndCd_input_N : 1=주택, 2=고가주택(1세대1주택)
 *   양도가액 #mf_txppWframe_inptTrnCft
 *   취득가액은 읽기전용 합계 → '펼침'(#btnOpenCls01) 후 매입가액 #edtPymnAmt01 에 입력
 *   필요경비는 '펼침'(#btnOpenCls03) 후 자본적지출액 #edtPymnAmt07 에 입력
 *   1세대1주택 2년 보유 비과세 대상 #radYr2RenYn_input_0(예) / _1(아니오)
 *   고가주택이면 '과세대상 양도차익 계산' 팝업(#trigger21) → 확인(#mf_trigger18) 으로 12억 초과분 안분
 *   조정대상지역 중과 2주택 #radMetnRgnHsng2Yn_input_0, 3주택 #radMetnRgnHsng3Yn_input_0
 *   장기보유특별공제는 홈택스가 자동 계산하지 않고 전용 팝업(#trigger20)에서 계산 → 확인해야 반영된다.
 *     팝업: 구분(#mf_cmbLtrmRenSdcApplcClCd, 본문 선택에 따라 잠김)·보유기간(#mf_selRenTermYrCnt, 날짜로 자동·잠김)·
 *           거주기간(#mf_selRdnTermYrCnt, 1세대1주택일 때만 활성) → 계산(#mf_trigger15) → 공제액(#mf_edtLtrmRenSdcAmt) → 확인(#mf_trigger18)
 *   세액계산하기 #mf_txppWframe_btnNxt → 결과 팝업(UTERNAAU63) 본문 텍스트
 *
 * 결과 텍스트 (공백 정규화 후)
 *   "⑤ 전체양도차익 N ② - ③ - ④ ⑥ 비과세 양도차익 N ⑦ 과세대상 양도차익 N … ⑧ 장기보유특별공제 N …
 *    ⑨ 양도소득금액 N … ⑩ 양도소득기본공제 2,500,000 ⑪ 과세표준 N … ⑫ 세율 38% ⑬ 산출세액 N … ⑭ 자진납부할세액 N"
 *   지방소득세 행은 화면에 찍히지 않으므로 비교 대상에서 뺀다 (지방세법상 소득세의 10% 고정).
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const MENU_URL =
  'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4104060000&tm3lIdx=4104060100';
const NON_TAXABLE_LIMIT = 1200000000;

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

/** 오늘에서 months 개월 전 (일자는 유지, 말일 넘침은 마지막 날로) */
function monthsAgo(date, months) {
  const d = new Date(date.getFullYear(), date.getMonth() - months, 1);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(date.getDate(), last));
  return d;
}

/** 거주연수 → 홈택스 팝업 거주기간 옵션 라벨 */
function livedLabel(years) {
  if (years < 2) return '2년 미만';
  if (years >= 10) return '10년 이상';
  const y = Math.floor(years);
  return `${y}년 이상 ${y + 1}년 미만`;
}

export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const grab = (label) => { const m = new RegExp(`${label} ([0-9][0-9,]*)`).exec(t); return m ? num(m[1]) : null; };
  const gain = grab('⑤ 전체양도차익');
  const nonTaxableGain = grab('⑥ 비과세 양도차익');
  const taxableGain = grab('⑦ 과세대상 양도차익');
  const ltbc = grab('⑧ 장기보유특별공제');
  const incomeAmount = grab('⑨ 양도소득금액');
  const taxableBase = grab('⑪ 과세표준');
  const calcTax = grab('⑬ 산출세액');
  const finalTax = grab('⑭ 자진납부할세액');
  const rateM = /⑫ 세율 ([0-9.+% ]+?) ⑬/.exec(t);
  if (gain === null || finalTax === null) return null;
  return { gain, nonTaxableGain, taxableGain, ltbc, incomeAmount, taxableBase, calcTax, finalTax, rateText: rateM ? rateM[1].trim() : null };
}

export class HometaxTransferTaxAdapter extends BaseAdapter {
  static id = 'hometax-transfer-tax';
  static gov = true;
  static url = MENU_URL;
  static description = '국세청 홈택스 양도소득세 간편계산 (1개 부동산, 비로그인)';
  static playwrightOptions = { headless: true, timeout: 45000 };

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.salePrice) || !Number.isFinite(input.acquisitionPrice)) throw new AdapterError(this.constructor.id, 'salePrice/acquisitionPrice 필요');
    if (!Number.isFinite(input.holdingYears)) throw new AdapterError(this.constructor.id, 'holdingYears 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const mode = input.taxMode || '1home';
    const isOneHome = input.isOneHome !== undefined ? input.isOneHome : mode === '1home';
    const inAdjusted = input.adjustedArea === 'yes' || input.adjustedArea === true;
    const livedYears = input.livedYears ?? 0;
    const holdingYears = input.holdingYears;
    const exemptionEligible = isOneHome && holdingYears >= 2 && (!inAdjusted || livedYears >= 2);
    const homes = input.houseCount ?? input.homeCount ?? 0;
    const today = new Date();
    const acq = monthsAgo(today, Math.round(holdingYears * 12));
    const form = {
      acq: [acq.getFullYear(), acq.getMonth() + 1, acq.getDate()],
      kind: exemptionEligible && input.salePrice > NON_TAXABLE_LIMIT ? 2 : 1,
      sale: Math.round(input.salePrice),
      buy: Math.round(input.acquisitionPrice),
      expense: Math.round(input.expense ?? 0),
      exemption: exemptionEligible,
      livedLabel: exemptionEligible ? livedLabel(livedYears) : null,
      heavy: mode === 'adjusted' ? (homes >= 3 ? 3 : homes === 2 ? 2 : 0) : 0,
    };
    const r = await this.lookup(form);
    if (r.nonTaxableByNotice) {
      // 홈택스: "양도가액이 12억원 이하이고 1세대1주택 비과세 요건에 해당하는 경우에는 모의계산 서비스를 제공하지 않습니다"
      return { isNonTaxable: true, taxableGain: 0, ltbcRate: 0, incomeAmount: 0, taxableBase: 0, taxBeforeLocal: 0, localTax: 0, totalTax: 0,
        source: '홈택스 양도소득세 간편계산 (비과세 안내)', _ref: { form, notice: r.notice } };
    }

    // 엔진 출력 키로 변환 — 화면에 찍히는 값만 (지방소득세는 화면에 없어 제외)
    const out = {
      gain: r.gain,
      incomeAmount: r.incomeAmount,
      taxableBase: r.taxableBase,
      source: '홈택스 양도소득세 간편계산',
      _ref: { form, ltbc: r.ltbc, ltbcPopup: r.ltbcPopup, nonTaxableGain: r.nonTaxableGain, taxableGain: r.taxableGain, calcTax: r.calcTax, rateText: r.rateText },
    };
    if (r.taxableGain !== null && r.taxableGain > 0) out.ltbcRate = +((r.ltbc ?? 0) / r.taxableGain).toFixed(4);
    else out.ltbcRate = 0;
    if (mode === 'adjusted') out.totalIncomeTax = r.finalTax;
    else out.taxBeforeLocal = r.finalTax;
    if (mode === '1home') {
      out.taxableGain = r.taxableGain ?? 0;
      out.isNonTaxable = (r.taxableGain ?? 0) === 0 && (r.nonTaxableGain ?? 0) > 0;
    }
    return out;
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
      const closeOthers = async () => { for (const pg of others()) { try { await pg.close(); } catch { /* 이미 닫힘 */ } } };
      const dialogs = [];
      p.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });

      const res = await p.goto(MENU_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (홈택스 다운)`);
      await p.waitForSelector('#mf_txppWframe_btnTritxSmpcClc', { state: 'visible' });
      await sleep(1500); await closeOthers(); // 공지 팝업
      await p.evaluate(() => document.querySelector('#mf_txppWframe_btnTritxSmpcClc').click());
      await p.waitForSelector('#mf_txppWframe_inptTrnCft', { state: 'visible' });
      await sleep(1500); await closeOthers();

      const S = '#mf_txppWframe_';
      await p.selectOption(S + 'selYear2', String(form.acq[0]));
      await p.selectOption(S + 'selMonth2', String(form.acq[1]));
      await p.selectOption(S + 'selDay2', String(form.acq[2]));
      await p.evaluate((k) => document.querySelector('#mf_txppWframe_radRenGodsKndCd_input_' + k).click(), form.kind);
      await sleep(600);
      await p.fill(S + 'inptTrnCft', String(form.sale)); await p.press(S + 'inptTrnCft', 'Tab');
      await p.evaluate(() => document.querySelector('#mf_txppWframe_btnOpenCls01').click()); await sleep(600);
      await p.fill(S + 'edtPymnAmt01', String(form.buy)); await p.press(S + 'edtPymnAmt01', 'Tab'); await sleep(600);
      if (form.expense > 0) {
        await p.evaluate(() => document.querySelector('#mf_txppWframe_btnOpenCls03').click()); await sleep(600);
        await p.fill(S + 'edtPymnAmt07', String(form.expense)); await p.press(S + 'edtPymnAmt07', 'Tab'); await sleep(600);
      }
      // 취득가액 합계가 매입가액을 그대로 받았는지 확인
      const acqEcho = num(await p.inputValue(S + 'inptAcqCft'));
      if (acqEcho !== form.buy) throw new AdapterError(this.constructor.id, `취득가액 반영 불일치: ${acqEcho} ≠ ${form.buy}`);

      if (form.exemption) {
        await p.evaluate(() => document.querySelector('#mf_txppWframe_radYr2RenYn_input_0').click()); await sleep(1200);
        if (form.kind === 2) {
          await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger21').click()); await sleep(3500);
          const pop = others()[0];
          if (!pop) throw new AdapterError(this.constructor.id, '과세대상 양도차익 팝업이 열리지 않음');
          try { await pop.evaluate(() => document.querySelector('#mf_trigger18').click()); } catch { /* 확인 즉시 닫힘 */ }
          await sleep(1500); await closeOthers();
        }
      }
      if (form.heavy === 2) { await p.evaluate(() => document.querySelector('#mf_txppWframe_radMetnRgnHsng2Yn_input_0').click()); await sleep(800); }
      if (form.heavy === 3) { await p.evaluate(() => document.querySelector('#mf_txppWframe_radMetnRgnHsng3Yn_input_0').click()); await sleep(800); }

      // 장기보유특별공제 팝업 — 홈택스 자체 계산기로 공제액을 만들고 본문에 확인 반영
      let ltbcPopup = null;
      await p.evaluate(() => document.querySelector('#mf_txppWframe_trigger20').click()); await sleep(3500);
      const pop = others()[0];
      if (pop) {
        const st = await pop.evaluate(() => {
          const g = (id) => { const s = document.getElementById(id); return s ? { v: s.value, locked: s.disabled } : null; };
          return { cls: g('mf_cmbLtrmRenSdcApplcClCd'), hold: g('mf_selRenTermYrCnt'), lived: g('mf_selRdnTermYrCnt') };
        });
        if (form.livedLabel && st.lived && !st.lived.locked) await pop.selectOption('#mf_selRdnTermYrCnt', form.livedLabel);
        await pop.evaluate(() => document.querySelector('#mf_trigger15').click()); await sleep(2000);
        const amt = await pop.inputValue('#mf_edtLtrmRenSdcAmt').catch(() => '');
        ltbcPopup = { ...st, amount: amt ? num(amt) : 0 };
        try { await pop.evaluate(() => document.querySelector('#mf_trigger18').click()); } catch { /* 닫힘 */ }
        await sleep(1500); await closeOthers();
      }

      await p.evaluate(() => document.querySelector('#mf_txppWframe_btnNxt').click());
      let text = null;
      for (let i = 0; i < 25 && !text; i++) {
        await sleep(1000);
        // 12억 이하 1세대1주택 비과세는 홈택스가 계산을 거부하는 알림으로 답한다 → 그 자체가 정부의 '비과세' 판정
        if (dialogs.some((m) => /12억원 이하이고 1세대1주택 비과세 요건/.test(m))) return { nonTaxableByNotice: true, notice: dialogs.join(' | ') };
        for (const pg of others()) {
          // 표 머리글("⑭ 자진납부할세액,지방소득세…")이 값보다 먼저 그려지므로 실제 숫자가 붙을 때까지 기다린다
          try { const t = (await pg.evaluate(() => document.body.innerText)).replace(/\s+/g, ' '); if (/⑭ 자진납부할세액 [0-9]/.test(t)) text = t; } catch { /* 로딩 중 */ }
        }
      }
      if (!text) throw new AdapterError(this.constructor.id, `결과 팝업 없음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
      const parsed = parseResult(text);
      if (!parsed) throw new AdapterError(this.constructor.id, '결과 파싱 실패');
      parsed.ltbcPopup = ltbcPopup;
      return parsed;
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(HometaxTransferTaxAdapter);
