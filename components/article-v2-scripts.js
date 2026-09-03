// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 글별 인라인 스크립트. ArticleV2Runtime 이 마운트 후 scriptKey 로 한 번 실행한다.
/* eslint-disable */
export const SCRIPTS = {
  "unemployment-benefit-guide": function () {

  var won=function(n){return Math.round(n).toLocaleString('ko-KR')};
  // 즉답 칩
  var qc=document.getElementById('qchips'); if(qc){ var Q=JSON.parse(qc.dataset.q); var chips=qc.querySelectorAll('button');
    chips.forEach(function(b){b.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed','false')}); b.setAttribute('aria-pressed','true'); var q=Q[+b.dataset.i];
      document.getElementById('qnet').innerHTML=q.big+'<small>'+q.unit+'</small>'; document.getElementById('qsub').textContent=q.sub;})}); }
  // 외부 이동 레이어 (오퍼월·전면광고 SDK 는 window.mdAd.show(slot, done) 로 끼운다)
  var inter=document.getElementById('md-inter'), interGo=document.getElementById('md-inter-go'), interD=document.getElementById('md-inter-d'), pending=null;
  function openOut(){ if(!pending)return; var h=pending; pending=null; inter.removeAttribute('open'); window.open(h,'_blank','noopener'); }
  document.addEventListener('click',function(e){ var a=e.target.closest('a.v2-go,a.v2-doc'); if(!a||!/^https?:/.test(a.href))return; e.preventDefault(); pending=a.href; interD.textContent=(a.textContent||'').replace(' ↗','')+' · 새 창에서 열려요';
    if(window.mdAd&&typeof window.mdAd.show==='function'){ inter.setAttribute('open',''); window.mdAd.show(document.getElementById('md-ad-slot'), openOut); } else { openOut(); } });
  interGo.addEventListener('click',openOut); inter.addEventListener('click',function(e){ if(e.target===inter){ pending=null; inter.removeAttribute('open'); } });
  // 판정 트리
  document.querySelectorAll('.v2-tree').forEach(function(tree){ var D=JSON.parse(tree.dataset.tree), st=D.no.map(function(){return 1}), v=tree.querySelector('[data-verdict]');
    tree.querySelectorAll('.v2-sw button').forEach(function(b){b.addEventListener('click',function(){var q=+b.dataset.q; st[q]=+b.dataset.v; tree.querySelectorAll('.v2-sw button[data-q="'+q+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
      for(var i=0;i<st.length;i++){ if(!st[i]){ v.className='verdict'; v.innerHTML='<b>'+D.no[i].title+'</b>'+D.no[i].text; return; } } v.className='verdict ok'; v.innerHTML='<b>'+D.ok.title+'</b>'+D.ok.text; })}); });
  // 표 펼치기
  document.querySelectorAll('[data-more]').forEach(function(mb){ var t=document.getElementById(mb.dataset.more), open=mb.textContent, close='핵심만 보기';
    mb.addEventListener('click',function(){var c=t.classList.toggle('v2-compact'); mb.textContent=c?open:close;}); if(window.innerWidth>640){t.classList.remove('v2-compact'); mb.textContent=close;} });
var RULES=[{"minYears":0,"maxYears":1,"days":120},{"minYears":1,"maxYears":3,"days":150},{"minYears":3,"maxYears":5,"days":180},{"minYears":5,"maxYears":10,"days":210},{"minYears":10,"maxYears":null,"days":240}], LOW=66048, HIGH=68100, BONUS=30;
  function ub(m,y,old){ var raw=Math.round(Math.round(m*3/90)*0.6); var d=raw<LOW?LOW:(raw>HIGH?HIGH:raw); var days=120; for(var i=0;i<RULES.length;i++){var r=RULES[i]; if(r.minYears<=y&&(r.maxYears===null||y<r.maxYears)){days=r.days;break;}} if(old&&y>=1)days+=BONUS; return {d:d,days:days,t:d*days}; }

  function wrender(){ var m=(+document.getElementById('ws').value||0)*1e4, y=+document.getElementById('wy').value, o=+document.getElementById('wo').value; if(m<=0)return; var r=ub(m,y,o);
    document.getElementById('wt').textContent=won(r.t)+'원'; document.getElementById('wdaily').textContent=won(r.d)+'원'; document.getElementById('wdays').textContent=r.days+'일 (약 '+Math.round(r.days/30)+'개월)'; document.getElementById('wmon').textContent=won(r.d*30)+'원'; }
  ['ws','wy','wo'].forEach(function(id){document.getElementById(id).addEventListener('input',wrender)}); wrender();

  },
};
