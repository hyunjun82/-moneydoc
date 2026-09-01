// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/3-양도세-비과세.html
export const meta = {
  title: "1세대 1주택 양도세 비과세 요건, 12억 넘으면 얼마 내나",
  description: "1세대 1주택 양도세 비과세 요건과 12억 초과분 계산. 보유 2년이면 비과세이고 조정대상지역만 거주 2년이 추가됩니다. 양도가별 세액표와 일시적 2주택 처분기한까지 법령 원문으로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/realestate/transfer-tax-guide/",
};

export const widgetKey = "transfer";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>내 집 비과세 판정</b>
<span>양도가와 보유·거주연수를 넣으면 비과세 여부와 과세 대상 차익이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>양도가액 (원)</em><input type="number" id="sale" value="1500000000" step="10000000" min="0"></label>
  <label class="ax-wg-f"><em>취득가액 (원)</em><input type="number" id="acq" value="800000000" step="10000000" min="0"></label>
  <label class="ax-wg-f"><em>보유연수</em><input type="number" id="hold" value="10" step="1" min="0"></label>
  <label class="ax-wg-f"><em>거주연수</em><input type="number" id="live" value="10" step="1" min="0"></label>
  <label class="ax-wg-f"><em>취득 당시 조정대상지역</em>
    <select id="adj"><option value="no">아니오</option><option value="yes">예</option></select></label>
  <label class="ax-wg-f"><em>주택 수</em>
    <select id="one"><option value="1">1세대 1주택</option><option value="0">다주택</option></select></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">비과세 판정과 12억 안분까지만 계산합니다. 세율·장기보유공제를 반영한 최종 세액은 <a href="/realestate/transfer-tax/">양도소득세 계산기</a>에서 확인하세요. 근거: 소득세법 제89조제1항제3호, 같은 법 시행령 제154조제1항.</p>
</div>`;

export const htmlBefore = `<h1>1세대 1주택 양도세 비과세 요건, 12억 넘으면 얼마 내나</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 9분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="1세대 1주택 양도세 — 12억까지 비과세, 초과분만 과세">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="132" height="42" rx="9" fill="#c4452f"/>
<text x="138" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">부동산·세금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">1세대 1주택</text>
<rect x="70" y="312" width="322" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">12억까지 비과세</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">보유 2년 · 초과분만 과세 · 장기보유공제 최대 80%</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(636 140)">
  <ellipse cx="204" cy="296" rx="178" ry="19" fill="#e8ded0" opacity=".55"/>
  <path d="M60 150 L204 56 L348 150" fill="none" stroke="#6b6255" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="92" y="150" width="224" height="128" rx="8" fill="#fdfcfa" stroke="#6b6255" stroke-width="4.5"/>
  <rect x="126" y="182" width="60" height="52" rx="6" fill="#ccdae5" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="222" y="182" width="60" height="96" rx="6" fill="#e8ded0" stroke="#6b6255" stroke-width="3.5"/>
  <circle cx="238" cy="232" r="4.5" fill="#6b6255"/>
  <g transform="translate(292 24)">
    <circle cx="46" cy="46" r="44" fill="#fdf4f1" stroke="#c4452f" stroke-width="5"/>
    <text x="46" y="58" font-size="30" font-weight="800" text-anchor="middle" fill="#c4452f">12억</text>
  </g>
  <text x="204" y="316" font-size="17" font-weight="700" text-anchor="middle" fill="#8a8172">양도가 12억 이하면 세금 0원</text>
</g>
</svg>

<p class="ax-intro">1세대가 1주택만 가지고 <b>2년 이상 보유</b>했다면 양도가 <b>12억원까지 양도세가 없습니다.</b> 흔히 "2년 살아야 한다"고 알려져 있지만, 거주 요건은 <b>취득 당시 조정대상지역</b>에 있던 주택에만 붙습니다. 12억을 넘으면 초과분에 해당하는 몫만 과세되고, 오래 보유·거주했다면 장기보유특별공제로 최대 80%가 빠집니다. 반대로 <b>2026년 5월 10일부터 다주택 중과세율이 부활</b>해, 같은 집이라도 주택 수에 따라 세금이 크게 갈립니다.</p>

