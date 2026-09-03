// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/6-적금-예금-이자.html
export const meta = {
  title: "적금 이자 계산, 만기에 실제로 받는 돈은 얼마인가",
  description: "적금 이자는 원금 전체가 아니라 매달 넣은 돈이 남은 개월수만큼만 붙습니다. 월 50만원 24개월 연 4%면 이자 513,015원, 세금 79,004원을 떼고 12,434,011원. 이자소득세 15.4%와 비과세 상품까지 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/savings/installment-savings-guide/",
};

export const widgetKey = "savings";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>적금 만기액 계산</b>
<span>월 납입금과 기간을 넣으면 이자·세금·만기 수령액이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>월 납입금 (원)</em><input type="number" id="mon" value="500000" step="100000" min="0"></label>
  <label class="ax-wg-f"><em>납입 기간 (개월)</em><input type="number" id="mth" value="24" step="1" min="1" max="60"></label>
  <label class="ax-wg-f"><em>연이율 (%)</em><input type="number" id="rt" value="4" step="0.1" min="0"></label>
  <label class="ax-wg-f"><em>과세 여부</em>
    <select id="tf"><option value="no">일반과세 (15.4%)</option><option value="yes">비과세</option></select></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">단리 방식(월별 이자 합산) 기준입니다. 은행 상품마다 이자 계산 방식과 우대금리 조건이 달라 실제 금액은 차이가 날 수 있으니 <a href="/savings/installment-savings/">적금 계산기</a>에서 복리 방식까지 비교해 보세요.</p>
</div>`;

export const htmlBefore = `<h1>적금 이자 계산, 만기에 실제로 받는 돈은 얼마인가</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="적금 이자는 매달 넣은 돈이 남은 개월수만큼만 붙습니다">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#c4452f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">저축·이자</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">적금 이자 계산</text>
<rect x="70" y="312" width="376" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">생각보다 적은 이유</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">연 4% 적금의 실질 수익률은 약 2%</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(650 168)">
  <ellipse cx="190" cy="278" rx="168" ry="18" fill="#e8ded0" opacity=".55"/>
  <rect x="30" y="60" width="46" height="200" rx="6" fill="#d9bd6a" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="94" y="96" width="46" height="164" rx="6" fill="#d9bd6a" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="158" y="132" width="46" height="128" rx="6" fill="#d9bd6a" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="222" y="168" width="46" height="92" rx="6" fill="#d9bd6a" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="286" y="204" width="46" height="56" rx="6" fill="#f2cfc8" stroke="#c4452f" stroke-width="3.5"/>
  <text x="190" y="34" font-size="17" font-weight="700" text-anchor="middle" fill="#8a8172">먼저 넣은 돈일수록 이자가 많습니다</text>
</g>
</svg>

<p class="ax-intro">연 4% 적금에 월 50만원씩 2년을 넣으면 원금은 1,200만원입니다. 이자가 <b>96만원</b>쯤 붙을 것 같지만 실제로는 <b>513,015원</b>이고, 세금 79,004원을 떼면 손에 남는 건 <b>434,011원</b>입니다. 적금은 <b>매달 넣은 돈에만, 남은 개월수만큼만</b> 이자가 붙기 때문입니다.</p>

