// 자동 생성: scripts/gen-article-widgets.mjs — 직접 수정하지 말 것
// 원본: public/_preview/*.html 의 인라인 위젯 스크립트를 그대로 옮긴 것.
// 각 함수는 해당 글의 위젯 DOM이 마운트된 뒤 한 번 호출된다.
// 값은 lib/calc/engine.js 와 전수 대조해 일치를 확인했다.

export const WIDGETS = {
  // ── 1. 퇴직금 계산과 평균임금 (1-퇴직금-계산방법.html)
  severance: function () {
function $(i){return document.getElementById(i)}
function won(n){return n.toLocaleString('ko-KR',{maximumFractionDigits:2})}
function render(){
 var rv=$('ret').value,pay=+$('pay').value||0,bonus=+$('bonus').value||0,leave=+$('leave').value||0;
 var out=$('out');
 if(!rv){out.innerHTML='<div class="ax-wg-sec"><h6>결과</h6><ul class="ax-wg-doc"><li><b>퇴사일을 입력해 주세요</b></li></ul></div>';return}
 var r=new Date(rv);
 var end=new Date(r.getTime()); end.setDate(end.getDate()-1);
 var start=new Date(end.getTime()); start.setMonth(start.getMonth()-3); start.setDate(start.getDate()+1);
 var days=Math.round((end-start)/86400000)+1;
 var total=pay*3+bonus*3/12+leave*3/12;
 var avg=days>0?total/days:0;
 var ord=pay/209*8;
 var use=Math.max(avg,ord);
 var f=function(d){return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.'};
 var o='<div class="ax-wg-sec"><h6>산정기간</h6><ul class="ax-wg-doc">';
 o+='<li><span>퇴사일 직전 3개월</span><b>'+f(start)+' ~ '+f(end)+'</b></li>';
 o+='<li><span>3개월 총일수</span><b>'+days+'일</b></li>';
 o+='<li><span>3개월 임금총액</span><b>'+won(Math.round(total))+'원</b></li>';
 o+='</ul></div>';
 o+='<div class="ax-wg-sec"><h6>1일 임금 비교</h6><ul class="ax-wg-doc">';
 o+='<li><span>1일 평균임금</span><b>'+won(Math.round(avg*100)/100)+'원</b></li>';
 o+='<li><span>1일 통상임금 (209시간 기준)</span><b>'+won(Math.round(ord*100)/100)+'원</b></li>';
 o+='</ul>';
 o+='<div class="ax-wg-hl"><em>퇴직금 계산에 적용되는 값</em><b>'+won(Math.round(use*100)/100)+'원</b>'
   +'<i>'+(ord>avg?'통상임금이 더 커서 통상임금액을 평균임금으로 봅니다 (근로기준법 제2조제2항)':'평균임금이 통상임금 이상이므로 평균임금을 그대로 씁니다')+'</i></div>';
 o+='</div>';
 out.innerHTML=o;
}
['ret','pay','bonus','leave'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 2. 연봉 실수령액 (2-연봉-실수령액.html)
  salary: function () {
function $(i){return document.getElementById(i)}
function won(n){return n.toLocaleString('ko-KR')}
function cut(n,u){u=u||10;return Math.floor(n/u)*u}
function fl(x){return Math.floor(Math.round(x*1e6)/1e6)} /* 3,000,000×0.009=26999.999… 부동소수 오차 차단 */
function ins(m,p){
  var base=m<p.npf?p.npf:(m>=p.npc?p.npc:m);
  /* 장기요양 = 보수월액 × 소득 대비 요율 ÷ 2 (공단 산식, 4대사회보험 정보연계센터 모의계산과 일치) */
  var np=cut(fl(base*p.npr)), hi=cut(fl(m*p.hi)),
      ltc=cut(fl(m*p.ltc/2)), ei=cut(fl(m*p.ei));
  return {np:np,hi:hi,ltc:ltc,ei:ei,total:np+hi+ltc+ei};
}
var Y25={npr:.045,npc:6370000,npf:400000,hi:.03545,ltc:.009182,ei:.009};
var Y26={npr:.0475,npc:6590000,npf:410000,hi:.03595,ltc:.009448,ei:.009};
var lock=false;
function render(){
  var m=Math.floor(+$('pay').value||0);
  var o=ins(m,Y25), n=ins(m,Y26);
  var rows=[['국민연금',o.np,n.np],['건강보험',o.hi,n.hi],['장기요양',o.ltc,n.ltc],['고용보험',o.ei,n.ei]];
  var h='<div class="ax-wg-sec"><h6>항목별 비교</h6><ul class="ax-wg-doc">';
  rows.forEach(function(r){
    var d=r[2]-r[1];
    h+='<li><span>'+r[0]+'</span><b>'+won(r[1])+' → '+won(r[2])+(d?'  (+'+won(d)+')':'')+'</b></li>';
  });
  h+='<li><span>4대보험 합계</span><b>'+won(o.total)+' → '+won(n.total)+'</b></li></ul>';
  var diff=n.total-o.total;
  h+='<div class="ax-wg-hl"><em>2025년 대비 더 나가는 금액</em><b>월 '+won(diff)+'원</b>'
    +'<i>연 '+won(diff*12)+'원. 국민연금 9%→9.5%, 건강보험 7.09%→7.19%, 장기요양 12.95%→13.14% 인상 반영</i></div></div>';
  $('out').innerHTML=h;
}
$('pay').addEventListener('input',function(){
  if(lock)return; lock=true; $('ann').value=Math.round((+$('pay').value||0)*12); lock=false; render();
});
$('ann').addEventListener('input',function(){
  if(lock)return; lock=true; $('pay').value=Math.floor((+$('ann').value||0)/12); lock=false; render();
});
render();
  },

  // ── 3. 1세대 1주택 비과세 (3-양도세-비과세.html)
  transfer: function () {
var LIMIT=1200000000;
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var sale=+$('sale').value||0, acq=+$('acq').value||0,
      hold=+$('hold').value||0, live=+$('live').value||0,
      adj=$('adj').value==='yes', one=$('one').value==='1';
  var gain=sale-acq;
  var meetsHold=hold>=2, meetsLive=!adj||live>=2;
  var eligible=one&&meetsHold&&meetsLive;
  var nonTaxable=eligible&&sale<=LIMIT;
  var taxable = eligible && sale>LIMIT ? Math.round(gain*(sale-LIMIT)/sale) : (eligible?0:gain);
  var ltbc = (one&&hold>=3&&live>=2)
      ? Math.min(Math.min(hold,10)*4,40)+Math.min(Math.min(live,10)*4,40)
      : (hold>=3?Math.min(6+(hold-3)*2,30):0);
  var o='<div class="ax-wg-sec"><h6>요건 판정</h6><ul class="ax-wg-doc">';
  o+='<li><span>1세대 1주택</span><b>'+(one?'예':'아니오')+'</b></li>';
  o+='<li><span>보유 2년 이상</span><b>'+(meetsHold?'충족':'미충족')+'</b></li>';
  o+='<li><span>거주 2년 요건</span><b>'+(adj?(meetsLive?'충족 (조정대상지역)':'미충족 (조정대상지역)'):'해당 없음 (비조정)')+'</b></li>';
  o+='<li><span>양도차익</span><b>'+won(gain)+'원</b></li>';
  o+='</ul></div>';
  o+='<div class="ax-wg-sec"><h6>과세 대상</h6>';
  if(nonTaxable){
    o+='<div class="ax-wg-hl"><em>판정</em><b>전액 비과세</b><i>양도가 12억원 이하이고 요건을 충족해 양도소득세가 없습니다.</i></div>';
  }else if(eligible){
    o+='<div class="ax-wg-hl"><em>12억 초과분만 과세</em><b>'+won(taxable)+'원</b>'
      +'<i>양도차익 '+won(gain)+'원 × (양도가 − 12억) ÷ 양도가 = 과세 대상 차익. 장기보유특별공제 '+ltbc+'% 적용 대상입니다.</i></div>';
  }else{
    o+='<div class="ax-wg-hl"><em>비과세 요건 미충족 — 전체 차익 과세</em><b>'+won(taxable)+'원</b>'
      +'<i>장기보유특별공제 '+ltbc+'%가 적용됩니다. 정확한 세액은 계산기에서 확인하세요.</i></div>';
  }
  o+='</div>';
  $('out').innerHTML=o;
}
['sale','acq','hold','live','adj','one'].forEach(function(i){
  $(i).addEventListener('input',render); $(i).addEventListener('change',render);
});
render();
  },

  // ── 4. 스트레스 DSR (4-스트레스DSR.html)
  dsr: function () {
var STRESS={'미적용':0,'1단계':0.0038,'2단계':0.0075,'3단계':0.015};
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function limit(inc,debt,yrs,rate,dsr,st){
  var applied=rate+STRESS[st];
  var avail=Math.round(inc*dsr/12-debt);
  if(avail<=0) return {applied:applied,avail:0,max:0};
  var r=applied/12,n=yrs*12,pow=Math.pow(1+r,n);
  var factor=r>0?(pow-1)/(r*pow):n;
  return {applied:applied,avail:avail,max:Math.round(avail*factor)};
}
function render(){
  var inc=+$('inc').value||0, debt=+$('debt').value||0, yrs=+$('yrs').value||1,
      rate=(+$('rate').value||0)/100, dsr=+$('lim').value;
  var base=limit(inc,debt,yrs,rate,dsr,'미적용');
  var o='<div class="ax-wg-sec"><h6>단계별 한도</h6><ul class="ax-wg-doc">';
  ['미적용','1단계','2단계','3단계'].forEach(function(st){
    var r=limit(inc,debt,yrs,rate,dsr,st);
    var d=base.max-r.max;
    o+='<li><span>'+st+' (적용금리 '+(r.applied*100).toFixed(2)+'%)</span><b>'+won(r.max)+'원'
      +(d>0?'  (−'+won(d)+')':'')+'</b></li>';
  });
  o+='</ul>';
  var cur=limit(inc,debt,yrs,rate,dsr,'3단계');
  var diff=base.max-cur.max;
  var pct=base.max>0?(diff/base.max*100).toFixed(1):'0.0';
  o+='<div class="ax-wg-hl"><em>현재 시행 중인 3단계 기준 감소액</em><b>'+won(diff)+'원</b>'
    +'<i>미적용 대비 '+pct+'% 감소. 월 가용 원리금 '+won(cur.avail)+'원 기준입니다.</i></div></div>';
  $('out').innerHTML=o;
}
['inc','debt','yrs','rate','lim'].forEach(function(i){
  $(i).addEventListener('input',render); $(i).addEventListener('change',render);
});
render();
  },

  // ── 5. 조기수령 손익분기 (5-국민연금-조기수령.html)
  earlyPension: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var pen=+$('pen').value||0, norm=+$('norm').value, start=+$('start').value||norm, life=+$('life').value||85;
  var early=Math.max(0,Math.min(5,norm-start));
  var cut=early*0.06, red=Math.round(pen*(1-cut));
  var breakeven = (pen>red) ? (norm*pen-start*red)/(pen-red) : null;
  var cumE=Math.max(0,(life-start))*12*red, cumN=Math.max(0,(life-norm))*12*pen;
  var o='<div class="ax-wg-sec"><h6>감액 계산</h6><ul class="ax-wg-doc">';
  o+='<li><span>당긴 기간</span><b>'+early+'년</b></li>';
  o+='<li><span>감액률</span><b>'+(cut*100).toFixed(0)+'%</b></li>';
  o+='<li><span>조기수령 월 연금</span><b>'+won(red)+'원</b></li>';
  o+='<li><span>정상수령 월 연금</span><b>'+won(pen)+'원</b></li></ul></div>';
  o+='<div class="ax-wg-sec"><h6>손익 비교</h6>';
  if(early===0){
    o+='<div class="ax-wg-hl"><em>판정</em><b>정상 수령</b><i>당기지 않으므로 감액이 없습니다.</i></div>';
  }else{
    o+='<ul class="ax-wg-doc">';
    o+='<li><span>'+life+'세까지 조기수령 누적</span><b>'+won(cumE)+'원</b></li>';
    o+='<li><span>'+life+'세까지 정상수령 누적</span><b>'+won(cumN)+'원</b></li></ul>';
    var d=cumE-cumN;
    o+='<div class="ax-wg-hl"><em>손익분기 나이</em><b>'+(breakeven?breakeven.toFixed(1)+'세':'-')+'</b>'
      +'<i>'+life+'세까지 산다면 조기수령이 '+(d>=0?'약 '+won(d)+'원 유리':'약 '+won(-d)+'원 손해')+'입니다. 물가상승에 따른 연금 인상은 반영하지 않았습니다.</i></div>';
  }
  o+='</div>';
  $('out').innerHTML=o;
}
['pen','norm','start','life'].forEach(function(i){$(i).addEventListener('input',render);$(i).addEventListener('change',render)});
render();
  },

  // ── 6. 적금·예금 이자 (6-적금-예금-이자.html)
  savings: function () {
var TAX=0.154;
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var m=+$('mon').value||0, mo=+$('mth').value||1, r=(+$('rt').value||0)/100, tf=$('tf').value==='yes';
  var principal=m*mo;
  // 단리: 월 납입금 × 월이율 × (n(n+1)/2)
  var interest=Math.round(m*(r/12)*(mo*(mo+1)/2));
  var tax=tf?0:Math.round(interest*TAX);
  var maturity=principal+interest-tax;
  var eff=principal>0?((interest-tax)/principal*100):0;
  var o='<div class="ax-wg-sec"><h6>만기 계산</h6><ul class="ax-wg-doc">';
  o+='<li><span>납입 원금</span><b>'+won(principal)+'원</b></li>';
  o+='<li><span>세전 이자</span><b>'+won(interest)+'원</b></li>';
  o+='<li><span>이자소득세'+(tf?' (비과세)':' (15.4%)')+'</span><b>'+won(tax)+'원</b></li>';
  o+='</ul>';
  o+='<div class="ax-wg-hl"><em>만기 수령액</em><b>'+won(maturity)+'원</b>'
    +'<i>원금 대비 실질 수익 '+eff.toFixed(2)+'%. 표기 금리 '+(r*100).toFixed(1)+'%와 차이가 나는 것은 적금 구조 때문입니다.</i></div></div>';
  $('out').innerHTML=o;
}
['mon','mth','rt','tf'].forEach(function(i){$(i).addEventListener('input',render);$(i).addEventListener('change',render)});
render();
  },

  // ── 7. 기초연금 수급 조건 (7-기초연금.html)
  basicPension: function () {
var MAX={single:349700,couple:559520}, TH={single:2470000,couple:3952000};
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var hh=$('hh').value, inc=+$('inc').value||0;
  var th=TH[hh], max=MAX[hh], ok=inc<=th;
  var o='<div class="ax-wg-sec"><h6>자격 판정</h6><ul class="ax-wg-doc">';
  o+='<li><span>가구 유형</span><b>'+(hh==='single'?'단독가구':'부부가구')+'</b></li>';
  o+='<li><span>2026년 선정기준액</span><b>'+won(th)+'원</b></li>';
  o+='<li><span>입력한 소득인정액</span><b>'+won(inc)+'원</b></li>';
  o+='<li><span>기준 대비</span><b>'+(ok?'−'+won(th-inc)+'원 (이하)':'+'+won(inc-th)+'원 (초과)')+'</b></li>';
  o+='</ul>';
  if(ok){
    o+='<div class="ax-wg-hl"><em>수급 대상 · 월 최대</em><b>'+won(max)+'원</b>'
      +'<i>연 '+won(max*12)+'원. 국민연금 수령액에 따라 연계 감액이 적용될 수 있습니다.</i></div>';
  }else{
    o+='<div class="ax-wg-hl"><em>판정</em><b>선정기준액 초과</b>'
      +'<i>소득인정액이 기준을 넘어 원칙적으로 대상이 아닙니다. 다만 소득인정액은 각종 공제를 거쳐 산정되므로, 직접 신청해 판정받아 보시길 권합니다.</i></div>';
  }
  o+='</div>';
  $('out').innerHTML=o;
}
['hh','inc'].forEach(function(i){$(i).addEventListener('input',render);$(i).addEventListener('change',render)});
render();
  },

  // ── 8. 4대보험 요율 (8-4대보험료.html)
  fourIns: function () {
var NP=.0475,NPC=6590000,NPF=410000,HI=.03595,LTC=.009448,EI=.009,EIE=.0115,WC=.007; /* LTC = 소득 대비 장기요양보험료율(총), 근로자·사업주 절반씩 */
function $(i){return document.getElementById(i)}
function cut(n){return Math.floor(n/10)*10}
function fl(x){return Math.floor(Math.round(x*1e6)/1e6)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var pay=+$('pay').value||0, nt=+$('nt').value||0;
  var base=Math.max(0,Math.floor(pay-nt));
  var npb=base<NPF?NPF:(base>=NPC?NPC:base);
  var np=cut(fl(npb*NP)), hi=cut(fl(base*HI)), ltc=cut(fl(base*LTC/2)), ei=cut(fl(base*EI));
  var emp=np+hi+ltc+ei;
  var cEi=cut(fl(base*EIE)), cWc=cut(fl(base*WC));
  var co=np+hi+ltc+cEi+cWc;
  var o='<div class="ax-wg-sec"><h6>근로자 부담</h6><ul class="ax-wg-doc">';
  o+='<li><span>국민연금 4.75%'+(base>=NPC?' (상한)':'')+'</span><b>'+won(np)+'원</b></li>';
  o+='<li><span>건강보험 3.595%</span><b>'+won(hi)+'원</b></li>';
  o+='<li><span>장기요양 (건보 13.14%)</span><b>'+won(ltc)+'원</b></li>';
  o+='<li><span>고용보험 0.9%</span><b>'+won(ei)+'원</b></li>';
  o+='<li><span>합계</span><b>'+won(emp)+'원</b></li></ul></div>';
  o+='<div class="ax-wg-sec"><h6>회사 부담 (고용 1.15% · 산재 0.7% 가정)</h6><ul class="ax-wg-doc">';
  o+='<li><span>국민연금 + 건강 + 장기요양</span><b>'+won(np+hi+ltc)+'원</b></li>';
  o+='<li><span>고용보험</span><b>'+won(cEi)+'원</b></li>';
  o+='<li><span>산재보험 (근로자 부담 0)</span><b>'+won(cWc)+'원</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>회사 부담 합계</em><b>'+won(co)+'원</b>'
    +'<i>근로자보다 '+won(co-emp)+'원 더 냅니다. 회사 입장의 실제 인건비는 급여 + '+won(co)+'원입니다.</i></div></div>';
  $('out').innerHTML=o;
}
['pay','nt'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 9. 연차수당 계산 (9-연차수당.html)
  annualLeave: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var pay=+$('pay').value||0, days=+$('days').value||0, h=+$('hrs').value||8, y=+$('yrs').value||0;
  var hourly=Math.round(pay/209), daily=hourly*h, allow=daily*days;
  var ent = y<1 ? null : Math.min(25, 15+Math.max(0,Math.floor((y-1)/2)));
  var o='<div class="ax-wg-sec"><h6>수당 계산</h6><ul class="ax-wg-doc">';
  o+='<li><span>시간급 통상임금 (÷209)</span><b>'+won(hourly)+'원</b></li>';
  o+='<li><span>1일 통상임금 (×'+h+'시간)</span><b>'+won(daily)+'원</b></li>';
  o+='<li><span>미사용 연차</span><b>'+days+'일</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>연차수당</em><b>'+won(allow)+'원</b>'
    +'<i>1일 통상임금 '+won(daily)+'원 × '+days+'일. 취업규칙에 따라 평균임금이 적용될 수도 있습니다.</i></div></div>';
  o+='<div class="ax-wg-sec"><h6>근속 '+y+'년 기준 연차 일수</h6><ul class="ax-wg-doc">';
  if(ent===null){
    o+='<li><span>1년 미만</span><b>1개월 개근 시 1일 (최대 11일)</b></li>';
  }else{
    o+='<li><span>기본</span><b>15일</b></li>';
    o+='<li><span>가산 (3년부터 2년당 1일)</span><b>'+(ent-15)+'일</b></li>';
    o+='<li><span>총 연차</span><b>'+ent+'일'+(ent===25?' (한도)':'')+'</b></li>';
  }
  o+='</ul></div>';
  $('out').innerHTML=o;
}
['pay','days','hrs','yrs'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 10. 취득세 계산 (10-취득세.html)
  acqTax: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function rateOf(p){
  if(p<=600000000) return 0.01;
  if(p<=900000000) return ((p/100000000)*2/3-3)/100;
  return 0.03;
}
function render(){
  var p=+$('price').value||0, a=+$('area').value||0;
  var rate=rateOf(p);
  var acq=Math.round(p*rate), edu=Math.round(acq*0.1), rural=a>85?Math.round(p*0.002):0;
  var total=acq+edu+rural;
  var o='<div class="ax-wg-sec"><h6>세금 계산 (1주택 표준세율)</h6><ul class="ax-wg-doc">';
  o+='<li><span>적용 세율</span><b>'+(rate*100).toFixed(2)+'%</b></li>';
  o+='<li><span>취득세</span><b>'+won(acq)+'원</b></li>';
  o+='<li><span>지방교육세 (취득세 10%)</span><b>'+won(edu)+'원</b></li>';
  o+='<li><span>농어촌특별세'+(a>85?' (85㎡ 초과)':' (85㎡ 이하 비과세)')+'</span><b>'+won(rural)+'원</b></li>';
  o+='</ul>';
  o+='<div class="ax-wg-hl"><em>총 납부액</em><b>'+won(total)+'원</b>'
    +'<i>매매가의 '+(p>0?(total/p*100).toFixed(2):'0')+'%. 취득일부터 60일 이내에 신고·납부해야 합니다.</i></div></div>';
  $('out').innerHTML=o;
}
['price','area'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 11. 자동차세 연납 (11-자동차세.html)
  autoTax: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function render(){
  var cc=+$('cc').value||0, age=+$('age').value||0;
  var rate = cc<=1000?80 : (cc<=1600?140:200);
  var base=Math.round(cc*rate);
  var usage=age+1, disc = usage>=12?0.5 : (usage>=3?+((usage-2)*0.05).toFixed(2):0);
  var tax=Math.round(base*(1-disc)), edu=Math.round(tax*0.3), total=tax+edu;
  var save=Math.round(total/12*11*0.05);
  var o='<div class="ax-wg-sec"><h6>연간 세금</h6><ul class="ax-wg-doc">';
  o+='<li><span>cc당 세율</span><b>'+rate+'원</b></li>';
  o+='<li><span>본세 (경감 전)</span><b>'+won(base)+'원</b></li>';
  o+='<li><span>사용연수 '+usage+'년차 경감</span><b>'+(disc*100).toFixed(0)+'%'+(disc===0.5?' (한도)':'')+'</b></li>';
  o+='<li><span>자동차세</span><b>'+won(tax)+'원</b></li>';
  o+='<li><span>지방교육세 (30%)</span><b>'+won(edu)+'원</b></li>';
  o+='<li><span>연간 합계</span><b>'+won(total)+'원</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>1월 연납 시 납부액</em><b>'+won(total-save)+'원</b>'
    +'<i>2~12월분의 5%인 '+won(save)+'원을 공제받습니다. 연세액 대비 약 '+(total>0?(save/total*100).toFixed(2):'0')+'% 절감.</i></div></div>';
  $('out').innerHTML=o;
}
['cc','age'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 12. 육아휴직 급여 (12-육아휴직급여.html)
  parental: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
function clamp(v,lo,hi){return Math.min(hi,Math.max(lo,v))}
function render(){
  var s=+$('sal').value||0, m=clamp(+$('mon').value||0,0,18);
  var p1=clamp(s,700000,2500000), p2=clamp(s,700000,2000000), p3=clamp(s*0.8,700000,1600000);
  if(s<=0){p1=p2=p3=0}
  var m1=Math.min(3,m), m2=Math.min(3,Math.max(0,m-3)), m3=Math.max(0,m-6);
  var total=p1*m1+p2*m2+p3*m3;
  var wage=s*m, rate=wage>0?(total/wage*100):0;
  var o='<div class="ax-wg-sec"><h6>구간별 월 지급액</h6><ul class="ax-wg-doc">';
  o+='<li><span>1~3개월 (100%, 상한 250만)</span><b>'+won(p1)+'원 × '+m1+'개월</b></li>';
  o+='<li><span>4~6개월 (100%, 상한 200만)</span><b>'+won(p2)+'원 × '+m2+'개월</b></li>';
  o+='<li><span>7개월~ (80%, 상한 160만)</span><b>'+won(p3)+'원 × '+m3+'개월</b></li>';
  o+='<li><span>사용 개월수</span><b>'+m+'개월</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>육아휴직 급여 총액</em><b>'+won(total)+'원</b>'
    +'<i>같은 기간 통상임금 '+won(wage)+'원의 '+rate.toFixed(1)+'% 수준입니다. 사후지급금 없이 매달 전액 지급됩니다.</i></div></div>';
  $('out').innerHTML=o;
}
['sal','mon'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 13. 종합소득세 계산 (13-종합소득세.html)
  compIncome: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
var BR=[[14000000,0.06,0],[50000000,0.15,1260000],[88000000,0.24,5760000],[150000000,0.35,15440000],
        [300000000,0.38,19940000],[500000000,0.40,25940000],[1000000000,0.42,35940000],[null,0.45,65940000]];
function childCredit(k){if(k<=0)return 0;if(k===1)return 250000;if(k===2)return 550000;return 950000+(k-3)*400000}
function render(){
  var inc=+$('inc').value||0, dep=Math.max(1,+$('dep').value||1), kid=Math.max(0,+$('kid').value||0);
  var base=Math.max(0, inc-dep*1500000);
  var rate=0, pd=0, tax=0;
  for(var i=0;i<BR.length;i++){ if(BR[i][0]===null||base<=BR[i][0]){rate=BR[i][1];pd=BR[i][2];tax=Math.round(base*rate-pd);break} }
  var cc=childCredit(kid), sc=70000;
  var dec=Math.round(Math.max(0,tax-cc-sc));
  var loc=Math.round(dec*0.1), tot=dec+loc;
  var eff=inc>0?(tot/inc*100):0;
  var o='<div class="ax-wg-sec"><h6>계산 과정</h6><ul class="ax-wg-doc">';
  o+='<li><span>종합소득금액</span><b>'+won(inc)+'원</b></li>';
  o+='<li><span>기본공제 ('+dep+'명 × 150만원)</span><b>− '+won(dep*1500000)+'원</b></li>';
  o+='<li><span>과세표준</span><b>'+won(base)+'원</b></li>';
  o+='<li><span>적용 세율 · 누진공제</span><b>'+(rate*100)+'% · '+won(pd)+'원</b></li>';
  o+='<li><span>산출세액</span><b>'+won(tax)+'원</b></li>';
  o+='<li><span>자녀세액공제 ('+kid+'명)</span><b>− '+won(cc)+'원</b></li>';
  o+='<li><span>표준세액공제</span><b>− '+won(sc)+'원</b></li>';
  o+='<li><span>결정세액</span><b>'+won(dec)+'원</b></li>';
  o+='<li><span>지방소득세 (10%)</span><b>'+won(loc)+'원</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>총 부담액</em><b>'+won(tot)+'원</b>'
    +'<i>종합소득금액 대비 실효세율 '+eff.toFixed(2)+'%입니다. 필요경비와 개별 공제는 반영되지 않았습니다.</i></div></div>';
  $('out').innerHTML=o;
}
['inc','dep','kid'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 14. 기초생활수급 조건 (14-기초생활수급.html)
  basicLivelihood: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
var MED={1:2564238,2:4199292,3:5359036,4:6494738,5:7556719,6:8555952};
var G=[['생계급여',0.32],['의료급여',0.40],['주거급여',0.48],['교육급여',0.50]];
function render(){
  var hh=Math.min(6,Math.max(1,+$('hh').value||1)), inc=Math.max(0,+$('inc').value||0);
  var m=MED[hh];
  var o='<div class="ax-wg-sec"><h6>급여별 판정 · '+hh+'인 가구</h6><ul class="ax-wg-doc">';
  o+='<li><span>기준 중위소득 100%</span><b>'+won(m)+'원</b></li>';
  var pass=0;
  for(var i=0;i<G.length;i++){
    var th=Math.round(m*G[i][1]), ok=inc<=th; if(ok)pass++;
    o+='<li><span>'+G[i][0]+' ('+(G[i][1]*100)+'%) '+won(th)+'원</span><b>'+(ok?'해당':'해당 없음')+'</b></li>';
  }
  o+='</ul>';
  var lth=Math.round(m*0.32), pay=Math.max(0,lth-inc);
  o+='<div class="ax-wg-hl"><em>'+(pass>0?pass+'개 급여 대상':'해당 급여 없음')+'</em><b>'
    +(inc<=lth?'생계급여 '+won(pay)+'원':'생계급여 해당 없음')+'</b>'
    +'<i>'+(inc<=lth?'생계급여는 선정기준 '+won(lth)+'원에서 소득인정액을 뺀 금액입니다.'
    :'소득인정액이 생계급여 선정기준 '+won(lth)+'원을 넘습니다. 다른 급여는 위 표를 확인하세요.')+'</i></div></div>';
  $('out').innerHTML=o;
}
['hh','inc'].forEach(function(i){$(i).addEventListener('input',render)});
render();
  },

  // ── 15. 재산세 계산 (15-재산세.html)
  propertyTax: function () {
function $(i){return document.getElementById(i)}
function won(n){return Math.round(n).toLocaleString('ko-KR')}
var GEN=[[60000000,0.001,0],[150000000,0.0015,30000],[300000000,0.0025,180000],[null,0.004,630000]];
var ONE=[[60000000,0.0005,0],[150000000,0.001,30000],[300000000,0.002,180000],[null,0.0035,630000]];
function render(){
  var pv=Math.max(0,+$('pv').value||0), one=$('one').value==='1';
  var useOne = one && pv<=900000000;
  var ratio = useOne ? (pv<=300000000?0.43 : pv<=600000000?0.44 : 0.45) : 0.6;
  var BR = useOne?ONE:GEN;
  var base=Math.round(pv*ratio), tax=0, rate=0, pd=0;
  for(var i=0;i<BR.length;i++){ if(BR[i][0]===null||base<=BR[i][0]){rate=BR[i][1];pd=BR[i][2];tax=Math.round(base*rate-pd);break} }
  tax=Math.max(0,tax);
  var edu=Math.round(tax*0.2), total=tax+edu;
  var lump = total<=200000;
  var o='<div class="ax-wg-sec"><h6>계산 과정</h6><ul class="ax-wg-doc">';
  o+='<li><span>주택 공시가격</span><b>'+won(pv)+'원</b></li>';
  o+='<li><span>공정시장가액비율</span><b>'+(ratio*100)+'%'+(useOne?' (1주택 특례)':'')+'</b></li>';
  o+='<li><span>과세표준</span><b>'+won(base)+'원</b></li>';
  o+='<li><span>적용 세율 · 누진공제</span><b>'+(rate*100).toFixed(2)+'% · '+won(pd)+'원</b></li>';
  o+='<li><span>재산세</span><b>'+won(tax)+'원</b></li>';
  o+='<li><span>지방교육세 (20%)</span><b>'+won(edu)+'원</b></li></ul>';
  o+='<div class="ax-wg-hl"><em>연간 합계</em><b>'+won(total)+'원</b><i>'
    +(lump?'연세액이 20만원 이하라 7월 16~31일에 한꺼번에 부과될 수 있습니다.'
      :'7월 16~31일에 '+won(Math.round(total/2))+'원, 9월 16~30일에 '+won(total-Math.round(total/2))+'원을 냅니다.')
    +(one&&pv>900000000?' 공시가 9억 초과라 1주택 특례가 적용되지 않았습니다.':'')
    +' 도시지역분·지역자원시설세는 포함되지 않았습니다.</i></div></div>';
  $('out').innerHTML=o;
}
$('pv').addEventListener('input',render); $('one').addEventListener('change',render);
render();
  },
};