<a class="ax-cta" href="/realestate/transfer-tax/">
<span><b>내 양도세 바로 계산하기</b><i>취득가·양도가·보유연수만 넣으면 됩니다</i></span>
<em>양도세 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">비과세 요건</a><a href="#m2">12억 초과 계산 2단계</a><a href="#m3">일시적 2주택</a><a href="#m4">다주택과 차이</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 비과세 요건</b><span>보유 2년 · 12억</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>1세대 1주택 양도세 비과세 요건은 무엇인가요</h3>
<p>요건은 세 가지입니다. 1세대가 양도일 현재 국내에 1주택만 보유할 것, 그 주택을 2년 이상 보유할 것, 양도가액이 12억원 이하일 것입니다. 거주 요건은 모든 주택에 붙는 것이 아닙니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 180" role="img" aria-label="비조정대상지역은 보유 2년, 조정대상지역은 보유 2년과 거주 2년이 필요합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">취득 당시 지역에 따라 요건이 다릅니다</text>
<rect x="0" y="42" width="310" height="78" rx="9" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="155" y="70" font-size="14" font-weight="800" text-anchor="middle" fill="currentColor" letter-spacing="-.3">비조정대상지역</text>
<text x="155" y="94" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor">보유 2년</text>
<text x="155" y="112" font-size="11" text-anchor="middle" fill="currentColor" opacity=".6">거주 요건 없음</text>
<rect x="350" y="42" width="310" height="78" rx="9" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="505" y="70" font-size="14" font-weight="800" text-anchor="middle" fill="#c4452f" letter-spacing="-.3">조정대상지역</text>
<text x="505" y="94" font-size="15" font-weight="700" text-anchor="middle" fill="#c4452f">보유 2년 + 거주 2년</text>
<text x="505" y="112" font-size="11" text-anchor="middle" fill="#c4452f" opacity=".8">보유기간 중 거주</text>
<text x="0" y="150" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">기준은 '양도 당시'가 아니라 '취득 당시' 조정대상지역이었는지입니다</text>
<text x="0" y="170" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">두 경우 모두 양도가액 12억원까지 비과세</text>
</svg>
<figcaption>소득세법 제89조제1항제3호 · 같은 법 시행령 제154조제1항</figcaption>
</figure>
<ul class="ax-ck"><li>1세대 1주택</li><li>보유 2년 이상</li><li>양도가 12억 이하</li><li>조정지역이면 거주 2년 추가</li></ul>
<div class="ax-warn"><span>주의</span><p>"1세대"는 본인과 배우자, 그리고 같은 주소에서 생계를 함께하는 가족을 묶은 단위입니다. 세대를 분리했더라도 <b>배우자는 원칙적으로 분리되지 않습니다.</b></p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 12억 초과 계산</b><span>안분 · 장기보유공제</span></div>

