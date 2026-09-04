/**
 * 답 검사 — "쓴 것" 이 아니라 "안 쓴 것" 을 본다.
 *
 * 왜 만들었나 (2026-09-04)
 *   사실 대조(factcheck)는 글에 쓴 숫자가 근거에 있는지만 봤다. 그래서 이런 게 전부 통과했다.
 *     · payday "실업급여 언제 들어오나요" → "사람마다 달라요"
 *       (근거 8 에 "통상 실업인정을 받은 다음 날에 지정 계좌로 입금됩니다" 가 있었다)
 *     · other-activity "취업특강 몇 번까지" → "고용센터에서 안내받아요"
 *       (근거 14 에 "취업특강은 3회, 직업심리검사는 1회" 가 있었다)
 *     · round-1 / round-4 "구직활동 몇 번" → "사람마다 달라요"
 *     · total "4개월은 약 120일" 이라 써 놓고 150일 금액(9,907,200원)을 적음
 *   글을 쓴 사람이 근거를 안 읽어도 아무도 막지 않았던 것이다.
 *
 * 그래서 두 가지를 빌드 시점에 본다. 글을 고치는 그 자리에서 걸린다.
 *   1) answerCheck   소제목의 답이 회피면, 근거에서 답 후보를 찾아 눈앞에 들이댄다
 *   2) arithmeticCheck  한 문장에 일수와 총액이 같이 있으면 엔진 일액으로 검산한다
 */

const EVADE = /(사람마다 달라|사람마다 다르|확인해 보세요|확인해보세요|물어보세요|문의하세요|담당자에게 직접|경우에 따라 달라|상황에 따라 달라|일반화하기 어려|케이스마다|하나로 말하기 어려)/;
const STOPW = new Set(['실업급여', '무엇', '어떻게', '언제', '어디', '얼마', '되나요', '하나요', '인가요',
  '받나요', '있나요', '나요', '어떤', '그것', '이것', '경우', '기준', '방법']);

const strip = (x) => String(x).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

/** 소제목마다 답 문장을 뽑는다 (렌더된 HTML 기준) */
export function sectionAnswers(html) {
  return html.split(/<h2 id="s\d+">/).slice(1).map((p) => {
    const h2 = strip(p.slice(0, p.indexOf('</h2>')).replace(/<small>[\s\S]*/, ''));
    const seg = p.split('<h2')[0];
    const m = seg.match(/<span class="ans">([\s\S]*?)<\/span>/);
    return { h2, ans: m ? strip(m[1]) : '' };
  }).filter((x) => x.h2 && !/자주 묻는 질문|출처/.test(x.h2));
}

/**
 * 회피 답을 찾고, 근거에서 그 질문의 답 후보를 뽑아 보여 준다.
 * 근거에 후보가 있으면 "안 읽고 썼다" 는 증거다. 없으면 무엇이 기준인지라도 적게 한다.
 */
export function answerCheck({ html, evidence }) {
  const problems = [];
  for (const { h2, ans } of sectionAnswers(html)) {
    if (!ans) { problems.push(`소제목에 답 문장(span.ans)이 없다: "${h2}"`); continue; }
    if (!EVADE.test(ans)) continue;

    const words = h2.replace(/[^가-힣0-9a-zA-Z ]/g, ' ').split(/\s+/)
      .map((w) => w.replace(/(은|는|이|가|을|를|의|에|도|만|과|와|로)$/, ''))
      .filter((w) => w.length >= 2 && !STOPW.has(w));

    const found = [];
    for (const e of evidence) {
      const body = String(e.text ?? '');
      for (const sent of body.split(/[.\n]/)) {
        const hit = words.filter((w) => sent.includes(w));
        // 낱말 둘이 겹치거나, 네 글자 넘는 핵심어 하나가 겹치면 후보로 본다.
        // ("실업인정 후 며칠 만에 지급되나요" 는 근거 문장과 '실업인정' 하나만 겹쳤는데 그게 정답이었다)
        const strong = hit.some((w) => w.length >= 4);
        if ((hit.length >= 2 || strong) && sent.trim().length > 15 && sent.trim().length < 240) {
          found.push(`근거 ${e.n}: "${sent.trim().slice(0, 140)}"`);
          break;
        }
      }
      if (found.length >= 2) break;
    }
    problems.push(found.length
      ? `"${h2}" 의 답이 회피다. 근거에 답이 될 만한 문장이 있는데 쓰지 않았다\n       ${found.join('\n       ')}`
      : `"${h2}" 의 답이 회피다: "${ans.slice(0, 46)}". 근거를 다시 뒤지고, 정말 없으면 무엇이 기준인지라도 적어라`);
  }
  return problems;
}

