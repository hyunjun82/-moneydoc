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
const expandKo = (s) => s.replace(/(\d[\d,]*)천원/g, (m, a) => `${m} ${Number(a.replace(/,/g, '')) * 1000}`).replace(/(\d+)만\s?(\d{1,4})?\s?원?/g, (m, a, b) => `${m} ${Number(a) * 10000 + Number(b || 0)}`).replace(/(\d+)억\s?(\d{1,4})?만?/g, (m, a, b) => `${m} ${Number(a) * 1e8 + Number(b || 0) * 1e4}`);
const ko = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function factCheck({ html, evidence, engineNums, brief, claims }) {
  const text = strip(html);
  const evNorm = evidence.map((e) => norm(expandKo(e.text)));
  const evAll = evNorm.join('\n');
  const inEvidence = (needle) => evAll.includes(norm(needle));
  const problems = [];

  // 1) 숫자
  const seen = new Set();
  // '퍼센트' 가 빠져 있어 "65퍼센트" 가 단위 없는 숫자로 새어 나갔다 (돌연변이 36번)
  const re = /(\d[\d,]*(?:\.\d+)?)\s*(%|퍼센트|원|만원|만|억|일|개월|년|세|시간|회|명|배|㎡|cc)?/g;
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
    if (unit === '%' || unit === '퍼센트') {
      // 4.75% = 엔진 상수 0.0475, 또는 법령의 "1만분의 475" / "1천분의 95" / "100분의 60" / "100만분의 9,448" 표기
      const frac = String(+(v / 100).toFixed(10));
      if (engineNums.has(frac)) continue;
      const half = String(+(v * 2 / 100).toFixed(10));           // 근로자 절반 표기(3.595% ← 1만분의 719 의 절반)
      const hits = [[100, '100분의'], [1000, '1천분의'], [10000, '1만분의'], [1000000, '100만분의']].some(([d, w]) => {
        const n1 = Math.round(v / 100 * d);
        const ok = (n) => Number.isInteger(n) && (inEvidence(`${w}${n}`) || inEvidence(`${w}${n.toLocaleString('ko-KR')}`));
        // 절반 표기(3.595% ← 1만분의 719 의 절반)는 보험료율처럼 작은 값에만 쓴다.
        // 이 조건이 열려 있어서 "65퍼센트" 가 근거의 "100분의130"(그 두 배)을 만나 통과했다. 돌연변이 36번.
        if (v <= 10) { const n2 = Math.round(v * 2 / 100 * d); if (ok(n2)) return true; }
        return ok(n1);
      });
      if (hits || (v <= 10 && engineNums.has(half)) || inEvidence(num + '%') || inEvidence(`${num}퍼센트`)) continue;
      problems.push(`비율 근거 없음: ${raw}${unit}`); continue;
    }
    if (inEvidence(num)) continue;
    const at = text.slice(Math.max(0, m.index - 40), m.index + 40).trim();
    problems.push(`숫자 근거 없음: ${raw}${unit}  ← "…${at}…"`);
  }

  // 1.5) 부과 항목어: "무엇이 계산에 들어가느냐" 를 정하는 낱말은 인용으로 뒷받침해야 한다.
  // 왜. 건강보험료 글에서 지역보험료 부과 항목으로 '자동차' 를 썼는데 그렇게 말하는 조문을 대지 못했다.
  // 숫자가 아니라 명사라 숫자 검사에 걸리지 않았고, 사람이 읽다가 겨우 잡았다 (돌연변이 50번).
  //
  // 두 번 좁힌다. 안 그러면 취득세 글의 '토지' 처럼 주제 자체인 낱말까지 잡아 오탐이 난다.
  //   (1) 사전: 계산의 밑이 되는 항목으로 쓰이는 낱말만. 세목 이름(재산세 등)은 뺀다.
  //   (2) 문맥: 그 낱말 둘레 30자 안에 '부과·산정·매기다·보험료·과세표준' 같은 말이 있을 때만 본다.
  // 그러고도 남으면 claims 에 그 낱말이 든 인용이 있어야 한다. 즉 어느 조문이 그렇게 말하는지 대야 한다.
  const ITEM_WORDS = ['자동차', '토지', '건물', '전세', '월세', '보증금', '예금', '적금', '주식', '펀드', '가상자산',
    '금융소득', '연금소득', '이자소득', '배당소득', '사업소득', '임대소득', '기타소득'];
  const CALC_CTX = /부과|산정|매겨|매기|반영|포함|들어가|잡혀|잡히|보험료|과세표준|점수/;
  // 대칭으로 본다. 본문에서 "계산에 들어간다"는 문맥으로 썼다면, 근거에도 같은 문맥으로 나와야 한다.
  // 근거 어딘가에 그 낱말이 있다는 것만으로는 안 된다. 미가입 글의 근거에 '자동차' 가 47회 나오지만
  // 전부 화물자동차·자동차손해배상이지 보험료 부과 이야기가 아니었다.
  const inCalcCtx = (src, w) => {
    for (const m of src.matchAll(new RegExp(w, 'g'))) {
      const at = src.slice(Math.max(0, m.index - 60), m.index + w.length + 60);
      if (CALC_CTX.test(at)) return at.replace(/\s+/g, ' ').trim();
    }
    return null;
  };
  const quoted = (claims ?? []).map((c) => c.quote).join(' ');
  // 부칙은 빼고 본다. 부칙의 적용례·경과조치에 남은 옛 항목이 지금도 쓰인다는 근거가 되면 안 된다.
  // 실제로 '자동차에 대한 보험료부과점수' 는 2022년 부칙에만 남아 있고 지금 별표 4 는 재산만 본다.
  const body = (t) => { const i = t.search(/부\s?칙\s*</); return i > 0 ? t.slice(0, i) : t; };
  const evRaw = evidence.map((e) => body(e.text)).join('\n');
  for (const w of ITEM_WORDS) {
    if (quoted.includes(w)) continue;
    const used = inCalcCtx(text, w);
    if (!used) continue;
    if (inCalcCtx(evRaw, w)) continue;
    problems.push(`항목어 "${w}" 를 계산에 들어간다고 썼는데 근거에 그런 말이 없다  ← "…${used}…"`);
  }

  // 2) 조문
  for (const c of new Set([...text.matchAll(/(제\d+조(?:의\d+)?|별표\s?\d+|§\s?\d+)/g)].map((x) => x[1].replace(/\s/g, '')))) {
    const n = c.replace(/^§/, '제').replace(/^제(\d+)$/, '제$1조');
    const alt = c.startsWith('별표') ? [c, c.replace('별표', '별표 ')] : [n, n.replace('제', '제 ')];
    if (!alt.some((a) => evAll.includes(norm(a)))) problems.push(`조문 근거 없음: ${c}`);
  }

  // 2.5) 인용: 스펙 claims[{src, quote}] 의 quote 가 그 근거(src=번호) 텍스트에 그대로 있어야 한다 (해석 오류 차단)
  for (const c of claims ?? []) {
    const ev = evidence.find((e) => e.n === c.src);
    if (!ev) { problems.push(`인용 근거 번호 없음: src=${c.src}`); continue; }
    if (!norm(ev.text).includes(norm(c.quote))) problems.push(`인용이 근거 ${c.src}에 없음: "${c.quote.slice(0, 60)}…"`);
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
