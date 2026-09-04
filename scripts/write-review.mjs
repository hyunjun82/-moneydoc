#!/usr/bin/env node
/**
 * 독자 검토 기록 도우미 — 검토한 문장을 손으로 옮겨 적다 오타 나는 걸 막는다.
 *
 *   node scripts/write-review.mjs <hub> <slug> --query="검색어" --deeper="..." \
 *        --hard="말 → 풀이" --hard="..." --removed="지운 것" [--h2ans=1,2,3...]
 *
 * 무엇을 자동으로 채우나 (전부 빌드된 페이지에서 그대로 읽어 온다)
 *   firstScreenAnswer  첫 소제목 앞 서론 원문
 *   h2Answers          소제목마다 그 아래 첫 답 문장(span.ans) 원문
 *   specHash           지금 스펙 파일 해시
 * 사람이 적는 것: query · hardWords · removed · deeperThanHub. 즉 "읽고 판단한 결과" 만.
 *
 * 주의. 이 도구는 옮겨 적기만 대신한다. 페이지를 읽지 않고 돌리면 회피 답이 그대로 기록되고,
 * 게이트가 회피 답을 FAIL 시키므로 결국 막힌다. 읽는 일은 대신해 주지 않는다.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const [hub, slug, ...rest] = process.argv.slice(2);
if (!hub || !slug) { console.error('usage: write-review.mjs <hub> <slug> --query="..." --deeper="..." [--hard=".."] [--removed=".."]'); process.exit(1); }
const arg = (k) => rest.filter((a) => a.startsWith(`--${k}=`)).map((a) => a.slice(k.length + 3));
const one = (k) => arg(k)[0] ?? '';

const page = `public/_preview/article-v2-${hub}-${slug}-guide.html`;
const specPath = `scripts/article-template/articles/${hub}-${slug}-guide.mjs`;
const planPath = `scripts/title-system/titles.${hub}-v2.json`;
const h = fs.readFileSync(page, 'utf8');
const strip = (x) => x.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

const firstScreenAnswer = strip((h.match(/<p class="lead intro">([\s\S]*?)<\/p>/) ?? [])[1] ?? '');
const h2Answers = h.split(/<h2 id="s\d+">/).slice(1).map((p) => {
  const h2 = strip(p.slice(0, p.indexOf('</h2>')).replace(/<small>[\s\S]*/, ''));
  const ans = strip((p.split('<h2')[0].match(/<span class="ans">([\s\S]*?)<\/span>/) ?? [])[1] ?? '');
  return { h2, ans };
}).filter((x) => x.h2 && !/자주 묻는 질문|출처/.test(x.h2));

const review = {
  date: new Date().toISOString().slice(0, 10),
  specHash: createHash('sha256').update(fs.readFileSync(specPath)).digest('hex').slice(0, 12),
  query: one('query'),
  firstScreenAnswer,
  h2Answers,
  hardWords: arg('hard'),
  removed: arg('removed'),
  deeperThanHub: one('deeper'),
};

const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
let hit = null;
(function walk(o) {
  if (Array.isArray(o)) o.forEach(walk);
  else if (o && typeof o === 'object') { if (o.slug === slug) hit = o; else Object.values(o).forEach(walk); }
})(plan);
if (!hit) { console.error(`계획서에 ${slug} 가 없다`); process.exit(1); }
hit.review = review;
fs.writeFileSync(planPath, JSON.stringify(plan, null, 2) + '\n');

console.log(`${slug} 검토 기록 (소제목 ${h2Answers.length}개, specHash ${review.specHash})`);
for (const a of h2Answers) console.log(`  - ${a.h2}\n    → ${a.ans}`);
