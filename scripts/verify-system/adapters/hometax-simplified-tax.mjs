/**
 * 국세청 홈택스 — 근로소득 간이세액표 조회 어댑터 (정부, gov=true → 0원 허용)
 *
 * 페이지: 홈택스 > 비회원전용 > 원천세 > 근로소득 간이세액표
 *   월 급여액(비과세 제외) · 공제대상 가족 수(본인 포함) · 8~20세 자녀 수를 넣으면
 *   2026.3.1. 이후 표 기준으로 소득세 80% / 100% / 120% 와 지방소득세를 돌려준다.
 *
 * 왜 필요한가
 *   연봉 실수령액 엔진(calc_salary)은 고용노동부 인재채움뱅크 산식을 옮긴 것인데
 *   세율 구간·세액공제 상수가 2022년 이전 값이고 자녀 조정이 없다. 실제로
 *   월 250만·가족 1 에서 엔진 40,970원 vs 정본 35,600원(+15%) 이었다.
 *   이 어댑터가 정본을 공급하면 verify-3way 가 그 차이를 0원 기준으로 잡는다.
 *
 * DOM (최상위 문서, iframe 아님 — 2026-09 확인)
 *   #mf_txppWframe_mmSnw             월 급여액 input
 *   #mf_txppWframe_ddcTrgtFmlyCnt    가족 수 select (1~11)
 *   #mf_txppWframe_chldCnt           자녀 수 select (0~11)
 *   #mf_txppWframe_trigger178        [조회] 버튼
 *   결과는 본문 텍스트에 "80% 선택 … 소득세 N원 … 100% 선택 … 120% 선택 …" 순으로 찍힌다.
 *
 * 입력은 엔진과 같은 { annual, dependents, kids, nontaxable } 을 받아
 * 월 급여액 = floor(annual/12 − nontaxable) 로 환산한다 (엔진과 동일 규칙).
 */

import { BaseAdapter, AdapterError, registerAdapter } from './_base.mjs';

const PAGE_URL =
  'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=40&tm2lIdx=4021040000&tm3lIdx=4021040100';

const SEL = {
  salary: '#mf_txppWframe_mmSnw',
  family: '#mf_txppWframe_ddcTrgtFmlyCnt',
  kids: '#mf_txppWframe_chldCnt',
  submit: '#mf_txppWframe_trigger178',
};

async function getChromium() {
  try { const m = await import('playwright'); return m.chromium; }
  catch { return null; }
}

const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);

/** 결과 본문에서 80/100/120% 소득세·지방소득세를 뽑는다 */
export function parseResult(text) {
  const t = text.replace(/\s+/g, ' ');
  const pick = (pct) => {
    const re = new RegExp(`${pct}% 선택.*?소득세 ([0-9,]+)원 지방소득세 ([0-9,]+)원 납부세액의 합계액 ([0-9,]+)원`);
    const m = re.exec(t);
    return m ? { incomeTax: num(m[1]), localTax: num(m[2]), total: num(m[3]) } : null;
  };
  const r80 = pick(80), r100 = pick(100), r120 = pick(120);
  if (!r100) return null;
  return { r80, r100, r120 };
}

export class HometaxSimplifiedTaxAdapter extends BaseAdapter {
  static id = 'hometax-simplified-tax';
  static gov = true;
  static url = PAGE_URL;
  static description = '국세청 홈택스 근로소득 간이세액표 조회 (2026.3.1. 이후 표)';

  // 홈택스는 WebSquare 앱이라 로딩이 느리다
  static playwrightOptions = { headless: true, timeout: 45000 };

  validateInput(input) {
    super.validateInput(input);
    const { annual, dependents } = input;
    if (!Number.isFinite(annual) || annual <= 0) throw new AdapterError(this.constructor.id, 'annual 이 필요');
    if (!Number.isInteger(dependents) || dependents < 1 || dependents > 11) throw new AdapterError(this.constructor.id, 'dependents 는 1~11');
  }

