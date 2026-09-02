/**
 * 위택스 — 지방세 미리계산 > 자동차세(소유) 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.wetax.go.kr/tcp/loi/J030801M01.do → 탭 #tab-2 [자동차세(소유)]
 *   차종 #vehLgclCd(10 승용) · 용도 #vehUsgClCd2(비영업용 자가용)/#vehUsgClCd3(영업용 기타)
 *   최초등록일 #frstRegY/#frstRegM · 과세연도 #txtCrtrYr · 배기량 #egds → [세액미리계산하기] #btnClc
 *   결과 표: "2026 년 경감적용율(%) 0 % 0 % 자동차세 N 원 N 원 N 원 지방교육세 N 원 N 원 N 원 합계 N 원 N 원 N 원 총납부세액 N 원"
 *   (상반기 · 하반기 · 연세액 순. 키보드보안 레이어 때문에 실클릭 대신 페이지 jQuery 로 값을 넣는다 — 취득세 어댑터와 동일)
 *
 * 입력 매핑 (우리 JSON → 폼)
 *   engineCC → 배기량, isCommercial → 영업용(기타)/비영업용(자가용)
 *   vehicleAge(등록 후 만 N년) → 최초등록일 = (과세연도 − N)년 1월, 과세연도 = 올해
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.wetax.go.kr/tcp/loi/J030801M01.do';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const row = (label) => { const m = new RegExp(`${label} ([0-9,]+) 원 ([0-9,]+) 원 ([0-9,]+) 원`).exec(t); return m ? [num(m[1]), num(m[2]), num(m[3])] : null; };
  const auto = row('자동차세'), edu = row('지방교육세'), sum = row('합계');
  const disc = /경감적용율\(%\) ([0-9.]+) % ([0-9.]+) %/.exec(t);
  const total = /총납부세액 ([0-9,]+) 원/.exec(t);
  if (!auto || !edu || !total) return null;
  return { autoTax: auto[2], eduTax: edu[2], totalTax: num(total[1]), half: { auto, edu, sum }, discountPct: disc ? [parseFloat(disc[1]), parseFloat(disc[2])] : null };
}

export class WetaxAutoTaxAdapter extends BaseAdapter {
  static id = 'wetax-auto-tax';
  static gov = true;
  static url = PAGE_URL;
  static description = '위택스 지방세 미리계산 — 자동차세(소유, 승용)';

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.engineCC) || input.engineCC <= 0) throw new AdapterError(this.constructor.id, 'engineCC 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const year = new Date().getFullYear();
    const age = Math.max(0, Math.floor(input.vehicleAge || 0));
    const form = { cd: '10', use: input.isCommercial ? 'vehUsgClCd3' : 'vehUsgClCd2', y: String(year - age), m: '01', cy: String(year), cc: String(Math.round(input.engineCC)) };
    const r = await this.lookup(form);
    return {
      autoTax: r.autoTax, eduTax: r.eduTax, totalTax: r.totalTax,
      discountRate: r.discountPct ? r.discountPct[0] / 100 : 0,
      source: '위택스 지방세 미리계산 (자동차세)',
      _ref: { form, half: r.half },
    };
  }

  async lookup(form) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const page = await browser.newPage({ locale: 'ko-KR' });
      page.setDefaultTimeout(30000);
      const dialogs = [];
      page.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
      const res = await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (위택스 다운)`);
      await page.waitForSelector('#tab-2', { state: 'visible' });
      await page.evaluate(() => document.getElementById('tab-2').click());
      await page.waitForSelector('#egds', { state: 'visible' });
      await sleep(500);
      const st = await page.evaluate((a) => {
        const $ = window.jQuery; if (!$) return { ok: false };
        $('#vehLgclCd').val(a.cd).trigger('change');
        $('#' + a.use).prop('checked', true).trigger('click').trigger('change');
        $('#frstRegY').val(a.y).trigger('change'); $('#frstRegM').val(a.m).trigger('change'); $('#txtCrtrYr').val(a.cy).trigger('change');
        $('#egds').val(a.cc).trigger('change').trigger('keyup').trigger('blur');
        return { ok: true, cd: $('#vehLgclCd').val(), use: $('#' + a.use).is(':checked'), y: $('#frstRegY').val(), cy: $('#txtCrtrYr').val(), cc: $('#egds').val() };
      }, form);
      if (!st.ok || !st.use || st.cd !== form.cd || st.y !== form.y || st.cy !== form.cy || num(st.cc) !== num(form.cc)) throw new AdapterError(this.constructor.id, `폼 상태 반영 실패: ${JSON.stringify(st)}`);
      await page.evaluate(() => document.getElementById('btnClc').click());
      await page.waitForFunction(() => /총납부세액\s*[0-9,]+\s*원/.test(document.body.innerText), null, { timeout: 15000 })
        .catch(() => { throw new AdapterError(this.constructor.id, `결과 미표시${dialogs.length ? ' / 알림: ' + dialogs.join(' | ') : ''}`); });
      const parsed = parseResult(await page.evaluate(() => document.body.innerText));
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

registerAdapter(WetaxAutoTaxAdapter);
