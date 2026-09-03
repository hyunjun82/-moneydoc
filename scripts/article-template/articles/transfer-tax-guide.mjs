/**
 * 글 스펙: 1주택 양도세
 *   숫자는 전부 엔진(transfer-tax, 1home 모드)이 만든다.
 *   비과세 요건·기한 문장은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('realestate/transfer-tax');
  const tt = (o) => calculators['transfer-tax']({ taxMode: '1home', expense: 0, adjustedArea: 'no', homeCount: 2, ...o }, spec);

  const FREE = tt({ salePrice: 1e9, acquisitionPrice: 5e8, holdingYears: 5, livedYears: 5 });
  const R = tt({ salePrice: 1.5e9, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 10 });
  const SALE = [1.3e9, 1.5e9, 1.8e9, 2e9].map((p) => ({ p, r: tt({ salePrice: p, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 10 }) }));
  const HOLD = [3, 5, 10].map((y) => ({ y, r: tt({ salePrice: 1.5e9, acquisitionPrice: 8e8, holdingYears: y, livedYears: y }) }));
  const LIVE2 = tt({ salePrice: 1.5e9, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 2 });
  const LIVE0 = tt({ salePrice: 1.5e9, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 0 });
  const MULTI = tt({ taxMode: 'multi', salePrice: 1.5e9, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 0 });
  const COST = tt({ salePrice: 1.5e9, acquisitionPrice: 8e8, expense: 3e7, holdingYears: 10, livedYears: 10 });

  const liveGap = derive(LIVE0.totalTax - R.totalTax);
  const multiGap = derive(MULTI.totalTax - R.totalTax);
  const costGap = derive(R.totalTax - COST.totalTax);
  const HOMETAX = 'https://www.hometax.go.kr';

  return {
    slug: 'transfer-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '양도소득세',
    title: '1주택 양도세 비과세 요건과 계산, 2년 보유부터 12억 초과분까지',
    description: `2년 이상 보유한 1주택을 12억원 이하로 팔면 양도세가 없어요. 15억원에 팔면 초과분에만 세금이 붙어 ${won(R.totalTax)}원이에요. 비과세 요건, 12억 초과분 계산, 장기보유특별공제, 신고 기한을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `소득세법 비과세 요건과 세율표 대조 · ${VERIFIED}`,
    calc: { href: '/realestate/transfer-tax/', label: '양도소득세 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '1주택 양도세 비과세', line2: '내 세금 얼마',
      sub1: '2년 이상 보유 + 12억원 이하 → 세금 0원',
      sub2: `15억에 팔면 초과분만 과세해 ${won(R.totalTax)}원`,
      foot: `소득세법 비과세 요건과 세율표 대조 · ${VERIFIED} 검증`,
      card: { label: '양도세', big: '0', unit: '원', l1: '10억에 판 1주택', l2: '보유 5년 · 거주 5년' },
      alt: `1주택 양도세 비과세 요건. 2년 이상 보유한 집을 12억원 이하로 팔면 세금이 없어요`,
    },
    intro: `집 한 채를 2년 이상 갖고 있다가 12억원 이하로 팔면 양도세를 내지 않아요. 5억원에 사서 10억원에 팔아 ${won(FREE.gain)}원을 벌어도 세금이 0원이에요. 12억원을 넘겨 팔면 그 넘는 부분에만 세금이 붙어요. 8억원에 사서 15억원에 팔았고 10년 살았다면 ${won(R.totalTax)}원이에요. 비과세 요건, 12억 초과분 계산, 장기보유특별공제, 신고 기한을 차례대로 정리했어요.`,
    answer: {
      label: '판 금액을 눌러서 양도세를 확인해 보세요 (8억에 사서 10년 보유·거주)',
      quick: [1.3e9, 1.5e9, 1.8e9].map((p) => {
        const r = tt({ salePrice: p, acquisitionPrice: 8e8, holdingYears: 10, livedYears: 10 });
        return { chip: `${man(p)}원`, selected: p === 1.5e9, big: `${won(r.totalTax)}원`, unit: '양도세', sub: `과세 대상 양도차익 ${won(r.taxableGain)}원 · 장기보유특별공제 ${(r.ltbcRate * 100).toFixed(0)}%` };
      }),
      boxes: [
        { title: '12억원까지는 세금이 없어요', text: '2년 이상 보유한 1주택이면 12억원 이하로 판 금액에는 양도세가 붙지 않아요' },
        { title: '오래 살수록 크게 깎여요', text: `10년 보유하고 10년 살면 80%를 빼 줘요. 거주가 없으면 세금이 ${won(liveGap)}원 늘어요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 1주택 양도세',
      rows: [
        ['비과세 기준', '1세대가 1주택을 2년 이상 보유하고 12억원 이하로 팔 때'],
        ['거주 요건', '취득할 때 조정대상지역이었던 집만 거주 2년이 더 필요해요'],
        ['12억 초과', '양도차익 전체가 아니라 12억을 넘는 비율만큼만 과세해요'],
        ['장기보유특별공제', '1주택은 보유와 거주를 각각 연 4%씩, 최대 80%까지 빼 줘요'],
        ['기본공제', '한 해에 250만원을 양도소득금액에서 빼 줘요'],
        ['15억에 팔면', `과세 대상 ${won(R.taxableGain)}원, 세금 ${won(R.totalTax)}원 (지방소득세 포함)`],
        ['단기 보유', '1년 미만은 70%, 1년 이상 2년 미만은 60%예요'],
        ['신고 기한', '판 달의 말일부터 2개월 안에 예정신고를 해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '1주택 양도세 비과세 요건이 뭔가요', sub: '2년 보유와 12억원이 기준이에요', blocks: [
        { type: 'p', lead: true, ans: '1세대가 집 한 채만 갖고 2년 이상 보유했다가 12억원 이하로 팔면 세금이 없어요.', text: `5억원에 사서 10억원에 팔아 ${won(FREE.gain)}원을 벌었어도 세금이 0원이에요. 다만 살 때 조정대상지역이었던 집은 2년 이상 실제로 살아야 비과세를 받아요.` },
        { type: 'table', text: true, caption: '1주택 양도세 비과세 요건', headers: ['항목', '조건'], rows: [
          { cells: ['세대 기준', '가족을 묶은 1세대가 국내에 주택 한 채만 갖고 있어야 해요'] },
          { cells: ['보유 기간', '판 날 기준으로 2년 이상 보유해야 해요'] },
          { cells: ['거주 기간', '살 때 조정대상지역이었던 집만 거주요건 2년이 붙어요'] },
          { cells: ['판 금액', '12억원 이하면 전액 비과세, 넘으면 초과분만 과세해요'] },
          { cells: ['일시적 2주택', '새 집을 산 날부터 3년 안에 옛 집을 팔면 1주택으로 봐요'] },
          { cells: ['상속과 혼인', '상속, 동거봉양, 혼인으로 2주택이 되면 따로 특례가 있어요'] },
        ], fn: '비과세 요건은 소득세법 제89조제1항제3호와 시행령 제154조제1항에 있어요. 일시적 2주택은 시행령 제155조제1항이에요.' },
        { type: 'note', title: '12억원은 양도차익이 아니라 판 금액이에요', text: '집을 판 실제 거래가액이 12억원을 넘는지로 판단해요. 얼마를 벌었는지가 아니라 얼마에 팔았는지가 기준이에요.' },
        { type: 'tips', items: [
          { title: '세대를 먼저 확인하세요', text: '주민등록상 함께 사는 배우자와 가족의 주택을 모두 세어요. 배우자는 따로 살아도 같은 세대로 봐요.' },
          { title: '분양권과 입주권도 세어요', text: '2021년 이후 산 분양권은 주택 수에 들어가요. 계약 시점을 확인해 두세요.' },
          { title: '팔기 전에 날짜를 확인하세요', text: '보유 2년을 며칠 앞두고 팔면 비과세를 통째로 놓쳐요. 잔금일을 조정하는 편이 나아요.' },
        ] },
      ] },

      { id: 's2', h2: '12억 초과분 양도세 계산, 어떻게 하나요', sub: '넘는 비율만큼만 과세해요', blocks: [
        { type: 'p', lead: true, ans: `8억원에 사서 15억원에 팔면 양도차익 ${won(R.gain)}원 중 ${won(R.taxableGain)}원만 과세 대상이에요.`, text: `판 금액에서 12억원이 차지하는 비율만큼을 빼기 때문이에요. 여기에 장기보유특별공제 ${(R.ltbcRate * 100).toFixed(0)}%와 기본공제 250만원을 빼면 과세표준 ${won(R.taxableBase)}원이 되고, 세금은 ${won(R.totalTax)}원이에요.` },
        { type: 'flow', label: '1주택 양도세 계산 순서', steps: [
          { label: '양도차익', value: `${won(R.gain)}원`, sub: '판 값 15억 − 산 값 8억', op: '→' },
          { label: '과세 대상', value: `${won(R.taxableGain)}원`, sub: '12억 초과 비율만큼', op: '−' },
          { label: '장기보유공제', value: `${(R.ltbcRate * 100).toFixed(0)}%`, sub: `${won(R.incomeAmount)}원 남아요`, op: '=' },
          { label: '양도세', value: `${won(R.totalTax)}원`, sub: `기본공제 250만원 차감 후` },
        ] },
        { type: 'table', id: 'saleTbl', compact: true, x: [1], net: 4, caption: '판 금액별 1주택 양도세 (8억에 사서 10년 보유·거주)', headers: ['판 금액', '양도차익', '과세 대상', '과세표준', '양도세'],
          rows: SALE.map(({ p, r }) => ({ hi: p === 1.5e9, cells: [`${man(p)}원`, won(r.gain), won(r.taxableGain), won(r.taxableBase), won(r.totalTax)] })),
          moreLabel: '양도차익까지 보기',
          fn: '단위: 원. 지방소득세를 포함한 금액이에요. 필요경비를 넣지 않은 값이라 실제 세금은 더 적을 수 있어요.' },
        { type: 'widget', label: '내 양도세 계산', title: '내 조건으로 바로 보기', note: '판 금액과 산 금액, 보유 연수와 거주 연수를 넣으면 세금이 바로 나와요. 1세대 1주택이고 취득 당시 조정대상지역이 아니었던 경우를 기준으로 계산해요.',
          inputs: [
            { id: 'ts', label: '판 금액 (억원)', type: 'number', value: 15, min: 0.5, max: 100, step: 0.5 },
            { id: 'ta', label: '산 금액 (억원)', type: 'number', value: 8, min: 0, max: 100, step: 0.5 },
            { id: 'th', label: '보유 연수', type: 'number', value: 10, min: 0, max: 40, step: 1 },
            { id: 'tl', label: '거주 연수', type: 'number', value: 10, min: 0, max: 40, step: 1 },
          ],
          outputs: [{ id: 'tgain', label: '양도차익' }, { id: 'ttarget', label: '과세 대상' }, { id: 'tltbc', label: '장기보유공제' }, { id: 'ttot', label: '양도세' }],
          port: `
  var TBR = ${JSON.stringify(spec.tables.incomeTaxBrackets.brackets.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  function trtax(sale, acq, hold, lived){
    var gain = sale - acq;
    var meets = hold >= 2;
    if (meets && sale <= ${spec.constants.NON_TAXABLE_LIMIT}) return { gain: gain, target: 0, ltbc: 0, base: 0, total: 0 };
    var target = meets && sale > ${spec.constants.NON_TAXABLE_LIMIT} ? Math.round(gain * (sale - ${spec.constants.NON_TAXABLE_LIMIT}) / sale) : gain;
    var ltbc = 0;
    if (hold >= 2 && lived >= 2) ltbc = Math.min(Math.min(Math.min(hold, 10) * 0.04, 0.40) + Math.min(Math.min(lived, 10) * 0.04, 0.40), 0.80);
    else if (hold >= 3) ltbc = Math.min(0.06 + (hold - 3) * 0.02, 0.30);
    var income = Math.round(target * (1 - ltbc));
    var base = Math.max(0, income - ${spec.constants.BASIC_DEDUCTION});
    var tax = 0;
    if (hold < 1) tax = Math.round(base * ${spec.constants.SHORT_TERM_UNDER_1Y_RATE});
    else if (hold < 2) tax = Math.round(base * ${spec.constants.SHORT_TERM_1Y_TO_2Y_RATE});
    else { for (var i = 0; i < TBR.length; i++) { if (TBR[i][0] === null || base <= TBR[i][0]) { tax = Math.round(base * TBR[i][1] - TBR[i][2]); break; } } }
    tax = Math.max(0, tax);
    var local = Math.round(tax * ${spec.constants.LOCAL_TAX_RATE});
    return { gain: gain, target: target, ltbc: +ltbc.toFixed(4), base: base, total: tax + local };
  }`,
          js: `
  function trrender(){ var s=(+document.getElementById('ts').value||0)*1e8, a=(+document.getElementById('ta').value||0)*1e8, h=+document.getElementById('th').value||0, l=+document.getElementById('tl').value||0; var r=trtax(s,a,h,l);
    document.getElementById('tgain').textContent=won(r.gain)+'원'; document.getElementById('ttarget').textContent=won(r.target)+'원'; document.getElementById('tltbc').textContent=(r.ltbc*100).toFixed(0)+'%'; document.getElementById('ttot').textContent=won(r.total)+'원'; }
  ['ts','ta','th','tl'].forEach(function(id){document.getElementById(id).addEventListener('input',trrender)}); trrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let s = 5; s <= 30; s += 1) for (const a of [2, 5, 8, 12]) for (const h of [0, 1, 3, 5, 10, 15]) for (const l of [0, 2, 5, 10]) {
              if (a > s) continue;
              n++;
              const e = tt({ salePrice: s * 1e8, acquisitionPrice: a * 1e8, holdingYears: h, livedYears: l });
              const q = port.trtax(s * 1e8, a * 1e8, h, l);
              if (q.total !== e.totalTax || q.target !== (e.isNonTaxable ? 0 : e.taxableGain) || q.gain !== e.gain) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '장기보유특별공제는 얼마나 빼 주나요', sub: '보유와 거주를 각각 연 4%씩', blocks: [
        { type: 'p', lead: true, ans: '1주택은 보유 연 4%와 거주 연 4%를 더해 최대 80%까지 빼 줘요.', text: `보유 3년 이상이고 거주 2년 이상이어야 이 우대 공제를 받아요. 조건을 못 채우면 보유 3년에 6%부터 시작해 매년 2%씩 늘어나는 일반 공제만 받아요. 그래서 같은 집인데 거주가 없으면 세금이 ${won(liveGap)}원 더 나와요.` },
        { type: 'table', net: 3, caption: '보유·거주 기간에 따른 공제율과 양도세 (8억에 사서 15억에 판 경우)', headers: ['보유·거주', '공제율', '양도소득금액', '양도세'],
          rows: [
            ...HOLD.map(({ y, r }) => ({ hi: y === 10, cells: [`보유 ${y}년 · 거주 ${y}년`, `${(r.ltbcRate * 100).toFixed(0)}%`, `${won(r.incomeAmount)}원`, `${won(r.totalTax)}원`] })),
            { cells: ['보유 10년 · 거주 2년', `${(LIVE2.ltbcRate * 100).toFixed(0)}%`, `${won(LIVE2.incomeAmount)}원`, `${won(LIVE2.totalTax)}원`] },
            { cells: ['보유 10년 · 거주 없음', `${(LIVE0.ltbcRate * 100).toFixed(0)}%`, `${won(LIVE0.incomeAmount)}원`, `${won(LIVE0.totalTax)}원`] },
          ],
          fn: '1주택 우대 공제는 보유 3년 이상과 거주 2년 이상을 함께 채워야 해요. 못 채우면 일반 공제만 적용돼요.' },
        { type: 'note', title: '공제는 과세 대상 금액에만 적용돼요', text: '12억원까지 비과세된 부분에는 공제가 필요 없어요. 12억을 넘는 비율만큼 남은 금액에서 공제율만큼 빼요.' },
      ] },

      { id: 's4', h2: '2년 안에 팔면 세율이 얼마인가요', sub: '1년 미만 70%, 2년 미만 60%', blocks: [
        { type: 'p', lead: true, ans: '보유 1년 미만이면 70%, 1년 이상 2년 미만이면 60%예요.', text: '2년을 채우면 6%부터 45%까지의 기본 누진세율을 써요. 짧게 사고파는 거래를 막기 위한 세율이라 부담이 아주 커요. 2년을 채우지 못하면 비과세도 받을 수 없어요.' },
        { type: 'table', text: true, caption: '보유 기간에 따른 주택 양도세율', headers: ['보유 기간', '세율'], rows: [
          { cells: ['1년 미만', '과세표준의 70%'] },
          { cells: ['1년 이상 2년 미만', '과세표준의 60%'] },
          { cells: ['2년 이상', '6%부터 45%까지 누진세율'] },
          { cells: ['분양권', '보유 기간과 관계없이 높은 세율이 적용돼요'] },
        ], fn: '주택과 조합원입주권, 분양권의 단기 보유 세율은 소득세법 제104조제1항에 있어요.' },
        { type: 'p', ans: `다주택자는 비과세도 우대 공제도 받지 못해요.`, text: `같은 집을 다주택 상태로 팔면 세금이 ${won(MULTI.totalTax)}원이라 1주택일 때보다 ${won(multiGap)}원 많아요. 조정대상지역 주택이면 여기에 중과 세율이 더 붙을 수 있어요.` },
      ] },

      { id: 's5', h2: '양도세 언제까지 신고하나요', sub: '판 달의 말일부터 2개월', blocks: [
        { type: 'p', lead: true, ans: '잔금을 받은 달의 말일부터 2개월 안에 예정신고를 해야 해요.', text: '비과세라서 낼 세금이 0원이어도 신고는 하는 편이 안전해요. 한 해에 두 건 이상 팔았다면 다음 해 5월에 합쳐서 확정신고를 해야 해요.' },
        { type: 'steps', items: [
          { title: '증빙 모으기', text: '매매계약서, 취득세 영수증, 중개보수 영수증, 인테리어 세금계산서를 모아요', meta: '잔금 직후' },
          { title: '세액 미리 계산', text: '판 금액과 산 금액, 보유와 거주 기간을 넣어 세금을 확인해요', meta: '5분', link: { label: '양도소득세 계산기', href: '/realestate/transfer-tax/' } },
          { title: '홈택스 예정신고', text: '양도소득세 신고 메뉴에서 신고서를 제출하고 세금을 내요', meta: '판 달 말일부터 2개월', link: { label: '홈택스 바로가기', href: HOMETAX } },
          { title: '지방소득세 납부', text: '산출된 세금의 10%를 위택스에서 따로 내요', meta: '같은 기한' },
        ] },
        { type: 'tips', items: [
          { title: '필요경비 영수증을 꼭 챙기세요', text: `취득세, 중개보수, 확장 공사비는 경비로 인정돼요. 3,000만원을 넣으면 세금이 ${won(costGap)}원 줄어요.` },
          { title: '도배와 장판은 경비가 아니에요', text: '집의 가치를 올리는 자본적 지출만 인정돼요. 단순 수리비는 빼 주지 않아요.' },
          { title: '두 건 이상이면 5월 확정신고', text: '같은 해에 부동산을 두 번 이상 팔았다면 합산해서 다시 계산해요. 세율 구간이 올라갈 수 있어요.' },
        ] },
      ] },
    ],
    faq: [
      ['1주택 양도세 비과세 요건이 뭔가요?', '1세대가 주택 한 채를 2년 이상 보유하고 12억원 이하로 팔면 돼요. 살 때 조정대상지역이었던 집은 2년 이상 거주도 필요해요.'],
      ['12억 초과 양도세는 어떻게 계산하나요?', `양도차익 전체가 아니라 12억원을 넘는 비율만큼만 과세해요. 8억에 사서 15억에 팔면 과세 대상은 ${won(R.taxableGain)}원이에요.`],
      ['양도세 계산에서 장기보유특별공제는 얼마인가요?', '1주택은 보유 연 4%와 거주 연 4%를 더해 최대 80%까지 빼 줘요. 보유 3년과 거주 2년을 함께 채워야 해요.'],
      ['2년 보유를 못 채우고 팔면 어떻게 되나요?', '비과세를 받지 못하고 1년 미만은 70%, 1년 이상 2년 미만은 60%의 세율이 붙어요.'],
      ['일시적 2주택도 비과세가 되나요?', '새 집을 산 날부터 3년 안에 옛 집을 팔면 1주택으로 봐서 비과세가 돼요. 옛 집은 산 지 1년이 지난 뒤에 새 집을 사야 해요.'],
      ['양도세 신고 기한이 언제인가요?', '판 달의 말일부터 2개월 안에 예정신고를 해요. 같은 해에 두 건 이상 팔았다면 다음 해 5월에 확정신고를 해요.'],
      ['양도세 필요경비로 뭘 넣을 수 있나요?', `취득세, 중개보수, 확장이나 새시 같은 자본적 지출이 들어가요. 3,000만원을 넣으면 세금이 ${won(costGap)}원 줄어요.`],
    ],
    summary: [
      '1세대 1주택을 2년 이상 보유하고 12억원 이하로 팔면 양도세가 없어요.',
      `12억을 넘으면 넘는 비율만큼만 과세해요. 8억에 사서 15억에 팔면 ${won(R.totalTax)}원이에요.`,
      '1주택 장기보유특별공제는 보유와 거주를 각각 연 4%씩 더해 최대 80%예요.',
      '판 달의 말일부터 2개월 안에 예정신고를 해요. 지방소득세는 위택스에서 따로 내요.',
    ],
    sources: [
      ['법령', '소득세법 제89조(비과세 양도소득, 12억원 초과 고가주택 제외), 제95조(장기보유 특별공제), 제103조(양도소득 기본공제 연 250만원), 제104조(양도소득세의 세율), 제105조(예정신고, 양도일이 속하는 달의 말일부터 2개월). 소득세법 시행령 제154조(1세대1주택의 범위, 보유 2년과 조정대상지역 거주 2년), 제155조(일시적 2주택 3년), 제159조의3(1주택 장기보유특별공제), 제160조(고가주택 양도차익 안분).'],
      ['정부 도구', `홈택스 양도소득세 신고 화면의 세율표와 이 글의 계산이 같은 값이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '실지거래가액의 합계액이 12억원을 초과하는 고가주택은 제외한다', note: '12억원 초과는 비과세 제외 (소득세법 제89조①3)' },
      { src: 1, quote: '양도소득금액에서 각각 연 250만원을 공제한다', note: '양도소득 기본공제 250만원 (제103조①)' },
      { src: 1, quote: '그 양도일이 속하는 달의 말일부터 2개월', note: '예정신고 기한 (제105조①1)' },
      { src: 2, quote: '해당 주택의 보유기간이 2년(제8항제2호에 해당하는 거주자의 주택인 경우는 3년) 이상인 것', note: '보유 2년 요건 (시행령 제154조①)' },
      { src: 2, quote: '조정대상지역(이하 “조정대상지역”이라 한다)에 있는 주택의 경우에는 해당 주택의 보유기간이 2년(제8항제2호에 해당하는 거주자의 주택인 경우에는 3년) 이상이고 그 보유기간 중 거주기간이 2년 이상인 것', note: '조정대상지역 취득 시 거주 2년 (제154조①)' },
      { src: 2, quote: '신규 주택을 취득한 날부터 3년 이내에 종전의 주택을 양도하는 경우', note: '일시적 2주택 3년 (제155조①)' },
      { src: 2, quote: '고가주택에 해당하는 자산에 적용할 양도차익', note: '12억 초과분 안분 계산 (제160조①)' },
    ],
    related: [
      { kind: '계산기', label: '양도소득세 계산기', href: '/realestate/transfer-tax/' },
      { kind: '부동산 계산기', label: '취득세 계산기', href: '/realestate/acquisition-tax/' },
      { kind: '부동산 가이드', label: '집 살 때 취득세 세율과 계산', href: '/realestate/acquisition-tax-guide/' },
    ],
  };
}
