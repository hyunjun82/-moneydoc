/**
 * 사실 대조: 글에 나온 모든 숫자·조문·키워드가 "엔진 값" 또는 "근거 JSON 텍스트"에 있어야 한다.
 *
 *   - 엔진 값: 스펙이 부른 계산기 결과의 모든 숫자 + 스펙 constants/tables 의 숫자 (build.mjs 가 모아서 넘김)
 *   - 근거: evidence/<slug>/*.json 의 text (콤마·공백 제거 후 포함 여부)
 *   - 조문: "제46조", "별표2", "§68" 같은 표기는 근거 텍스트에 그 조문 번호가 있어야 함
 *   - 키워드: brief.mustInclude 는 제목·소제목·FAQ 질문 중 하나에 있어야 하고, brief.queries 는 80% 이상 본문에 등장해야 함
 *
 * 작은 수(0~31, 단위 없는 것)와 연도(2019~2030)는 면제한다. 나머지는 한 건이라도 못 찾으면 FAIL.
 */
const strip = (s) => String(s ?? '').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/\s(href|src|data-[\w-]+|id|class|style|value|min|max|step)="[^"]*"/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
const norm = (s) => s.replace(/[,\s]/g, '');
// 법령은 "11만3500원"처럼 쓴다 → 113500 도 같이 넣어 둔다
const expandKo = (s) => s.replace(/(\d+)만\s?(\d{1,4})?\s?원?/g, (m, a, b) => `${m} ${Number(a) * 10000 + Number(b || 0)}`).replace(/(\d+)억\s?(\d{1,4})?만?/g, (m, a, b) => `${m} ${Number(a) * 1e8 + Number(b || 0) * 1e4}`);
const ko = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function factCheck({ html, evidence, engineNums, brief }) {
  const text = strip(html);
  const evNorm = evidence.map((e) => norm(expandKo(e.text)));
  const evAll = evNorm.join('\n');
  const inEvidence = (needle) => evAll.includes(norm(needle));
  const problems = [];

  // 1) 숫자
  const seen = new Set();
  const re = /(\d[\d,]*(?:\.\d+)?)\s*(%|원|만원|만|억|일|개월|년|세|시간|회|명|배|㎡|cc)?/g;
  let m;
  while ((m = re.exec(text))) {
    const raw = m[1], unit = m[2] ?? '';
    const num = raw.replace(/,/g, '');
    const key = num + unit;
    if (seen.has(key)) continue; seen.add(key);
    const v = Number(num);
    if (!unit && v >= 2019 && v <= 2030) continue;              // 연도
    if (!unit && v <= 31) continue;                              // 세 가지, 4단계, 1차 …
    if (/^(일|개월|년|세|시간|회|명|배)$/.test(unit) && v <= 31) continue; // 14일, 3개월, 50세
    if (engineNums.has(num) || engineNums.has(String(v))) continue;
    if (unit === '만' || unit === '만원') { if (engineNums.has(String(v * 1e4)) || inEvidence(num + '만') || inEvidence(String(v * 1e4))) continue; }
    if (unit === '억') { if (engineNums.has(String(v * 1e8)) || inEvidence(num + '억') || inEvidence(String(v * 1e8))) continue; }
    if (unit === '%') { if (inEvidence(num + '%') || inEvidence(`100분의${num}`) || inEvidence(`${num}퍼센트`)) continue; }
    if (inEvidence(num)) continue;
    const at = text.slice(Math.max(0, m.index - 40), m.index + 40).trim();
    problems.push(`숫자 근거 없음: ${raw}${unit}  ← "…${at}…"`);
  }

  // 2) 조문
  for (const c of new Set([...text.matchAll(/(제\d+조(?:의\d+)?|별표\s?\d+|§\s?\d+)/g)].map((x) => x[1].replace(/\s/g, '')))) {
    const n = c.replace(/^§/, '제').replace(/^제(\d+)$/, '제$1조');
    const alt = c.startsWith('별표') ? [c, c.replace('별표', '별표 ')] : [n, n.replace('제', '제 ')];
    if (!alt.some((a) => evAll.includes(norm(a)))) problems.push(`조문 근거 없음: ${c}`);
  }

  // 3) 키워드
  const heads = [...html.matchAll(/<(h1|h2|h3|summary)[^>]*>([\s\S]*?)<\/\1>/g)].map((x) => strip(x[2])).join(' | ');
  for (const k of brief?.mustInclude ?? []) if (!ko(heads).includes(ko(k)) && !heads.includes(k)) problems.push(`필수 키워드가 제목·소제목·FAQ에 없음: "${k}"`);
  const qs = brief?.queries ?? [];
  if (qs.length) {
    const body = ko(text);
    const miss = qs.filter((q) => { const toks = ko(q).split(' ').filter((t) => t.length >= 2); return !toks.every((t) => body.includes(t)); });
    const cover = 1 - miss.length / qs.length;
    if (cover < 0.8) problems.push(`실제 검색어 커버율 ${(cover * 100).toFixed(0)}% (<80%). 빠진 것: ${miss.slice(0, 8).join(' / ')}`);
    return { problems, coverage: cover, missing: miss };
  }
  return { problems, coverage: null, missing: [] };
}

/** 스펙이 쓴 계산기·상수의 숫자를 전부 모은다 (엔진 값 화이트리스트) */
export function collectEngineNums(calculators, specs) {
  const nums = new Set();
  const add = (v) => { if (typeof v === 'number' && Number.isFinite(v)) { nums.add(String(v)); nums.add(String(Math.round(v))); nums.add(String(Math.abs(Math.round(v)))); } else if (v && typeof v === 'object') Object.values(v).forEach(add); };
  const wrapped = {};
  for (const [k, fn] of Object.entries(calculators)) wrapped[k] = (input, spec) => { add(input); const r = fn(input, spec); add(r); return r; };
  for (const s of specs) { add(s.constants); add(s.tables); add((s.inputs ?? []).map((i) => i.default)); }
  return { calculators: wrapped, nums };
}
