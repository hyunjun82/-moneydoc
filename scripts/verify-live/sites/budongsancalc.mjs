/**
 * 부동산계산기.com 어댑터 — 대출이자 (PMT)
 *  - URL: https://부동산계산기.com/대출이자
 *  - 모드별 탭 클릭 → 입력 → "대출 이자 계산" 클릭 → 결과 표 추출
 */
export async function budongsancalcLoan(page, input) {
  const { principal, years, rate, mode = 'amortization' } = input;
  const tabMap = { amortization: '원리금균등', decline: '원금균등', balloon: '만기일시' };
  const tabText = tabMap[mode] || '원리금균등';

  await page.goto('https://xn--989a00af8jnslv3dba.com/대출이자', {
    waitUntil: 'domcontentloaded', timeout: 20000
  });
  await page.click(`button:has-text("${tabText}")`).catch(() => {});

  // 입력 (만원 단위 + 개월)
  const principalManwon = principal / 10000;
  const months = years * 12;
  const ratePct = rate * 100;

  // input은 label 옆 input. label 텍스트로 찾기
  await page.locator('label:has-text("대출 금액") + * input, input').first().fill('');
  await page.locator('input').nth(0).fill(String(principalManwon));
  await page.locator('input').nth(1).fill(String(months));
  await page.locator('input').nth(2).fill(String(ratePct));

  await page.click('button:has-text("대출 이자 계산")');
  await page.waitForTimeout(1500);

  // 결과 추출 — 계산서 표
  const text = await page.textContent('body');
  const monthlyMatch = text.match(/월원리금상환액[\s\S]*?([\d,]+)/);
  const totalInterestMatch = text.match(/총\s*이자액[\s\S]*?([\d,]+)/);
  return {
    monthly: monthlyMatch ? Number(monthlyMatch[1].replace(/,/g, '')) : null,
    totalInterest: totalInterestMatch ? Number(totalInterestMatch[1].replace(/,/g, '')) : null,
  };
}
