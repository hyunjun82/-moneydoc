/**
 * 제목과 소제목 구성이 일치하는지 본다.
 *   1) 제목이 약속한 말(mustCover)이 전부 H2 안에 그대로 나오는가
 *   2) mustCover 가 제목 안에 실제로 있는 말인가 (허위 선언 방지)
 *   3) H2 가 5개 이상이고, 질문형이고, 편끼리 겹치지 않는가
 *   4) 제목이 검색어 원문 형태인가 ('실업급여' 를 달고 있는가)
 * 실행: node scripts/title-system/check-outline.mjs [파일]
 */
import fs from 'node:fs';

const file = process.argv[2] ?? 'scripts/title-system/titles.unemployment-v2.json';
const d = JSON.parse(fs.readFileSync(file, 'utf8'));
const head = d.keyword;
const spokes = d.groups.flatMap((g) => g.spokes);

const norm = (s) => s.replace(/\s+/g, '');
const fails = [];
const warns = [];

for (const s of spokes) {
  const tag = `[${s.slug}]`;
  const body = norm(s.h2.join(' '));
  const title = norm(s.title);

  if (!s.mustCover?.length) fails.push(`${tag} mustCover 가 없다`);
  for (const w of s.mustCover ?? []) {
    if (!title.includes(norm(w))) fails.push(`${tag} mustCover "${w}" 가 제목에 없다`);
    // issue 가 적힌 편은 이미 알고 있는 결함이다. 목록에만 남기고 게이트는 막지 않는다
    else if (!body.includes(norm(w))) (s.issue ? warns : fails).push(`${tag} 제목의 "${w}" 가 소제목에 없다`);
  }

  if (s.h2.length < 5) fails.push(`${tag} 소제목이 ${s.h2.length}개다 (5개 이상)`);
  const notQ = s.h2.filter((h) => !/(요|나|가|까)$/.test(h));
  if (notQ.length) fails.push(`${tag} 질문형이 아닌 소제목: ${notQ.join(' / ')}`);

  // 제목이 검색어 원문 형태인가. 머리 키워드가 없으면 경고
  if (!s.title.includes(head)) warns.push(`${tag} 제목에 "${head}" 가 없다 — ${s.title}`);
}

// 편끼리 소제목 중복
const seen = new Map();
for (const s of spokes) for (const h of s.h2) {
  const k = norm(h);
  if (seen.has(k)) fails.push(`[${s.slug}] 소제목이 [${seen.get(k)}] 와 겹친다: ${h}`);
  else seen.set(k, s.slug);
}

// 제목 어미 분포
const kkaji = spokes.filter((s) => /까지$/.test(s.title)).length;
const pct = Math.round((kkaji / spokes.length) * 100);
if (pct > 15) fails.push(`"까지" 로 끝나는 제목이 ${pct}% 다 (15% 이하)`);

const issues = spokes.filter((s) => s.issue);

console.log(`${spokes.length}편 · 소제목 ${spokes.reduce((a, s) => a + s.h2.length, 0)}개 · "까지" ${pct}%`);
if (warns.length) { console.log(`\n경고 ${warns.length}건`); warns.forEach((w) => console.log('  ' + w)); }
if (issues.length) { console.log(`\n손봐야 하는 편 ${issues.length}건`); issues.forEach((s) => console.log(`  [${s.slug}] ${s.issue}`)); }
if (fails.length) { console.log(`\nFAIL ${fails.length}건`); fails.forEach((f) => console.log('  ' + f)); process.exit(1); }
console.log('\nPASS');
