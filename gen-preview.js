const fs = require('fs');
let src = fs.readFileSync('moneydoc-data/articles/government/unemployment-benefit.ts','utf8');
const start = src.indexOf('{', src.indexOf('export const article'));
const end = src.lastIndexOf('}');
const article = eval('(' + src.slice(start, end+1) + ')');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const rich = s => esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
const isNum = v => /^[+-]?[\d][\d,.]*\s*(원|%|일|만|개월|년|배)?$/.test(String(v).trim());
function block(b){
  switch(b.type){
    case 'p': return `<p>${rich(b.text)}</p>`;
    case 'h3': return `<h3>${esc(b.text)}</h3>`;
    case 'key': return `<div class="key-callout">${rich(b.text)}</div>`;
    case 'quote': return `<p class="article-quote">${rich(b.text)}</p>`;
    case 'list': { const it=b.items.map(i=>`<li>${rich(i)}</li>`).join(''); return b.ordered?`<ol>${it}</ol>`:`<ul>${it}</ul>`; }
    case 'table': { const th=b.headers.map(h=>`<th class="${isNum(h)?'num':''}">${esc(h)}</th>`).join(''); const tr=b.rows.map(r=>`<tr>${r.map(c=>`<td class="${isNum(c)?'num':''}">${rich(c)}</td>`).join('')}</tr>`).join(''); return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`+(b.note?`<p class="table-note">${esc(b.note)}</p>`:''); }
    case 'steps': return `<ol class="art-steps">${b.steps.map((s,i)=>`<li><span class="art-step-num">${i+1}</span><div class="art-step-body"><strong>${esc(s.step)}</strong><p>${rich(s.detail)}</p></div></li>`).join('')}</ol>`;
    default: return '';
  }
}
const sectionsHtml = article.sections.map(s=>`<section id="${s.id}" class="article-sec">${s.eyebrow?`<div class="sec-eyebrow">${esc(s.eyebrow)}</div>`:''}<h2>${esc(s.heading)}</h2>${s.blocks.map(block).join('')}</section>`).join('');
const tocHtml = article.sections.length>1?`<nav class="toc"><div class="toc-title">이 글에서 다루는 내용</div><ol>${article.sections.map(s=>`<li><a href="#${s.id}">${esc(s.heading)}</a></li>`).join('')}</ol></nav>`:'';
const faqHtml = article.faq.length?`<section id="faq" class="article-sec"><h2>자주 묻는 질문</h2><div class="article-faq">${article.faq.map(q=>`<div class="afaq"><p class="q"><span class="qmark">Q</span>${esc(q.q)}</p><p class="a">${rich(q.a)}</p></div>`).join('')}</div></section>`:'';
const headline = `<h2 class="article-headline">${esc(article.title)}</h2>`;
const meta = (article.updated||article.readMinutes)?`<div class="article-meta-row">${article.updated?`<span>${esc(article.updated)} 기준</span>`:''}${article.updated&&article.readMinutes?'<span class="dot"></span>':''}${article.readMinutes?`<span>약 ${article.readMinutes}분 분량</span>`:''}</div>`:'';
const intro = article.intro?`<p class="article-intro">${rich(article.intro)}</p>`:'';
const keypoints = article.keyPoints.length?`<div class="keypoints"><div class="keypoints-title">핵심만 빠르게</div><ul>${article.keyPoints.map(k=>`<li>${rich(k)}</li>`).join('')}</ul></div>`:'';
const articleHtml = `<article class="article"><div class="article-inner">${headline}${meta}${intro}<p class="article-lead">${rich(article.lead)}</p>${keypoints}${tocHtml}${sectionsHtml}${faqHtml}</div></article>`;
const css = fs.readFileSync('app/globals.css','utf8');
const nav = ['저축','대출','부동산','세금','보험','연금','법률','정부지원금'].map(n=>`<a class="${n==='정부지원금'?'active':''}">${n}</a>`).join('');
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>실업급여 글 미리보기</title>
<style>${css}
.calc-placeholder{max-width:var(--max);margin:0 auto;padding:0 24px}
.calc-ph-inner{background:var(--bg-card);border:1px dashed var(--line);border-radius:var(--radius);padding:28px;display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:14px;min-height:120px}
</style></head><body>
<header class="header"><div class="header-inner"><div class="logo"><span class="logo-mark">M</span>MoneyDoc</div><nav class="nav">${nav}</nav></div></header>
<nav class="crumbs"><a>홈</a><span class="sep">›</span><a>정부지원금</a><span class="sep">›</span><span>실업급여</span></nav>
<header class="page-head"><span class="source-badge"><span class="dot"></span>고용노동부 2026 · 검증 완료</span><h1 class="page-title">실업급여 계산기</h1><p class="page-sub">월 평균임금과 고용보험 가입연수를 입력하면 실업급여 일액과 총 수령액이 산출됩니다.</p></header>
<div class="calc-placeholder"><div class="calc-ph-inner">［ 기존 실업급여 계산기 (GenericCalculator) ］</div></div>
${articleHtml}
</body></html>`;
fs.writeFileSync('/sessions/sleepy-sharp-mayer/mnt/outputs/moneydoc-article-preview.html', html);
console.log('OK | title:', article.title, '| em-dash in html:', (html.match(/—/g)||[]).length);
