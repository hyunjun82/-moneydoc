/**
 * 주제 허브 URL 마이그레이션
 *
 *   옛 주소  /{cat}/{slug}/        계산기
 *            /{cat}/{slug}-guide/  가이드 글 (형제로 따로 있었다)
 *   새 주소  /{hub}/               허브 = 계산기 + 총정리 글 한 페이지
 *            /{hub}/{spoke}/       스포크 (하위 디렉토리)
 *
 * 카테고리(/law/ /gov/ /tax/ …)는 목록 페이지로만 남는다.
 * 매핑은 scripts/url-map.json. 실행: node scripts/migrate-hub-urls.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/url-map.json'), 'utf8'));

export const HUB = Object.fromEntries(Object.entries(map).filter(([k]) => !k.startsWith('_')));
export const HUB_NOCALC = map['_계산기없는허브'] ?? {};
const CAT_RENAME = map['_카테고리'] ?? {};

const log = [];
const mv = (from, to) => {
  const a = path.join(ROOT, from), b = path.join(ROOT, to);
  if (!fs.existsSync(a)) { log.push(`  건너뜀 (없음): ${from}`); return false; }
  if (fs.existsSync(b)) { log.push(`  건너뜀 (이미 있음): ${to}`); return false; }
  if (!DRY) {
    fs.mkdirSync(path.dirname(b), { recursive: true });
    fs.renameSync(a, b);
  }
  log.push(`  ${from}  →  ${to}`);
  return true;
};

// 1) 계산기 페이지 이동: app/{cat}/{slug}/ → app/{hub}/
let moved = 0;
for (const [key, hub] of Object.entries(HUB)) {
  const [cat, slug] = key.split('/');
  if (mv(`app/${cat}/${slug}`, `app/${hub}`)) moved++;
}

// 2) 카테고리 폴더 이름 변경 (government → gov)
for (const [from, to] of Object.entries(CAT_RENAME)) {
  if (mv(`app/${from}`, `app/${to}`)) moved++;
}

// 3) 옛 가이드 페이지 폴더 제거 (내용은 허브 페이지로 들어간다. 데이터 .ts 는 그대로 둔다)
let removed = 0;
const guideIdx = fs.readFileSync(path.join(ROOT, 'scripts/article-template/articles/index.mjs'), 'utf8');
for (const m of guideIdx.matchAll(/slug: '([^']+)', cat: '([^']+)'/g)) {
  const [, slug, cat] = m;
  const dir = path.join(ROOT, `app/${cat}/${slug}`);
  if (fs.existsSync(dir)) {
    if (!DRY) fs.rmSync(dir, { recursive: true, force: true });
    log.push(`  삭제: app/${cat}/${slug}  (허브로 합침)`);
    removed++;
  }
}

// 4) 옮긴 계산기 page.tsx 안의 옛 주소 문자열 교체
let rewritten = 0;
for (const [key, hub] of Object.entries(HUB)) {
  const [cat, slug] = key.split('/');
  const f = path.join(ROOT, `app/${hub}/page.tsx`);
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, 'utf8');
  const next = src.split(`/${cat}/${slug}/`).join(`/${hub}/`);
  if (next !== src) {
    if (!DRY) fs.writeFileSync(f, next, 'utf8');
    rewritten++;
  }
}

console.log(`${DRY ? '[예행] ' : ''}이동 ${moved}건 · 가이드 폴더 삭제 ${removed}건 · 주소 문자열 교체 ${rewritten}건`);
console.log(log.join('\n'));