<a class="ax-cta" href="/savings/installment-savings/">
<span><b>내 적금 만기액 바로 계산하기</b><i>월 납입금·기간·금리만 넣으면 됩니다</i></span>
<em>적금 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산 구조 2단계</a><a href="#m2">세금</a><a href="#m3">예금과 비교</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산 구조</b><span>왜 절반밖에 안 붙나</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>적금 이자는 왜 생각보다 적나요</h3>
<p>예금은 목돈을 한 번에 넣어 전 기간 이자가 붙지만, 적금은 다릅니다. <b>첫 달에 넣은 돈만 24개월치 이자</b>를 받고, 마지막 달에 넣은 돈은 <b>1개월치</b> 이자만 받습니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 170" role="img" aria-label="적금은 먼저 넣은 돈일수록 이자가 붙는 기간이 길고 마지막 달 납입금은 한 달치만 붙습니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">24개월 적금에서 각 납입금이 이자를 받는 기간</text>
<rect x="0" y="40" width="420" height="20" rx="5" fill="#c4452f" opacity=".8"/>
<text x="432" y="55" font-size="11.5" font-weight="700" fill="currentColor">1개월차 납입 → 24개월치</text>
<rect x="0" y="68" width="280" height="20" rx="5" fill="#c4452f" opacity=".55"/>
<text x="292" y="83" font-size="11.5" font-weight="700" fill="currentColor" opacity=".8">9개월차 납입 → 16개월치</text>
<rect x="0" y="96" width="140" height="20" rx="5" fill="#c4452f" opacity=".35"/>
<text x="152" y="111" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">17개월차 납입 → 8개월치</text>
<rect x="0" y="124" width="18" height="20" rx="5" fill="#c4452f" opacity=".2"/>
<text x="30" y="139" font-size="11.5" font-weight="700" fill="currentColor" opacity=".6">24개월차 납입 → 1개월치</text>
<text x="0" y="164" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">평균하면 원금이 이자를 받는 기간은 전체 기간의 절반 남짓입니다</text>
</svg>
<figcaption>적금 이자 = 월 납입금 × 연이율 ÷ 12 × (납입월수 합계) · 소득세법 제16조 (이자소득)</figcaption>
</figure>
<div class="ax-cp">
  <div><em>예금 1,200만원 · 1년 · 연 4%</em><b>480,000원</b><i>원금 전체에 1년치 이자</i></div>
  <div class="ax-hi"><em>적금 월 50만 · 24개월 · 연 4%</em><b>513,015원</b><i>원금 1,200만원, 기간은 2배인데 이자는 비슷</i></div>
