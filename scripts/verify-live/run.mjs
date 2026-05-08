#!/usr/bin/env node
/**
 * 라이브 1:1 자동 대조 — Playwright
 *
 * 사용:
 *   node scripts/verify-live/run.mjs --calc=loan-amortization
 *   node scripts/verify-live/run.mjs --category=loan
 *
 * 동작:
 *   1) 각 verification.case 입력값을 moneydoc.kr + 외부사이트 양쪽에 자동 입력
 *   2) 두 결과 추출 후 비교
 *   3) 리포트 (md + json)
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { loadAllCalculators, loadByCategory, loadBySlug } from '../verify-system/core/case-loader.mjs';
import { moneydocCalculate } from './sites/moneydoc.mjs';
import { ezloanLoan } from './sites/ezloan.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs(process.argv.slice(2));

// 어떤 외부 사이트 어댑터를 어느 slug에 쓸지
const EXTERNAL = {
  'loan-amortization': ezloanLoan,
  // TODO: 다른 카테고리 추가
};

async function main() {
  const calcs = pickCalcs();
  if (calcs.length === 0) { console.error('대상 없음'); process.exit(1); }

  const browser = await chromium.launch({ headless: !args.show, timeout: 30000 });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const md = [], json = [];

  for (const calc of calcs) {
    const ext = EXTERNAL[calc.slug];
    if (!ext) { console.log(`⏭ ${calc.slug} — 외부 어댑터 없음`); continue; }

    for (const c of calc.cases) {
      const page1 = await ctx.newPage();
      const page2 = await ctx.newPage();
      try {
        const [md1, ext1] = await Promise.all([
          moneydocCalculate(page1, calc, c.input),
          ext(page2, c.input),
        ]);
        const diff = compare(md1, ext1);
        if (diff.length === 0) {
          console.log(`✅ ${calc.slug} — ${c.name}`);
          md.push(`- ✅ **${calc.slug}** — ${c.name}`);
        } else {
          console.log(`❌ ${calc.slug} — ${c.name}`);
          for (const d of diff) console.log(`   ${d}`);
          md.push(`- ❌ **${calc.slug}** — ${c.name}\n  ${diff.join('\n  ')}`);
        }
        json.push({ slug: calc.slug, case: c.name, moneydoc: md1, external: ext1, diff });
      } catch (e) {
        console.log(`⚠️ ${calc.slug} — ${c.name}: ${e.message}`);
        md.push(`- ⚠️ **${calc.slug}** — ${c.name}: ${e.message}`);
      } finally {
        await page1.close().catch(() => {});
        await page2.close().catch(() => {});
      }
    }
  }
  await browser.close();

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const reportDir = path.resolve(__dirname, 'reports');
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(`${reportDir}/${stamp}.md`, md.join('\n'));
  fs.writeFileSync(`${reportDir}/${stamp}.json`, JSON.stringify(json, null, 2));
  console.log(`\n📄 ${reportDir}/${stamp}.md`);
}

function compare(a, b) {
  const diff = [];
  for (const k of Object.keys(b)) {
    const av = a[k] ?? a[`${k}원`] ?? a.__primary?.value;
    const bv = b[k];
    if (typeof bv === 'number' && typeof av === 'number') {
      if (Math.abs(av - bv) > 100) diff.push(`${k}: moneydoc=${av} vs ext=${bv} (Δ${av - bv})`);
    }
  }
  return diff;
}

function parseArgs(argv) {
  const a = {};
  for (const x of argv) {
    if (x.startsWith('--calc=')) a.calc = x.slice(7);
    else if (x.startsWith('--category=')) a.category = x.slice(11);
    else if (x === '--all') a.all = true;
    else if (x === '--show') a.show = true;
  }
  return a;
}

function pickCalcs() {
  if (args.calc) {
    const c = loadBySlug(args.calc);
    return c ? [c] : [];
  }
  if (args.category) return loadByCategory(args.category);
  if (args.all) return loadAllCalculators();
  return [];
}

main().catch(e => { console.error(e); process.exit(1); });
