/**
 * 국세청 홈택스 — 종합부동산세 간이세액계산(주택분) 어댑터 (정부, gov=true → 0원 허용)
 *   comprehensive-real-estate-tax · holding-tax-total 두 계산기가 같이 쓴다 (calculate 의 2번째 인자 slug 로 출력 키를 고른다)
 *
 * 진입: 홈택스 > 세금신고 > 종합부동산세 신고 > 종합부동산세 간이세액계산
 *   메뉴 URL tmIdx=41&tm2lIdx=4113000000&tm3lIdx=4113030000 → 주택 [계산하기] #mf_txppWframe_anchor18 → menuCd=UTERNAAW63
 *
 * 입력 매핑 (우리 JSON → 홈택스 폼) — 2026-09 DOM 확인
 *   value1..3 (주택별 공시가) → 주택마다 한 번씩 등록: 전년도 공시가격 #rbfyrHsngPaPrc23 = 당해년도 #hsngPaPrc23 = 공시가
 *     (전년도 = 당해년도로 넣어 세부담상한이 걸리지 않게 한다 — 엔진과 같은 가정)
 *   납세자 구분 개인 #txprClsfCd23_input_0, 1세대1주택여부 #hshHsngThcYn23_input_0(여)/_1(부) = 주택 수 1 여부
 *   공동명의 부 #jntNeYn_input_1, 주택유형 #hsngTypeCl_input_0
 *   age / holdingYears → 생년월일 #bhdt23_input, 취득일자 #acqDt23_input (귀속연도-05-31 기준으로 과세기준일 6.1 현재 만 나이·보유연수가 정확히 나오게)
 *   실제재산세 입력 부, 재산세 감면 부, 재산세 1세대1주택 세율 특례 = 1주택이면 여 (공정시장가액비율 45% 구간) / 그 외 부
 *   등록하기 #trigger23 (주택마다), 간이세액계산하기 #trigger28 → 결과 팝업
 *
 * 결과 텍스트 (공백 정규화 후)
 *   "① (감면후)공시가격 합계 N ② 공제액 N ③ 공정시장가액비율 60% ④ 과세표준{(①－②)×③} N ⑤ 세 율 1.00%
 *    ⑥ 재산세공제전 종합부동산세 금액 N ⑦ 공제할 재산세액 N ⑧ 산출세액(⑥－⑦) N 세액공제 ⑨ 고령자 N ⑩ 장기보유 N ⑪ 합계(한도액적용) N
 *    ⑫ 종합부동산세액(⑧－⑪) N ⑬ 농어촌특별세액(⑫×20%) N ⑭ 납부할세액(⑫＋⑬) N … 재산세액 합계 N"
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const MENU_URL =
  'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4113000000&tm3lIdx=4113030000';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const grab = (label) => { const m = new RegExp(`${label} ([0-9][0-9,]*)`).exec(t); return m ? num(m[1]) : null; };
  const out = {
    totalValue: grab('① \\(감면후\\)공시가격 합계'),
    deduction: grab('② 공제액'),
    taxableBase: grab('④ 과세표준\\{\\(①－②\\)×③\\}'),
    taxBeforePropertyCredit: grab('⑥ 재산세공제전 종합부동산세 금액'),
    propertyTaxCredit: grab('⑦ 공제할 재산세액'),
    calcTax: grab('⑧ 산출세액\\(⑥－⑦\\)'),
    ageCredit: grab('⑨ 고령자'),
    holdingCredit: grab('⑩ 장기보유'),
    creditTotal: grab('⑪ 합계\\(한도액적용\\)'),
    compTax: grab('⑫ 종합부동산세액\\(⑧－⑪\\)'),
    ruralTax: grab('⑬ 농어촌특별세액\\(⑫×20%\\)'),
    payableTax: grab('⑭ 납부할세액\\(⑫＋⑬\\)'),
    propertyTaxTotal: grab('재산세액 합계'),
  };
  const rateM = /⑤ 세 율 ([0-9.]+)%/.exec(t);
  out.ratePct = rateM ? parseFloat(rateM[1]) : null;
  if (out.taxableBase === null || out.payableTax === null) return null;
  return out;
}

export class HometaxCompTaxAdapter extends BaseAdapter {
  static id = 'hometax-comp-tax';
  static gov = true;
  static url = MENU_URL;
  static description = '국세청 홈택스 종합부동산세 간이세액계산 (주택분)';
  static playwrightOptions = { headless: true, timeout: 45000 };

  validateInput(input) {
    super.validateInput(input);
    const values = [input.value1, input.value2, input.value3].map((v) => Math.round(v || 0)).filter((v) => v > 0);
    if (!values.length) throw new AdapterError(this.constructor.id, 'value1 (주택 공시가) 필요');
  }

  async calculate(input, slug = 'comprehensive-real-estate-tax') {
    if (slug === 'property-tax') {
      // 재산세 계산기: 홈택스 결과의 '재산세액 합계' 줄만 쓴다. 홈택스는 재산세를 표준세율(60%)로만 계산하므로
      // 1세대1주택 9억 이하 특례(지방세법 §111조의2, 2026.12.28까지 유효)는 여기서 대조하지 않는다 → 일반 케이스만 govSource 지정
      if (input.isOneHomeUnder9Eok) throw new AdapterError(this.constructor.id, '홈택스는 1주택 특례세율을 계산하지 않음 — 법령 대조 케이스');
      const r = await this.lookup({ values: [Math.round(input.publicValue)], oneHome: false, birth: null, acq: null });
      return { propertyTax: r.propertyTaxTotal, source: '홈택스 종합부동산세 간이세액계산 (주택) — 재산세액 합계', _ref: { standardRate: true } };
    }
    this.validateInput(input);
    const values = [input.value1, input.value2, input.value3].map((v) => Math.round(v || 0)).filter((v) => v > 0);
    const year = new Date().getFullYear();
    const age = Math.floor(input.age || 0), hy = Math.floor(input.holdingYears || 0);
    const form = {
      values,
      oneHome: values.length === 1,
      birth: age > 0 ? `${year - age}-05-31` : null,
      acq: hy > 0 ? `${year - hy}-05-31` : null,
    };
    const r = await this.lookup(form);
    const ref = { form, totalValue: r.totalValue, deduction: r.deduction, ratePct: r.ratePct, notice: r.notice ?? null };
    if (slug === 'holding-tax-total') {
      return { propertyTax: r.propertyTaxTotal, compTax: r.compTax, ruralTax: r.ruralTax, compPayable: r.payableTax, source: '홈택스 종합부동산세 간이세액계산 (주택)', _ref: ref };
    }
    return {
      totalValue: r.totalValue, deduction: r.deduction, taxableBase: r.taxableBase,
      taxBeforePropertyCredit: r.taxBeforePropertyCredit, propertyTaxCredit: r.propertyTaxCredit, calcTax: r.calcTax,
      ageCredit: r.ageCredit, holdingCredit: r.holdingCredit, creditTotal: r.creditTotal,
      compTax: r.compTax, ruralTax: r.ruralTax, payableTax: r.payableTax, propertyTaxTotal: r.propertyTaxTotal,
      source: '홈택스 종합부동산세 간이세액계산 (주택)', _ref: ref,
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
      await p.waitForSelector('#mf_txppWframe_anchor18', { state: 'visible' });
      await sleep(1500); await closeOthers();
      await p.evaluate(() => document.getElementById('mf_txppWframe_anchor18').click());
      await p.waitForSelector('#mf_txppWframe_hsngPaPrc23', { state: 'visible' });
      await sleep(1500); await closeOthers();

      const S = '#mf_txppWframe_';
      const click = (id) => p.evaluate((i) => document.getElementById('mf_txppWframe_' + i).click(), id);
      const fill = async (id, v) => { await p.fill(S + id, String(v)); await p.press(S + id, 'Tab'); };
      await click('txprClsfCd23_input_0');
      await click(form.oneHome ? 'hshHsngThcYn23_input_0' : 'hshHsngThcYn23_input_1');
      await sleep(400);
      for (let i = 0; i < form.values.length; i++) {
        await fill('rbfyrHsngPaPrc23', form.values[i]);
        await fill('hsngPaPrc23', form.values[i]);
        await click('jntNeYn_input_1');
        await click('hsngTypeCl_input_0');
        // 생년월일·취득일자(세액공제)는 1세대1주택일 때만 활성 — 다주택이면 잠겨 있어 건드리지 않는다
        if (i === 0 && form.oneHome && form.birth) { await fill('bhdt23_input', form.birth); await sleep(300); }
        if (i === 0 && form.oneHome && form.acq) { await fill('acqDt23_input', form.acq); await sleep(300); }
        await click('actlPrptxYn_input_1');
        await click('prptxReYn23_input_1');
        await click(form.oneHome ? 'prptxHsfmTxrteSpcsYn_input_0' : 'prptxHsfmTxrteSpcsYn_input_1');
        await click('trigger23');
        await sleep(2500); await closeOthers();
      }
      // 등록 표의 합계가 입력 합계와 같은지 확인
      const gridTotal = await p.evaluate(() => { const t = document.body.innerText.replace(/\s+/g, ' '); const m = /합계 ([0-9,]+) /.exec(t.slice(t.lastIndexOf('합계') - 5)); return m ? m[1] : null; });
      const want = form.values.reduce((a, b) => a + b, 0);
      if (gridTotal === null || num(gridTotal) !== want) throw new AdapterError(this.constructor.id, `등록 합계 불일치: 표 ${gridTotal} ≠ 입력 ${want}${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);

      await click('trigger28');
      let text = null;
      for (let i = 0; i < 25 && !text; i++) {
        await sleep(1000);
        for (const pg of others()) {
          try { const t = (await pg.evaluate(() => document.body.innerText)).replace(/\s+/g, ' '); if (/⑭ 납부할세액\(⑫＋⑬\) [0-9]/.test(t)) text = t; } catch { /* 로딩 중 */ }
        }
      }
      if (!text) throw new AdapterError(this.constructor.id, `결과 팝업 없음${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`);
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

registerAdapter(HometaxCompTaxAdapter);
