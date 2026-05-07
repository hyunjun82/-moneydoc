/**
 * 검증 결과 리포터 — Markdown + JSON 동시 출력
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = path.resolve(__dirname, '../reports');

export class Reporter {
  constructor(label) {
    this.label = label;
    this.timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    this.results = [];
    this.startTime = Date.now();
  }

  add(result) {
    this.results.push({ ...result, ts: Date.now() });
  }

  passCount() { return this.results.filter(r => r.status === 'pass').length; }
  failCount() { return this.results.filter(r => r.status === 'fail').length; }
  errorCount() { return this.results.filter(r => r.status === 'error').length; }

  toMarkdown() {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const lines = [
      `# 검증 리포트 — ${this.label}`,
      ``,
      `- 실행: ${this.timestamp}`,
      `- 소요: ${elapsed}s`,
      `- ✅ PASS: ${this.passCount()}`,
      `- ❌ FAIL: ${this.failCount()}`,
      `- ⚠️ ERROR: ${this.errorCount()}`,
      ``,
      `## 상세`,
      ``,
    ];

    for (const r of this.results) {
      const icon = r.status === 'pass' ? '✅' : r.status === 'fail' ? '❌' : '⚠️';
      lines.push(`### ${icon} ${r.calc} — ${r.case}`);
      if (r.adapter) lines.push(`- 어댑터: ${r.adapter}`);
      if (r.detail) lines.push(`- ${r.detail}`);
      if (r.diffs) {
        lines.push(`- 차이:`);
        for (const d of r.diffs) lines.push(`  - ${d}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }

  save() {
    if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
    const base = path.join(REPORTS_DIR, `${this.timestamp}-${this.label}`);
    fs.writeFileSync(`${base}.md`, this.toMarkdown(), 'utf-8');
    fs.writeFileSync(`${base}.json`, JSON.stringify({
      label: this.label,
      timestamp: this.timestamp,
      pass: this.passCount(),
      fail: this.failCount(),
      error: this.errorCount(),
      results: this.results,
    }, null, 2), 'utf-8');
    return { md: `${base}.md`, json: `${base}.json` };
  }

  print() {
    console.log(this.toMarkdown());
  }
}
