// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/11-자동차세.html
export const meta = {
  title: "자동차세 계산, 1월에 내면 2만 3천원 아끼는 이유",
  description: "자동차세는 배기량 × cc당 세율에 지방교육세 30%가 붙습니다. 1,999cc면 연 519,740원. 1월 연납하면 11개월분의 5%를 공제받고, 차령 3년차부터 매년 5%씩 최대 50% 경감됩니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/insurance/auto-tax-guide/",
};

export const widgetKey = "autoTax";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>자동차세 계산</b>
<span>배기량과 등록 후 경과연수를 넣으면 세금과 연납 할인액이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>배기량 (cc)</em><input type="number" id="cc" value="1999" step="1" min="1"></label>
  <label class="ax-wg-f"><em>등록 후 경과연수</em><input type="number" id="age" value="0" step="1" min="0" max="30"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">비영업용 승용자동차 기준입니다. 근거: 지방세법 제127조(세율)·제151조(지방교육세), 같은 법 시행령 제125조(사용연수별 경감). 연납 할인은 1월 신고·납부 시 2~12월분의 5%를 공제하는 방식입니다.</p>
</div>`;

export const htmlBefore = `<h1>자동차세 계산, 1월에 내면 2만 3천원 아끼는 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 6분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="자동차세 배기량 곱하기 cc당 세율에 지방교육세 30퍼센트">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#c4452f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">자동차·세금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">자동차세 연납</text>
<rect x="70" y="312" width="336" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">1월이 가장 크다</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">2,000cc 기준 연 519,740원 · 연납 약 23,760원 할인</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(636 190)">
  <ellipse cx="212" cy="230" rx="180" ry="18" fill="#e8ded0" opacity=".55"/>
  <path d="M52 190 L86 116 h180 l44 74 z" fill="#ccdae5" stroke="#6b6255" stroke-width="4.5" stroke-linejoin="round"/>
  <rect x="34" y="186" width="356" height="52" rx="14" fill="#fdfcfa" stroke="#6b6255" stroke-width="4.5"/>
  <circle cx="108" cy="240" r="30" fill="#e8ded0" stroke="#6b6255" stroke-width="4.5"/>
  <circle cx="316" cy="240" r="30" fill="#e8ded0" stroke="#6b6255" stroke-width="4.5"/>
  <rect x="150" y="200" width="124" height="26" rx="5" fill="#f2cfc8" stroke="#c4452f" stroke-width="3"/>
  <text x="212" y="219" font-size="15" font-weight="800" text-anchor="middle" fill="#c4452f">2,000cc</text>
</g>
</svg>

<p class="ax-intro">자동차세는 <b>배기량 × cc당 세율</b>로 정해집니다. 2,000cc 승용차라면 자동차세 399,800원에 지방교육세 30%가 붙어 연 <b>519,740원</b>입니다. 1월에 한 번에 내면 <b>23,760원</b>을 아끼고, 차가 오래될수록 세금이 줄어듭니다. 차값이나 연비와는 아무 상관이 없습니다.</p>

