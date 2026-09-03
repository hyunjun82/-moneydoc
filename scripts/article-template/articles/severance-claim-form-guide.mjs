/**
 * 글 스펙: 퇴직금 지급명령·소장
 *   청구금액은 퇴직금 엔진(severance-pay)이 만들고,
 *   인지액은 민사소송 등 인지법 제2조·제7조·제16조 산식을 그대로 계산해 derive 로 등록한다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('law/severance-pay');
  const sev = (monthlySalary) => calculators['severance-pay']({ hireDate: '2021-01-02', retireDate: '2026-01-01', monthlySalary, annualBonus: 0, unusedAnnualLeavePay: 0 }, spec);

  // 민사소송 등 인지법 제2조제1항: 소가 구간별 인지액. 제2항: 1천원 미만은 1천원, 100원 미만 절사.
  const stampRaw = (v) => v < 1e7 ? v * 50 / 10000
    : v < 1e8 ? v * 45 / 10000 + 5000
    : v < 1e9 ? v * 40 / 10000 + 55000
    : v * 35 / 10000 + 555000;
  const trim = (x) => x < 1000 ? 1000 : Math.floor(x / 100) * 100;
  const stampSuit = (v) => trim(stampRaw(v));                       // 소장 인지액
  const stampSuitOnline = (v) => trim(stampRaw(v) * 9 / 10);        // 전자소송 소장 (제16조: 10분의 9)
  const stampOrder = (v) => trim(stampRaw(v) / 10);                 // 지급명령 (제7조②: 10분의 1)
  const stampOrderOnline = (v) => trim(stampRaw(v) / 10 * 9 / 10);  // 전자 지급명령

  const R = sev(3e6);                                                // 대표: 월 300만원, 근속 5년
  const CLAIM = R.severance;
  const orderFee = derive(stampOrderOnline(CLAIM));
  const suitFee = derive(stampSuitOnline(CLAIM));
  const feeGap = derive(suitFee - orderFee);
  const CASES = [2.5e6, 3e6, 4e6].map((m) => {
    const r = sev(m);
    return { m, r, order: derive(stampOrderOnline(r.severance)), suit: derive(stampSuitOnline(r.severance)) };
  });
  const AMOUNTS = [5e6, 1e7, 2e7, 3e7, 5e7].map((v) => ({
    v, order: derive(stampOrderOnline(v)), suit: derive(stampSuitOnline(v)), paper: derive(stampSuit(v)),
  }));
  const COURT = 'https://ecfs.scourt.go.kr';
  const FORM = 'https://help.scourt.go.kr/nm/min_1/min_1_7/index.html';
  const LABOR = 'https://labor.moel.go.kr/anmtDclrCntr/main.do';

  return {
    slug: 'severance-claim-form-guide', cat: 'law', catLabel: '법률', crumb: '퇴직금 지급명령',
    title: '퇴직금 못 받았을 때 지급명령과 소장, 양식부터 제출까지',
    description: `퇴직금 ${won(CLAIM)}원을 못 받았다면 지급명령 인지대는 전자소송 기준 ${won(orderFee)}원이에요. 지급명령 신청서와 소장 양식을 어디서 받는지, 인지대와 송달료는 얼마인지, 어느 법원에 내는지 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `민사소송법과 인지법 산식 대조 · ${VERIFIED}`,
    calc: { href: '/severance/calculator/', label: '퇴직금 계산기 바로가기' },
    hero: {
      tag: '법률', line1: '퇴직금 지급명령과 소장', line2: '어떻게 내나요',
      sub1: `청구금액 ${won(CLAIM)}원이면 인지대 ${won(orderFee)}원`,
      sub2: '법정에 나가지 않고 서류만으로 진행할 수 있어요',
      foot: `민사소송법과 인지법 산식 대조 · ${VERIFIED} 검증`,
      card: { label: '지급명령 인지대', big: won(orderFee), unit: '원', l1: `청구금액 ${won(CLAIM)}원`, l2: '전자소송 기준' },
      alt: `퇴직금 지급명령 인지대. 청구금액 ${won(CLAIM)}원이면 ${won(orderFee)}원`,
    },
    intro: `노동청 진정으로도 퇴직금을 받지 못했다면 법원으로 갈 차례예요. 가장 싸고 빠른 방법은 지급명령이에요. 서류만 내면 되고 법정에 나가지 않아요. 월급 300만원으로 5년 일한 사람의 퇴직금 ${won(CLAIM)}원을 청구한다면 전자소송 인지대는 ${won(orderFee)}원이에요. 같은 금액을 소장으로 내면 ${won(suitFee)}원이라 ${won(feeGap)}원 차이가 나요. 신청서 쓰는 법, 양식 받는 곳, 비용, 관할 법원을 정리했어요.`,
    answer: {
      label: '퇴사 전 월급을 눌러 청구금액과 인지대를 확인해 보세요 (근속 5년 기준)',
      quick: CASES.map(({ m, r, order }) => ({ chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.severance)}원`, unit: '청구할 퇴직금', sub: `지급명령 인지대 ${won(order)}원 (전자소송 기준)` })),
      boxes: [
        { title: '지급명령이 가장 저렴해요', text: '소장에 붙이는 인지액의 10분의 1만 내면 되고, 전자소송이면 여기서 다시 10분의 1을 깎아 줘요' },
        { title: '이의가 없으면 판결과 같아요', text: '상대가 2주 안에 이의하지 않으면 확정판결과 같은 효력이 생겨요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 퇴직금 청구 절차',
      rows: [
        ['먼저 할 일', '노동청 진정으로 체불 임금등 사업주 확인서를 받아 두면 유리해요'],
        ['가장 빠른 방법', '지급명령 신청. 서류 심사만으로 진행돼요'],
        ['인지대', '소장 인지액의 10분의 1. 전자소송이면 다시 10분의 9'],
        ['청구금액 기준', `퇴직금 ${won(CLAIM)}원이면 지급명령 인지대 ${won(orderFee)}원`],
        ['송달료', '당사자 수와 예납 횟수에 따라 정해져요. 전자소송에서 자동 계산돼요'],
        ['관할', '채무자인 회사의 보통재판적이 있는 곳의 지방법원'],
        ['이의신청', '상대가 송달받은 날부터 2주 안에 이의하면 소송으로 넘어가요'],
        ['시효', '퇴직금도 임금이라 3년 안에 청구해야 해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '지급명령 신청서, 어떻게 쓰나요', sub: '청구 금액과 이유만 적으면 돼요', blocks: [
        { type: 'p', lead: true, ans: '채권자와 채무자, 청구 금액, 청구 이유를 적으면 끝이에요.', text: '금전을 지급하라는 청구라면 법원이 채권자의 신청만 보고 지급명령을 내려요. 상대를 법정에 부르지 않기 때문에 절차가 짧고 비용도 적어요. 다만 주소를 몰라 공시송달을 해야 하는 경우에는 쓸 수 없어요.' },
        { type: 'table', text: true, caption: '지급명령 신청서에 들어갈 내용', headers: ['항목', '어떻게 적나요'], rows: [
          { cells: ['채권자', '내 이름, 주민등록상 주소, 연락처를 적어요'] },
          { cells: ['채무자', '회사 상호와 대표자 이름, 사업장 주소를 적어요'] },
          { cells: ['청구 금액', `못 받은 퇴직금과 지연이자를 합쳐 적어요`] },
          { cells: ['청구 취지', '채무자는 채권자에게 얼마를 지급하라는 문장으로 적어요'] },
          { cells: ['청구 원인', '언제 입사해 언제 퇴사했고 퇴직금을 못 받았다는 사실을 시간 순서로 적어요'] },
          { cells: ['첨부 서류', '근로계약서, 급여명세서, 체불 임금등 사업주 확인서를 붙여요'] },
        ], fn: '지급명령은 민사소송법 제462조의 독촉절차예요. 금전이나 대체물의 지급을 구하는 청구에만 쓸 수 있어요.' },
        { type: 'note', title: '금액은 정확히 계산해서 적으세요', text: `근속과 평균임금으로 퇴직금을 먼저 계산하고, 퇴사 14일이 지난 뒤부터 붙는 지연이자를 더해 청구 금액을 정하세요.` },
        { type: 'tips', items: [
          { title: '체불 확인서를 먼저 받으세요', text: '노동청 조사로 체불 사실이 확인되면 발급돼요. 신청서에 붙이면 다툼 없이 진행될 가능성이 높아져요.' },
          { title: '회사 주소가 정확해야 해요', text: '송달이 안 되면 절차가 멈춰요. 등기부등본이나 사업자등록으로 주소를 확인하세요.' },
          { title: '대표자 개인이 아니라 법인이 상대예요', text: '법인 사업장이면 채무자는 법인이에요. 대표자 이름은 대표 자격으로만 적어요.' },
        ] },
      ] },

      { id: 's2', h2: '소장 양식은 어디서 받나요', sub: '대법원 전자소송에서 그대로 작성해요', blocks: [
        { type: 'p', lead: true, ans: '대법원 전자소송 사이트에서 양식을 고르고 화면에서 바로 작성할 수 있어요.', text: '따로 파일을 내려받아 워드로 쓸 필요가 없어요. 항목을 채우면 서식이 완성되고 첨부 서류도 올릴 수 있어요. 종이로 내고 싶다면 법원 홈페이지의 양식 모음에서 내려받아 인쇄하면 돼요.' },
        { type: 'table', text: true, caption: '상황에 맞는 절차와 양식', headers: ['상황', '어떤 절차인가요'], rows: [
          { cells: ['상대가 다투지 않을 것 같을 때', '지급명령 신청서. 가장 싸고 빨라요'] },
          { cells: ['청구금액이 3천만원 이하일 때', '소액사건 소장. 이행권고결정으로 빨리 끝나기도 해요'] },
          { cells: ['상대가 이미 다투고 있을 때', '민사 소장. 처음부터 소송으로 가는 편이 나아요'] },
          { cells: ['지급명령에 이의가 들어왔을 때', '별도 신청 없이 그대로 소송으로 넘어가요'] },
          { cells: ['회사가 도산했을 때', '대지급금 청구를 먼저 검토하세요'] },
        ], fn: '소액사건 범위와 이행권고결정은 소액사건심판법에 있어요. 지급명령에 이의가 있으면 신청한 때에 소가 제기된 것으로 봐요.' },
        { type: 'steps', items: [
          { title: '청구금액 확정', text: '퇴직금과 지연이자를 계산해 청구할 금액을 정해요', meta: '3분', link: { label: '퇴직금 계산기', href: '/severance/' } },
          { title: '전자소송 회원가입', text: '공동인증서나 간편인증으로 가입하고 사용자 등록을 해요', meta: '10분', link: { label: '전자소송 바로가기', href: COURT } },
          { title: '서식 작성', text: '지급명령 신청서나 소장을 화면에서 작성하고 증거를 올려요', meta: '30분', link: { label: '법원 양식 모음', href: FORM } },
          { title: '인지대와 송달료 납부', text: '화면에서 계산된 금액을 카드나 계좌이체로 내고 제출해요', meta: '5분' },
        ] },
      ] },

      { id: 's3', h2: '인지대와 송달료는 얼마인가요', sub: '청구금액에 따라 정해져요', blocks: [
        { type: 'p', lead: true, ans: `퇴직금 ${won(CLAIM)}원을 청구하면 지급명령 인지대는 전자소송 기준 ${won(orderFee)}원이에요.`, text: `소장이라면 ${won(suitFee)}원이라 ${won(feeGap)}원 더 들어요. 인지액은 청구금액에 법으로 정해진 비율을 곱해 구하고, 지급명령은 그 10분의 1이에요. 전자문서로 내면 다시 10분의 9만 내요.` },
        { type: 'flow', label: '인지대가 정해지는 순서', steps: [
          { label: '청구금액', value: `${won(CLAIM)}원`, sub: '퇴직금과 지연이자', op: '→' },
          { label: '소장 인지액', value: `${won(derive(stampSuit(CLAIM)))}원`, sub: '구간별 비율로 계산', op: '×' },
          { label: '지급명령 10분의 1', value: `${won(derive(stampOrder(CLAIM)))}원`, sub: '독촉절차 감면', op: '×' },
          { label: '전자소송 10분의 9', value: `${won(orderFee)}원`, sub: '실제 내는 금액' },
        ] },
        { type: 'table', text: true, caption: '소가에 따른 소장 인지액 계산식', headers: ['청구금액', '인지액'], rows: [
          { cells: ['1천만원 미만', '청구금액 × 1만분의 50'] },
          { cells: ['1천만원 이상 1억원 미만', '청구금액 × 1만분의 45 + 5천원'] },
          { cells: ['1억원 이상 10억원 미만', '청구금액 × 1만분의 40 + 5만5천원'] },
          { cells: ['10억원 이상', '청구금액 × 1만분의 35 + 55만5천원'] },
        ], fn: '민사소송 등 인지법 제2조제1항이에요. 계산한 금액이 1천원 미만이면 1천원으로 하고, 100원 미만은 계산하지 않아요.' },
        { type: 'table', id: 'feeTbl', compact: true, x: [3], net: 1, caption: '청구금액별 인지대 (전자소송 기준)', headers: ['청구금액', '지급명령', '소장', '종이 소장'],
          rows: AMOUNTS.map(({ v, order, suit, paper }) => ({ hi: v === 2e7, cells: [`${man(v)}원`, won(order), won(suit), won(paper)] })),
          moreLabel: '종이 소장까지 보기',
          fn: '단위: 원. 전자소송으로 내면 인지액의 10분의 9만 내요. 송달료는 별도로 예납해요.' },
        { type: 'widget', label: '내 인지대 계산', title: '청구금액으로 바로 보기', note: '청구할 금액을 넣으면 지급명령과 소장 인지대가 나와요. 전자소송으로 제출할 때 기준이고, 송달료는 따로 예납해요.',
          inputs: [
            { id: 'fv', label: '청구금액 (만원)', type: 'number', value: 2000, min: 10, max: 200000, step: 10 },
          ],
          outputs: [{ id: 'ford', label: '지급명령 인지대' }, { id: 'fsuit', label: '소장 인지대' }, { id: 'fpaper', label: '종이 소장 인지대' }],
          port: `
  function stampRaw(v){ return v < 10000000 ? v * 50 / 10000 : v < 100000000 ? v * 45 / 10000 + 5000 : v < 1000000000 ? v * 40 / 10000 + 55000 : v * 35 / 10000 + 555000; }
  function trim(x){ return x < 1000 ? 1000 : Math.floor(x / 100) * 100; }
  function fees(v){
    return { order: trim(stampRaw(v) / 10 * 9 / 10), suit: trim(stampRaw(v) * 9 / 10), paper: trim(stampRaw(v)) };
  }`,
          js: `
  function frender(){ var v=(+document.getElementById('fv').value||0)*1e4; var r=fees(v);
    document.getElementById('ford').textContent=won(r.order)+'원'; document.getElementById('fsuit').textContent=won(r.suit)+'원'; document.getElementById('fpaper').textContent=won(r.paper)+'원'; }
  document.getElementById('fv').addEventListener('input',frender); frender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let v = 10; v <= 20000; v += 10) {
              n++;
              const amount = v * 1e4;
              const q = port.fees(amount);
              if (q.order !== stampOrderOnline(amount) || q.suit !== stampSuitOnline(amount) || q.paper !== stampSuit(amount)) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'tips', items: [
          { title: '송달료는 미리 예납해요', text: '당사자 수와 예납 횟수로 정해져요. 전자소송 화면에서 금액이 자동으로 계산되고, 남으면 나중에 돌려받아요.' },
          { title: '이기면 상대가 부담해요', text: '소송비용은 진 쪽이 부담하는 것이 원칙이에요. 판결 뒤 소송비용액 확정 절차로 돌려받을 수 있어요.' },
          { title: '소득이 적으면 지원을 받으세요', text: '대한법률구조공단이나 소송구조 제도를 통해 인지대와 송달료를 면제받거나 무료로 대리를 받을 수 있어요.' },
        ] },
      ] },

      { id: 's4', h2: '관할 법원은 어디로 내나요', sub: '회사 주소지 지방법원이 원칙이에요', blocks: [
        { type: 'p', lead: true, ans: '채무자인 회사의 보통재판적이 있는 곳을 관할하는 지방법원에 내요.', text: '법인은 주된 사무소가 있는 곳, 개인 사업주는 주소지가 기준이에요. 독촉절차는 이 관할이 전속이라 다른 법원에 내면 옮겨져요. 근무지를 기준으로 하는 특별한 관할이 인정되는 경우도 있어요.' },
        { type: 'table', text: true, caption: '어디에 내는지 정리', headers: ['구분', '관할'], rows: [
          { cells: ['법인 회사', '주된 사무소나 본점이 있는 곳의 지방법원'] },
          { cells: ['개인 사업주', '사업주의 주소지를 관할하는 지방법원'] },
          { cells: ['근무지 기준', '의무 이행지 같은 특별재판적이 인정되면 그곳도 가능해요'] },
          { cells: ['전자소송', '온라인으로 내도 관할 법원은 같은 기준으로 정해요'] },
          { cells: ['잘못 낸 경우', '법원이 관할 법원으로 옮겨 줘요. 시간이 더 걸려요'] },
        ], fn: '독촉절차의 관할은 민사소송법 제463조에 전속관할로 정해져 있어요.' },
        { type: 'note', title: '회사 주소는 등기부로 확인하세요', text: '인터넷등기소에서 법인등기부를 떼면 본점 주소와 대표자를 확인할 수 있어요. 사업장이 여러 곳이면 본점 주소를 쓰세요.' },
      ] },

      { id: 's5', h2: '지급명령 뒤에는 어떻게 되나요', sub: '2주 안에 이의가 없으면 확정돼요', blocks: [
        { type: 'p', lead: true, ans: '상대가 송달받은 날부터 2주 안에 이의하지 않으면 확정판결과 같은 효력이 생겨요.', text: '확정되면 그 서류로 회사 계좌나 재산을 압류할 수 있어요. 이의가 들어오면 지급명령을 신청한 때에 소가 제기된 것으로 보고 그대로 소송으로 넘어가요.' },
        { type: 'timeline', label: '지급명령 신청 뒤 흐름', items: [
          { step: '신청', title: '신청서 접수', text: '전자소송으로 제출하고 인지대와 송달료를 내요' },
          { step: '결정', title: '법원이 지급명령 발령', text: '서류만 심사해 채무자에게 지급명령을 보내요' },
          { step: '2주', title: '이의신청 기간', text: '채무자가 송달받은 날부터 2주 안에 이의하면 소송으로 넘어가요', mark: true, tag: '불변기간' },
          { step: '확정', title: '확정과 강제집행', text: '이의가 없으면 확정판결과 같은 효력이 생겨 압류를 진행할 수 있어요' },
        ] },
        { type: 'tips', items: [
          { title: '확정되면 대지급금도 가능해요', text: '확정된 지급명령은 국가가 대신 지급하는 대지급금의 지급 사유에 해당해요.' },
          { title: '재산이 없으면 회수가 어려워요', text: '판결을 받아도 압류할 재산이 있어야 실제로 받아요. 필요하면 재산명시나 가압류를 먼저 검토하세요.' },
          { title: '노동청 진정과 함께 갈 수 있어요', text: '진정으로 형사 압박을 주면서 민사로 회수를 진행하는 방법도 있어요.', },
        ] },
        { type: 'table', text: true, caption: '진정과 지급명령을 함께 쓰는 방법', headers: ['단계', '어디서 하나요'], rows: [
          { cells: ['임금체불 진정', `고용노동부 노동포털에서 무료로 접수해요 (<a href="${LABOR}" target="_blank" rel="noopener">노동포털</a>)`] },
          { cells: ['체불 확인서 발급', '조사가 끝나면 관할 고용노동청에서 받아요'] },
          { cells: ['지급명령 신청', '확인서를 붙여 전자소송으로 신청해요'] },
          { cells: ['강제집행', '확정되면 계좌나 재산을 압류해 회수해요'] },
        ], fn: '진정은 형사 절차, 지급명령은 민사 절차라 동시에 진행할 수 있어요.' },
      ] },
    ],
    faq: [
      ['퇴직금 지급명령 신청서는 어떻게 쓰나요?', '채권자와 채무자, 청구 금액, 청구 취지와 원인을 적고 근로계약서와 체불 확인서를 붙여요. 전자소송에서 화면으로 작성할 수 있어요.'],
      ['소장 양식은 어디서 받나요?', '대법원 전자소송 사이트에서 바로 작성하거나 법원 양식 모음에서 내려받아요. 종이로 내려면 인쇄해서 관할 법원에 제출해요.'],
      ['지급명령 인지대는 얼마인가요?', `소장 인지액의 10분의 1이에요. 청구금액 ${won(CLAIM)}원이면 전자소송 기준 <b>${won(orderFee)}원</b>이에요.`],
      ['송달료는 얼마나 내나요?', '당사자 수와 예납 횟수에 따라 정해져요. 전자소송 화면에서 자동으로 계산되고 쓰지 않은 금액은 돌려받아요.'],
      ['관할 법원은 어디인가요?', '회사의 보통재판적이 있는 곳을 관할하는 지방법원이에요. 독촉절차는 전속관할이라 다른 법원에 내면 옮겨져요.'],
      ['지급명령에 이의가 들어오면 어떻게 되나요?', '지급명령은 그 범위에서 효력을 잃고, 신청한 때에 소가 제기된 것으로 보아 소송으로 넘어가요.'],
      ['퇴직금은 언제까지 청구할 수 있나요?', '임금채권이라 3년이에요. 퇴사일부터 3년이 지나면 청구할 수 없으니 서둘러야 해요.'],
    ],
    summary: [
      '지급명령은 서류만으로 진행되고 인지대가 소장의 10분의 1이라 가장 싸요.',
      `퇴직금 ${won(CLAIM)}원을 청구하면 전자소송 지급명령 인지대가 ${won(orderFee)}원이에요.`,
      '관할은 회사의 보통재판적이 있는 곳의 지방법원이고 독촉절차는 전속관할이에요.',
      '2주 안에 이의가 없으면 확정판결과 같은 효력이 생겨 압류로 이어갈 수 있어요.',
    ],
    sources: [
      ['법령', '민사소송법 제462조(지급명령의 요건), 제463조(관할법원, 전속관할), 제469조(송달과 이의신청), 제470조(이의신청의 효력, 2주 불변기간), 제472조(소송으로의 이행), 제474조(확정판결과 같은 효력). 민사소송 등 인지법 제2조(소장 인지액), 제7조제2항(지급명령 신청서는 10분의 1), 제16조(전자소송은 10분의 9). 소액사건심판법(소액사건 범위와 이행권고결정). 근로기준법 제36조(금품 청산 14일), 제49조(임금채권 3년 시효).'],
      ['정부 도구', `대법원 전자소송의 인지액 산정 기준과 이 글의 계산이 같은 산식이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '금전, 그 밖에 대체물(代替物)이나 유가증권의 일정한 수량의 지급을 목적으로 하는 청구에 대하여 법원은 채권자의 신청에 따라 지급명령을 할 수 있다', note: '지급명령 요건 (민사소송법 제462조)' },
      { src: 1, quote: '독촉절차는 채무자의 보통재판적이 있는 곳의 지방법원이나', note: '관할 법원 (제463조)' },
      { src: 1, quote: '채무자가 지급명령을 송달받은 날부터 2주 이내에 이의신청을 한 때에는 지급명령은 그 범위안에서 효력을 잃는다', note: '이의신청 2주 (제470조①)' },
      { src: 1, quote: '지급명령에 대하여 이의신청이 없거나, 이의신청을 취하하거나, 각하결정이 확정된 때에는 지급명령은 확정판결과 같은 효력이 있다', note: '확정판결과 같은 효력 (제474조)' },
      { src: 2, quote: '소송목적의 값이 1천만원 이상 1억원 미만인 경우에는 그 값에 1만분의 45를 곱한 금액에 5천원을 더한 금액', note: '소장 인지액 산식 (인지법 제2조①2)' },
      { src: 2, quote: '지급명령신청서에는 제2조에 따른 금액의 10분의 1에 해당하는 인지를 붙여야 한다', note: '지급명령 인지 10분의 1 (제7조②)' },
      { src: 2, quote: '전자문서로 제출하는 소장에는 제2조에 따른 인지액의 10분의 9에 해당하는 인지를 붙여야 한다', note: '전자소송 10분의 9 (제16조①)' },
      { src: 4, quote: '이 법에 따른 임금채권은 3년간 행사하지 아니하면 시효로 소멸한다', note: '임금채권 3년 시효 (근로기준법 제49조)' },
    ],
    related: [
      { kind: '계산기', label: '퇴직금 계산기', href: '/severance/' },
      { kind: '법률 계산기', label: '임금체불 지연이자 계산기', href: '/unpaid-wages/' },
      { kind: '법률 가이드', label: '임금체불 진정 방법과 지연이자', href: '/unpaid-wages/' },
    ],
  };
}
