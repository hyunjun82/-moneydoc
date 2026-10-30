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
  
  return {
    slug: 'basic-pension-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초연금',
    title: '2026년 기초연금 수급 조건과 금액, 선정기준액부터 신청까지',
    description: `65세 이상이고 소득인정액이 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원 이하면 기초연금을 받아요. 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구는 ${won(C.MAX_COUPLE_2026)}원이에요. 선정기준액, 소득인정액, 국민연금 연계 감액, 신청 방법을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `기초연금법 요건과 2026년 고시 금액 대조 · ${VERIFIED}`,
    calc: { href: '/basic-pension/calculator/', label: '기초연금 계산기 바로가기' },
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
        ['국민연금 연계', `국민연금 급여액이 ${won(link150)}원을 넘으면 줄어들 수 있어요`],
        ['제외 대상', '공무원연금 등 직역연금 수급자와 그 배우자는 원칙적으로 제외예요'],
        ['신청', '생일이 속한 달의 한 달 전부터, 주소지와 상관없이 신청해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '기초연금 수급 조건, 누가 받나요', sub: '65세 이상이고 소득인정액이 기준 이하', blocks: [
        { type: 'p', lead: true, ans: `만 65세 이상이고 소득인정액이 선정기준액 이하면 받아요.`, text: '선정기준액은 보건복지부장관이 매년 고시하고, 65세 이상 인구의 70% 수준이 받도록 정해요. 다만 공무원연금이나 사학연금 같은 직역연금을 받는 사람과 그 배우자는 원칙적으로 대상에서 빠져요.' },
        { type: 'tree', id: 'bpTree', ok: { title: '기초연금을 받을 수 있어요', text: ' 주소지와 상관없이 행정복지센터나 국민연금공단에서 신청하면 돼요. 신청한 달부터 지급돼요.' },
          questions: [
            { q: '만 65세가 되었나요?', hint: '만 65세가 되는 생일이 속한 달의 한 달 전부터 미리 신청할 수 있어요',
              no: { title: '아직 대상이 아니에요', text: ' 생일이 속한 달의 한 달 전부터 신청할 수 있어요. 생일이 있는 달을 확인해 두세요.' } },
            { q: '소득인정액이 선정기준액 이하인가요?', hint: `단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원 이하이면 예`,
              no: { title: '지금은 대상이 아니에요', text: ' 소득이나 재산이 줄면 다시 대상이 될 수 있어요. 선정기준액은 매년 바뀌니 해마다 확인해 보세요.' } },
            { q: '공무원연금 같은 직역연금을 받지 않나요?', hint: '공무원·사학·군인·별정우체국 연금을 받거나 퇴직연금일시금을 받았다면 아니오',
              no: { title: '원칙적으로 제외예요', text: ' 직역연금 수급권자와 그 배우자는 대상에서 빠져요. 국민연금과 이어 받는 연계퇴직연금은 직역에서 일한 기간이 10년 이상일 때만 빠져요.' } },
          ] },
        { type: 'note', title: '생일이 속한 달의 한 달 전부터 신청할 수 있어요', text: '기초연금은 신청한 날이 속한 달부터 지급돼요. 늦게 신청하면 그만큼 받지 못해요.' },
      ] },

      { id: 's2', h2: '선정기준액은 얼마인가요', sub: '단독가구와 부부가구가 달라요', blocks: [
        { type: 'p', lead: true, ans: `2026년 선정기준액은 단독가구 ${won(C.INCOME_THRESHOLD_SINGLE)}원, 부부가구 ${won(C.INCOME_THRESHOLD_COUPLE)}원이에요.`, text: `이 금액 이하면 기초연금을 받아요. 부부가구 기준은 단독가구의 160%로 정해요. 단독가구는 월 ${won(C.MAX_SINGLE_2026)}원, 부부가구는 둘이 합쳐 ${won(C.MAX_COUPLE_2026)}원을 받아요.` },
        { type: 'table', id: 'incTbl2', compact: true, x: [2], net: 3, caption: '소득인정액에 따른 기초연금 (2026년 기준)', headers: ['소득인정액', '단독가구', '부부가구', '단독 연간'],
          rows: INCOMES.map(({ v, s, c }) => ({ hi: v === 1e6, cells: [`${man(v)}원`, s.isEligible ? `${won(s.monthlyPension)}원` : '대상 아님', c.isEligible ? `${won(c.monthlyPension)}원` : '대상 아님', s.isEligible ? `${won(derive(s.monthlyPension * 12))}원` : '0원'] })),
          moreLabel: '연간 금액까지 보기',
          fn: '부부가구 금액은 두 사람이 함께 받는 합계예요. 소득인정액과 기초연금 전액을 더한 금액이 선정기준액을 넘으면 표 금액보다 줄어들 수 있어요. 단독가구는 200만원 행과 250만원 행 사이에 이 구간이 있어요.' },
        { type: 'widget', label: '내 기초연금 확인', title: '내 소득인정액으로 바로 보기', note: '가구 유형과 소득인정액을 넣으면 대상 여부와 국민연금이 없을 때 월 지급액이 나와요. 선정기준액에 가까운 감액 구간이면 금액 대신 감액될 수 있다고 보여 줘요. 부부가구는 둘 다 받는 경우예요.',
          inputs: [
            { id: 'bh', label: '가구 유형', type: 'select', value: 'single', options: [['single', '단독가구'], ['couple', '부부가구']] },
            { id: 'bi', label: '소득인정액 (만원)', type: 'number', value: 100, min: 0, max: 1000, step: 10 },
          ],
          outputs: [{ id: 'bok', label: '수급 여부' }, { id: 'bmon', label: '월 기초연금' }, { id: 'byear', label: '연간 합계' }],
          port: `
  function basicPension(type, income){
    var threshold = type === 'single' ? ${C.INCOME_THRESHOLD_SINGLE} : ${C.INCOME_THRESHOLD_COUPLE};
    var full = type === 'single' ? ${C.MAX_SINGLE_2026} : ${C.MAX_COUPLE_2026};
    var ok = income <= threshold;
    var zone = ok && income + full > threshold;
    var monthly = ok && !zone ? full : 0;
    return { ok: ok, zone: zone, monthly: monthly, year: monthly * 12 };
  }`,
          js: `
  function bprender(){ var t=document.getElementById('bh').value, i=(+document.getElementById('bi').value||0)*1e4; var r=basicPension(t,i);
    document.getElementById('bok').textContent=r.ok?'대상이에요':'대상이 아니에요'; document.getElementById('bmon').textContent=r.zone?'감액될 수 있어요':won(r.monthly)+'원'; document.getElementById('byear').textContent=r.zone?'감액 구간':won(r.year)+'원'; }
  ['bh','bi'].forEach(function(id){document.getElementById(id).addEventListener('input',bprender);document.getElementById(id).addEventListener('change',bprender)}); bprender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let v = 0; v <= 600; v += 5) for (const t of ['single', 'couple']) {
              n++;
              const e = bp(t, v * 1e4);
              const q = port.basicPension(t, v * 1e4);
              // 엔진은 선정기준액 근처 감액을 계산하지 않는다(ENGINE-ISSUES #24). 감액 구간에서는 금액을 보여 주지 않는다
              const zone = e.isEligible && v * 1e4 + (t === 'single' ? C.MAX_SINGLE_2026 : C.MAX_COUPLE_2026) > (t === 'single' ? C.INCOME_THRESHOLD_SINGLE : C.INCOME_THRESHOLD_COUPLE);
              if (q.ok !== e.isEligible || q.zone !== zone || (!zone && q.monthly !== e.monthlyPension)) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '선정기준액에 가까우면 일부만 받아요', text: '소득인정액에 기초연금을 더한 금액이 선정기준액을 넘으면 감액돼요. 단독은 선정기준액에서 소득인정액을 뺀 금액을 받고, 그 금액이 기준연금액의 10% 이하면 10%를 받아요. 부부감액 편에 금액 예시가 있어요.', link: { href: '/basic-pension/couple/', label: '기초연금 부부감액' } },
      ] },

      { id: 's3', h2: '소득인정액은 어떻게 계산하나요', sub: '소득평가액과 재산 환산액을 더해요', blocks: [
        { type: 'p', lead: true, ans: '일해서 번 돈과 연금 같은 소득에, 집과 예금 같은 재산을 소득으로 바꾼 금액을 더해요.', text: '소득이 없어도 재산이 많으면 탈락할 수 있는 이유가 여기에 있어요. 근로소득만 정해진 금액을 빼고 남은 금액의 일부를 반영하고, 다른 소득은 그대로 더해요.' },
        { type: 'flow', label: '소득인정액이 만들어지는 순서', steps: [
          { label: '근로·사업·연금 같은 소득', value: '소득평가액', sub: '근로소득만 공제 후 일부 반영', op: '+' },
          { label: '재산', value: '소득환산액', sub: '기본재산액을 뺀 뒤 환산', op: '=' },
          { label: '소득인정액', value: '두 금액의 합', sub: '선정기준액과 비교', op: '→' },
          { label: '수급 여부', value: '기준 이하면 지급', sub: `단독 ${won(C.INCOME_THRESHOLD_SINGLE)}원` },
        ] },
        { type: 'table', text: true, caption: '소득인정액에 들어가는 항목', headers: ['구분', '내용'], rows: [
          { cells: ['근로소득', '월급에서 정해진 금액을 뺀 뒤 남은 금액의 일부만 반영해요'] },
          { cells: ['사업소득', '소득세법에서 말하는 사업소득이 들어가요'] },
          { cells: ['공적이전소득', '국민연금·공무원연금 같은 법에 따라 정기적으로 받는 연금과 수당이 소득으로 잡혀요'] },
          { cells: ['일반재산', '집과 토지, 전세금을 포함한 임차보증금, 자동차, 회원권 등이에요. 지역별 기본재산액을 뺀 뒤 환산해요'] },
          { cells: ['금융재산', '보통예금은 3개월 이내 평균잔액, 정기예금과 적금은 잔액이나 총 납입액으로 보고 정해진 금액을 뺀 뒤 환산해요'] },
          { cells: ['부채', '빚은 재산에서 빼 줘요'] },
        ], fn: '소득인정액의 정의는 기초연금법 제2조제4호이고, 소득과 재산의 범위는 시행령에서 정해요.' },
        { type: 'p', ans: '근로소득은 공제 뒤 일부만 들어가요.', text: '얼마를 빼고 얼마나 반영하는지, 월급이 얼마까지면 받는지는 근로소득기준 편에 정리했어요.', link: { href: '/basic-pension/earned-income/', label: '기초연금 근로소득기준' } },
        { type: 'p', ans: '집과 예금이 얼마까지면 받는지는 재산 산식으로 따져요.', text: '지역별 기본재산액과 금융재산 공제, 고급 자동차와 회원권 계산은 재산기준 편에 금액 예시로 있어요.', link: { href: '/basic-pension/property/', label: '기초연금 재산기준' } },
        { type: 'tips', items: [
          { title: '증여하거나 판 재산도 들어가요', text: '2011년 7월 1일 이후 다른 사람에게 증여하거나 처분한 재산도 재산으로 봐요. 본인과 배우자를 위해 쓴 사실이 입증되면 빼요.' },
          { title: '지역에 따라 공제액이 달라요', text: '대도시와 중소도시, 농어촌의 기본재산 공제액이 달라요. 같은 재산이어도 결과가 달라질 수 있어요.' },
          { title: '모의계산을 먼저 해 보세요', text: '복지로에서 소득과 재산을 넣어 대상 여부를 미리 확인할 수 있어요.' },
        ] },
      ] },

      { id: 's4', h2: '국민연금 연계 감액과 부부 감액은 뭔가요', sub: '많이 받으면 기초연금이 줄어요', blocks: [
        { type: 'p', lead: true, ans: `국민연금 수령액이 기준연금액의 150%인 ${won(link150)}원을 넘으면 기초연금이 줄어들 수 있어요.`, text: `국민연금 급여액은 부양가족연금액을 뺀 금액이에요. 150% 이하면 기초연금을 전액 받고, 넘으면 국민연금 중 소득재분배 부분이 클수록 더 줄어요. 200%인 ${won(link200)}원 이하 구간은 따로 정한 방식이 있어 덜 깎일 수 있어요.` },
        { type: 'table', text: true, caption: '기초연금이 줄어드는 경우', headers: ['상황', '어떻게 되나요'], rows: [
          { cells: [`국민연금이 ${won(link150)}원 이하`, '기초연금을 기준연금액 그대로 받아요'] },
          { cells: [`국민연금이 ${won(link150)}원 초과`, '소득재분배 부분의 3분의 2를 빼고 기준연금액의 절반을 더해요'] },
          { cells: ['부부가 둘 다 수급', '각자의 기초연금에서 20%씩 깎아요'] },
          { cells: ['소득인정액이 기준에 가까움', '선정기준액에 가까울수록 지급액이 줄어드는 구간이 있어요'] },
        ], fn: '국민연금 연계는 기초연금법 제6조, 부부 감액은 제8조제1항에 있어요.' },
        { type: 'p', ans: `부부가 함께 받으면 각각 다 받을 때보다 ${won(cut)}원이 줄어요.`, text: `부부가 각자 ${won(C.MAX_SINGLE_2026)}원씩 받는다면 ${won(derive(C.MAX_SINGLE_2026 * 2))}원이지만, 둘 다 받으면 각자 20%씩 깎여 ${won(C.MAX_COUPLE_2026)}원이에요. 한 명만 받으면 이 부부감액은 없어요.`, link: { href: '/basic-pension/couple/', label: '기초연금 부부감액' } },
        { type: 'p', ans: '국민연금을 받으면 그 금액은 소득인정액에도 들어가요.', text: '국민연금은 공적이전소득이라 수급자격을 따질 때도 반영돼요. 소득재분배 부분이 얼마일 때 얼마나 깎이는지는 국민연금 감액 편에 정리했어요.', link: { href: '/basic-pension/national-pension/', label: '기초연금 국민연금 감액' } },
      ] },

      { id: 's5', h2: '기초연금 신청, 어디서 어떻게 하나요', sub: '주민센터, 국민연금공단, 복지로', blocks: [
        { type: 'p', lead: true, ans: '주소지와 상관없이 가까운 읍·면·동 행정복지센터나 국민연금공단 지사에서 신청하면 돼요.', text: '온라인은 복지로에서 신청할 수 있어요. 신청한 날이 속한 달부터 지급되기 때문에 미루면 그만큼 못 받아요. 거동이 불편하면 찾아뵙는 서비스를 신청할 수도 있어요.' },
        { type: 'steps', items: [
          { title: '대상 여부 확인', text: '가구 유형과 소득인정액을 넣어 대상인지 먼저 봐요', meta: '신청 전', link: { label: '기초연금 계산기', href: '/basic-pension/calculator/' } },
          { title: '서류 준비', text: '소득·재산신고서, 본인과 배우자의 금융정보 등 제공 동의서, 신분 확인 서류를 준비해요', meta: '신청할 때' },
          { title: '신청', text: '행정복지센터나 국민연금공단에 내거나 복지로에서 온라인으로 신청해요', meta: '생일이 속한 달의 한 달 전부터', link: { label: '복지로 바로가기', href: BOKJIRO } },
          { title: '결정과 지급', text: '조사를 마친 뒤 결정하고, 신청한 달부터 매달 지급돼요', meta: '조사 뒤' },
        ] },
        { type: 'table', text: true, caption: '신청할 때 필요한 서류', headers: ['서류', '설명'], rows: [
          { cells: ['기초연금 지급 신청서', '보건복지부령이 정한 서식이에요'] },
          { cells: ['소득·재산신고서', '본인과 배우자의 소득과 재산을 적어 내요'] },
          { cells: ['금융정보 등 제공 동의서', '본인과 배우자 모두 내야 해요'] },
          { cells: ['신분 확인 서류', '보건복지부령이 정한 서류예요'] },
          { cells: ['위임장과 대리인 확인 서류', '대리인이 신청할 때만 내요'] },
        ], fn: '서류 목록은 기초연금법 시행령 제13조제1항, 동의 서면은 기초연금법 제10조제2항에 근거가 있어요.' },
        { type: 'tips', items: [
          { title: '탈락해도 이의신청을 할 수 있어요', text: '결정에 이의가 있으면 처분이 있음을 안 날부터 90일 안에 서면으로 이의신청을 낼 수 있어요.' },
          { title: '해마다 다시 확인해요', text: '소득과 재산은 매년 다시 조사해요. 재산이 늘거나 줄면 지급액이 바뀔 수 있어요.' },
          { title: '변동이 있으면 30일 안에 신고하세요', text: '일을 시작하거나 그만두는 등 소득이 바뀌거나, 공적연금 수급권을 얻거나 잃거나, 재산을 사거나 팔면 신고해요. 결혼·이혼·배우자 사망도 신고해요.' },
        ] },
        { type: 'p', ans: '탈락했다면 이유부터 가리고 이의신청이나 재신청을 골라요.', text: '탈락 이유별로 다시 받는 길과 재신청 시점은 탈락과 재신청 편에 정리했어요.', link: { href: '/basic-pension/rejection/', label: '기초연금 탈락과 재신청' } },
      ] },
    ],
    faq: [
      ['자녀 소유 집에 살면 소득으로 잡히나요?', '잡힐 수 있어요. 본인과 배우자가 자녀 같은 1촌 이내 직계비속 소유의 주택에 살고 그 주택가격이 고시 금액 이상이면, 정해진 방식으로 계산한 금액을 소득으로 봐요.'],
      ['기초연금도 압류될 수 있나요?', '안 돼요. 기초연금을 받을 권리는 넘기거나 담보로 잡히거나 압류할 수 없어요. 기초연금으로 받은 돈도 압류할 수 없어요.'],
      ['수급자가 사망하면 못 받은 기초연금은 어떻게 하나요?', '사망 당시 생계를 같이 한 배우자나 직계혈족과 그 배우자가 미지급 기초연금을 청구할 수 있어요.'],
      ['기초연금 금액은 해마다 바뀌나요?', '바뀌어요. 기준연금액은 전년도 기준연금액에 전국소비자물가변동률을 반영해 매년 고시하고, 그해 1월부터 12월까지 적용해요.'],
      ['해외에 오래 나가 있으면 어떻게 되나요?', '국외 체류가 60일 이상 이어지면 60일이 되는 날이 속한 달의 다음 달부터 지급이 멈춰요.'],
      ['거짓으로 받으면 어떻게 되나요?', '받은 기초연금에 이자를 붙여 환수하고, 1년 이하 징역이나 1천만원 이하 벌금을 받을 수 있어요.'],
    ],
    summary: [
      '나이와 소득인정액 두 가지가 맞는지부터 보고, 직역연금이 있으면 그것부터 확인하세요.',
      '소득이 없어도 집과 예금이 많으면 탈락할 수 있으니 재산 환산까지 계산해 보세요.',
      '선정기준액 가까이에서는 대상이어도 금액이 줄어드니 계산기 금액을 그대로 믿지 마세요.',
      '신청한 달부터 지급되니 생일이 속한 달의 한 달 전에 미리 신청하세요.',
    ],
    sources: [
      ['법령', '기초연금법 제2조(소득인정액 정의), 제3조(65세 이상, 선정기준액, 수급자 100분의 70 수준, 직역연금 수급자 제외), 제6조(국민연금 급여액에 따른 기초연금액 특례, 기준연금액의 100분의 150과 100분의 200), 제8조(부부 모두 수급 시 100분의 20 감액), 제10조(지급 신청과 금융정보 제공 동의), 제14조(신청한 날이 속하는 달부터 지급), 제22조(이의신청). 기초연금법 제15조(미지급 기초연금), 제16조(지급 정지), 제18조(신고), 제19조(환수), 제21조(수급권 보호), 제29조(벌칙). 기초연금법 시행령 제2조(소득의 범위), 제3조(재산의 범위), 제4조(선정기준액), 제5조(직역연금 일시금 수령자 제외), 제10조(150% 초과 200% 이하 구간), 제11조(감액 지급수준), 제13조(신청 서류와 이송), 제14조(금융정보 범위), 제20조(소득·재산 변동신고).'],
      ['정부 안내', `2026년 선정기준액과 기준연금액은 기초연금 계산기 상수예요 (${VERIFIED} 대조). 생일이 속한 달의 한 달 전 신청, 주소지와 상관없는 신청, 찾아뵙는 서비스는 보건복지부 보도자료(2025.12.31 배포, 대한민국 정책브리핑)에 있어요.`],
    ],
    claims: [
      { src: 2, quote: '2. 사업소득: 「소득세법」 제19조에 따른 사업소득', note: '사업소득 (시행령 제2조①2)' },
      { src: 2, quote: '가. 보통예금, 저축예금, 자유저축예금 등 요구불예금: 3개월 이내의 평균잔액', note: '요구불예금 3개월 평균잔액 (시행령 제14조①1가)' },
      { src: 2, quote: '나. 정기예금, 정기적금, 정기저축 등 저축성예금: 잔액 또는 총 납입액', note: '저축성예금 잔액·총 납입액 (시행령 제14조①1나)' },
      { src: 2, quote: '자. 「지방세법」 제124조에 따른 자동차', note: 's3 표 일반재산 행의 자동차 (시행령 제3조①1자)' },
      { src: 2, quote: '바. 주택ㆍ상가ㆍ건물 등에 대한 임차보증금(전세금을 포함한다)', note: 's3 표 전월세 보증금 (시행령 제3조①1바)' },
      { src: 2, quote: '2011년 7월 1일 이후 다른 사람에게 증여한 재산 또는 처분한 재산', note: '증여·처분 재산 팁 (시행령 제3조①3)' },
      { src: 2, quote: '본인 및 배우자를 위하여 소비한 사실이 입증된 경우는 제외한다', note: '소비 입증 시 제외 (시행령 제3조①3)' },
      { src: 2, quote: '정기적으로 지급되는 각종 수당ㆍ연금ㆍ급여나 그 밖의 금품', note: '공적이전소득 (시행령 제2조①4)' },
      { src: 2, quote: '가. 퇴직연금일시금 또는 퇴직연금공제일시금을 받은 사람', note: '트리 직역 일시금 (시행령 제5조1가)' },
      { src: 1, quote: '직역재직기간이 10년 이상인 경우의 연계퇴직연금', note: '연계퇴직연금 10년 (제3조③4)' },
      { src: 2, quote: '선정기준액에서 소득인정액을 뺀 금액이 기준연금액의 100분의 10 이하인 경우: 기준연금액의 100분의 10에 해당하는 금액', note: '감액 구간 단독 10% (시행령 제11조①1)' },
      { src: 1, quote: '부양가족연금액을 제외한 금액으로 한다', note: '국민연금 급여액 (제6조①)' },
      { src: 1, quote: '에 3분의 2를 곱한 금액', note: '소득재분배 부분 3분의 2 (제5조⑤2)' },
      { src: 1, quote: '부가연금액: 기준연금액의 2분의 1에 해당하는 금액', note: '부가연금액 (제5조⑤3)' },
      { src: 2, quote: '기준연금액의 100분의 250인 금액에서', note: '200% 이하 구간 특례 (시행령 제10조)' },
      { src: 2, quote: '1. 소득ㆍ재산신고서', note: '서류 (시행령 제13조①1)' },
      { src: 2, quote: '2. 금융정보ㆍ신용정보 또는 보험정보의 제공 동의서면(배우자의 동의서면을 포함한다)', note: '서류 (시행령 제13조①2)' },
      { src: 2, quote: '위임장 및 대리인의 인적사항을 확인할 수 있는 서류로서 보건복지부령으로 정하는 서류(대리인이 신청하는 경우에만 해당한다)', note: '대리인 서류 (시행령 제13조①4)' },
      { src: 2, quote: '주소지 관할이 아닌 특별자치시장ㆍ특별자치도지사ㆍ시장ㆍ군수ㆍ구청장이 기초연금 지급 신청서를 제출받은 경우에는', note: '주소지와 상관없는 신청 (시행령 제13조②)' },
      { src: 2, quote: '1. 취업, 퇴직, 휴직, 실직, 복직 등 근로상태의 변경에 따라 제2조제1항제1호에 따른 근로소득이 새로 발생, 증가, 감소 또는 소멸된 경우', note: '변동신고 근로 (시행령 제20조1)' },
      { src: 2, quote: '4. 제2조제1항제4호에 따른 공적이전소득의 수급권을 취득하거나 그 수급권이 소멸한 경우', note: '변동신고 공적이전소득 (시행령 제20조4)' },
      { src: 2, quote: '5. 제3조제1항에 따른 재산을 취득하거나 전부 또는 일부를 처분한 경우', note: '변동신고 재산 (시행령 제20조5)' },
      { src: 1, quote: '대통령령으로 정하는 바에 따라 30일 이내에 그 사실을', note: '30일 신고 (제18조①)' },
      { src: 1, quote: '기초연금 수급자가 결혼 또는 이혼을 하거나 그 배우자가 사망한 경우', note: '혼인 변동 신고 (제18조①4)' },
      { src: 1, quote: '그 처분이 있음을 안 날부터 90일 이내에 서면으로 하여야 한다', note: '이의신청 90일 (제22조②)' },
      { src: 2, quote: '본인 및 배우자가 1촌 이내의 직계비속이 소유하는 주택(주택가격이 보건복지부장관이 정하여 고시하는 금액 이상인 경우에 한정한다)에 거주하는 경우에는 보건복지부령으로 정하는 방법에 따라 산정된 금액은 소득으로 보아', note: 'FAQ 자녀 집 (시행령 제2조②)' },
      { src: 1, quote: '기초연금 수급권은 양도하거나 담보로 제공할 수 없으며, 압류 대상으로 할 수 없다', note: 'FAQ 압류 (제21조①)' },
      { src: 1, quote: '기초연금으로 지급받은 금품은 압류할 수 없다', note: 'FAQ 압류 (제21조②)' },
      { src: 1, quote: '그 기초연금 수급자의 사망 당시 생계를 같이 한 부양의무자(배우자와 직계혈족 및 그 배우자를 말한다)는 미지급 기초연금을 청구할 수 있다', note: 'FAQ 미지급 (제15조①)' },
      { src: 1, quote: '그 고시한 기준연금액의 적용기간은 해당 조정연도 1월부터 12월까지로 한다', note: 'FAQ 매년 고시 (제5조②)' },
      { src: 1, quote: '기초연금 수급자의 국외 체류기간이 60일 이상 지속되는 경우. 이 경우 국외 체류 60일이 되는 날을 지급 정지의 사유가 발생한 날로 본다', note: 'FAQ 국외 (제16조①3)' },
      { src: 1, quote: '그 사유가 발생한 날이 속하는 달의 다음 달부터', note: 'FAQ 국외 (제16조①)' },
      { src: 1, quote: '지급한 기초연금액에 대통령령으로 정하는 이자를 붙여 환수한다', note: 'FAQ 부정수급 (제19조①)' },
      { src: 1, quote: '거짓이나 그 밖의 부정한 방법으로 기초연금을 지급받은 사람은 1년 이하의 징역 또는 1천만원 이하의 벌금에 처한다', note: 'FAQ 부정수급 (제29조③)' },
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
      { kind: '계산기', label: '기초연금 계산기', href: '/basic-pension/calculator/' },
      { kind: '연금 계산기', label: '국민연금 예상 수령액', href: '/national-pension/' },
      { kind: '다음 질문', label: '기초연금 재산기준', href: '/basic-pension/property/' },
    ],
  };
}
