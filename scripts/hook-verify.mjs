#!/usr/bin/env node
/**
 * PostToolUse 후크 — engine.js 또는 calc JSON 변경 시 자동 검증
 *  - 산식: verify-3way --calc=<slug> --no-gov (변경된 계산기만)
 *  - 가이드: verify-guide-numbers --calc=<slug>
 *  - engine.js 변경 시는 --all
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const raw = fs.readFileSync(0, 'utf-8');
let input;
try { input = JSON.parse(raw); } catch { process.exit(0); }

const filePath = input.tool_input?.file_path || '';
const cwd = input.cwd || process.cwd();

// engine.js 변경 → 전체 검증
const isEngine = /lib[\\/]calc[\\/]engine\.js$/.test(filePath);
// calculators JSON 변경 → 해당 slug만
const calcMatch = filePath.match(/calculators[\\/][^\\/]+[\\/]([^\\/.]+)\.json$/);

if (!isEngine && !calcMatch) process.exit(0);

const target = isEngine ? '--all' : `--calc=${calcMatch[1]}`;

try {
  const out = execSync(
    `node scripts/verify-system/verify-3way.mjs ${target} --no-gov 2>&1 | tail -5`,
    { cwd, encoding: 'utf-8', timeout: 30000 }
  );
  if (/fail/i.test(out) && !/0 fail/.test(out)) {
    process.stderr.write(`[VERIFY-3WAY FAIL]\n${out}\n`);
    process.exit(2);
  }
  // 가이드 숫자 검증 (loan만 룰 등록됨 - 룰 없으면 skip)
  if (calcMatch) {
    try {
      execSync(`node scripts/verify-system/verify-guide-numbers.mjs --calc=${calcMatch[1]} 2>&1 | tail -3`,
        { cwd, encoding: 'utf-8', timeout: 15000 });
    } catch {}
  }
  process.stdout.write(`[verify ✅] ${target}\n`);
} catch (e) {
  process.stderr.write(`[HOOK ERR] ${e.message}\n`);
  process.exit(0);  // 후크 자체 오류는 작업 차단 X
}