  async calculate(input) {
    this.validateInput(input);
    const { annual, dependents, kids = 0, nontaxable = 0 } = input;
    const monthly = Math.max(0, Math.floor(annual / 12 - nontaxable));
    const raw = await this.lookup(monthly, dependents, kids);

    // 엔진 출력 키와 맞춘다 → verify-3way 가 바로 대조한다 (gov 이므로 0원 허용)
    return {
      monthlyIncomeTax: raw.r100.incomeTax,
      monthlyLocalTax: raw.r100.localTax,
      source: '홈택스 근로소득 간이세액표 2026.3.1. 이후',
      // 엔진에 없는 참고값 — verify-3way 는 _ref 를 비교하지 않는다
      _ref: {
        monthlyUsed: monthly,
        incomeTax80: raw.r80?.incomeTax ?? null,
        incomeTax120: raw.r120?.incomeTax ?? null,
        localTax80: raw.r80?.localTax ?? null,
        localTax120: raw.r120?.localTax ?? null,
      },
    };
  }

  /** 월 급여액·가족 수·자녀 수로 표를 직접 조회한다 */
  async lookup(monthly, family, kids = 0) {
    const chromium = await getChromium();
    if (!chromium) throw new AdapterError(this.constructor.id, 'playwright 미설치');

    let browser;
    try {
      browser = await chromium.launch({ headless: true, timeout: 30000 });
      const page = await browser.newPage({ locale: 'ko-KR' });
      page.setDefaultTimeout(this.constructor.playwrightOptions.timeout);

      const res = await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() >= 500) throw new AdapterError(this.constructor.id, `HTTP ${res?.status()} (홈택스 다운)`);

      // WebSquare 가 메뉴 화면을 나중에 그린다 — 입력칸이 나타날 때까지 기다린다
      await page.waitForSelector(SEL.salary, { state: 'visible' });

      await page.fill(SEL.salary, String(monthly));
      // WebSquare 는 blur 시점에 값을 커밋·포맷한다. 커밋 전에 조회를 누르면 빈 값으로 나가
      // 결과가 안 찍힌다 (2,156,880 케이스에서 재현). Tab 으로 확실히 빠져나온다.
      await page.press(SEL.salary, 'Tab');
      await page.selectOption(SEL.family, String(family));
      await page.selectOption(SEL.kids, String(kids));
      await page.waitForTimeout(300);

      const resultReady = () => /100% 선택[\s\S]*?소득세\s*[0-9,]+원/.test(document.body.innerText);
      let text = null;
      for (let attempt = 1; attempt <= 2 && !text; attempt++) {
        await page.click(SEL.submit);
        try {
          await page.waitForFunction(resultReady, null, { timeout: 15000 });
          text = await page.evaluate(() => document.body.innerText);
        } catch {
          if (attempt === 2) throw new AdapterError(this.constructor.id, '조회 결과가 표시되지 않음 (2회 시도)');
        }
      }
      const parsed = parseResult(text);
      if (!parsed) throw new AdapterError(this.constructor.id, '결과 파싱 실패');

      // 입력이 그대로 반영됐는지 확인 (입력칸 포맷팅으로 값이 바뀌는 사고 방지)
      const echoed = /월 급여액\s*([0-9,]+)원/.exec(text.replace(/\s+/g, ' '));
      if (echoed && num(echoed[1]) !== monthly) {
        throw new AdapterError(this.constructor.id, `입력 반영 불일치: 보냄 ${monthly}, 화면 ${echoed[1]}`);
      }
      return parsed;
    } catch (e) {
      if (e instanceof AdapterError) throw e;
      throw new AdapterError(this.constructor.id, '조회 실패', e);
    } finally {
      if (browser) await browser.close().catch(() => {});
    }
  }
}

registerAdapter(HometaxSimplifiedTaxAdapter);
