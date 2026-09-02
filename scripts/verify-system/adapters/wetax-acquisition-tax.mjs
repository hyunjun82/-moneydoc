/**
 * 위택스 — 지방세 미리계산 > 취득세(부동산) 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: https://www.wetax.go.kr/tcp/loi/J030801M01.do
 *   개인 간 유상거래 주택·토지의 취득세·지방교육세·농어촌특별세를 미리계산한다.
 *
 * 입력 매핑 (우리 JSON → 위택스 폼)
 *   price            → #dclrAcqsVal            과세표준액(매매가)
 *   areaSize ≤ 85    → #resDlngTypCd = '01'    전용면적 85㎡ 이하 주택 (농특세 비과세)
 *   areaSize > 85    → #resDlngTypCd = '02'    일반주택
 *   adjustedArea     → #adjTrgtRgnYn1 (Y) / #adjTrgtRgnYn2 (N)
 *   houseCountAfter  → #hh1HosCnt1 중과제외(1주택) / 2 / 3 / 4(4주택 이상)
 *   고정: 유상취득(농지 외) #actxObjKndDtlCd01, 별장·고급주택 해당없음 #vilLxrhYn2
 *
 * 결과 표 (본문 텍스트, 공백 정규화 후)
 *   "취득세 1 % 5,000,000 원 … 5,000,000 원"
 *   "지방교육세 (취득세율 x 0.5) x 0.2 500,000 원 …"
 *   "농어촌특별세 | 부과분 0.2% 1,000,000 원 …"
 *   "합계 - 6,500,000 원 …"
 *   각 행의 첫 금액이 산출세액 ①, 마지막 금액이 신고세액 합계. 감면·가산세가 0 이면 같다.
 *
 * DOM 은 2026-09 확인. 위택스는 일반 jQuery 폼이라 value 설정 + change 이벤트로 동작한다.
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL = 'https://www.wetax.go.kr/tcp/loi/J030801M01.do';

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}

const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

/**
 * 결과 텍스트에서 세목별 "신고세액 합계"(행의 마지막 금액)를 뽑는다.
 * 각 행은 [산출세액 ①, 감면 ②, 가산세 ×3, 가산세 감면 ④, 신고세액 합계] 순으로 7개 금액.
 * 85㎡ 이하 주택은 농특세가 산출 1,000,000 / 감면 1,000,000 / 신고 0 으로 나오므로
 * 첫 금액(산출)이 아니라 마지막 금액(신고)을 써야 실제 납부액과 맞는다.
 */
export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const row = (label, next) => {
    const re = new RegExp(`${label}(.*?)(?=${next})`);
    const m = re.exec(t);
    if (!m) return null;
    const amounts = [...m[1].matchAll(/([0-9][0-9,]*) 원/g)].map((x) => num(x[1]));
    return amounts.length ? amounts[amounts.length - 1] : null;
  };
  const acquisitionTax = row('취득세 [0-9.]+ ?%', '지방교육세');
  const educationTax = row('지방교육세', '농어촌특별세|합계 -');
  const ruralTax = row('농어촌특별세', '합계 -');
  const totalTax = row('합계 -', '총납부세액');
  const rateM = /취득세 ([0-9.]+) ?%/.exec(t);
  if (acquisitionTax === null || totalTax === null) return null;
  return {
    acquisitionTax,
    educationTax: educationTax ?? 0,
    ruralTax: ruralTax ?? 0,
    totalTax,
    ratePct: rateM ? parseFloat(rateM[1]) : null,
  };
}

export class WetaxAcquisitionTaxAdapter extends BaseAdapter {
  static id = 'wetax-acquisition-tax';
  static gov = true;
  static url = PAGE_URL;
  static description = '위택스 지방세 미리계산 — 취득세(부동산, 개인 간 유상거래)';

  validateInput(input) {
    super.validateInput(input);
    if (!Number.isFinite(input.price) || input.price <= 0) throw new AdapterError(this.constructor.id, 'price 필요');
  }

  async calculate(input) {
    this.validateInput(input);
    const { price, houseCountAfter = 1, adjustedArea = false, areaSize = 84 } = input;
    const form = {
      price: Math.round(price),
      dealType: areaSize <= 85 ? '01' : '02',
      adjusted: adjustedArea === true || adjustedArea === 'yes' || adjustedArea === 'Y',
      houseCnt: Math.min(4, Math.max(1, Math.round(houseCountAfter))),
    };
    const r = await this.lookup(form);
    return {
      acquisitionTax: r.acquisitionTax,
      educationTax: r.educationTax,
      ruralTax: r.ruralTax,
      totalTax: r.totalTax,
      source: '위택스 지방세 미리계산 (취득세)',
      _ref: { form },
    };
  }

  async lookup({ price, dealType, adjusted, houseCnt }) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');
    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const page = await browser.newPage({ locale: 'ko-KR' });
      page.setDefaultTimeout(30000);
      const res = await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (위택스 다운)`);
      await page.waitForSelector('#dclrAcqsVal', { state: 'visible' });

      // 위택스는 키보드보안 레이어가 클릭을 가로채는 경우가 있어 좌표/실클릭이 아니라
      // 페이지 자체 jQuery 로 상태를 바꾸고 change 핸들러를 태운다 (2026-09 검증).
      const state = await page.evaluate(({ price, dealType, adjusted, houseCnt }) => {
        const $ = window.jQuery;
        if (!$) return { ok: false, reason: 'no jQuery' };
        $('#actxObjKndDtlCd01').prop('checked', true).trigger('click').trigger('change');
        $('#dclrAcqsVal').val(String(price)).trigger('change');
        $('#resDlngTypCd').val(dealType).trigger('change');
        $(adjusted ? '#adjTrgtRgnYn1' : '#adjTrgtRgnYn2').prop('checked', true).trigger('click').trigger('change');
        $('#vilLxrhYn2').prop('checked', true).trigger('click').trigger('change');
        $(`#hh1HosCnt${houseCnt}`).prop('checked', true).trigger('click').trigger('change');
        return {
          ok: true,
          adj: $(adjusted ? '#adjTrgtRgnYn1' : '#adjTrgtRgnYn2').is(':checked'),
          house: $(`#hh1HosCnt${houseCnt}`).is(':checked'),
          deal: $('#resDlngTypCd').val(),
          price: $('#dclrAcqsVal').val(),
        };
      }, { price, dealType, adjusted, houseCnt });
      if (!state.ok || !state.adj || !state.house || state.deal !== dealType) {
        throw new AdapterError(this.constructor.id, `폼 상태 반영 실패: ${JSON.stringify(state)}`);
      }

      await page.evaluate(() => document.getElementById('btnLotxClcResult').click());
      await page.waitForFunction(
        () => /합계\s*-\s*[0-9,]+\s*원/.test(document.body.innerText),
        null,
        { timeout: 15000 }
      );
      const text = await page.evaluate(() => document.body.innerText);
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

registerAdapter(WetaxAcquisitionTaxAdapter);
