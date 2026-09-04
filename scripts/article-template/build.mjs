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
 *   2b. factcheck.mjs 사실 대조: 글의 모든 숫자·조문이 엔진 값 또는 evidence/<slug>/*.json 에 있어야 함 (brief/<slug>.json 필수)
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
import { factCheck, collectEngineNums } from './factcheck.mjs';
import { answerCheck, arithmeticCheck, renderAccidentCheck } from './answer-check.mjs';
import { faqAndH2Check } from './faq-h2-check.mjs';
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
  // 스펙이 쓰는 계산기 결과·상수의 숫자를 전부 기록해 둔다 (사실 대조의 '엔진 값' 화이트리스트)
  const usedSpecs = [];
  const loadSpecTracked = (p) => { const sp = loadSpec(p); usedSpecs.push(sp); return sp; };
  const eng = collectEngineNums(calculators, usedSpecs);
  // derive(v): 엔진 상수의 산술 파생값(상한×30일 등)을 엔진 값으로 등록한다. 손으로 친 숫자는 여기 못 넣는다(인자가 식이어야 함)
  const derive = (v) => { eng.nums.add(String(v)); eng.nums.add(String(Math.round(v))); return v; };
  const a = mod.default({ calculators: eng.calculators, loadSpec: loadSpecTracked, VERIFIED, derive });
  for (const sp of usedSpecs) collectEngineNums({}, [sp]).nums.forEach((n) => eng.nums.add(n));
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

  // 2b. 사실 대조 (근거 JSON + 엔진 값)
  const briefPath = path.join(ROOT, 'scripts/article-template/brief', `${slug}.json`);
  // 스포크는 허브와 같은 법령을 쓴다. brief 의 reuseEvidence 로 허브 근거를 그대로 쓴다.
  const briefPeek = fs.existsSync(path.join(ROOT, 'scripts/article-template/brief', `${slug}.json`))
    ? JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/article-template/brief', `${slug}.json`), 'utf8'))
    : {};
  const evDir = path.join(ROOT, 'scripts/article-template/evidence', briefPeek.reuseEvidence ?? slug);
  if (!fs.existsSync(briefPath)) { console.error(`✗ ${slug}: brief/${slug}.json 없음 (키워드·출처 파일이 있어야 글을 낼 수 있다)`); failed++; continue; }
  const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));
  const evidence = fs.existsSync(evDir) ? fs.readdirSync(evDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(evDir, f), 'utf8'))) : [];
  // 근거를 남의 폴더에서 빌려 쓰면(reuseEvidence) 그 원본 brief 의 출처 수와 맞춰야 한다.
  // 자기 brief 수(12)만 보다가 근거 파일이 14→13 으로 줄어도 통과했다 (돌연변이 47번).
  const ownerBrief = briefPeek.reuseEvidence
    ? JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/article-template/brief', `${briefPeek.reuseEvidence}.json`), 'utf8'))
    : brief;
  const needEv = Math.max(brief.sources.length, ownerBrief.sources.length);
  if (evidence.length < needEv) { console.error(`✗ ${slug}: 근거 ${evidence.length}/${needEv} — evidence.mjs 먼저`); failed++; continue; }
  const fc = factCheck({ html, evidence, engineNums: eng.nums, brief, claims: a.claims });
  // "쓴 것" 뿐 아니라 "안 쓴 것" 도 본다. 근거에 답이 있는데 회피했는지, 일수와 총액이 맞는지.
  // 이 두 검사가 없어서 회피 답 4편과 계산 오류 1편이 라이브로 나갔다 (2026-09-04).
  fc.problems.push(...answerCheck({ html, evidence }), ...arithmeticCheck({ html, engineNums: eng.nums }), ...renderAccidentCheck({ html }), ...faqAndH2Check({ html }));
  if (fc.problems.length) {
    console.error(`✗ ${slug}: 사실 대조 FAIL (${fc.problems.length})`);
    for (const p of fc.problems) console.error(`   - ${p}`);
    failed++; continue;
  }
  console.log(`  사실 대조 통과 · 근거 ${evidence.length}건 · 엔진 값 ${eng.nums.size}개${fc.coverage != null ? ` · 검색어 커버 ${(fc.coverage * 100).toFixed(0)}%` : ''}`);
  const prev = path.join(ROOT, 'public/_preview');
  fs.mkdirSync(prev, { recursive: true });
  const htmlPath = path.join(prev, `article-v2-${slug}.html`);
  const svgPath = path.join(prev, `og-${slug}.svg`);
  const pngPath = path.join(prev, `og-${slug}.png`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  fs.writeFileSync(svgPath, heroSvg, 'utf8');

  // 4b. 허브 랜딩용 구조 데이터 (글 블록이 아니라 주제 홈 화면을 그리는 데 쓴다)
  const landing = {
    hero: a.hero,
    calc: a.calc,
    badge: a.badge,
    basis: a.basis,
    readMinutes: a.readMinutes,
    quick: a.answer.quick.map(({ chip, big, unit, sub, selected }) => ({ chip, big, unit, sub, selected: !!selected })),
    boxes: a.answer.boxes,
    keyPoints: a.keyPoints,
    sections: a.sections.map((s) => ({ id: s.id, h2: s.h2, sub: s.sub })),
    faq: (a.faq ?? []).map(([q, ans]) => ({ q, a: ans })),
    related: a.related ?? [],
  };
  fs.writeFileSync(path.join(prev, `landing-${slug}.json`), JSON.stringify(landing, null, 1), 'utf8');
  console.log(`✓ ${slug}: ${path.relative(ROOT, htmlPath)} ${(html.length / 1024).toFixed(0)}KB`);

  // 5. 대표 이미지
  if (!flags.has('--no-og')) execFileSync('node', [path.join(ROOT, 'scripts/article-template/render-og.mjs'), svgPath, pngPath], { stdio: 'inherit' });
}

// 6. Next 변환 (전체 한 번)
if (!failed && !flags.has('--no-convert')) execFileSync('node', [path.join(ROOT, 'scripts/article-template/convert-v2.mjs')], { stdio: 'inherit' });
process.exit(failed ? 1 : 0);
