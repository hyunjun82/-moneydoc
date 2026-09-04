/**
 * 가이드 글 v2 공용 렌더러.
 *
 *   글 스펙(articles/{slug}.mjs 가 엔진 값으로 만든 데이터) → 미리보기 HTML + 히어로 SVG.
 *   글마다 다른 것은 스펙뿐이고, 마크업·CSS·런타임 JS 는 전부 여기 한 곳에 있다.
 *   그래서 글 수천 편을 만들어도 UI 는 한 번에 바뀌고, 품질 게이트(lint.mjs)는 스펙만 검사하면 된다.
 *
 * 스펙 모양은 articles/_schema.md 참고. 블록 타입:
 *   p · h3 · note · tree · table · flow · timeline · steps · tips · widget · html
 */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
export const ROOT = path.resolve(HERE, '../..');
const CSS = fs.readFileSync(path.join(HERE, 'v2.css'), 'utf8');

export const won = (n) => Math.round(n).toLocaleString('ko-KR');
export const man = (n) => (n >= 1e8 ? `${+(n / 1e8).toFixed(n % 1e8 ? 1 : 0)}억` : `${(n / 1e4).toLocaleString('ko-KR')}만`);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ext = (href) => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';

// ───────── 블록 렌더러 ─────────
const B = {
  p: (b) => `<p${b.lead ? ' class="lead"' : ''}>${b.ans ? `<span class="ans">${b.ans}</span> ` : ''}${b.text ?? ''}</p>`,
  h3: (b) => `<h3${b.id ? ` id="${b.id}"` : ''}>${b.text}</h3>`,
  note: (b) => `<div class="note"><b>${b.title}</b> ${b.text}${b.link ? ` <a class="go" href="${b.link.href}"${ext(b.link.href)}>${b.link.label}</a>` : ''}</div>`,
  fn: (b) => `<p class="fn">${b.text}</p>`,
  html: (b) => b.html,

  /** 판정 트리: 질문 N개, 첫 번째 "아니오" 의 verdict 를 보여준다 */
  tree: (b) => `<div class="tree" id="${b.id}" data-tree='${esc(JSON.stringify({ ok: b.ok, no: b.questions.map((q) => q.no) }))}'>
${b.questions.map((q, i) => `  <div class="q"><div><b>${q.q}</b><small>${q.hint}</small></div><div class="sw"><button type="button" data-q="${i}" data-v="1" aria-pressed="true">예</button><button type="button" data-q="${i}" data-v="0" aria-pressed="false">아니오</button></div></div>`).join('\n')}
  <div class="verdict ok" data-verdict><b>${b.ok.title}</b>${b.ok.text}</div>
</div>`,

  /** 표: caption 필수. text=글자 표(왼쪽 정렬·모바일 카드), compact=모바일에서 .x 열 숨김 + 펼치기 버튼 */
  table: (b) => {
    const cls = ['tbl', b.text && 'text', b.compact && 'compact'].filter(Boolean).join(' ');
    const id = b.id ? ` id="${b.id}"` : '';
    const head = b.headers.map((h, i) => `<th${b.x?.includes(i) ? ' class="x"' : ''}>${h}</th>`).join('');
    const rows = b.rows.map((r) => {
      const hi = r.hi ? ' class="hi"' : '';
      const cells = r.cells.map((c, i) => {
        if (i === 0) return `<th scope="row">${c}</th>`;
        const cl = [b.x?.includes(i) && 'x', b.net === i && 'net', r.docs && i === r.cells.length - 1 && 'docs'].filter(Boolean);
        const dl = b.text ? ` data-l="${esc(b.headers[i])}"` : '';
        // 행에 link 를 달면 마지막 칸에 버튼으로 붙인다. 예전에는 조용히 버려서 링크가 사라졌다
        const lk = r.link && i === r.cells.length - 1
          ? `<a class="go" href="${r.link.href}"${ext(r.link.href)}>${r.link.label}</a>` : '';
        return `<td${cl.length ? ` class="${cl.join(' ')}"` : ''}${dl}>${c}${lk}</td>`;
      }).join('');
      return `<tr${hi}>${cells}</tr>`;
    }).join('\n');
    const more = b.compact ? `\n<button class="more" type="button" data-more="${b.id}">${b.moreLabel ?? '전체 보기'}</button>` : '';
    return `<div class="${cls}"${id}><table><caption>${b.caption}</caption><thead><tr>${head}</tr></thead><tbody>\n${rows}\n</tbody></table></div>${more}${b.fn ? `\n<p class="fn">${b.fn}</p>` : ''}`;
  },

  /** 산식 흐름도: 박스 → 연산자 → 박스 … 마지막 박스는 강조 */
  flow: (b) => `<div class="flow" aria-label="${esc(b.label)}">\n${b.steps.map((s, i) => `  <div class="s${i === b.steps.length - 1 ? ' out' : ''}"><span>${s.label}</span><b>${s.value}</b><span>${s.sub ?? ''}</span></div>${s.op ? `<div class="op">${s.op}</div>` : ''}`).join('\n')}\n</div>`,

  /** 회차·기간 타임라인 */
  timeline: (b) => `<div class="tl" aria-label="${esc(b.label)}">\n${b.items.map((t) => `  <div${t.mark ? ' class="go"' : ''}><i>${t.step}</i><b>${t.title}</b><span>${t.text}</span>${t.tag ? `<em>${t.tag}</em>` : ''}</div>`).join('\n')}\n</div>`,

  /** 절차 카드 (행동 버튼은 한 줄·짧게) */
  steps: (b) => `<div class="steps">\n${b.items.map((s, i) => `  <div><i>${i + 1}단계</i><b>${s.title}</b><span>${s.text}</span>${s.meta ? `<em>${s.meta}</em>` : ''}${s.link ? `<a class="go" href="${s.link.href}"${ext(s.link.href)}>${s.link.label}</a>` : ''}</div>`).join('\n')}\n</div>`,

  tips: (b) => `<div class="tips">\n${b.items.map((t) => `  <div><b>${t.title}</b>${t.text}</div>`).join('\n')}\n</div>`,

  /** 글 안 계산 위젯: 입력 → 결과. 산식(port)은 빌드 시 엔진과 대조된다(build.mjs) */
  widget: (b) => `<section class="widget" aria-label="${esc(b.label)}">
  <h4>${b.title}</h4><p class="note">${b.note}</p>
  <div class="grid">
${b.inputs.map((i) => `    <div><label>${i.label}</label>${i.type === 'select'
      ? `<select id="${i.id}">${i.options.map(([v, l]) => `<option value="${v}"${String(v) === String(i.value) ? ' selected' : ''}>${l}</option>`).join('')}</select>`
      : `<input id="${i.id}" type="number" inputmode="numeric" value="${i.value}"${i.min != null ? ` min="${i.min}"` : ''}${i.max != null ? ` max="${i.max}"` : ''}${i.step ? ` step="${i.step}"` : ''}>`}</div>`).join('\n')}
  </div>
  <div class="result">
${b.outputs.map((o, i) => `    <div${i === 0 ? ' class="main"' : ''}><span>${o.label}</span><b id="${o.id}">—</b></div>`).join('\n')}
  </div>
</section>`,
};

