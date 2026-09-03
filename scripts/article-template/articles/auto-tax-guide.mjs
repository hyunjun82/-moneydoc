/**
 * 글 스펙: 자동차세
 *   금액은 전부 엔진(auto-tax: 위택스 계산과 대조)이 만든다.
 *   세율·납기·연납 근거는 claims 로 지방세법 원문을 인용해 둔다.
 */
import { won } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('insurance/auto-tax');
  const at = (engineCC, vehicleAge = 0, isCommercial = false) =>
    calculators['auto-tax']({ engineCC, vehicleAge, isCommercial }, spec);
  const C = spec.constants;

  const R = at(1999);                                      // 대표: 2,000cc급 신차 (비영업용)
  const CCS = [999, 1598, 1999, 2497, 3342].map((cc) => ({ cc, r: at(cc) }));
  const AGES = [0, 2, 4, 6, 9, 11].map((y) => ({ y, r: at(1999, y) }));
  const COMM = at(1999, 0, true);
  const half = derive(Math.round(R.totalTax / 2));
  const oldGap = derive(R.totalTax - AGES[5].r.totalTax);
  const pctOf = (v) => derive(Math.round(v * 1000) / 10);
  const WETAX = 'https://www.wetax.go.kr';

  return {
    slug: 'auto-tax-guide', cat: 'insurance', catLabel: '보험·자동차', crumb: '자동차세',
    title: '자동차세 계산과 연납 할인, 배기량별 세액부터 1월 신청까지',
    description: `배기량 1,999cc 승용차의 자동차세는 지방교육세까지 1년에 ${won(R.totalTax)}원이에요. 배기량별 세액, 차령에 따른 경감, 연납 할인, 6월과 12월 납부 방법을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `위택스 자동차세 계산과 대조 · ${VERIFIED}`,
    calc: { href: '/insurance/auto-tax/', label: '자동차세 계산기 바로가기' },
    hero: {
      tag: '보험·자동차', line1: '자동차세 계산과 연납 할인', line2: '내 차는 얼마',
      sub1: `1,999cc 승용차 → 1년 ${won(R.totalTax)}원`,
      sub2: `자동차세 ${won(R.autoTax)}원 + 지방교육세 ${won(R.eduTax)}원`,
      foot: `위택스 자동차세 계산과 대조 · ${VERIFIED} 검증`,
      card: { label: '연간 자동차세', big: won(R.totalTax), unit: '원', l1: '배기량 1,999cc', l2: `6월과 12월에 ${won(half)}원씩` },
      alt: `자동차세 계산. 1,999cc 승용차는 1년에 ${won(R.totalTax)}원`,
    },
    intro: `승용차의 자동차세는 배기량에 시시당 세액을 곱해서 정해요. 여기에 자동차세의 30%인 지방교육세가 함께 붙어요. 배기량 1,999cc 차라면 자동차세 ${won(R.autoTax)}원에 지방교육세 ${won(R.eduTax)}원을 더해 1년에 ${won(R.totalTax)}원이에요. 차가 오래되면 세금이 줄고, 1월에 한 번에 내면 할인도 받아요. 배기량별 세액, 차령 경감, 연납 할인, 납부 방법을 정리했어요.`,
    answer: {
      label: '내 차 배기량을 눌러 1년 세금을 확인해 보세요 (신차 · 비영업용)',
      quick: [999, 1598, 1999].map((cc) => {
        const r = at(cc);
        return { chip: `${cc}cc`, selected: cc === 1999, big: `${won(r.totalTax)}원`, unit: '연간 세금', sub: `자동차세 ${won(r.autoTax)}원 + 지방교육세 ${won(r.eduTax)}원` };
      }),
      boxes: [
        { title: '배기량 1,600cc가 갈림길이에요', text: '1,000cc 이하 80원, 1,600cc 이하 140원, 그 위는 200원이 시시당 세액이에요' },
        { title: '오래 탈수록 줄어요', text: `차령 3년차부터 5%씩 줄어 최대 50%까지 깎여요. 11년 된 차는 ${won(oldGap)}원이 적어요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 자동차세',
      rows: [
        ['계산식', '배기량 × 시시당 세액. 여기에 지방교육세 30%를 더해요'],
        ['시시당 세액', `1,000cc 이하 ${C.RATE_UNDER_1000}원, 1,600cc 이하 ${C.RATE_1000_1600}원, 초과 ${C.RATE_OVER_1600}원`],
        ['1,999cc면', `자동차세 ${won(R.autoTax)}원, 지방교육세 ${won(R.eduTax)}원, 합계 ${won(R.totalTax)}원`],
        ['차령 경감', '3년차부터 매년 5%씩 줄어 12년 이상은 50%'],
        ['납기', '6월과 12월에 절반씩 내요'],
        ['연납', '연세액의 10% 범위에서 정한 금액을 공제해 줘요'],
        ['영업용', `세율이 훨씬 낮아 같은 배기량이 ${won(COMM.totalTax)}원이에요`],
        ['어디서 내나요', '위택스나 관할 지방자치단체에서 내요'],
      ],
    },
    sections: [
      { id: 's1', h2: '자동차세 계산, 배기량 세율이 어떻게 되나요', sub: '배기량에 시시당 세액을 곱해요', blocks: [
        { type: 'p', lead: true, ans: `1,999cc 차는 자동차세 ${won(R.autoTax)}원에 지방교육세 ${won(R.eduTax)}원을 더해 ${won(R.totalTax)}원이에요.`, text: `비영업용 승용차는 1,000cc 이하가 시시당 ${C.RATE_UNDER_1000}원, 1,600cc 이하가 ${C.RATE_1000_1600}원, 1,600cc를 넘으면 ${C.RATE_OVER_1600}원이에요. 배기량이 1cc만 넘어도 구간이 바뀌니 차량 등록증의 배기량을 정확히 확인하세요.` },
        { type: 'flow', label: '자동차세가 정해지는 순서', steps: [
          { label: '배기량', value: '1,999cc', sub: '등록증에 적힌 값', op: '×' },
          { label: '시시당 세액', value: `${C.RATE_OVER_1600}원`, sub: '1,600cc 초과 구간', op: '=' },
          { label: '자동차세', value: `${won(R.autoTax)}원`, sub: '연세액', op: '+' },
          { label: '지방교육세', value: `${won(R.eduTax)}원`, sub: `합계 ${won(R.totalTax)}원` },
        ] },
        { type: 'table', id: 'ccTbl', compact: true, x: [1], net: 3, caption: '배기량별 연간 자동차세 (신차, 비영업용)', headers: ['배기량', '자동차세', '지방교육세', '합계'],
          rows: CCS.map(({ cc, r }) => ({ hi: cc === 1999, cells: [`${cc}cc`, won(r.autoTax), won(r.eduTax), won(r.totalTax)] })),
          moreLabel: '지방교육세까지 보기',
          fn: '단위: 원. 지방자치단체가 조례로 표준세율의 50%까지 올려 정할 수 있어 지역에 따라 다를 수 있어요.' },
        { type: 'widget', label: '내 자동차세 계산', title: '내 차로 바로 보기', note: '배기량과 등록 후 지난 햇수를 넣으면 연간 세금이 나와요. 영업용을 고르면 낮은 세율이 적용돼요.',
          inputs: [
            { id: 'ac', label: '배기량 (cc)', type: 'number', value: 1999, min: 50, max: 6000, step: 1 },
            { id: 'ay', label: '등록 후 지난 햇수', type: 'number', value: 0, min: 0, max: 20, step: 1 },
            { id: 'ab', label: '용도', type: 'select', value: '0', options: [['0', '비영업용'], ['1', '영업용']] },
          ],
          outputs: [{ id: 'atax', label: '자동차세' }, { id: 'aedu2', label: '지방교육세' }, { id: 'atot2', label: '연간 합계' }, { id: 'ahalf', label: '한 번에 내는 금액' }],
          port: `
  function autoTax(cc, age, commercial){
    var rate;
    if (cc <= 1000) rate = commercial ? 18 : ${C.RATE_UNDER_1000};
    else if (cc <= 1600) rate = commercial ? 18 : ${C.RATE_1000_1600};
    else rate = commercial ? (cc <= 2000 ? 19 : 24) : ${C.RATE_OVER_1600};
    var base = Math.round(cc * rate);
    var usage = age + 1, disc = 0;
    if (usage >= 3 && usage < 12) disc = +((usage - 2) * 0.05).toFixed(2);
    else if (usage >= 12) disc = 0.5;
    function cut10(n){ return Math.floor(n / 10) * 10; }
    function sfloor(x){ return Math.floor(Math.round(x * 1e6) / 1e6); }
    var halfAuto = cut10(sfloor((base * (1 - disc)) / 2));
    var auto = halfAuto * 2;
    var halfEdu = cut10(sfloor(halfAuto * ${C.EDU_TAX_RATE}));
    var edu = halfEdu * 2;
    return { auto: auto, edu: edu, total: auto + edu, half: halfAuto + halfEdu };
  }`,
          js: `
  function arender2(){ var cc=+document.getElementById('ac').value||0, y=+document.getElementById('ay').value||0, com=document.getElementById('ab').value==='1'; var r=autoTax(cc,y,com);
    document.getElementById('atax').textContent=won(r.auto)+'원'; document.getElementById('aedu2').textContent=won(r.edu)+'원'; document.getElementById('atot2').textContent=won(r.total)+'원'; document.getElementById('ahalf').textContent=won(r.half)+'원'; }
  ['ac','ay','ab'].forEach(function(id){document.getElementById(id).addEventListener('input',arender2);document.getElementById(id).addEventListener('change',arender2)}); arender2();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let cc = 100; cc <= 5000; cc += 50) for (let y = 0; y <= 15; y++) for (const com of [false, true]) {
              n++;
              const e = at(cc, y, com);
              const q = port.autoTax(cc, y, com);
              if (q.total !== e.totalTax || q.auto !== e.autoTax || q.edu !== e.eduTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's2', h2: '차령 경감은 몇 년부터 얼마나 되나요', sub: '3년차부터 5%씩 줄어요', blocks: [
        { type: 'p', lead: true, ans: '차령 3년차부터 매년 5%씩 줄고, 12년을 넘으면 50%로 고정돼요.', text: `등록한 해를 1년차로 세기 때문에 신차를 산 다음다음 해부터 경감이 시작돼요. 1,999cc 차라면 신차일 때 ${won(R.totalTax)}원이지만 11년이 지나면 ${won(AGES[5].r.totalTax)}원으로 ${won(oldGap)}원 줄어요.` },
        { type: 'table', id: 'ageTbl', compact: true, x: [1], net: 3, caption: '차령에 따른 자동차세 (1,999cc, 비영업용)', headers: ['등록 후', '경감률', '자동차세', '합계'],
          rows: AGES.map(({ y, r }) => ({ hi: y === 0, cells: [`${y}년`, r.discountRate === 0 ? '없음' : `${pctOf(r.discountRate)}%`, won(r.autoTax), won(r.totalTax)] })),
          moreLabel: '경감률까지 보기',
          fn: '단위: 원. 상반기와 하반기 세액을 각각 계산해 합친 금액이에요. 지방세법의 차령은 등록한 해를 1년차로 세요.' },
        { type: 'note', title: '중고차를 살 때도 확인하세요', text: '차령이 오래된 차는 자동차세가 절반까지 줄어요. 유지비를 비교할 때 보험료와 함께 자동차세도 넣어 보세요.' },
      ] },

      { id: 's3', h2: '연납 할인은 얼마나 받나요', sub: '1월에 한 번에 내면 깎아 줘요', blocks: [
        { type: 'p', lead: true, ans: '연세액을 한 번에 내면 남은 기간에 해당하는 세액의 10% 범위에서 공제해 줘요.', text: '공제율은 법에 정해진 계산식으로 산출하고 해마다 달라질 수 있어요. 1월에 신청하면 공제 기간이 가장 길어 할인 금액이 가장 커요. 3월, 6월, 9월에도 신청할 수 있지만 남은 기간이 짧아 할인이 줄어요.' },
        { type: 'timeline', label: '연납 신청 시기', items: [
          { step: '1월', title: '가장 크게 할인받는 시기', text: '1월에 신청하면 남은 기간이 길어 공제 금액이 가장 커요', mark: true, tag: '추천' },
          { step: '3월', title: '두 번째 기회', text: '1월을 놓쳤다면 3월에 신청할 수 있어요. 공제가 조금 줄어요' },
          { step: '6월', title: '하반기 기준 신청', text: '6월분을 낸 뒤 남은 기간에 대해 신청해요' },
          { step: '9월', title: '마지막 기회', text: '남은 기간이 짧아 공제 금액도 작아요' },
        ] },
        { type: 'table', text: true, caption: '연납할 때 알아 둘 점', headers: ['항목', '내용'], rows: [
          { cells: ['공제 한도', '남은 기간에 해당하는 세액의 10% 범위에서 계산식으로 정해요'] },
          { cells: ['신청 시기', '1월이 가장 유리하고 3월, 6월, 9월에도 할 수 있어요'] },
          { cells: ['중간에 차를 팔면', '남은 기간에 해당하는 세액을 돌려받아요'] },
          { cells: ['신청 방법', '위택스나 지방자치단체 앱에서 신청하고 바로 낼 수 있어요'] },
          { cells: ['자동 신청', '한 번 연납하면 다음 해에 자동으로 고지되는 지역이 있어요'] },
        ], fn: '연세액 일시납부 공제는 지방세법 제128조제3항에 있어요. 공제율은 법에 정해진 계산식에 따라요.' },
      ] },

      { id: 's4', h2: '자동차세 납부, 언제 어떻게 내나요', sub: '6월과 12월에 절반씩', blocks: [
        { type: 'p', lead: true, ans: `연세액을 절반으로 나눠 6월과 12월에 내요. 1,999cc 차라면 한 번에 약 ${won(half)}원이에요.`, text: '납기가 있는 달의 1일 기준 소유자에게 부과해요. 연세액이 10만원 이하면 상반기에 한꺼번에 부과할 수 있어요. 신청하면 3월과 9월에 나눠 내는 방법도 있어요.' },
        { type: 'table', text: true, caption: '자동차세 납부 일정', headers: ['시기', '내용'], rows: [
          { cells: ['6월', '제1기분을 내요. 1월부터 6월까지에 해당해요'] },
          { cells: ['12월', '제2기분을 내요. 7월부터 12월까지에 해당해요'] },
          { cells: ['3월과 9월', '신청하면 각 기분을 절반씩 나눠 낼 수 있어요'] },
          { cells: ['연세액 10만원 이하', '상반기에 한 번에 부과할 수 있어요'] },
          { cells: ['차를 팔았을 때', '이전등록일 기준으로 일할 계산해 낼 수 있어요'] },
          { cells: ['미납하면', '가산금이 붙고 번호판 영치 같은 처분을 받을 수 있어요'] },
        ], fn: '납기와 분할 납부는 지방세법 제128조제1항, 일할 계산은 같은 조 제5항에 있어요.' },
        { type: 'steps', items: [
          { title: '배기량 확인', text: '자동차등록증에서 배기량과 등록일을 확인해요', meta: '1분' },
          { title: '세액 미리 계산', text: '배기량과 차령을 넣어 올해 낼 금액을 확인해요', meta: '1분', link: { label: '자동차세 계산기', href: '/insurance/auto-tax/' } },
          { title: '연납 신청', text: '1월에 위택스에서 연납을 신청하면 공제받고 한 번에 낼 수 있어요', meta: '1월', link: { label: '위택스 바로가기', href: WETAX } },
          { title: '납부', text: '계좌이체나 카드로 내요. 자동이체를 걸어 두면 놓치지 않아요', meta: '납기 안에' },
        ] },
      ] },

      { id: 's5', h2: '영업용과 전기차는 어떻게 되나요', sub: '용도와 동력에 따라 달라요', blocks: [
        { type: 'p', lead: true, ans: `영업용은 세율이 훨씬 낮아 같은 1,999cc가 ${won(COMM.totalTax)}원이에요.`, text: '택시나 렌터카처럼 영업용으로 등록한 차는 시시당 세액이 크게 낮아요. 전기차처럼 배기량이 없는 차는 배기량 기준이 아니라 정해진 정액으로 부과해요.' },
        { type: 'table', text: true, caption: '용도와 종류에 따른 차이', headers: ['구분', '내용'], rows: [
          { cells: ['비영업용 승용차', '배기량에 시시당 세액을 곱해 계산해요'] },
          { cells: ['영업용 승용차', '시시당 세액이 훨씬 낮아요'] },
          { cells: ['전기차와 수소차', '배기량이 없어 그 밖의 승용자동차로 보아 정액으로 부과해요'] },
          { cells: ['승합과 화물차', '배기량이 아니라 종류와 적재량으로 세액이 정해져요'] },
          { cells: ['장애인 차량', '요건을 갖추면 감면받을 수 있어요'] },
        ], fn: '차종별 세액은 지방세법 제127조제1항 각 호에 있어요. 감면은 지방세특례제한법에서 정해요.' },
        { type: 'tips', items: [
          { title: '배기량 1cc 차이를 보세요', text: '1,600cc를 넘으면 시시당 세액이 크게 올라요. 차를 고를 때 세금 차이를 함께 계산해 보세요.' },
          { title: '조례로 더 걷는 지역이 있어요', text: '지방자치단체가 표준세율의 50%까지 올려 정할 수 있어요. 고지서 금액이 다르면 이 때문일 수 있어요.' },
          { title: '미납은 빨리 정리하세요', text: '체납이 쌓이면 번호판을 영치당할 수 있어요. 분할 납부를 상담해 보세요.' },
        ] },
      ] },
    ],
    faq: [
      ['자동차세는 얼마 나오나요?', `배기량 1,999cc 승용차면 자동차세 ${won(R.autoTax)}원에 지방교육세를 더해 1년에 <b>${won(R.totalTax)}원</b>이에요.`],
      ['배기량별 자동차세 세율이 어떻게 되나요?', `비영업용 승용차는 1,000cc 이하 시시당 ${C.RATE_UNDER_1000}원, 1,600cc 이하 ${C.RATE_1000_1600}원, 1,600cc 초과 ${C.RATE_OVER_1600}원이에요.`],
      ['차령 경감은 언제부터 되나요?', `차령 3년차부터 매년 5%씩 줄어요. 12년을 넘으면 50%로 고정되고, 1,999cc 차는 ${won(oldGap)}원까지 줄어요.`],
      ['연납 할인은 얼마나 받나요?', '남은 기간에 해당하는 세액의 10% 범위에서 정해진 계산식으로 공제해요. 1월에 신청할 때 가장 많이 받아요.'],
      ['자동차세는 언제 내나요?', `6월과 12월에 절반씩 내요. 1,999cc 차면 한 번에 약 ${won(half)}원이에요. 연세액이 10만원 이하면 상반기에 한 번에 부과할 수 있어요.`],
      ['영업용 자동차세는 얼마인가요?', `시시당 세액이 낮아 같은 1,999cc가 ${won(COMM.totalTax)}원이에요. 택시나 렌터카가 여기에 해당해요.`],
      ['전기차도 자동차세를 내나요?', '내요. 배기량이 없어 그 밖의 승용자동차로 보고 정해진 금액으로 부과해요.'],
    ],
    summary: [
      `승용차는 배기량에 시시당 세액을 곱해요. 1,999cc면 1년에 ${won(R.totalTax)}원이에요.`,
      '지방교육세가 자동차세의 30%로 함께 붙어요. 고지서에 합쳐 나와요.',
      `차령 3년차부터 5%씩 줄어 12년 이상은 50%예요. 11년 된 차는 ${won(oldGap)}원이 적어요.`,
      '6월과 12월에 절반씩 내고, 1월에 연납을 신청하면 공제를 받아요.',
    ],
    sources: [
      ['법령', '지방세법 제127조(자동차세 과세표준과 세율, 승용자동차 배기량 기준과 차령 3년 이상 경감 계산식, 조례로 표준세율의 100분의 50까지 가산), 제128조(납기와 징수방법, 연세액 일시납부 시 100분의 10 범위 공제, 연세액 10만원 이하 일괄 부과, 이전등록 시 일할 계산), 제151조(지방교육세). 지방세법 시행령(차령 산정과 세부 기준).'],
      ['정부 도구', `위택스 자동차세 계산 결과와 이 글의 금액이 같아요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '배기량에 시시당 세액을 곱하여 산정한 세액을 자동차 1대당 연세액', note: '승용차 세액 계산 (지방세법 제127조①1)' },
      { src: 1, quote: '자동차 1대의 각 기분세액 = A/2 - (A/2 × 5/100)( n - 2 )', note: '차령 경감 계산식 (제127조①2)' },
      { src: 1, quote: '차령이 12년을 초과하는 자동차에 대하여는 그 차령을 12년으로 본다', note: '경감 상한 (제127조①2)' },
      { src: 1, quote: '조례로 정하는 바에 따라 자동차세의 세율을 배기량 등을 고려하여 제1항의 표준세율의 100분의 50까지 초과하여 정할 수 있다', note: '지자체 조례 가산 (제127조③)' },
      { src: 1, quote: '납세의무자가 연세액을 한꺼번에 납부하려는 경우에는', note: '연납 규정 (제128조③)' },
      { src: 1, quote: '연세액이 10만원 이하인 자동차세는 제1항 및 제2항에도 불구하고 제1기분을 부과할 때 전액을 부과ㆍ징수할 수 있다', note: '소액 일괄 부과 (제128조④)' },
    ],
    related: [
      { kind: '계산기', label: '자동차세 계산기', href: '/insurance/auto-tax/' },
      { kind: '부동산 가이드', label: '재산세 계산과 납부', href: '/realestate/property-tax-guide/' },
      { kind: '부동산 가이드', label: '집 살 때 취득세 세율과 계산', href: '/realestate/acquisition-tax-guide/' },
    ],
  };
}