</div>
<p class="ax-nt">같은 1,200만원이라도 예금은 1년 만에 48만원, 적금은 2년 걸려 51만원입니다. <b>연 4%라는 숫자는 같아도 실질 수익률은 절반 수준</b>입니다.</p>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>월 납입금·기간별 적금 만기액은 얼마인가요</h3>
<p>연 4%, 복리 방식, 일반과세(15.4%) 기준입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>조건</th><th>원금</th><th>이자</th><th>세금</th><th>만기 수령액</th></tr></thead>
<tbody>
<tr><td>월 10만 · 24개월</td><td>2,400,000</td><td>102,603</td><td>15,800</td><td><b>2,486,803</b></td></tr>
<tr><td>월 30만 · 24개월</td><td>7,200,000</td><td>307,809</td><td>47,402</td><td><b>7,460,407</b></td></tr>
<tr><td>월 50만 · 12개월</td><td>6,000,000</td><td>131,602</td><td>20,266</td><td><b>6,111,336</b></td></tr>
<tr class="ax-hi"><td>월 50만 · 24개월</td><td>12,000,000</td><td>513,015</td><td>79,004</td><td><b>12,434,011</b></td></tr>
<tr><td>월 50만 · 36개월</td><td>18,000,000</td><td>1,154,417</td><td>177,780</td><td><b>18,976,637</b></td></tr>
<tr><td>월 100만 · 24개월</td><td>24,000,000</td><td>1,026,031</td><td>158,008</td><td><b>24,868,023</b></td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 연 4%·복리·일반과세 기준. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<p class="ax-nt">기간을 12개월에서 36개월로 3배 늘리면 이자는 131,602원에서 1,154,417원으로 <b>8.8배</b>가 됩니다. 원금도 늘고 이자가 붙는 기간도 길어지기 때문입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>이자 계산 방식</th><th>이자</th><th>만기 수령액</th></tr></thead>
<tbody>
<tr><td>단리</td><td>500,000</td><td>12,423,000</td></tr>
<tr class="ax-hi"><td>복리</td><td>513,015</td><td><b>12,434,011</b></td></tr>
</tbody></table>
<p class="ax-tn">월 50만·24개월·연 4% 기준. 차이는 11,011원으로 크지 않습니다. 적금은 기간이 짧아 복리 효과가 제한적입니다.</p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 세금</b><span>이자소득세 15.4%</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>이자소득세 15.4%는 어떻게 떼나요</h3>
<p>이자에는 <b>소득세 14% + 지방소득세 1.4% = 15.4%</b>가 붙습니다. 은행이 만기에 자동으로 떼고 나머지를 줍니다. 원금에는 세금이 없고 <b>이자에만</b> 붙습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>구분</th><th>이자</th><th>세금</th><th>만기 수령액</th></tr></thead>
<tbody>
<tr><td>일반과세 (15.4%)</td><td>513,015</td><td>79,004</td><td>12,434,011</td></tr>
<tr class="ax-hi"><td>비과세</td><td>513,015</td><td><b>0</b></td><td><b>12,513,015</b></td></tr>
</tbody></table>
<p class="ax-tn">월 50만·24개월·연 4% 기준. 비과세면 79,004원을 더 받습니다.</p></div>
<p class="ax-nt">비과세 혜택을 받을 수 있는 대표적인 경우입니다.</p>
<ul class="ax-ck"><li>비과세종합저축 (65세 이상·장애인 등)</li><li>청년 우대형 상품</li><li>새마을금고·신협 조합원 예탁금</li><li>ISA 계좌 내 운용</li></ul>
<div class="ax-warn"><span>주의</span><p>한 해 이자·배당 합계가 <b>2,000만원</b>을 넘으면 초과분이 다른 소득과 합산되는 <b>금융소득종합과세</b> 대상이 됩니다. 연 3.5% 예금 기준으로 원금 약 5억 7,100만원부터 해당됩니다.</p></div>
<p class="ax-law-l">소득세법 제16조 (이자소득) · 제129조 (원천징수세율) · 지방세법 (지방소득세)</p>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 예금과 비교</b><span>목돈이 있다면</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>예금 이자는 얼마나 붙나요</h3>
<p>목돈이 이미 있다면 예금이 유리합니다. 연 3.5%, 1년, 일반과세 기준입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>예치 원금</th><th>이자</th><th>세금 (15.4%)</th><th>만기 수령액</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>1,000만원</td><td>350,000</td><td>53,900</td><td><b>10,296,100</b></td></tr>
<tr><td>3,000만원</td><td>1,050,000</td><td>161,700</td><td>30,888,300</td></tr>
<tr><td>5,000만원</td><td>1,750,000</td><td>269,500</td><td>51,480,500</td></tr>
<tr><td>1억원</td><td>3,500,000</td><td>539,000</td><td>102,961,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 연 3.5%·1년·일반과세 기준.</p></div>
<p class="ax-nt">적금은 <b>목돈을 만드는</b> 상품이고 예금은 <b>목돈을 굴리는</b> 상품입니다. 금리가 같아도 성격이 달라 단순 비교는 의미가 없습니다. 매달 저축할 여력이 있다면 적금, 이미 목돈이 있다면 예금입니다.</p>
<div class="ax-btns">
<a class="ax-btn" href="/savings/installment-savings/"><b>적금 계산기</b><span>단리·복리 비교</span></a>
<a class="ax-btn" href="/savings/fixed-deposit/"><b>예금 계산기</b><span>원금별 만기액</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>은행이 광고하는 금리는 대부분 우대금리를 다 채웠을 때의 최고 금리입니다. 기본금리와 우대조건을 따로 확인해야 합니다.</li>
<li>적금을 중도해지하면 약정금리가 아니라 중도해지이율이 적용됩니다. 보통 기본금리의 절반 이하로 떨어집니다.</li>
<li>만기 후에는 만기후이율이 적용되는데 대개 0.1~0.5% 수준입니다. 만기일에 바로 찾거나 재예치하는 편이 낫습니다.</li>
<li>예금자보호는 금융기관별로 원금과 이자를 합해 1인당 5,000만원까지입니다. 큰 금액은 나눠 예치하는 것이 안전합니다.</li>
<li>적금 이자는 단리와 복리 차이가 크지 않습니다. 기간이 짧아 복리가 작동할 시간이 부족하기 때문입니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>월 50만원씩 2년 적금하면 이자가 얼마인가요?</summary>
<div class="ax-ab"><p>연 4% 기준으로 이자는 <b>513,015원</b>, 이자소득세 79,004원을 떼고 만기에 <b>12,434,011원</b>을 받습니다. 원금 1,200만원에 실제로 손에 남는 이자는 434,011원입니다.</p>
<p class="ax-law">소득세법 제129조 (원천징수세율 14%) · 지방소득세 1.4%</p></div></details>