<div class="ax-st ax-b2"><div class="ax-n">2</div><div class="ax-sb">
<h3>12억 초과하면 양도세가 얼마나 나오나요</h3>
<p>12억을 넘겼다고 전체 차익에 세금이 붙는 것이 아닙니다. <b>양도가 중 12억을 넘는 비율만큼만</b> 과세 대상이 됩니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 160" role="img" aria-label="양도차익에 12억 초과분 비율을 곱해 과세 대상 차익을 구합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">과세되는 양도차익 구하는 법</text>
<rect x="0" y="44" width="170" height="52" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="85" y="68" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">전체 양도차익</text>
<text x="85" y="86" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">양도가 − 취득가 − 필요경비</text>
<text x="192" y="76" font-size="22" font-weight="800" text-anchor="middle" fill="#6b6255">×</text>
<rect x="214" y="44" width="220" height="52" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="324" y="68" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">(양도가 − 12억) ÷ 양도가</text>
<text x="324" y="86" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">12억 초과 비율</text>
<line x1="434" y1="70" x2="486" y2="70" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="477,64 477,76 486,70" fill="#c4452f"/>
<rect x="486" y="44" width="174" height="52" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="573" y="76" font-size="14" font-weight="800" text-anchor="middle" fill="#c4452f">과세 대상 차익</text>
<text x="0" y="130" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">양도 15억·취득 8억이면 차익 7억 × (15−12)/15 = 1억 4,000만원만 과세</text>
<text x="0" y="150" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">여기에서 장기보유특별공제(최대 80%)와 기본공제 250만원을 뺀 뒤 세율을 적용</text>
</svg>
<figcaption>소득세법 제95조 (장기보유특별공제) · 제103조 (양도소득기본공제) · 제104조 (세율)</figcaption>
</figure>
<div class="ax-tw"><table>
<thead><tr><th>양도가</th><th>양도차익</th><th>과세 대상 차익</th><th>장기보유공제</th><th>총 세액</th></tr></thead>
<tbody>
<tr><td>10억</td><td>200,000,000</td><td>0</td><td>-</td><td><b>0</b></td></tr>
<tr><td>12억</td><td>400,000,000</td><td>0</td><td>-</td><td><b>0</b></td></tr>
<tr><td>14억</td><td>600,000,000</td><td>85,714,286</td><td>80%</td><td><b>1,030,072</b></td></tr>
<tr class="ax-hi"><td>15억</td><td>700,000,000</td><td>140,000,000</td><td>80%</td><td><b>2,821,500</b></td></tr>
<tr><td>18억</td><td>1,000,000,000</td><td>333,333,333</td><td>80%</td><td><b>10,604,000</b></td></tr>
<tr><td>20억</td><td>1,200,000,000</td><td>480,000,000</td><td>80%</td><td><b>19,013,500</b></td></tr>
<tr><td>25억</td><td>1,700,000,000</td><td>884,000,000</td><td>80%</td><td><b>50,923,400</b></td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 취득가 8억, 보유 10년, 거주 10년, 필요경비 0 기준. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<p class="ax-nt">양도가 15억에 차익이 7억인데 세금이 <b>282만원</b>입니다. 12억 안분으로 과세 대상이 1억 4천만원으로 줄고, 거기에서 장기보유공제 80%가 또 빠지기 때문입니다.</p>
</div></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>장기보유특별공제는 거주기간에 따라 달라집니다</h3>
<p>1세대 1주택은 <b>보유 3년 이상 + 거주 2년 이상</b>이면 우대 공제를 받습니다. 보유연수 × 4%(최대 40%)에 거주연수 × 4%(최대 40%)를 더해 최대 80%입니다. 거주 2년을 못 채우면 일반 공제(최대 30%)만 적용됩니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>거주기간</th><th>장기보유공제</th><th>과세소득</th><th>총 세액</th></tr></thead>
<tbody>
<tr><td>0년</td><td>20% (일반)</td><td>320,000,000</td><td><b>111,166,000</b></td></tr>
<tr><td>2년</td><td>48%</td><td>208,000,000</td><td><b>63,965,000</b></td></tr>
<tr><td>5년</td><td>60%</td><td>160,000,000</td><td><b>43,901,000</b></td></tr>
<tr class="ax-hi"><td>10년</td><td>80%</td><td>80,000,000</td><td><b>14,124,000</b></td></tr>
</tbody></table>
<p class="ax-tn">양도 20억, 취득 10억, 보유 10년, 비조정대상지역 기준. 거주 0년과 10년의 세액 차이가 약 9,704만원입니다.</p></div>
<div class="ax-warn"><span>주의</span><p>비조정대상지역이라 <b>비과세 자체는 거주 없이도 받지만</b>, 12억 초과분에 적용되는 장기보유공제는 거주 2년을 채워야 우대율을 받습니다. 요건이 두 군데에서 따로 걸립니다.</p></div>
<p class="ax-law-l">소득세법 제95조 · 같은 법 시행령 제159조의3</p>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 일시적 2주택</b><span>갈아타기</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>일시적 1가구 2주택 비과세, 처분기한은 언제까지인가요</h3>
<p>이사를 위해 새 집을 먼저 사면 일시적으로 2주택이 됩니다. 이 경우에도 두 가지 기한만 지키면 종전 주택을 1세대 1주택으로 보아 비과세합니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 150" role="img" aria-label="종전주택 취득 후 1년 이상 지나 신규주택을 사고, 신규주택 취득일부터 3년 이내에 종전주택을 팔아야 합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">지켜야 할 두 개의 기한</text>
<line x1="24" y1="80" x2="636" y2="80" stroke="currentColor" stroke-width="2" opacity=".3"/>
<circle cx="24" cy="80" r="7" fill="currentColor" opacity=".55"/>
<text x="24" y="62" font-size="12" font-weight="700" text-anchor="start" fill="currentColor" letter-spacing="-.3">종전주택 취득</text>
<circle cx="300" cy="80" r="7" fill="currentColor" opacity=".55"/>
<text x="300" y="62" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor" letter-spacing="-.3">신규주택 취득</text>
<text x="162" y="104" font-size="11.5" font-weight="700" text-anchor="middle" fill="#c4452f">1년 이상 지난 뒤여야 함</text>
<circle cx="636" cy="80" r="7" fill="#c4452f"/>
<text x="636" y="62" font-size="12" font-weight="700" text-anchor="end" fill="#c4452f" letter-spacing="-.3">종전주택 양도</text>
<text x="468" y="104" font-size="11.5" font-weight="700" text-anchor="middle" fill="#c4452f">3년 이내에 팔아야 함</text>
<text x="0" y="136" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">두 기한을 모두 지키면 종전주택을 1세대1주택으로 보아 비과세합니다</text>
</svg>
<figcaption>소득세법 시행령 제155조제1항</figcaption>
</figure>
<div class="ax-tw"><table>
<thead><tr><th>조건</th><th>내용</th></tr></thead>
<tbody>
<tr><td>신규주택 취득 시기</td><td>종전주택을 취득한 날부터 <b>1년 이상</b> 지난 후</td></tr>
<tr class="ax-hi"><td>종전주택 처분기한</td><td>신규주택을 취득한 날부터 <b>3년 이내</b></td></tr>
<tr><td>종전주택 요건</td><td>1세대 1주택 비과세 요건(보유 2년 등)을 충족할 것</td></tr>
</tbody></table>
<p class="ax-tn">3년 안에 팔지 못하면 일시적 2주택 특례가 적용되지 않아 다주택자로 과세됩니다.</p></div>
<div class="ax-warn"><span>주의</span><p>2026년 세제개편안에 <b>조정대상지역 일시적 2주택의 처분기한을 3년에서 2년으로 줄이는 내용</b>이 담겼습니다. 2026년 8월 4일 이후 취득분부터, 2026년 10월 1일 이후 양도하는 경우에 적용될 예정입니다. 현행 시행령은 아직 3년이므로 양도 시점의 조문을 반드시 확인하세요.</p></div>
</div></div>

