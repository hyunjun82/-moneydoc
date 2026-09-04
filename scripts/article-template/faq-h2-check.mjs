/**
 * FAQ 와 소제목 검사 — 돌연변이 시험 28·29번으로 찾은 구멍을 막는다.
 *
 *   28. FAQ 답이 회피여도 통과했다. answerCheck 는 본문 소제목만 보고 FAQ 는 안 봤다.
 *   29. 한 글에 같은 소제목이 두 번 있어도 통과했다. 목차가 깨지고 앵커가 겹친다.
 *
 * 빌드 시점에 본다.
 */

const EVADE = /(사람마다 달라|사람마다 다르|확인해 보세요|확인해보세요|물어보세요|문의하세요|담당자에게 직접|경우에 따라 달라|상황에 따라 달라|일반화하기 어려|케이스마다|하나로 말하기 어려)/;
const strip = (x) => String(x).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

export function faqAndH2Check({ html }) {
  const problems = [];

  // FAQ 회피 답. 소제목과 같은 잣대를 쓴다.
  for (const m of html.matchAll(/<details class="faq"[^>]*>([\s\S]*?)<\/details>/g)) {
    const q = strip((m[1].match(/<summary[^>]*>([\s\S]*?)<\/summary>/) ?? [])[1] ?? '');
    const a = strip(m[1].replace(/<summary[^>]*>[\s\S]*?<\/summary>/, ''));
    if (EVADE.test(a)) problems.push(`FAQ 답이 회피다: "${q}" → "${a.slice(0, 50)}"`);
  }

  // 외부 링크는 https 여야 한다. lint 는 '단계 카드' 의 link 만 봤고
  // 메모·표·문단·관련글·출처의 링크는 그냥 지나갔다. 돌연변이 30번으로 잡았다.
  for (const m of html.matchAll(/href="(http:\/\/[^"]+)"/g)) {
    problems.push(`외부 링크가 https 가 아니다: ${m[1]}`);
  }

  // 한 글 안에서 같은 문장이 두 번 나오는지. duplicateCheck 는 글 **사이**만 봤고,
  // 줄 단위로 보면 한 문단 안의 반복을 놓친다. 그래서 문장 단위로 자른다 (돌연변이 40번).
  {
    // 범위는 **본문 섹션만**. 제목은 h1 과 메타에, 소제목은 목차와 본문에 정상적으로 두 번 나오고,
    // 히어로 문구가 본문에 다시 나오는 것도 요약이라 정상이다. 그걸 다 세면 오탐만 쌓인다.
    let h = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ');
    const first = h.indexOf('<h2 id="s');
    const src = h.indexOf('<h2 id="src">');
    h = first < 0 ? '' : h.slice(first, src > first ? src : h.length);
    h = h.replace(/<p class="fn">[\s\S]*?<\/p>/g, ' ')          // 각주는 법령 인용
         .replace(/<details class="faq"[\s\S]*?<\/details>/g, ' ')  // FAQ 는 본문을 요약하는 자리
         .replace(/<table[\s\S]*?<\/table>/g, ' ')                   // 표는 행 이름이 여러 표에 나오는 게 정상
         .replace(/<section class="sum"[\s\S]*?<\/section>/g, ' ');   // "한 줄 정리" 는 본문 답을 되풀이하는 자리
    // 태그 자리에 공백을 넣으면 <b>제목</b> 이 뒤 문장에 붙어 같은 문장이 달라 보인다.
    // 태그는 줄바꿈으로 끊고, 그 줄 안에서 문장을 자른다.
    const NLc = String.fromCharCode(10);
    const lines = h.replace(/<[^>]+>/g, NLc).replace(/&[a-z#0-9]+;/g, ' ').split(NLc);
    const seen2 = new Set();
    for (const raw of lines.flatMap((l) => l.split(/(?<=[.!?])\s+/))) {
      const t = raw.replace(/\s+/g, ' ').trim();
      if (t.length < 20 || !/[가-힣]/.test(t)) continue;
      const k = t.replace(/\s+/g, '');
      if (seen2.has(k)) problems.push(`같은 문장이 한 글에 두 번 나온다: "${t.slice(0, 60)}"`);
      seen2.add(k);
    }
  }

  // 한 글 안에서 소제목이 겹치는지
  const h2s = [...html.matchAll(/<h2 id="s\d+">([^<]+)/g)]
    .map((m) => strip(m[1].replace(/<small>[\s\S]*/, '')));
  const seen = new Set();
  for (const h of h2s) {
    const k = h.replace(/\s+/g, '');
    if (seen.has(k)) problems.push(`소제목이 한 글에 두 번 나온다: "${h}"`);
    seen.add(k);
  }
  return problems;
}
