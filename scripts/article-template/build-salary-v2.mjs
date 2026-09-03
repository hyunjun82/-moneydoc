#!/usr/bin/env node
/**
 * 가이드 글 v2 템플릿: 연봉 실수령액 (파일럿)
 *
 * 원칙
 *   1. 글의 모든 숫자는 lib/calc/engine.js 가 만든다 (사람이 붙여 넣는 숫자 없음).
 *   2. 글 안의 인터랙티브 위젯은 브라우저용 산식 포트를 쓰되, 빌드 시 엔진과 9천 개 입력 조합으로 대조해
 *      1원이라도 다르면 빌드를 실패시킨다 (포트 드리프트 차단).
 *   3. 구성: 즉답 → 내 상황 → 근거 → 표 → 변화 → 독창 코너(인상 시뮬·명세서 진단·1년 캘린더) → FAQ → 정리 → 출처.
 *
 * 사용: node scripts/article-template/build-salary-v2.mjs  → public/_preview/article-v2-salary.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const { calculators } = require(path.join(ROOT, 'lib/calc/engine.js'));
const spec = require(path.join(ROOT, 'moneydoc-data/calculators/tax/salary-net-pay.json'));
const tableSrc = fs.readFileSync(path.join(ROOT, 'lib/calc/tables/simplified-tax-2026-03.js'), 'utf8');
const VERIFIED = '2026-09-02';
const sal = (annual, dependents = 1, kids = 0, nontaxable = 0) => calculators['salary-net-pay']({ annual, dependents, kids, nontaxable }, spec);
const won = (n) => Math.round(n).toLocaleString('ko-KR');
const man = (n) => (n >= 1e8 ? `${+(n / 1e8).toFixed(n % 1e8 ? 1 : 0)}억` : `${(n / 1e4).toLocaleString('ko-KR')}만`);

// ───────── 데이터 (전부 엔진) ─────────
const ROWS = [24e6, 30e6, 36e6, 40e6, 45e6, 50e6, 55e6, 60e6, 70e6, 80e6, 90e6, 100e6, 120e6, 150e6, 200e6].map((a) => ({ a, r: sal(a) }));
const R50 = sal(50e6), R100 = sal(100e6);
const QUICK = [30e6, 40e6, 50e6, 70e6, 100e6].map((a) => ({ a, r: sal(a) }));
const FAMILY = [['본인만', 1, 0], ['배우자', 2, 0], ['배우자 + 자녀 1명 (8~20세)', 3, 1], ['배우자 + 자녀 2명', 4, 2]].map(([label, d, k]) => ({ label, r: sal(50e6, d, k) }));
const NONTAX = [0, 100000, 200000, 300000].map((n) => ({ n, r: sal(50e6, 1, 0, n) }));
const RAISE = [[50e6, 51e6], [50e6, 53e6], [50e6, 55e6], [50e6, 60e6], [78e6, 80e6], [80e6, 85e6]].map(([a, b]) => ({ a, b, ra: sal(a), rb: sal(b) }));
// 2025 4대보험 (2025.7~2026.6 국민연금 상한 637만·하한 40만, 건보 3.545%, 장기요양 소득 0.9182%, 고용 0.9%)
const ins2025 = (m) => {
  const cut = (n) => Math.floor(n / 10) * 10, fl = (x) => Math.floor(Math.round(x * 1e6) / 1e6);
  const b = m < 400000 ? 400000 : m >= 6370000 ? 6370000 : m;
  const np = cut(fl(b * 0.045)), hi = cut(fl(m * 0.03545)), ltc = cut(fl(m * 0.009182 / 2)), ei = cut(fl(m * 0.009));
  return { np, hi, ltc, ei, total: np + hi + ltc + ei };
};
const I25 = ins2025(R50.monthly);
const diff25 = R50.totalInsurance - I25.total;

// ───────── 브라우저용 산식 포트 + 빌드 시 엔진 대조 ─────────
const PORT = `
function mdSalary(annual, dependents, kids, nontaxable){
  var T=SIMPLIFIED_TAX_2026_03; var cut=function(n){return Math.floor(n/10)*10}; var fl=function(x){return Math.floor(Math.round(x*1e6)/1e6)};
  var m=Math.max(0,Math.floor(annual/12-(nontaxable||0))); var fam=Math.max(1,Math.floor(dependents||1)); var k=Math.min(Math.max(0,Math.floor(kids||0)),fam-1);
  function base(col){ if(m<T.minMonthly)return 0; if(m<1e7){for(var i=0;i<T.blocks.length;i++){var b=T.blocks[i]; if(m>=b.start&&m<b.end)return b.rows[Math.floor((m-b.start)/b.step)][col];} return 0;}
    var t10=T.at10000000[col]; if(m===1e7)return t10; var lower=1e7; for(var j=0;j<T.over10000000.length;j++){var o=T.over10000000[j]; if(o.upTo===null||m<=o.upTo){var rp=Math.round(o.rate*100),ex=m-lower; var add=o.apply98?(ex*98*rp)/1e4:(ex*rp)/100; return cut(t10+o.fixed+o.plus+add+1e-7);} lower=o.upTo;} return 0; }
  var tax; if(fam<=11)tax=base(fam-1); else{var t11=base(10),t10b=base(9); tax=Math.max(0,t11-(t10b-t11)*(fam-11));}
  var adj=k===0?0:k===1?T.childAdjust.one:T.childAdjust.two+T.childAdjust.perExtraOver2*(k-2); var tax100=Math.max(0,tax-adj);
  var it=cut(tax100), lt=it>0?cut(it/10):0;
  var npb=m<410000?410000:(m>=6590000?6590000:m); var np=cut(fl(npb*0.0475)), hi=cut(fl(m*0.03595)), ltc=cut(fl(m*0.009448/2)), ei=cut(fl(m*0.009));
  var ins=np+hi+ltc+ei, ded=cut(it+lt+ins), gross=Math.floor(annual/12), net=cut(m+(nontaxable||0)-ded);
  return {monthly:m,gross:gross,np:np,hi:hi,ltc:ltc,ei:ei,ins:ins,tax:it,local:lt,ded:ded,net:net,pct:+(ded/gross*100).toFixed(1)};
}`;
{ // 엔진 대조
  const vm = await import('node:vm');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(tableSrc.replace('module.exports = { SIMPLIFIED_TAX_2026_03 };', '') + PORT, ctx);
  let n = 0;
  for (let a = 12e6; a <= 300e6; a += (a < 60e6 ? 1e6 : 5e6)) for (const d of [1, 2, 3, 4, 5]) for (const k of [0, 1, 2]) for (const nt of [0, 200000]) {
    if (k > d - 1) continue;
    const e = sal(a, d, k, nt);
    const p = vm.runInContext(`mdSalary(${a},${d},${k},${nt})`, ctx);
    const pairs = [['net', e.netMonthly], ['tax', e.monthlyIncomeTax], ['local', e.monthlyLocalTax], ['ins', e.totalInsurance], ['ded', e.totalDeduction], ['pct', e.deductRatePct]];
    for (const [key, ev] of pairs) if (p[key] !== ev) { throw new Error(`포트 드리프트: annual=${a} dep=${d} kids=${k} nt=${nt} ${key} port=${p[key]} engine=${ev}`); }
    n++;
  }
  console.log(`브라우저 포트 = 엔진 대조 ${n}건 통과`);
}

// ───────── HTML ─────────
const TOC = [
  ['s1', '연봉 실수령액 계산 방법, 월급에서 뭐가 빠지나요'],
  ['s2', '2026년 연봉 실수령액 표 (연봉 3000·4000·5000·7000·1억)'],
  ['s3', '2026년 4대보험 요율 인상, 월급 얼마나 줄었나요'],
  ['s4', '연봉 100만원 인상되면 실수령액은 얼마나 늘어나나요'],
  ['s5', '연봉 실수령액 늘리는 방법 (부양가족·비과세 식대)'],
  ['s6', '급여명세서 실수령액이 계산과 다른 이유'],
  ['s7', '월급 실수령액이 매달 다른 이유 (1월·4월·7월)'],
  ['faq', '자주 묻는 질문'],
];

const rowsHtml = ROWS.map(({ a, r }) => `<tr${a === 50e6 ? ' class="hi"' : ''}><th scope="row">${man(a)}</th><td class="net">${won(r.netMonthly)}</td><td class="pct">${r.deductRatePct}%</td><td class="x">${won(r.grossMonthly)}</td><td class="x">${won(r.totalInsurance)}</td><td class="x">${won(r.monthlyIncomeTax + r.monthlyLocalTax)}</td></tr>`).join('\n');
const quickJson = JSON.stringify(QUICK.map(({ a, r }) => ({ a, net: r.netMonthly, pct: r.deductRatePct, ins: r.totalInsurance, tax: r.monthlyIncomeTax + r.monthlyLocalTax })));
const famHtml = FAMILY.map(({ label, r }, i) => `<tr${i === 3 ? ' class="hi"' : ''}><th scope="row">${label}</th><td>${won(r.monthlyIncomeTax)}</td><td class="net">${won(r.netMonthly)}</td><td>${i === 0 ? '기준' : '+' + won(r.netMonthly - FAMILY[0].r.netMonthly)}</td></tr>`).join('');
const ntHtml = NONTAX.map(({ n, r }, i) => `<tr${n === 200000 ? ' class="hi"' : ''}><th scope="row">${n === 0 ? '0원' : man(n) + '원' + (n === 200000 ? ' (식대 한도)' : '')}</th><td>${won(r.totalInsurance)}</td><td>${won(r.monthlyIncomeTax + r.monthlyLocalTax)}</td><td class="net">${won(r.netMonthly)}</td><td>${i === 0 ? '기준' : '+' + won(r.netMonthly - NONTAX[0].r.netMonthly)}</td></tr>`).join('');
const raiseHtml = RAISE.map(({ a, b, ra, rb }) => { const up = b - a, keep = (rb.netMonthly - ra.netMonthly) * 12; return `<tr><th scope="row">${man(a)} → ${man(b)}</th><td>+${man(up)}</td><td class="net">+${won(keep)}</td><td>${Math.round(keep / up * 100)}%</td></tr>`; }).join('');
const faq = [
  ['연봉 5,000만원이면 월 실수령액이 얼마인가요?', `부양가족 본인 1명, 비과세 0원 기준 월 <b>${won(R50.netMonthly)}원</b>입니다. 세전 ${won(R50.grossMonthly)}원에서 4대보험 ${won(R50.totalInsurance)}원, 소득세·지방소득세 ${won(R50.monthlyIncomeTax + R50.monthlyLocalTax)}원이 빠져 공제율 ${R50.deductRatePct}%입니다. 홈택스 간이세액표 조회값과 같은 숫자입니다.`],
  ['연봉 1억이면 실수령액은요?', `월 <b>${won(R100.netMonthly)}원</b>, 공제율 ${R100.deductRatePct}%입니다. 5,000만원의 실수령 ${won(R50.netMonthly)}원과 비교하면 세전은 2배지만 실수령은 ${(R100.netMonthly / R50.netMonthly).toFixed(2)}배입니다.`],
  ['2026년에 실수령액이 줄어든 이유가 뭔가요?', `국민연금 요율이 4.5%에서 4.75%로, 건강보험이 3.545%에서 3.595%로, 장기요양이 소득의 0.9182%에서 0.9448%로 올랐습니다. 연봉 5,000만원이면 4대보험만 월 ${won(diff25)}원, 연 ${won(diff25 * 12)}원을 더 냅니다.`],
  ['회사 명세서 소득세가 이 글과 다릅니다.', `다섯 가지를 확인하세요. ① 비과세 식대(월 20만원)가 급여에 포함돼 있는지 ② 부양가족 신고 인원 ③ 회사가 80%·120% 원천징수 비율을 적용했는지 ④ 상여가 있는 달인지 ⑤ 4월 건보 정산·7월 국민연금 상한 변경 달인지. 아래 "명세서와 다른 이유" 코너에 각각 얼마나 차이 나는지 적었습니다.`],
  ['월 실수령액으로 연봉을 거꾸로 알 수 있나요?', `공제율이 연봉마다 달라 단순 나눗셈은 틀립니다. 위 표에서 실수령액이 가까운 행을 찾거나, 연봉 실수령액 계산기의 역산 기능을 쓰면 정확합니다.`],
  ['소득세는 매달 이렇게 확정되는 건가요?', `아닙니다. 매달 빠지는 소득세는 간이세액표에 따른 선납이고, 다음 해 1~2월 연말정산에서 실제 세액과 정산해 환급받거나 더 냅니다. 이 글의 숫자는 매달 통장에 들어오는 금액 기준입니다.`],
];
const faqHtml = faq.map(([q, a], i) => `<details class="faq"${i === 0 ? ' open' : ''}><summary>${q}</summary><div>${a}</div></details>`).join('\n');
const faqLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>2026 연봉 실수령액 표, 4대보험 올라 월급 얼마나 줄었나</title>
<meta name="robots" content="max-image-preview:large"><meta property="og:image" content="/og/salary-net-pay-guide.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="description" content="연봉 5,000만원 월 실수령액 ${won(R50.netMonthly)}원. 2026년 4대보험 인상으로 월 ${won(diff25)}원 더 빠집니다. 국세청 간이세액표 원본으로 계산해 홈택스 조회값과 원 단위까지 같은 실수령액 표(2,400만~2억)와 내 상황 계산기.">
<script type="application/ld+json">${faqLd}</script>
<style>${fs.readFileSync(path.join(ROOT, 'scripts/article-template/v2.css'), 'utf8')}</style></head><body>
<div class="top"><div class="in"><i>$</i>MoneyDoc</div></div>
<main>
<div class="crumb"><a href="/">홈</a> › <a href="/tax/">세금</a> › 연봉 실수령액</div>
<h1>2026 연봉 실수령액 표, 4대보험 올라 월급 얼마나 줄었나</h1>
<div class="meta"><span>MoneyDoc 편집팀</span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>7분</span><span class="badge">홈택스 간이세액표 원 단위 일치 · ${VERIFIED} 검증</span></div>

<img class="hero" src="/_preview/og-salary-net-pay-guide.png" width="1200" height="630" alt="2026 연봉 실수령액 표. 연봉 5,000만원이면 월 ${won(R50.netMonthly)}원, 2025년보다 월 ${won(diff25)}원 덜 받습니다">
<section class="answer" aria-label="즉답">
  <div class="lbl">연봉을 고르면 바로 답합니다 (본인 1명·비과세 0원)</div>
  <div class="chips" id="qchips">${QUICK.map(({ a }, i) => `<button type="button" data-i="${i}" aria-pressed="${a === 50e6}">${man(a)}</button>`).join('')}</div>
  <div class="big" id="qnet">${won(R50.netMonthly)}원<small>월 실수령</small></div>
  <div class="sub" id="qsub">공제율 ${R50.deductRatePct}% · 4대보험 ${won(R50.totalInsurance)}원 · 소득세+지방세 ${won(R50.monthlyIncomeTax + R50.monthlyLocalTax)}원</div>
  <div class="split">
    <div class="box"><b>월 ${won(diff25)}원 덜 받습니다</b><span>2025년 대비, 연봉 5,000만 기준. 국민연금 4.5→4.75%, 건보 3.545→3.595%, 장기요양 0.9182→0.9448%</span></div>
    <div class="box"><b>연 ${won(diff25 * 12)}원</b><span>1년으로 환산한 4대보험 추가 부담. 소득세는 2026.3 간이세액표로 별도 반영</span></div>
  </div>
</section>
<a class="cta" href="/tax/salary-net-pay/">연봉 실수령액 계산기 바로가기</a>

<details class="toc"><summary>목차 (${TOC.length}개 질문)<span>열기</span></summary><ol>${TOC.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></details>
<section class="kk" aria-label="한눈에 보는 요약">
  <div class="hd"><small>한눈에 보는 2026 실수령액</small><b>핵심콕콕</b></div>
  <dl>
    <div class="row"><dt>기준</dt><dd>2026년 9월 · 본인 1명 · 비과세 0원 · 국세청 2026.3 간이세액표</dd></div>
    <div class="row"><dt>연봉 5,000만</dt><dd>월 ${won(R50.netMonthly)}원 (공제율 ${R50.deductRatePct}%)</dd></div>
    <div class="row"><dt>연봉 1억</dt><dd>월 ${won(R100.netMonthly)}원 (공제율 ${R100.deductRatePct}%)</dd></div>
    <div class="row"><dt>2025년 대비</dt><dd>4대보험 월 ${won(diff25)}원 · 연 ${won(diff25 * 12)}원 더 빠짐 (연봉 5,000만)</dd></div>
    <div class="row"><dt>4대보험 요율</dt><dd>국민연금 4.75% · 건강보험 3.595% · 장기요양 0.4724% · 고용보험 0.9%</dd></div>
    <div class="row"><dt>국민연금 상한</dt><dd>월 급여 659만원(연봉 약 7,900만원) 초과분은 더 안 늘어남</dd></div>
    <div class="row"><dt>실수령 늘리기</dt><dd>부양가족 신고 · 비과세 식대 월 20만원 (연 ${won((NONTAX[2].r.netMonthly - NONTAX[0].r.netMonthly) * 12)}원 차이)</dd></div>
    <div class="row"><dt>검증</dt><dd>홈택스 간이세액표 조회값과 원 단위 일치 (${VERIFIED})</dd></div>
  </dl>
</section>
<section class="widget" aria-label="내 상황 계산">
  <h4>내 상황으로 바로 보기</h4><p class="note">이 글의 표와 같은 산식(국세청 간이세액표 2026.3 + 공단 요율)으로 계산합니다.</p>
  <div class="grid">
    <div><label>연봉 (만원)</label><input id="wa" type="number" inputmode="numeric" value="5000" min="1200" max="30000" step="100"></div>
    <div><label>부양가족 (본인 포함)</label><select id="wd">${[1, 2, 3, 4, 5, 6].map((d) => `<option value="${d}"${d === 1 ? ' selected' : ''}>${d}명</option>`).join('')}</select></div>
    <div><label>8~20세 자녀</label><select id="wk">${[0, 1, 2, 3].map((k) => `<option value="${k}">${k}명</option>`).join('')}</select></div>
    <div><label>비과세 (월, 만원)</label><input id="wn" type="number" inputmode="numeric" value="0" min="0" max="100" step="5"></div>
  </div>
  <div class="result">
    <div class="main"><span>월 실수령</span><b id="wnet">—</b></div><div><span>4대보험</span><b id="wins">—</b></div><div><span>소득세+지방세</span><b id="wtax">—</b></div><div><span>공제율</span><b id="wpct">—</b></div>
  </div>
</section>

<h2 id="s1">연봉 실수령액 계산 방법, 월급에서 뭐가 빠지나요<small>연봉 5,000만원 = 월 세전 ${won(R50.grossMonthly)}원 기준</small></h2>
<p class="lead"><span class="ans">세전 월급에서 4대보험 ${won(R50.totalInsurance)}원과 소득세·지방소득세 ${won(R50.monthlyIncomeTax + R50.monthlyLocalTax)}원을 빼면 실수령액 ${won(R50.netMonthly)}원입니다.</span> 4대보험은 요율이 정해져 있어 누구나 같고, 소득세는 부양가족 수에 따라 달라집니다.</p>
<div class="flow">
  <div class="s"><span>세전 월급</span><b>${won(R50.grossMonthly)}</b><span>연봉 ÷ 12</span></div><div class="op">−</div>
  <div class="s"><span>4대보험</span><b>${won(R50.totalInsurance)}</b><span>연금·건보·요양·고용</span></div><div class="op">−</div>
  <div class="s"><span>소득세+지방세</span><b>${won(R50.monthlyIncomeTax + R50.monthlyLocalTax)}</b><span>간이세액표</span></div>
</div>
<div class="flow" style="grid-template-columns:1fr"><div class="s out"><span>월 실수령액</span><b>${won(R50.netMonthly)}원</b><span>공제율 ${R50.deductRatePct}% · 통장에 찍히는 금액</span></div></div>
<div class="tbl"><table><caption>연봉 5,000만원 월급 공제 항목별 금액과 요율</caption><thead><tr><th>항목</th><th>요율 (근로자)</th><th>월 공제액</th><th class="m">근거</th></tr></thead><tbody>
<tr><th scope="row">국민연금</th><td>4.75%</td><td>${won(R50.nationalPension)}</td><td class="m">기준소득월액 상한 659만·하한 41만</td></tr>
<tr><th scope="row">건강보험</th><td>3.595%</td><td>${won(R50.healthInsurance)}</td><td class="m">보수월액 기준</td></tr>
<tr><th scope="row">장기요양</th><td>0.4724%</td><td>${won(R50.longTermCare)}</td><td class="m">소득의 0.9448% ÷ 2 (건보료의 13.14%)</td></tr>
<tr><th scope="row">고용보험</th><td>0.9%</td><td>${won(R50.employmentInsurance)}</td><td class="m">실업급여 계정</td></tr>
<tr><th scope="row">소득세</th><td>간이세액표</td><td>${won(R50.monthlyIncomeTax)}</td><td class="m">부양가족 1명 · 2026.3.1 표</td></tr>
<tr><th scope="row">지방소득세</th><td>소득세의 10%</td><td>${won(R50.monthlyLocalTax)}</td><td class="m">지방세법</td></tr>
<tr class="hi"><th scope="row">공제 합계</th><td>${R50.deductRatePct}%</td><td class="net">${won(R50.totalDeduction)}</td><td class="m">실수령 ${won(R50.netMonthly)}원</td></tr>
</tbody></table></div>
<p class="fn">소득세 ${won(R50.monthlyIncomeTax)}원은 홈택스 근로소득 간이세액표 조회값(월급여 ${won(R50.monthly)}원·가족 1명)과 같습니다.</p>

<h2 id="s2">2026년 연봉 실수령액 표 (연봉 3000·4000·5000·7000·1억)<small>2,400만원부터 2억까지 · 본인 1명 · 비과세 0원</small></h2>
<p><span class="ans">연봉 3,000만원은 월 ${won(ROWS[1].r.netMonthly)}원, 5,000만원 ${won(R50.netMonthly)}원, 7,000만원 ${won(ROWS[8].r.netMonthly)}원, 1억은 ${won(R100.netMonthly)}원입니다.</span> 모바일에서는 실수령액과 공제율만 먼저 보이고, "전체 항목 보기"를 누르면 세전·4대보험·세금까지 펼쳐집니다.</p>
<div class="tbl compact" id="mainTbl"><table><caption>2026년 연봉 실수령액 표 (연봉 2,400만원부터 2억까지, 본인 1명 비과세 0원)</caption><thead><tr><th>연봉</th><th>월 실수령</th><th>공제율</th><th class="x">월 세전</th><th class="x">4대보험</th><th class="x">소득세+지방세</th></tr></thead><tbody>
${rowsHtml}
</tbody></table></div>
<button class="more" type="button" id="moreBtn">전체 항목 보기</button>
<p class="fn">단위: 원. 국세청 2026.3.1 간이세액표 원본 + 2026년 9월 4대보험 요율. 이 표의 소득세는 홈택스 조회값과 원 단위까지 같습니다 (${VERIFIED} 검증).</p>
<div class="note"><b>8,000만원부터 4대보험이 거의 안 늘어납니다.</b> 월 급여 659만원(연봉 약 7,900만원)을 넘으면 국민연금이 상한에 걸리기 때문입니다. 대신 소득세 누진이 커져 공제율은 계속 오릅니다.</div>

<h2 id="s3">2026년 4대보험 요율 인상, 월급 얼마나 줄었나요<small>같은 연봉인데 통장 금액이 줄어든 이유</small></h2>
<p><span class="ans">연봉 5,000만원이면 4대보험이 월 ${won(I25.total)}원에서 ${won(R50.totalInsurance)}원으로 ${won(diff25)}원 늘었습니다.</span> 국민연금·건강보험·장기요양 세 가지가 동시에 올랐고, 항목별로 나란히 두면 이렇습니다.</p>
<div class="tbl"><table><caption>2025년과 2026년 4대보험 요율 인상 비교 (연봉 5,000만원)</caption><thead><tr><th>항목</th><th>2025년</th><th>2026년</th><th>차이</th></tr></thead><tbody>
<tr><th scope="row">국민연금 (4.5% → 4.75%)</th><td>${won(I25.np)}</td><td>${won(R50.nationalPension)}</td><td>+${won(R50.nationalPension - I25.np)}</td></tr>
<tr><th scope="row">건강보험 (3.545% → 3.595%)</th><td>${won(I25.hi)}</td><td>${won(R50.healthInsurance)}</td><td>+${won(R50.healthInsurance - I25.hi)}</td></tr>
<tr><th scope="row">장기요양 (0.9182% → 0.9448%)</th><td>${won(I25.ltc)}</td><td>${won(R50.longTermCare)}</td><td>+${won(R50.longTermCare - I25.ltc)}</td></tr>
<tr><th scope="row">고용보험 (0.9% 동결)</th><td>${won(I25.ei)}</td><td>${won(R50.employmentInsurance)}</td><td>0</td></tr>
<tr class="hi"><th scope="row">4대보험 합계</th><td>${won(I25.total)}</td><td class="net">${won(R50.totalInsurance)}</td><td>+${won(diff25)}</td></tr>
</tbody></table></div>
<p class="fn">국민연금 기준소득월액 상한은 2025.7~2026.6 637만원, 2026.7~2027.6 659만원. 소득세는 2026.3.1 간이세액표 개정으로 별도 변동.</p>

<h2 id="s4">연봉 100만원 인상되면 실수령액은 얼마나 늘어나나요<small>연봉 협상은 세후로 계산해야 합니다</small></h2>
<p class="lead"><span class="ans">연봉 5,000만원에서 100만원 오르면 1년에 ${won((RAISE[0].rb.netMonthly - RAISE[0].ra.netMonthly) * 12)}원, 인상액의 ${Math.round((RAISE[0].rb.netMonthly - RAISE[0].ra.netMonthly) * 12 / 1e6 * 100)}%만 통장에 남습니다.</span> 남는 비율은 연봉대마다 다르고, 국민연금 상한을 지나면 오히려 조금 올라갑니다.</p>
<div class="tbl"><table><caption>연봉 인상액별 실수령액 증가와 남는 비율</caption><thead><tr><th>연봉 변화</th><th>인상액 (연)</th><th>실수령 증가 (연)</th><th>남는 비율</th></tr></thead><tbody>${raiseHtml}</tbody></table></div>
<p class="fn">본인 1명·비과세 0원. 남는 비율 = 실수령 증가 ÷ 인상액. 연봉 7,800만→8,000만 구간은 국민연금 상한 때문에 비율이 잠깐 높아집니다.</p>
<div class="tips"><div><b>협상 팁</b>"연봉 300만원 인상"은 5,000만원대에서 월 <em>${won((RAISE[1].rb.netMonthly - RAISE[1].ra.netMonthly))}원</em>입니다. 월 단위 세후 금액으로 바꿔 말하면 체감이 정확해집니다.</div></div>

<h2 id="s5">연봉 실수령액 늘리는 방법 (부양가족·비과세 식대)<small>세전 급여를 못 바꿀 때 손댈 수 있는 두 가지</small></h2>
<p><span class="ans">배우자와 자녀 2명을 부양가족으로 신고하면 월 ${won(FAMILY[3].r.netMonthly - FAMILY[0].r.netMonthly)}원, 식대 20만원이 비과세로 잡히면 월 ${won(NONTAX[2].r.netMonthly - NONTAX[0].r.netMonthly)}원이 더 들어옵니다.</span> 회사에 부양가족을 정확히 신고하는 것과 식대 같은 비과세를 급여 구성에 넣는 것, 이 두 가지가 실질적인 방법입니다.</p>
<div class="tbl"><table><caption>부양가족 수에 따른 소득세와 실수령액 (연봉 5,000만원)</caption><thead><tr><th>가족 구성 (연봉 5,000만)</th><th>월 소득세</th><th>월 실수령</th><th>본인만 대비</th></tr></thead><tbody>${famHtml}</tbody></table></div>
<p class="fn">간이세액표는 부양가족 수로 구간이 나뉘고, 8~20세 자녀는 1명 20,830원·2명 45,830원(3명부터 1명당 33,330원 추가)을 더 뺍니다.</p>
<div class="tbl"><table><caption>비과세 식대 금액별 실수령액 차이 (연봉 5,000만원)</caption><thead><tr><th>비과세 (월)</th><th>4대보험</th><th>소득세+지방세</th><th>월 실수령</th><th>0원 대비</th></tr></thead><tbody>${ntHtml}</tbody></table></div>
<p class="fn">식대 비과세 한도 월 20만원(소득세법 §12). 비과세는 4대보험 산정 기준에서도 빠져 두 쪽에서 동시에 줄어듭니다.</p>
<div class="note"><b>주의</b> 비과세로 잡히면 국민연금 기준소득월액도 줄어 나중에 받을 연금이 조금 줄어듭니다. 당장의 실수령과 노후 연금 사이의 선택입니다.</div>

<h2 id="s6">급여명세서 실수령액이 계산과 다른 이유<small>차이가 난다면 이 다섯 가지 중 하나입니다</small></h2>
<p><span class="ans">비과세 식대, 부양가족 신고, 원천징수 비율(80·120%), 상여가 있는 달, 4월·7월 정산. 이 다섯 가지 중 하나입니다.</span> 각각 얼마나 차이 나는지 적었습니다.</p>
<div class="tips">
<div><b>① 비과세 식대가 급여에 섞여 있다</b>월 20만원이 비과세면 실수령이 <em>+${won(NONTAX[2].r.netMonthly - NONTAX[0].r.netMonthly)}원</em> 올라갑니다. 명세서에서 "식대" 항목을 확인하세요.</div>
<div><b>② 부양가족 신고 인원이 다르다</b>배우자 1명 추가만으로 소득세가 월 <em>${won(FAMILY[0].r.monthlyIncomeTax - FAMILY[1].r.monthlyIncomeTax)}원</em> 줄어듭니다. 소득·세액공제신고서를 냈는지 확인하세요.</div>
<div><b>③ 회사가 원천징수 비율 80%·120%를 적용했다</b>근로자가 신청하면 소득세를 80%나 120%로 뗄 수 있습니다. 5,000만원 기준 100% ${won(R50.monthlyIncomeTax)}원 → 80% ${won(Math.floor(R50.monthlyIncomeTax * 0.8 / 10) * 10)}원.</div>
<div><b>④ 상여·성과급이 있는 달이다</b>그 달 급여에 합산돼 간이세액표 구간이 올라갑니다. 연말정산에서 정산됩니다.</div>
<div><b>⑤ 4월·7월 정산 달이다</b>4월은 전년 보수 기준 건강보험 정산, 7월은 국민연금 기준소득월액 상·하한 변경이 반영됩니다.</div>
</div>

<h2 id="s7">월급 실수령액이 매달 다른 이유 (1월·4월·7월)<small>같은 연봉인데 어떤 달은 다르게 들어오는 이유</small></h2>
<p><span class="ans">1~2월 연말정산, 3월 간이세액표 개정, 4월 건강보험 정산, 7월 국민연금 상한 변경. 이 네 달에 금액이 바뀝니다.</span></p>
<div class="cal">
<div><b>1~2월</b><span>연말정산 환급·추가납부. 전년 소득세 확정</span></div>
<div><b>3월</b><span>간이세액표 개정 반영 (2026.3.1 표부터 소득세 변경)</span></div>
<div><b>4월</b><span>건강보험 보수 정산. 연봉 오른 해는 추가 납부</span></div>
<div><b>7월</b><span>국민연금 기준소득월액 상·하한 변경 (659만·41만)</span></div>
</div>

<h2 id="faq">자주 묻는 질문</h2>
${faqHtml}

<div class="sum"><b>정리</b><ul>
<li>실수령액 = 세전 월급 − 4대보험(${R50.deductRatePct === undefined ? '' : '약 9.7%'}) − 소득세(간이세액표) − 지방소득세(소득세의 10%).</li>
<li>연봉 5,000만원 월 ${won(R50.netMonthly)}원, 1억 ${won(R100.netMonthly)}원. 2025년보다 4대보험만 월 ${won(diff25)}원 더 빠집니다.</li>
<li>월 659만원(연봉 약 7,900만원)을 넘으면 국민연금은 더 늘지 않습니다.</li>
<li>부양가족 신고와 비과세 식대가 실수령을 늘리는 현실적인 방법입니다.</li>
</ul></div>
<a class="cta" href="/tax/salary-net-pay/">연봉 실수령액 계산기 바로가기</a>

<h2 id="src">출처</h2>
<div class="src">
<b>소득세</b>국세청 근로소득 간이세액표 (2026.3.1. 이후, 소득세법 시행령 별표2) 원본 엑셀을 그대로 사용 · 소득세법 제134조(원천징수)·시행령 제194조(80/100/120%) · 지방세법 제103조의13(지방소득세 10%). 홈택스 조회값과 ${VERIFIED} 대조.
<b>4대보험 (2026년)</b>국민연금 4.75%(총 9.5%), 기준소득월액 상한 6,590,000·하한 410,000원 (2026.7~2027.6) (국민연금공단). 건강보험 3.595%(총 7.19%), 장기요양 소득 대비 0.9448% (국민건강보험공단). 고용보험 0.9%(총 1.8%) (고용노동부). 4대사회보험 정보연계센터 모의계산과 ${VERIFIED} 대조.
<b>한계</b>회사 급여명세서의 소득세는 원천징수 선납액이며 실제 세액은 다음 해 연말정산에서 확정됩니다. 성과급·상여, 비과세 항목, 회사 규모별 고용보험 요율 차이는 반영하지 않습니다.
</div>
<div class="rel"><a href="/tax/four-major-insurance-guide/"><b>세금 가이드</b>2026 4대보험 요율, 회사 부담까지</a><a href="/tax/comprehensive-income-tax-guide/"><b>세금 가이드</b>연말정산 후 세금이 확정되는 구조</a><a href="/tax/salary-net-pay/"><b>계산기</b>연봉 실수령액 계산기</a></div>
</main>
<script>
${tableSrc.replace('module.exports = { SIMPLIFIED_TAX_2026_03 };', '')}
${PORT}
(function(){
  var Q=${quickJson}; var won=function(n){return Math.round(n).toLocaleString('ko-KR')};
  var chips=document.querySelectorAll('#qchips button');
  chips.forEach(function(b){b.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed','false')}); b.setAttribute('aria-pressed','true'); var q=Q[+b.dataset.i];
    document.getElementById('qnet').innerHTML=won(q.net)+'원<small>월 실수령</small>'; document.getElementById('qsub').textContent='공제율 '+q.pct+'% · 4대보험 '+won(q.ins)+'원 · 소득세+지방세 '+won(q.tax)+'원';})});
  function render(){ var a=(+document.getElementById('wa').value||0)*1e4, d=+document.getElementById('wd').value, k=+document.getElementById('wk').value, n=(+document.getElementById('wn').value||0)*1e4;
    if(a<12e6){document.getElementById('wnet').textContent='연봉 1,200만원 이상';return;} var r=mdSalary(a,d,k,n);
    document.getElementById('wnet').textContent=won(r.net)+'원'; document.getElementById('wins').textContent=won(r.ins)+'원'; document.getElementById('wtax').textContent=won(r.tax+r.local)+'원'; document.getElementById('wpct').textContent=r.pct+'%'; }
  ['wa','wd','wk','wn'].forEach(function(id){document.getElementById(id).addEventListener('input',render)}); render();
  var t=document.getElementById('mainTbl'), mb=document.getElementById('moreBtn'); mb.addEventListener('click',function(){var c=t.classList.toggle('compact'); mb.textContent=c?'전체 항목 보기':'핵심만 보기';});
  if(window.innerWidth>640){t.classList.remove('compact'); mb.textContent='핵심만 보기';}
})();
</script>
</body></html>`;
const HERO = `<svg viewBox="0 0 1200 630" role="img" aria-label="2026 연봉 실수령액 표 썸네일">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#fdfbf6"/><stop offset="1" stop-color="#f3ede2"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="64" y="96" width="132" height="40" rx="20" fill="#c4452f"/><text x="130" y="123" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="20" font-weight="700" fill="#fff">급여·세금</text>
  <text x="64" y="235" font-family="Pretendard, sans-serif" font-size="72" font-weight="800" fill="#2b2723" letter-spacing="-3">2026 연봉</text>
  <text x="64" y="320" font-family="Pretendard, sans-serif" font-size="72" font-weight="800" fill="#c4452f" letter-spacing="-3">실수령액 표</text>
  <text x="64" y="386" font-family="Pretendard, sans-serif" font-size="27" font-weight="600" fill="#6f6a60">연봉 5,000만원 → 월 ${won(R50.netMonthly)}원</text>
  <text x="64" y="428" font-family="Pretendard, sans-serif" font-size="27" font-weight="600" fill="#6f6a60">2025년보다 월 ${won(diff25)}원 덜 받습니다</text>
  <text x="64" y="520" font-family="Pretendard, sans-serif" font-size="20" font-weight="600" fill="#9a9385">국세청 간이세액표 원본 · 홈택스 조회값과 일치 · ${VERIFIED} 검증</text>
  <g transform="translate(880,150)">
    <rect x="0" y="180" width="70" height="150" rx="10" fill="#e6dccb"/><rect x="95" y="120" width="70" height="210" rx="10" fill="#d8c9ad"/><rect x="190" y="40" width="70" height="290" rx="10" fill="#c4452f" opacity=".85"/>
    <text x="35" y="360" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="17" fill="#6f6a60">4대보험</text><text x="130" y="360" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="17" fill="#6f6a60">소득세</text><text x="225" y="360" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="17" font-weight="700" fill="#c4452f">실수령</text>
  </g>
</svg>`;
fs.writeFileSync(path.join(ROOT, 'public/_preview/og-salary.svg'), HERO, 'utf8');
const out = path.join(ROOT, 'public/_preview/article-v2-salary.html');
fs.writeFileSync(out, html, 'utf8');
console.log('written', out, (html.length / 1024).toFixed(0) + 'KB');
