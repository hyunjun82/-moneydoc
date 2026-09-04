/**
 * 스포크 글이 거는 내부링크가 실제로 존재하는 페이지인지 본다.
 *   아직 안 쓴 글로 링크를 걸면 독자가 404 를 만난다.
 * 실행: node scripts/check-spoke-links.mjs [허브이름]
 */
import fs from 'node:fs';
import path from 'node:path';

const hub = process.argv[2] ?? 'unemployment';
const pages = new Set();

const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'page.tsx') {
      const rel = path.relative('app', dir).split(path.sep).join('/');
      pages.add(rel ? `/${rel}/` : '/');
    }
  }
};
walk('app');

const HREF = /href=\\?"(\/[a-z0-9/-]*\/)/g;
const dead = new Map();
const dir = path.join('app', hub);

for (const name of fs.readdirSync(dir)) {
  const pg = path.join(dir, name, 'page.tsx');
  if (!fs.existsSync(pg)) continue;
  for (const m of fs.readFileSync(pg, 'utf8').matchAll(HREF)) {
    if (!pages.has(m[1])) {
      if (!dead.has(m[1])) dead.set(m[1], []);
      dead.get(m[1]).push(name);
    }
  }
}

const mine = [...pages].filter((p) => p.startsWith(`/${hub}`)).sort();
console.log(`${hub} 페이지 ${mine.length}개`);
mine.forEach((p) => console.log('  ' + p));

if (dead.size) {
  console.log(`\nFAIL: 아직 없는 페이지로 거는 링크 ${dead.size}개`);
  for (const [href, from] of dead) console.log(`  ${href}  ← ${from.join(', ')}`);
  process.exit(1);
}
console.log('\nPASS · 죽은 내부링크 없음');
