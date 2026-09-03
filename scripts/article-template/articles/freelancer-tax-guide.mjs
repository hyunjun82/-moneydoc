/**
 * 글 스펙: 프리랜서 3.3%
 *   원천징수는 freelancer-tax 엔진, 최종 세금은 business-income-tax-simple 엔진이 만든다.
 *   환급액은 두 값의 차이(derive)로만 쓴다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const fspec = loadSpec('tax/freelancer-tax');
  const bspec = loadSpec('tax/business-income-tax-simple');
  const wh = (gross) => calculators['freelancer-tax']({ grossPayment: gross }, fspec);
  const fin = (revenue, expenseRate, dependents) => calculators['business-income-tax-simple']({ revenue, expenseRate, dependents }, bspec);
  const RATE = 0.6;                                   // 예시로 쓰는 단순경비율 (업종마다 달라요)

  const M = wh(3e6);                                  // 한 번에 300만원을 받을 때
  const REV = [12e6, 24e6, 36e6, 50e6].map((v) => {
    const w = wh(v), b = fin(v, RATE, 1);
    return { v, w, b, refund: derive(w.totalTax - b.total) };
  });
  const BASE = REV[2];                                // 대표: 연 수입 3,600만원
  const RATES = [0.5, 0.6, 0.7, 0.8].map((r) => {
    const b = fin(3.6e7, r, 1);
    return { r, b, refund: derive(wh(3.6e7).totalTax - b.total) };
  });
  const FAM = [1, 2, 3, 4].map((d) => {
    const b = fin(3.6e7, RATE, d);
    return { d, b, refund: derive(wh(3.6e7).totalTax - b.total) };
  });
  const extraPay = derive(RATES[0].b.total - wh(3.6e7).totalTax);   // 경비율 50%일 때 추가 납부액
  const noFile = derive(Math.round(BASE.b.tax * 0.2));              // 무신고 가산세 20%
  const HOMETAX = 'https://www.hometax.go.kr';

  return {
    slug: 'freelancer-tax-guide', cat: 'tax', catLabel: '세금', crumb: '프리랜서 3.3%',
    title: '프리랜서 3.3% 원천징수와 환급, 경비율부터 5월 신고까지',
    description: `프리랜서가 300만원을 받으면 3.3%인 ${won(M.totalTax)}원을 떼고 ${won(M.netPayment)}원이 들어와요. 3.3%가 어떻게 나뉘는지, 단순경비율로 소득금액이 얼마가 되는지, 5월에 신고하면 얼마를 돌려받는지 표로 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `소득세법 원천징수세율과 누진세율표 대조 · ${VERIFIED}`,
    calc: { href: '/freelancer/calculator/', label: '프리랜서 3.3% 계산기 바로가기' },
    hero: {
      tag: '세금', line1: '프리랜서 3.3% 원천징수', line2: '얼마나 돌려받나',
      sub1: `300만원 받으면 ${won(M.totalTax)}원 떼고 ${won(M.netPayment)}원`,
      sub2: `연 수입 3,600만원이면 5월 신고로 약 ${won(BASE.refund)}원 환급`,
      foot: `원천징수세율과 종합소득세 누진세율표 대조 · ${VERIFIED} 검증`,
      card: { label: '떼는 세금', big: won(M.totalTax), unit: '원', l1: '지급액 300만원 기준', l2: `실수령 ${won(M.netPayment)}원` },
      alt: `프리랜서 3.3% 원천징수. 300만원을 받으면 ${won(M.totalTax)}원을 떼고 ${won(M.netPayment)}원이 들어와요`,
    },
    intro: `프리랜서로 일하고 돈을 받으면 3.3%를 떼고 들어와요. 300만원이면 ${won(M.totalTax)}원을 떼고 ${won(M.netPayment)}원이 통장에 찍혀요. 이 3.3%는 확정된 세금이 아니라 미리 걷어 둔 돈이에요. 다음 해 5월에 종합소득세 신고를 하면 실제 세금과 비교해서 남으면 돌려받고 모자라면 더 내요. 연 수입 3,600만원에 경비를 60%로 잡으면 약 ${won(BASE.refund)}원을 돌려받아요. 3.3%의 구조, 경비율, 환급액, 신고 방법 순서로 정리했어요.`,
    answer: {
      label: '한 번에 받는 금액을 눌러 떼는 세금을 확인해 보세요',
      quick: [1e6, 3e6, 5e6].map((g) => {
        const r = wh(g);
        return { chip: `${man(g)}원`, selected: g === 3e6, big: `${won(r.netPayment)}원`, unit: '실수령액', sub: `소득세 ${won(r.incomeTax)}원 + 지방소득세 ${won(r.localTax)}원 = ${won(r.totalTax)}원` };
      }),
      boxes: [
        { title: '3.3%는 세금이 아니라 예치금이에요', text: '미리 떼어 둔 돈이라, 5월에 신고해야 남는 금액이 환급으로 돌아와요' },
        { title: '수입이 적을수록 환급이 커요', text: `연 수입 1,200만원이면 뗀 ${won(REV[0].w.totalTax)}원 중 ${won(REV[0].refund)}원이 돌아와요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 프리랜서 세금',
      rows: [
        ['3.3%의 정체', '사업소득 원천징수 3%와 지방소득세 0.3%를 합친 비율'],
        ['누가 떼나요', '돈을 주는 회사가 떼서 대신 신고하고 납부해요'],
        ['확정 시점', '다음 해 5월 종합소득세 신고로 최종 세금이 정해져요'],
        ['소득금액', '수입금액에서 경비를 뺀 금액. 장부가 없으면 경비율로 계산해요'],
        ['단순경비율 기준', '인적용역은 직전 해 수입 3천600만원 미만이면 단순경비율 대상이에요'],
        ['3,600만원이면', `뗀 세금 ${won(BASE.w.totalTax)}원, 최종 세금 ${won(BASE.b.total)}원, 환급 약 ${won(BASE.refund)}원`],
        ['수입이 크면', '경비율이 낮게 잡혀 오히려 더 낼 수 있어요. 장부를 쓰는 쪽이 유리해요'],
        ['신고 안 하면', `환급을 못 받고, 낼 세금이 있으면 가산세 20%가 붙어요`],
      ],
    },
    sections: [
      { id: 's1', h2: '프리랜서 3.3% 원천징수, 왜 떼는 건가요', sub: '소득세 3%와 지방소득세 0.3%예요', blocks: [
        { type: 'p', lead: true, ans: `300만원을 받으면 소득세 ${won(M.incomeTax)}원과 지방소득세 ${won(M.localTax)}원을 떼고 ${won(M.netPayment)}원이 들어와요.`, text: '돈을 주는 쪽이 세금을 미리 떼서 대신 납부하는 구조예요. 국가 입장에서는 세금을 놓치지 않고, 받는 사람 입장에서는 한 번에 큰 금액을 내지 않아도 되는 방식이에요.' },
        { type: 'flow', label: '3.3%가 나뉘는 구조', steps: [
          { label: '지급액', value: `${man(3e6)}원`, sub: '세전 금액', op: '−' },
          { label: '소득세 3%', value: `${won(M.incomeTax)}원`, sub: '국세청으로', op: '−' },
          { label: '지방소득세 0.3%', value: `${won(M.localTax)}원`, sub: '소득세의 10%', op: '=' },
          { label: '실수령액', value: `${won(M.netPayment)}원`, sub: '통장에 들어오는 금액' },
        ] },
        { type: 'table', net: 3, caption: '지급액별 프리랜서 3.3% 원천징수액', headers: ['지급액', '소득세 3%', '지방소득세 0.3%', '실수령액'],
          rows: [1e6, 2e6, 3e6, 5e6, 1e7].map((g) => { const r = wh(g); return { hi: g === 3e6, cells: [`${man(g)}원`, `${won(r.incomeTax)}원`, `${won(r.localTax)}원`, `${won(r.netPayment)}원`] }; }),
          fn: '지방소득세는 소득세의 10%예요. 그래서 3%와 0.3%를 합쳐 3.3%가 돼요. 사업자등록이 없어도 똑같이 떼요.' },
        { type: 'note', title: '3.3%를 뗐다고 세금이 끝난 게 아니에요', text: '원천징수는 예상 세금을 미리 걷어 두는 절차예요. 실제 세금은 한 해 수입 전체를 합쳐 다음 해 5월에 정해져요.' },
      ] },

      { id: 's2', h2: '단순경비율이 뭔가요, 내 경비는 얼마로 잡히나요', sub: '장부가 없으면 수입에 경비율을 곱해요', blocks: [
        { type: 'p', lead: true, ans: '장부를 쓰지 않으면 국세청이 정한 경비율을 수입에 곱해서 경비를 인정해 줘요.', text: '수입에서 경비를 뺀 금액이 소득금액이고, 여기에 세금이 붙어요. 경비율이 높을수록 소득금액이 줄어 세금이 적어져요. 업종코드마다 경비율이 달라서 내 코드로 확인해야 해요.' },
        { type: 'table', text: true, caption: '단순경비율과 기준경비율의 차이', headers: ['구분', '내용'], rows: [
          { cells: ['단순경비율', '수입에 경비율을 곱한 금액을 통째로 경비로 인정해요. 증빙이 거의 필요 없어요'] },
          { cells: ['기준경비율', '매입, 임차료, 인건비는 증빙으로 인정하고 나머지만 경비율로 인정해요'] },
          { cells: ['어느 쪽이 적용되나', '직전 해 수입금액이 업종별 기준에 미달하면 단순경비율, 넘으면 기준경비율이에요'] },
          { cells: ['인적용역 프리랜서 기준', '직전 해 수입금액 3천600만원 미만이면 단순경비율 대상이에요'] },
          { cells: ['처음 시작한 해', '신규로 사업을 시작한 해는 단순경비율을 적용할 수 있어요'] },
          { cells: ['장부를 쓰면', '실제 쓴 경비를 그대로 인정받아요. 경비가 많은 사람은 이쪽이 유리해요'] },
        ], fn: '단순경비율 적용 대상은 소득세법 시행령 제143조제4항에, 업종별 경비율은 국세청 경비율 고시에 있어요. 인적용역은 수입금액 구간에 따라 기본율과 초과율이 따로 적용돼요.' },
        { type: 'p', ans: `같은 수입 3,600만원이어도 경비율이 60%면 세금이 ${won(RATES[1].b.total)}원, 80%면 ${won(RATES[3].b.total)}원이에요.`, text: `경비율이 낮으면 세금이 커져요. 경비율 50%로 계산하면 세금이 ${won(RATES[0].b.total)}원이라 미리 뗀 3.3%보다 많아서 ${won(extraPay)}원을 더 내야 해요.` },
        { type: 'table', net: 3, caption: '경비율에 따른 세금과 환급액 (연 수입 3,600만원, 부양가족 본인 1명)', headers: ['경비율', '소득금액', '과세표준', '최종 세금', '환급액'],
          rows: RATES.map(({ r, b, refund }) => ({ hi: r === RATE, cells: [`${(r * 100).toFixed(0)}%`, `${won(b.profit)}원`, `${won(b.taxable)}원`, `${won(b.total)}원`, refund >= 0 ? `${won(refund)}원` : `${won(Math.abs(refund))}원 추가 납부`] })),
          fn: '최종 세금은 지방소득세를 포함한 금액이에요. 환급액은 미리 뗀 3.3%에서 최종 세금을 뺀 값이에요.' },
        { type: 'note', title: '내 경비율은 홈택스에서 확인하세요', text: '홈택스 조회 메뉴에서 업종코드를 넣으면 그해 단순경비율과 기준경비율이 나와요. 계약서나 사업자 정보에 적힌 업종을 그대로 쓰면 돼요.' },
      ] },

      { id: 's3', h2: '프리랜서 환급액은 얼마인가요', sub: '뗀 3.3%에서 최종 세금을 뺀 금액이에요', blocks: [
        { type: 'p', lead: true, ans: `연 수입 3,600만원에 경비율 60%면 뗀 세금 ${won(BASE.w.totalTax)}원 중 ${won(BASE.refund)}원을 돌려받아요.`, text: `수입이 적을수록 환급 비율이 커져요. 세율이 낮은 구간에 들어가는데 3.3%는 수입에 그대로 붙기 때문이에요. 반대로 수입이 커지면 세율이 올라가 환급이 줄고, 어느 지점부터는 더 내게 돼요.` },
        { type: 'table', id: 'refTbl', compact: true, x: [2], net: 4, caption: '연 수입별 환급액 (단순경비율 60%, 부양가족 본인 1명 기준)', headers: ['연 수입', '소득금액', '과세표준', '미리 뗀 3.3%', '최종 세금', '환급액'],
          rows: REV.map(({ v, w, b, refund }) => ({ hi: v === 3.6e7, cells: [`${man(v)}원`, won(b.profit), won(b.taxable), won(w.totalTax), won(b.total), won(refund)] })),
          moreLabel: '과세표준까지 보기',
          fn: '단위: 원. 인적공제와 표준세액공제만 반영했어요. 국민연금이나 의료비 공제가 있으면 환급이 더 커져요.' },
        { type: 'table', net: 2, caption: '부양가족 수에 따른 환급액 (연 수입 3,600만원, 경비율 60%)', headers: ['부양가족', '최종 세금', '환급액'],
          rows: FAM.map(({ d, b, refund }) => ({ hi: d === 1, cells: [`${d}명`, `${won(b.total)}원`, `${won(refund)}원`] })),
          fn: '부양가족 한 명당 150만원씩 과세표준이 줄어요. 배우자와 부양가족은 연간 소득금액이 100만원 이하여야 해요.' },
        { type: 'widget', label: '내 환급액 계산', title: '내 수입으로 바로 보기', note: '연 수입과 경비율, 부양가족 수를 넣으면 최종 세금과 환급액이 나와요. 인적공제와 표준세액공제만 반영한 값이라, 연금보험료나 의료비 공제가 있으면 환급이 더 커져요.',
          inputs: [
            { id: 'fr', label: '연 수입 (만원)', type: 'number', value: 3600, min: 0, max: 30000, step: 100 },
            { id: 'fe', label: '경비율 (%)', type: 'number', value: 60, min: 30, max: 95, step: 1 },
            { id: 'fd', label: '부양가족 수 (본인 포함)', type: 'number', value: 1, min: 1, max: 10, step: 1 },
          ],
          outputs: [{ id: 'fprofit', label: '소득금액' }, { id: 'fwh', label: '미리 뗀 3.3%' }, { id: 'ftax', label: '최종 세금' }, { id: 'fref', label: '환급액' }],
          port: `
  function frtax(revenue, rate, dependents){
    var profit = Math.round(revenue * (1 - rate));
    var taxable = Math.max(0, profit - dependents * 1500000);
    var br = [[14000000,0.06,0],[50000000,0.15,1260000],[88000000,0.24,5760000],[150000000,0.35,15440000],[300000000,0.38,19940000],[500000000,0.40,25940000],[1000000000,0.42,35940000],[Infinity,0.45,65940000]];
    var base = 0;
    for (var i = 0; i < br.length; i++) { if (taxable <= br[i][0]) { base = Math.round(taxable * br[i][1] - br[i][2]); break; } }
    base = Math.max(0, base);
    var tax = Math.max(0, base - 70000);
    var local = Math.round(tax * 0.10);
    var withheld = Math.round(revenue * ${fspec.constants.INCOME_TAX_RATE}) + Math.round(revenue * ${fspec.constants.LOCAL_TAX_RATE});
    return { profit: profit, taxable: taxable, total: tax + local, withheld: withheld, refund: withheld - (tax + local) };
  }`,
          js: `
  function frrender(){ var rev=(+document.getElementById('fr').value||0)*1e4, rt=(+document.getElementById('fe').value||0)/100, d=+document.getElementById('fd').value||1; var r=frtax(rev,rt,d);
    document.getElementById('fprofit').textContent=won(r.profit)+'원'; document.getElementById('fwh').textContent=won(r.withheld)+'원'; document.getElementById('ftax').textContent=won(r.total)+'원';
    document.getElementById('fref').textContent=(r.refund>=0? won(r.refund)+'원 환급' : won(-r.refund)+'원 추가 납부'); }
  ['fr','fe','fd'].forEach(function(id){document.getElementById(id).addEventListener('input',frrender)}); frrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let rv = 0; rv <= 20000; rv += 200) for (const rt of [0.3, 0.45, 0.6, 0.75, 0.9]) for (const d of [1, 2, 4]) {
              n++;
              const e = fin(rv * 1e4, rt, d), w = wh(rv * 1e4);
              const p = port.frtax(rv * 1e4, rt, d);
              if (p.total !== e.total || p.profit !== e.profit || p.withheld !== w.totalTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's4', h2: '종합소득세 신고 어떻게 하나요, 5월에 뭘 준비하죠', sub: '홈택스에서 자료 확인부터 환급 계좌까지', blocks: [
        { type: 'p', lead: true, ans: '5월 1일부터 5월 31일까지 홈택스에서 신고하면 돼요.', text: '회사가 떼서 신고한 3.3% 자료는 국세청에 이미 들어가 있어요. 홈택스에 들어가면 미리 채워져 있으니 빠진 수입이 없는지 확인하고, 경비와 공제를 넣은 뒤 제출하면 돼요.' },
        { type: 'timeline', label: '프리랜서 한 해 세금 흐름', items: [
          { step: '연중', title: '일할 때마다 3.3% 원천징수', text: '돈을 주는 곳이 떼서 대신 납부해요. 지급명세서가 국세청에 쌓여요' },
          { step: '2월', title: '지급명세서 제출', text: '작년에 나에게 돈을 준 곳들이 지급명세서를 내요. 이 자료가 신고에 채워져요' },
          { step: '5월', title: '종합소득세 신고', text: '홈택스에서 수입과 경비, 공제를 확인하고 신고서를 내요', mark: true, tag: '5월 1일부터 31일' },
          { step: '6월', title: '환급금 입금', text: '신고서에 적은 본인 명의 계좌로 환급금이 들어와요' },
        ] },
        { type: 'tips', items: [
          { title: '지급명세서를 먼저 확인하세요', text: '홈택스에서 내 지급명세서를 조회하면 작년에 어디서 얼마를 받았는지 나와요. 빠진 곳이 있으면 직접 더해야 해요.' },
          { title: '현금으로 받은 수입도 넣어야 해요', text: '3.3%를 떼지 않고 받은 돈도 수입이에요. 빠뜨리면 나중에 가산세가 붙어요.' },
          { title: '경비가 많으면 장부를 쓰세요', text: '장비, 사무실 임차료, 외주비가 큰 사람은 실제 경비가 경비율보다 커요. 이때는 장부를 쓰는 쪽이 세금이 적어요.' },
          { title: '국민연금 보험료를 꼭 넣으세요', text: '지역가입자로 낸 국민연금 보험료는 전액 소득공제예요. 빠뜨리는 사람이 많은 항목이에요.' },
        ] },
      ] },

      { id: 's5', h2: '프리랜서가 신고를 안 하면 어떻게 되나요', sub: '환급을 못 받고 가산세가 붙어요', blocks: [
        { type: 'p', lead: true, ans: '돌려받을 돈이 있어도 신고하지 않으면 그대로 사라져요.', text: `낼 세금이 있는데 신고하지 않으면 무신고 가산세가 20% 붙고, 납부가 늦어진 날수만큼 가산세가 더 붙어요. 연 수입 3,600만원 기준으로 보면 가산세만 ${won(noFile)}원이에요.` },
        { type: 'tips', items: [
          { title: '기한을 넘겼어도 빨리 내세요', text: '기한이 지난 뒤에도 기한 후 신고를 할 수 있어요. 한 달 안에 하면 가산세의 절반을 깎아 줘요.' },
          { title: '환급은 5년 안에 청구할 수 있어요', text: '지난해 신고를 놓쳤다면 경정청구로 돌려받을 수 있어요. 홈택스에서 지난 연도 신고 내역을 확인해 보세요.' },
          { title: '건강보험료가 함께 오를 수 있어요', text: '소득이 확정되면 지역가입자 건강보험료 산정에 반영돼요. 세금만 보지 말고 보험료 변동도 같이 챙기세요.' },
        ] },
      ] },

      { id: 's6', h2: '사업자등록이나 부가세 신고도 해야 하나요', sub: '인적용역만 제공하면 대부분 필요 없어요', blocks: [
        { type: 'p', lead: true, ans: '혼자 인적용역만 제공한다면 사업자등록 없이도 3.3%로 처리돼요.', text: '사람이 직접 제공하는 용역은 부가가치세가 면세라서 부가세 신고 의무도 없어요. 다만 직원을 두거나 사무실을 갖추고 사업 형태를 갖추면 사업자등록을 하고 부가세를 신고해야 해요.' },
        { type: 'table', text: true, caption: '프리랜서와 사업자의 차이', headers: ['구분', '내용'], rows: [
          { cells: ['사업자등록 없는 프리랜서', '받을 때 3.3%를 떼요. 5월 종합소득세 신고만 하면 돼요'] },
          { cells: ['면세사업자 등록', '인적용역이면 부가세는 없고, 2월에 사업장 현황신고를 해요'] },
          { cells: ['일반과세 사업자', '세금계산서를 발행하고 1월과 7월에 부가세를 신고해요'] },
          { cells: ['직원을 고용하면', '4대보험 가입과 원천세 신고 의무가 생겨요'] },
        ], fn: '인적용역의 부가가치세 면세 범위는 부가가치세법 시행령 제42조에 있어요.' },
        { type: 'tips', items: [
          { title: '사업용 계좌를 따로 만드세요', text: '수입과 지출이 섞이지 않아 신고가 쉬워져요. 나중에 장부를 쓸 때도 그대로 쓸 수 있어요.' },
          { title: '노란우산공제를 확인하세요', text: '소기업과 소상공인이 가입하는 공제로, 낸 금액을 소득공제로 빼 줘요. 폐업할 때 목돈으로 돌려받아요.' },
        ] },
      ] },
    ],
    faq: [
      ['프리랜서 3.3%는 무슨 세금인가요?', `사업소득 원천징수 소득세 3%와 그 10%인 지방소득세 0.3%를 합친 비율이에요. 300만원을 받으면 <b>${won(M.totalTax)}원</b>을 떼요.`],
      ['프리랜서 환급은 얼마나 받나요?', `연 수입 3,600만원에 경비율 60%면 뗀 ${won(BASE.w.totalTax)}원 중 약 ${won(BASE.refund)}원을 돌려받아요. 수입이 적을수록 환급 비율이 커져요.`],
      ['단순경비율은 어떻게 적용되나요?', '장부가 없을 때 수입에 국세청이 정한 경비율을 곱해 경비를 인정해요. 인적용역은 직전 해 수입금액이 3천600만원 미만이면 대상이에요.'],
      ['프리랜서도 종합소득세 신고를 해야 하나요?', '해야 해요. 3.3%를 뗐어도 그건 미리 걷은 돈이라, 5월에 신고해야 최종 세금이 정해지고 남는 금액이 환급돼요.'],
      ['3.3% 뗐는데 세금을 더 내는 경우도 있나요?', `있어요. 수입이 크고 경비율이 낮으면 최종 세금이 더 커져요. 연 수입 3,600만원에 경비율 50%면 ${won(extraPay)}원을 더 내요.`],
      ['프리랜서도 사업자등록을 해야 하나요?', '혼자 인적용역만 제공하면 안 해도 돼요. 직원을 두거나 사업 형태를 갖추면 사업자등록과 부가세 신고 의무가 생겨요.'],
      ['신고를 안 하면 어떻게 되나요?', '환급을 못 받아요. 낼 세금이 있으면 무신고 가산세 20%와 납부지연 가산세가 붙어요. 기한 후 신고를 빨리 하면 절반까지 깎여요.'],
    ],
    summary: [
      `3.3%는 소득세 3%와 지방소득세 0.3%예요. 300만원을 받으면 ${won(M.totalTax)}원을 떼요.`,
      '이 돈은 확정 세금이 아니라 미리 걷은 금액이에요. 5월 신고로 최종 세금이 정해져요.',
      `연 수입 3,600만원에 경비율 60%면 약 ${won(BASE.refund)}원을 돌려받아요. 경비율이 낮으면 더 낼 수도 있어요.`,
      '신고하지 않으면 환급을 못 받고, 낼 세금이 있으면 가산세 20%가 붙어요.',
    ],
    sources: [
      ['법령', '소득세법 제127조(원천징수의무, 원천징수대상 사업소득), 제129조(원천징수세율, 사업소득 100분의 3), 제70조(5월 1일부터 5월 31일 확정신고), 제80조(추계결정). 소득세법 시행령 제143조(추계결정과 단순경비율 적용대상자), 제145조(기준경비율). 국세청 경비율 고시(업종별 단순경비율과 기준경비율, 인적용역 기본율과 초과율). 국세기본법 제47조의2(무신고가산세), 제48조(가산세 감면). 지방세법(개인지방소득세 특별징수).'],
      ['정부 도구', `홈택스 종합소득세 신고 화면의 세율표와 이 글의 계산이 같은 값이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '원천징수대상 사업소득에 대해서는 100분의 3', note: '사업소득 원천징수 3% (소득세법 제129조①3)' },
      { src: 1, quote: '그 종합소득 과세표준을 그 과세기간의 다음 연도 5월 1일부터 5월 31일까지', note: '5월 확정신고 (제70조①)' },
      { src: 2, quote: '수입금액에 단순경비율을 곱한 금액을 공제한 금액을 그 소득금액으로 결정 또는 경정하는 방법', note: '단순경비율 계산 방식 (시행령 제143조③1의2)' },
      { src: 2, quote: '해당 과세기간에 신규로 사업을 개시한 사업자', note: '신규 개업자는 단순경비율 대상 (제143조④1)' },
      { src: 2, quote: '인적용역만 해당한다): 3천600만원', note: '인적용역 단순경비율 기준금액 (제143조④2나)' },
      { src: 3, quote: '인적용역 사업소득자(업종코드 940***)의 2025년 귀속 수입금액 4천만원 이하는 단순경비율 기본율을 적용하고 4천만원 초과분은 초과율을 적용한다', note: '인적용역 기본율과 초과율 (국세청 경비율 고시 제4조)' },
      { src: 5, quote: '법정신고기한이 지난 후 1개월 이내에 기한 후 신고를 한 경우: 해당 가산세액의 100분의 50에 상당하는 금액', note: '기한 후 신고 가산세 감면 (국세기본법 제48조②2가)' },
    ],
    related: [
      { kind: '계산기', label: '프리랜서 3.3% 계산기', href: '/freelancer/' },
      { kind: '세금 계산기', label: '종합소득세 계산기', href: '/income-tax/' },
      { kind: '세금 가이드', label: '종합소득세 세율과 계산 방법', href: '/income-tax/' },
    ],
  };
}
