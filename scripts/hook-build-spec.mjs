#!/usr/bin/env node
/**
 * PostToolUse 후크 — 글 스펙(articles/<slug>.mjs)을 쓰거나 고치면 build.mjs 대조를 바로 돌린다.
 * FAIL 이면 exit 2 로 목록을 Claude 에게 되돌려 그 자리에서 고치게 한다. 사람이 "빌드 돌려" 라고 말할 일이 없다.
 * (index.mjs 는 제외. article.mjs 오케스트레이터는 Write 를 안 쓰므로 여기 안 걸린다)
 */
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const fp = (input.tool_input?.file_path ?? '').replace(/\\/g, '/');
const m = fp.match(/scripts\/article-template\/articles\/([a-z0-9-]+)\.mjs$/);
if (!m || m[1] === 'index') process.exit(0);
const slug = m[1];
const r = spawnSync(process.execPath, [path.join(input.cwd ?? process.cwd(), 'scripts/article-template/build.mjs'), slug], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const out = (r.stdout ?? '') + (r.stderr ?? '');
if (r.status === 0) { console.log(`build.mjs ${slug} 통과`); process.exit(0); }
const fails = out.split('\n').filter((l) => /^\s+- |✗/.test(l)).map((l) => l.trim());
console.error(`build.mjs ${slug} FAIL ${fails.length}건 — 전부 고친 뒤 다시 저장한다\n${fails.join('\n')}`);
process.exit(2);
