#!/usr/bin/env node
/**
 * 디스커버·SNS용 대표 이미지 렌더러 — 글 생성기가 만든 히어로 SVG 를 1200×630 PNG 로 굽는다.
 * 사용: node scripts/article-template/render-og.mjs <svg 파일> <png 출력>
 * (구글 디스커버는 페이지 안 그림이 아니라 og:image / Article.image 의 1200px 이상 실제 이미지 파일을 본다)
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
const [svgPath, pngPath] = process.argv.slice(2);
if (!svgPath || !pngPath) { console.error('usage: render-og.mjs <svg> <png>'); process.exit(1); }
const svg = fs.readFileSync(svgPath, 'utf8');
const font = fs.readFileSync(path.resolve('public/fonts/PretendardVariable.woff2')).toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:Pretendard;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:45 920}html,body{margin:0;background:#fff}svg{display:block;width:1200px;height:630px}</style>${svg.replace(/<svg /, '<svg width="1200" height="630" ')}`;
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
fs.mkdirSync(path.dirname(pngPath), { recursive: true });
await p.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await b.close();
console.log('og image', pngPath, fs.statSync(pngPath).size, 'bytes');
