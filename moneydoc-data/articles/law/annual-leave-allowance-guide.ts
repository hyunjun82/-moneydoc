// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/9-연차수당.html
export const meta = {
  title: "연차수당 계산법, 안 쓴 연차 하루가 11만원인 이유",
  description: "연차수당은 1일 통상임금 × 미사용 일수입니다. 월 통상임금 300만원이면 하루 114,832원. 근속연수별 연차 일수와 2026년 6월 신설된 시간단위 분할 사용까지 근로기준법 원문으로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/law/annual-leave-allowance-guide/",
};

export const widgetKey = "annualLeave";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>연차수당 계산</b>
<span>월 통상임금과 남은 연차 일수를 넣으면 수당이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>월 통상임금 (원)</em><input type="number" id="pay" value="3000000" step="100000" min="0"></label>
  <label class="ax-wg-f"><em>미사용 연차 일수</em><input type="number" id="days" value="5" step="1" min="0" max="25"></label>
  <label class="ax-wg-f"><em>1일 소정근로시간</em><input type="number" id="hrs" value="8" step="1" min="1" max="12"></label>
  <label class="ax-wg-f"><em>근속연수 (연차 일수 확인용)</em><input type="number" id="yrs" value="3" step="1" min="0" max="40"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">월 통상임금 산정 기준시간 209시간(주 40시간 기준)을 적용했습니다. 근거: 근로기준법 제60조, 같은 법 시행령 제6조. 회사 취업규칙에 따라 평균임금을 적용할 수도 있으니 <a href="/law/annual-leave-allowance/">연차수당 계산기</a>와 회사 규정을 함께 확인하세요.</p>
</div>`;

export const htmlBefore = `<h1>연차수당 계산법, 안 쓴 연차 하루가 11만원인 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="연차수당은 1일 통상임금 곱하기 미사용 일수">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#c4452f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">근로·휴가</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">안 쓴 연차</text>
<rect x="70" y="312" width="352" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">하루 114,832원</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">월 통상임금 300만 기준 · 5일이면 57만원</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(650 156)">
  <ellipse cx="196" cy="292" rx="168" ry="18" fill="#e8ded0" opacity=".55"/>
  <rect x="52" y="60" width="212" height="192" rx="14" fill="#fdfcfa" stroke="#6b6255" stroke-width="4.5"/>
  <path d="M52 110h212" stroke="#6b6255" stroke-width="4.5"/>
  <rect x="92" y="40" width="16" height="38" rx="8" fill="#8a8172"/>
  <rect x="208" y="40" width="16" height="38" rx="8" fill="#8a8172"/>
  <g fill="#cfc6b6">
    <rect x="80" y="132" width="26" height="22" rx="4"/><rect x="118" y="132" width="26" height="22" rx="4"/>
    <rect x="156" y="132" width="26" height="22" rx="4"/><rect x="194" y="132" width="26" height="22" rx="4"/>
    <rect x="80" y="166" width="26" height="22" rx="4"/><rect x="156" y="166" width="26" height="22" rx="4"/>
  </g>
  <rect x="118" y="166" width="26" height="22" rx="4" fill="#c4452f"/>
  <rect x="194" y="166" width="26" height="22" rx="4" fill="#c4452f"/>
  <rect x="80" y="200" width="26" height="22" rx="4" fill="#c4452f"/>
  <text x="196" y="290" font-size="16" font-weight="700" text-anchor="middle" fill="#c4452f">빨간 날 = 못 쓴 연차</text>
</g>
</svg>

<p class="ax-intro">쓰지 못하고 넘어간 연차는 <b>돈으로 받습니다.</b> 계산은 <b>1일 통상임금 × 미사용 일수</b>입니다. 월 통상임금이 300만원이면 하루가 <b>114,832원</b>이라, 5일만 남겨도 <b>574,160원</b>입니다. 생각보다 큰 금액이라 연말에 연차를 몰아 쓰는 이유가 여기 있습니다.</p>