/**
 * 한 문장에 일수(60~400일)와 큰 금액(500만원 이상)이 같이 있으면
 * 엔진이 낸 하루 지급액으로 곱해 검산한다. 안 맞으면 둘 중 하나가 틀린 것이다.
 * (월 환산액처럼 총액이 아닌 금액은 500만원 문턱에서 걸러진다)
 */
export function arithmeticCheck({ html, engineNums }) {
  const problems = [];
  const text = String(html).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const dailies = [...engineNums].map(Number).filter((n) => Number.isFinite(n) && n >= 30000 && n <= 200000);
  if (!dailies.length) return problems;

  for (const sent of text.split(/(?<=[.!?])\s+/)) {
    const days = [...sent.matchAll(/(\d{2,3})일(?![액치])/g)].map((m) => Number(m[1])).filter((d) => d >= 60 && d <= 400);
    const wons = [...sent.matchAll(/([\d,]{9,})원/g)].map((m) => Number(m[1].replace(/,/g, ''))).filter((w) => w >= 5_000_000);
    if (!days.length || !wons.length) continue;
    for (const w of wons) {
      const ok = days.some((d) => dailies.some((v) => Math.abs(v * d - w) <= 2));
      if (!ok) {
        const guess = dailies.map((v) => days.map((d) => `${v.toLocaleString('ko-KR')}×${d}=${(v * d).toLocaleString('ko-KR')}`)).flat().slice(0, 3);
        problems.push(`일수와 총액이 안 맞는다: ${days.join('·')}일 과 ${w.toLocaleString('ko-KR')}원 (엔진 값으로는 ${guess.join(' / ')}) ← "${sent.trim().slice(0, 80)}"`);
      }
    }
  }
  return problems;
}

/** 형제 글끼리 문장을 그대로 베껴 쓰지 않았는지 (중복 콘텐츠) */
export function duplicateCheck(pages) {
  const problems = [];
  const seen = new Map();
  for (const { slug, html } of pages) {
    let h = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ');
    const src = h.indexOf('<h2 id="src">');
    const body = (src > 0 ? h.slice(0, src) : h)
      .replace(/<p class="fn">[\s\S]*?<\/p>/g, ' ')     // 각주는 법령 인용이라 겹쳐도 정상
      .replace(/<div class="crumb">[\s\S]*?<\/div>/, ' ');
    for (const raw of body.replace(/<[^>]+>/g, '\n').split('\n')) {
      const s = raw.replace(/\s+/g, ' ').trim();
      if (s.length < 40 || !/[가-힣]/.test(s)) continue;
      const key = s.replace(/\s+/g, '');
      const prev = seen.get(key);
      if (prev && prev !== slug) problems.push(`[${slug}] ${prev} 와 똑같은 문장: "${s.slice(0, 60)}"`);
      else seen.set(key, slug);
    }
  }
  return problems;
}

/**
 * 렌더 사고 — undefined·NaN·[object Object] 가 독자에게 보이는지.
 * 게이트에 있던 검사는 ">undefined<" 처럼 태그 사이에 홀로 있는 경우만 봤다.
 * 문장 속에 섞이면("undefined이 기간은…") 그냥 지나갔다. 돌연변이 시험 15번으로 잡았다.
 * 이제 본문 글자 전체에서 찾고, 빌드 시점에 막는다.
 */
export function renderAccidentCheck({ html }) {
  const text = String(html)
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const problems = [];
  for (const [re, what] of [[/undefined/, 'undefined'], [/NaN/, 'NaN'], [/\[object Object\]/, '[object Object]']]) {
    const m = text.match(re);
    if (!m) continue;
    const i = text.indexOf(m[0]);
    problems.push(`렌더 사고: 본문에 ${what} 가 보인다 ← "${text.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ').trim()}"`);
  }
  return problems;
}