/** 서류 칩: 온라인 발급은 링크, 병원·회사 서류는 회색 */
export const docs = (list) => list.map((d) => d.href ? `<a class="doc" href="${d.href}"${ext(d.href)}>${d.label}</a>` : `<span class="doc off">${d.label}</span>`).join('');

// ───────── 히어로 (디스커버용 1200×630) ─────────
const F = 'font-family="Pretendard, sans-serif"';
function heroSvg(a) {
  const h = a.hero;
  return `<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(h.alt)}">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#fdfbf6"/><stop offset="1" stop-color="#f3ede2"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="72" y="84" width="${h.tag.length * 21 + 44}" height="42" rx="21" fill="#c4452f"/><text x="${72 + (h.tag.length * 21 + 44) / 2}" y="112" text-anchor="middle" ${F} font-size="21" font-weight="700" fill="#fff">${esc(h.tag)}</text>
  <text x="72" y="228" ${F} font-size="74" font-weight="800" fill="#2b2723" letter-spacing="-3">${esc(h.line1)}</text>
  <text x="72" y="316" ${F} font-size="74" font-weight="800" fill="#c4452f" letter-spacing="-3">${esc(h.line2)}</text>
  <text x="72" y="392" ${F} font-size="28" font-weight="600" fill="#6f6a60">${esc(h.sub1)}</text>
  <text x="72" y="438" ${F} font-size="28" font-weight="600" fill="#6f6a60">${esc(h.sub2 ?? '')}</text>
  <text x="72" y="536" ${F} font-size="20" font-weight="600" fill="#9a9385">${esc(h.foot)}</text>
  <g transform="translate(900,150)">
    <rect x="0" y="0" width="230" height="330" rx="18" fill="#fff" stroke="#e2ded5"/>
    <text x="115" y="60" text-anchor="middle" ${F} font-size="18" fill="#6f6a60">${esc(h.card.label)}</text>
    <text x="115" y="120" text-anchor="middle" ${F} font-size="40" font-weight="800" fill="#c4452f" letter-spacing="-1.5">${esc(h.card.big)}</text>
    <text x="115" y="150" text-anchor="middle" ${F} font-size="18" fill="#6f6a60">${esc(h.card.unit)}</text>
    <line x1="30" y1="185" x2="200" y2="185" stroke="#e2ded5"/>
    <text x="115" y="230" text-anchor="middle" ${F} font-size="18" fill="#6f6a60">${esc(h.card.l1)}</text>
    <text x="115" y="268" text-anchor="middle" ${F} font-size="18" fill="#6f6a60">${esc(h.card.l2)}</text>
  </g>
</svg>`;
}