<details class="ax-acc"><summary>연 4% 적금인데 왜 4%만큼 안 붙나요?</summary>
<div class="ax-ab"><p>적금은 매달 넣은 돈에 남은 개월수만큼만 이자가 붙기 때문입니다. 첫 달 납입금은 24개월치, 마지막 달 납입금은 1개월치 이자만 받습니다. 평균하면 원금이 이자를 받는 기간이 전체의 절반 남짓이라, 체감 수익률은 표기 금리의 절반 수준입니다.</p>
<p class="ax-law">본문 1단계 참고</p></div></details>

<details class="ax-acc"><summary>이자소득세 15.4%는 언제 떼나요?</summary>
<div class="ax-ab"><p>만기에 은행이 자동으로 원천징수합니다. 소득세 14%에 지방소득세 1.4%를 더한 값이고, 원금이 아니라 <b>이자에만</b> 붙습니다. 별도로 신고할 필요는 없습니다.</p>
<p class="ax-law">소득세법 제129조</p></div></details>

<details class="ax-acc"><summary>적금과 예금 중 뭐가 유리한가요?</summary>
<div class="ax-ab"><p>목적이 다릅니다. 매달 저축할 여력이 있으면 적금, 이미 목돈이 있으면 예금입니다. 같은 1,200만원이라도 예금 1년(연 4%)은 48만원, 적금 24개월(연 4%)은 51만원으로 적금이 기간을 2배 쓰고도 이자가 비슷합니다.</p>
<p class="ax-law">본문 1단계 비교 참고</p></div></details>

<details class="ax-acc"><summary>이자가 얼마를 넘으면 종합과세되나요?</summary>
<div class="ax-ab"><p>한 해 이자·배당 소득 합계가 <b>2,000만원</b>을 초과하면 초과분이 다른 소득과 합산돼 종합소득세율로 과세됩니다. 연 3.5% 예금이라면 원금 약 5억 7,100만원부터 이자가 2,000만원에 가까워집니다.</p>
<p class="ax-law">소득세법 제14조 (금융소득 종합과세)</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>적금 이자는 <b>매달 넣은 돈에 남은 개월수만큼만</b> 붙어, 체감 수익률이 표기 금리의 절반 수준입니다.</li>
<li>월 50만·24개월·연 4%면 이자 <b>513,015원</b>, 세후 만기 <b>12,434,011원</b>입니다.</li>
<li>이자소득세는 <b>15.4%</b>(소득세 14% + 지방소득세 1.4%)입니다.</li>
<li>적금은 단리·복리 차이가 작습니다(월 50만·24개월 기준 11,011원).</li>
<li>연 이자·배당이 <b>2,000만원</b>을 넘으면 금융소득종합과세 대상입니다.</li>
</ul>
<a class="ax-cta" href="/savings/installment-savings/">
<span><b>적금 계산기로 내 만기액 확인하기</b><i>세금까지 반영한 실수령액</i></span>
<em>적금 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">이자소득 과세 근거는 소득세법이며, 계산은 MoneyDoc 계산기 엔진으로 산출했습니다.</p>

<div class="ax-lawq"><b>이자소득세율</b>
<p>소득세 <b>14%</b> + 지방소득세 <b>1.4%</b> = <b>15.4%</b>. 금융기관이 이자 지급 시 원천징수한다. (소득세법 제129조 원천징수세율, 지방세법상 지방소득세)</p></div>

