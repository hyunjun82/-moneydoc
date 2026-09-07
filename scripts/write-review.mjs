#!/usr/bin/env node
/**
 * 독자 검토 기록 도우미 — 검토한 문장을 손으로 옮겨 적다 오타 나는 걸 막는다.
 *
 *   node scripts/write-review.mjs <hub> <slug> --query="검색어" --deeper="..." \
 *        --hard="말 → 풀이" --hard="..." --removed="지운 것" [--h2ans=1,2,3...]
 *        --found="[①-…] …" ×3+  또는  --foundFile=<한 줄에 한 항목인 텍스트 파일>  (명령줄 길이 한계. 83건이 안 넘어갔다 2026-09-06)
 *
 * 무엇을 자동으로 채우나 (전부 빌드된 페이지에서 그대로 읽어 온다)
 *   firstScreenAnswer  첫 소제목 앞 서론 원문
 * 사람이 적는 것에 titleKeyword 가 있다. 제목이 나온 실측 검색어를 그대로 적는다(게이트가 코퍼스와 대조).
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
const foundLines = [...arg('found'), ...arg('foundFile').flatMap((p) => fs.readFileSync(p, 'utf8').replace(/\r/g, '').split('\n').map((s) => s.trim()).filter(Boolean))];

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

const prev = (() => { try { const d = JSON.parse(fs.readFileSync(planPath, 'utf8')); let h = null;
  (function w(o) { if (Array.isArray(o)) o.forEach(w); else if (o && typeof o === 'object') { if (o.slug === slug) h = o; else Object.values(o).forEach(w); } })(d);
  return h?.review ?? null; } catch { return null; } })();
const refresh = rest.includes('--refresh');
if (refresh && !prev) { console.error('--refresh 는 기존 검토 기록이 있어야 한다'); process.exit(1); }
const review = refresh ? {
  // 글의 블록 순서만 바꾼 경우: 검토 판단(검색어·어려운 말·적대 검토)은 그대로 두고, 해시와 페이지에서 읽는 값만 새로 뽑는다.
  ...prev,
  date: new Date().toISOString().slice(0, 10),
  specHash: createHash('sha256').update(fs.readFileSync(specPath)).digest('hex').slice(0, 12),
  firstScreenAnswer,
  h2Answers,
  removed: [...(prev.removed ?? []), ...arg('removed')],
  ...(foundLines.length ? { adversarial: foundLines } : {}),
} : {
  date: new Date().toISOString().slice(0, 10),
  specHash: createHash('sha256').update(fs.readFileSync(specPath)).digest('hex').slice(0, 12),
  query: one('query'),
  titleKeyword: one('titleKeyword'),
  firstScreenAnswer,
  h2Answers,
  hardWords: arg('hard'),
  removed: arg('removed'),
  deeperThanHub: one('deeper'),
  // 6단계 적대 검토 결과. 글을 쓰지 않은 검토자가 REVIEW.md 세 관점으로 읽고 낸 항목을 그대로 옮긴다.
  // 형식은 "[①-제목] "…" → 왜" 이고, 고쳤으면 뒤에 " ⇒ 고침: …" 을 붙인다. 문제 없던 관점은 "[②] 없음".
  adversarial: foundLines,
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
