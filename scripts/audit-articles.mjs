// 가이드 글 15편 점검: 내부 링크가 실제 라우트를 가리키는지, 앵커가 존재하는지,
// 위젯 키가 레지스트리에 있는지, 필수 요소(FAQ·표·근거)가 남아 있는지.
// 실행: node scripts/audit-articles.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ARTICLES } from './convert-previews.mjs';
import { WIDGETS } from '../components/article-widgets.js';

const ROOT = process.cwd();

// 실제 존재하는 라우트 수집
const routes = new Set();
(function walk(dir, base) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_') || e.name === 'api') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, `${base}/${e.name}`);
    else if (e.name === 'page.tsx') routes.add(`${base}/`);
  }
})(path.join(ROOT, 'app'), '');

let problems = 0;
const note = (a, msg) => { console.log(`  ❌ ${msg}`); problems++; };

console.log(`라우트 ${routes.size}개 · 글 ${ARTICLES.length}편 점검\n`);

for (const a of ARTICLES) {
  const dataPath = path.join(ROOT, 'moneydoc-data/articles', a.cat, `${a.slug}.ts`);
  const pagePath = path.join(ROOT, 'app', a.cat, a.slug, 'page.tsx');
  const url = `/${a.cat}/${a.slug}/`;
  console.log(`${String(a.n).padStart(2)}. ${url}`);

  if (!fs.existsSync(dataPath)) { note(a, `데이터 파일 없음: ${dataPath}`); continue; }
  if (!fs.existsSync(pagePath)) { note(a, `페이지 파일 없음: ${pagePath}`); continue; }

  const src = fs.readFileSync(dataPath, 'utf8');

  // 위젯 키
  if (!WIDGETS[a.widget]) note(a, `위젯 레지스트리에 '${a.widget}' 없음`);

  // 내부 링크 검증
  const hrefs = [...src.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  const dead = [...new Set(hrefs)].filter((h) => h !== '/' && !routes.has(h));
  if (dead.length) note(a, `깨진 링크 ${dead.length}개: ${dead.join(', ')}`);

  // 앵커 검증 (#m1 등이 본문에 id로 있는지)
  const anchors = [...new Set([...src.matchAll(/href="#([\w-]+)"/g)].map((m) => m[1]))];
  const ids = new Set([...src.matchAll(/id="([\w-]+)"/g)].map((m) => m[1]));
  const deadAnchors = anchors.filter((x) => !ids.has(x));
  if (deadAnchors.length) note(a, `깨진 앵커: ${deadAnchors.map((x) => '#' + x).join(', ')}`);

  // 접두사 누락 (전역 CSS와 충돌하는 클래스가 남았는지)
  const bare = [...new Set([...src.matchAll(/class=\\?"([^"\\]*)\\?"/g)]
    .flatMap((m) => m[1].split(/\s+/))
    .filter((c) => c && !c.startsWith('ax-')))];
  if (bare.length) note(a, `접두사 없는 클래스: ${bare.join(', ')}`);

  // 필수 구성요소
  const faqCount = (src.match(/"@type": "Question"/g) || []).length;
  if (faqCount < 5) note(a, `FAQ ${faqCount}개 (5개 미만)`);
  if (!/ax-lawq/.test(src)) note(a, '근거 자료(.ax-lawq) 없음');
  if (!/ax-src/.test(src)) note(a, '출처 박스(.ax-src) 없음');
  if (!/<table>/.test(src)) note(a, '표 없음');

  const body = (/htmlBefore = `([\s\S]*?)`;/.exec(src)?.[1] ?? '') +
               (/htmlAfter = `([\s\S]*?)`;/.exec(src)?.[1] ?? '');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 2500) note(a, `본문 텍스트 ${text.length}자 — 너무 짧음`);
  console.log(`     본문 ${text.length.toLocaleString()}자 · FAQ ${faqCount} · 링크 ${new Set(hrefs).size}종`);
}

console.log(`\n${problems === 0 ? '✅ 이상 없음' : `❌ 문제 ${problems}건`}`);
process.exit(problems === 0 ? 0 : 1);
