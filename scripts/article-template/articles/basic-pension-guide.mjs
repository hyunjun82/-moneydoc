/**
 * 글 스펙: 기초연금
 *   금액과 선정기준액은 엔진(basic-pension) 상수가 만든다.
 *   수급 요건·감액·신청 문장은 claims 로 기초연금법 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/basic-pension');
  const bp = (householdType, incomeAmount) => calculators['basic-pension']({ householdType, incomeAmount }, spec);
  const C = spec.constants;

  const R = bp('single', 1e6);                            // 대표: 단독가구, 소득인정액 100만원
  const COUPLE = bp('couple', 2e6);
  const OUT = bp('single', 2.5e6);
  const yearSingle = derive(R.monthlyPension * 12);
  const yearCouple = derive(COUPLE.monthlyPension * 12);
  const coupleEach = derive(Math.round(COUPLE.monthlyPension / 2));
  const cut = derive(C.MAX_SINGLE_2026 * 2 - C.MAX_COUPLE_2026);   // 부부 감액으로 줄어드는 금액
  const link150 = derive(Math.round(C.MAX_SINGLE_2026 * 1.5));
  const link200 = derive(C.MAX_SINGLE_2026 * 2);
  const INCOMES = [5e5, 1e6, 1.5e6, 2e6, 2.5e6].map((v) => ({ v, s: bp('single', v), c: bp('couple', v) }));
  const BOKJIRO = 'https://www.bokjiro.go.kr';
  const NPS = 'https://www.nps.or.kr';

  return {
    slug: 'basic-pension-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초연금',
    title: '2026년 기초연금 수급 조건과 금액, 선정기준액부터 신청까지',
    description: `65세 이상이고 소득인정액이 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원 이하면 기초연금을 받아요. 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구는 ${won(C.MAX_COUPLE_2026)}원이에요. 선정기준액, 소득인정액, 국민연금 연계 감액, 신청 방법을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `기초연금법 요건과 2026년 고시 금액 대조 · ${VERIFIED}`,
    calc: { href: '/government/basic-pension/', label: '기초연금 계산기 바로가기' },
    hero: {
      tag: '정부지원금', line1: '기초연금 수급 조건과 금액', line2: '나도 받나요',
      sub1: `단독가구 월 ${won(C.MAX_SINGLE_2026)}원 · 부부가구 ${won(C.MAX_COUPLE_2026)}원`,
      sub2: `소득인정액이 단독 ${won(C.INCOME_THRESHOLD_SINGLE)}원 이하면 대상이에요`,
      foot: `기초연금법 요건과 2026년 고시 금액 대조 · ${VERIFIED} 검증`,
      card: { label: '단독가구 기초연금', big: won(C.MAX_SINGLE_2026), unit: '원', l1: '2026년 월 지급액', l2: `1년이면 ${won(yearSingle)}원` },
      alt: `기초연금 수급 조건과 금액. 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원`,
    },
    intro: `기초연금은 65세 이상 어르신 가운데 소득과 재산이 적은 분에게 매달 지급하는 돈이에요. 소득인정액이 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원 이하면 받을 수 있어요. 2026년 기준으로 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구는 둘이 합쳐 ${won(C.MAX_COUPLE_2026)}원이에요. 누가 받는지, 소득인정액은 어떻게 계산하는지, 국민연금을 받으면 얼마나 깎이는지, 어디서 신청하는지 정리했어요.`,
    answer: {
      label: '가구 유형과 소득인정액을 눌러 확인해 보세요',
      quick: [
        { chip: '단독 100만원', selected: true, big: `${won(R.monthlyPension)}원`, unit: '월 기초연금', sub: `1년이면 ${won(yearSingle)}원` },
        { chip: '부부 200만원', selected: false, big: `${won(COUPLE.monthlyPension)}원`, unit: '부부 합계', sub: `1인당 약 ${won(coupleEach)}원` },
        { chip: '단독 250만원', selected: false, big: `${won(OUT.monthlyPension)}원`, unit: '월 기초연금', sub: `선정기준액 ${won(C.INCOME_THRESHOLD_SINGLE)}원을 넘어 대상이 아니에요` },
      ],
      boxes: [
        { title: '65세 이상 70% 수준이 대상이에요', text: '선정기준액은 65세 이상 인구의 70%가 받도록 매년 정해요' },
        { title: '소득만 보는 게 아니에요', text: '재산을 소득으로 환산해 더한 소득인정액으로 판단해요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 기초연금',
      rows: [
        ['나이', '만 65세 이상'],
        ['소득 기준', `소득인정액이 단독 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부 ${won(C.INCOME_THRESHOLD_COUPLE)}원 이하`],
        ['2026년 금액', `단독 월 ${won(C.MAX_SINGLE_2026)}원, 부부 합계 ${won(C.MAX_COUPLE_2026)}원`],
        ['소득인정액', '소득평가액과 재산의 소득환산액을 더한 금액'],
        ['부부 감액', '둘 다 받으면 각자 20%씩 깎아요'],
        ['국민연금 연계', '국민연금이 많으면 기초연금이 줄어들 수 있어요'],
        ['제외 대상', '공무원연금 등 직역연금 수급자와 그 배우자는 원칙적으로 제외예요'],
        ['신청', '주소지 행정복지센터나 국민연금공단, 복지로에서 신청해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '기초연금 수급 조건, 누가 받나요', sub: '65세 이상이고 소득인정액이 기준 이하', blocks: [
        { type: 'p', lead: true, ans: `만 65세 이상이고 소득인정액이 선정기준액 이하면 받아요.`, text: '선정기준액은 보건복지부장관이 매년 고시하고, 65세 이상 인구의 70% 수준이 받도록 정해요. 다만 공무원연금이나 사학연금 같은 직역연금을 받는 사람과 그 배우자는 원칙적으로 대상에서 빠져요.' },
        { type: 'tree', id: 'bpTree', ok: { title: '기초연금을 받을 수 있어요', text: ' 주소지 행정복지센터나 국민연금공단에서 신청하면 돼요. 신청한 달부터 지급돼요.' },
          questions: [
            { q: '만 65세가 되었나요?', hint: '생일이 지나 만 65세가 되는 달부터 대상이에요. 한 달 전부터 미리 신청할 수 있어요',
              no: { title: '아직 대상이 아니에요', text: ' 만 65세가 되기 한 달 전부터 신청할 수 있어요. 생일이 있는 달을 확인해 두세요.' } },
            { q: '소득인정액이 선정기준액 이하인가요?', hint: `단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원 이하이면 예`,
              no: { title: '지금은 대상이 아니에요', text: ' 소득이나 재산이 줄면 다시 대상이 될 수 있어요. 선정기준액은 매년 바뀌니 해마다 확인해 보세요.' } },
            { q: '공무원연금 같은 직역연금을 받지 않나요?', hint: '공무원연금, 사학연금, 군인연금을 받고 있다면 아니오',
              no: { title: '원칙적으로 제외예요', text: ' 직역연금 수급자와 그 배우자는 대상에서 빠져요. 다만 일부 예외가 있으니 주민센터에서 확인해 보세요.' } },
          ] },
        { type: 'note', title: '만 65세 생일 한 달 전부터 신청하세요', text: '기초연금은 신청한 날이 속한 달부터 지급돼요. 미리 신청해 두면 생일이 있는 달부터 바로 받을 수 있어요.' },
      ] },

      { id: 's2', h2: '선정기준액은 얼마인가요', sub: '단독가구와 부부가구가 달라요', blocks: [
        { type: 'p', lead: true, ans: `2026년 선정기준액은 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원이에요.`, text: `이 금액 이하면 기초연금을 받아요. 부부가구 기준은 단독가구의 160%로 정해요. 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구는 둘이 합쳐 ${won(C.MAX_COUPLE_2026)}원을 받아요.` },
        { type: 'table', id: 'incTbl2', compact: true, x: [2], net: 3, caption: '소득인정액에 따른 기초연금 (2026년 기준)', headers: ['소득인정액', '단독가구', '부부가구', '단독 연간'],
          rows: INCOMES.map(({ v, s, c }) => ({ hi: v === 1e6, cells: [`${man(v)}원`, s.isEligible ? `${won(s.monthlyPension)}원` : '대상 아님', c.isEligible ? `${won(c.monthlyPension)}원` : '대상 아님', s.isEligible ? `${won(derive(s.monthlyPension * 12))}원` : '0원'] })),
          moreLabel: '연간 금액까지 보기',
          fn: '부부가구 금액은 두 사람이 함께 받는 합계예요. 실제 지급액은 소득 수준에 따라 일부 줄어들 수 있어요.' },
        { type: 'widget', label: '내 기초연금 확인', title: '내 소득인정액으로 바로 보기', note: '가구 유형과 소득인정액을 넣으면 대상 여부와 월 지급액이 나와요. 소득인정액은 소득평가액과 재산 소득환산액을 더한 금액이에요.',
          inputs: [
            { id: 'bh', label: '가구 유형', type: 'select', value: 'single', options: [['single', '단독가구'], ['couple', '부부가구']] },
            { id: 'bi', label: '소득인정액 (만원)', type: 'number', value: 100, min: 0, max: 1000, step: 10 },
          ],
          outputs: [{ id: 'bok', label: '수급 여부' }, { id: 'bmon', label: '월 기초연금' }, { id: 'byear', label: '연간 합계' }],
          port: `
  function basicPension(type, income){
    var threshold = type === 'single' ? ${C.INCOME_THRESHOLD_SINGLE} : ${C.INCOME_THRESHOLD_COUPLE};
    var ok = income <= threshold;
    var monthly = ok ? (type === 'single' ? ${C.MAX_SINGLE_2026} : ${C.MAX_COUPLE_2026}) : 0;
    return { ok: ok, monthly: monthly, year: monthly * 12 };
  }`,
          js: `
  function bprender(){ var t=document.getElementById('bh').value, i=(+document.getElementById('bi').value||0)*1e4; var r=basicPension(t,i);
    document.getElementById('bok').textContent=r.ok?'대상이에요':'대상이 아니에요'; document.getElementById('bmon').textContent=won(r.monthly)+'원'; document.getElementById('byear').textContent=won(r.year)+'원'; }
  ['bh','bi'].forEach(function(id){document.getElementById(id).addEventListener('input',bprender);document.getElementById(id).addEventListener('change',bprender)}); bprender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let v = 0; v <= 600; v += 5) for (const t of ['single', 'couple']) {
              n++;
              const e = bp(t, v * 1e4);
              const q = port.basicPension(t, v * 1e4);
              if (q.monthly !== e.monthlyPension || q.ok !== e.isEligible) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '경계에 걸치면 일부만 받기도 해요', text: '소득인정액이 선정기준액에 가까우면 지급액이 줄어드는 구간이 있어요. 정확한 금액은 신청 뒤 결정 통지서로 확인하세요.' },
      ] },

      { id: 's3', h2: '소득인정액은 어떻게 계산하나요', sub: '소득평가액과 재산 환산액을 더해요', blocks: [
        { type: 'p', lead: true, ans: '일해서 번 돈과 연금 같은 소득에, 집과 예금 같은 재산을 소득으로 바꾼 금액을 더해요.', text: '재산이 많아도 소득이 없으면 탈락하는 이유가 여기에 있어요. 반대로 근로소득은 일정 금액을 빼 주고 남은 금액의 일부만 반영해 근로 의욕을 꺾지 않도록 하고 있어요.' },
        { type: 'flow', label: '소득인정액이 만들어지는 순서', steps: [
          { label: '근로와 사업소득', value: '소득평가액', sub: '공제 후 반영', op: '+' },
          { label: '재산', value: '소득환산액', sub: '기본재산액을 뺀 뒤 환산', op: '=' },
          { label: '소득인정액', value: '두 금액의 합', sub: '선정기준액과 비교', op: '→' },
          { label: '수급 여부', value: '기준 이하면 지급', sub: `단독 ${won(C.INCOME_THRESHOLD_SINGLE)}원` },
        ] },
        { type: 'table', text: true, caption: '소득인정액에 들어가는 항목', headers: ['구분', '내용'], rows: [
          { cells: ['근로소득', '월급에서 정해진 금액을 뺀 뒤 남은 금액의 일부만 반영해요'] },
          { cells: ['사업과 임대소득', '필요경비를 뺀 금액이 그대로 들어가요'] },
          { cells: ['공적연금', '국민연금 같은 연금 수령액이 소득으로 잡혀요'] },
          { cells: ['일반재산', '집과 토지는 지역별 기본재산액을 뺀 뒤 환산해요'] },
          { cells: ['금융재산', '예금과 적금은 일정 금액을 뺀 뒤 환산해요'] },
          { cells: ['부채', '빚은 재산에서 빼 줘요'] },
          { cells: ['고급 자동차와 회원권', '전액이 소득으로 잡히는 경우가 있어요'] },
        ], fn: '소득인정액의 정의는 기초연금법 제2조제4호이고, 소득과 재산의 범위는 시행령에서 정해요.' },
        { type: 'tips', items: [
          { title: '증여해도 바로 빠지지 않아요', text: '재산을 자녀에게 넘겨도 일정 기간은 본인 재산으로 보고 계산할 수 있어요.' },
          { title: '지역에 따라 공제액이 달라요', text: '대도시와 중소도시, 농어촌의 기본재산 공제액이 달라요. 같은 재산이어도 결과가 달라질 수 있어요.' },
          { title: '모의계산을 먼저 해 보세요', text: '복지로에서 소득과 재산을 넣어 대상 여부를 미리 확인할 수 있어요.' },
        ] },
      ] },

      { id: 's4', h2: '국민연금 연계 감액과 부부 감액은 뭔가요', sub: '많이 받으면 기초연금이 줄어요', blocks: [
        { type: 'p', lead: true, ans: `국민연금 수령액이 기준연금액의 150%인 ${won(link150)}원을 넘으면 기초연금이 줄어들 수 있어요.`, text: `150% 이하면 기초연금을 전액 받아요. 150%를 넘고 200%인 ${won(link200)}원 이하인 구간에서는 정해진 방식으로 조금씩 줄어요. 부부가 둘 다 받는 경우에는 각자 20%씩 깎아요.` },
        { type: 'table', text: true, caption: '기초연금이 줄어드는 경우', headers: ['상황', '어떻게 되나요'], rows: [
          { cells: [`국민연금이 ${won(link150)}원 이하`, '기초연금을 기준연금액 그대로 받아요'] },
          { cells: [`국민연금이 ${won(link150)}원 초과 ${won(link200)}원 이하`, '정해진 방식으로 기초연금이 조금 줄어요'] },
          { cells: ['부부가 둘 다 수급', '각자의 기초연금에서 20%씩 깎아요'] },
          { cells: ['소득인정액이 기준에 가까움', '선정기준액에 가까울수록 지급액이 줄어드는 구간이 있어요'] },
          { cells: ['직역연금 수급자와 배우자', '원칙적으로 지급 대상에서 빠져요'] },
        ], fn: '국민연금 연계는 기초연금법 제6조, 부부 감액은 제8조제1항에 있어요.' },
        { type: 'p', ans: `부부가 함께 받으면 각각 다 받을 때보다 ${won(cut)}원이 줄어요.`, text: `단독가구 두 사람이면 ${won(derive(C.MAX_SINGLE_2026 * 2))}원인데, 부부가구는 ${won(C.MAX_COUPLE_2026)}원이에요. 그래도 한 사람만 받는 것보다는 훨씬 많아요.` },
        { type: 'note', title: '국민연금을 낸 게 손해는 아니에요', text: '기초연금이 줄어도 국민연금 자체가 더 크기 때문에 전체 받는 돈은 늘어나요. 국민연금 가입을 미루거나 해지할 이유가 되지 않아요.' },
      ] },

      { id: 's5', h2: '기초연금 신청, 어디서 어떻게 하나요', sub: '주민센터, 국민연금공단, 복지로', blocks: [
        { type: 'p', lead: true, ans: '주소지 행정복지센터나 가까운 국민연금공단 지사에서 신청하면 돼요.', text: '온라인은 복지로에서 신청할 수 있어요. 신청한 날이 속한 달부터 지급되기 때문에 미루면 그만큼 못 받아요. 거동이 불편하면 찾아뵙는 서비스를 신청할 수도 있어요.' },
        { type: 'steps', items: [
          { title: '대상 여부 확인', text: '가구 유형과 소득인정액을 넣어 대상인지 먼저 확인해요', meta: '1분', link: { label: '기초연금 계산기', href: '/government/basic-pension/' } },
          { title: '서류 준비', text: '신분증, 통장 사본, 배우자 금융정보 제공 동의서를 준비해요', meta: '10분' },
          { title: '신청', text: '행정복지센터나 국민연금공단에 내거나 복지로에서 온라인으로 신청해요', meta: '만 65세 생일 한 달 전부터', link: { label: '복지로 바로가기', href: BOKJIRO } },
          { title: '결정 통지와 지급', text: '조사 후 결정 통지서를 받고, 신청한 달부터 매달 지급돼요', meta: '보통 한 달 안', link: { label: '국민연금공단', href: NPS } },
        ] },
        { type: 'table', text: true, caption: '신청할 때 필요한 서류', headers: ['서류', '설명'], rows: [
          { cells: ['신분증', '주민등록증이나 운전면허증'] },
          { cells: ['본인 명의 통장 사본', '연금을 받을 계좌예요'] },
          { cells: ['금융정보 등 제공 동의서', '본인과 배우자 모두 내야 해요'] },
          { cells: ['전월세 계약서', '전세나 월세로 살고 있다면 필요해요'] },
          { cells: ['소득과 재산 신고서', '주민센터에서 작성하면 돼요'] },
        ], fn: '금융정보 제공 동의 서면은 기초연금법 제10조제2항에 근거가 있어요.' },
        { type: 'tips', items: [
          { title: '탈락해도 이의신청을 할 수 있어요', text: '결정에 이의가 있으면 통지를 받은 날부터 정해진 기간 안에 이의신청을 낼 수 있어요.' },
          { title: '해마다 다시 확인해요', text: '소득과 재산은 매년 다시 조사해요. 재산이 늘거나 줄면 지급액이 바뀔 수 있어요.' },
          { title: '변동이 있으면 신고하세요', text: '주소나 계좌, 혼인 상태가 바뀌면 신고해야 해요. 신고하지 않으면 나중에 환수될 수 있어요.' },
        ] },
      ] },
    ],
    faq: [
      ['기초연금 수급 조건이 뭔가요?', `만 65세 이상이고 소득인정액이 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원 이하면 받아요.`],
      ['기초연금은 얼마 받나요?', `2026년 기준 단독가구는 월 <b>${won(C.MAX_SINGLE_2026)}원</b>, 부부가구는 둘이 합쳐 ${won(C.MAX_COUPLE_2026)}원이에요.`],
      ['선정기준액은 어떻게 정해지나요?', '보건복지부장관이 매년 고시해요. 65세 이상 인구 가운데 70% 수준이 받도록 정하고 있어요.'],
      ['소득인정액은 어떻게 계산하나요?', '소득평가액과 재산의 소득환산액을 더한 금액이에요. 근로소득은 공제 후 일부만 반영하고, 부채는 재산에서 빼 줘요.'],
      ['국민연금을 받으면 기초연금이 깎이나요?', `국민연금이 기준연금액의 150%인 ${won(link150)}원을 넘으면 줄어들 수 있어요. 그래도 전체 받는 돈은 늘어나요.`],
      ['부부가 함께 받으면 얼마인가요?', `각자 20%씩 깎여서 둘이 합쳐 ${won(C.MAX_COUPLE_2026)}원이에요. 각각 다 받을 때보다 ${won(cut)}원 적어요.`],
      ['기초연금 신청은 어디서 하나요?', '주소지 행정복지센터나 국민연금공단 지사에서 신청해요. 복지로에서 온라인으로도 할 수 있어요.'],
    ],
    summary: [
      `만 65세 이상이고 소득인정액이 단독 ${won(C.INCOME_THRESHOLD_SINGLE)}원 이하면 대상이에요.`,
      `2026년 금액은 단독가구 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구 합계 ${won(C.MAX_COUPLE_2026)}원이에요.`,
      '소득인정액은 소득평가액과 재산의 소득환산액을 더해 계산해요.',
      '신청한 달부터 지급되니 만 65세 생일 한 달 전에 미리 신청하세요.',
    ],
    sources: [
      ['법령', '기초연금법 제2조(소득인정액 정의), 제3조(65세 이상, 선정기준액, 수급자 100분의 70 수준, 직역연금 수급자 제외), 제6조(국민연금 급여액에 따른 기초연금액 특례, 기준연금액의 100분의 150과 100분의 200), 제8조(부부 모두 수급 시 100분의 20 감액), 제10조(지급 신청과 금융정보 제공 동의), 제14조(신청한 날이 속하는 달부터 지급), 제22조(이의신청). 기초연금법 시행령(선정기준액과 소득인정액 산정).'],
      ['정부 도구', `보건복지부가 고시한 2026년 선정기준액과 기준연금액을 그대로 반영했어요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '기초연금은 65세 이상인 사람으로서 소득인정액이 보건복지부장관이 정하여 고시하는 금액(이하 “선정기준액”이라 한다) 이하인 사람에게 지급한다', note: '수급 요건 (기초연금법 제3조①)' },
      { src: 1, quote: '65세 이상인 사람 중 기초연금 수급자가 100분의 70 수준이 되도록 한다', note: '선정기준액 설정 기준 (제3조②)' },
      { src: 1, quote: '본인과 그 배우자가 모두 기초연금 수급권자인 경우에는 각각의 기초연금액에서 기초연금액의 100분의 20에 해당하는 금액을 감액한다', note: '부부 감액 20% (제8조①)' },
      { src: 1, quote: '기준연금액의 100분의 150 이하인 사람에게 지급하는 기초연금액은 기준연금액으로 한다', note: '국민연금 연계 기준 (제6조①)' },
      { src: 1, quote: '기초연금의 지급을 신청한 날이 속하는 달부터', note: '신청한 달부터 지급 (제14조①)' },
      { src: 1, quote: '“소득인정액”이란 본인 및 배우자의 소득평가액과 재산의 소득환산액을 합산한 금액을 말한다', note: '소득인정액 정의 (제2조4)' },
      { src: 2, quote: '배우자가 없는 노인가구의 선정기준액 및 저소득자 선정기준액에 100분의 160을 곱한 금액으로 한다', note: '부부가구 선정기준액은 단독의 160% (시행령 제4조②)' },
      { src: 2, quote: '전년도 12월 31일까지 보건복지부장관이 결정ㆍ고시하고, 1월 1일부터 12월 31일까지 적용한다', note: '선정기준액 고시 시점 (시행령 제4조④)' },
    ],
    related: [
      { kind: '계산기', label: '기초연금 계산기', href: '/government/basic-pension/' },
      { kind: '연금 계산기', label: '국민연금 예상 수령액', href: '/pension/national-pension/' },
      { kind: '정부지원금 가이드', label: '2026년 실업급여 얼마나 받나요', href: '/government/unemployment-benefit-guide/' },
    ],
  };
}