// ───────── 런타임 JS (공용) ─────────
const RUNTIME = `
  var won=function(n){return Math.round(n).toLocaleString('ko-KR')};
  // 즉답 칩
  var qc=document.getElementById('qchips'); if(qc){ var Q=JSON.parse(qc.dataset.q); var chips=qc.querySelectorAll('button');
    chips.forEach(function(b){b.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed','false')}); b.setAttribute('aria-pressed','true'); var q=Q[+b.dataset.i];
      document.getElementById('qnet').innerHTML=q.big+'<small>'+q.unit+'</small>'; document.getElementById('qsub').textContent=q.sub;})}); }
  // 외부 이동 레이어 (오퍼월·전면광고 SDK 는 window.mdAd.show(slot, done) 로 끼운다)
  var inter=document.getElementById('md-inter'), interGo=document.getElementById('md-inter-go'), interD=document.getElementById('md-inter-d'), pending=null;
  function openOut(){ if(!pending)return; var h=pending; pending=null; inter.removeAttribute('open'); window.open(h,'_blank','noopener'); }
  document.addEventListener('click',function(e){ var a=e.target.closest('a.go,a.doc'); if(!a||!/^https?:/.test(a.href))return; e.preventDefault(); pending=a.href; interD.textContent=(a.textContent||'').replace(' ↗','')+' · 새 창에서 열려요';
    if(window.mdAd&&typeof window.mdAd.show==='function'){ inter.setAttribute('open',''); window.mdAd.show(document.getElementById('md-ad-slot'), openOut); } else { openOut(); } });
  interGo.addEventListener('click',openOut); inter.addEventListener('click',function(e){ if(e.target===inter){ pending=null; inter.removeAttribute('open'); } });
  // 판정 트리
  document.querySelectorAll('.tree').forEach(function(tree){ var D=JSON.parse(tree.dataset.tree), st=D.no.map(function(){return 1}), v=tree.querySelector('[data-verdict]');
    tree.querySelectorAll('.sw button').forEach(function(b){b.addEventListener('click',function(){var q=+b.dataset.q; st[q]=+b.dataset.v; tree.querySelectorAll('.sw button[data-q="'+q+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
      for(var i=0;i<st.length;i++){ if(!st[i]){ v.className='verdict'; v.innerHTML='<b>'+D.no[i].title+'</b>'+D.no[i].text; return; } } v.className='verdict ok'; v.innerHTML='<b>'+D.ok.title+'</b>'+D.ok.text; })}); });
  // 표 펼치기
  document.querySelectorAll('[data-more]').forEach(function(mb){ var t=document.getElementById(mb.dataset.more), open=mb.textContent, close='핵심만 보기';
    mb.addEventListener('click',function(){var c=t.classList.toggle('compact'); mb.textContent=c?open:close;}); if(window.innerWidth>640){t.classList.remove('compact'); mb.textContent=close;} });
`;

// ───────── 문서 ─────────
export function render(a) {
  const T = Object.fromEntries(a.sections.map((s) => [s.id, s.h2]));
  const toc = [...a.sections.filter((s) => s.h2).map((s) => [s.id, s.h2]), ...a.sections.flatMap((s) => s.blocks.filter((b) => b.type === 'h3' && b.id).map((b) => [b.id, b.text])), ['faq', '자주 묻는 질문']];
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(ans) } })) };
  const widgets = a.sections.flatMap((s) => s.blocks.filter((b) => b.type === 'widget'));
  const extraJs = widgets.map((w) => w.js).join('\n');
  const heroAlt = a.hero.alt;

  const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(a.title)}</title>