<a class="ax-cta" href="/insurance/auto-tax/">
<span><b>내 자동차세 바로 계산하기</b><i>배기량과 연식만 넣으면 됩니다</i></span>
<em>자동차세 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산 구조 2단계</a><a href="#m2">차령 경감</a><a href="#m3">연납 할인</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산 구조</b><span>배기량이 전부</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>자동차세는 어떻게 계산하나요</h3>
<p>비영업용 승용차는 배기량 구간별로 <b>cc당 세율</b>이 정해져 있습니다. 여기에 <b>지방교육세 30%</b>가 더 붙습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>배기량</th><th>cc당 세율 (비영업용)</th></tr></thead>
<tbody>
<tr><td>1,000cc 이하</td><td>80원</td></tr>
<tr><td>1,000cc 초과 ~ 1,600cc 이하</td><td>140원</td></tr>
<tr class="ax-hi"><td>1,600cc 초과</td><td><b>200원</b></td></tr>
</tbody></table>
<p class="ax-tn">지방세법 제127조. 영업용은 세율이 훨씬 낮습니다. 전기차·수소차는 배기량이 없어 별도 정액이 적용됩니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 150" role="img" aria-label="배기량 곱하기 cc당 세율로 자동차세를 구하고 지방교육세 30퍼센트를 더합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">2,000cc 승용차의 연간 세금</text>
<rect x="0" y="44" width="160" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="80" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">1,999cc × 200원</text>
<text x="80" y="84" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">배기량 × cc당 세율</text>
<line x1="160" y1="69" x2="206" y2="69" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="197,64 197,74 206,69" fill="currentColor" opacity=".6"/>
<rect x="206" y="44" width="160" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="286" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">자동차세 399,800원</text>
<text x="286" y="84" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">본세</text>
<line x1="366" y1="69" x2="412" y2="69" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="403,64 403,74 412,69" fill="#c4452f"/>
<text x="389" y="59" font-size="10" font-weight="600" text-anchor="middle" fill="#c4452f">+30%</text>
<rect x="412" y="44" width="248" height="50" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="536" y="66" font-size="13" font-weight="800" text-anchor="middle" fill="#c4452f">합계 519,740원</text>
<text x="536" y="84" font-size="10.5" text-anchor="middle" fill="#c4452f" opacity=".85">자동차세 + 지방교육세 119,940원</text>
<text x="0" y="132" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">차값·연식·연비는 세액에 영향을 주지 않습니다 (연식은 경감률에만 영향)</text>
</svg>
<figcaption>「지방세법」 제127조 (자동차세 세율) · 제151조 (지방교육세)</figcaption>
</figure>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>배기량별 자동차세는 얼마인가요</h3>
<p>신차(등록 첫해) 기준이며, 지방교육세를 포함한 연간 총액입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>배기량</th><th>자동차세</th><th>지방교육세</th><th>연간 합계</th><th>1월 연납 시</th></tr></thead>
<tbody>
<tr><td>998cc (경차)</td><td>79,840</td><td>23,940</td><td>103,780</td><td><b>99,030</b></td></tr>
<tr><td>1,598cc</td><td>223,720</td><td>67,100</td><td>290,820</td><td><b>277,520</b></td></tr>
<tr class="ax-hi"><td>1,999cc</td><td>399,800</td><td>119,940</td><td><b>519,740</b></td><td><b>495,980</b></td></tr>
<tr><td>2,497cc</td><td>499,400</td><td>149,820</td><td>649,220</td><td><b>619,550</b></td></tr>
<tr><td>3,342cc</td><td>668,400</td><td>200,520</td><td>868,920</td><td><b>829,210</b></td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 비영업용 승용차·신차 기준. 연납액은 2~12월분의 5%를 공제한 값입니다. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<p class="ax-nt">1,600cc가 경계선입니다. 1,598cc는 cc당 140원이라 29만원인데, 1,999cc는 200원이라 <b>52만원</b>입니다. 배기량은 25% 차이인데 세금은 79% 더 냅니다.</p>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 차령 경감</b><span>오래 탈수록 싸진다</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>차가 오래되면 세금이 줄어드나요</h3>
<p>줄어듭니다. <b>사용연수 3년차부터</b> 매년 5%씩 경감되고, 최대 <b>50%</b>까지 내려갑니다. 사용연수는 등록 후 경과연수에 1을 더한 값입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>등록 후</th><th>사용연수</th><th>경감률</th><th>연간 세금 (1,999cc)</th></tr></thead>
<tbody>
<tr><td>0~1년</td><td>1~2년차</td><td>0%</td><td>519,740</td></tr>
<tr><td>2년</td><td>3년차</td><td>5%</td><td>493,740</td></tr>
<tr><td>4년</td><td>5년차</td><td>15%</td><td>441,760</td></tr>
<tr><td>7년</td><td>8년차</td><td>30%</td><td>363,800</td></tr>
<tr><td>9년</td><td>10년차</td><td>40%</td><td>311,840</td></tr>
<tr class="ax-hi"><td>11년 이상</td><td>12년차 이상</td><td><b>50% (한도)</b></td><td><b>259,870</b></td></tr>
</tbody></table>
<p class="ax-tn">지방세법 시행령 제125조. 12년차부터는 50%로 고정되어 더 내려가지 않습니다.</p></div>
<p class="ax-nt">신차 때 52만원이던 세금이 12년차에는 <b>26만원</b>으로 절반이 됩니다. 오래된 차를 유지하는 비용 계산에서 빠뜨리기 쉬운 부분입니다.</p>
<div class="ax-warn"><span>주의</span><p>경감은 <b>사용연수</b> 기준이라 등록 후 경과연수보다 1년 빠릅니다. 2년 전에 등록한 차는 사용연수 3년차라 이미 5% 경감을 받습니다.</p></div>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 연납 할인</b><span>1월이 가장 크다</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>연납하면 얼마나 아끼나요</h3>
<p>자동차세는 원래 6월과 12월에 나눠 냅니다. 1월에 1년치를 미리 내면 <b>2월부터 12월까지 11개월분의 5%</b>를 공제받습니다. 연세액 기준으로는 약 <b>4.57%</b>입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>신청 시기</th><th>공제 대상</th><th>1,999cc 기준 할인액</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>1월</td><td>2~12월분 (11개월)</td><td><b>약 23,760원</b></td></tr>
<tr><td>3월</td><td>4~12월분 (9개월)</td><td>줄어듦</td></tr>
<tr><td>6월</td><td>7~12월분 (6개월)</td><td>더 줄어듦</td></tr>
<tr><td>9월</td><td>10~12월분 (3개월)</td><td>가장 적음</td></tr>
</tbody></table>
<p class="ax-tn">연납은 3·6·9월에도 신청할 수 있지만, 남은 기간의 세액에만 5%가 적용되므로 <b>1월이 가장 유리</b>합니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 140" role="img" aria-label="1월 연납이 공제 대상 기간이 가장 길어 할인액이 큽니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">신청 시기별 공제 대상 기간</text>
<text x="0" y="46" font-size="11.5" font-weight="700" fill="#c4452f">1월</text>
<rect x="52" y="34" width="560" height="16" rx="4" fill="#c4452f"/>
<text x="622" y="47" font-size="11" font-weight="700" fill="#c4452f">11개월</text>
<text x="0" y="72" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">3월</text>
<rect x="52" y="60" width="458" height="16" rx="4" fill="#c4452f" opacity=".6"/>
<text x="520" y="73" font-size="11" font-weight="700" fill="currentColor" opacity=".7">9개월</text>
<text x="0" y="98" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">6월</text>
<rect x="52" y="86" width="305" height="16" rx="4" fill="#c4452f" opacity=".4"/>
<text x="367" y="99" font-size="11" font-weight="700" fill="currentColor" opacity=".7">6개월</text>
<text x="0" y="124" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">9월</text>
<rect x="52" y="112" width="152" height="16" rx="4" fill="#c4452f" opacity=".25"/>
<text x="214" y="125" font-size="11" font-weight="700" fill="currentColor" opacity=".7">3개월</text>
</svg>
<figcaption>지방자치단체 자동차세 연납 안내 (2026년 1월 신고·납부 기준)</figcaption>
</figure>
<div class="ax-warn"><span>주의</span><p>연납한 뒤 차를 팔거나 폐차하면 <b>남은 기간분을 환급</b>받습니다. 미리 냈다고 손해 보지 않으니 1월 연납이 유리합니다.</p></div>
<div class="ax-btns">
<a class="ax-btn" href="/insurance/auto-tax/"><b>자동차세 계산기</b><span>배기량·연식별 계산</span></a>
<a class="ax-btn" href="https://www.wetax.go.kr/" target="_blank" rel="noopener"><b>위택스</b><span>조회·납부·연납 신청</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>자동차세는 소유 기간에 비례합니다. 연중에 차를 사고팔면 보유한 일수만큼만 부담합니다.</li>
<li>전기차·수소차는 배기량이 없어 정액으로 부과됩니다. 비영업용 승용 기준으로 내연기관차보다 훨씬 적습니다.</li>
<li>경차(1,000cc 이하)는 cc당 80원이라 연 10만원 수준입니다. 유지비 차이가 큰 이유 중 하나입니다.</li>
<li>연납 신청은 위택스나 관할 지자체에서 할 수 있고, 한 번 신청하면 다음 해 1월에 고지서가 자동 발송되는 지자체가 많습니다.</li>
<li>자동차세를 체납하면 번호판 영치 대상이 될 수 있습니다. 연납은 체납 방지 효과도 있습니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>2,000cc 자동차세는 얼마인가요?</summary>
<div class="ax-ab"><p>1,999cc 비영업용 승용차 신차 기준으로 자동차세 <b>399,800원</b>에 지방교육세 119,940원을 더해 연 <b>519,740원</b>입니다. 1월에 연납하면 23,760원을 공제받아 495,980원을 냅니다.</p>
<p class="ax-law">지방세법 제127조 (1,600cc 초과 cc당 200원) · 제151조</p></div></details>