<div class="ax-mh" id="m4"><b>4단계 — 다주택과 차이</b><span>같은 집, 다른 세금</span></div>

<div class="ax-st"><div class="ax-n">5</div><div class="ax-sb">
<h3>1세대 1주택과 다주택 세금 차이는 얼마인가요</h3>
<p>완전히 같은 거래인데 주택 수에 따라 세금이 이렇게 갈립니다. 양도가 15억, 취득가 8억, 보유 10년으로 조건을 고정했습니다.</p>
<div class="ax-cp">
  <div class="ax-hi"><em>1세대 1주택 (거주 10년)</em><b>2,821,500원</b><i>12억 안분 + 장특 80%</i></div>
  <div><em>다주택 (비조정, 일반 누진세)</em><b>218,031,000원</b><i>안분 없음 · 장특 20%</i></div>
  <div><em>조정대상지역 2주택</em><b>436,161,000원</b><i>+20%p 가산 · 장특 배제</i></div>
  <div><em>조정대상지역 3주택</em><b>512,886,000원</b><i>+30%p 가산 · 장특 배제</i></div>
</div>
<p class="ax-nt">1세대 1주택과 조정대상지역 3주택의 차이가 <b>5억 65만원</b>입니다. 세율 가산도 크지만, 1주택에만 있는 <b>12억 안분</b>과 <b>장기보유공제 80%</b>가 결정적입니다.</p>
<div class="ax-warn"><span>주의</span><p>다주택 중과세율은 2022년 5월부터 한시적으로 배제돼 왔으나 <b>2026년 5월 9일로 유예가 끝나</b> 5월 10일 양도분부터 다시 적용됩니다. 중과 대상이 되면 세율이 오르는 데 더해 <b>장기보유특별공제가 아예 배제</b>됩니다.</p></div>
<p class="ax-law-l">소득세법 제104조제7항 (중과세율) · 제95조제2항 (중과 대상 장기보유특별공제 배제)</p>
<div class="ax-btns">
<a class="ax-btn" href="/realestate/transfer-tax/"><b>양도소득세 계산기</b><span>1주택·다주택·조정지역 모두</span></a>
<a class="ax-btn" href="/realestate/acquisition-tax/"><b>취득세 계산기</b><span>살 때 내는 세금도 확인</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>거주 요건은 <b>취득 당시</b> 조정대상지역이었는지로 판단합니다. 산 뒤에 조정대상지역에서 해제됐더라도 취득 당시 조정지역이었다면 거주 2년이 필요합니다.</li>
<li>비과세라도 12억을 넘으면 과세분이 생기므로 양도소득세 신고를 해야 합니다. 양도일이 속한 달의 말일부터 2개월 이내가 예정신고 기한입니다.</li>
<li>취득세·중개수수료·법무사 비용 등은 필요경비로 인정돼 양도차익을 줄입니다. 영수증을 보관해두면 세금이 줄어듭니다.</li>
<li>보유기간은 취득일부터 양도일까지로 계산합니다. 상속·증여로 받은 주택은 기산일이 달라질 수 있습니다.</li>
<li>배우자는 세대를 분리해도 원칙적으로 같은 세대로 봅니다. 주민등록만 옮겨서는 1세대 판정이 달라지지 않습니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>1가구 1주택 양도세는 어떻게 되나요?</summary>
<div class="ax-ab"><p>2년 이상 보유했고 양도가액이 12억원 이하라면 양도세가 없습니다. 12억을 넘으면 초과분 비율만큼만 과세되고, 거기에서 장기보유특별공제와 기본공제 250만원을 뺀 금액에 세율을 적용합니다.</p>
<p class="ax-law">소득세법 제89조제1항제3호 · 같은 법 시행령 제154조제1항</p></div></details>

