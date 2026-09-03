/**
 * 글 스펙: 2026 연봉 실수령액 표
 *   숫자는 전부 엔진(salary-net-pay: 국세청 2026.3 간이세액표 + 공단 요율, 홈택스 0원 일치)이 만든다.
 *   2025년 비교는 근거가 잡힌 국민연금 요율(9%→9.5%, 근로자 4.5%→4.75%)만 쓴다.
 *   위젯 산식(port)은 build.mjs 가 엔진과 대조한다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { won, man, ROOT } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('tax/salary-net-pay');
  const C = spec.constants;
  const sal = (annual, dependents = 1, kids = 0, nontaxable = 0) => calculators['salary-net-pay']({ annual, dependents, kids, nontaxable }, spec);
  const pct = (v) => `${+(v * 100).toFixed(4)}%`;

  const ROWS = [24e6, 30e6, 36e6, 40e6, 45e6, 50e6, 55e6, 60e6, 70e6, 80e6, 90e6, 100e6, 120e6, 150e6, 200e6].map((a) => ({ a, r: sal(a) }));
  const R50 = sal(50e6), R100 = sal(100e6), R30 = sal(30e6), R70 = sal(70e6);
  const QUICK = [30e6, 40e6, 50e6, 70e6, 100e6].map((a) => ({ a, r: sal(a) }));
  const FAMILY = [['본인만', 1, 0], ['배우자', 2, 0], ['배우자 + 자녀 1명 (8~20세)', 3, 1], ['배우자 + 자녀 2명', 4, 2]].map(([label, d, k]) => ({ label, r: sal(50e6, d, k) }));
  const NONTAX = [0, 100000, 200000, 300000].map((n) => ({ n, r: sal(50e6, 1, 0, n) }));
  const RAISE = [[50e6, 51e6], [50e6, 53e6], [50e6, 55e6], [50e6, 60e6], [78e6, 80e6], [80e6, 85e6]].map(([a, b]) => ({ a, b, ra: sal(a), rb: sal(b) }));
  // 2025 국민연금 근로자 4.5% (국민연금법 부칙: 2025년 1천분의 90 = 총 9%) — 이것만 근거가 있어 비교한다
  const NP_2025 = derive(Math.floor(Math.floor(Math.min(Math.max(R50.monthly, C.NP_FLOOR_MONTHLY), C.NP_CAP_MONTHLY) * 0.045) / 10) * 10);
  const npDiff = derive(R50.nationalPension - NP_2025);
  const taxSum = (r) => derive(r.monthlyIncomeTax + r.monthlyLocalTax);
  const tax80 = derive(Math.floor(R50.monthlyIncomeTax * 0.8 / 10) * 10);
  const capAnnual = derive(C.NP_CAP_MONTHLY * 12);           // 국민연금 상한이 걸리는 연봉
  const keepPct = (ra, rb, up) => derive(Math.round((rb.netMonthly - ra.netMonthly) * 12 / up * 100));
  const famGain = (i) => derive(FAMILY[i].r.netMonthly - FAMILY[0].r.netMonthly);
  const ntGain = (i) => derive(NONTAX[i].r.netMonthly - NONTAX[0].r.netMonthly);
  const spouseTaxCut = derive(FAMILY[0].r.monthlyIncomeTax - FAMILY[1].r.monthlyIncomeTax);
  const raise100 = derive((RAISE[0].rb.netMonthly - RAISE[0].ra.netMonthly) * 12);
  const raise300m = derive(RAISE[1].rb.netMonthly - RAISE[1].ra.netMonthly);
  const ratio100 = derive(+(R100.netMonthly / R50.netMonthly).toFixed(2));
  const tableSrc = fs.readFileSync(path.join(ROOT, 'lib/calc/tables/simplified-tax-2026-03.js'), 'utf8').replace('module.exports = { SIMPLIFIED_TAX_2026_03 };', '');

  return {
    slug: 'salary-net-pay-guide', cat: 'tax', catLabel: '세금', crumb: '연봉 실수령액',
    title: '2026년 연봉 실수령액 표, 연봉 3000부터 1억까지 월급 얼마 받나요',
    description: `연봉 5,000만원이면 2026년 월 실수령액은 ${won(R50.netMonthly)}원이에요. 국세청 간이세액표 원본으로 계산해 홈택스 조회값과 원 단위까지 같은 실수령액 표(2,400만원부터 2억까지), 4대보험 요율, 실수령액 늘리는 법, 명세서와 다른 이유를 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `홈택스 간이세액표 원 단위 일치 · ${VERIFIED}`,
    calc: { href: '/tax/salary-net-pay/', label: '연봉 실수령액 계산기 바로가기' },
    hero: {
      tag: '급여·세금', line1: '2026년 연봉', line2: '실수령액 표',
      sub1: `연봉 5,000만원 → 월 ${won(R50.netMonthly)}원 (공제율 ${R50.deductRatePct}%)`,
      sub2: `국민연금 4.75% · 건강보험 3.595% · 고용보험 0.9% · 간이세액표 2026.3`,
      foot: `국세청 간이세액표 원본 · 홈택스 조회값과 일치 · ${VERIFIED} 검증`,
      card: { label: '월 실수령액', big: won(R50.netMonthly), unit: '원', l1: `연봉 5,000만원`, l2: `공제 ${won(R50.totalDeduction)}원` },
      alt: `2026년 연봉 실수령액 표. 연봉 5,000만원이면 월 ${won(R50.netMonthly)}원, 1억이면 월 ${won(R100.netMonthly)}원`,
    },
    intro: `연봉 계약서의 숫자와 통장에 찍히는 숫자는 달라요. 연봉 5,000만원이면 2026년 기준 월 ${won(R50.netMonthly)}원이 들어오고, 세전 ${won(R50.grossMonthly)}원에서 4대보험 ${won(R50.totalInsurance)}원과 소득세·지방소득세 ${won(taxSum(R50))}원이 빠져요. 이 글은 연봉 2,400만원부터 2억까지 실수령액 표, 4대보험 요율, 실수령액을 늘리는 두 가지 방법, 급여명세서와 숫자가 다른 이유를 순서대로 정리했어요.`,
    answer: {
      label: '연봉을 고르면 바로 답해요 (본인 1명 · 비과세 0원)',
      quick: QUICK.map(({ a, r }) => ({ chip: man(a), selected: a === 50e6, big: `${won(r.netMonthly)}원`, unit: '월 실수령', sub: `공제율 ${r.deductRatePct}% · 4대보험 ${won(r.totalInsurance)}원 · 소득세+지방세 ${won(taxSum(r))}원` })),
      boxes: [
        { title: `4대보험이 월 ${won(R50.totalInsurance)}원 빠져요`, text: `연봉 5,000만원 기준. 국민연금 ${won(R50.nationalPension)}원, 건강보험 ${won(R50.healthInsurance)}원, 장기요양 ${won(R50.longTermCare)}원, 고용보험 ${won(R50.employmentInsurance)}원` },
        { title: `세금은 월 ${won(taxSum(R50))}원이에요`, text: `소득세 ${won(R50.monthlyIncomeTax)}원 + 지방소득세 ${won(R50.monthlyLocalTax)}원. 부양가족이 늘면 줄어요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 2026 실수령액',
      rows: [
        ['기준', '2026년 9월 · 본인 1명 · 비과세 0원 · 국세청 2026.3 간이세액표'],
        ['연봉 5,000만', `월 ${won(R50.netMonthly)}원 (공제율 ${R50.deductRatePct}%)`],
        ['연봉 1억', `월 ${won(R100.netMonthly)}원 (공제율 ${R100.deductRatePct}%)`],
        ['4대보험 요율', `국민연금 4.75% · 건강보험 3.595% · 장기요양 ${pct(C.LTC_INCOME_RATE / 2)} · 고용보험 0.9%`],
        ['국민연금 상한', `월 급여 ${man(C.NP_CAP_MONTHLY)}원 (연봉 약 ${man(capAnnual)}원) 초과분은 더 안 늘어요`],
        ['실수령 늘리기', `부양가족 신고 · 비과세 식대 월 20만원 (월 ${won(ntGain(2))}원 차이)`],
        ['2025년 대비', `국민연금 근로자 요율 4.5% → 4.75%, 연봉 5,000만원이면 월 ${won(npDiff)}원 더 빠져요`],
        ['검증', `홈택스 간이세액표 조회값과 원 단위 일치 (${VERIFIED})`],
      ],
    },
    sections: [
      { id: 's1', h2: '연봉 실수령액 계산 방법, 월급에서 뭐가 빠지나요', sub: `연봉 5,000만원 = 월 세전 ${won(R50.grossMonthly)}원 기준`, blocks: [
        { type: 'p', lead: true, ans: `세전 월급에서 4대보험 ${won(R50.totalInsurance)}원과 소득세·지방소득세 ${won(taxSum(R50))}원을 빼면 실수령액 ${won(R50.netMonthly)}원이에요.`, text: '4대보험은 요율이 정해져 있어 누구나 같고, 소득세는 부양가족 수에 따라 달라져요.' },
        { type: 'flow', label: '연봉 실수령액 계산 순서', steps: [
          { label: '세전 월급', value: `${won(R50.grossMonthly)}원`, sub: '연봉 ÷ 12', op: '−' },
          { label: '4대보험', value: `${won(R50.totalInsurance)}원`, sub: '연금·건보·요양·고용', op: '−' },
          { label: '소득세+지방세', value: `${won(taxSum(R50))}원`, sub: '간이세액표', op: '=' },
          { label: '월 실수령액', value: `${won(R50.netMonthly)}원`, sub: `공제율 ${R50.deductRatePct}%` },
        ] },
        { type: 'table', net: 2, caption: '연봉 5,000만원 월급 공제 항목별 금액과 요율 (2026년)', headers: ['항목', '요율 (근로자)', '월 공제액', '기준'], rows: [
          { cells: ['국민연금', '4.75%', won(R50.nationalPension), `기준소득월액 상한 ${man(C.NP_CAP_MONTHLY)}원 · 하한 ${man(C.NP_FLOOR_MONTHLY)}원`] },
          { cells: ['건강보험', '3.595%', won(R50.healthInsurance), '보수월액 기준'] },
          { cells: ['장기요양', pct(C.LTC_INCOME_RATE / 2), won(R50.longTermCare), `소득의 ${pct(C.LTC_INCOME_RATE)} 중 근로자 절반`] },
          { cells: ['고용보험', '0.9%', won(R50.employmentInsurance), '실업급여 요율 1.8% 중 근로자 절반'] },
          { cells: ['소득세', '간이세액표', won(R50.monthlyIncomeTax), '부양가족 1명 · 2026.3.1 표'] },
          { cells: ['지방소득세', '소득세의 10%', won(R50.monthlyLocalTax), '소득세에 붙는 지방세'] },
          { hi: true, cells: ['공제 합계', `${R50.deductRatePct}%`, won(R50.totalDeduction), `실수령 ${won(R50.netMonthly)}원`] },
        ], fn: `소득세 ${won(R50.monthlyIncomeTax)}원은 홈택스 근로소득 간이세액표 조회값(월급여 ${won(R50.monthly)}원 · 가족 1명)과 같아요.` },
      ] },

      { id: 's2', h2: '2026년 연봉 실수령액 표, 연봉 3000·4000·5000·7000·1억은 월 얼마인가요', sub: '2,400만원부터 2억까지 · 본인 1명 · 비과세 0원', blocks: [
        { type: 'p', ans: `연봉 3,000만원은 월 ${won(R30.netMonthly)}원, 5,000만원 ${won(R50.netMonthly)}원, 7,000만원 ${won(R70.netMonthly)}원, 1억은 ${won(R100.netMonthly)}원이에요.`, text: '모바일에서는 실수령액과 공제율만 먼저 보이고, "전체 항목 보기"를 누르면 세전·4대보험·세금까지 펼쳐져요.' },
        { type: 'table', id: 'mainTbl', compact: true, moreLabel: '전체 항목 보기', x: [3, 4, 5], net: 1, caption: '2026년 연봉 실수령액 표 (연봉 2,400만원부터 2억까지, 본인 1명 비과세 0원)', headers: ['연봉', '월 실수령', '공제율', '월 세전', '4대보험', '소득세+지방세'],
          rows: ROWS.map(({ a, r }) => ({ hi: a === 50e6, cells: [man(a), won(r.netMonthly), `${r.deductRatePct}%`, won(r.grossMonthly), won(r.totalInsurance), won(taxSum(r))] })),
          fn: '단위: 원. 국세청 2026.3.1 간이세액표 원본 + 2026년 4대보험 요율. 이 표의 소득세는 홈택스 조회값과 원 단위까지 같아요.' },
        { type: 'widget', label: '내 상황 계산', title: '내 상황으로 바로 보기', note: '이 글의 표와 같은 산식(국세청 간이세액표 2026.3 + 공단 요율)으로 계산해요.',
          inputs: [
            { id: 'wa', label: '연봉 (만원)', type: 'number', value: 5000, min: 1200, max: 30000, step: 100 },
            { id: 'wd', label: '부양가족 (본인 포함)', type: 'select', value: 1, options: [1, 2, 3, 4, 5, 6].map((d) => [d, `${d}명`]) },
            { id: 'wk', label: '8~20세 자녀', type: 'select', value: 0, options: [0, 1, 2, 3].map((k) => [k, `${k}명`]) },
            { id: 'wn', label: '비과세 (월, 만원)', type: 'number', value: 0, min: 0, max: 100, step: 5 },
          ],
          outputs: [{ id: 'wnet', label: '월 실수령' }, { id: 'wins', label: '4대보험' }, { id: 'wtax', label: '소득세+지방세' }, { id: 'wpct', label: '공제율' }],
          port: `${tableSrc}
function mdSalary(annual, dependents, kids, nontaxable){
  var T=SIMPLIFIED_TAX_2026_03; var cut=function(n){return Math.floor(n/10)*10}; var fl=function(x){return Math.floor(Math.round(x*1e6)/1e6)};
  var m=Math.max(0,Math.floor(annual/12-(nontaxable||0))); var fam=Math.max(1,Math.floor(dependents||1)); var k=Math.min(Math.max(0,Math.floor(kids||0)),fam-1);
  function base(col){ if(m<T.minMonthly)return 0; if(m<1e7){for(var i=0;i<T.blocks.length;i++){var b=T.blocks[i]; if(m>=b.start&&m<b.end)return b.rows[Math.floor((m-b.start)/b.step)][col];} return 0;}
    var t10=T.at10000000[col]; if(m===1e7)return t10; var lower=1e7; for(var j=0;j<T.over10000000.length;j++){var o=T.over10000000[j]; if(o.upTo===null||m<=o.upTo){var rp=Math.round(o.rate*100),ex=m-lower; var add=o.apply98?(ex*98*rp)/1e4:(ex*rp)/100; return cut(t10+o.fixed+o.plus+add+1e-7);} lower=o.upTo;} return 0; }
  var tax; if(fam<=11)tax=base(fam-1); else{var t11=base(10),t10b=base(9); tax=Math.max(0,t11-(t10b-t11)*(fam-11));}
  var adj=k===0?0:k===1?T.childAdjust.one:T.childAdjust.two+T.childAdjust.perExtraOver2*(k-2); var tax100=Math.max(0,tax-adj);
  var it=cut(tax100), lt=it>0?cut(it/10):0;
  var npb=m<${C.NP_FLOOR_MONTHLY}?${C.NP_FLOOR_MONTHLY}:(m>=${C.NP_CAP_MONTHLY}?${C.NP_CAP_MONTHLY}:m); var np=cut(fl(npb*${C.NP_RATE})), hi=cut(fl(m*${C.HI_RATE})), ltc=cut(fl(m*${C.LTC_INCOME_RATE}/2)), ei=cut(fl(m*${C.EI_RATE}));
  var ins=np+hi+ltc+ei, ded=cut(it+lt+ins), gross=Math.floor(annual/12), net=cut(m+(nontaxable||0)-ded);
  return {monthly:m,gross:gross,np:np,hi:hi,ltc:ltc,ei:ei,ins:ins,tax:it,local:lt,ded:ded,net:net,pct:+(ded/gross*100).toFixed(1)};
}`,
          js: `
  function wrender(){ var a=(+document.getElementById('wa').value||0)*1e4, d=+document.getElementById('wd').value, k=+document.getElementById('wk').value, n=(+document.getElementById('wn').value||0)*1e4; if(a<=0)return; var r=mdSalary(a,d,k,n);
    document.getElementById('wnet').textContent=won(r.net)+'원'; document.getElementById('wins').textContent=won(r.ins)+'원'; document.getElementById('wtax').textContent=won(r.tax+r.local)+'원'; document.getElementById('wpct').textContent=r.pct+'%'; }
  ['wa','wd','wk','wn'].forEach(function(id){document.getElementById(id).addEventListener('input',wrender)}); wrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let a = 12e6; a <= 300e6; a += (a < 60e6 ? 1e6 : 5e6)) for (const d of [1, 2, 3, 4, 5]) for (const k of [0, 1, 2]) for (const nt of [0, 200000]) {
              if (k > d - 1) continue;
              const e = sal(a, d, k, nt); const p = port.mdSalary(a, d, k, nt); n++;
              if (p.net !== e.netMonthly || p.tax !== e.monthlyIncomeTax || p.local !== e.monthlyLocalTax || p.ins !== e.totalInsurance || p.ded !== e.totalDeduction || p.pct !== e.deductRatePct) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: `연봉 ${man(capAnnual)}원부터 국민연금이 더 안 늘어요.`, text: `월 급여 ${man(C.NP_CAP_MONTHLY)}원이 국민연금 기준소득월액 상한이라 그 위로는 연금 보험료가 같아요. 대신 소득세 누진이 커져서 공제율은 계속 올라요.` },
      ] },

      { id: 's3', h2: '2026년 4대보험 요율, 월급에서 얼마나 떼나요', sub: '요율은 법으로 정해져 있어 회사가 달라도 같아요', blocks: [
        { type: 'p', lead: true, ans: `근로자가 내는 몫은 국민연금 4.75%, 건강보험 3.595%, 장기요양 ${pct(C.LTC_INCOME_RATE / 2)}, 고용보험 0.9%예요.`, text: `회사도 같은 비율을 따로 내요. 국민연금은 2026년에 총 9%에서 9.5%로 올라 근로자 몫이 4.5%에서 4.75%가 됐고, 연봉 5,000만원이면 월 ${won(npDiff)}원 더 내요.` },
        { type: 'table', text: true, caption: '2026년 4대보험 요율과 근로자 부담 (연봉 5,000만원 기준 월 공제액)', headers: ['항목', '전체 요율', '근로자 몫', '월 공제액'], rows: [
          { cells: ['국민연금', '9.5% (2025년 9%)', '4.75%', `${won(R50.nationalPension)}원`] },
          { cells: ['건강보험', '7.19%', '3.595%', `${won(R50.healthInsurance)}원`] },
          { cells: ['장기요양보험', `소득의 ${pct(C.LTC_INCOME_RATE)}`, pct(C.LTC_INCOME_RATE / 2), `${won(R50.longTermCare)}원`] },
          { cells: ['고용보험 (실업급여)', '1.8%', '0.9%', `${won(R50.employmentInsurance)}원`] },
        ], fn: `국민연금 기준소득월액 상한 ${man(C.NP_CAP_MONTHLY)}원 · 하한 ${man(C.NP_FLOOR_MONTHLY)}원 (2026.7~2027.6). 국민연금 요율은 2032년까지 해마다 0.5%씩 올라 총 13%가 돼요.` },
        { type: 'timeline', label: '국민연금 보험료율 인상 일정', items: [
          { step: '2025', title: '총 9%', text: '근로자 4.5%', tag: '지난해' },
          { step: '2026', title: '총 9.5%', text: '근로자 4.75%', tag: '지금', mark: true },
          { step: '2027', title: '총 10%', text: '근로자 5%', tag: '내년' },
          { step: '2032', title: '총 13%', text: '근로자 6.5%', tag: '마지막' },
        ] },
      ] },

      { id: 's4', h2: '연봉 100만원 인상되면 실수령액은 얼마나 늘어나나요', sub: '연봉 협상은 세후로 계산해야 해요', blocks: [
        { type: 'p', lead: true, ans: `연봉 5,000만원에서 100만원 오르면 1년에 ${won(raise100)}원, 인상액의 ${keepPct(RAISE[0].ra, RAISE[0].rb, 1e6)}%만 통장에 남아요.`, text: '남는 비율은 연봉대마다 다르고, 국민연금 상한을 지나면 오히려 조금 올라가요.' },
        { type: 'table', net: 2, caption: '연봉 인상액별 실수령액 증가와 남는 비율 (본인 1명 · 비과세 0원)', headers: ['연봉 변화', '인상액 (연)', '실수령 증가 (연)', '남는 비율'],
          rows: RAISE.map(({ a, b, ra, rb }) => ({ cells: [`${man(a)} → ${man(b)}`, `+${man(b - a)}`, `+${won(derive((rb.netMonthly - ra.netMonthly) * 12))}`, `${keepPct(ra, rb, b - a)}%`] })),
          fn: `남는 비율 = 실수령 증가 ÷ 인상액. 연봉 7,800만 → 8,000만 구간은 국민연금 상한 때문에 비율이 잠깐 높아져요.` },
        { type: 'tips', items: [{ title: '협상 팁', text: `"연봉 300만원 인상"은 5,000만원대에서 월 <em>${won(raise300m)}원</em>이에요. 월 단위 세후 금액으로 바꿔 말하면 체감이 정확해져요.` }] },
      ] },

      { id: 's5', h2: '연봉 실수령액 늘리는 방법 (부양가족·비과세 식대)', sub: '세전 급여를 못 바꿀 때 손댈 수 있는 두 가지', blocks: [
        { type: 'p', ans: `배우자와 자녀 2명을 부양가족으로 신고하면 월 ${won(famGain(3))}원, 식대 20만원이 비과세로 잡히면 월 ${won(ntGain(2))}원이 더 들어와요.`, text: '회사에 부양가족을 정확히 신고하는 것과 식대 같은 비과세를 급여 구성에 넣는 것, 이 두 가지가 현실적인 방법이에요.' },
        { type: 'table', net: 2, caption: '부양가족 수에 따른 소득세와 실수령액 (연봉 5,000만원)', headers: ['가족 구성', '월 소득세', '월 실수령', '본인만 대비'],
          rows: FAMILY.map(({ label, r }, i) => ({ hi: i === 3, cells: [label, won(r.monthlyIncomeTax), won(r.netMonthly), i === 0 ? '기준' : `+${won(famGain(i))}`] })),
          fn: '간이세액표는 부양가족 수로 구간이 나뉘고, 8세 이상 20세 이하 자녀가 있으면 세액을 더 빼요.' },
        { type: 'table', net: 3, caption: '비과세 식대 금액별 실수령액 차이 (연봉 5,000만원)', headers: ['비과세 (월)', '4대보험', '소득세+지방세', '월 실수령', '0원 대비'],
          rows: NONTAX.map(({ n, r }, i) => ({ hi: n === 200000, cells: [n === 0 ? '0원' : `${man(n)}원${n === 200000 ? ' (식대 한도)' : ''}`, won(r.totalInsurance), won(taxSum(r)), won(r.netMonthly), i === 0 ? '기준' : `+${won(ntGain(i))}`] })),
          fn: '식대 비과세 한도는 월 20만원. 비과세는 4대보험 산정 기준에서도 빠져 두 쪽에서 동시에 줄어요.' },
        { type: 'note', title: '주의', text: '비과세로 잡히면 국민연금 기준소득월액도 줄어 나중에 받을 연금이 조금 줄어요. 당장의 실수령과 노후 연금 사이의 선택이에요.' },
      ] },

      { id: 's6', h2: '급여명세서 실수령액이 계산과 다른 이유는 무엇인가요', sub: '차이가 난다면 이 다섯 가지 중 하나예요', blocks: [
        { type: 'p', ans: '비과세 식대, 부양가족 신고, 원천징수 비율(80·120%), 상여가 있는 달, 4월·7월 정산. 이 다섯 가지 중 하나예요.', text: '각각 얼마나 차이 나는지 적었어요.' },
        { type: 'tips', items: [
          { title: '① 비과세 식대가 급여에 섞여 있다', text: `월 20만원이 비과세면 실수령이 <em>+${won(ntGain(2))}원</em> 올라가요. 명세서에서 "식대" 항목을 확인하세요.` },
          { title: '② 부양가족 신고 인원이 다르다', text: `배우자 1명 추가만으로 소득세가 월 <em>${won(spouseTaxCut)}원</em> 줄어요. 소득·세액공제신고서를 냈는지 확인하세요.` },
          { title: '③ 회사가 원천징수 비율 80%·120%를 적용했다', text: `근로자가 신청하면 소득세를 80%나 120%로 뗄 수 있어요. 5,000만원 기준 100% ${won(R50.monthlyIncomeTax)}원 → 80% ${won(tax80)}원.` },
          { title: '④ 상여·성과급이 있는 달이다', text: '그 달 급여에 합산돼 간이세액표 구간이 올라가요. 연말정산에서 정산돼요.' },
          { title: '⑤ 4월·7월 정산 달이다', text: '4월은 전년 보수 기준 건강보험 정산, 7월은 국민연금 기준소득월액 상·하한 변경이 반영돼요.' },
        ] },
      ] },

      { id: 's7', h2: '월급 실수령액이 매달 다른 이유는 무엇인가요 (1월·4월·7월)', sub: '같은 연봉인데 어떤 달은 다르게 들어오는 이유', blocks: [
        { type: 'p', ans: '1~2월 연말정산, 3월 간이세액표 개정, 4월 건강보험 정산, 7월 국민연금 상한 변경. 이 네 달에 금액이 바뀌어요.' },
        { type: 'timeline', label: '실수령액이 달라지는 달', items: [
          { step: '1~2월', title: '연말정산', text: '환급 또는 추가 납부. 전년 소득세 확정' },
          { step: '3월', title: '간이세액표 개정', text: '2026.3.1 표부터 소득세 변경', mark: true },
          { step: '4월', title: '건강보험 정산', text: '전년 보수 기준. 연봉 오른 해는 추가 납부' },
          { step: '7월', title: '국민연금 상·하한 변경', text: `상한 ${man(C.NP_CAP_MONTHLY)}원 · 하한 ${man(C.NP_FLOOR_MONTHLY)}원 적용` , mark: true },
        ] },
      ] },
    ],
    faq: [
      ['연봉 5000 실수령액은 월 얼마인가요?', `부양가족 본인 1명, 비과세 0원 기준 월 <b>${won(R50.netMonthly)}원</b>이에요. 세전 ${won(R50.grossMonthly)}원에서 4대보험 ${won(R50.totalInsurance)}원, 소득세·지방소득세 ${won(taxSum(R50))}원이 빠져 공제율 ${R50.deductRatePct}%예요. 홈택스 간이세액표 조회값과 같은 숫자예요.`],
      ['연봉 1억이면 실수령액은 얼마인가요?', `월 <b>${won(R100.netMonthly)}원</b>, 공제율 ${R100.deductRatePct}%예요. 5,000만원의 실수령 ${won(R50.netMonthly)}원과 비교하면 세전은 2배지만 실수령은 ${ratio100}배예요.`],
      ['2026년에 실수령액이 줄어든 이유가 뭔가요?', `국민연금 요율이 총 9%에서 9.5%로 올라 근로자 몫이 4.5%에서 4.75%가 됐어요. 연봉 5,000만원이면 국민연금만 월 ${won(npDiff)}원 더 내요. 소득세는 2026년 3월 간이세액표 개정으로 따로 바뀌었어요.`],
      ['회사 명세서 소득세가 이 글과 다른데 왜 그런가요?', '다섯 가지를 확인하세요. 비과세 식대(월 20만원)가 급여에 포함돼 있는지, 부양가족 신고 인원, 회사가 80%·120% 원천징수 비율을 적용했는지, 상여가 있는 달인지, 4월 건보 정산·7월 국민연금 상한 변경 달인지예요.'],
      ['월 실수령액으로 연봉을 거꾸로 알 수 있나요?', '공제율이 연봉마다 달라 단순 나눗셈은 틀려요. 위 표에서 실수령액이 가까운 줄을 찾거나, 연봉 실수령액 계산기의 "실수령액 → 연봉" 기능을 쓰면 정확해요.'],
      ['소득세는 매달 이렇게 확정되는 건가요?', '아니에요. 매달 빠지는 소득세는 간이세액표에 따른 선납이고, 다음 해 1~2월 연말정산에서 실제 세액과 정산해 환급받거나 더 내요. 이 글의 숫자는 매달 통장에 들어오는 금액 기준이에요.'],
    ],
    summary: [
      '실수령액 = 세전 월급 − 4대보험 − 소득세(간이세액표) − 지방소득세(소득세의 10%).',
      `연봉 5,000만원 월 ${won(R50.netMonthly)}원, 1억 ${won(R100.netMonthly)}원. 국민연금 요율 인상으로 5,000만원이면 월 ${won(npDiff)}원 더 빠져요.`,
      `월 급여 ${man(C.NP_CAP_MONTHLY)}원(연봉 약 ${man(capAnnual)}원)을 넘으면 국민연금은 더 늘지 않아요.`,
      '부양가족 신고와 비과세 식대가 실수령을 늘리는 현실적인 방법이에요.',
    ],
    sources: [
      ['법령', '소득세법 제134조(원천징수), 제12조(비과세 식사대 월 20만원). 소득세법 시행령 제194조(간이세액표 적용, 100분의 80·120 신청). 국민연금법 부칙(2026년 사업장가입자 기여금 1만분의 475, 2032년까지 단계 인상). 국민건강보험법 시행령(보험료율 1만분의 719). 노인장기요양보험법 시행령 제4조(장기요양보험료율 100만분의 9,448). 고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 시행령 제12조(실업급여 보험료율 1천분의 18).'],
      ['행정규칙·정부 안내', `보건복지부 고시 국민연금 기준소득월액 하한액과 상한액(하한 410천원 · 상한 6,590천원, 2026.7~2027.6). 국세청 근로소득 간이세액표(2026.3.1 이후) 엑셀 원본을 그대로 옮겨 계산. 최저임금위원회 2026년 최저임금 결정현황(시급 10,320원).`],
      ['정부 도구', `홈택스 근로소득 간이세액표 조회값과 5케이스 원 단위 일치 (${VERIFIED}). 4대보험은 공단 요율로 계산해 4대사회보험 정보연계센터 모의계산과 대조했어요.`],
    ],
    claims: [
      { src: 1, quote: '20만원 이하의 식사대', note: '비과세 식대 한도 (소득세법 제12조)' },
      { src: 2, quote: '별표 2의 근로소득 간이세액표 해당란의 세액을 기준으로 원천징수한다', note: '간이세액표 원천징수 (시행령 제194조①)' },
      { src: 2, quote: '100분의 120 또는 100분의 80의 비율에 해당하는 금액의 원천징수를 신청하는 경우에는 그에 따라 원천징수할 수 있다', note: '80·120% 신청 (시행령 제194조① 단서)' },
      { src: 3, quote: '2026년은 1만분의 475', note: '사업장가입자 기여금 4.75% (국민연금법 부칙 제4조①)' },
      { src: 3, quote: '2027년은 1만분의 500', note: '2027년 근로자 5%' },
      { src: 3, quote: '2032년은 1만분의 625', note: '2032년 근로자 6.5% (총 13%)' },
      { src: 3, quote: '2025년 12월의 경우에는 1천분의 90', note: '2025년 총 9% (근로자 4.5%)' },
      { src: 4, quote: '하한액 : 410천원 나. 상한액 : 6,590천원', note: '기준소득월액 상·하한 (2026.7~2027.6)' },
      { src: 5, quote: '1만분의 719로 한다', note: '건강보험료율 7.19% (근로자 3.595%)' },
      { src: 6, quote: '100만분의 9,448로 한다', note: '장기요양보험료율 0.9448%' },
      { src: 7, quote: '실업급여의 보험료율: 1천분의 18', note: '고용보험 실업급여 1.8% (근로자 0.9%)' },
    ],
    related: [
      { kind: '계산기', label: '연봉 실수령액 계산기', href: '/tax/salary-net-pay/' },
      { kind: '세금 가이드', label: '2026 4대보험 요율, 회사 부담까지', href: '/tax/four-major-insurance-guide/' },
      { kind: '세금 가이드', label: '종합소득세 계산, 세율 구간', href: '/tax/comprehensive-income-tax-guide/' },
    ],
  };
}
