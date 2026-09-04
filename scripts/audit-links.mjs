// 빌드 결과(out/)의 모든 내부 링크가 실제 페이지를 가리키는지 확인한다.
// 실행: npx next build 후  node scripts/audit-links.mjs
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
if (!fs.existsSync(OUT)) {
  console.error('out/ 이 없습니다. 먼저 next build 를 실행하세요.');
  process.exit(1);
}

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      // _next 는 에셋, _preview 는 postbuild 에서 걷어내는 로컬 미리보기
      if (e.name !== '_next' && e.name !== '_preview') walk(p);
    } else if (e.name === 'index.html') pages.push(p);
  }
})(OUT);

const exists = (u) => {
  const rel = u.replace(/^\//, '');
  return (
    fs.existsSync(path.join(OUT, rel, 'index.html')) ||
    fs.existsSync(path.join(OUT, rel))
  );
};

const SKIP = /^\/_next|\.(xml|txt|ico|png|jpe?g|svg|webmanifest|css|js)$/;
const HREF = /href=\\?"(\/[^"\\#?]*)/g;

const broken = new Map();
let total = 0;

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(HREF)) {
    const u = m[1];
    if (u === '/' || SKIP.test(u)) continue;
    total++;
    if (!exists(u)) {
      if (!broken.has(u)) broken.set(u, new Set());
      broken.get(u).add(f.replace(/\\/g, '/').replace(/^out/, '').replace(/index\.html$/, ''));
    }
  }
}

console.log(`페이지 ${pages.length}개 · 내부 링크 ${total.toLocaleString()}개 검사`);
if (broken.size === 0) {
  console.log('✅ 깨진 내부 링크 없음');
  process.exit(0);
}
console.log(`❌ 깨진 링크 ${broken.size}종`);
for (const [u, srcs] of broken) {
  const list = [...srcs];
  console.log(`  ${u}\n     ← ${list.slice(0, 3).join(', ')}${list.length > 3 ? ` 외 ${list.length - 3}곳` : ''}`);
}
process.exit(1);
