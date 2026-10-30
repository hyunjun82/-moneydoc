/**
 * 글 스펙: 취득세
 *   숫자는 전부 엔진(acquisition-tax: 위택스 미리계산과 0원 일치)이 만든다.
 *   생애최초 감면은 지방세특례제한법 원문을 claims 로 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('realestate/acquisition-tax');
  const acq = (price, houseCountAfter = 1, adjustedArea = false, areaSize = 84) =>
    calculators['acquisition-tax']({ price, houseCountAfter, adjustedArea, areaSize }, spec);

  const R = acq(5e8);                                   // 대표: 5억, 무주택자가 사는 첫 집, 전용 84㎡
  const PRICE = [3e8, 5e8, 6e8, 7e8, 8e8, 9e8, 1e9, 1.2e9].map((p) => ({ p, r: acq(p) }));
  const QUICK = [3e8, 5e8, 8e8].map((p) => ({ p, r: acq(p) }));
  const BIG = acq(6e8, 1, false, 100);                  // 6억, 전용 100㎡ (농특세 붙는 경우)
  const SMALL = acq(6e8);
  const HEAVY = [
    { label: '조정대상지역 2주택', r: acq(6e8, 2, true) },
    { label: '비조정지역 3주택', r: acq(6e8, 3, false) },
    { label: '조정대상지역 3주택', r: acq(6e8, 3, true) },
    { label: '비조정지역 2주택', r: acq(6e8, 2, false) },
  ];
  const FIRST_DEDUCT = 2000000;                          // 생애최초 일반 주택 공제 한도 (지특법 §36의3①2)
  const FIRST = [3e8, 4e8, 5e8].map((p) => {
    const r = acq(p);
    return { p, r, after: derive(Math.max(0, r.acquisitionTax - FIRST_DEDUCT)) };
  });
  const ruralGap = derive(BIG.totalTax - SMALL.totalTax);
  const heavyGap = derive(HEAVY[0].r.totalTax - SMALL.totalTax);
  const EDU_HEAVY = derive(HEAVY[0].r.educationTax / 6e8);           // 중과 주택 지방교육세율 (지방세법 §151①1나: (4% − 2%) × 20%)
  const pctOf = (x) => `${Math.round(x * 10000) / 100}%`;
  const WETAX = 'https://www.wetax.go.kr';

  return {
    slug: 'acquisition-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '취득세',
    title: '집 살 때 취득세 세율과 계산, 생애최초 감면부터 다주택 중과까지',
    description: `5억원짜리 집을 처음 사면 취득세는 지방교육세까지 ${won(R.totalTax)}원이에요. 6억과 9억을 기준으로 갈리는 세율, 집값별 세금표, 생애최초 200만원 공제, 8%와 12% 중과 기준, 60일 신고 기한을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `위택스 지방세 미리계산과 1원 단위 일치 · ${VERIFIED}`,
    calc: { href: '/acquisition-tax/calculator/', label: '취득세 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '집 살 때 취득세', line2: '얼마 내나요',
      sub1: `5억 · 전용 84㎡ · 첫 집 → ${won(R.totalTax)}원`,
      sub2: `취득세 ${won(R.acquisitionTax)}원 + 지방교육세 ${won(R.educationTax)}원`,
      foot: `위택스 지방세 미리계산과 1원 단위 일치 · ${VERIFIED} 검증`,
      card: { label: '취득세 합계', big: won(R.totalTax), unit: '원', l1: '집값 5억원', l2: '무주택자가 사는 첫 집' },
      alt: `집 살 때 취득세 계산. 5억원짜리 집을 처음 사면 ${won(R.totalTax)}원`,
    },
    intro: `집을 사면 잔금을 치른 뒤 60일 안에 취득세를 내야 해요. 세율은 집값 6억원과 9억원에서 갈리고, 이미 집이 있으면 지역에 따라 8%나 12%로 뛰어요. 5억원짜리 집을 무주택 상태에서 처음 사면 취득세 ${won(R.acquisitionTax)}원에 지방교육세 ${won(R.educationTax)}원을 더해 ${won(R.totalTax)}원이에요. 여기에 전용면적이 85㎡를 넘으면 농어촌특별세가 붙어요. 세율 구조, 집값별 금액, 생애최초 감면, 중과 기준을 차례대로 정리했어요.`,
    answer: {
      label: '집값을 눌러서 취득세를 확인해 보세요 (첫 집, 전용 84㎡ 기준)',
      quick: QUICK.map(({ p, r }) => ({ chip: `${man(p)}원`, selected: p === 5e8, big: `${won(r.totalTax)}원`, unit: '취득세 합계', sub: `취득세 ${won(r.acquisitionTax)}원 + 지방교육세 ${won(r.educationTax)}원` })),
      boxes: [
        { title: '6억까지는 1%예요', text: '6억원을 넘으면 9억원까지 세율이 조금씩 올라가고, 9억원을 넘으면 3%가 돼요' },
        { title: '전용 85㎡ 이하면 농특세가 없어요', text: `같은 6억원이어도 전용 100㎡면 ${won(ruralGap)}원을 더 내요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 취득세',
      rows: [
        ['기본 세율', '6억원 이하 1%, 6억 초과 9억 이하는 구간 계산, 9억 초과 3%'],
        ['같이 내는 세금', `지방교육세는 중과가 아니면 취득세의 10%, 중과 주택은 집값의 ${pctOf(EDU_HEAVY)}. 농어촌특별세는 전용 85㎡ 초과일 때만`],
        ['과세표준', '매매는 실제로 치른 사실상취득가격'],
        ['생애최초 감면', '무주택자가 12억원 이하 집을 사면 취득세에서 200만원을 빼 줘요'],
        ['다주택 중과', '조정대상지역 2주택과 비조정 3주택은 8%, 그 위는 12%'],
        ['비조정 2주택', '중과 없이 집값에 따라 1~3% 기본 세율'],
        ['신고 기한', '취득한 날부터 60일 이내에 신고하고 납부해요'],
        ['기한 안에 등기하면', '등기 신청서를 접수하는 날까지 신고·납부'],
      ],
    },
    sections: [
      { id: 's1', h2: '취득세 세율, 6억과 9억에서 어떻게 달라지나요', sub: '1%에서 3%까지 세 구간이에요', blocks: [
        { type: 'p', lead: true, ans: '6억원 이하는 1%, 9억원 초과는 3%이고, 그 사이 구간은 집값에 따라 조금씩 올라가요.', text: `6억원과 9억원 사이 구간은 계단이 아니라 완만한 경사라서, 6억원을 조금 넘겼다고 세금이 갑자기 뛰지 않아요. 7억원짜리 집의 세율은 ${(PRICE[3].r.rate * 100).toFixed(2)}%예요.` },
        { type: 'flow', label: '집을 살 때 함께 내는 세금', steps: [
          { label: '취득세', value: `${won(R.acquisitionTax)}원`, sub: '집값 5억 × 1%', op: '+' },
          { label: '지방교육세', value: `${won(R.educationTax)}원`, sub: '취득세의 10%', op: '+' },
          { label: '농어촌특별세', value: '0원', sub: '전용 85㎡ 이하는 없어요', op: '=' },
          { label: '합계', value: `${won(R.totalTax)}원`, sub: '잔금 뒤 60일 안에 납부' },
        ] },
        { type: 'note', title: '전용면적 85㎡가 갈림길이에요', text: `국민주택 규모인 전용 85㎡ 이하는 농어촌특별세가 없어요. 6억원짜리 집이라도 전용 100㎡면 농특세 ${won(BIG.ruralTax)}원이 붙어 합계가 ${won(BIG.totalTax)}원이 돼요.` },
      ] },

      { id: 's2', h2: '취득세 계산, 집값별로 얼마 나오나요', sub: '무주택자가 처음 사는 경우 기준', blocks: [
        { type: 'p', lead: true, ans: `3억원이면 ${won(PRICE[0].r.totalTax)}원, 10억원이면 ${won(PRICE[6].r.totalTax)}원이에요.`, text: '아래 금액은 전용 84㎡ 기준이라 농어촌특별세가 없어요. 면적이 85㎡를 넘으면 집값의 0.2%가 더 붙어요.' },
        { type: 'table', id: 'priceTbl', compact: true, x: [1, 3], net: 4, caption: '집값별 취득세 (첫 집, 전용 84㎡ 기준)', headers: ['집값', '세율', '취득세', '지방교육세', '합계'],
          rows: PRICE.map(({ p, r }) => ({ hi: p === 5e8, cells: [`${man(p)}원`, `${(r.rate * 100).toFixed(2)}%`, won(r.acquisitionTax), won(r.educationTax), won(r.totalTax)] })),
          moreLabel: '세율까지 보기',
          fn: '단위: 원. 위택스 지방세 미리계산과 1원 단위까지 같은 값이에요. 전용 85㎡를 넘으면 농어촌특별세가 더해져요.' },
        { type: 'widget', label: '내 취득세 계산', title: '내 조건으로 바로 보기', note: '집값과 취득 후 보유하게 될 주택 수, 조정대상지역 여부, 전용면적을 넣으면 세금이 바로 나와요. 생애최초 감면은 반영하지 않은 금액이에요.',
          inputs: [
            { id: 'ap', label: '집값 (억원)', type: 'number', value: 5, min: 0.1, max: 100, step: 0.5 },
            { id: 'ah', label: '취득 후 주택 수', type: 'number', value: 1, min: 1, max: 5, step: 1 },
            { id: 'aa', label: '조정대상지역', type: 'select', value: '0', options: [['0', '아니오'], ['1', '예']] },
            { id: 'am', label: '전용면적 (㎡)', type: 'number', value: 84, min: 10, max: 500, step: 1 },
          ],
          outputs: [{ id: 'aacq', label: '취득세' }, { id: 'aedu', label: '지방교육세' }, { id: 'arur', label: '농어촌특별세' }, { id: 'atot', label: '합계' }],
          port: `
  function acqTax(price, houses, adjusted, area){
    function std(p){ return p <= 600000000 ? 0.01 : p <= 900000000 ? Math.round(((p / 100000000) * (2/3) - 3) * 100) / 10000 : 0.03; }
    var rate, heavy = false;
    if (houses <= 1) rate = std(price);
    else if (houses === 2) { if (adjusted) { rate = 0.08; heavy = true; } else rate = std(price); }
    else if (houses === 3) { rate = adjusted ? 0.12 : 0.08; heavy = true; }
    else { rate = 0.12; heavy = true; }
    var acqv = Math.round(price * rate);
    var rrate = !heavy ? ${spec.constants.RURAL_TAX_RATE} : (rate === 0.08 ? 0.006 : 0.010);
    var rural = area > ${spec.constants.RURAL_AREA_THRESHOLD} ? Math.round(price * rrate) : 0;
    var edu = heavy ? Math.round(price * (0.04 - 0.02) * 0.2) : Math.round(acqv * ${spec.constants.EDUCATION_TAX_RATE});
    return { rate: rate, acq: acqv, rural: rural, edu: edu, total: acqv + rural + edu };
  }`,
          js: `
  function arender(){ var p=(+document.getElementById('ap').value||0)*1e8, h=+document.getElementById('ah').value||1, adj=document.getElementById('aa').value==='1', m=+document.getElementById('am').value||84; var r=acqTax(p,h,adj,m);
    document.getElementById('aacq').textContent=won(r.acq)+'원'; document.getElementById('aedu').textContent=won(r.edu)+'원'; document.getElementById('arur').textContent=won(r.rural)+'원'; document.getElementById('atot').textContent=won(r.total)+'원'; }
  ['ap','ah','aa','am'].forEach(function(id){document.getElementById(id).addEventListener('input',arender);document.getElementById(id).addEventListener('change',arender)}); arender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let p = 1; p <= 30; p += 0.5) for (const h of [1, 2, 3, 4]) for (const adj of [false, true]) for (const m of [59, 84, 100]) {
              n++;
              const e = acq(p * 1e8, h, adj, m);
              const q = port.acqTax(p * 1e8, h, adj, m);
              if (q.total !== e.totalTax || q.acq !== e.acquisitionTax || q.rural !== e.ruralTax || q.edu !== e.educationTax) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'tips', items: [
          { title: '기준은 실제로 치른 가격이에요', text: '매매로 사면 실제로 지급한 사실상취득가격이 과세표준이에요. 공시가격이 아니고, 집에 붙는 붙박이 가구나 가전 설치비 같은 비용도 더해요.' },
          { title: '중개보수와 법무사 비용은 별도예요', text: '취득세와 별개로 중개보수, 등기 대행료, 인지세가 들어가요. 자금 계획에 함께 넣어 두세요.' },
          { title: '분양이면 잔금일이 기준이에요', text: '분양 계약금이 아니라 잔금을 치른 날부터 기한이 시작돼요. 입주 지정 기간을 확인해 두세요.' },
        ] },
      ] },

      { id: 's3', h2: '생애최초로 집을 사면 얼마나 깎아 주나요', sub: '취득세에서 200만원을 빼 줘요', blocks: [
        { type: 'p', lead: true, ans: `본인과 배우자가 집을 가진 적이 없고 12억원 이하 집을 사면 취득세에서 200만원을 빼 줘요.`, text: '취득세가 200만원 이하면 취득세는 내지 않아요. 지방교육세와 농어촌특별세는 따로 계산해요.' },
        { type: 'table', net: 2, caption: '생애최초 감면을 받았을 때 취득세 (전용 84㎡ 기준)', headers: ['집값', '원래 취득세', '감면 후 취득세'],
          rows: FIRST.map(({ p, r, after }) => ({ hi: p === 3e8, cells: [`${man(p)}원`, `${won(r.acquisitionTax)}원`, `${won(after)}원`] })),
          fn: '지방세특례제한법 제36조의3제1항제2호의 200만원 공제를 적용한 금액이에요. 소형주택과 인구감소지역 주택은 300만원까지 공제돼요.' },
        { type: 'table', text: true, caption: '생애최초 취득세 감면 조건', headers: ['항목', '조건'], rows: [
          { cells: ['주택 보유 이력', '본인과 배우자가 주택을 소유한 사실이 없어야 해요'] },
          { cells: ['집값', '취득 당시 가액이 12억원 이하여야 해요'] },
          { cells: ['목적', '본인이 살 목적으로 돈을 주고 사야 해요. 빚을 함께 넘겨받는 부담부증여는 빼요'] },
          { cells: ['나이', '미성년자는 받을 수 없어요'] },
          { cells: ['공제 금액', '일반 주택은 200만원, 소형주택과 인구감소지역 주택은 300만원'] },
          { cells: ['공동 취득', '두 명 이상이 함께 사도 감면 총액은 같은 한도 안에서만 인정돼요'] },
          { cells: ['적용 기한', '2028년 12월 31일까지 취득하는 경우에 적용해요'] },
        ], fn: '지방세특례제한법 제36조의3에 조건이 있어요. 무주택 여부를 판단하는 세부 기준은 행정안전부 고시로 정해요.' },
        { type: 'note', title: '3년 안에 팔거나 세를 놓으면 다시 걷어가요', text: '감면을 받고 3년 안에 그 집을 팔거나 증여하거나 임대로 돌리면 깎아 준 취득세를 추징해요. 실거주 목적일 때만 신청하세요.' },
        { type: 'p', ans: '감면은 신고할 때 신청서를 함께 내서 받아요.', text: '이미 냈다면 경정청구를 하면서 신청할 수도 있어요. 조건과 신청 서류, 추징 기준은 생애최초 글에 정리했어요.', link: { href: '/acquisition-tax/exemption/', label: '취득세 생애최초 감면 조건과 신청 서류' } },
        { type: 'p', ans: '아이를 낳은 집은 500만원까지 빼 주는 감면이 따로 있어요.', text: '자녀를 낳은 부모가 출산일부터 5년 안에 12억원 이하 집을 사면 받아요. 생애최초 감면과 겹치면 감면되는 세액이 큰 쪽 하나만 적용해요.', link: { href: '/acquisition-tax/newborn/', label: '신생아 취득세 감면 조건' } },
      ] },

      { id: 's4', h2: '다주택 중과, 8%와 12%는 언제 붙나요', sub: '지역과 주택 수를 함께 봐요', blocks: [
        { type: 'p', lead: true, ans: '조정대상지역에서 두 번째 집을 사거나 비조정지역에서 세 번째 집을 사면 8%예요.', text: `조정대상지역은 주택법에 따라 지정·고시된 지역이에요. 조정대상지역 세 번째 집부터는 12%가 돼요. 6억원짜리 집이라면 기본 세율일 때 ${won(SMALL.totalTax)}원인데, 조정대상지역 2주택이 되면 ${won(HEAVY[0].r.totalTax)}원으로 ${won(heavyGap)}원 늘어요.` },
        { type: 'table', net: 3, caption: '주택 수와 지역에 따른 취득세 (집값 6억원, 전용 84㎡ 기준)', headers: ['상황', '세율', '취득세', '합계'],
          rows: [{ label: '첫 집', r: SMALL }, ...HEAVY].map(({ label, r }) => ({ hi: label === '조정대상지역 2주택', cells: [label ?? '첫 집', `${(r.rate * 100).toFixed(0)}%`, `${won(r.acquisitionTax)}원`, `${won(r.totalTax)}원`] })),
          fn: '중과 기준은 지방세법 제13조의2에 있어요. 취득 후 보유하게 되는 주택 수로 판단해요.' },
        { type: 'table', text: true, caption: '중과를 피하거나 낮추는 경우', headers: ['상황', '어떻게 되나요'], rows: [
          { cells: ['비조정지역에서 두 번째 집', '중과 대상이 아니에요. 기본 세율 그대로예요'] },
          { cells: ['일시적 2주택', '새 집을 산 날부터 3년 안에 기존 집을 팔면 중과에서 빼 줘요'], link: { href: '/acquisition-tax/two-house/', label: '2주택 중과와 주택수' } },
          { cells: ['생애최초 감면 대상', '감면을 받으면 중과 세율을 적용하지 않아요'] },
          { cells: ['상속으로 받은 집', '상속개시일부터 5년 동안은 주택 수를 셀 때 빼요'], link: { href: '/acquisition-tax/inheritance-gift/', label: '상속·증여 취득세율' } },
          { cells: ['공시가격이 낮은 집', '시가표준액이 수도권 1억원, 그 밖 지역 2억원 이하면 주택 수에서 빼요'] },
        ], fn: '일시적 2주택은 지방세법 시행령 제28조의5, 주택 수에서 빼는 주택은 제28조의4와 제28조의2에 있어요.' },
        { type: 'note', title: '중과되면 지방교육세 계산도 달라져요', text: `8%나 12%로 중과되면 지방교육세는 취득세의 10%가 아니라 집값의 ${pctOf(EDU_HEAVY)}예요. 6억원 집이면 ${won(HEAVY[0].r.educationTax)}원이에요.` },
      ] },

      { id: 's5', h2: '취득세 언제까지 어떻게 내나요', sub: '취득한 날부터 60일 이내', blocks: [
        { type: 'p', lead: true, ans: '잔금을 치른 날부터 60일 안에 신고하고 납부해야 해요.', text: '상속으로 받은 경우에는 상속이 시작된 달의 말일부터 6개월, 증여는 취득한 달의 말일부터 3개월이에요. 상속과 증여의 세율은 따로 정리했어요.', link: { href: '/acquisition-tax/inheritance-gift/', label: '상속 취득세율과 증여 취득세율' } },
        { type: 'steps', items: [
          { title: '서류 준비', text: '매매계약서, 부동산 거래신고필증, 신분증을 준비하세요', meta: '잔금일 전후' },
          { title: '취득세 신고', text: '위택스나 관할 시군구청 세무과에서 신고서를 내요. 감면 대상이면 신청서를 같이 내요', meta: '60일 이내', link: { label: '위택스 바로가기', href: WETAX } },
          { title: '납부', text: '신고한 세액을 계좌이체나 카드로 직접 내요. 고지서가 오기를 기다리는 세금이 아니에요', meta: '신고 기한 안' },
          { title: '등기 신청', text: '납부 영수증을 첨부해 소유권 이전 등기를 신청해요', meta: '납부 후' },
        ] },
        { type: 'tips', items: [
          { title: '법무사가 대신 처리하는 경우가 많아요', text: '등기를 맡기면 취득세 신고와 납부까지 함께 해 줘요. 감면 대상이라면 미리 알려 주세요.' },
          { title: '기한을 넘기면 가산세가 붙어요', text: '신고를 안 하면 무신고 가산세가, 납부가 늦으면 납부지연 가산세가 붙어요. 등기도 그만큼 늦어져요.' },
        ] },
        { type: 'note', title: '취득세에는 분할납부 조항이 없어요', text: '재산세는 납부세액이 250만원을 넘으면 나눠 낼 수 있지만, 지방세법에 취득세를 나눠 내는 조항은 없어요. 카드 할부를 정한 조문도 법에는 없어요. 카드로 내는 방법과 가산세는 따로 정리했어요', link: { href: '/acquisition-tax/payment/', label: '취득세 카드납부와 납부기한' } },
      ] },

      { id: 's6', h2: '오피스텔이나 분양권은 취득세가 어떻게 되나요', sub: '주택 세율이 아니라 4%예요', blocks: [
        { type: 'p', lead: true, ans: '오피스텔은 건축물로 봐서 4%가 적용돼요.', text: '주택용으로 쓰더라도 등기부상 용도가 오피스텔이면 주택 세율을 쓰지 않아요. 다만 주거용으로 신고해 재산세를 주택으로 내고 있으면, 나중에 다른 집을 살 때 주택 수에 들어갈 수 있어요.' },
        { type: 'table', text: true, caption: '주택이 아닌 부동산의 취득세', headers: ['구분', '내용'], rows: [
          { cells: ['오피스텔', '건축물 유상거래로 보아 4%를 적용해요'] },
          { cells: ['분양권', '다음 집을 살 때 주택 수에 들어가요. 분양사업자에게 받았으면 분양계약일 기준이에요'], link: { href: '/acquisition-tax/two-house/', label: '2주택 중과와 주택수' } },
          { cells: ['조합원입주권', '재건축·재개발 조합원으로 새 집에 들어갈 지위예요. 기존 건물이 멸실돼도 주택 수에 들어가요'] },
          { cells: ['상가와 토지', '유상거래는 농지가 아니면 4%, 농지는 3%예요'] },
          { cells: ['신축', '새로 지어 처음 갖는 원시취득이라 2.8%예요'] },
        ], fn: '주택 외 부동산의 유상거래 세율은 지방세법 제11조제1항제7호, 원시취득은 제3호, 주택 수에 더하는 분양권과 입주권은 제13조의3에 있어요.' },
        { type: 'tips', items: [
          { title: '주택 수에 들어가는지 확인하세요', text: '주거용으로 쓰는 오피스텔은 다음 집을 살 때 주택 수에 포함될 수 있어요. 중과 여부가 달라져요.' },
          { title: '분양권은 계약 시점이 중요해요', text: '분양권을 언제 얻었는지에 따라 나중에 주택 수를 셀 때 기준이 달라져요. 계약서를 보관하세요.' },
        ] },
      ] },
    ],
    faq: [
      ['취득세 얼마인지 위택스에서도 미리 볼 수 있나요?', '위택스 지방세 미리계산에서 볼 수 있어요. 이 글의 계산기는 그 화면과 1원 단위까지 같은 값을 내지만, 감면은 빼고 계산하니 감면 대상이면 감면액만큼 줄여서 보세요.'],
      ['부부 공동명의로 사면 세율이 낮아지나요?', `낮아지지 않아요. 지분으로 산 주택의 세율은 지분 가격이 아니라 전체 주택의 취득당시가액으로 정해요. 7억원 집을 반씩 사도 세율은 ${(PRICE[3].r.rate * 100).toFixed(2)}%예요.`],
      ['법인이 집을 사면 취득세율이 얼마인가요?', '법인이 주택을 사면 원칙적으로 12%예요. 4% 세율에 중과기준세율 2%의 4배를 더한 세율이에요.'],
      ['취득세를 내지 않으면 등기를 할 수 없나요?', '등기를 신청할 때 취득세 영수필 통지서와 영수필 확인서를 붙여야 해요. 행정기관끼리 납부 사실을 전자로 확인할 수 있으면 붙이지 않아도 돼요.'],
      ['신고를 하지 않으면 어떻게 되나요?', '시군구청이 산출세액에 가산세를 더한 금액을 고지해서 걷어요. 신고나 납부 의무를 다하지 않은 경우에 쓰는 징수 방법이에요.'],
      ['중개보수도 취득세 과세표준에 들어가나요?', '개인이 사면 들어가지 않아요. 법인이 아닌 사람이 취득하면 중개보수, 건설자금 이자, 할부 이자는 사실상취득가격에서 빼요.'],
    ],
    summary: [
      '세율은 6억 이하 1%, 9억 초과 3%이고 그 사이 구간은 집값에 따라 완만하게 올라가요.',
      '지방교육세는 중과가 아니면 취득세의 10%지만 중과되면 계산이 달라져요. 농어촌특별세는 전용 85㎡를 넘을 때만 붙어요.',
      '생애최초 감면은 3년 안에 팔거나 세를 놓으면 다시 걷어가니 실제로 살 집에만 쓰세요.',
      '비조정지역 2주택은 중과가 아니지만 조정대상지역에서는 두 번째 집부터 8%예요.',
    ],
    sources: [
      ['법령', '지방세법 제10조의3(유상승계취득의 경우 과세표준), 제11조(부동산 취득의 세율), 제13조의2(주택 취득 중과), 제13조의3(주택 수의 판단 범위), 제18조(징수방법), 제20조(신고 및 납부, 60일), 제21조(부족세액의 추징 및 가산세), 제118조(재산세 분할납부), 제151조(지방교육세). 지방세법 시행령 제18조(사실상취득가격의 범위), 제28조의2·제28조의4·제28조의5(주택 수 산정과 일시적 2주택), 제36조(취득세 납부 확인). 지방세특례제한법 제36조의3(생애최초 주택 구입 감면), 제36조의5(출산·양육 주택 감면). 농어촌특별세법 제4조(비과세), 제5조(과세표준과 세율).'],
      ['정부 도구', `위택스 지방세 미리계산과 이 글의 금액이 1원 단위까지 같아요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '취득당시가액이 6억원 이하인 주택: 1천분의 10', note: '6억 이하 1% (지방세법 제11조①8가)' },
      { src: 1, quote: '취득당시가액이 9억원을 초과하는 주택: 1천분의 30', note: '9억 초과 3% (제11조①8다)' },
      { src: 1, quote: '1세대 3주택 이상에 해당하는 주택으로서 조정대상지역에 있는 주택을 취득하는 경우 또는 1세대 4주택 이상에 해당하는 주택으로서 조정대상지역 외의 지역에 있는 주택을 취득하는 경우', note: '12% 중과 대상 (제13조의2①3)' },
      { src: 3, quote: '제1호 외의 주택에 대해서는 산출세액이 200만원 이하인 경우에는 취득세를 면제하고, 산출세액이 200만원을 초과하는 경우에는 산출세액에서 200만원을 공제한다', note: '생애최초 200만원 공제 (지방세특례제한법 제36조의3①2)' },
      { src: 3, quote: '12억원 이하인 주택을 유상거래(부담부증여는 제외한다)로 취득하는 경우', note: '생애최초 감면 집값 요건 (제36조의3①)' },
      { src: 3, quote: '3년 이내에 해당 주택을 매각ㆍ증여(배우자에게 지분을 매각ㆍ증여하는 경우는 제외한다)하거나 다른 용도(임대를 포함한다)로 사용하는 경우에는 감면된 취득세를 추징한다', note: '3년 내 처분 시 추징 (제36조의3④)' },
      { src: 3, quote: '500만원 이하인 경우에는 취득세를 면제하고, 500만원을 초과하는 경우에는 산출세액에서 500만원을 공제한다', note: '출산·양육 주택 감면 500만원 (제36조의5①)' },
      { src: 3, quote: '그 중 감면되는 세액이 큰 것 하나만을 적용한다', note: '중복 특례 배제 (지특법 제180조)' },
      { src: 1, quote: '취득세의 징수는 신고납부의 방법으로 한다', note: '신고납부 (지방세법 제18조)' },
      { src: 1, quote: '산출한 세액을 대통령령으로 정하는 바에 따라 신고하고 납부하여야 한다', note: '60일 안 신고·납부 (제20조①)' },
      { src: 1, quote: '등기 또는 등록 신청서를 등기ㆍ등록관서에 접수하는 날까지 취득세를 신고ㆍ납부하여야 한다', note: '등기 접수일까지 (제20조④)' },
      { src: 1, quote: '취득세 납세의무자가 제20조에 따른 신고 또는 납부의무를 다하지 아니한 경우', note: '신고하지 않으면 가산세 더해 보통징수 (제21조①)' },
      { src: 1, quote: '제20조의2 삭제', note: '취득세 분할납부 조항 삭제' },
      { src: 1, quote: '재산세의 납부세액이 250만원을 초과하는 경우에는', note: '재산세 분할납부 (제118조)' },
      { src: 1, quote: '1천분의 20을 뺀 세율을 적용하여 산출한 금액(제11조제1항제8호의 경우에는 해당 세율에 100분의 50을 곱한 세율을 적용하여 산출한 금액)의 100분의 20', note: '지방교육세 기본 계산 (제151조①1호)' },
      { src: 1, quote: '제13조의2에 해당하는 경우: 제11조제1항제7호나목의 세율에서 중과기준세율을 뺀 세율을 적용하여 산출한 금액의 100분의 20', note: '중과 주택 지방교육세 (제151조①1호나)' },
      { src: 1, quote: '전체 주택의 취득당시가액으로 한다', note: '지분 취득도 전체 가액으로 세율 (제11조①8)' },
      { src: 1, quote: '법인(「국세기본법」 제13조에 따른 법인으로 보는 단체', note: '법인 주택 중과 (제13조의2①1호)' },
      { src: 1, quote: '원시취득: 1천분의 28', note: '원시취득 2.8% (제11조①3호)' },
      { src: 1, quote: '그 밖의 원인으로 인한 취득 가. 농지: 1천분의 30 나. 농지 외의 것: 1천분의 40', note: '그 밖의 유상거래 (제11조①7호)' },
      { src: 2, quote: '법인이 아닌 자가 취득한 경우에는 제1호, 제2호 또는 제7호의 금액을 제외한 금액으로 한다', note: '개인은 금융비용·할부이자·중개보수 제외 (시행령 제18조①)' },
      { src: 2, quote: '붙박이 가구ㆍ가전제품 등 건축물에 부착되거나 일체를 이루면서', note: '설비 설치비 포함 (시행령 제18조①8호)' },
      { src: 2, quote: '등기 또는 등록 신청서에 취득세 영수필 통지서(등기ㆍ등록관서의 시ㆍ군ㆍ구 통보용) 1부와 취득세 영수필 확인서 1부를 첨부하여야 한다', note: '등기 때 납부 확인 (시행령 제36조①)' },
      { src: 2, quote: '행정기관 간에 취득세 납부사실을 전자적으로 확인할 수 있는 경우에는 그러하지 아니하다', note: '전자 확인 시 생략 (시행령 제36조① 단서)' },
      { src: 2, quote: '추가로 취득한 후 3년(이하 이 조에서 “일시적 2주택 기간”이라 한다) 이내에 종전 주택등', note: '일시적 2주택 3년 (시행령 제28조의5①)' },
      { src: 2, quote: '상속을 원인으로 취득한 주택, 조합원입주권, 주택분양권 또는 오피스텔로서 상속개시일부터 5년이 지나지 않은', note: '상속 5년 주택 수 제외 (시행령 제28조의4⑥3호)' },
      { src: 2, quote: '수도권 외의 지역에 소재하는 경우: 시가표준액이 2억원 이하인 주택', note: '값싼 주택 (시행령 제28조의2 1호)' },
      { src: 2, quote: '분양사업자로부터 주택분양권을 취득하는 경우에는 분양계약일을 말하고', note: '분양권 기준일 (시행령 제28조의4①)' },
      { src: 1, quote: '주택분양권”이라 한다)는 해당 주택분양권을 소유한 자의 주택 수에 가산한다', note: '분양권 주택 수 (제13조의3 3호)' },
      { src: 1, quote: '해당 주거용 건축물이 멸실된 경우라도 해당 조합원입주권 소유자의 주택 수에 가산한다', note: '입주권 주택 수 (제13조의3 2호)' },
    ],
    related: [
      { kind: '계산기', label: '취득세 계산기', href: '/acquisition-tax/' },
      { kind: '부동산 계산기', label: '재산세 계산기', href: '/property-tax/' },
      { kind: '부동산 계산기', label: '양도소득세 계산기', href: '/transfer-tax/' },
    ],
  };
}
