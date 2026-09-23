#!/usr/bin/env node
/**
 * 새 글 품질 장치 — scripts/article.mjs 가 부른다. 기준 글(/unemployment/guide/)보다 얕으면 막는다.
 *
 *   켜지는 조건: 계획서의 스포크에 faq 가 있을 때만. (faq: 2 또는 faq: ["질문?", "질문?"])
 *   faq 가 없는 예전 스포크는 이 파일을 거치지 않는다. 예전 동작 그대로다.
 *
 *   1 preflight(sp)      쓰기 전. 제목의 말이 모두 소제목에 있나 · 소제목 질문형 · 중복 · FAQ 2개
 *   2 check(slug, sp)    빌드 뒤. 스펙이 계획서와 같나 · faqFixed · 기준 글 대비 하한
 *                        실패 목록은 article.mjs 의 고침 회차에 그대로 들어간다
 *
 *   node scripts/article-template/quality.mjs --selftest    결함을 심어 잡히는지 센다
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const AT = path.join(ROOT, 'scripts/article-template');
export const REF = 'unemployment-benefit-guide';
export const FAQ_N = 2;
const require = createRequire(import.meta.url);

export async function loadArticle(slug) {
  const { calculators } = require(path.join(ROOT, 'lib/calc/engine.js'));
  const loadSpec = (p) => require(path.join(ROOT, 'moneydoc-data/calculators', `${p}.json`));
  const mod = await import(`${pathToFileURL(path.join(AT, 'articles', `${slug}.mjs`)).href}?t=${Date.now()}`);
  return mod.default({ calculators, loadSpec, VERIFIED: '2026-01-01', derive: (v) => v });
}

// ── 제목의 말 ────────────────────────────────────────────────────────────
const SUFFIX = /(부터|까지|에서|으로|은|는|이|가|을|를|의|에|도|만|과|와|로)$/;
const STOP = new Set(['그리고', '또는', '어떻게']);
export function titleWords(title, keyword) {
  return title.replace(/\d{4}년/g, ' ').split(keyword || '\u0000').join(' ')
    .replace(/[^가-힣0-9a-zA-Z% ]/g, ' ').split(/\s+/)
    .map((w) => w.replace(SUFFIX, '')).filter((w) => w.length >= 2 && !STOP.has(w));
}
const isQuestion = (h) => /(요|까|\?)$/.test(h.replace(/\s*\([^)]*\)\s*$/, '').trim());
const squash = (s) => s.replace(/\s+/g, '');
const faqQs = (sp) => (Array.isArray(sp.faq) ? sp.faq : null);

// ── 1. 쓰기 전 ──────────────────────────────────────────────────────────
export function preflight(sp, keyword) {
  const p = [];
  const need = (ok, m) => { if (!ok) p.push(m); };
  const h2 = sp.h2 ?? [];
  need(h2.length >= 4, `소제목 4개 이상 (${h2.length})`);
  need(sp.faq === FAQ_N || faqQs(sp)?.length === FAQ_N, `faq 는 ${FAQ_N} 또는 질문 ${FAQ_N}개 배열`);
  if (p.length) return p;
  const H = squash(h2.join(' '));
  for (const w of titleWords(sp.title, keyword)) need(H.includes(w), `제목의 "${w}" 가 소제목에 없음`);
  for (const h of h2) need(isQuestion(h), `소제목이 질문형이 아님: "${h}"`);
  need(new Set(h2.map(squash)).size === h2.length, '소제목 중복');
  for (const q of faqQs(sp) ?? []) need(/\?$/.test(q), `FAQ 는 ?로 끝: "${q}"`);
  return p;
}

// ── 2. 빌드 뒤 ──────────────────────────────────────────────────────────
const DROP = new Set(['js', 'port', 'check', 'html']);
export function metrics(a) {
  const blocks = (a.sections ?? []).flatMap((s) => s.blocks ?? []);
  const body = JSON.stringify([a.intro, a.answer, a.keyPoints, a.sections, a.summary],
    (k, v) => (DROP.has(k) || typeof v === 'function' ? undefined : v));
  return {
    chars: body.replace(/<[^>]+>/g, '').replace(/\\n|\s/g, '').length,
    h2: (a.sections ?? []).length,
    tables: blocks.filter((x) => x.type === 'table').length,
    kinds: new Set(blocks.map((x) => x.type)),
    claims: (a.claims ?? []).length,
  };
}
export function specCheck(a, sp, ref) {
  const p = [];
  const need = (ok, m) => { if (!ok) p.push(m); };
  need(a.title === sp.title, `title 이 계획서와 다름: 계획서 "${sp.title}"`);
  need(JSON.stringify((a.sections ?? []).map((s) => s.h2)) === JSON.stringify(sp.h2), '소제목이 계획서 목록·순서와 다름. 계획서 h2 를 그대로 쓴다');
  need(a.faqFixed === FAQ_N, `스펙 최상위에 faqFixed: ${FAQ_N} 을 넣는다`);
  need((a.faq ?? []).length === FAQ_N, `FAQ 는 정확히 ${FAQ_N}개 (${(a.faq ?? []).length})`);
  const qs = faqQs(sp);
  if (qs) need(JSON.stringify((a.faq ?? []).map((x) => x[0])) === JSON.stringify(qs), `FAQ 질문은 계획서 그대로: ${qs.join(' / ')}`);
  const m = metrics(a);
  need(m.chars >= Math.round(ref.chars * 0.7), `본문 ${m.chars}자. 기준 글 ${ref.chars}자의 70% 이상으로 근거의 답을 더 쓴다`);
  need(m.h2 >= Math.ceil(ref.h2 * 0.7), `소제목 ${m.h2}개 < 기준 ${ref.h2}개의 70%`);
  need(m.tables >= Math.ceil(ref.tables * 0.5), `표 ${m.tables}개. 기준 ${ref.tables}개의 절반 이상 (근거의 비교를 표로)`);
  need(m.claims >= Math.ceil(ref.claims * 0.5), `원문 인용 claims ${m.claims}개. 기준 ${ref.claims}개의 절반 이상`);
  for (const k of ['widget', 'flow']) need(m.kinds.has(k), `장치 없음: ${k} (기준 글에 있음)`);
  need(['tree', 'timeline', 'steps'].some((k) => m.kinds.has(k)), '판정 트리·타임라인·절차 카드 중 하나 필요');
  return p;
}
export async function reference() {
  const spec = await loadArticle(REF);
  const brief = JSON.parse(fs.readFileSync(path.join(AT, 'brief', `${REF}.json`), 'utf8'));
  return { ...metrics(spec), sources: brief.sources.length, spec };
}
export const evidenceFloor = (ref) => Math.ceil(ref.sources * 0.5);
export async function check(slug, sp) {
  return specCheck(await loadArticle(slug), sp, await reference());
}

// ── 자체 시험 ───────────────────────────────────────────────────────────
async function selftest() {
  const ref = await reference();
  const R = ref.spec;
  const sp = { title: R.title, h2: R.sections.map((s) => s.h2), faq: R.faq.slice(0, FAQ_N).map((x) => x[0]) };
  const spec = { ...R, faqFixed: FAQ_N, faq: R.faq.slice(0, FAQ_N) };
  const pre = (x) => preflight(x, '실업급여');
  const sc = (a, s = sp) => specCheck(a, s, ref);
  const cases = [
    ['정상 계획은 통과', () => pre(sp).length === 0],
    ['faq: 2 (숫자만) 도 통과', () => pre({ ...sp, faq: 2 }).length === 0],
    ['정상 스펙은 통과', () => sc(spec).length === 0],
    ['FAQ 3개', () => pre({ ...sp, faq: [...sp.faq, '하나 더?'] }).length > 0],
    ['FAQ 물음표 없음', () => pre({ ...sp, faq: [sp.faq[0], '물음표 없는 질문'] }).length > 0],
    ['제목의 말이 소제목에 없음', () => pre({ ...sp, h2: sp.h2.map((h) => h.replace('신청', '접수')) }).length > 0],
    ['소제목이 질문형 아님', () => pre({ ...sp, h2: [...sp.h2.slice(0, -1), '취업하면 달라지는 점'] }).length > 0],
    ['소제목 중복', () => pre({ ...sp, h2: [...sp.h2, sp.h2[0]] }).length > 0],
    ['소제목 3개', () => pre({ ...sp, h2: sp.h2.slice(0, 3) }).length > 0],
    ['스펙 소제목 바꿔 씀', () => sc({ ...spec, sections: spec.sections.map((s, i) => (i ? s : { ...s, h2: '다른 소제목인가요' })) }).length > 0],
    ['스펙 FAQ 3개', () => sc({ ...spec, faq: R.faq.slice(0, 3) }).length > 0],
    ['스펙 FAQ 질문 바꿈', () => sc({ ...spec, faq: [spec.faq[0], ['다른 질문?', '답']] }).length > 0],
    ['faqFixed 빠짐', () => sc({ ...spec, faqFixed: undefined }).length > 0],
    ['본문 얕게', () => sc({ ...spec, sections: spec.sections.map((s) => ({ ...s, blocks: s.blocks.slice(0, 1) })) }).length > 0],
    ['위젯 빠짐', () => sc({ ...spec, sections: spec.sections.map((s) => ({ ...s, blocks: s.blocks.filter((x) => x.type !== 'widget') })) }).length > 0],
    ['원문 인용 부족', () => sc({ ...spec, claims: [] }).length > 0],
  ];
  let ok = 0;
  for (const [name, f] of cases) { const r = f(); ok += r ? 1 : 0; console.log(`${r ? '✓' : '✗'} ${name}`); }
  console.log(`\n${ok}/${cases.length}`);
  return ok === cases.length;
}
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href && process.argv.includes('--selftest')) {
  process.exit((await selftest()) ? 0 : 1);
}
