/**
 * 옛 주소 → 허브 주소로 소스 안의 링크를 일괄 교체한다.
 *   /{cat}/{slug}/        → /{hub}/
 *   /{cat}/{slug}-guide/  → /{hub}/            (가이드가 허브로 합쳐졌으므로)
 *   /government/          → /gov/
 * 대상: app · components · lib · scripts/article-template/articles (글 스펙)
 * 실행: node scripts/rewrite-links.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/url-map.json'), 'utf8'));
const HUB = Object.fromEntries(Object.entries(map).filter(([k]) => !k.startsWith('_')));
const NOCALC = map['_계산기없는훕'] ?? map['_계산기없는허브'] ?? {};

// 긴 주소부터 바꿔야 부분 치환 사고가 없다
const pairs = [];
for (const [key, hub] of Object.entries(HUB)) {
  const [cat, slug] = key.split('/');
  pairs.push([`/${cat}/${slug}-guide/`, `/${hub}/`]);
  pairs.push([`/${cat}/${slug}/`, `/${hub}/`]);
}
for (const [key, hub] of Object.entries(NOCALC)) {
  const [cat, slug] = key.split('/');
  pairs.push([`/${cat}/${slug}/`, `/${hub}/`]);
}
pairs.push(['/government/', '/gov/']);
pairs.sort((a, b) => b[0].length - a[0].length);

const DIRS = ['app', 'components', 'lib', 'scripts/article-template/articles', 'moneydoc-data/articles'];
const EXT = new Set(['.tsx', '.ts', '.mjs']);
let files = 0, hits = 0;

const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { walk(p); continue; }
    if (!EXT.has(path.extname(f.name))) continue;
    // 데이터 import 경로(@/data/calculators/government/...)는 건드리면 안 된다
    let s = fs.readFileSync(p, 'utf8');
    const before = s;
    for (const [from, to] of pairs) {
      if (!s.includes(from)) continue;
      // import 경로 안의 /government/ 는 제외
      s = s.split(from).join(to);
    }
    // 되돌리기: data import 경로는 원래대로
    s = s.replace(/@\/data\/(calculators|articles)\/gov\//g, '@/data/$1/government/');
    if (s !== before) {
      const n = pairs.reduce((acc, [from]) => acc + before.split(from).length - 1, 0);
      hits += n; files++;
      if (!DRY) fs.writeFileSync(p, s, 'utf8');
      console.log(`  ${p}  (${n}곳)`);
    }
  }
};

for (const d of DIRS) if (fs.existsSync(path.join(ROOT, d))) walk(path.join(ROOT, d));
console.log(`${DRY ? '[예행] ' : ''}파일 ${files}개 · 링크 ${hits}곳 교체`);