<a class="ax-cta" href="/law/annual-leave-allowance/">
<span><b>내 연차수당 바로 계산하기</b><i>월 통상임금과 미사용 일수만 넣으면 됩니다</i></span>
<em>연차수당 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산법 2단계</a><a href="#m2">연차 일수</a><a href="#m3">2026 개정</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산법</b><span>하루 얼마인가</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>연차수당은 어떻게 계산하나요</h3>
<p>연차수당 = <b>1일 통상임금 × 미사용 일수</b>입니다. 1일 통상임금은 월 통상임금을 <b>209시간</b>으로 나눈 시간급에 하루 소정근로시간 8시간을 곱해 구합니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 160" role="img" aria-label="월 통상임금을 209시간으로 나눠 시간급을 구하고 8시간을 곱해 일급을 만든 뒤 미사용 일수를 곱합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">연차수당이 나오는 순서</text>
<rect x="0" y="44" width="140" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="70" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">월 통상임금</text>
<text x="70" y="83" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">3,000,000원</text>
<line x1="140" y1="68" x2="182" y2="68" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="174,63 174,73 182,68" fill="currentColor" opacity=".6"/>
<text x="161" y="58" font-size="10" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".6">÷209</text>
<rect x="182" y="44" width="140" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="252" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">시간급</text>
<text x="252" y="83" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">14,354원</text>
<line x1="322" y1="68" x2="364" y2="68" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="356,63 356,73 364,68" fill="currentColor" opacity=".6"/>
<text x="343" y="58" font-size="10" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".6">×8</text>
<rect x="364" y="44" width="140" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="434" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">1일 통상임금</text>
<text x="434" y="83" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">114,832원</text>
<line x1="504" y1="68" x2="546" y2="68" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="538,63 538,73 546,68" fill="#c4452f"/>
<text x="525" y="58" font-size="10" font-weight="600" text-anchor="middle" fill="#c4452f">×5일</text>
<rect x="546" y="44" width="114" height="48" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="603" y="74" font-size="14" font-weight="800" text-anchor="middle" fill="#c4452f">574,160원</text>
<text x="0" y="128" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">209시간 = (주 소정근로 40시간 + 유급주휴 8시간) × 52.142857주 ÷ 12개월</text>
<text x="0" y="148" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">취업규칙에 따라 통상임금 대신 평균임금을 쓰기도 합니다</text>
</svg>
<figcaption>「근로기준법」 제60조제6항 (통상임금 또는 평균임금 지급) · 같은 법 시행령 제6조 (통상임금 산정)</figcaption>
</figure>
<div class="ax-tw"><table>
<thead><tr><th>월 통상임금</th><th>시간급</th><th>1일 통상임금</th><th>미사용 5일 수당</th></tr></thead>
<tbody>
<tr><td>250만</td><td>11,962</td><td>95,696</td><td><b>478,480</b></td></tr>
<tr class="ax-hi"><td>300만</td><td>14,354</td><td>114,832</td><td><b>574,160</b></td></tr>
<tr><td>350만</td><td>16,746</td><td>133,968</td><td><b>669,840</b></td></tr>
<tr><td>400만</td><td>19,139</td><td>153,112</td><td><b>765,560</b></td></tr>
<tr><td>500만</td><td>23,923</td><td>191,384</td><td><b>956,920</b></td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 주 40시간·1일 8시간 기준. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>미사용 일수가 늘면 얼마나 커지나요</h3>
<p>월 통상임금 300만원 기준입니다. 하루 11만원이 넘다 보니 며칠만 남겨도 금액이 커집니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>미사용 연차</th><th>연차수당</th></tr></thead>
<tbody>
<tr><td>1일</td><td>114,832</td></tr>
<tr><td>3일</td><td>344,496</td></tr>
<tr class="ax-hi"><td>5일</td><td><b>574,160</b></td></tr>
<tr><td>10일</td><td>1,148,320</td></tr>
<tr><td>15일</td><td>1,722,480</td></tr>
</tbody></table>
<p class="ax-tn">15일을 못 쓰면 172만원, 월급의 절반이 넘습니다.</p></div>
<div class="ax-warn"><span>주의</span><p>회사가 <b>연차사용촉진제도</b>를 적법하게 시행했다면 미사용 연차에 대한 수당 지급 의무가 사라질 수 있습니다. 서면으로 사용 시기를 지정해 통보받았는지 확인해야 합니다.</p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 연차 일수</b><span>근속연수별</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>근속연수별 연차는 며칠인가요</h3>
<p>1년간 <b>80% 이상 출근</b>하면 15일이 기본입니다. 3년 이상 근속하면 최초 1년을 초과하는 매 2년마다 1일씩 늘어나고, 총 <b>25일</b>이 한도입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>근속연수</th><th>연차 일수</th><th>전부 미사용 시 수당 (월 300만)</th></tr></thead>
<tbody>
<tr><td>1년 미만</td><td>1개월 개근 시 1일</td><td>최대 11일까지</td></tr>
<tr class="ax-hi"><td>1~2년</td><td><b>15일</b></td><td>1,722,480</td></tr>
<tr><td>3~4년</td><td>16일</td><td>1,837,312</td></tr>
<tr><td>5~6년</td><td>17일</td><td>1,952,144</td></tr>
<tr><td>7~8년</td><td>18일</td><td>2,066,976</td></tr>
<tr><td>10년</td><td>19일</td><td>2,181,808</td></tr>
<tr><td>15년</td><td>22일</td><td>2,526,304</td></tr>
<tr><td>21년 이상</td><td><b>25일 (한도)</b></td><td>2,870,800</td></tr>
</tbody></table>
<p class="ax-tn">근로기준법 제60조제1항·제4항 기준. 가산휴가를 포함한 총 휴가 일수는 25일을 한도로 합니다.</p></div>
<p class="ax-nt">입사 <b>1년 미만</b>이라도 연차가 있습니다. 1개월을 개근할 때마다 1일씩 생기므로 첫해에 최대 11일까지 쓸 수 있습니다.</p>
<ul class="ax-ck"><li>업무상 부상·질병 휴업</li><li>출산전후휴가</li><li>육아휴직</li><li>육아기 근로시간 단축</li></ul>
<p class="ax-nt">위 기간은 <b>출근한 것으로 봅니다.</b> 육아휴직을 썼다고 해서 다음 해 연차가 줄어들지 않습니다.</p>
<p class="ax-law-l">「근로기준법」 제60조제7항 (출근 간주 기간)</p>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 2026년 개정</b><span>시간단위 사용</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>연차를 시간 단위로 쪼개 쓸 수 있게 됐습니다</h3>
<p>2026년 6월 9일 신설된 조항으로, 근로자가 <b>시간 단위</b>나 일수 범위에서 <b>나눠서</b> 연차를 청구하면 회사가 이를 부여해야 합니다. 반차보다 더 잘게 쓸 수 있게 된 것입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>구분</th><th>이전</th><th>2026년 6월 9일 이후</th></tr></thead>
<tbody>
<tr><td>사용 단위</td><td>일 단위 (반차는 관행)</td><td><b>시간 단위 분할 청구 가능</b></td></tr>
<tr class="ax-hi"><td>회사 의무</td><td>관행·취업규칙에 따름</td><td><b>청구 시 부여 의무</b></td></tr>
</tbody></table>
<p class="ax-tn">구체적인 시간 단위와 일수 범위는 대통령령으로 정합니다.</p></div>
<div class="ax-warn"><span>주의</span><p>회사는 근로자가 청구한 시기에 휴가를 줘야 하지만, <b>사업 운영에 막대한 지장</b>이 있는 경우에는 시기를 변경할 수 있습니다. 시기 변경권이지 거부권은 아닙니다.</p></div>
<div class="ax-btns">
<a class="ax-btn" href="/law/annual-leave-allowance/"><b>연차수당 계산기</b><span>통상임금 기준 계산</span></a>
<a class="ax-btn" href="/law/severance-pay/"><b>퇴직금 계산기</b><span>연차수당도 평균임금에 반영</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>전년도 미사용 연차수당은 퇴직금 계산 시 평균임금에 <b>3/12만</b> 가산됩니다. 퇴직 직전에 연차수당을 받으면 퇴직금도 조금 늘어납니다.</li>
<li>연차수당 청구권도 임금이므로 소멸시효는 3년입니다. 퇴사 후에도 3년 안에는 청구할 수 있습니다.</li>
<li>5인 미만 사업장에는 연차 유급휴가 규정이 적용되지 않습니다. 상시 근로자 5인 이상이어야 합니다.</li>
<li>연차사용촉진을 하려면 회사가 법이 정한 시기에 서면으로 통보해야 합니다. 구두 안내만으로는 효력이 없습니다.</li>
<li>통상임금에는 기본급 외에 정기적·일률적으로 지급되는 수당이 포함됩니다. 기본급만으로 계산하면 수당이 과소 산정될 수 있습니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>연차수당은 어떻게 계산하나요?</summary>
<div class="ax-ab"><p><b>1일 통상임금 × 미사용 일수</b>입니다. 1일 통상임금은 월 통상임금 ÷ 209시간 × 8시간으로 구합니다. 월 300만원이면 하루 <b>114,832원</b>, 5일이면 <b>574,160원</b>입니다.</p>
<p class="ax-law">근로기준법 제60조제6항 · 같은 법 시행령 제6조</p></div></details>

