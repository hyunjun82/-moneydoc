#!/usr/bin/env node
/**
 * 가이드 글 v2 빌드: 스펙 → (lint) → 미리보기 HTML + 히어로 SVG → PNG → Next 페이지.
 *
 *   node scripts/article-template/build.mjs <slug> [--no-og] [--no-convert]
 *   node scripts/article-template/build.mjs --all
 *
 * 순서
 *   1. articles/<slug>.mjs 가 엔진 값으로 스펙을 만든다
 *   2. lint.mjs 품질 게이트 (FAIL 이면 여기서 멈춤)
 *   3. 위젯 산식 포트를 엔진과 대조 (1원이라도 다르면 실패)
 *   4. render.mjs → public/_preview/article-v2-<slug>.html, og-<slug>.svg
 *   5. render-og.mjs → public/_preview/og-<slug>.png (1200×630)
 *   6. convert-v2.mjs → Next 페이지·데이터·CSS·스크립트·public/og
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { render, ROOT } from './render.mjs';
import { lint } from './lint.mjs';
import { ARTICLES } from './articles/index.mjs';

const require = createRequire(import.meta.url);
const { calculators } = require(path.join(ROOT, 'lib/calc/engine.js'));
const loadSpec = (p) => require(path.join(ROOT, 'moneydoc-data/calculators', `${p}.json`));
const VERIFIED = '2026-09-02';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const slugs = flags.has('--all') ? ARTICLES.map((a) => a.slug) : args.filter((a) => !a.startsWith('--'));
if (!slugs.length) { console.error('usage: build.mjs <slug> | --all'); process.exit(1); }

let failed = 0;
for (const slug of slugs) {
  const entry = ARTICLES.find((a) => a.slug === slug);
  if (!entry) { console.error(`✗ ${slug}: articles/index.mjs 에 없음`); failed++; continue; }
  const mod = await import(`./articles/${slug}.mjs`);
  const a = mod.default({ calculators, loadSpec, VERIFIED });
  if (a.slug !== slug) throw new Error(`${slug}: 스펙 slug 불일치 (${a.slug})`);

  // 2. 품질 게이트
  const problems = lint(a);
  if (problems.length) {
    console.error(`✗ ${slug}: lint FAIL (${problems.length})`);
    for (const p of problems) console.error(`   - ${p}`);
    failed++; continue;
  }

  // 3. 위젯 산식 대조
  for (const s of a.sections) for (const b of s.blocks) {
    if (b.type !== 'widget') continue;
    const ctx = {}; vm.createContext(ctx);
    vm.runInContext(`${b.port}; this.ub = typeof ub === 'function' ? ub : undefined;`, ctx);
    const port = {}; for (const k of Object.keys(ctx)) if (typeof ctx[k] === 'function') port[k] = ctx[k];
    const { n, bad } = b.check(port);
    if (bad) { console.error(`✗ ${slug}: 위젯 산식이 엔진과 ${bad}/${n} 불일치`); failed++; continue; }
    console.log(`  위젯 산식 대조 ${n}건 일치`);
    b.js = `${b.port}\n${b.js}`;
  }

  // 4. 렌더
  const { html, heroSvg } = render(a);
  const prev = path.join(ROOT, 'public/_preview');
  fs.mkdirSync(prev, { recursive: true });
  const htmlPath = path.join(prev, `article-v2-${slug}.html`);
  const svgPath = path.join(prev, `og-${slug}.svg`);
  const pngPath = path.join(prev, `og-${slug}.png`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  fs.writeFileSync(svgPath, heroSvg, 'utf8');
  console.log(`✓ ${slug}: ${path.relative(ROOT, htmlPath)} ${(html.length / 1024).toFixed(0)}KB`);

  // 5. 대표 이미지
  if (!flags.has('--no-og')) execFileSync('node', [path.join(ROOT, 'scripts/article-template/render-og.mjs'), svgPath, pngPath], { stdio: 'inherit' });
}

// 6. Next 변환 (전체 한 번)
if (!failed && !flags.has('--no-convert')) execFileSync('node', [path.join(ROOT, 'scripts/article-template/convert-v2.mjs')], { stdio: 'inherit' });
process.exit(failed ? 1 : 0);
