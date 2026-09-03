/**
 * 글 스펙: 적금 이자
 *   금액은 전부 엔진(installment-savings)이 만든다.
 *   이자소득세율과 비과세 근거는 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('savings/installment-savings');
  const sv = (o) => calculators['installment-savings']({ monthlyDeposit: 5e5, months: 24, rate: 0.04, mode: 'compound', taxFree: 'no', ...o }, spec);
  const C = spec.constants;

  const R = sv({});                                        // 대표: 월 50만원 · 24개월 · 4% · 복리
  const SIMPLE = sv({ mode: 'simple' });
  const FREE = sv({ taxFree: 'yes' });
  const MONTHS = [12, 24, 36, 60].map((m) => ({ m, r: sv({ months: m }) }));
  const RATES = [0.03, 0.035, 0.04, 0.045, 0.05].map((rt) => ({ rt, r: sv({ rate: rt }) }));
  const DEPOSITS = [3e5, 5e5, 1e6].map((d) => ({ d, r: sv({ monthlyDeposit: d }) }));

  const modeGap = derive(R.interest - SIMPLE.interest);
  const taxFreeGap = derive(FREE.maturity - R.maturity);
  const effRate = derive(Math.round((R.maturity - R.principal) / R.principal * 1000) / 10);
  const pctOf = (v) => derive(Math.round(v * 1000) / 10);

  return {
    slug: 'installment-savings-guide', cat: 'savings', catLabel: '저축', crumb: '적금 이자',
    title: '적금 이자 계산과 세금, 단리 복리부터 만기 실수령액까지',
    description: `월 50만원을 24개월 동안 연 4% 적금에 넣으면 이자가 ${won(R.interest)}원, 세금을 뗀 만기 실수령액은 ${won(R.maturity)}원이에요. 단리와 복리 차이, 이자소득세, 비과세 조건을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `이자소득세 15.4% 원천징수 기준 반영 · ${VERIFIED}`,
    calc: { href: '/installment/calculator/', label: '적금 이자 계산기 바로가기' },
    hero: {
      tag: '저축', line1: '적금 이자 계산과 세금', line2: '만기에 얼마 받나',
      sub1: `월 50만원 · 24개월 · 연 4% → ${won(R.maturity)}원`,
      sub2: `이자 ${won(R.interest)}원에서 세금 ${won(R.tax)}원을 떼요`,
      foot: `이자소득세 15.4% 원천징수 기준 반영 · ${VERIFIED} 검증`,
      card: { label: '만기 실수령액', big: won(R.maturity), unit: '원', l1: '원금 1,200만원', l2: `세후 이자 ${won(derive(R.interest - R.tax))}원` },
      alt: `적금 이자 계산. 월 50만원을 24개월 넣으면 만기에 ${won(R.maturity)}원`,
    },
    intro: `적금은 매달 넣는 돈이라서 마지막 달에 넣은 돈에는 한 달치 이자만 붙어요. 그래서 연 4%짜리 적금이어도 원금 대비 실제 수익률은 그보다 낮아요. 월 50만원씩 24개월을 연 4%로 넣으면 원금 ${won(R.principal)}원에 이자 ${won(R.interest)}원이 붙고, 세금 ${won(R.tax)}원을 뗀 ${won(R.maturity)}원을 받아요. 이자가 어떻게 붙는지, 단리와 복리는 얼마나 차이 나는지, 세금은 얼마인지 정리했어요.`,
    answer: {
      label: '월 납입금을 눌러 만기 실수령액을 확인해 보세요 (24개월 · 연 4% · 복리)',
      quick: DEPOSITS.map(({ d, r }) => ({ chip: `${man(d)}원`, selected: d === 5e5, big: `${won(r.maturity)}원`, unit: '만기 실수령액', sub: `이자 ${won(r.interest)}원 · 세금 ${won(r.tax)}원` })),
      boxes: [
        { title: '연 4%라도 실제는 더 낮아요', text: `원금 대비 세후 수익률은 약 ${effRate}%예요. 매달 나눠 넣기 때문이에요` },
        { title: '이자에는 15.4%가 붙어요', text: `이자소득세 14%와 지방소득세 1.4%를 합친 세금이에요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 적금 이자',
      rows: [
        ['이자가 붙는 방식', '첫 달 넣은 돈은 만기까지, 마지막 달 돈은 한 달만 이자가 붙어요'],
        ['단리', '납입금마다 남은 개월수만큼 단순히 이자를 계산해요'],
        ['복리', '붙은 이자에 다시 이자가 붙어요. 기간이 길수록 차이가 커져요'],
        ['세금', `이자에 ${pctOf(C.INTEREST_TAX_RATE)}%. 소득세 14%와 지방소득세 1.4%`],
        ['월 50만 24개월 4%', `이자 ${won(R.interest)}원, 세금 ${won(R.tax)}원, 실수령 ${won(R.maturity)}원`],
        ['비과세종합저축', `세금이 없어 ${won(taxFreeGap)}원을 더 받아요`],
        ['중도해지', '약정 금리 대신 훨씬 낮은 중도해지 이율이 적용돼요'],
        ['만기 후', '만기가 지나면 이율이 크게 떨어져요. 바로 찾는 게 좋아요'],
      ],
    },
    sections: [
      { id: 's1', h2: '적금 이자 계산, 어떻게 붙나요', sub: '납입할 때마다 남은 기간만큼 붙어요', blocks: [
        { type: 'p', lead: true, ans: `월 50만원을 24개월 넣으면 이자가 ${won(R.interest)}원이에요.`, text: '원금 전체에 연 4%가 붙는 게 아니에요. 첫 달에 넣은 50만원은 24개월치 이자가 붙지만, 마지막 달에 넣은 돈은 한 달치만 붙어요. 그래서 예금과 같은 금리여도 적금 이자가 훨씬 적어요.' },
        { type: 'flow', label: '적금 만기 금액이 정해지는 순서', steps: [
          { label: '원금', value: `${won(R.principal)}원`, sub: '월 50만원 × 24개월', op: '+' },
          { label: '이자', value: `${won(R.interest)}원`, sub: '연 4% 월복리', op: '−' },
          { label: '이자소득세', value: `${won(R.tax)}원`, sub: `${pctOf(C.INTEREST_TAX_RATE)}%`, op: '=' },
          { label: '만기 실수령액', value: `${won(R.maturity)}원`, sub: `세후 이자 ${won(derive(R.interest - R.tax))}원` },
        ] },
        { type: 'table', id: 'mTbl', compact: true, x: [1], net: 3, caption: '납입 기간별 적금 이자 (월 50만원, 연 4%, 복리)', headers: ['기간', '원금', '이자', '세금', '만기 실수령액'],
          rows: MONTHS.map(({ m, r }) => ({ hi: m === 24, cells: [`${m}개월`, won(r.principal), won(r.interest), won(r.tax), won(r.maturity)] })),
          moreLabel: '원금까지 보기',
          fn: '단위: 원. 매달 같은 금액을 넣고 중간에 찾지 않는 경우예요. 이자소득세를 뗀 뒤 금액이에요.' },
        { type: 'note', title: '연 4%인데 왜 4%가 안 되나요', text: `원금 ${won(R.principal)}원에 세후 이자 ${won(derive(R.interest - R.tax))}원이라 실제 수익률은 약 ${effRate}%예요. 적금은 원래 이렇게 계산되기 때문에 예금 금리와 직접 비교하면 안 돼요.` },
      ] },

      { id: 's2', h2: '단리 복리 차이는 얼마나 되나요', sub: '기간이 길수록 벌어져요', blocks: [
        { type: 'p', lead: true, ans: `같은 조건에서 복리가 단리보다 ${won(modeGap)}원 많아요.`, text: `단리는 이자가 원금에만 붙고, 복리는 붙은 이자에 다시 이자가 붙어요. 24개월이면 차이가 크지 않지만 기간이 길어질수록 벌어져요. 은행 적금은 대부분 단리로 계산하니 상품 설명을 확인하세요.` },
        { type: 'table', net: 3, caption: '단리와 복리 비교 (월 50만원, 24개월, 연 4%)', headers: ['방식', '원금', '이자', '만기 실수령액'], rows: [
          { cells: ['단리', `${won(SIMPLE.principal)}원`, `${won(SIMPLE.interest)}원`, `${won(SIMPLE.maturity)}원`] },
          { hi: true, cells: ['월복리', `${won(R.principal)}원`, `${won(R.interest)}원`, `${won(R.maturity)}원`] },
        ], fn: '복리는 매달 초에 넣는 방식으로 계산했어요. 실제 상품의 이자 지급 방식은 약관에서 확인하세요.' },
        { type: 'table', net: 2, caption: '금리별 적금 이자 (월 50만원, 24개월, 복리)', headers: ['연이율', '이자', '만기 실수령액'],
          rows: RATES.map(({ rt, r }) => ({ hi: rt === 0.04, cells: [`${pctOf(rt)}%`, `${won(r.interest)}원`, `${won(r.maturity)}원`] })),
          fn: '우대금리를 채우면 이만큼 차이가 나요. 조건을 지킬 수 있는지 먼저 확인하세요.' },
        { type: 'widget', label: '내 적금 계산', title: '내 조건으로 바로 보기', note: '월 납입금과 기간, 금리를 넣으면 이자와 세금, 만기 실수령액이 나와요. 월복리 기준이고 비과세를 고르면 세금이 빠져요.',
          inputs: [
            { id: 'sm', label: '월 납입금 (만원)', type: 'number', value: 50, min: 1, max: 1000, step: 1 },
            { id: 'sn', label: '납입 개월수', type: 'number', value: 24, min: 1, max: 120, step: 1 },
            { id: 'sr', label: '연이율 (%)', type: 'number', value: 4, min: 0.1, max: 20, step: 0.1 },
            { id: 'st', label: '세금', type: 'select', value: 'no', options: [['no', '일반 과세'], ['yes', '비과세']] },
          ],
          outputs: [{ id: 'sprin', label: '원금' }, { id: 'sint', label: '이자' }, { id: 'stax', label: '이자소득세' }, { id: 'smat', label: '만기 실수령액' }],
          port: `
  function savings(monthly, months, rate, taxFree){
    var principal = monthly * months;
    var rm = rate / 12;
    var interest = 0;
    if (rm !== 0) { var future = monthly * (Math.pow(1 + rm, months) - 1) / rm * (1 + rm); interest = Math.round(future - principal); }
    var tax = Math.floor(interest * (taxFree ? 0 : ${C.INTEREST_TAX_RATE}));
    return { principal: principal, interest: interest, tax: tax, maturity: principal + interest - tax };
  }`,
          js: `
  function srender(){ var m=(+document.getElementById('sm').value||0)*1e4, n=+document.getElementById('sn').value||1, r=(+document.getElementById('sr').value||0)/100, t=document.getElementById('st').value==='yes'; if(m<=0)return; var x=savings(m,n,r,t);
    document.getElementById('sprin').textContent=won(x.principal)+'원'; document.getElementById('sint').textContent=won(x.interest)+'원'; document.getElementById('stax').textContent=won(x.tax)+'원'; document.getElementById('smat').textContent=won(x.maturity)+'원'; }
  ['sm','sn','sr','st'].forEach(function(id){document.getElementById(id).addEventListener('input',srender);document.getElementById(id).addEventListener('change',srender)}); srender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let m = 1; m <= 200; m += 3) for (const mo of [6, 12, 24, 36, 60]) for (const rt of [0.02, 0.035, 0.04, 0.05]) for (const tf of [false, true]) {
              n++;
              const e = sv({ monthlyDeposit: m * 1e4, months: mo, rate: rt, taxFree: tf ? 'yes' : 'no' });
              const q = port.savings(m * 1e4, mo, rt, tf);
              if (q.maturity !== e.maturity || q.interest !== e.interest || q.tax !== e.tax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '이자소득세는 얼마나 떼나요', sub: '이자의 15.4%예요', blocks: [
        { type: 'p', lead: true, ans: `이자 ${won(R.interest)}원에서 ${won(R.tax)}원을 떼요.`, text: `이자소득세 14%에 그 10%인 지방소득세 1.4%를 더해 ${pctOf(C.INTEREST_TAX_RATE)}%예요. 은행이 만기에 알아서 떼고 나머지를 줘요. 원금에는 세금이 붙지 않고 이자에만 붙어요.` },
        { type: 'table', text: true, caption: '적금 이자에 붙는 세금', headers: ['구분', '내용'], rows: [
          { cells: ['이자소득세', '이자의 14%예요'] },
          { cells: ['지방소득세', '이자소득세의 10%인 1.4%예요'] },
          { cells: ['합계', `이자의 ${pctOf(C.INTEREST_TAX_RATE)}%를 은행이 떼요`] },
          { cells: ['원금', '세금이 붙지 않아요'] },
          { cells: ['금융소득 2천만원 초과', '다른 소득과 합쳐 종합과세 대상이 될 수 있어요'] },
          { cells: ['비과세종합저축', '조건을 갖추면 세금이 없어요'] },
        ], fn: '이자소득 원천징수세율은 소득세법 제129조제1항제1호라목, 비과세종합저축은 조세특례제한법에 있어요.' },
        { type: 'p', ans: `비과세를 적용하면 ${won(taxFreeGap)}원을 더 받아요.`, text: `같은 조건에서 일반 과세는 ${won(R.maturity)}원, 비과세는 ${won(FREE.maturity)}원이에요. 만 65세 이상이나 장애인처럼 자격이 되는 사람만 가입할 수 있고 한도가 정해져 있어요.` },
      ] },

      { id: 's4', h2: '비과세 적금은 누가 가입할 수 있나요', sub: '나이와 자격 요건이 있어요', blocks: [
        { type: 'p', lead: true, ans: '만 65세 이상이거나 장애인, 독립유공자처럼 정해진 자격이 있어야 해요.', text: '비과세종합저축은 가입 한도가 정해져 있고, 모든 금융기관을 합쳐 계산해요. 자격이 없다면 청년 우대 상품이나 개인종합자산관리계좌처럼 세금을 줄여 주는 다른 상품을 찾아보는 편이 좋아요.' },
        { type: 'table', text: true, caption: '세금을 줄이는 저축 상품', headers: ['상품', '특징'], rows: [
          { cells: ['비과세종합저축', '자격 요건을 갖춘 사람만 가입해요. 이자에 세금이 없어요'] },
          { cells: ['개인종합자산관리계좌', '일정 금액까지 비과세하고 넘는 부분은 낮은 세율로 분리과세해요'] },
          { cells: ['청년 대상 상품', '나이와 소득 요건을 채우면 우대금리나 정부 기여금을 받아요'] },
          { cells: ['일반 적금', `이자에 ${pctOf(C.INTEREST_TAX_RATE)}%가 붙어요`] },
        ], fn: '상품별 요건과 한도는 조세특례제한법에서 정하고 해마다 바뀔 수 있어요.' },
        { type: 'tips', items: [
          { title: '우대금리 조건을 먼저 확인하세요', text: '급여 이체나 카드 실적 같은 조건을 못 채우면 기본금리만 받아요. 조건을 지킬 수 있는지 보고 고르세요.' },
          { title: '만기 후에는 이율이 확 떨어져요', text: '만기가 지나면 훨씬 낮은 이율이 적용돼요. 알림을 걸어 두고 만기일에 바로 처리하세요.' },
          { title: '금융소득이 크면 종합과세를 보세요', text: '한 해 이자와 배당을 합쳐 2천만원을 넘으면 다른 소득과 합산해 세금을 다시 계산해요.' },
        ] },
      ] },

      { id: 's5', h2: '적금 중도해지하면 이자를 얼마나 받나요', sub: '약정 금리 대신 중도해지 이율이에요', blocks: [
        { type: 'p', lead: true, ans: '약정한 금리가 아니라 훨씬 낮은 중도해지 이율이 적용돼요.', text: '기간이 짧을수록 이율이 더 낮아지고, 우대금리도 대부분 사라져요. 급하게 돈이 필요하다면 해지 대신 예금담보대출이나 일부 인출이 가능한 상품인지 먼저 확인하는 편이 나아요.' },
        { type: 'table', text: true, caption: '중도해지 전에 확인할 것', headers: ['항목', '내용'], rows: [
          { cells: ['중도해지 이율', '가입 기간에 따라 단계적으로 정해져요. 약관에 표시돼 있어요'] },
          { cells: ['우대금리', '조건을 채웠어도 중도해지하면 대부분 빠져요'] },
          { cells: ['예금담보대출', '적금을 담보로 빌리면 해지하지 않고 자금을 마련할 수 있어요'] },
          { cells: ['일부 인출', '상품에 따라 일부만 찾을 수 있는 경우가 있어요'] },
          { cells: ['만기 자동 재예치', '만기 뒤 자동으로 다시 맡길지 미리 정해 둘 수 있어요'] },
        ], fn: '중도해지 이율과 만기 후 이율은 상품 약관과 은행 홈페이지에서 확인할 수 있어요.' },
        { type: 'steps', items: [
          { title: '목표 금액 정하기', text: '언제까지 얼마를 모을지 정하면 월 납입금이 나와요', meta: '5분' },
          { title: '금리 비교', text: '은행별 기본금리와 우대 조건을 비교해요. 조건을 채울 수 있는지가 중요해요', meta: '10분' },
          { title: '만기 금액 확인', text: '월 납입금과 기간, 금리를 넣어 세후 실수령액을 확인해요', meta: '2분', link: { label: '적금 이자 계산기', href: '/installment/' } },
          { title: '자동이체 설정', text: '급여일 다음 날로 자동이체를 걸어 두면 빠뜨리지 않아요', meta: '가입 시' },
        ] },
      ] },
    ],
    faq: [
      ['적금 이자 계산은 어떻게 하나요?', `납입할 때마다 남은 기간만큼 이자가 붙어요. 월 50만원을 24개월 연 4%로 넣으면 이자가 <b>${won(R.interest)}원</b>이에요.`],
      ['단리와 복리는 얼마나 차이 나나요?', `같은 조건에서 복리가 ${won(modeGap)}원 많아요. 기간이 길어질수록 차이가 커져요.`],
      ['적금 이자에 세금이 얼마인가요?', `이자의 ${pctOf(C.INTEREST_TAX_RATE)}%예요. 이자소득세 14%와 지방소득세 1.4%를 합친 금액이고 은행이 만기에 떼요.`],
      ['만기 실수령액은 얼마인가요?', `월 50만원 24개월 연 4%면 원금 ${won(R.principal)}원에 세후 이자를 더해 ${won(R.maturity)}원이에요.`],
      ['비과세 적금은 누가 가입하나요?', `만 65세 이상이나 장애인처럼 자격이 있어야 해요. 같은 조건에서 ${won(taxFreeGap)}원을 더 받아요.`],
      ['연 4% 적금인데 왜 4%가 안 되나요?', `매달 나눠 넣기 때문이에요. 원금 대비 세후 수익률은 약 ${effRate}%가 돼요.`],
      ['중도해지하면 이자를 못 받나요?', '약정 금리 대신 훨씬 낮은 중도해지 이율이 적용돼요. 우대금리도 대부분 빠져요.'],
    ],
    summary: [
      `적금은 납입할 때마다 남은 기간만큼 이자가 붙어요. 월 50만원 24개월 4%면 이자가 ${won(R.interest)}원이에요.`,
      `이자에는 ${pctOf(C.INTEREST_TAX_RATE)}%의 세금이 붙어 만기 실수령액은 ${won(R.maturity)}원이에요.`,
      `복리는 단리보다 ${won(modeGap)}원 많고, 기간이 길수록 차이가 커져요.`,
      '중도해지하면 약정 금리 대신 훨씬 낮은 이율이 적용되니 기간을 무리하게 잡지 마세요.',
    ],
    sources: [
      ['법령', '소득세법 제16조(이자소득), 제129조(원천징수세율, 그 밖의 이자소득 100분의 14). 지방세법(이자소득에 대한 개인지방소득세 특별징수). 조세특례제한법(비과세종합저축과 개인종합자산관리계좌 과세특례).'],
      ['정부 도구', `금융감독원 금융상품통합비교공시의 적금 이자 계산 방식과 같은 구조예요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '그 밖의 이자소득에 대해서는 100분의 14', note: '이자소득 원천징수 14% (소득세법 제129조①1라)' },
      { src: 1, quote: '제16조(이자소득) ① 이자소득은 해당 과세기간에 발생한 다음 각 호의 소득으로 한다', note: '이자소득의 범위 (제16조①)' },
      { src: 2, quote: '해당 저축에서 발생하는 이자소득 및 배당소득에 대해서는 소득세를 부과하지 아니한다', note: '비과세종합저축 과세특례 (조세특례제한법 제88조의2①)' },
      { src: 2, quote: '65세 이상인 거주자로서 「기초연금법」 제2조제3호에 따른 기초연금 수급자', note: '비과세종합저축 가입 자격 (제88조의2①1)' },
      { src: 1, quote: '원천징수의무자가 제127조제1항 각 호에 따른 소득을 지급하여 소득세를 원천징수할 때 적용하는 세율', note: '원천징수세율 적용 (제129조①)' },
    ],
    related: [
      { kind: '계산기', label: '적금 이자 계산기', href: '/installment/' },
      { kind: '저축 계산기', label: '예금 이자 계산기', href: '/deposit/' },
      { kind: '저축 계산기', label: '자유적금 계산기', href: '/free-savings/' },
    ],
  };
}