<details class="ax-acc"><summary>1년 미만 신입도 연차가 있나요?</summary>
<div class="ax-ab"><p>있습니다. 계속 근로한 기간이 1년 미만이면 <b>1개월 개근할 때마다 1일</b>의 유급휴가가 생깁니다. 첫해에 최대 11일까지 쌓입니다.</p>
<p class="ax-law">근로기준법 제60조제2항</p></div></details>

<details class="ax-acc"><summary>근속 10년이면 연차가 며칠인가요?</summary>
<div class="ax-ab"><p><b>19일</b>입니다. 기본 15일에, 3년 이상 근속 시 최초 1년을 초과하는 매 2년마다 1일씩 가산되기 때문입니다. 21년 이상이면 한도인 25일이 됩니다.</p>
<p class="ax-law">근로기준법 제60조제1항·제4항</p></div></details>

<details class="ax-acc"><summary>육아휴직을 쓰면 다음 해 연차가 줄어드나요?</summary>
<div class="ax-ab"><p>줄지 않습니다. 육아휴직 기간은 <b>출근한 것으로 봅니다.</b> 업무상 부상·질병 휴업, 출산전후휴가, 육아기 근로시간 단축도 마찬가지입니다.</p>
<p class="ax-law">근로기준법 제60조제7항</p></div></details>