<details class="ax-acc"><summary>자동차세 연납 할인은 몇 퍼센트인가요?</summary>
<div class="ax-ab"><p>1월에 신고·납부하면 <b>2월부터 12월까지 11개월분의 5%</b>를 공제합니다. 연세액 기준으로는 약 4.57%입니다. 3·6·9월에도 신청할 수 있지만 남은 기간분에만 적용돼 할인액이 줄어듭니다.</p>
<p class="ax-law">지방자치단체 자동차세 연납 안내</p></div></details>

<details class="ax-acc"><summary>차가 오래되면 자동차세가 줄어드나요?</summary>
<div class="ax-ab"><p>줄어듭니다. 사용연수 <b>3년차부터 매년 5%씩</b> 경감되고 12년차부터는 <b>50%</b>로 고정됩니다. 1,999cc 기준으로 신차 519,740원이 12년차에는 259,870원이 됩니다.</p>
<p class="ax-law">지방세법 시행령 제125조</p></div></details>

<details class="ax-acc"><summary>차값이 비싸면 자동차세도 많나요?</summary>
<div class="ax-ab"><p>아닙니다. 자동차세는 <b>배기량</b>으로만 정해집니다. 1억짜리 2,000cc 차와 3천만원짜리 2,000cc 차의 세금이 같습니다. 차값에 따라 달라지는 것은 취득세와 자동차보험료입니다.</p>
<p class="ax-law">지방세법 제127조</p></div></details>

