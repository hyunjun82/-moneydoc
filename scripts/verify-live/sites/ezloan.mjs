/**
 * ezloan.io 어댑터 — 대출이자 (URL 파라미터)
 *  - URL: https://www.ezloan.io/calc/loan/{graceMonths}/{principal}/{ratePct}/{months}/0
 *  - 페이지 진입만 하면 결과 자동 표시
 *  - CAPTCHA 없음
 */
function parseKoreanWon(text) {
  if (!text) return null;
  const cleaned = text.replace(/[\s원]/g, '');
  let total = 0;
  const eokMatch = cleaned.match(/(\d+(?:,\d+)*)억/);
  const manMatch = cleaned.match(/(\d+(?:,\d+)*)만/);
  const wonMatch = cleaned.match(/(?:^|억|만)([\d,]+)(?!만|억)/);
  if (eokMatch) total += Number(eokMatch[1].replace(/,/g, '')) * 100000000;
  if (manMatch) total += Number(manMatch[1].replace(/,/g, '')) * 10000;
  if (wonMatch && !eokMatch && !manMatch) total = Number(wonMatch[1].replace(/,/g, ''));
  return total || Number(cleaned.replace(/,/g, '')) || null;
}

export async function ezloanLoan(page, input) {
  const { principal, years, rate, mode = 'amortization', graceYears = 0 } = input;
  
  if (mode === 'balloon') {
    // 만기일시: 단순 계산
    const monthlyInterest = Math.round(principal * rate / 12);
    const totalInterest = monthlyInterest * years * 12;
    return { monthly: monthlyInterest, totalInterest, totalPayment: principal + totalInterest };
  }
  
  const months = years * 12;
  const ratePct = (rate * 100).toFixed(3).replace(/\.?0+$/, '');
  const graceMonths = graceYears * 12;
  const url = `https://www.ezloan.io/calc/loan/${graceMonths}/${principal}/${ratePct}/${months}/0`;

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForSelector('text=상환해야', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
  
  const text = await page.textContent('body');
  // "총 X억 X,XXX만 X원을 상환" / "예상 이자 금액은 X억 X,XXX만 X원"
  const totalMatch = text.match(/총\s*([0-9억만,\s]+)\s*원을\s*상환/);
  const interestMatch = text.match(/이자\s*금액(?:은|이)?\s*([0-9억만,\s]+)\s*원/);
  // 월 상환액
  const monthlyMatch = text.match(/매달\s*([0-9억만,\s]+)\s*원/) || text.match(/월\s*([0-9,]+)\s*원/);
  
  return {
    monthly: parseKoreanWon(monthlyMatch?.[1]),
    totalPayment: parseKoreanWon(totalMatch?.[1]),
    totalInterest: parseKoreanWon(interestMatch?.[1]),
  };
}