<details class="ax-acc"><summary>연차를 시간 단위로 쓸 수 있나요?</summary>
<div class="ax-ab"><p>2026년 6월 9일 신설된 규정으로 가능해졌습니다. 근로자가 시간 단위나 일수 범위에서 분할 청구하면 회사는 이를 부여해야 합니다. 구체적 범위는 대통령령으로 정합니다.</p>
<p class="ax-law">근로기준법 제60조제5항 (2026.6.9 신설)</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>연차수당 = <b>1일 통상임금 × 미사용 일수</b>, 1일 통상임금 = 월급 ÷ 209 × 8입니다.</li>
<li>월 통상임금 300만원이면 하루 <b>114,832원</b>, 5일이면 574,160원입니다.</li>
<li>연차는 1년 80% 이상 출근 시 <b>15일</b>, 3년부터 2년마다 1일씩 늘어 최대 <b>25일</b>입니다.</li>
<li>1년 미만 근로자도 <b>1개월 개근 시 1일</b>씩 생깁니다.</li>
<li>2026년 6월 9일부터 <b>시간 단위 분할 사용</b>을 청구할 수 있습니다.</li>
</ul>
<a class="ax-cta" href="/law/annual-leave-allowance/">
<span><b>연차수당 계산기로 확인하기</b><i>통상임금과 미사용 일수로 즉시 계산</i></span>
<em>연차수당 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 법령 원문</h2>

<p class="ax-collected">아래 조문은 2026년 9월 1일 국가법령정보센터에서 직접 조회해 옮긴 원문입니다.</p>

<div class="ax-lawq"><b>「근로기준법」 제60조(연차 유급휴가) 제1항·제2항</b>
<p>① 사용자는 1년간 <b>80퍼센트 이상 출근한 근로자에게 15일</b>의 유급휴가를 주어야 한다.<br>
② 사용자는 계속하여 근로한 기간이 <b>1년 미만인 근로자</b> 또는 1년간 80퍼센트 미만 출근한 근로자에게 <b>1개월 개근 시 1일</b>의 유급휴가를 주어야 한다.</p></div>

<div class="ax-lawq"><b>「근로기준법」 제60조 제4항</b>
<p>사용자는 <b>3년 이상 계속하여 근로한 근로자</b>에게는 제1항에 따른 휴가에 최초 1년을 초과하는 계속 근로 연수 <b>매 2년에 대하여 1일을 가산</b>한 유급휴가를 주어야 한다. 이 경우 가산휴가를 포함한 총 휴가 일수는 <b>25일을 한도</b>로 한다.</p></div>

