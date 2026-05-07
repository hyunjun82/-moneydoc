/**
 * 84개 계산기 JSON에서 verification.cases 자동 로드
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CALC_DIR = path.resolve(__dirname, '../../../moneydoc-data/calculators');

export function loadAllCalculators() {
  const calcs = [];
  for (const cat of fs.readdirSync(CALC_DIR).sort()) {
    const catDir = path.join(CALC_DIR, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const file of fs.readdirSync(catDir).sort()) {
      if (!file.endsWith('.json')) continue;
      const fp = path.join(catDir, file);
      const json = JSON.parse(fs.readFileSync(fp, 'utf-8'));
      calcs.push({
        category: cat,
        slug: json.slug || file.replace('.json', ''),
        title: json.title,
        cases: json.verification?.cases || [],
        sourceFile: fp,
        defaultAdapter: inferDefaultAdapter(cat, json),
        json,  // 산식 함수가 data 인자로 사용 (constants/tables)
      });
    }
  }
  return calcs;
}

export function loadByCategory(category) {
  return loadAllCalculators().filter(c => c.category === category);
}

export function loadBySlug(slug) {
  return loadAllCalculators().find(c => c.slug === slug);
}

function inferDefaultAdapter(category, json) {
  if (category === 'loan') {
    if (json.slug === 'loan-amortization') return 'kinfa';
    if (json.slug === 'jeonse-loan') return 'hf';
    if (json.slug === 'mortgage-loan-limit') return 'kinfa';
    return 'kinfa';
  }
  if (category === 'tax') return 'hometax';
  if (category === 'pension') return 'nps';
  if (category === 'savings') return 'finlife';
  if (category === 'realestate') return 'molit';
  if (category === 'insurance') return 'fourinsure';
  if (category === 'government') return 'gov-portal';
  return null;
}

export function saveCalculator(calc) {
  fs.writeFileSync(calc.sourceFile, JSON.stringify(calc.json, null, 2) + '\n', 'utf-8');
}