<details class="ax-acc"><summary>1세대 1주택 비과세 보유 기간은 얼마나 되나요?</summary>
<div class="ax-ab"><p>2년입니다. 취득 당시 조정대상지역에 있던 주택이라면 보유 2년에 더해 <b>보유기간 중 거주 2년</b>도 채워야 합니다. 비조정대상지역이면 거주하지 않아도 보유 2년만으로 비과세 대상입니다.</p>
<p class="ax-law">소득세법 시행령 제154조제1항</p></div></details>

<details class="ax-acc"><summary>일시적으로 1가구 2주택이 되면 비과세 요건은 무엇인가요?</summary>
<div class="ax-ab"><p>종전주택을 취득한 날부터 <b>1년 이상</b> 지난 후에 신규주택을 취득하고, 신규주택 취득일부터 <b>3년 이내</b>에 종전주택을 양도하면 종전주택을 1세대 1주택으로 보아 비과세합니다.</p>
<p class="ax-law">소득세법 시행령 제155조제1항</p></div></details>

<details class="ax-acc"><summary>1세대 1주택 비과세도 신고해야 하나요?</summary>
<div class="ax-ab"><p>양도가액이 12억원을 넘으면 과세되는 부분이 있으므로 반드시 신고해야 합니다. 12억 이하로 전액 비과세인 경우에는 신고 의무가 없지만, 1세대 1주택 판정에 다툼의 여지가 있다면 신고해두는 편이 안전합니다.</p>
<p class="ax-law">소득세법 제105조 (양도소득과세표준 예정신고)</p></div></details>

