/**
 * moneydoc.kr 어댑터 — Playwright로 직접 입력 + 결과 추출
 *  - URL: https://moneydoc.kr/{category}/{slug}/
 *  - 입력: page.fill / page.selectOption (label 텍스트로 input 찾기)
 *  - 결과: .b-row .name + .val 추출 → {key: value} 객체
 */
export async function moneydocCalculate(page, calc, input) {
  const url = `https://moneydoc.kr/${calc.category}/${calc.slug}/`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('.input-row', { timeout: 10000 });

  // 입력 매핑 (JSON inputs[].id → DOM)
  for (const def of (calc.json.inputs || [])) {
    const v = input[def.id];
    if (v === undefined) continue;
    const labelText = def.label;
    // label 텍스트로 row 찾기
    const row = page.locator(`.input-row:has(.name:text("${labelText}"))`).first();
    if (await row.count() === 0) continue;
    if (def.type === 'select') {
      const options = (def.options || []).map(o => typeof o === 'string' ? { value: o, label: o } : o);
      const opt = options.find(o => String(o.value) === String(v));
      const selectEl = row.locator('select');
      if (await selectEl.count() > 0) {
        await selectEl.selectOption({ label: opt?.label ?? String(v) });
      }
    } else if (def.type === 'boolean') {
      const cb = row.locator('input[type="checkbox"]');
      const checked = await cb.isChecked();
      if (checked !== !!v) await cb.click();
    } else {
      const inp = row.locator('input[type="text"], input[type="number"]');
      await inp.fill('');
      await inp.fill(String(v));
    }
  }
  await page.waitForTimeout(300); // re-calc

  // 결과 추출 — .result-label / .b-row 패턴
  const result = {};
  const primaryLabel = await page.locator('.result-label').first().textContent().catch(() => null);
  const primaryVal = await page.locator('.result-value, .primary-display').first().textContent().catch(() => null);
  if (primaryLabel && primaryVal) {
    result.__primary = { label: primaryLabel.trim(), value: parseValue(primaryVal) };
  }
  // 보조 결과들
  const rows = await page.locator('.b-row').all();
  for (const row of rows) {
    const name = (await row.locator('.name').textContent().catch(() => ''))?.trim();
    const val = (await row.locator('.val').textContent().catch(() => ''))?.trim();
    if (name && val) result[name] = parseValue(val);
  }
  return result;
}

function parseValue(text) {
  if (!text) return null;
  const t = text.replace(/[원,\s]/g, '');
  const pctMatch = text.match(/([-\d.]+)\s*%/);
  if (pctMatch) return parseFloat(pctMatch[1]) / 100;
  if (t === 'O') return true;
  if (t === 'X') return false;
  const n = Number(t);
  if (!isNaN(n)) return n;
  return text.trim();
}
