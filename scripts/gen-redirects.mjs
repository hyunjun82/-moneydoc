#!/usr/bin/env node
/**
 * 옛 주소 → 새 주소 301 넘김을 public/_redirects 에 채운다.
 *
 *   node scripts/gen-redirects.mjs [--check]
 *
 * 왜 필요한가 (2026-09-07).
 *   convert-v2 는 url-map.json 에 등록되기 전의 글을 /{cat}/{slug}/ 로 냈다.
 *   등록 뒤에는 /{hub}/{spoke}/ 로 옮겨 가는데, 옛 주소를 그냥 지우면 색인과 백링크가 죽는다.
 *   실제로 스포크 48개 중 43개가 _redirects 에 없었다.
 *
 *   그리고 파일 끝에 포괄 규칙 `/government/*  /gov/:splat` 이 있다.
 *   Cloudflare 는 먼저 맞는 규칙을 쓰므로, 개별 넘김은 반드시 그 앞에 넣어야 한다.
 *   안 그러면 옛 주소가 /gov/... 라는 또 다른 없는 페이지로 넘어간다.
 *
 * 손으로 적은 줄은 건드리지 않는다. 빠진 줄만 표시 구간 안에 채운다.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'public/_redirects');
const BEGIN = '# --- 스포크 옛 주소 (gen-redirects.mjs 가 채운다. 손대지 말 것) ---';
const END = '# --- 스포크 옛 주소 끝 ---';
const check = process.argv.includes('--check');

const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/url-map.json'), 'utf8'));
const spokes = map['_계산기없는허브'] ?? {};

// `government/unemployment-merge-periods-guide` -> `unemployment/merge-periods`
const lines = [];
for (const [oldKey, route] of Object.entries(spokes)) {
  const target = `/${route}/`;
  const withGuide = `/${oldKey}/`;                      // /government/unemployment-merge-periods-guide/
  const noGuide = `/${oldKey.replace(/-guide$/, '')}/`; // /government/unemployment-merge-periods/
  for (const from of new Set([withGuide, noGuide])) {
    if (from === target) continue;
    lines.push(`${from.padEnd(56)}${target}  301`);
  }
}
lines.sort();

let src = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
const block = `${BEGIN}\n${lines.join('\n')}\n${END}\n`;

if (src.includes(BEGIN)) {
  src = src.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}\\n`), block);
} else {
  // 포괄 규칙(/government/*) 앞에 넣는다. 없으면 파일 끝에.
  const anchor = src.indexOf('# 카테고리 이름 변경');
  src = anchor > 0 ? src.slice(0, anchor) + block + '\n' + src.slice(anchor) : `${src.trimEnd()}\n\n${block}`;
}

const before = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
if (check) {
  console.log(before === src ? `PASS 넘김 ${lines.length}줄 최신` : `FAIL 넘김이 낡았다 (${lines.length}줄 필요). node scripts/gen-redirects.mjs 로 갱신해라`);
  process.exit(before === src ? 0 : 1);
}
fs.writeFileSync(FILE, src, 'utf8');
console.log(`스포크 옛 주소 ${lines.length}줄 기록 · ${path.relative(ROOT, FILE)}`);