<details class="ax-acc"><summary>12억이 넘으면 전체 차익에 세금이 붙나요?</summary>
<div class="ax-ab"><p>아닙니다. 양도차익에 <b>(양도가 − 12억) ÷ 양도가</b>를 곱한 금액만 과세 대상입니다. 양도가 15억·취득가 8억이면 차익 7억 중 1억 4,000만원만 과세되고, 실제 세액은 장기보유공제 80% 적용 시 282만원입니다.</p>
<p class="ax-law">소득세법 제95조 · 제100조</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>1세대 1주택은 <b>보유 2년 + 양도가 12억 이하</b>면 양도세가 없습니다.</li>
<li>거주 2년 요건은 <b>취득 당시 조정대상지역</b> 주택에만 붙습니다.</li>
<li>12억 초과 시 <b>(양도가 − 12억) ÷ 양도가</b> 비율만큼만 과세됩니다.</li>
<li>보유 3년 + 거주 2년이면 장기보유특별공제 <b>최대 80%</b>를 받습니다.</li>
<li>일시적 2주택은 <b>1년 이상 후 취득 + 3년 이내 처분</b>이면 비과세입니다.</li>
<li>2026년 5월 10일부터 <b>다주택 중과세율이 부활</b>했고, 중과 대상은 장기보유공제도 배제됩니다.</li>
</ul>
<a class="ax-cta" href="/realestate/transfer-tax/">
<span><b>양도소득세 계산기로 내 세금 확인하기</b><i>1주택·다주택·조정대상지역까지 한 화면에서</i></span>
<em>양도세 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 법령 원문</h2>

<p class="ax-collected">아래 조문은 2026년 9월 1일 <b>국가법령정보센터(law.go.kr)</b>에서 직접 조회해 옮긴 원문입니다.</p>

<div class="ax-lawq"><b>「소득세법 시행령」 제154조(1세대 1주택의 범위) 제1항</b>
<p>1세대가 양도일 현재 국내에 1주택을 보유하고 있는 경우로서 해당 주택의 보유기간이 2년(제8항제2호에 해당하는 거주자의 주택인 경우는 3년) 이상인 것[<b>취득 당시에 「주택법」 제63조의2제1항제1호에 따른 조정대상지역에 있는 주택의 경우에는 해당 주택의 보유기간이 2년 이상이고 그 보유기간 중 거주기간이 2년 이상인 것</b>]을 말한다.</p></div>

<div class="ax-lawq"><b>「소득세법 시행령」 제155조(1세대1주택의 특례) 제1항</b>
<p>국내에 1주택을 소유한 1세대가 그 주택(이하 이 항에서 “종전의 주택”이라 한다)을 양도하기 전에 다른 주택(이하 이 조에서 “신규 주택”이라 한다)을 취득함으로써 일시적으로 2주택이 된 경우 <b>종전의 주택을 취득한 날부터 1년 이상이 지난 후 신규 주택을 취득하고 신규 주택을 취득한 날부터 3년 이내에 종전의 주택을 양도하는 경우</b>에는 이를 1세대1주택으로 보아 제154조제1항을 적용한다.</p></div>

<div class="ax-lawq"><b>「소득세법」 제104조(양도소득세의 세율) 제7항</b>
<p>다음 각 호의 어느 하나에 해당하는 주택을 양도하는 경우 제55조제1항에 따른 세율에 <b>100분의 20(제3호 및 제4호의 경우 100분의 30)을 더한 세율</b>을 적용한다. … 1. 조정대상지역에 있는 주택으로서 대통령령으로 정하는 1세대 2주택에 해당하는 주택 … 3. 조정대상지역에 있는 주택으로서 대통령령으로 정하는 1세대 3주택 이상에 해당하는 주택</p></div>

<div class="ax-lawq"><b>「소득세법」 제95조(양도소득금액과 장기보유 특별공제액) 제2항</b>
<p>제1항에서 “장기보유 특별공제액”이란 제94조제1항제1호에 따른 자산(<b>제104조제3항에 따른 미등기양도자산과 같은 조 제7항 각 호에 따른 자산은 제외한다</b>)으로서 보유기간이 3년 이상인 것 … 에 다음 표 1에 따른 보유기간별 공제율을 곱하여 계산한 금액을 말한다. 다만, 대통령령으로 정하는 1세대 1주택에 해당하는 자산의 경우에는 … 표 2에 따른 보유기간별 공제율 … 과 거주기간별 공제율 … 을 합산한 것을 말한다.</p></div>

<div class="ax-lawq"><b>「소득세법」 제89조(비과세 양도소득) 제1항제3호</b>
<p>다음 각 목의 어느 하나에 해당하는 주택(주택 및 이에 딸린 토지의 양도 당시 <b>실지거래가액의 합계액이 12억원을 초과하는 고가주택은 제외한다</b>)과 이에 딸린 토지 … 의 양도로 발생하는 소득</p></div>

