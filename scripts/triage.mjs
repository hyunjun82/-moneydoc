#!/usr/bin/env node
/**
 * 미검토 글 훑기 — 27편을 한 편씩 읽기 전에 어디가 망가졌는지 지도를 만든다.
 *
 *   node scripts/triage.mjs <hub> [--all]
 *
 * 무엇을 보나 (게이트가 보는 것과 같은 기준, 다만 FAIL 이 아니라 목록으로)
 *   - 소제목마다 답(span.ans 첫 문장)이 있는가
 *   - 그 답이 회피인가 ("사람마다 달라요 / 확인해 보세요 / 물어보세요")
 *   - 첫 화면(서론)이 답으로 시작하는가
 *   - FAQ 답이 회피인가
 *   - 계획서에 적은 링크가 본문에 있는가
 * 세는 게 아니라 읽을 순서를 정하려는 것이다. 실제 판단은 사람이 글을 읽고 한다.
 */
import fs from 'node:fs';

const hub = process.argv[2] ?? 'unemployment';
const all = process.argv.includes('--all');
const EVADE = /(사람마다 달라|사람마다 다르|확인해 보세요|확인해보세요|물어보세요|문의하세요|담당자에게 직접|경우에 따라 달라|상황에 따라 달라|일반화하기 어려|케이스마다)/;

const plan = JSON.parse(fs.readFileSync(`scripts/title-system/titles.${hub}-v2.json`, 'utf8'));
const spokes = [];
(function walk(o) {
  if (Array.isArray(o)) o.forEach(walk);
  else if (o && typeof o === 'object') { if (o.slug && o.h2) spokes.push(o); Object.values(o).forEach(walk); }
})(plan);

const strip = (x) => x.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const rows = [];

for (const s of spokes) {
  const f = `public/_preview/article-v2-${hub}-${s.slug}-guide.html`;
  if (!fs.existsSync(f)) continue;
  if (s.review && !all) continue;
  const h = fs.readFileSync(f, 'utf8');

  const intro = strip((h.match(/<p class="lead intro">([\s\S]*?)<\/p>/) ?? [])[1] ?? '');
  // 소제목마다: 그 h2 부터 다음 h2 까지 사이의 첫 span.ans
  const parts = h.split(/<h2 id="s\d+">/).slice(1);
  const secs = parts.map((p) => {
    const h2 = strip(p.slice(0, p.indexOf('</h2>')).replace(/<small>[\s\S]*/, ''));
    const seg = p.split('<h2')[0];
    const ans = strip((seg.match(/<span class="ans">([\s\S]*?)<\/span>/) ?? [])[1] ?? '');
    return { h2, ans };
  }).filter((x) => x.h2 && !/자주 묻는 질문|출처/.test(x.h2));

  const faq = [...h.matchAll(/<details class="faq"[^>]*>([\s\S]*?)<\/details>/g)].map((m) => strip(m[1]));
  const bodyEnd = h.indexOf('class="related"') > 0 ? h.indexOf('class="related"') : h.length;
  const placed = new Set([...h.slice(0, bodyEnd).matchAll(new RegExp(`href="/${hub}/([a-z0-9-]+)/"`, 'g'))].map((m) => m[1]));
  const pages = new Set(spokes.map((x) => x.slug));
  const missLink = (s.links ?? []).map((l) => l.to).filter((t) => !placed.has(t) && pages.has(t));

  const noAns = secs.filter((x) => !x.ans);
  const evAns = secs.filter((x) => EVADE.test(x.ans));
  const evFaq = faq.filter((x) => EVADE.test(x));
  const flags = [];
  if (secs.length !== s.h2.length) flags.push(`소제목 ${secs.length}/${s.h2.length}`);
  if (noAns.length) flags.push(`답 없는 소제목 ${noAns.length}`);
  if (evAns.length) flags.push(`회피 답 ${evAns.length}`);
  if (EVADE.test(intro)) flags.push('첫 화면 회피');
  if (evFaq.length) flags.push(`FAQ 회피 ${evFaq.length}`);
  if (missLink.length) flags.push(`링크 누락 ${missLink.join(',')}`);
  rows.push({ s, intro, secs, evFaq, flags });
}

rows.sort((a, b) => (b.flags.length - a.flags.length) || a.s.slug.localeCompare(b.s.slug));
for (const r of rows) {
  console.log(`\n## ${r.s.slug} [${r.s.tier}] ${r.flags.length ? '⚠ ' + r.flags.join(' · ') : '표면상 깨끗'}`);
  console.log(`   제목: ${r.s.title}`);
  console.log(`   첫화면: ${r.intro.slice(0, 120)}`);
  for (const x of r.secs) console.log(`   - ${x.h2}\n     → ${x.ans ? x.ans.slice(0, 100) : '(답 문장 없음)'}${EVADE.test(x.ans) ? '   ◀ 회피' : ''}`);
  for (const x of r.evFaq) console.log(`   FAQ ◀ 회피: ${x.slice(0, 100)}`);
}
console.log(`\n${rows.length}편 · 표시된 글 ${rows.filter((r) => r.flags.length).length}편`);
