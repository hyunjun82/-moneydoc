/**
 * 글 스펙: 2026 4대보험
 *   숫자는 전부 엔진(four-major-insurance: 근로자 + 회사 통합)이 만든다.
 *   요율·부담 비율·정산 문장은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man, docs } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('tax/four-major-insurance');
  const C = spec.constants;
  const ins = (monthlySalary, nontaxable = 0, workCompRate = 0.007) =>
    calculators['four-major-insurance']({ monthlySalary, nontaxable, workCompRate }, spec);

  const R = ins(3e6);
  const ROWS = [2e6, 2.5e6, 3e6, 3.5e6, 4e6, 5e6, 7e6, 1e7].map((m) => ({ m, r: ins(m) }));
  const QUICK = [2.5e6, 3e6, 4e6].map((m) => ({ m, r: ins(m) }));
  const WC = [[0.007, '사무·서비스'], [0.012, '도소매'], [0.015, '제조업'], [0.025, '운송·창고'], [0.03, '건설업']].map(([w, label]) => ({ w, label, r: ins(3e6, 0, w) }));
  const NT = ins(3e6, 200000);

  const pct = (v) => `${+(v * 100).toFixed(4)}%`;
  const capMonthly = C.NP_CAP, floorMonthly = C.NP_FLOOR;
  const capAnnual = derive(capMonthly * 12);
  const employerMore = derive(R.employerTotal - R.employeeTotal);
  const ntSave = derive(R.employeeTotal - NT.employeeTotal);
  const yearEmployee = derive(R.employeeTotal * 12);
  const npCapWorker = derive(ins(capMonthly).employeeNP);
  const wcGap = derive(WC[4].r.employerWC - WC[0].r.employerWC);
  const NPS = 'https://www.nps.or.kr/';
  const INSURE4 = 'https://www.4insure.or.kr/pbiz/main/main.do';

  return {
    slug: 'four-major-insurance-guide', cat: 'tax', catLabel: '세금', crumb: '4대보험',
    title: '2026년 4대보험 요율과 계산, 월급에서 떼는 돈부터 회사 부담까지',
    description: `월 보수 300만원이면 근로자가 내는 4대보험은 ${won(R.employeeTotal)}원이고 회사는 ${won(R.employerTotal)}원을 내요. 국민연금 4.75%, 건강보험 3.595%, 장기요양, 고용보험 요율과 월급별 공제액 표, 4월 건강보험 정산까지 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `4대사회보험 모의계산 일치 · 법령 요율 확인 · ${VERIFIED}`,
    calc: { href: '/four-insurance/calculator/', label: '4대보험료 계산기 바로가기' },
    hero: {
      tag: '급여·세금', line1: '2026년 4대보험', line2: '얼마나 떼나',
      sub1: `월 보수 300만원 → 근로자 ${won(R.employeeTotal)}원 · 회사 ${won(R.employerTotal)}원`,
      sub2: `국민연금 4.75% · 건강보험 3.595% · 장기요양 ${pct(C.LTC_INCOME_RATE / 2)} · 고용보험 0.9%`,
      foot: `법령 요율 원문 확인 · 4대사회보험 모의계산 대조 · ${VERIFIED} 검증`,
      card: { label: '근로자 부담', big: won(R.employeeTotal), unit: '원', l1: '월 보수 300만원', l2: `회사 ${won(R.employerTotal)}원` },
      alt: `2026년 4대보험 요율. 월 보수 300만원이면 근로자 ${won(R.employeeTotal)}원, 회사 ${won(R.employerTotal)}원`,
    },
    intro: `급여명세서에서 세금보다 크게 빠지는 게 4대보험이에요. 월 보수 300만원이면 근로자가 ${won(R.employeeTotal)}원을 내고, 회사는 산재보험까지 더해 ${won(R.employerTotal)}원을 내요. 요율은 법으로 정해져 있어 회사가 달라도 같아요. 항목별 요율과 월급별 공제액 표, 회사가 내는 몫, 4월과 7월에 금액이 바뀌는 이유를 정리했어요.`,
    answer: {
      label: '월 보수를 고르면 바로 답해요 (사무·서비스 기준)',
      quick: QUICK.map(({ m, r }) => ({ chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.employeeTotal)}원`, unit: '근로자 부담', sub: `회사 ${won(r.employerTotal)}원 · 합계 ${won(r.grandTotal)}원` })),
      boxes: [
        { title: `회사가 ${won(employerMore)}원 더 내요`, text: `근로자 ${won(R.employeeTotal)}원, 회사 ${won(R.employerTotal)}원. 산재보험과 고용안정사업 몫이 회사에만 붙어요` },
        { title: `1년이면 ${won(yearEmployee)}원`, text: `월 보수 300만원 기준 근로자 부담 연 환산. 연말정산과 별개로 매달 빠져요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 2026 4대보험',
      rows: [
        ['국민연금', `근로자 4.75% + 회사 4.75% (총 9.5%). 2032년까지 해마다 올라 13%가 돼요`],
        ['건강보험', '근로자 3.595% + 회사 3.595% (총 7.19%)'],
        ['장기요양', `보수의 ${pct(C.LTC_INCOME_RATE)}를 절반씩. 건강보험료에 붙어 나와요`],
        ['고용보험', '근로자 0.9%, 회사는 1.15% 이상 (고용안정사업 포함)'],
        ['산재보험', '전액 회사 부담. 업종별 0.7%부터 3%까지'],
        ['월 보수 300만', `근로자 ${won(R.employeeTotal)}원 · 회사 ${won(R.employerTotal)}원 · 합계 ${won(R.grandTotal)}원`],
        ['국민연금 상한', `기준소득월액 ${man(capMonthly)}원까지만 부과, 그 위로는 ${won(npCapWorker)}원 고정`],
        ['금액이 바뀌는 달', '4월 건강보험 정산, 7월 국민연금 기준소득월액 변경'],
      ],
    },
    sections: [
      { id: 's1', h2: '2026년 4대보험 요율과 국민연금 상한, 항목별로 얼마인가요', sub: '요율은 법으로 정해져 회사가 달라도 같아요', blocks: [
        { type: 'p', lead: true, ans: `근로자는 국민연금 4.75%, 건강보험 3.595%, 장기요양 ${pct(C.LTC_INCOME_RATE / 2)}, 고용보험 0.9%를 내요.`, text: `월 보수 300만원이면 다 합쳐 ${won(R.employeeTotal)}원이에요. 산재보험은 근로자가 내지 않아요.` },
        { type: 'table', net: 3, caption: '2026년 4대보험 요율과 월 공제액 (월 보수 300만원 기준)', headers: ['항목', '전체 요율', '근로자 몫', '월 공제액'], rows: [
          { cells: ['국민연금', '9.5%', '4.75%', `${won(R.employeeNP)}원`] },
          { cells: ['건강보험', '7.19%', '3.595%', `${won(R.employeeHI)}원`] },
          { cells: ['장기요양보험', `보수의 ${pct(C.LTC_INCOME_RATE)}`, pct(C.LTC_INCOME_RATE / 2), `${won(R.employeeLTC)}원`] },
          { cells: ['고용보험 (실업급여)', '1.8%', '0.9%', `${won(R.employeeEI)}원`] },
          { cells: ['산재보험', '업종별 0.7~3%', '없음', '0원'] },
          { hi: true, cells: ['근로자 부담 합계', '', '', `${won(R.employeeTotal)}원`] },
        ], fn: `장기요양보험료는 건강보험료 고지서에 함께 나와요. 국민연금은 기준소득월액 상한 ${man(capMonthly)}원, 하한 ${man(floorMonthly)}원 사이에서만 부과돼요.` },
        { type: 'flow', label: '4대보험 공제 순서', steps: [
          { label: '월 보수', value: `${won(3e6)}원`, sub: '비과세 제외', op: '×' },
          { label: '요율 합계', value: '약 9.7%', sub: '근로자 몫 4가지', op: '=' },
          { label: '근로자 부담', value: `${won(R.employeeTotal)}원`, sub: '매달 급여에서 공제', op: '+' },
          { label: '회사 부담', value: `${won(R.employerTotal)}원`, sub: `합계 ${won(R.grandTotal)}원` },
        ] },
      ] },

      { id: 's2', h2: '4대보험 계산, 월급별로 얼마나 떼나요', sub: '월 보수 200만원부터 1,000만원까지', blocks: [
        { type: 'p', ans: `월 보수 200만원이면 ${won(ROWS[0].r.employeeTotal)}원, 300만원이면 ${won(R.employeeTotal)}원, 500만원이면 ${won(ROWS[5].r.employeeTotal)}원이에요.`, text: '국민연금은 상한이 있어 보수가 높아질수록 부담 비율이 조금씩 낮아져요.' },
        { type: 'table', id: 'insTbl', compact: true, moreLabel: '회사 부담까지 보기', x: [3, 4], net: 1, caption: '월 보수별 4대보험 공제액 표 (사무·서비스 기준)', headers: ['월 보수', '근로자 부담', '국민연금', '회사 부담', '합계'],
          rows: ROWS.map(({ m, r }) => ({ hi: m === 3e6, cells: [`${man(m)}원`, won(r.employeeTotal), won(r.employeeNP), won(r.employerTotal), won(r.grandTotal)] })),
          fn: `단위: 원. 산재보험 요율은 사무·서비스 0.7% 기준. 4대사회보험 정보연계센터 모의계산과 대조했어요.` },
        { type: 'widget', label: '내 보수로 계산', title: '내 월급으로 바로 보기', note: '월 보수와 비과세액, 업종만 고르면 근로자와 회사 부담이 같이 나와요.',
          inputs: [
            { id: 'wm', label: '월 보수 (만원)', type: 'number', value: 300, min: 40, max: 10000, step: 10 },
            { id: 'wn', label: '비과세 (만원)', type: 'number', value: 0, min: 0, max: 200, step: 5 },
            { id: 'ww', label: '산재보험 업종', type: 'select', value: 0.007, options: [[0.007, '사무·서비스'], [0.012, '도소매'], [0.015, '제조업'], [0.025, '운송·창고'], [0.03, '건설업']] },
          ],
          outputs: [{ id: 'we', label: '근로자 부담' }, { id: 'wr', label: '회사 부담' }, { id: 'wt', label: '합계' }, { id: 'wp', label: '보수 대비' }],
          port: `
  var NP_RATE=${C.NP_RATE}, NP_CAP=${C.NP_CAP}, NP_FLOOR=${C.NP_FLOOR}, HI_RATE=${C.HI_RATE}, EI_RATE=${C.EI_RATE}, EI_EMP=${C.EI_RATE_EMPLOYER}, LTC=${C.LTC_INCOME_RATE};
  function ins4(salary, nontax, wc){
    var cut=function(n){return Math.floor(n/10)*10}, fl=function(x){return Math.floor(Math.round(x*1e6)/1e6)};
    var base=Math.max(0, salary-(nontax||0));
    var npb=base<NP_FLOOR?NP_FLOOR:(base>=NP_CAP?NP_CAP:base);
    var np=cut(fl(npb*NP_RATE)), hi=cut(fl(base*HI_RATE)), ltc=cut(fl(base*LTC/2)), ei=cut(fl(base*EI_RATE));
    var eiR=cut(fl(base*EI_EMP)), wcR=cut(fl(base*wc));
    var emp=np+hi+ltc+ei, er=np+hi+ltc+eiR+wcR;
    return { emp: emp, er: er, total: emp+er, np: np, pct: +(emp/salary*100).toFixed(1) };
  }`,
          js: `
  function irender(){ var m=(+document.getElementById('wm').value||0)*1e4, n=(+document.getElementById('wn').value||0)*1e4, w=+document.getElementById('ww').value; if(m<=0)return; var r=ins4(m,n,w);
    document.getElementById('we').textContent=won(r.emp)+'원'; document.getElementById('wr').textContent=won(r.er)+'원'; document.getElementById('wt').textContent=won(r.total)+'원'; document.getElementById('wp').textContent=r.pct+'%'; }
  ['wm','wn','ww'].forEach(function(id){document.getElementById(id).addEventListener('input',irender);document.getElementById(id).addEventListener('change',irender)}); irender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let mw = 50; mw <= 1000; mw += 10) for (const nt of [0, 20]) for (const wc of [0.007, 0.015, 0.03]) {
              n++;
              const e = ins(mw * 1e4, nt * 1e4, wc);
              const p = port.ins4(mw * 1e4, nt * 1e4, wc);
              if (p.emp !== e.employeeTotal || p.er !== e.employerTotal || p.total !== e.grandTotal) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: `월 보수 ${man(capMonthly)}원부터 국민연금이 고정돼요`, text: `기준소득월액 상한이 ${man(capMonthly)}원이라 그 위로는 국민연금이 ${won(npCapWorker)}원에서 더 늘지 않아요. 건강보험과 고용보험은 상한 없이 계속 늘어요.` },
      ] },

      { id: 's3', h2: '회사가 내는 4대보험은 얼마인가요', sub: '산재보험은 전액 회사 부담이에요', blocks: [
        { type: 'p', lead: true, ans: `월 보수 300만원이면 회사가 ${won(R.employerTotal)}원을 내요. 근로자보다 ${won(employerMore)}원 많아요.`, text: '국민연금과 건강보험은 절반씩 나눠 내지만, 고용보험은 회사가 고용안정·직업능력개발사업 몫을 더 내고 산재보험은 전액 회사가 내요.' },
        { type: 'table', net: 3, caption: '근로자와 회사의 4대보험 부담 비교 (월 보수 300만원)', headers: ['항목', '근로자', '회사', '합계'], rows: [
          { cells: ['국민연금', won(R.employeeNP), won(R.employerNP), won(R.employeeNP + R.employerNP)] },
          { cells: ['건강보험', won(R.employeeHI), won(R.employerHI), won(R.employeeHI + R.employerHI)] },
          { cells: ['장기요양', won(R.employeeLTC), won(R.employerLTC), won(R.employeeLTC + R.employerLTC)] },
          { cells: ['고용보험', won(R.employeeEI), won(R.employerEI), won(R.employeeEI + R.employerEI)] },
          { cells: ['산재보험', '0', won(R.employerWC), won(R.employerWC)] },
          { hi: true, cells: ['합계', won(R.employeeTotal), won(R.employerTotal), won(R.grandTotal)] },
        ], fn: '산재보험 요율은 업종에 따라 달라요. 사무·서비스 0.7%, 제조업 1.5%, 건설업 3%예요.' },
        { type: 'table', net: 2, caption: '업종별 산재보험료와 회사 부담 (월 보수 300만원)', headers: ['업종', '산재 요율', '산재보험료', '회사 부담 합계'],
          rows: WC.map(({ w, label, r }) => ({ hi: w === 0.007, cells: [label, `${+(w * 100).toFixed(1)}%`, won(r.employerWC), won(r.employerTotal)] })),
          fn: `건설업은 사무직보다 산재보험료가 월 ${won(wcGap)}원 많아요. 요율은 업종별 재해율에 따라 해마다 고시돼요.` },
      ] },

      { id: 's4', h2: '4월과 7월에 4대보험이 달라지는 이유는 무엇인가요', sub: '건강보험 정산과 국민연금 기준소득월액 변경', blocks: [
        { type: 'p', ans: '4월에는 건강보험 정산이, 7월에는 국민연금 기준소득월액 변경이 반영돼요.', text: '건강보험은 그해 보수를 미리 정한 금액으로 걷고, 다음 해에 확정된 실제 보수로 다시 계산해 차액을 정산해요. 연봉이 오른 해에는 4월에 추가로 내요.' },
        { type: 'timeline', label: '4대보험 금액이 바뀌는 달', items: [
          { step: '1월', title: '새 요율 적용', text: '국민연금·건강보험 요율 변경분 반영', mark: true },
          { step: '4월', title: '건강보험 정산', text: '전년 보수 확정분과 차액 정산', tag: '추가 납부 가능', mark: true },
          { step: '7월', title: '국민연금 상·하한 변경', text: `기준소득월액 상한 ${man(capMonthly)}원 적용`, tag: '매년 7월' },
          { step: '수시', title: '보수 변동 신고', text: '급여가 크게 바뀌면 회사가 변경 신고' },
        ] },
        { type: 'tips', items: [
          { title: '비과세 항목이 있으면', text: `식대 같은 비과세는 4대보험 기준에서 빠져요. 월 20만원이 비과세면 근로자 부담이 <em>${won(ntSave)}원</em> 줄어요. 대신 국민연금 가입 기준도 낮아져 나중에 받을 연금이 조금 줄어요.` },
          { title: '4대보험 가입 내역이 궁금하면', text: '4대사회보험 정보연계센터에서 가입내역확인서를 온라인으로 뗄 수 있어요. 이직·대출 서류로 자주 쓰여요.' },
          { title: '퇴사하면', text: '직장가입자 자격이 끝나 지역가입자로 바뀌어요. 보험료가 오르면 임의계속가입으로 직장 수준을 최대 36개월 유지할 수 있어요.' },
        ] },
        { type: 'table', text: true, caption: '4대보험 관련 서류와 조회, 어디서 하나요', headers: ['하려는 것', '어디서', '준비물'], rows: [
          { docs: true, cells: ['가입내역확인서 발급', docs([{ label: '4대사회보험 정보연계센터', href: INSURE4 }]), '공동인증서'] },
          { docs: true, cells: ['국민연금 예상수령액 조회', docs([{ label: '국민연금공단', href: NPS }]), '공동인증서'] },
          { docs: true, cells: ['내 보험료 미리 계산', docs([{ label: '4대보험료 계산기', href: '/four-insurance/' }]), '월 보수·업종'] },
        ], fn: '가입내역확인서는 이직이나 대출 심사에서 재직 증빙으로 자주 쓰여요.' },
      ] },

      { id: 's5', h2: '4대보험 가입 대상은 누구인가요', sub: '주 15시간과 월 60시간이 기준이에요', blocks: [
        { type: 'p', ans: '한 달 60시간 이상, 주 15시간 이상 일하면 4대보험에 가입해요.', text: '이 기준보다 적게 일하면 산재보험만 적용되는 경우가 많아요. 아르바이트도 시간 기준을 넘으면 정규직과 같은 요율로 가입해요.' },
        { type: 'table', text: true, caption: '근무 형태별 4대보험 가입 여부', headers: ['근무 형태', '가입되는 보험'], rows: [
          { cells: ['주 15시간 이상 정규·계약직', '국민연금·건강보험·고용보험·산재보험 모두'] },
          { cells: ['주 15시간 미만 초단시간', '산재보험. 고용보험은 3개월 이상 계속 일하면 가입'] },
          { cells: ['일용근로자', '산재보험과 고용보험. 국민연금·건강보험은 월 8일 이상이면 가입'] },
          { cells: ['프리랜서 (사업소득 3.3%)', '직장 가입 아님. 지역가입자로 국민연금·건강보험을 직접 냄'] },
        ], fn: '같은 회사에서 여러 달 일하면 시간 기준을 다시 따져요. 실제 가입 여부는 4대사회보험 정보연계센터에서 확인할 수 있어요.' },
      ] },
    ],
    faq: [
      ['월급 300만원이면 4대보험 얼마 떼나요?', `근로자 부담은 <b>${won(R.employeeTotal)}원</b>이에요. 국민연금 ${won(R.employeeNP)}원, 건강보험 ${won(R.employeeHI)}원, 장기요양 ${won(R.employeeLTC)}원, 고용보험 ${won(R.employeeEI)}원이에요. 회사는 산재보험까지 더해 ${won(R.employerTotal)}원을 내요.`],
      ['4대보험은 회사와 반반 내나요?', `국민연금과 건강보험은 절반씩 내요. 고용보험은 회사가 고용안정·직업능력개발사업 몫을 더 내고, 산재보험은 전액 회사가 내요. 그래서 월 보수 300만원이면 회사가 ${won(employerMore)}원 더 내요.`],
      ['2026년에 4대보험이 오른 이유가 뭔가요?', '국민연금 보험료율이 총 9%에서 9.5%로 올랐어요. 근로자 몫이 4.5%에서 4.75%가 됐고, 2032년까지 해마다 올라 13%가 돼요.'],
      ['4월에 건강보험료가 갑자기 많이 나오는 이유는 뭔가요?', '건강보험 정산 때문이에요. 그해 보험료를 미리 정한 보수로 걷고 다음 해에 확정된 실제 보수로 다시 계산해요. 연봉이 올랐다면 차액을 4월에 추가로 내요.'],
      ['국민연금은 월급이 아무리 높아도 똑같이 내나요?', `기준소득월액 상한이 ${man(capMonthly)}원이라 그 위로는 ${won(npCapWorker)}원에서 더 늘지 않아요. 건강보험과 고용보험은 상한이 없어 계속 늘어요.`],
      ['아르바이트도 4대보험에 가입하나요?', '한 달 60시간 이상, 주 15시간 이상 일하면 가입해요. 그보다 적게 일하면 산재보험만 적용되는 경우가 많고, 고용보험은 3개월 이상 계속 일하면 가입해요.'],
    ],
    summary: [
      `요율: 국민연금 4.75%, 건강보험 3.595%, 장기요양 ${pct(C.LTC_INCOME_RATE / 2)}, 고용보험 0.9%. 산재보험은 회사만 내요.`,
      `월 보수 300만원이면 근로자 ${won(R.employeeTotal)}원, 회사 ${won(R.employerTotal)}원, 합계 ${won(R.grandTotal)}원이에요.`,
      `국민연금은 월 보수 ${man(capMonthly)}원까지만 부과되고 그 위로는 금액이 같아요.`,
      '4월 건강보험 정산과 7월 국민연금 기준소득월액 변경 때 금액이 바뀌어요.',
    ],
    sources: [
      ['법령', '국민연금법 부칙 제4조(2026년 사업장가입자 기여금 1만분의 475, 2032년까지 단계 인상). 국민건강보험법 제76조(보험료 100분의 50씩 부담), 같은 법 시행령 제44조(보험료율 1만분의 719), 제34조(보수월액보험료 정산), 제110조(임의계속가입). 노인장기요양보험법 시행령 제4조(장기요양보험료율 100만분의 9,448). 고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 제13조(근로자는 실업급여 보험료율의 2분의 1, 산재보험료는 사업주 부담), 같은 법 시행령 제12조(실업급여 보험료율 1천분의 18).'],
      ['행정규칙·정부 안내', '보건복지부 고시 국민연금 기준소득월액 하한액과 상한액(하한 410천원 · 상한 6,590천원, 2026.7~2027.6). 4대사회보험 정보연계센터 가입내역 조회와 모의계산.'],
      ['정부 도구', `4대사회보험 정보연계센터 모의계산과 대조했어요 (${VERIFIED}).`],
    ],
    claims: [
      { src: 1, quote: '2026년은 1만분의 475', note: '국민연금 사업장가입자 기여금 4.75% (부칙 제4조①)' },
      { src: 1, quote: '2032년은 1만분의 625', note: '2032년 근로자 6.25% (총 12.5%)' },
      { src: 2, quote: '하한액 : 410천원 나. 상한액 : 6,590천원', note: '기준소득월액 상·하한 (2026.7~2027.6)' },
      { src: 3, quote: '1만분의 719로 한다', note: '건강보험료율 7.19% (시행령 제44조)' },
      { src: 4, quote: '직장가입자의 보수월액보험료는 직장가입자와 다음 각 호의 구분에 따른 자가 각각 보험료액의 100분의 50씩 부담한다', note: '건강보험 절반씩 부담 (제76조①)' },
      { src: 5, quote: '100만분의 9,448로 한다', note: '장기요양보험료율 0.9448% (시행령 제4조)' },
      { src: 6, quote: '실업급여의 보험료율: 1천분의 18', note: '고용보험 실업급여 1.8% (시행령 제12조)' },
      { src: 7, quote: '고용보험 가입자인 근로자가 부담하여야 하는 고용보험료는 자기의 보수총액에 제14조제1항에 따른 실업급여의 보험료율의 2분의 1을 곱한 금액으로 한다', note: '근로자 고용보험 0.9% (법 제13조②)' },
      { src: 7, quote: '사업주가 부담하여야 하는 산재보험료는 그 사업주가 경영하는 사업에 종사하는 근로자의 개인별 보수총액에 다음 각 호에 따른 산재보험료율을 곱한 금액', note: '산재보험료 전액 사업주 부담 (법 제13조⑤)' },
      { src: 8, quote: '다음 해에 확정되는 해당 연도의 보수 총액을 기준으로 제39조에 따라 보수월액을 다시 산정하여 정산한다', note: '건강보험 4월 정산 근거 (시행령 제34조①)' },
    ],
    related: [
      { kind: '계산기', label: '4대보험료 계산기', href: '/four-insurance/' },
      { kind: '세금 가이드', label: '연봉 실수령액 표', href: '/salary/' },
      { kind: '정부지원금 가이드', label: '실업급여 조건과 금액', href: '/unemployment/' },
    ],
  };
}
