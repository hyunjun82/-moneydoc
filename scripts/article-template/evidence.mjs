#!/usr/bin/env node
/**
 * 근거 수집기: brief/<slug>.json 의 sources 를 Playwright 로 열어 본문 텍스트 + 전체 캡처를 저장한다.
 *
 *   evidence/<slug>/<n>.json   { n, label, url, kind, title, fetchedAt, chars, text }
 *   evidence/<slug>/<n>.png    전체 페이지 캡처 (사람이 눈으로 대조할 때)
 *
 * 글의 숫자·조문은 이 텍스트에 있어야 빌드가 통과한다(factcheck.mjs). 텍스트 파일 소스(지식iN 복붙 등)는 { file } 로.
 *
 *   node scripts/article-template/evidence.mjs <slug> [--only=3,5] [--skip-existing]
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const [slug, ...flags] = process.argv.slice(2);
if (!slug) { console.error('usage: evidence.mjs <slug> [--only=1,2] [--skip-existing]'); process.exit(1); }
const only = (flags.find((f) => f.startsWith('--only=')) ?? '').slice(7).split(',').filter(Boolean).map(Number);
const skip = flags.includes('--skip-existing');

const brief = JSON.parse(fs.readFileSync(path.join(HERE, 'brief', `${slug}.json`), 'utf8'));
const dir = path.join(HERE, 'evidence', slug);
fs.mkdirSync(dir, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ locale: 'ko-KR', userAgent: UA, viewport: { width: 1280, height: 900 } });

/** 페이지의 모든 프레임에서 가장 긴 본문을 고른다 (law.go.kr 은 조문이 iframe 안에 있다) */
async function readText(page) {
  let best = '';
  for (const f of page.frames()) {
    try { const t = await f.evaluate(() => document.body?.innerText ?? ''); if (t.length > best.length) best = t; } catch { /* cross-origin */ }
  }
  return best.replace(/ /g, ' ').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

let n = 0, ok = 0;
for (const s of brief.sources) {
  n++;
  if (only.length && !only.includes(n)) continue;
  const jsonPath = path.join(dir, `${n}.json`);
  if (skip && fs.existsSync(jsonPath)) { ok++; continue; }
  const rec = { n, label: s.label, kind: s.kind ?? 'gov', url: s.url ?? null, file: s.file ?? null, fetchedAt: new Date().toISOString().slice(0, 10), title: '', chars: 0, text: '' };
  try {
    if (s.file) {
      rec.text = fs.readFileSync(path.resolve(HERE, s.file), 'utf8');
      rec.title = s.label;
    } else {
      const page = await ctx.newPage();
      page.setDefaultTimeout(60000);
      await page.goto(s.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(s.wait ?? 6000);
      if (s.click) { for (const f of page.frames()) { try { await f.evaluate((sel) => { const a = [...document.querySelectorAll('a')].find((x) => x.textContent.trim() === sel); if (a) a.click(); }, s.click); } catch { /* noop */ } } await page.waitForTimeout(4000); }
      rec.title = await page.title();
      rec.text = await readText(page);
      await page.screenshot({ path: path.join(dir, `${n}.png`), fullPage: true }).catch(() => {});
      await page.close();
    }
    rec.chars = rec.text.length;
    if (rec.chars < (s.minChars ?? 300)) throw new Error(`본문이 너무 짧음 (${rec.chars}자) — 차단·로그인·프레임 문제`);
    for (const must of s.must ?? []) if (!rec.text.includes(must)) throw new Error(`필수 문구 없음: "${must}"`);
    fs.writeFileSync(jsonPath, JSON.stringify(rec, null, 2), 'utf8');
    ok++;
    console.log(`✓ ${n}. ${s.label}  ${rec.chars.toLocaleString()}자`);
  } catch (e) {
    console.error(`✗ ${n}. ${s.label}: ${e.message}`);
  }
}
await browser.close();
console.log(`근거 ${ok}/${n} 저장 → ${path.relative(process.cwd(), dir)}`);
process.exit(ok === n ? 0 : 1);