<meta name="description" content="${esc(a.description)}">
<meta name="robots" content="max-image-preview:large">
<meta property="og:image" content="/og/${a.slug}.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, image: [`https://moneydoc.kr/og/${a.slug}.png`], datePublished: a.datePublished, dateModified: a.verified, author: { '@type': 'Organization', name: 'MoneyDoc 편집팀' } })}</script>
<style>${CSS}</style></head><body>
<div class="top"><div class="in"><i>$</i>MoneyDoc</div></div>
<main>
<div class="crumb"><a href="/">홈</a> › <a href="/${a.cat}/">${a.catLabel}</a> › ${a.crumb}</div>
<h1>${a.title}</h1>
<div class="meta"><span>MoneyDoc 편집팀</span><span>·</span><span>${a.basis}</span><span>·</span><span>${a.readMinutes}분</span><span class="badge">${a.badge}</span></div>
<img class="hero" src="/_preview/og-${a.slug}.png" width="1200" height="630" alt="${esc(heroAlt)}">
<p class="lead intro">${a.intro}</p>
<section class="answer" aria-label="즉답">
  <div class="lbl">${a.answer.label}</div>
  <div class="chips" id="qchips" data-q='${esc(JSON.stringify(a.answer.quick.map(({ big, unit, sub }) => ({ big, unit, sub }))))}'>${a.answer.quick.map((q, i) => `<button type="button" data-i="${i}" aria-pressed="${!!q.selected}">${q.chip}</button>`).join('')}</div>
  <div class="big" id="qnet">${a.answer.quick.find((q) => q.selected).big}<small>${a.answer.quick[0].unit}</small></div>
  <div class="sub" id="qsub">${a.answer.quick.find((q) => q.selected).sub}</div>
  <div class="split">
${a.answer.boxes.map((b) => `    <div class="box"><b>${b.title}</b><span>${b.text}</span></div>`).join('\n')}
  </div>
</section>
${a.calc ? `<!--CALC_START--><a class="cta" href="${a.calc.href}">${a.calc.label}</a><!--CALC_END-->` : ''}
<details class="toc"><summary>목차 (${toc.length}개 질문)<span>열기</span></summary><ol>${toc.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></details>
<section class="kk" aria-label="한눈에 보는 요약">
  <div class="hd"><small>${a.keyPoints.title}</small><b>핵심콕콕</b></div>
  <dl>
${a.keyPoints.rows.map(([k, v]) => `    <div class="row"><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
  </dl>
</section>

${a.sections.map((s) => `${s.h2 ? `<h2 id="${s.id}">${s.h2}<small>${s.sub}</small></h2>` : ''}
${s.blocks.map((b) => { const f = B[b.type]; if (!f) throw new Error(`unknown block type: ${b.type}`); return f(b); }).join('\n')}`).join('\n\n')}

<h2 id="faq">자주 묻는 질문</h2>
<div class="faqs">
${a.faq.map(([q, ans], i) => `<details class="faq"${i === 0 ? ' open' : ''}><summary><i>Q</i><span>${q}</span></summary><div><i>A</i><p>${ans}</p></div></details>`).join('\n')}
</div>
<section class="sum" aria-label="정리"><div class="hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
${a.summary.map((s) => `<li>${s}</li>`).join('\n')}
</ul></section>
${a.calc ? `<a class="cta" href="${a.calc.href}">${a.calc.label}</a>` : ''}
<h2 id="src">출처</h2>
<div class="src">
${a.sources.map(([k, v]) => `<b>${k}</b>${v}`).join('\n')}
</div>
<div class="rel">${a.related.map((r) => `<a href="${r.href}"><b>${r.kind}</b>${r.label}</a>`).join('')}</div>
<div id="md-inter" role="dialog" aria-modal="true" aria-label="외부 사이트로 이동">
  <div class="box"><div class="t">공식 페이지로 이동해요</div><div class="d" id="md-inter-d">새 창에서 열려요</div>
    <div class="slot" id="md-ad-slot" data-ad="interstitial">광고 영역 (오퍼월·전면광고 SDK 슬롯)</div>
    <button class="btn" id="md-inter-go">바로 이동</button></div>
</div>
</main>
<script>
(function(){${RUNTIME}${extraJs}
})();
</script>
</body></html>`;
  return { html, heroSvg: heroSvg(a), faqLd, toc, T };
}