<details class="ax-acc"><summary>연납했는데 차를 팔면 어떻게 되나요?</summary>
<div class="ax-ab"><p>남은 기간에 해당하는 세액을 환급받습니다. 자동차세는 소유 일수에 비례해 부담하므로, 미리 냈다고 손해 보지 않습니다.</p>
<p class="ax-law">지방세법 (자동차세 일할 계산)</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>자동차세 = <b>배기량 × cc당 세율</b> + 지방교육세 30%입니다.</li>
<li>비영업용 승용 세율은 1,000cc 이하 80원, 1,600cc 이하 140원, <b>1,600cc 초과 200원</b>입니다.</li>
<li>1,999cc 신차는 연 <b>519,740원</b>입니다.</li>
<li>사용연수 3년차부터 <b>매년 5%씩</b> 경감되어 12년차에 50%가 됩니다.</li>
<li>1월 연납하면 11개월분의 5%, 1,999cc 기준 <b>약 23,760원</b>을 아낍니다.</li>
</ul>
<a class="ax-cta" href="/insurance/auto-tax/">
<span><b>자동차세 계산기로 확인하기</b><i>배기량·연식으로 즉시 계산</i></span>
<em>자동차세 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">세율과 경감 기준은 지방세법 및 같은 법 시행령, 연납 공제는 지방자치단체 안내를 확인한 값입니다.</p>

<div class="ax-lawq"><b>자동차세 세율 (지방세법 제127조) — 비영업용 승용자동차</b>
<p>1,000cc 이하 <b>cc당 80원</b> / 1,000cc 초과 1,600cc 이하 <b>cc당 140원</b> / 1,600cc 초과 <b>cc당 200원</b></p></div>

