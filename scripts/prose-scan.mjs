#!/usr/bin/env node
/**
 * 본문 문장 훑기 — lint 의 번역투 12규칙이 못 잡는 어색함을 찾는다.
 *
 *   node scripts/prose-scan.mjs <hub> [--slug=xxx]
 *
 * 독자가 읽는 산문만 본다. 법령 인용(각주)과 출처 블록은 원문 그대로여야 하므로 뺀다.
 * 기계가 확실히 아는 것만 표시하고, 최종 판단은 사람이 문장을 읽고 한다.
 */
import fs from 'node:fs';

const hub = process.argv[2] ?? 'unemployment';
const only = (process.argv.find((a) => a.startsWith('--slug=')) ?? '').slice(7);
const NL = String.fromCharCode(10);

const RULES = [
  [/불참 시|퇴사 시|적발 시|해당 시/, '한자투 "~시" → "~할 때"'],
  [/여부를 (확인|판단|결정)/, '"여부를 확인" → "~인지 확인"'],
  [/시점(?![가-힣])/, '한자투 "시점" → "때·날"'],
  [/[가-힣]{2,}하기(?=[.,)]|$)/, '명사형 종결 "~하기"'],
  [/[가-힣]{2,}함(?=[.,)]|$)|[가-힣]{2,}임(?=[.,)]|$)/, '명사형 종결 "~함·~임"'],
  [/(이는|그것은|이것은)(?![가-힣])/, '지시어 "이는·그것은" → 무엇인지 밝히기'],
  [/ 및 /, '"및" → "와/과"'],
  [/에 의해|에 의한/, '"에 의해" → "~가", "~로"'],
  [/[가-힣]하여(?![도야])/, '"~하여" → "~해서" (해요체 본문)'],
  [/(?<![가-힣])동일(?![가-힣])|(?<![가-힣])상이(?![가-힣])/, '한자어 "동일·상이" → "같은·다른"'],
  [/입니다|합니다|됩니다|습니다/, '해요체가 아님'],
  [/것을 것|하는 것을 하는/, '"것" 겹침'],
];

const DIR = 'public/_preview';
const files = fs.readdirSync(DIR)
  .filter((f) => f.startsWith(`article-v2-${hub}-`) && f.endsWith('-guide.html'))
  .filter((f) => !only || f.includes(only));

const prose = (h) => {
  let x = h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  const src = x.indexOf('<h2 id="src">');
  if (src > 0) x = x.slice(0, src);                      // 출처 블록 제외
  x = x.replace(/<p class="fn">[\s\S]*?<\/p>/g, ' ');    // 각주(법령 인용) 제외
  x = x.replace(/<div class="crumb">[\s\S]*?<\/div>/, ' ');
  return x.replace(/<[^>]+>/g, NL).replace(/&[a-z#0-9]+;/g, ' ');
};

let total = 0;
const seen = new Map();
for (const f of files.sort()) {
  const slug = f.replace(`article-v2-${hub}-`, '').replace('-guide.html', '');
  const lines = prose(fs.readFileSync(`${DIR}/${f}`, 'utf8'))
    .split(NL).map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => /[가-힣]/.test(s) && s.length >= 8);
  const hits = [];
  for (const s of lines) {
    for (const [re, why] of RULES) if (re.test(s)) hits.push(`  ${why}  ← "${s.slice(0, 80)}"`);
    for (const one of s.split(/(?<=[.!?])\s+/)) if (one.length > 100) hits.push(`  ${one.length}자 문장  ← "${one.slice(0, 80)}"`);
    const key = s.replace(/\s+/g, '');
    if (key.length > 30) {
      const p = seen.get(key);
      if (p && p !== slug) hits.push(`  ${p} 와 똑같은 문장  ← "${s.slice(0, 60)}"`);
      else seen.set(key, slug);
    }
  }
  if (hits.length) { console.log(`${NL}## ${slug}`); [...new Set(hits)].forEach((h) => console.log(h)); total += hits.length; }
}
console.log(`${NL}표시 ${total}건 · 글 ${files.length}편`);
