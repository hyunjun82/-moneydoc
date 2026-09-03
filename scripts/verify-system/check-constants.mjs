/**
 * 상수 출처 게이트 — 정부 고시로 매년 바뀌는 값이 출처 없이 들어가는 구멍을 막는다.
 *
 *   실행: node scripts/verify-system/check-constants.mjs
 *
 * verify-3way 는 "엔진 == JSON 기대값" 을 본다. 기대값 자체가 옛 고시로 만들어졌으면 그대로 통과한다.
 * 이 게이트는 그 앞단을 본다.
 *
 *   1) 상수나 표를 가진 모든 계산기는 constants-classification.json 의 세 갈래 중 하나에 반드시 들어가야 한다.
 *      annual   : 매년 정부 고시로 바뀌는 값 → verification.constantsSource 필수
 *      statutory: 법·시행령에 박혀 있어 개정 전까지 그대로인 값 (세율, 209시간, 지연이자 20% 등)
 *      pending  : 아직 분류·기록을 못 한 것 (경고로 계속 보이게 두고 줄여 나간다)
 *   2) constantsSource 에 적은 값은 실제 constants / tables 값과 일치해야 한다.
 *   3) 확인일(checkedAt)이 180일을 넘으면 경고한다.
 *
 * FAIL 이 하나라도 있으면 exit 1.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CALC = path.join(ROOT, 'moneydoc-data/calculators');
const CLS = path.join(ROOT, 'scripts/verify-system/constants-classification.json');
const STALE_DAYS = 180;

const cls = JSON.parse(fs.readFileSync(CLS, 'utf8'));
const bucket = new Map();
for (const [name, slugs] of Object.entries(cls)) {
  if (name.startsWith('_')) continue;
  for (const s of slugs) {
    if (bucket.has(s)) fail(`분류 중복: ${s} 가 ${bucket.get(s)} 와 ${name} 양쪽에 있어요`);
    bucket.set(s, name);
  }
}

const fails = [];
const warns = [];
function fail(m) { fails.push(m); }
function warn(m) { warns.push(m); }

/** "median100.6" 같은 경로로 tables 안의 값을 꺼낸다 */
const dig = (obj, keyPath) => keyPath.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const slugs = [];
for (const cat of fs.readdirSync(CALC)) {
  const dir = path.join(CALC, cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    const slug = `${cat}/${f.replace(/\.json$/, '')}`;
    const spec = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const hasConst = Object.keys(spec.constants ?? {}).length > 0;
    const hasTable = Object.keys(spec.tables ?? {}).length > 0;
    if (!hasConst && !hasTable) continue;
    slugs.push(slug);

    const kind = bucket.get(slug);
    if (!kind) { fail(`${slug}: 상수 분류가 없어요. constants-classification.json 의 annual / statutory / pending 중 하나에 넣으세요`); continue; }

    const sources = spec.verification?.constantsSource ?? [];
    if (kind === 'annual' && sources.length === 0) {
      fail(`${slug}: 매년 고시로 바뀌는 값인데 verification.constantsSource 가 없어요`);
      continue;
    }
    if (kind === 'pending') warn(`${slug}: 상수 출처 미기록 (pending)`);

    for (const src of sources) {
      if (!src.url || !src.checkedAt) { fail(`${slug}: constantsSource 에 url 과 checkedAt 이 있어야 해요`); continue; }
      const age = Math.floor((Date.now() - Date.parse(src.checkedAt)) / 86400000);
      if (!Number.isFinite(age)) fail(`${slug}: checkedAt 날짜 형식이 이상해요 (${src.checkedAt})`);
      else if (age > STALE_DAYS) warn(`${slug}: 고시 확인일이 ${age}일 지났어요 (${src.checkedAt}) — 다시 대조하세요`);

      for (const [k, v] of Object.entries(src.values ?? {})) {
        const actual = spec.constants?.[k];
        if (actual === undefined) fail(`${slug}: constantsSource 가 가리키는 상수 ${k} 가 없어요`);
        else if (actual !== v) fail(`${slug}: 상수 ${k} 가 고시값과 달라요 (JSON ${actual} vs 출처 ${v})`);
      }
      for (const [k, v] of Object.entries(src.tableValues ?? {})) {
        const actual = dig(spec.tables, k);
        if (actual === undefined) fail(`${slug}: constantsSource 가 가리키는 표 값 ${k} 가 없어요`);
        else if (actual !== v) fail(`${slug}: 표 값 ${k} 가 고시값과 달라요 (JSON ${actual} vs 출처 ${v})`);
      }
    }
  }
}

for (const s of bucket.keys()) {
  if (!slugs.includes(s)) fail(`분류에 있는 ${s} 가 계산기 목록에 없어요 (이름이 바뀌었거나 삭제됐어요)`);
}

const counts = [...bucket.values()].reduce((m, k) => ((m[k] = (m[k] || 0) + 1), m), {});
console.log(`상수 출처 점검 — 계산기 ${slugs.length}개`);
console.log(`  annual ${counts.annual ?? 0} · statutory ${counts.statutory ?? 0} · pending ${counts.pending ?? 0}`);
if (warns.length) { console.log(`\n경고 ${warns.length}건`); warns.forEach((w) => console.log(`  - ${w}`)); }
if (fails.length) {
  console.log(`\nFAIL ${fails.length}건`);
  fails.forEach((f) => console.log(`  ✗ ${f}`));
  process.exit(1);
}
console.log('\nPASS');