<div class="ax-lawq"><b>사용연수별 경감 (지방세법 시행령 제125조)</b>
<p>차령 3년 이상 비영업용 승용자동차는 <b>매년 5%씩, 최대 50%까지</b> 경감 과세한다. 사용연수는 등록 후 경과연수에 1을 더한 값이며, 12년차부터는 50%로 고정된다.</p></div>

<div class="ax-lawq"><b>자동차세 연납 공제 (2026년)</b>
<p>1월에 신고·납부하는 경우 <b>2월~12월분 자동차세의 5%</b>를 공제한다. 신고·납부기간은 2026년 1월 16일~2월 4일(지자체별 상이). 3·6·9월에도 연납할 수 있으나 남은 기간 세액에만 공제가 적용된다.</p></div>

<div class="ax-src"><b>출처 · 행정안전부, 지방자치단체</b><br>
세율과 경감 근거는 <a href="https://www.law.go.kr/법령/지방세법" target="_blank" rel="noopener">지방세법</a> 제127조·제151조 및 같은 법 시행령 제125조입니다. 조회·납부·연납 신청은 <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener">위택스</a>에서 할 수 있습니다.<br><br>
연납 신고·납부기간과 세부 공제 계산 방식은 지방자치단체마다 조금씩 다를 수 있습니다. 전기차·수소차·화물차·승합차는 별도 세율 체계가 적용됩니다. 본 계산 결과는 참고용이며 정확한 고지세액은 위택스나 관할 지자체에서 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>세금 계산기</h4>
<a class="ax-rel" href="/insurance/auto-tax/">자동차세 계산기<span>배기량·연식</span></a>
<a class="ax-rel" href="/realestate/acquisition-tax/">취득세 계산기<span>부동산 취득</span></a>
<a class="ax-rel" href="/realestate/property-tax/">재산세 계산기<span>보유세</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">자동차세 계산 구조</a></li>
<li><a href="#m1">배기량별 세금</a></li>
<li><a href="#m2">차령 경감</a></li>
<li><a href="#m3">연납 할인</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/realestate/acquisition-tax-guide/">취득세 계산, 6억과 7억의 차이<span>부동산</span></a>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세<span>양도세</span></a>
<a class="ax-rel" href="/tax/four-major-insurance-guide/">4대보험 요율 2026<span>급여</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "2,000cc 자동차세는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1,999cc 비영업용 승용차 신차 기준으로 자동차세 399,800원에 지방교육세 119,940원을 더해 연 519,740원입니다. 1월에 연납하면 23,760원을 공제받아 495,980원을 냅니다. 지방세법 제127조 (1,600cc 초과 cc당 200원) · 제151조"
      }
    },
    {
      "@type": "Question",
      "name": "자동차세 연납 할인은 몇 퍼센트인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1월에 신고·납부하면 2월부터 12월까지 11개월분의 5%를 공제합니다. 연세액 기준으로는 약 4.57%입니다. 3·6·9월에도 신청할 수 있지만 남은 기간분에만 적용돼 할인액이 줄어듭니다. 지방자치단체 자동차세 연납 안내"
      }
    },
    {
      "@type": "Question",
      "name": "차가 오래되면 자동차세가 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "줄어듭니다. 사용연수 3년차부터 매년 5%씩 경감되고 12년차부터는 50%로 고정됩니다. 1,999cc 기준으로 신차 519,740원이 12년차에는 259,870원이 됩니다. 지방세법 시행령 제125조"
      }
    },
    {
      "@type": "Question",
      "name": "차값이 비싸면 자동차세도 많나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 자동차세는 배기량으로만 정해집니다. 1억짜리 2,000cc 차와 3천만원짜리 2,000cc 차의 세금이 같습니다. 차값에 따라 달라지는 것은 취득세와 자동차보험료입니다. 지방세법 제127조"
      }
    },
    {
      "@type": "Question",
      "name": "연납했는데 차를 팔면 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "남은 기간에 해당하는 세액을 환급받습니다. 자동차세는 소유 일수에 비례해 부담하므로, 미리 냈다고 손해 보지 않습니다. 지방세법 (자동차세 일할 계산)"
      }
    }
  ],
};