<div class="ax-lawq"><b>계산 근거 조문</b>
<p>소득세법 제89조(비과세 양도소득) · 제95조(양도소득금액, 장기보유특별공제) · 제100조(양도차익의 산정) · 제103조(양도소득 기본공제) · 제104조(양도소득세의 세율) · 제105조(예정신고) · 같은 법 시행령 제159조의3(1세대1주택 장기보유특별공제율).</p></div>

<div class="ax-src"><b>출처 · 국가법령정보센터, 국세청</b><br>
원문은 <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener">소득세법</a> ·
<a href="https://www.law.go.kr/법령/소득세법시행령" target="_blank" rel="noopener">소득세법 시행령</a>에서 확인할 수 있습니다.
조정대상지역 지정 현황은 국토교통부 공고를 확인하세요.<br><br>
양도소득세는 취득 시기, 상속·증여 여부, 부수토지 면적, 감면 특례 등에 따라 결과가 크게 달라집니다. 본 계산 결과는 참고용이며, 실제 신고 전에는 세무 전문가나 관할 세무서에 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>양도세 계산기</h4>
<a class="ax-rel" href="/realestate/transfer-tax/">양도소득세 계산기<span>1주택·다주택·조정지역 통합</span></a>
<a class="ax-rel" href="/realestate/acquisition-tax/">취득세 계산기<span>살 때 내는 세금</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">비과세 요건</a></li>
<li><a href="#m2">12억 초과 계산</a></li>
<li><a href="#m2">장기보유공제</a></li>
<li><a href="#m3">일시적 2주택</a></li>
<li><a href="#m4">다주택과 차이</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/tax/salary-net-pay-guide/">2026 연봉 실수령액 표<span>연봉</span></a>
<a class="ax-rel" href="/law/severance-pay/">퇴직금 계산 방법과 평균임금 산정기준<span>퇴직금</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "1가구 1주택 양도세는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2년 이상 보유했고 양도가액이 12억원 이하라면 양도세가 없습니다. 12억을 넘으면 초과분 비율만큼만 과세되고, 거기에서 장기보유특별공제와 기본공제 250만원을 뺀 금액에 세율을 적용합니다. 소득세법 제89조제1항제3호 · 같은 법 시행령 제154조제1항"
      }
    },
    {
      "@type": "Question",
      "name": "1세대 1주택 비과세 보유 기간은 얼마나 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2년입니다. 취득 당시 조정대상지역에 있던 주택이라면 보유 2년에 더해 보유기간 중 거주 2년도 채워야 합니다. 비조정대상지역이면 거주하지 않아도 보유 2년만으로 비과세 대상입니다. 소득세법 시행령 제154조제1항"
      }
    },
    {
      "@type": "Question",
      "name": "일시적으로 1가구 2주택이 되면 비과세 요건은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "종전주택을 취득한 날부터 1년 이상 지난 후에 신규주택을 취득하고, 신규주택 취득일부터 3년 이내에 종전주택을 양도하면 종전주택을 1세대 1주택으로 보아 비과세합니다. 소득세법 시행령 제155조제1항"
      }
    },
    {
      "@type": "Question",
      "name": "1세대 1주택 비과세도 신고해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "양도가액이 12억원을 넘으면 과세되는 부분이 있으므로 반드시 신고해야 합니다. 12억 이하로 전액 비과세인 경우에는 신고 의무가 없지만, 1세대 1주택 판정에 다툼의 여지가 있다면 신고해두는 편이 안전합니다. 소득세법 제105조 (양도소득과세표준 예정신고)"
      }
    },
    {
      "@type": "Question",
      "name": "12억이 넘으면 전체 차익에 세금이 붙나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 양도차익에 (양도가 − 12억) ÷ 양도가를 곱한 금액만 과세 대상입니다. 양도가 15억·취득가 8억이면 차익 7억 중 1억 4,000만원만 과세되고, 실제 세액은 장기보유공제 80% 적용 시 282만원입니다. 소득세법 제95조 · 제100조"
      }
    }
  ],
};
