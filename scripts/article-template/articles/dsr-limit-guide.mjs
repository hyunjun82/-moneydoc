/**
 * 글 스펙: 스트레스 DSR
 *   한도와 적용 금리는 전부 엔진(dsr-limit)이 만든다.
 *   DSR 규제 근거는 은행업감독규정 원문을 claims 로 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('loan/dsr-limit');
  const ds = (o) => calculators['dsr-limit']({ annualIncome: 5e7, monthlyExistingDebt: 0, loanYears: 30, loanRate: 0.04, dsrLimit: 0.4, stressDSR: '3단계', ...o }, spec);
  const C = spec.constants;

  const R = ds({});                                        // 대표: 연소득 5천만, 30년, 4%, DSR 40%, 3단계
  const NONE = ds({ stressDSR: '미적용' });
  const STAGES = ['미적용', '1단계', '2단계', '3단계'].map((s) => ({ s, r: ds({ stressDSR: s }) }));
  const INCOMES = [3e7, 4e7, 5e7, 7e7, 1e8].map((v) => ({ v, r: ds({ annualIncome: v }) }));
  const YEARS = [10, 20, 30, 40].map((y) => ({ y, r: ds({ loanYears: y }) }));
  const DEBT = ds({ monthlyExistingDebt: 5e5 });
  const NONBANK = ds({ dsrLimit: 0.5 });

  const stressGap = derive(NONE.maxLoan - R.maxLoan);
  const debtGap = derive(R.maxLoan - DEBT.maxLoan);
  const stress1 = derive(Math.round((STAGES[1].r.appliedRate - NONE.appliedRate) * 1e6) / 1e6);
  const stress2 = derive(Math.round((STAGES[2].r.appliedRate - NONE.appliedRate) * 1e6) / 1e6);
  const stress3 = derive(Math.round((STAGES[3].r.appliedRate - NONE.appliedRate) * 1e6) / 1e6);
  const pctOf = (v) => derive(Math.round(v * 1000) / 10);
  const FSS = 'https://www.fss.or.kr';

  return {
    slug: 'dsr-limit-guide', cat: 'loan', catLabel: '대출', crumb: '스트레스 DSR',
    title: '스트레스 DSR 계산과 대출 한도, 3단계 적용부터 주담대 한도까지',
    description: `연소득 5,000만원이면 30년 원리금균등 기준 대출 한도가 ${won(R.maxLoan)}원이에요. 스트레스 금리 1.5%가 붙어 ${won(stressGap)}원이 줄어든 금액이에요. DSR 계산법, 단계별 가산금리, 소득과 기간별 한도표를 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `은행업감독규정 DSR 규제와 스트레스 금리 반영 · ${VERIFIED}`,
    calc: { href: '/loan/dsr-limit/', label: 'DSR 대출 한도 계산기 바로가기' },
    hero: {
      tag: '대출', line1: '스트레스 DSR과 대출 한도', line2: '얼마까지 되나요',
      sub1: `연소득 5,000만원 · 30년 · 금리 4% → ${won(R.maxLoan)}원`,
      sub2: `스트레스 금리 1.5%가 붙어 ${won(stressGap)}원이 줄었어요`,
      foot: `은행업감독규정 DSR 규제와 스트레스 금리 반영 · ${VERIFIED} 검증`,
      card: { label: '대출 한도', big: won(R.maxLoan), unit: '원', l1: '연소득 5,000만원', l2: 'DSR 40% · 3단계 적용' },
      alt: `스트레스 DSR 대출 한도. 연소득 5,000만원이면 ${won(R.maxLoan)}원`,
    },
    intro: `대출 한도는 집값보다 내 소득이 먼저 정해요. 한 해 갚는 원리금이 연소득의 일정 비율을 넘지 못하게 막는 규제가 총부채원리금상환비율이고, 줄여서 디에스알이라고 불러요. 여기에 금리가 오를 상황을 미리 반영하는 스트레스 금리까지 더해요. 연소득 5,000만원이 30년 만기로 빌린다면 한도는 ${won(R.maxLoan)}원이에요. 계산 순서, 단계별 가산금리, 소득과 기간에 따른 한도, 한도를 늘리는 방법을 정리했어요.`,
    answer: {
      label: '연소득을 눌러 대출 한도를 확인해 보세요 (30년 · 금리 4% · 3단계 기준)',
      quick: [4e7, 5e7, 7e7].map((v) => {
        const r = ds({ annualIncome: v });
        return { chip: `${man(v)}원`, selected: v === 5e7, big: `${won(r.maxLoan)}원`, unit: '대출 한도', sub: `月 상환 여력 ${won(r.monthlyAvailable)}원` };
      }),
      boxes: [
        { title: '연소득의 40%가 기준이에요', text: '1년에 갚는 원리금이 연소득의 40%를 넘지 못해요. 2금융권은 50%예요' },
        { title: '실제 금리보다 높게 계산해요', text: `금리 4%로 빌려도 3단계는 5.5%로 계산해 한도가 ${won(stressGap)}원 줄어요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 스트레스 DSR',
      rows: [
        ['DSR이란', '1년에 갚는 모든 대출 원리금을 연소득으로 나눈 비율'],
        ['한도 기준', '1금융권 40%, 2금융권 50%'],
        ['스트레스 금리', '금리가 오를 상황을 대비해 실제 금리에 더하는 가산금리'],
        ['3단계 가산', `${pctOf(stress3)}%포인트. 금리 4%면 ${pctOf(R.appliedRate)}%로 계산해요`],
        ['연소득 5천만이면', `월 상환 여력 ${won(R.monthlyAvailable)}원, 한도 ${won(R.maxLoan)}원`],
        ['기존 대출이 있으면', `월 50만원을 갚고 있으면 한도가 ${won(debtGap)}원 줄어요`],
        ['기간을 늘리면', `40년으로 늘리면 ${won(YEARS[3].r.maxLoan)}원까지 늘어요`],
        ['2금융권', `같은 조건에서 ${won(NONBANK.maxLoan)}원까지 가능해요`],
      ],
    },
    sections: [
      { id: 's1', h2: 'DSR 계산, 총부채원리금상환비율은 어떻게 구하나요', sub: '연간 원리금을 연소득으로 나눠요', blocks: [
        { type: 'p', lead: true, ans: `연소득 5,000만원이면 한 달에 갚을 수 있는 원리금이 ${won(R.monthlyAvailable)}원이에요.`, text: `연소득에 한도 비율 40%를 곱하고 12로 나눈 금액이에요. 기존에 갚고 있는 대출이 있으면 그만큼 빼요. 이 상환 여력을 금리와 기간으로 되돌려 계산하면 빌릴 수 있는 원금이 나와요.` },
        { type: 'flow', label: 'DSR 한도가 정해지는 순서', steps: [
          { label: '연소득', value: `${man(5e7)}원`, sub: '세전 총소득', op: '×' },
          { label: 'DSR 한도', value: '40%', sub: '1금융권 기준', op: '÷' },
          { label: '12개월', value: `${won(R.monthlyAvailable)}원`, sub: '월 상환 여력', op: '→' },
          { label: '대출 한도', value: `${won(R.maxLoan)}원`, sub: `${pctOf(R.appliedRate)}% · 30년 기준` },
        ] },
        { type: 'table', text: true, caption: 'DSR을 계산할 때 들어가는 항목', headers: ['구분', '반영 방식'], rows: [
          { cells: ['주택담보대출', '원금과 이자를 모두 넣어요'] },
          { cells: ['신용대출', '정해진 기간으로 나눠 원리금을 계산해 넣어요'] },
          { cells: ['마이너스 통장', '한도 금액을 기준으로 계산해 넣어요. 안 써도 잡혀요'] },
          { cells: ['자동차 할부와 카드론', '원리금이 그대로 들어가요'] },
          { cells: ['전세자금대출', '이자만 반영하는 경우가 많아요'] },
          { cells: ['서민금융과 소액대출', 'DSR 규제 예외로 빠지는 대출이 정책 목적에 따라 정해져 있어요'] },
        ], fn: 'DSR 산정의 세부 기준은 은행업감독규정 별표에서 정하고, 구체적인 판단 기준은 금융감독원장이 정해요.' },
        { type: 'note', title: '마이너스 통장은 안 써도 잡혀요', text: '쓰지 않은 마이너스 통장도 한도 전체가 빚으로 계산돼요. 주택담보대출을 받기 전에 정리하면 한도가 늘어나요.' },
      ] },

      { id: 's2', h2: '스트레스 금리는 얼마나 붙나요', sub: '단계가 올라갈수록 한도가 줄어요', blocks: [
        { type: 'p', lead: true, ans: `3단계는 실제 금리에 ${pctOf(stress3)}%포인트를 더해 계산해요.`, text: `금리 4%로 빌려도 심사는 ${pctOf(R.appliedRate)}% 기준이라 한도가 줄어요. 앞으로 금리가 올라도 갚을 수 있는지 미리 확인하려는 장치예요. 실제로 내는 이자가 늘어나는 것은 아니에요.` },
        { type: 'table', net: 2, caption: '스트레스 단계별 적용 금리와 한도 (연소득 5,000만원, 30년, 금리 4%)', headers: ['단계', '가산금리', '적용 금리', '대출 한도'],
          rows: STAGES.map(({ s, r }) => ({ hi: s === '3단계', cells: [s, s === '미적용' ? '없음' : `${pctOf(r.appliedRate - NONE.appliedRate)}%포인트`, `${pctOf(r.appliedRate)}%`, `${won(r.maxLoan)}원`] })),
          fn: `단계는 금융당국이 정한 시행 일정에 따라 올라갔어요. 3단계는 ${pctOf(C.STRESS_3RD)}%포인트를 더해 계산해요.` },
        { type: 'p', ans: `스트레스 금리 때문에 한도가 ${won(stressGap)}원 줄어요.`, text: `같은 조건에서 스트레스를 적용하지 않으면 ${won(NONE.maxLoan)}원인데, 3단계를 적용하면 ${won(R.maxLoan)}원이에요. 소득이 같아도 빌릴 수 있는 돈이 줄어든 이유가 여기에 있어요.` },
        { type: 'tips', items: [
          { title: '고정금리면 부담이 적어요', text: '금리 변동 위험이 작은 상품일수록 스트레스 금리를 낮게 적용해요. 상품 구조에 따라 한도가 달라져요.' },
          { title: '지역과 대출 종류로도 갈려요', text: '주택담보대출과 신용대출, 수도권과 지방에 적용되는 비율이 다를 수 있어요.' },
          { title: '은행마다 조금씩 달라요', text: '감독 규정 안에서 은행이 자체 기준을 더 두기도 해요. 두세 곳을 비교해 보세요.' },
        ] },
      ] },

      { id: 's3', h2: '내 연소득이면 대출 한도가 얼마인가요', sub: '소득과 기간이 한도를 정해요', blocks: [
        { type: 'p', lead: true, ans: `연소득 3,000만원이면 ${won(INCOMES[0].r.maxLoan)}원, 1억원이면 ${won(INCOMES[4].r.maxLoan)}원이에요.`, text: '소득에 비례해 한도가 늘어나요. 기간을 늘리면 매달 갚는 금액이 줄어 한도가 커지지만, 총 이자는 늘어나요.' },
        { type: 'table', id: 'incTbl3', compact: true, x: [1], net: 2, caption: '연소득별 대출 한도 (30년, 금리 4%, 3단계, DSR 40%)', headers: ['연소득', '월 상환 여력', '대출 한도'],
          rows: INCOMES.map(({ v, r }) => ({ hi: v === 5e7, cells: [`${man(v)}원`, won(r.monthlyAvailable), won(r.maxLoan)] })),
          moreLabel: '월 상환 여력까지 보기',
          fn: '단위: 원. 기존 대출이 없다고 가정한 금액이에요. 담보인정비율 한도에 걸리면 더 줄어들 수 있어요.' },
        { type: 'table', net: 1, caption: '대출 기간에 따른 한도 (연소득 5,000만원, 금리 4%, 3단계)', headers: ['대출 기간', '대출 한도'],
          rows: YEARS.map(({ y, r }) => ({ hi: y === 30, cells: [`${y}년`, `${won(r.maxLoan)}원`] })),
          fn: '기간이 길수록 한도가 늘지만 총 이자도 함께 늘어요. 만기까지 상환 계획을 함께 보세요.' },
        { type: 'widget', label: '내 대출 한도 계산', title: '내 소득으로 바로 보기', note: '연소득과 기존 대출 상환액, 기간과 금리를 넣으면 한도가 바로 나와요. 담보 가치에 따른 한도는 따로 확인해야 해요.',
          inputs: [
            { id: 'di', label: '연소득 (만원)', type: 'number', value: 5000, min: 1000, max: 50000, step: 100 },
            { id: 'dd', label: '기존 대출 월 상환액 (만원)', type: 'number', value: 0, min: 0, max: 1000, step: 5 },
            { id: 'dy', label: '대출 기간 (년)', type: 'number', value: 30, min: 1, max: 50, step: 1 },
            { id: 'dr', label: '금리 (%)', type: 'number', value: 4, min: 1, max: 15, step: 0.1 },
          ],
          outputs: [{ id: 'drate', label: '적용 금리' }, { id: 'dmon', label: '월 상환 여력' }, { id: 'dmax', label: '대출 한도' }, { id: 'dgap', label: '스트레스로 줄어든 금액' }],
          port: `
  function dsrLimit(income, debt, years, rate, stress){
    var applied = rate + stress;
    var avail = Math.round(income * ${C.DSR_BANK} / 12 - debt);
    if (avail <= 0) return { applied: applied, avail: 0, max: 0 };
    var r = applied / 12, n = years * 12, pow = Math.pow(1 + r, n);
    var factor = r > 0 ? (pow - 1) / (r * pow) : n;
    return { applied: applied, avail: avail, max: Math.round(avail * factor) };
  }`,
          js: `
  function drender(){ var inc=(+document.getElementById('di').value||0)*1e4, d=(+document.getElementById('dd').value||0)*1e4, y=+document.getElementById('dy').value||1, rate=(+document.getElementById('dr').value||0)/100;
    var a=dsrLimit(inc,d,y,rate,${C.STRESS_3RD}), b=dsrLimit(inc,d,y,rate,0);
    document.getElementById('drate').textContent=(a.applied*100).toFixed(2)+'%'; document.getElementById('dmon').textContent=won(a.avail)+'원';
    document.getElementById('dmax').textContent=won(a.max)+'원'; document.getElementById('dgap').textContent=won(b.max-a.max)+'원'; }
  ['di','dd','dy','dr'].forEach(function(id){document.getElementById(id).addEventListener('input',drender)}); drender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let inc = 2000; inc <= 20000; inc += 500) for (const d of [0, 30, 100]) for (const y of [10, 20, 30, 40]) for (const rt of [0.03, 0.04, 0.05]) {
              n++;
              const e = ds({ annualIncome: inc * 1e4, monthlyExistingDebt: d * 1e4, loanYears: y, loanRate: rt });
              const q = port.dsrLimit(inc * 1e4, d * 1e4, y, rt, C.STRESS_3RD);
              if (q.max !== e.maxLoan || q.avail !== e.monthlyAvailable) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's4', h2: '기존 대출 DSR 포함, 한도가 얼마나 깎이나요', sub: '갚고 있는 원리금만큼 여력이 줄어요', blocks: [
        { type: 'p', lead: true, ans: `월 50만원을 갚고 있으면 한도가 ${won(debtGap)}원 줄어요.`, text: `연소득 5,000만원 기준으로 기존 대출이 없으면 ${won(R.maxLoan)}원인데, 월 50만원을 갚고 있으면 ${won(DEBT.maxLoan)}원이에요. 신용대출과 마이너스 통장을 먼저 정리하는 이유예요.` },
        { type: 'table', net: 2, caption: '기존 대출 상환액에 따른 한도 (연소득 5,000만원, 30년, 3단계)', headers: ['기존 월 상환액', '월 상환 여력', '대출 한도'],
          rows: [0, 3e5, 5e5, 1e6].map((d) => {
            const r = ds({ monthlyExistingDebt: d });
            return { hi: d === 5e5, cells: [d === 0 ? '없음' : `${man(d)}원`, `${won(r.monthlyAvailable)}원`, `${won(r.maxLoan)}원`] };
          }),
          fn: '기존 대출의 원리금이 그대로 상환 여력에서 빠져요. 마이너스 통장은 쓰지 않아도 한도 기준으로 잡혀요.' },
        { type: 'p', ans: `2금융권은 한도가 50%라 ${won(NONBANK.maxLoan)}원까지 가능해요.`, text: '대신 금리가 높아 매달 부담이 커져요. 총 이자까지 계산해 보고 결정하는 편이 좋아요.' },
      ] },

      { id: 's5', h2: 'DSR 줄이는 방법, 한도를 늘리려면 어떻게 하나요', sub: '소득을 늘리거나 빚을 줄여요', blocks: [
        { type: 'p', lead: true, ans: '기존 대출을 정리하고 소득 증빙을 넉넉히 준비하는 게 가장 확실해요.', text: '대출 기간을 늘리는 방법도 있지만 총 이자가 함께 늘어요. 상여금이나 임대소득처럼 빠뜨리기 쉬운 소득을 증빙에 넣으면 한도가 올라가요.' },
        { type: 'tips', items: [
          { title: '마이너스 통장을 줄이세요', text: '쓰지 않은 한도까지 빚으로 잡혀요. 한도를 낮추거나 해지하면 바로 여력이 생겨요.' },
          { title: '소득 증빙을 빠짐없이', text: '건강보험료 납부액이나 소득금액증명원으로 인정받는 소득이 늘어날 수 있어요.' },
          { title: '기간을 늘리는 건 마지막에', text: '한도는 늘지만 총 이자가 커져요. 40년으로 늘리면 매달 부담은 줄어도 갚는 총액은 늘어나요.' },
          { title: '부부 합산을 검토하세요', text: '공동명의로 함께 신청하면 두 사람의 소득을 합쳐 볼 수 있어요. 은행마다 기준이 달라요.' },
          { title: '규제 적용 시점을 확인하세요', text: '스트레스 단계는 시행 일정에 따라 바뀌어요. 계약 전에 어떤 기준이 적용되는지 확인하세요.' },
        ] },
        { type: 'table', text: true, caption: '한도를 늘리는 방법과 주의점', headers: ['방법', '효과와 주의점'], rows: [
          { cells: ['기존 대출 상환', '가장 즉각적이에요. 갚은 원리금만큼 여력이 바로 늘어요'] },
          { cells: ['마이너스 통장 해지', '쓰지 않아도 잡히는 한도가 사라져요'] },
          { cells: ['소득 증빙 보강', '인정 소득이 늘면 한도가 비례해서 늘어요'] },
          { cells: ['대출 기간 연장', '한도는 늘지만 총 이자가 커져요'] },
          { cells: ['2금융권 이용', '한도는 늘지만 금리가 높아 부담이 커져요'] },
          { cells: ['고정금리 상품 선택', '스트레스 금리를 낮게 적용받을 수 있어요'] },
        ], fn: '금융감독원은 대출 비교와 상담 정보를 제공해요. 은행별 기준이 다르니 여러 곳을 확인해 보세요.' },
      ] },
    ],
    faq: [
      ['DSR 계산은 어떻게 하나요?', `1년에 갚는 모든 대출 원리금을 연소득으로 나눠요. 연소득 5,000만원에 40%면 월 상환 여력이 <b>${won(R.monthlyAvailable)}원</b>이에요.`],
      ['스트레스 DSR 3단계는 얼마나 붙나요?', `실제 금리에 ${pctOf(stress3)}%포인트를 더해 계산해요. 금리 4%면 ${pctOf(R.appliedRate)}% 기준으로 심사해요.`],
      ['대출 한도가 얼마나 줄어드나요?', `연소득 5,000만원 기준으로 ${won(NONE.maxLoan)}원에서 ${won(R.maxLoan)}원으로 ${won(stressGap)}원 줄어요.`],
      ['주담대 한도는 어떻게 정해지나요?', 'DSR로 계산한 한도와 담보 가치로 계산한 한도 중 낮은 쪽이 실제 한도가 돼요. 지역과 주택 수에 따라 담보 비율이 달라요.'],
      ['마이너스 통장도 DSR에 들어가나요?', '들어가요. 쓰지 않아도 약정 한도를 기준으로 계산해요. 정리하면 한도가 늘어나요.'],
      ['2금융권은 한도가 더 나오나요?', `한도 비율이 50%라 같은 조건에서 ${won(NONBANK.maxLoan)}원까지 가능해요. 대신 금리가 높아 부담이 커져요.`],
      ['DSR 한도를 늘리는 방법이 있나요?', '기존 대출을 갚고 마이너스 통장을 정리하는 게 가장 빨라요. 소득 증빙을 보강하거나 기간을 늘리는 방법도 있어요.'],
    ],
    summary: [
      `DSR은 연간 원리금을 연소득으로 나눈 비율이에요. 1금융권 40%, 2금융권 50%가 기준이에요.`,
      `3단계 스트레스 금리는 ${pctOf(stress3)}%포인트예요. 금리 4%면 ${pctOf(R.appliedRate)}%로 심사해요.`,
      `연소득 5,000만원, 30년 기준 한도는 ${won(R.maxLoan)}원이에요. 스트레스로 ${won(stressGap)}원이 줄었어요.`,
      '기존 대출과 마이너스 통장을 정리하면 한도가 바로 늘어나요.',
    ],
    sources: [
      ['법령', '은행업감독규정 제29조의2(주택관련 담보대출 등에 대한 리스크관리, 담보인정비율·총부채상환비율·총부채원리금상환비율 준수와 별표 기준). 상호저축은행업감독규정 제39조의2(같은 취지의 2금융권 규제). 스트레스 금리는 금융당국이 정한 시행 방안에 따라 단계별로 적용돼요.'],
      ['정부 도구', `금융감독원이 안내하는 DSR 산정 방식과 이 글의 계산이 같은 구조예요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '은행은 주택관련 담보대출 취급시 법 제34조에 따라 경영의 건전성이 유지되도록 <별표6>에서 정하는 담보인정비율, 총부채상환비율, 총부채원리금상환비율', note: 'DSR 규제 근거 (은행업감독규정 제29조의2①)' },
      { src: 1, quote: '총부채원리금상환비율을 10퍼센트포인트 범위 이내에서 가감조정할 수 있다', note: '감독원장의 조정 권한 (제29조의2②)' },
      { src: 1, quote: '총부채원리금상환비율의 산정방법 및 적용대상의 세부판단기준', note: '산정 방법은 감독원장이 정함 (제29조의2③)' },
      { src: 2, quote: '상호저축은행은 주택관련 담보대출 취급시', note: '2금융권도 같은 구조로 규제 (상호저축은행업감독규정 제39조의2①)' },
      { src: 2, quote: '담보인정비율, 총부채상환비율 및 총부채원리금상환비율을 10퍼센트포인트 범위 이내에서 가감조정할 수 있다', note: '2금융권 조정 권한 (제39조의2②)' },
    ],
    related: [
      { kind: '계산기', label: 'DSR 대출 한도 계산기', href: '/loan/dsr-limit/' },
      { kind: '대출 계산기', label: '주택담보대출 계산기', href: '/loan/mortgage-loan-limit/' },
      { kind: '대출 계산기', label: '원리금균등 상환 계산기', href: '/loan/loan-amortization/' },
    ],
  };
}
