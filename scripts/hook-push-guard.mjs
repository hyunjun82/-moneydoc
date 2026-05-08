#!/usr/bin/env node
/** PreToolUse 후크 — push-changes.bat 호출 시 verify-3way --all PASS 강제 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const raw = fs.readFileSync(0, 'utf-8');
let input;
try { input = JSON.parse(raw); } catch { process.exit(0); }

const cmd = input.tool_input?.command || '';
if (!/push-changes\.bat/.test(cmd)) process.exit(0);

try {
  const out = execSync('node scripts/verify-system/verify-3way.mjs --all --no-gov 2>&1 | tail -3',
    { cwd: input.cwd || process.cwd(), encoding: 'utf-8', timeout: 60000 });
  if (!/0 fail/.test(out)) {
    process.stderr.write(`[PUSH BLOCKED] verify-3way FAIL\n${out}\n`);
    process.exit(2);
  }
  process.stdout.write('[push allowed] verify-3way PASS\n');
} catch (e) {
  process.stderr.write(`[PUSH BLOCKED] ${e.message}\n`);
  process.exit(2);
}