<div class="ax-lawq"><b>금융소득 종합과세</b>
<p>한 과세기간의 이자소득과 배당소득의 합계액이 <b>2천만원</b>을 초과하는 경우 그 초과분을 다른 종합소득과 합산하여 과세한다. (소득세법 제14조)</p></div>

<div class="ax-lawq"><b>적금 이자 계산 구조</b>
<p>월 납입금별로 예치 개월수가 달라 이자가 각각 계산된다. 1회차 납입금은 전체 기간, 최종 회차 납입금은 1개월분 이자만 발생한다.</p></div>

<div class="ax-src"><b>출처 · 국세청, 소득세법</b><br>
이자소득 과세 근거는 <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener">소득세법</a> 제16조·제14조·제129조입니다. 예금자보호 한도는 예금보험공사 기준입니다.<br><br>
실제 이자는 은행별 이자 계산 방식(단리·복리, 월별 잔액 기준), 우대금리 충족 여부, 중도해지 여부에 따라 달라집니다. 본 계산 결과는 참고용이며 정확한 금액은 가입 금융기관에서 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>저축 계산기</h4>
<a class="ax-rel" href="/savings/installment-savings/">적금 계산기<span>단리·복리·세금</span></a>
<a class="ax-rel" href="/savings/fixed-deposit/">예금 계산기<span>원금별 만기액</span></a>
<a class="ax-rel" href="/savings/free-savings/">자유적금 계산기<span>자유 납입</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">적금 이자 구조</a></li>
<li><a href="#m1">납입금·기간별 만기액</a></li>
<li><a href="#m2">이자소득세 15.4%</a></li>
<li><a href="#m3">예금과 비교</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/pension/national-pension-early-guide/">국민연금 조기수령 손익분기<span>연금</span></a>
<a class="ax-rel" href="undefined">2026 연봉 실수령액 표<span>연봉</span></a>
<a class="ax-rel" href="/loan/dsr-limit-guide/">스트레스 DSR 3단계 계산<span>대출</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "월 50만원씩 2년 적금하면 이자가 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "연 4% 기준으로 이자는 513,015원, 이자소득세 79,004원을 떼고 만기에 12,434,011원을 받습니다. 원금 1,200만원에 실제로 손에 남는 이자는 434,011원입니다. 소득세법 제129조 (원천징수세율 14%) · 지방소득세 1.4%"
      }
    },
    {
      "@type": "Question",
      "name": "연 4% 적금인데 왜 4%만큼 안 붙나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "적금은 매달 넣은 돈에 남은 개월수만큼만 이자가 붙기 때문입니다. 첫 달 납입금은 24개월치, 마지막 달 납입금은 1개월치 이자만 받습니다. 평균하면 원금이 이자를 받는 기간이 전체의 절반 남짓이라, 체감 수익률은 표기 금리의 절반 수준입니다. 본문 1단계 참고"
      }
    },
    {
      "@type": "Question",
      "name": "이자소득세 15.4%는 언제 떼나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "만기에 은행이 자동으로 원천징수합니다. 소득세 14%에 지방소득세 1.4%를 더한 값이고, 원금이 아니라 이자에만 붙습니다. 별도로 신고할 필요는 없습니다. 소득세법 제129조"
      }
    },
    {
      "@type": "Question",
      "name": "적금과 예금 중 뭐가 유리한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "목적이 다릅니다. 매달 저축할 여력이 있으면 적금, 이미 목돈이 있으면 예금입니다. 같은 1,200만원이라도 예금 1년(연 4%)은 48만원, 적금 24개월(연 4%)은 51만원으로 적금이 기간을 2배 쓰고도 이자가 비슷합니다. 본문 1단계 비교 참고"
      }
    },
    {
      "@type": "Question",
      "name": "이자가 얼마를 넘으면 종합과세되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "한 해 이자·배당 소득 합계가 2,000만원을 초과하면 초과분이 다른 소득과 합산돼 종합소득세율로 과세됩니다. 연 3.5% 예금이라면 원금 약 5억 7,100만원부터 이자가 2,000만원에 가까워집니다. 소득세법 제14조 (금융소득 종합과세)"
      }
    }
  ],
};
