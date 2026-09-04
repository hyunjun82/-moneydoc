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
