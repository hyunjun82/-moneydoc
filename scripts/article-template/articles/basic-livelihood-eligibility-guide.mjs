/**
 * 글 스펙: 기초생활수급
 *   기준 중위소득과 급여별 선정기준은 엔진(basic-livelihood-eligibility)이 만든다.
 *   급여 종류·소득인정액·신청 절차는 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/basic-livelihood-eligibility');
  const bl = (householdSize, incomeAmount) => calculators['basic-livelihood-eligibility']({ householdSize, incomeAmount }, spec);

  const R = bl(1, 6e5);                                   // 대표: 1인 가구, 소득인정액 60만원
  const H4 = bl(4, 6e5);
  const SIZES = [1, 2, 3, 4, 5, 6].map((n) => ({ n, r: bl(n, 0) }));
  const pct = (part, whole) => derive(Math.round(part / whole * 100));
  const pLive = pct(R.livelihood.threshold, R.median100);
  const pMed = pct(R.medical.threshold, R.median100);
  const pHouse = pct(R.housing.threshold, R.median100);
  const pEdu = pct(R.education.threshold, R.median100);
  const liveGap = derive(R.livelihood.threshold - 6e5);   // 1인 60만원일 때 받는 생계급여
  const BOKJIRO = 'https://www.bokjiro.go.kr';

  return {
    slug: 'basic-livelihood-eligibility-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초생활수급',
    title: '2026년 기초생활수급 조건과 급여, 소득인정액부터 신청 서류까지',
    description: `1인 가구 소득인정액이 ${won(R.livelihood.threshold)}원 이하면 생계급여를 받아요. 기준 중위소득, 급여 4종의 선정기준, 소득인정액 계산, 신청 서류를 한 번에 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `기준 중위소득과 급여별 선정기준 대조 · ${VERIFIED}`,
    calc: { href: '/basic-livelihood/calculator/', label: '기초생활수급 자격 계산기 바로가기' },
    hero: {
      tag: '정부지원금', line1: '기초생활수급 조건과 급여', line2: '나도 되나요',
      sub1: `1인 가구 생계급여 기준 ${won(R.livelihood.threshold)}원`,
      sub2: `의료 ${won(R.medical.threshold)}원 · 주거 ${won(R.housing.threshold)}원 · 교육 ${won(R.education.threshold)}원`,
      foot: `기준 중위소득과 급여별 선정기준 대조 · ${VERIFIED} 검증`,
      card: { label: '1인 생계급여 기준', big: won(R.livelihood.threshold), unit: '원', l1: '2026년 월 소득인정액', l2: `기준 중위소득 ${won(R.median100)}원` },
      alt: `기초생활수급 조건. 1인 가구 생계급여 기준은 월 ${won(R.livelihood.threshold)}원`,
    },
    intro: `기초생활보장은 소득인정액이 기준 중위소득의 일정 비율 이하인 가구를 돕는 제도예요. 생계, 의료, 주거, 교육 네 가지 급여가 있고 각각 기준선이 달라서 하나만 받는 경우도 흔해요. 1인 가구라면 소득인정액이 ${won(R.livelihood.threshold)}원 이하일 때 생계급여를, ${won(R.education.threshold)}원 이하일 때 교육급여를 받을 수 있어요. 기준 중위소득이 뭔지, 소득인정액은 어떻게 계산하는지, 어떤 서류로 신청하는지 정리했어요.`,
    answer: {
      label: '가구원 수를 눌러 생계급여 기준을 확인해 보세요',
      quick: [1, 2, 4].map((n) => {
        const r = bl(n, 0);
        return { chip: `${n}인 가구`, selected: n === 1, big: `${won(r.livelihood.threshold)}원`, unit: '생계급여 기준', sub: `기준 중위소득 ${won(r.median100)}원의 ${pLive}%` };
      }),
      boxes: [
        { title: '기준선이 급여마다 달라요', text: `생계 ${pLive}%, 의료 ${pMed}%, 주거 ${pHouse}%, 교육 ${pEdu}%로 정해져 있어요` },
        { title: '생계급여는 부족분을 채워 줘요', text: `1인 가구 소득인정액이 60만원이면 차액인 ${won(liveGap)}원이 생계급여로 들어와요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 기초생활보장',
      rows: [
        ['판단 기준', '소득인정액이 급여별 선정기준 이하인지'],
        ['기준 중위소득', `1인 ${won(R.median100)}원, 4인 ${won(H4.median100)}원 (2026년)`],
        ['생계급여', `기준 중위소득의 ${pLive}%. 1인 ${won(R.livelihood.threshold)}원`],
        ['의료급여', `${pMed}%. 1인 ${won(R.medical.threshold)}원`],
        ['주거급여', `${pHouse}%. 1인 ${won(R.housing.threshold)}원`],
        ['교육급여', `${pEdu}%. 1인 ${won(R.education.threshold)}원`],
        ['소득인정액', '소득평가액과 재산의 소득환산액을 더한 금액'],
        ['신청', '주소지 행정복지센터나 복지로에서 신청해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '기초생활수급 조건, 중위소득 얼마 이하인가요', sub: '급여마다 기준선이 달라요', blocks: [
        { type: 'p', lead: true, ans: `소득인정액이 기준 중위소득의 ${pLive}% 이하면 생계급여, ${pEdu}% 이하면 교육급여를 받아요.`, text: '기준 중위소득은 모든 가구를 소득 순으로 줄 세웠을 때 가운데 있는 가구의 소득이에요. 매년 중앙생활보장위원회 심의를 거쳐 정하고, 여기에 급여별 비율을 곱해 선정기준을 만들어요.' },
        { type: 'table', id: 'medTbl', compact: true, x: [1], net: 2, caption: '2026년 가구원 수별 급여 선정기준', headers: ['가구원 수', '기준 중위소득', '생계급여', '의료급여', '주거급여', '교육급여'],
          rows: SIZES.map(({ n, r }) => ({ hi: n === 1, cells: [`${n}인`, won(r.median100), won(r.livelihood.threshold), won(r.medical.threshold), won(r.housing.threshold), won(r.education.threshold)] })),
          moreLabel: '기준 중위소득까지 보기',
          fn: `단위: 원. 생계 ${pLive}%, 의료 ${pMed}%, 주거 ${pHouse}%, 교육 ${pEdu}% 기준이에요. 법에는 생계 30% 이상, 의료 40% 이상, 교육 50% 이상으로 하한이 정해져 있어요.` },
        { type: 'widget', label: '내 수급 자격 확인', title: '내 소득인정액으로 바로 보기', note: '가구원 수와 월 소득인정액을 넣으면 어떤 급여를 받을 수 있는지 나와요. 부양의무자 기준과 재산 기준은 따로 확인해야 해요.',
          inputs: [
            { id: 'lh', label: '가구원 수', type: 'number', value: 1, min: 1, max: 6, step: 1 },
            { id: 'li', label: '소득인정액 (만원)', type: 'number', value: 60, min: 0, max: 1000, step: 5 },
          ],
          outputs: [{ id: 'llive', label: '생계급여' }, { id: 'lmed', label: '의료급여' }, { id: 'lhouse', label: '주거급여' }, { id: 'ledu', label: '교육급여' }],
          port: `
  var MEDIAN = ${JSON.stringify(spec.tables.median100)};
  function livelihood(size, income){
    var m = MEDIAN[String(size)] || 7618369;
    function t(rate){ return Math.round(m * rate); }
    return {
      median: m,
      live: { th: t(0.32), ok: income <= t(0.32) },
      med: { th: t(0.40), ok: income <= t(0.40) },
      house: { th: t(0.48), ok: income <= t(0.48) },
      edu: { th: t(0.50), ok: income <= t(0.50) }
    };
  }`,
          js: `
  function lrender(){ var s=+document.getElementById('lh').value||1, i=(+document.getElementById('li').value||0)*1e4; var r=livelihood(s,i);
    function set(id,o){ document.getElementById(id).textContent=(o.ok?'대상 ':'대상 아님 ')+'('+won(o.th)+'원)'; }
    set('llive',r.live); set('lmed',r.med); set('lhouse',r.house); set('ledu',r.edu); }
  ['lh','li'].forEach(function(id){document.getElementById(id).addEventListener('input',lrender)}); lrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let s = 1; s <= 6; s++) for (let i = 0; i <= 500; i += 5) {
              n++;
              const e = bl(s, i * 1e4);
              const q = port.livelihood(s, i * 1e4);
              if (q.live.th !== e.livelihood.threshold || q.live.ok !== e.livelihood.isEligible || q.edu.th !== e.education.threshold) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '하나만 받는 경우가 더 흔해요', text: `기준선이 다르기 때문에 생계급여는 안 되지만 주거급여나 교육급여는 되는 경우가 많아요. 4인 가구라면 소득인정액이 ${won(H4.livelihood.threshold)}원을 넘어도 ${won(H4.housing.threshold)}원 이하면 주거급여 대상이에요.` },
      ] },

      { id: 's2', h2: '소득인정액은 어떻게 계산하나요', sub: '소득평가액과 재산 환산액을 더해요', blocks: [
        { type: 'p', lead: true, ans: '실제 소득에서 공제를 뺀 소득평가액에, 재산을 소득으로 바꾼 금액을 더해요.', text: '근로소득과 사업소득, 재산소득, 이전소득을 모두 더한 뒤 장애나 양육 같은 지출 요인과 근로를 돕기 위한 공제를 빼요. 재산은 기본재산액과 부채를 뺀 금액에 소득환산율을 곱해요.' },
        { type: 'flow', label: '소득인정액이 만들어지는 순서', steps: [
          { label: '실제 소득', value: '근로·사업·재산·이전', sub: '네 가지를 더해요', op: '−' },
          { label: '각종 공제', value: '지출·근로 유인', sub: '소득평가액이 나와요', op: '+' },
          { label: '재산 환산액', value: '기본재산액과 부채 차감 후', sub: '소득환산율을 곱해요', op: '=' },
          { label: '소득인정액', value: '선정기준과 비교', sub: `1인 생계 ${won(R.livelihood.threshold)}원` },
        ] },
        { type: 'table', text: true, caption: '소득인정액을 구성하는 항목', headers: ['구분', '내용'], rows: [
          { cells: ['근로소득', '월급에서 정해진 비율을 공제한 뒤 반영해요'] },
          { cells: ['사업소득', '필요경비를 뺀 금액이 들어가요'] },
          { cells: ['재산소득', '임대료와 이자, 배당이 들어가요'] },
          { cells: ['이전소득', '연금과 가족이 주는 돈도 소득으로 봐요'] },
          { cells: ['일반재산', '기본재산액과 부채를 뺀 뒤 소득환산율을 곱해요'] },
          { cells: ['금융재산', '예금과 적금도 환산해요. 생활준비금은 빼 줘요'] },
          { cells: ['자동차', '환산율이 높아 자동차가 있으면 탈락하기 쉬워요'] },
        ], fn: '소득인정액 산정 방법은 국민기초생활 보장법 제6조의3에 있어요. 구체적인 범위는 시행령에서 정해요.' },
        { type: 'tips', items: [
          { title: '근로를 하면 공제를 받아요', text: '일해서 번 돈은 일정 비율을 빼고 반영해요. 일한다고 바로 탈락하지 않도록 만든 장치예요.' },
          { title: '부채는 재산에서 빼 줘요', text: '금융기관 대출처럼 확인되는 부채는 재산가액에서 빼요. 증빙을 챙겨 가세요.' },
          { title: '지역에 따라 기본재산액이 달라요', text: '대도시와 중소도시, 농어촌의 공제액이 달라 같은 재산이어도 결과가 달라져요.' },
        ] },
      ] },

      { id: 's3', h2: '생계급여와 의료급여는 얼마나 받나요', sub: '급여 4종이 각각 다르게 지급돼요', blocks: [
        { type: 'p', lead: true, ans: `생계급여는 선정기준에서 소득인정액을 뺀 금액을 줘요. 1인 가구 소득인정액이 60만원이면 ${won(liveGap)}원이에요.`, text: '소득이 늘면 그만큼 급여가 줄어드는 구조라 총액은 선정기준선을 유지해요. 의료급여는 현금이 아니라 진료비 본인부담을 줄여 주는 방식이고, 주거급여는 임차료나 수선비를 지원해요.' },
        { type: 'table', text: true, caption: '급여 4종이 지원하는 내용', headers: ['급여', '내용'], rows: [
          { cells: ['생계급여', '선정기준에서 소득인정액을 뺀 금액을 현금으로 줘요'] },
          { cells: ['의료급여', '진료와 검사 비용의 본인부담을 크게 줄여 줘요'] },
          { cells: ['주거급여', '임차료와 수선유지비를 지원해요. 지역과 가구원 수에 따라 상한이 있어요'] },
          { cells: ['교육급여', '입학금, 수업료, 학용품비를 지원해요'] },
          { cells: ['해산급여', '출산했을 때 지급해요'] },
          { cells: ['장제급여', '장례 비용을 지원해요'] },
          { cells: ['자활급여', '일자리와 기술 훈련을 지원해요'] },
        ], fn: '급여의 종류는 국민기초생활 보장법 제7조제1항에 있어요. 주거급여의 구체적인 내용은 주거급여법에서 따로 정해요.' },
        { type: 'table', net: 2, caption: '가구원 수별 생계급여 기준과 최대 지급액', headers: ['가구원 수', '생계급여 기준', '소득이 0원일 때'],
          rows: SIZES.map(({ n, r }) => ({ hi: n === 1, cells: [`${n}인`, `${won(r.livelihood.threshold)}원`, `${won(r.livelihood.threshold)}원`] })),
          fn: '소득인정액이 0원이면 선정기준 전액을 받아요. 소득이 있으면 그만큼 빼고 지급해요.' },
      ] },

      { id: 's4', h2: '기초생활수급 신청 서류는 뭐가 필요한가요', sub: '주소지 행정복지센터에서 신청해요', blocks: [
        { type: 'p', lead: true, ans: '본인이나 가족, 관계인이 관할 시군구청이나 행정복지센터에 신청할 수 있어요.', text: '신청할 때 본인과 부양의무자의 금융정보 제공에 동의하는 서면을 내야 해요. 담당 공무원이 직권으로 신청할 수도 있고, 이때는 본인 동의를 받아요. 복지로에서 온라인 신청도 가능해요.' },
        { type: 'timeline', label: '신청부터 결정까지', items: [
          { step: '신청', title: '행정복지센터 방문이나 온라인', text: '신청서와 금융정보 제공 동의서를 내요' },
          { step: '조사', title: '소득과 재산 조사', text: '담당 공무원이 소득, 재산, 부양의무자를 조사해요', mark: true, tag: '보통 30일 안' },
          { step: '결정', title: '급여 결정 통지', text: '어떤 급여를 얼마나 받는지 통지서로 알려 줘요' },
          { step: '지급', title: '매월 지급', text: '결정된 급여가 계좌로 들어와요. 매년 다시 확인해요' },
        ] },
        { type: 'table', text: true, caption: '신청할 때 챙길 서류', headers: ['서류', '설명'], rows: [
          { cells: ['사회복지서비스 이용 신청서', '행정복지센터에 비치돼 있어요'] },
          { cells: ['금융정보 등 제공 동의서', '본인과 부양의무자 모두 필요해요'] },
          { cells: ['신분증', '주민등록증이나 운전면허증'] },
          { cells: ['임대차 계약서', '전세나 월세로 살면 필요해요'] },
          { cells: ['소득 증빙', '급여명세서, 근로계약서, 사업자 자료'] },
          { cells: ['부채 증빙', '대출 잔액 증명서가 있으면 재산에서 빼 줘요'] },
          { cells: ['통장 사본', '급여를 받을 본인 명의 계좌'] },
        ], fn: '금융정보 제공 동의 서면은 국민기초생활 보장법 제21조제3항에 근거가 있어요.' },
        { type: 'tips', items: [
          { title: '부양의무자 기준이 많이 완화됐어요', text: '생계급여와 의료급여에서 부양의무자 기준이 단계적으로 완화되고 있어요. 가족이 있다고 미리 포기하지 마세요.' },
          { title: '탈락해도 다시 신청할 수 있어요', text: '소득이나 재산이 바뀌면 언제든 다시 신청할 수 있어요. 결정에 이의가 있으면 이의신청도 가능해요.' },
          { title: '차상위계층 지원도 확인하세요', text: '수급자가 아니어도 차상위계층으로 받을 수 있는 지원이 있어요. 함께 상담받아 보세요.' },
          { title: '모의계산을 먼저 해 보세요', text: '복지로에서 소득과 재산을 넣어 대상 여부를 미리 확인할 수 있어요.' },
        ] },
      ] },
      { id: 's5', h2: '수급자가 되면 무엇이 달라지나요', sub: '급여 외에 붙는 혜택도 있어요', blocks: [
        { type: 'p', lead: true, ans: '급여를 받는 것 말고도 공공요금 감면과 통신비 지원 같은 혜택이 함께 붙어요.', text: '전기와 도시가스 요금 감면, 통신요금 감면, 문화누리카드처럼 수급자 자격으로 신청하는 지원이 많아요. 지자체마다 따로 주는 지원도 있으니 결정 통지를 받은 뒤 담당자에게 물어보세요.' },
        { type: 'tips', items: [
          { title: '공공요금 감면을 신청하세요', text: '전기, 도시가스, 지역난방 요금이 감면돼요. 자동으로 적용되지 않는 경우가 있어 직접 신청해야 해요.' },
          { title: '통신비도 줄어요', text: '이동통신 요금 감면 대상이에요. 통신사 대리점이나 복지로에서 신청할 수 있어요.' },
          { title: '자활사업으로 소득을 늘릴 수 있어요', text: '근로능력이 있으면 자활근로에 참여해 소득을 만들면서 급여도 함께 받을 수 있어요.' },
          { title: '해마다 다시 조사해요', text: '소득과 재산은 매년 확인해요. 상황이 바뀌면 반드시 신고해야 나중에 환수되지 않아요.' },
        ] },
      ] },
    ],
    faq: [
      ['기초생활수급 조건이 뭔가요?', `소득인정액이 급여별 선정기준 이하여야 해요. 1인 가구 생계급여는 월 <b>${won(R.livelihood.threshold)}원</b> 이하예요.`],
      ['2026년 기준 중위소득은 얼마인가요?', `1인 가구 ${won(R.median100)}원, 4인 가구 ${won(H4.median100)}원이에요. 여기에 급여별 비율을 곱해 선정기준을 정해요.`],
      ['생계급여는 얼마 받나요?', `선정기준에서 소득인정액을 뺀 금액이에요. 1인 가구 소득인정액이 60만원이면 ${won(liveGap)}원을 받아요.`],
      ['소득인정액은 어떻게 계산하나요?', '소득평가액과 재산의 소득환산액을 더해요. 재산은 기본재산액과 부채를 뺀 뒤 소득환산율을 곱해요.'],
      ['급여 종류가 어떻게 되나요?', '생계, 주거, 의료, 교육급여가 기본이고 해산급여, 장제급여, 자활급여가 있어요. 기준선이 달라 일부만 받기도 해요.'],
      ['기초생활수급 신청 서류는 뭐가 필요한가요?', '신청서와 금융정보 제공 동의서, 신분증, 임대차 계약서, 소득과 부채 증빙이 필요해요.'],
      ['부양의무자가 있으면 못 받나요?', '부양의무자 기준은 단계적으로 완화되고 있어요. 부양능력이 없거나 부양을 받을 수 없으면 받을 수 있어요.'],
    ],
    summary: [
      `소득인정액이 기준 중위소득의 생계 ${pLive}%, 의료 ${pMed}%, 주거 ${pHouse}%, 교육 ${pEdu}% 이하면 대상이에요.`,
      `1인 가구 기준 중위소득은 ${won(R.median100)}원이고 생계급여 기준은 ${won(R.livelihood.threshold)}원이에요.`,
      '소득인정액은 소득평가액과 재산의 소득환산액을 더해 계산해요.',
      '신청은 주소지 행정복지센터나 복지로에서 하고, 조사를 거쳐 급여가 결정돼요.',
    ],
    sources: [
      ['법령', '국민기초생활 보장법 제6조의2(기준 중위소득), 제6조의3(소득인정액 산정), 제7조(급여의 종류), 제8조(생계급여, 기준 중위소득의 100분의 30 이상), 제11조(주거급여), 제12조(교육급여, 100분의 50 이상), 제12조의3(의료급여, 100분의 40 이상), 제21조(급여의 신청과 금융정보 제공 동의). 국민기초생활 보장법 시행령(소득의 범위와 재산의 소득환산).'],
      ['정부 도구', `보건복지부가 고시한 2026년 기준 중위소득과 급여별 선정기준을 그대로 반영했어요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '재산의 소득환산액은 개별가구의 재산가액에서 기본재산액', note: '재산의 소득환산 (국민기초생활 보장법 제6조의3②)' },
      { src: 1, quote: '1. 생계급여 2. 주거급여 3. 의료급여 4. 교육급여', note: '급여의 종류 (제7조①)' },
      { src: 1, quote: '생계급여 선정기준은 기준 중위소득의 100분의 30 이상으로 한다', note: '생계급여 하한 (제8조②)' },
      { src: 1, quote: '의료급여 선정기준은 기준 중위소득의 100분의 40 이상으로 한다', note: '의료급여 하한 (제12조의3②)' },
      { src: 1, quote: '교육급여 선정기준은 기준 중위소득의 100분의 50 이상으로 한다', note: '교육급여 하한 (제12조③)' },
      { src: 1, quote: '수급권자와 그 친족, 그 밖의 관계인은 관할 시장ㆍ군수ㆍ구청장에게 수급권자에 대한 급여를 신청할 수 있다', note: '급여 신청 (제21조①)' },
      { src: 2, quote: '기초생활의 유지에 필요하다고 보건복지부장관이 정하여 고시하는 기본재산액', note: '기본재산액 공제 (시행령 제5조의4①1가)' },
    ],
    related: [
      { kind: '계산기', label: '기초생활수급 자격 계산기', href: '/basic-livelihood/' },
      { kind: '정부지원금 계산기', label: '기준 중위소득 계산기', href: '/median-income/' },
      { kind: '정부지원금 가이드', label: '2026년 기초연금 수급 조건과 금액', href: '/basic-pension/' },
    ],
  };
}
