#!/usr/bin/env node
/**
 * Truncation 자동 검사 — Claude Code Hook (stdin JSON 표준)
 * stdin에서 {tool_name, tool_input.file_path, ...} 받아서 파일 끝 확인.
 * 잘림 감지 시 stderr + exit 2 → Claude에 피드백.
 */
import fs from 'node:fs';
import path from 'node:path';

const raw = fs.readFileSync(0, 'utf-8');
let input;
try { input = JSON.parse(raw); } catch { process.exit(0); }

const filePath = input.tool_input?.file_path;
if (!filePath || !fs.existsSync(filePath)) process.exit(0);

const ext = path.extname(filePath).toLowerCase();
const target = ['.js', '.mjs', '.ts', '.tsx', '.json'];
if (!target.includes(ext)) process.exit(0);

const content = fs.readFileSync(filePath, 'utf-8');
const trimmed = content.trimEnd();
const last50 = trimmed.slice(-50);

if (ext === '.json') {
  try { JSON.parse(content); }
  catch (e) {
    process.stderr.write(`[TRUNCATION] ${filePath} JSON parse fail: ${e.message}\n`);
    process.stderr.write(`Last 50: ${last50}\n`);
    process.exit(2);
  }
} else {
  const okEnd = /[}\)\];]\s*$/.test(trimmed);
  if (!okEnd) {
    process.stderr.write(`[TRUNCATION] ${filePath} suspicious ending\n`);
    process.stderr.write(`Last 50: ${last50}\n`);
    process.exit(2);
  }
}
process.exit(0);
