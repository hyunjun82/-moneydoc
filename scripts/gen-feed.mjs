#!/usr/bin/env node
/**
 * feed.xml (RSS 2.0) 생성 — 가이드 글 전용
 *
 * 사이트맵과 역할이 다르다.
 *   sitemap.xml — 전체 URL 목록 (101개). 사이트 구조를 알린다.
 *   feed.xml    — 최신 글만 (20편). 새 글을 빨리 발견시킨다.
 * 구글도 사이트맵과 별개로 피드 제출을 권장한다.
 *
 * URL은 파일명이 아니라 실제 라우트에서 뽑는다.
 * (unemployment-benefit.ts → /government/unemployment-benefit-guide/ 처럼
 *  데이터 파일명과 경로가 다른 글이 있다.)
 *
 * 실행: node scripts/gen-feed.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://moneydoc.kr';
const APP_DIR = path.join(ROOT, 'app');
const PUBLIC_DIR = path.join(ROOT, 'public');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** meta 객체에서 문자열 필드 하나를 꺼낸다 */
function field(src, name) {
  const m = new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(src);
  if (!m) return null;
  try { return JSON.parse(`"${m[1]}"`); } catch { return m[1]; }
}

const items = [];

(function walk(dir, route) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_') || e.name === 'api') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p, `${route}/${e.name}`); continue; }
    if (e.name !== 'page.tsx') continue;

    const page = fs.readFileSync(p, 'utf8');
    const imp = /from\s+"@\/data\/articles\/([^"]+)"/.exec(page);
    if (!imp) continue; // 글 페이지가 아님

    const dataPath = path.join(ROOT, 'moneydoc-data/articles', `${imp[1]}.ts`);
    if (!fs.existsSync(dataPath)) {
      console.warn(`  ⚠ 데이터 파일 없음: ${dataPath}`);
      continue;
    }
    const src = fs.readFileSync(dataPath, 'utf8');
    const title = field(src, 'title');
    const description = field(src, 'description');
    const date = field(src, 'dateModified') || field(src, 'datePublished');
    if (!title) { console.warn(`  ⚠ title 없음: ${dataPath}`); continue; }

    items.push({ url: `${SITE}${route}/`, title, description: description || '', date: date || '' });
  }
})(APP_DIR, '');

// 최신 글이 위로
items.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title));

const rfc822 = (d) => (d ? new Date(`${d}T09:00:00+09:00`).toUTCString() : '');
const latest = items[0]?.date || '';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MoneyDoc 계산기 가이드</title>
    <link>${SITE}/</link>
    <description>한국 금융·세금·법률 계산 기준을 법령 원문으로 확인해 정리한 가이드</description>
    <language>ko</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.url}</link>
      <guid isPermaLink="true">${i.url}</guid>
      <description>${esc(i.description)}</description>
      <pubDate>${rfc822(i.date)}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), xml, 'utf8');

// robots.txt 에 피드 줄을 더한다 (사이트맵 줄 바로 뒤)
const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('/feed.xml')) {
    robots = robots.replace(
      `Sitemap: ${SITE}/sitemap.xml`,
      `Sitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/feed.xml`
    );
    fs.writeFileSync(robotsPath, robots, 'utf8');
    console.log('robots.txt 에 feed.xml 추가');
  }
}

console.log(`feed.xml 생성 — 글 ${items.length}편 (최신 ${latest})`);
if (items.length < 15) {
  console.error(`❌ 글이 ${items.length}편뿐 — 라우트 탐지가 잘못됐을 수 있다`);
  process.exit(1);
}