<div class="ax-lawq"><b>「근로기준법」 제60조 제5항 &nbsp;[신설 2026. 6. 9.]</b>
<p>사용자는 근로자가 제1항ㆍ제2항 및 제4항에 따른 유급휴가를 대통령령으로 정하는 <b>시간단위 및 일수의 범위에서 분할하여 청구한 때에는 이를 부여</b>하여야 한다.</p></div>

<div class="ax-lawq"><b>「근로기준법」 제60조 제6항·제7항</b>
<p>⑥ 사용자는 … 휴가를 근로자가 청구한 시기에 주어야 하고, 그 기간에 대하여는 취업규칙 등에서 정하는 <b>통상임금 또는 평균임금</b>을 지급하여야 한다. 다만, 근로자가 청구한 시기에 휴가를 주는 것이 사업 운영에 막대한 지장이 있는 경우에는 그 시기를 변경할 수 있다.<br>
⑦ 다음 각 호의 기간은 <b>출근한 것으로 본다</b>: 업무상 부상 또는 질병으로 휴업한 기간 / 출산전후휴가 기간 / <b>육아휴직</b>으로 휴업한 기간 / 육아기 근로시간 단축을 사용하여 단축된 근로시간 등</p></div>

<div class="ax-src"><b>출처 · 국가법령정보센터</b><br>
원문은 <a href="https://www.law.go.kr/법령/근로기준법" target="_blank" rel="noopener">근로기준법</a> 제60조에서 확인할 수 있습니다. 통상임금 산정 방법은 같은 법 시행령 제6조에 따릅니다.<br><br>
연차 유급휴가는 상시 근로자 5명 이상 사업장에 적용됩니다. 연차사용촉진제도를 적법하게 시행한 경우 미사용 수당 지급 의무가 면제될 수 있습니다. 본 계산 결과는 참고용이며, 구체적인 사안은 관할 지방고용노동관서에 문의하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>근로 계산기</h4>
<a class="ax-rel" href="/law/annual-leave-allowance/">연차수당 계산기<span>통상임금 기준</span></a>
<a class="ax-rel" href="/law/severance-pay/">퇴직금 계산기<span>평균임금 기준</span></a>
<a class="ax-rel" href="/law/unpaid-wages/">임금체불 계산기<span>지연이자 포함</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">연차수당 계산법</a></li>
<li><a href="#m1">미사용 일수별 금액</a></li>
<li><a href="#m2">근속연수별 연차</a></li>
<li><a href="#m3">2026년 시간단위 사용</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/law/severance-pay/">퇴직금 계산 방법과 평균임금<span>퇴직금</span></a>
<a class="ax-rel" href="/tax/four-major-insurance-guide/">4대보험 요율 2026<span>급여</span></a>
<a class="ax-rel" href="undefined">2026 연봉 실수령액 표<span>연봉</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "연차수당은 어떻게 계산하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1일 통상임금 × 미사용 일수입니다. 1일 통상임금은 월 통상임금 ÷ 209시간 × 8시간으로 구합니다. 월 300만원이면 하루 114,832원, 5일이면 574,160원입니다. 근로기준법 제60조제6항 · 같은 법 시행령 제6조"
      }
    },
    {
      "@type": "Question",
      "name": "1년 미만 신입도 연차가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "있습니다. 계속 근로한 기간이 1년 미만이면 1개월 개근할 때마다 1일의 유급휴가가 생깁니다. 첫해에 최대 11일까지 쌓입니다. 근로기준법 제60조제2항"
      }
    },
    {
      "@type": "Question",
      "name": "근속 10년이면 연차가 며칠인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "19일입니다. 기본 15일에, 3년 이상 근속 시 최초 1년을 초과하는 매 2년마다 1일씩 가산되기 때문입니다. 21년 이상이면 한도인 25일이 됩니다. 근로기준법 제60조제1항·제4항"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직을 쓰면 다음 해 연차가 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "줄지 않습니다. 육아휴직 기간은 출근한 것으로 봅니다. 업무상 부상·질병 휴업, 출산전후휴가, 육아기 근로시간 단축도 마찬가지입니다. 근로기준법 제60조제7항"
      }
    },
    {
      "@type": "Question",
      "name": "연차를 시간 단위로 쓸 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2026년 6월 9일 신설된 규정으로 가능해졌습니다. 근로자가 시간 단위나 일수 범위에서 분할 청구하면 회사는 이를 부여해야 합니다. 구체적 범위는 대통령령으로 정합니다. 근로기준법 제60조제5항 (2026.6.9 신설)"
      }
    }
  ],
};
