/**
 * 스포크 글: 양도세 세율 표와 누진공제 (/transfer-tax/rate/)
 *   허브 총정리 글은 "2년 이상 6%부터 45%까지 누진세율" 한 줄과 주택 단기 70·60% 표뿐이다.
 *
 *   이 글만의 답: 기본세율 8구간과 누진공제 전체, 누진공제로 세금을 따라가는 흐름,
 *   상가·토지 단기 50·40%, 같은 집이 조정대상지역 2주택·3주택 중과로 세금이 얼마로 바뀌는지,
 *   2026년 5월 9일 기한과 계약 경과 규정(시행령 제167조의10①12의2, 제167조의3①12의2 원문 그대로), 분양권 60·70%와 미등기 70%.
 *     · 세율 (소득세법 제104조①②⑤⑦), 기본공제 미등기 제외 (제103조①1), 장특공 대상 (제95조②), 미등기 비과세 배제 (제91조①)
 *     · 기본세율 구간은 엔진 상수 tables.incomeTaxBrackets (근거 텍스트의 제55조 세율표 칸이 비어 있어 엔진 상수로 쓴다)
 *   엔진 주의: ENGINE-ISSUES #7(adjusted 는 필요경비 무시) → adjusted 는 expense 0 만,
 *   #33(adjusted 는 단기세율 무시) → adjusted 는 보유 2년 이상만. 위젯도 보유 2년 이상 기준이다.
 *   비사업용 토지 세율(제104조①8)은 근거 텍스트에 세율 칸이 없어 숫자로 쓰지 않는다. 분양권·토지 금액은 계산기 모드가 없어 쓰지 않는다.
 *   검색어 근거: scripts/keyword-data/terms.transfer-tax.json (네이버 자동완성 2026-09-13)
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('realestate/transfer-tax');
  const tt = (o) => calculators['transfer-tax']({ taxMode: '1home', expense: 0, adjustedArea: 'no', homeCount: 2, livedYears: 0, ...o }, spec);
  const pct = (r) => `${+(r * 100).toFixed(1)}%`;
  const C = spec.constants;
  const BR = spec.tables.incomeTaxBrackets.brackets;

  // 필요경비 스포크와 같은 사람: 3억원에 사서 5억원에 판 2주택, 보유 5년, 필요경비 0
  const BASE = { salePrice: 5e8, acquisitionPrice: 3e8, holdingYears: 5 };
  const MU = tt({ ...BASE, taxMode: 'multi' });
  const AD2 = tt({ ...BASE, taxMode: 'adjusted', adjustedArea: 'yes', homeCount: 2 });
  const AD3 = tt({ ...BASE, taxMode: 'adjusted', adjustedArea: 'yes', homeCount: 3 });
  const H1 = tt({ ...BASE, taxMode: 'multi', holdingYears: 1 });
  const H0 = tt({ ...BASE, taxMode: 'multi', holdingYears: 0 });
  const bOf = (base) => BR.find((b) => b.upperBound === null || base <= b.upperBound);
  const MB = bOf(MU.taxableBase);
  const gross = derive(Math.round(MU.taxableBase * MB.rate));
  const add2 = derive(Math.round((AD2.surcharge / AD2.taxableBase) * 100) / 100);
  const add3 = derive(Math.round((AD3.surcharge / AD3.taxableBase) * 100) / 100);
  const baseUp = derive(AD2.taxableBase - MU.taxableBase);
  const heavyGap = derive(AD2.totalTax - MU.totalTax);
  const heavyRate = derive(Math.round((MB.rate + add2) * 100) / 100);
  const LAWDATE = '2026년 9월 3일';

  // 구간표: 하한·상한·세율·누진공제·구간 끝 세금
  const ROWS = BR.map((b, i) => {
    const lo = i ? BR[i - 1].upperBound : 0;
    const range = b.upperBound === null ? `${man(lo)}원 초과` : (lo ? `${man(lo)}원 초과 ${man(b.upperBound)}원 이하` : `${man(b.upperBound)}원 이하`);
    const top = b.upperBound === null ? '·' : `${won(derive(Math.round(b.upperBound * b.rate - b.progressiveDeduction)))}원`;
    return { b, cells: [range, pct(b.rate), b.progressiveDeduction ? `${won(b.progressiveDeduction)}원` : '0원', top] };
  });

  return {
    slug: 'transfer-tax-rate-guide', cat: 'realestate', catLabel: '부동산', crumb: '양도세 세율',
    faqFixed: 2,
    title: '양도세 세율 표와 누진공제, 2주택 중과 세율은 얼마나 되나요',
    description: `양도세 기본세율은 과세표준에 따라 6%부터 45%까지 8단계이고, 구간 세율을 곱한 뒤 누진공제를 빼요. 조정대상지역 2주택은 20%포인트, 3주택 이상은 30%포인트를 더해요. 세율 표, 단기 세율, 2026년 5월 9일 기한, 분양권과 미등기 세율을 정리했어요.`,
    datePublished: '2026-10-30', verified: VERIFIED, basis: '2026년 10월 기준', readMinutes: 9,
    badge: `소득세법 세율 원문 · 양도소득세 계산기 산식 · ${VERIFIED}`,
    calc: { href: '/transfer-tax/calculator/', label: '양도소득세 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '양도세 세율 표', line2: '6%부터 45%까지',
      sub1: '조정 2주택은 20%포인트를 더해요',
      sub2: '3억에 사서 5억에 판 2주택 기준',
      foot: `소득세법 세율 원문 · ${VERIFIED} 검증`,
      card: { label: '조정 2주택 중과', big: won(AD2.totalTax), unit: '원', l1: `중과 없으면 ${won(MU.totalTax)}원`, l2: '보유 5년' },
      alt: `양도세 세율 표와 누진공제. 기본세율 6~45% 8단계, 조정대상지역 2주택은 20%포인트, 3주택 이상은 30%포인트를 더해요`,
    },
    intro: `양도세 기본세율은 과세표준에 따라 6%부터 45%까지 8단계예요. 과세표준에 그 구간의 세율을 곱하고 누진공제를 빼면 세금이 나와요. 조정대상지역 2주택은 여기에 20%포인트, 3주택 이상은 30%포인트를 더해요. 3억원에 사서 5억원에 판 집을 5년 보유했다면 중과가 없을 때 ${won(MU.totalTax)}원, 조정대상지역 2주택 중과면 ${won(AD2.totalTax)}원이에요. 단기 세율과 분양권, 미등기 세율까지 정리했어요.`,
    answer: {
      label: '어떤 세율인지 눌러 보세요 (지방소득세 별도)',
      quick: [
        { chip: '기본세율 표', selected: true, big: `${pct(BR[0].rate)}~${pct(BR[BR.length - 1].rate)}`, unit: '8단계 누진세율', sub: '2년 이상 보유한 주택·토지·건물' },
        { chip: '조정대상지역 2주택', big: `${Math.round(add2 * 100)}%포인트`, unit: '기본세율에 더해요', sub: '조정대상지역 1세대 2주택 중과' },
        { chip: '조정대상지역 3주택 이상', big: `${Math.round(add3 * 100)}%포인트`, unit: '기본세율에 더해요', sub: '조정대상지역 1세대 3주택 이상 중과' },
        { chip: '중과 예시', big: `${won(AD2.totalTax)}원`, unit: '양도세 (지방소득세 포함)', sub: '3억원 취득, 5억원 매도, 보유 5년' },
      ],
      boxes: [
        { title: '누진공제는 한 번에 빼는 금액이에요', text: '구간마다 따로 계산하는 대신 과세표준 전체에 구간 세율을 곱하고 누진공제를 빼요' },
        { title: '중과는 날짜를 함께 봐요', text: '보유 2년 이상이고 정해진 기한 안에 팔았거나 계약한 집은 중과에서 빠졌어요. 그 경과 기한은 늦어도 2026년 11월 9일에 끝나요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 양도세 세율',
      rows: [
        ['세율이 바뀌는 과세표준', BR.filter((b) => b.upperBound).map((b) => `${man(b.upperBound)}`).join('·') + '원'],
        ['누진공제 예', `과세표준 ${won(MU.taxableBase)}원 × ${pct(MB.rate)} − ${won(MB.progressiveDeduction)}원`],
        ['상가·토지 단기', '1년 미만 50%, 1년 이상 2년 미만 40%'],
        ['2년 안에 판 중과 대상', '중과 세율과 단기 세율 중 큰 세금'],
        ['조정대상지역 2주택 중과', `기본세율 + ${Math.round(add2 * 100)}%포인트, 장기보유특별공제 0%`],
        ['조정대상지역 3주택 이상 중과', `기본세율 + ${Math.round(add3 * 100)}%포인트`],
        ['분양권', '1년 미만 70%, 그 뒤로는 60%'],
        ['미등기 자산', '70%, 기본공제 250만원 없음'],
      ],
    },
    sections: [
      { id: 's1', h2: '양도세 세율 표, 구간은 몇 단계인가요?', sub: '종합소득세와 같은 표를 써요', blocks: [
        { type: 'table', id: 'rateTbl', compact: true, x: [3], net: 2, caption: '양도세 기본세율과 누진공제 (2년 이상 보유한 주택·토지·건물)', headers: ['과세표준', '세율', '누진공제', '구간 끝의 세금'],
          rows: ROWS.map(({ b, cells }) => ({ hi: b === MB, cells })),
          moreLabel: '구간 끝의 세금 보기',
          fn: '구간 끝의 세금은 과세표준이 그 구간 상한일 때 소득세예요. 지방소득세는 따로 그 10%를 더 내요.' },
        { type: 'p', lead: true, ans: '8단계예요. 과세표준이 커질수록 넘는 부분에 더 높은 세율이 붙어요.', text: '과세표준은 양도차익에서 장기보유특별공제와 기본공제를 뺀, 세율을 곱하는 금액이에요. 2년 이상 보유한 주택, 토지, 건물에 쓰는 기본세율이에요. 법은 종합소득세 세율을 그대로 쓰게 해서 두 세금의 표가 같아요. 다만 양도소득은 근로소득 같은 다른 소득과 합치지 않고 따로 계산해요.' },
        { type: 'p', ans: '높은 세율은 구간을 넘는 부분에만 붙어요.', text: `과세표준이 ${pct(MB.rate)} 구간이어도 ${man(BR[0].upperBound)}원까지는 ${pct(BR[0].rate)}, ${man(BR[1].upperBound)}원까지는 ${pct(BR[1].rate)}처럼 아래 구간 몫은 낮은 세율 그대로예요. 누진공제는 그 차이를 한 번에 맞춰 주려고 미리 정해 둔 금액이에요.` },
      ] },

      { id: 's2', h2: '양도세 누진공제로 세금을 어떻게 계산하나요?', sub: '과세표준 × 구간 세율 − 누진공제', blocks: [
        { type: 'flow', label: '3억원에 사서 5억원에 판 2주택 (보유 5년, 중과 없음)', steps: [
          { label: '양도차익', value: `${won(MU.gain)}원`, sub: '판 값 5억 − 산 값 3억', op: '−' },
          { label: '장기보유특별공제', value: pct(MU.ltbcRate), sub: `${won(MU.incomeAmount)}원 남아요`, op: '−' },
          { label: '과세표준', value: `${won(MU.taxableBase)}원`, sub: '기본공제 250만원 뺀 금액', op: '×' },
          { label: '산출세액', value: `${won(MU.taxBeforeLocal)}원`, sub: `${pct(MB.rate)} − ${won(MB.progressiveDeduction)}원`, op: '+' },
          { label: '양도세 합계', value: `${won(MU.totalTax)}원`, sub: `지방소득세 ${won(MU.localTax)}원 포함` },
        ] },
        { type: 'p', lead: true, ans: '과세표준이 어느 구간인지 찾고, 그 구간 세율을 곱한 뒤 누진공제를 빼면 돼요.', text: `위 예시에서 곱셈 결과는 ${won(gross)}원이고, 누진공제를 빼면 산출세액이 나와요. 아래 구간들을 낮은 세율로 하나씩 계산해 더한 값과 같아요.` },
        { type: 'p', ans: '양도차익은 판 값에서 산 값과 필요경비를 뺀 금액이에요.', text: '이 예시는 필요경비를 0원으로 뒀어요. 취득세나 중개수수료를 필요경비로 넣으면 과세표준이 줄어 세율 구간이 내려갈 수도 있어요.', link: { href: '/transfer-tax/expense/', label: '양도세 필요경비 인정 항목' } },
        { type: 'widget', label: '과세표준으로 세금 보기', title: '내 과세표준으로 바로 보기', note: '2년 이상 보유한 자산의 과세표준을 넣어요. 지방소득세를 더한 금액이에요. 중과 두 칸은 조정대상지역 중과 대상일 때만 해당하고, 중과 대상은 장기보유특별공제가 없으니 그 공제를 빼지 않은 과세표준을 넣어요.',
          inputs: [
            { id: 'rb', label: '과세표준 (만원)', type: 'number', value: 17750, min: 0, max: 500000, step: 100 },
          ],
          outputs: [{ id: 'rrate', label: '적용 구간 세율' }, { id: 'rbase', label: '중과 없을 때' }, { id: 'rh2', label: '조정 2주택 중과' }, { id: 'rh3', label: '조정 3주택 이상 중과' }],
          port: `
  var RB = ${JSON.stringify(BR.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  function rtax(base){
    var t = 0, rate = 0;
    for (var i = 0; i < RB.length; i++) { if (RB[i][0] === null || base <= RB[i][0]) { t = Math.round(base * RB[i][1] - RB[i][2]); rate = RB[i][1]; break; } }
    t = Math.max(0, t);
    var a = Math.max(0, t + Math.round(base * ${add2}));
    var b = Math.max(0, t + Math.round(base * ${add3}));
    return { rate: rate, plain: t + Math.round(t * ${C.LOCAL_TAX_RATE}), h2: a + Math.round(a * ${C.LOCAL_TAX_RATE}), h3: b + Math.round(b * ${C.LOCAL_TAX_RATE}) };
  }`,
          js: `
  function rrender(){ var base=Math.max(0,(+document.getElementById('rb').value||0)*1e4); var r=rtax(base);
    document.getElementById('rrate').textContent=(r.rate*100).toFixed(0)+'%'; document.getElementById('rbase').textContent=won(r.plain)+'원'; document.getElementById('rh2').textContent=won(r.h2)+'원'; document.getElementById('rh3').textContent=won(r.h3)+'원'; }
  document.getElementById('rb').addEventListener('input',rrender); rrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            const sale = (base) => ({ salePrice: base + C.BASIC_DEDUCTION, acquisitionPrice: 0, holdingYears: 2 });
            for (let m = 0; m <= 300000; m += 37) {
              n++;
              const base = m * 1e4;
              const q = port.rtax(base);
              const e0 = tt({ ...sale(base), taxMode: 'multi' });
              const e2 = tt({ ...sale(base), taxMode: 'adjusted', adjustedArea: 'yes', homeCount: 2 });
              const e3 = tt({ ...sale(base), taxMode: 'adjusted', adjustedArea: 'yes', homeCount: 3 });
              if (e0.taxableBase !== base || q.plain !== e0.totalTax || q.h2 !== e2.totalTax || q.h3 !== e3.totalTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '상가나 토지도 2년 안에 팔면 주택과 같은 세율인가요?', sub: '상가·토지는 50%와 40%예요', blocks: [
        { type: 'p', lead: true, ans: '아니에요. 2년 안에 팔면 상가와 토지는 주택보다 세율이 20%포인트 낮아요.', text: '1년 미만은 주택 70%·상가·토지 50%, 1년 이상 2년 미만은 주택 60%·상가·토지 40%예요. 2년을 채우면 둘 다 같은 기본세율로 돌아가요. 보유기간은 잔금을 치른 날부터 판 날까지 세요.' },
        { type: 'p', ans: '주택에 딸린 토지와 조합원입주권은 주택과 같은 단기 세율을 써요.', text: '집에 딸린 토지도 법이 정한 범위 안이면 상가·토지 세율이 아니라 주택 세율이에요. 단기 보유는 장기보유특별공제도 없어서, 세율 차이가 거의 그대로 세금 차이가 돼요.' },
        { type: 'p', ans: `같은 주택도 1년 차이로 세금이 크게 달라져요.`, text: `3억원에 사서 5억원에 판 2주택이라면 1년 미만은 ${won(H0.totalTax)}원, 1년 이상 2년 미만은 ${won(H1.totalTax)}원이에요. 5년을 채우면 앞에서 본 기본세율 계산으로 내려가요.` },
        { type: 'note', title: '비사업용 토지는 따로 정한 세율이에요', text: '사업에 쓰지 않는 농지, 임야 같은 토지는 법이 별도 세율 항목으로 정해 둬요. 이 글의 표와 계산 상자에는 넣지 않았어요.' },
      ] },

      { id: 's4', h2: '조정대상지역 2주택 중과 세율은 몇 퍼센트인가요?', sub: '판 날과 계약한 날을 함께 봐요', blocks: [
        { type: 'table', net: 4, caption: '같은 집을 팔 때 중과 여부별 양도세 (3억원 취득, 5억원 매도, 보유 5년)', headers: ['구분', '장기보유특별공제', '과세표준', '더하는 세율', '양도세 합계'], rows: [
          { cells: ['2주택, 중과 없음', pct(MU.ltbcRate), `${won(MU.taxableBase)}원`, '없음', `${won(MU.totalTax)}원`] },
          { hi: true, cells: ['조정대상지역 2주택 중과', pct(AD2.ltbcRate), `${won(AD2.taxableBase)}원`, `${Math.round(add2 * 100)}%포인트`, `${won(AD2.totalTax)}원`] },
          { cells: ['조정대상지역 3주택 이상 중과', pct(AD3.ltbcRate), `${won(AD3.taxableBase)}원`, `${Math.round(add3 * 100)}%포인트`, `${won(AD3.totalTax)}원`] },
        ], fn: '지방소득세를 포함한 금액이에요. 필요경비는 넣지 않았고, 보유 2년 이상 기준이에요.' },
        { type: 'p', lead: true, ans: `기본세율에 ${Math.round(add2 * 100)}%포인트를 더해요. 3주택 이상이면 ${Math.round(add3 * 100)}%포인트를 더해요.`, text: `조정대상지역은 주택법에 따라 지정된 지역이에요. %포인트는 세율에 그 숫자를 더한다는 뜻이라 ${pct(MB.rate)} 구간이면 ${pct(heavyRate)}가 돼요. 같은 집을 조정대상지역 2주택 중과로 팔면 중과가 없을 때보다 세금이 ${won(heavyGap)}원 많아요.` },
        { type: 'p', ans: '중과 대상 2주택은 장기보유특별공제도 받지 못해요.', text: `세율이 오르는 데 더해 과세표준도 커져요. 이 예시에서는 공제 ${pct(MU.ltbcRate)}가 사라져 과세표준이 ${won(baseUp)}원 늘었어요.`, link: { href: '/transfer-tax/long-term-deduction/', label: '장기보유특별공제율 표' } },
        { type: 'timeline', label: `조정대상지역 다주택 중과 제외 경과 규정 (보유 2년 이상인 집, ${LAWDATE} 확인한 시행령 기준)`, items: [
          { step: '5.9까지', title: '2026년 5월 9일까지 판 집', text: '중과에서 빠졌어요', tag: '끝남' },
          { step: '허가 대상 아님', title: '5월 9일까지 계약하고 계약금을 받은 집', text: '계약일부터 4개월 안에 팔면 빠졌어요. 이 4개월은 늦어도 2026년 9월 9일에 끝났어요. 시행령 표에 든 지역은 6개월이라 늦어도 11월 9일까지예요', tag: '6개월 지역만 남음' },
          { step: '허가 대상', title: '토지거래허가 대상 집, 5월 9일까지 허가 신청', text: '허가받고 계약한 뒤 계약일부터 4개월(표의 지역은 6개월) 안에 팔면 빠져요. 5월 10일 이후 계약했다면 2026년 9월 9일(표의 지역은 11월 9일)까지 팔아야 해요', tag: '6개월 지역만 남음' },
          { step: '그 밖', title: '위에 해당하지 않는 양도', text: '다른 제외 사유가 없으면 2주택 20%포인트, 3주택 이상 30%포인트를 더해요', tag: '중과', mark: true },
        ] },
        { type: 'p', ans: '2026년 5월 10일 이후 판 집도 중과에서 빠지는 길이 있었어요.', text: '그날까지 계약하고 계약금을 받은 집이나 토지거래허가를 신청해 둔 집이에요. 토지거래허가는 허가구역 안 부동산을 거래할 때 받아야 하는 허가예요. 계약금 받은 사실은 증빙서류로 확인돼야 해요.' },
        { type: 'note', title: '마지막 경과 기한은 2026년 11월 9일이에요', text: '4개월을 주는 경우는 늦어도 2026년 9월 9일에 모두 끝났어요. 시행령 표에 든 지역의 6개월도 그날 끝나요. 해당 지역 목록은 시행령의 표에 있어요.' },
        { type: 'p', ans: '일시적 2주택으로 1주택 비과세를 받는 집은 중과에서 빠져요.', text: '1주택 비과세 요건을 모두 채운 경우예요. 일시적 2주택은 새 집을 산 날부터 3년 안에 옛 집을 팔아야 해요.', link: { href: '/transfer-tax/temporary-two-house/', label: '일시적 2주택 비과세' } },
        { type: 'p', ans: '지방의 싼 집과 기준시가 1억원 이하 집도 빠져요.', text: '수도권과 광역시·특별자치시 밖에 있는 집은 기준시가(세금 계산용으로 정부가 매긴 가격) 3억원 이하면 중과에서 빠지고 주택 수에도 넣지 않아요. 광역시에 속한 군 같은 일부 지역도 이 3억원 기준을 쓰는 지역에 들어가요. 기준시가 1억원 이하인 집도 빠지지만, 재개발·재건축 정비구역 안의 집은 예외예요.' },
        { type: 'p', ans: '2년 안에 판 중과 대상 주택은 중과 세율과 단기 세율 중 큰 세금을 내요.', text: `같은 집을 1년 이상 2년 미만에 팔았다면 중과 세율로는 산출세액 ${won(AD2.totalIncomeTax)}원, 단기 세율 60%로는 ${won(H1.taxBeforeLocal)}원이에요. 큰 쪽인 단기 세율 금액을 내고, 지방소득세를 더하면 ${won(H1.totalTax)}원이에요.` },
      ] },

      { id: 's5', h2: '분양권과 미등기 양도세율은 얼마인가요?', sub: '분양권은 2년이 지나도 60%예요', blocks: [
        { type: 'table', text: true, caption: '분양권과 미등기 자산의 세율과 공제', headers: ['구분', '세율', '기본공제 250만원', '장기보유특별공제'], rows: [
          { cells: ['분양권, 1년 미만', '70%', '받아요', '대상 아님'] },
          { hi: true, cells: ['분양권, 1년 이상', '60%', '받아요', '대상 아님'] },
          { cells: ['미등기 토지·건물', '70%', '못 받아요', '못 받아요'] },
        ], fn: '분양권 세율은 소득세법 제104조제1항제1호부터 제3호, 미등기양도자산은 제104조제1항제10호와 제3항이에요. 기본공제 제외는 제103조제1항제1호 단서, 장기보유특별공제 대상은 제95조제2항이에요.' },
        { type: 'p', lead: true, ans: '분양권은 오래 갖고 있어도 기본세율로 내려가지 않아요. 미등기 자산은 70% 세율에 공제까지 빠져요.', text: '미등기 자산은 산 사람이 취득 등기를 하지 않은 채 파는 토지나 건물이에요. 1주택이어도 비과세 규정을 적용하지 않아요.' },
        { type: 'p', ans: '조정대상지역 주택과 분양권을 함께 가진 세대는 그 주택을 팔 때 중과될 수 있어요.', text: '1주택과 분양권 1개면 주택에 20%포인트, 둘을 합쳐 3개 이상이면 30%포인트를 더해요. 장기임대주택 같은 법이 정한 주택은 빠지고, 2주택과 같은 경과 규정을 둬요.' },
        { type: 'p', ans: '등기를 못 하는 사정이 법으로 정해진 자산은 미등기로 보지 않아요.', text: '장기할부로 사서 계약조건상 아직 등기할 수 없는 자산, 법률이나 법원 결정으로 등기할 수 없는 자산이 그래요. 1주택 비과세 요건을 갖춘 집인데 건축허가를 받지 않아 등기할 수 없는 경우도 같아요. 도시개발사업이 끝나지 않아 취득 등기를 못 한 토지도 미등기에서 빠져요.' },
      ] },
    ],
    faq: [
      ['한 해에 집을 두 채 팔면 세율이 달라지나요?', '달라질 수 있어요. 그해 판 토지·건물 등의 과세표준을 모두 합쳐 기본세율로 계산한 세금과 자산별 세금의 합계 가운데 큰 쪽을 내요. 건별로는 낮은 구간이어도 합치면 높은 구간에 걸려 합산 쪽이 커질 수 있어요.'],
      ['상속받은 집을 바로 팔면 단기 세율이 붙나요?', '아닐 수 있어요. 단기 세율을 가르는 보유기간은 돌아가신 분이 그 집을 산 날부터 세요. 그분이 2년 넘게 가졌다면 상속 직후에 팔아도 단기 세율이 아니에요.'],
    ],
    summary: [
      '세율 표를 볼 때는 과세표준이 어느 구간에 걸리는지부터 찾고, 누진공제를 꼭 빼세요.',
      '2년을 채우기 전에 팔면 세율이 크게 뛰니, 잔금일 기준으로 보유기간을 세어 보세요.',
      '조정대상지역 2주택은 세율과 공제가 함께 바뀌어, 이 글의 예시에서는 세금이 거의 두 배였어요.',
      '중과 경과 규정은 2026년 11월 9일로 모두 끝나요. 그 뒤에는 지방 3억원 이하 같은 상시 제외 사유만 따져요.',
    ],
    sources: [
      ['법령', '소득세법 제55조(종합소득세 세율), 제91조(미등기양도자산 비과세 배제), 제95조(장기보유 특별공제 대상), 제103조(양도소득 기본공제, 미등기양도자산 제외), 제104조(양도소득세의 세율: 제1항 기본·단기·분양권·미등기, 제2항 상속 자산 보유기간, 제5항 한 해 두 건 이상 양도, 제7항 조정대상지역 중과). 소득세법 시행령 제167조의3(1세대 3주택 이상 중과 제외, 2026년 5월 9일 기한), 제167조의10(1세대 2주택 중과 제외, 2026년 5월 9일 기한과 계약 경과 규정), 제167조의11(주택과 분양권 중과 제외), 제168조(미등기양도 제외 자산).'],
      ['정부 도구', `세율 구간과 누진공제, 세금은 양도소득세 계산기 산식 값이에요. 계산기는 홈택스 양도소득세 간편계산과 0원 일치를 ${spec.lastVerified}에 확인했어요. 법령 원문은 2026년 9월 3일 수집본이에요.`],
    ],
    claims: [
      { src: 1, quote: '제55조제1항에 따른 세율(분양권의 경우에는 양도소득 과세표준의 100분의 60)', note: '기본세율, 분양권 60% (제104조①1)' },
      { src: 1, quote: '양도소득 과세표준의 100분의 40[주택(이에 딸린 토지로서 대통령령으로 정하는 토지를 포함한다. 이하 이 항에서 같다), 조합원입주권 및 분양권의 경우에는 100분의 60]', note: '1년 이상 2년 미만 (제104조①2)' },
      { src: 1, quote: '양도소득 과세표준의 100분의 50(주택, 조합원입주권 및 분양권의 경우에는 100분의 70)', note: '1년 미만 (제104조①3)' },
      { src: 1, quote: '제104조의3에 따른 비사업용 토지', note: '비사업용 토지 별도 항목 (제104조①8, 세율 칸은 근거 텍스트에 없음)' },
      { src: 1, quote: '미등기양도자산 양도소득 과세표준의 100분의 70', note: '미등기 70% (제104조①10)' },
      { src: 1, quote: '자산을 취득한 자가 그 자산 취득에 관한 등기를 하지 아니하고 양도하는 것을 말한다', note: '미등기 정의 (제104조③)' },
      { src: 1, quote: '다만, 제104조제3항에 따른 미등기양도자산의 양도소득금액에 대해서는 그러하지 아니하다', note: '미등기 기본공제 없음 (제103조①1)' },
      { src: 1, quote: '미등기양도자산에 대하여는 이 법 또는 이 법 외의 법률 중 양도소득에 대한 소득세의 비과세에 관한 규정을 적용하지 아니한다', note: '미등기 비과세 배제 (제91조①)' },
      { src: 1, quote: '제104조제3항에 따른 미등기양도자산과 같은 조 제7항 각 호에 따른 자산은 제외한다', note: '장특공에서 미등기·중과 대상 제외 (제95조②)' },
      { src: 1, quote: '조합원입주권(조합원으로부터 취득한 것은 제외한다)', note: '장특공 대상은 조합원입주권, 분양권은 목록에 없음' },
      { src: 1, quote: '제55조제1항에 따른 세율에 100분의 20(제3호 및 제4호의 경우 100분의 30)을 더한 세율을 적용한다', note: '중과 20·30%포인트 (제104조⑦)' },
      { src: 1, quote: '중 큰 세액을 양도소득 산출세액으로 한다', note: '2년 미만 중과는 큰 세액 (제104조⑦ 후단)' },
      { src: 1, quote: '조정대상지역에 있는 주택으로서 1세대가 1주택과 조합원입주권 또는 분양권을 1개 보유한 경우의 해당 주택', note: '주택+분양권 중과 (제104조⑦2)' },
      { src: 1, quote: '1세대가 주택과 조합원입주권 또는 분양권을 보유한 경우로서 그 수의 합이 3 이상인 경우 해당 주택', note: '합 3 이상 30%포인트 (제104조⑦4)' },
      { src: 1, quote: '해당 과세기간의 양도소득과세표준 합계액에 대하여 제55조제1항에 따른 세율을 적용하여 계산한 양도소득 산출세액', note: '한 해 두 건: 합산 계산 (제104조⑤1)' },
      { src: 1, quote: '자산별 양도소득 산출세액 합계액', note: '한 해 두 건: 자산별 합계 (제104조⑤2)' },
      { src: 1, quote: '상속받은 자산은 피상속인이 그 자산을 취득한 날', note: '상속 자산 단기 보유기간 (제104조②1)' },
      { src: 1, quote: '종합소득 및 퇴직소득에 대한 과세표준과 구분하여 계산한다', note: '양도소득 분류과세 (제92조①)' },
      { src: 2, quote: '2026년 5월 9일까지 양도하는 주택', note: '중과 제외 기한 (시행령 제167조의10①12의2가)' },
      { src: 2, quote: '법 제95조제4항에 따른 보유기간이 2년', note: '보유 2년 이상 요건' },
      { src: 2, quote: '해당 주택을 양도하기 위해 2026년 5월 9일까지 매매계약을 체결하고 계약금을 지급받은 사실이 증빙서류에 의해 확인될 것', note: '기한 전 계약 (다목1)' },
      { src: 2, quote: '매매계약 체결일부터 4개월[나목4)의 표에 따른 지역에 소재한 주택의 경우 6개월] 이내에 양도할 것', note: '4개월, 일부 지역 6개월 (다목2)' },
      { src: 2, quote: '해당 주택을 양도하기 위해 2026년 5월 9일까지 그 주택부수토지의 거래에 대한 토지거래허가를 신청하였을 것', note: '토지거래허가 신청 (나목1)' },
      { src: 2, quote: '2026년 5월 10일 이후에 매매계약을 체결한 경우에는 2026년 9월 9일까지(다음 표에 따른 지역에 소재한 주택의 경우 2026년 11월 9일까지) 양도해야 한다', note: '허가 대상 5월 10일 이후 계약 (나목4 단서)' },
      { src: 2, quote: '제155조 또는 「조세특례제한법」에 따라 1세대가 국내에 1개의 주택을 소유하고 있는 것으로 보거나 1세대 1주택으로 보아 제154조제1항이 적용되는 주택으로서 같은 항의 요건을 모두 충족하는 주택', note: '1주택 비과세 대상은 중과 제외 (제167조의10①15)' },
      { src: 2, quote: '해당 주택 및 이에 부수되는 토지의 기준시가의 합계액이 해당 주택 또는 그 밖의 주택의 양도 당시 3억원을 초과하지 않는 주택', note: '지방 3억 이하 (제167조의10①1)' },
      { src: 2, quote: '(제1호 또는 제12호에 해당하는 주택은 주택의 수를 계산할 때 산입하지 않는다)', note: '주택 수 제외' },
      { src: 2, quote: '주택의 양도 당시 법 제99조에 따른 기준시가가 1억원 이하인 주택', note: '기준시가 1억 이하 (제167조의10①9)' },
      { src: 2, quote: '「도시 및 주거환경정비법」에 따른 정비구역(종전의 「주택건설촉진법」에 따라 설립인가를 받은 재건축조합의 사업부지를 포함한다)으로 지정ㆍ고시된 지역', note: '정비구역은 1억 이하 예외에서 빠짐' },
      { src: 2, quote: '장기할부조건으로 취득한 자산으로서 그 계약조건에 의하여 양도 당시 그 자산의 취득에 관한 등기가 불가능한 자산', note: '미등기 제외 1 (시행령 제168조①1)' },
      { src: 2, quote: '법률의 규정 또는 법원의 결정에 의하여 양도 당시 그 자산의 취득에 관한 등기가 불가능한 자산', note: '미등기 제외 2' },
      { src: 2, quote: '「건축법」에 따른 건축허가를 받지 아니하여 등기가 불가능한 자산', note: '미등기 제외 4 (1주택 비과세 요건 주택)' },
      { src: 2, quote: '「도시개발법」에 따른 도시개발사업이 종료되지 아니하여 토지 취득등기를 하지 아니하고 양도하는 토지', note: '미등기 제외 6' },
      { src: 2, quote: '광역시에 소속된 군', note: '광역시의 군은 지방으로 봄 (제167조의10①1 괄호)' },
      { src: 1, quote: '「주택법」 제63조의2제1항제1호에 따른 조정대상지역(이하 이 조에서 “조정대상지역”이라 한다)', note: '조정대상지역 정의 (제104조⑦1)' },
      { src: 2, quote: '「부동산 거래신고 등에 관한 법률」 제11조에 따른 허가(이하 이 호에서 “토지거래허가”라고 한다)', note: '토지거래허가' },
      { src: 1, quote: '제55조제1항에 따른 세율에 100분의 20(제3호 및 제4호의 경우 100분의 30)을 더한 세율을 적용하여 계산한 양도소득 산출세액과 제1항제2호 또는 제3호의 세율을 적용하여 계산한 양도소득 산출세액 중 큰 세액', note: '2년 미만 중과 비교' },
    ],
    related: [
      { kind: '주제 홈', label: '양도세 무엇이 궁금하세요', href: '/transfer-tax/' },
      { kind: '계산기', label: '양도소득세 계산기', href: '/transfer-tax/calculator/' },
      { kind: '다음 질문', label: '양도세 예정신고 가산세', href: '/transfer-tax/filing/' },
    ],
  };
}
