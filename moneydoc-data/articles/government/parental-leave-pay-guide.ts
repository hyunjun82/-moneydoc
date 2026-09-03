// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/12-육아휴직급여.html
export const meta = {
  title: "육아휴직 급여, 1년 받으면 2,310만원인 이유",
  description: "육아휴직 급여는 1~3개월 통상임금 100%(상한 250만), 4~6개월 100%(상한 200만), 7개월부터 80%(상한 160만)입니다. 12개월이면 2,310만원. 사후지급금은 시행령 개정으로 폐지돼 매달 전액 받습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/government/parental-leave-pay-guide/",
};

export const widgetKey = "parental";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>육아휴직 급여 계산</b>
<span>휴직 시작일 기준 월 통상임금과 사용할 개월수를 넣으면 단계별 금액이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>월 통상임금 (원)</em><input type="number" id="sal" value="3000000" step="100000" min="0"></label>
  <label class="ax-wg-f"><em>사용 개월수</em><input type="number" id="mon" value="12" step="1" min="1" max="18"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">근거: 고용보험법 시행령 제95조 제1항. 상한은 250만/200만/160만, 하한은 모든 구간 70만원입니다. 1개월을 채우지 못한 달은 휴직 일수에 비례해 계산합니다(같은 조 제3항).</p>
</div>`;

export const htmlBefore = `<h1>육아휴직 급여, 1년 받으면 2,310만원인 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="육아휴직 급여는 1에서 3개월 250만원, 4에서 6개월 200만원, 7개월부터 160만원">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v250a60 60 0 0 1-60 60H820z" fill="#dfe9e2"/>
<circle cx="1006" cy="76" r="48" fill="#cfded4" opacity=".55"/>
<rect x="72" y="160" width="112" height="42" rx="9" fill="#2f6b52"/>
<text x="128" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">정부지원금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">육아휴직 1년</text>
<rect x="70" y="312" width="392" height="26" fill="#cfe0d6"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#2f6b52" letter-spacing="-2.6">급여는 2,310만원</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">250만 → 200만 → 160만 · 3단계로 줄어듭니다</text>
<rect x="0" y="545" width="1100" height="18" fill="#2f6b52"/>
<g transform="translate(648 196)">
  <ellipse cx="196" cy="228" rx="168" ry="17" fill="#e8ded0" opacity=".55"/>
  <rect x="40" y="128" width="72" height="100" rx="10" fill="#2f6b52"/>
  <text x="76" y="182" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">250</text>
  <text x="76" y="248" font-size="12" font-weight="700" text-anchor="middle" fill="#6f6858">1~3월</text>
  <rect x="152" y="158" width="72" height="70" rx="10" fill="#4d8a70"/>
  <text x="188" y="198" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">200</text>
  <text x="188" y="248" font-size="12" font-weight="700" text-anchor="middle" fill="#6f6858">4~6월</text>
  <rect x="264" y="180" width="72" height="48" rx="10" fill="#7fae97"/>
  <text x="300" y="211" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">160</text>
  <text x="300" y="248" font-size="12" font-weight="700" text-anchor="middle" fill="#6f6858">7월~</text>
  <text x="188" y="112" font-size="13" font-weight="700" text-anchor="middle" fill="#6f6858">월 상한 (만원)</text>
</g>
</svg>

<p class="ax-intro">육아휴직 급여는 <b>기간이 지날수록 줄어듭니다</b>. 처음 3개월은 통상임금 100%를 월 250만원까지, 다음 3개월은 100%를 200만원까지, 7개월째부터는 80%를 160만원까지 받습니다. 통상임금이 250만원 이상이면 12개월 합계가 <b>2,310만원</b>으로 고정됩니다. 예전처럼 25%를 복직 후에 받는 사후지급금은 이제 없습니다.</p>

<a class="ax-cta" href="/government/parental-leave-pay/">
<span><b>내 육아휴직 급여 계산하기</b><i>통상임금과 사용 개월수만 넣으면 됩니다</i></span>
<em>육아휴직 급여 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">3단계 급여 구조</a><a href="#m2">상한과 하한</a><a href="#m3">지급 방식과 기간</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 급여 구조</b><span>3개월마다 달라진다</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>육아휴직 급여는 월 얼마인가요</h3>
<p>고용보험법 시행령 제95조는 육아휴직 기간을 <b>세 구간</b>으로 나눠 다른 금액을 정하고 있습니다. 기준이 되는 것은 휴직을 <b>시작한 날의 월 통상임금</b>입니다. 휴직 중에 회사 임금이 올라도 급여는 바뀌지 않습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>기간</th><th>지급률</th><th>월 상한</th><th>월 하한</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>1~3개월</td><td>통상임금 <b>100%</b></td><td><b>250만원</b></td><td>70만원</td></tr>
<tr><td>4~6개월</td><td>통상임금 <b>100%</b></td><td>200만원</td><td>70만원</td></tr>
<tr><td>7개월~종료</td><td>통상임금 <b>80%</b></td><td>160만원</td><td>70만원</td></tr>
</tbody></table>
<p class="ax-tn">고용보험법 시행령 제95조 제1항 (개정 2024. 12. 24.). 통상임금은 휴직 시작일 기준으로 한 번 정해집니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 172" role="img" aria-label="육아휴직 12개월 급여는 250만원 3개월, 200만원 3개월, 160만원 6개월을 합쳐 2310만원">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">통상임금 250만원 이상일 때 12개월 누적</text>
<rect x="0" y="42" width="152" height="54" rx="8" fill="none" stroke="#2f6b52" stroke-width="1.6"/>
<text x="76" y="64" font-size="12.5" font-weight="800" text-anchor="middle" fill="#2f6b52">250만 × 3개월</text>
<text x="76" y="83" font-size="11.5" font-weight="700" text-anchor="middle" fill="#2f6b52" opacity=".8">750만원</text>
<text x="163" y="74" font-size="15" font-weight="700" fill="currentColor" opacity=".5">+</text>
<rect x="184" y="42" width="152" height="54" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="260" y="64" font-size="12.5" font-weight="800" text-anchor="middle" fill="currentColor">200만 × 3개월</text>
<text x="260" y="83" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".65">600만원</text>
<text x="347" y="74" font-size="15" font-weight="700" fill="currentColor" opacity=".5">+</text>
<rect x="368" y="42" width="152" height="54" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="444" y="64" font-size="12.5" font-weight="800" text-anchor="middle" fill="currentColor">160만 × 6개월</text>
<text x="444" y="83" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".65">960만원</text>
<line x1="520" y1="69" x2="558" y2="69" stroke="#2f6b52" stroke-width="2" stroke-linecap="round"/>
<polygon points="549,64 549,74 558,69" fill="#2f6b52"/>
<rect x="558" y="42" width="102" height="54" rx="8" fill="#2f6b52"/>
<text x="609" y="66" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">2,310만원</text>
<text x="609" y="84" font-size="10.5" text-anchor="middle" fill="#fff" opacity=".8">12개월 총액</text>
<text x="0" y="128" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">통상임금이 250만원이든 500만원이든 총액은 같습니다. 상한이 먼저 걸리기 때문입니다.</text>
<text x="0" y="150" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">18개월까지 쓰면 160만원 구간이 6개월 늘어 3,270만원이 됩니다.</text>
</svg>
<figcaption>「고용보험법 시행령」 제95조 제1항 (육아휴직 급여)</figcaption>
</figure>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>통상임금이 얼마여야 상한을 다 받나요</h3>
<p>구간마다 상한이 다르기 때문에 <b>구간별로 필요한 통상임금이 다릅니다</b>. 1~3개월 상한을 채우려면 250만원, 4~6개월은 200만원, 7개월 이후는 통상임금의 80%가 160만원이 되어야 하므로 <b>200만원</b>이면 됩니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>월 통상임금</th><th>1~3개월</th><th>4~6개월</th><th>7개월~</th><th>12개월 총액</th></tr></thead>
<tbody>
<tr><td>80만원</td><td>800,000</td><td>800,000</td><td>700,000</td><td>9,000,000</td></tr>
<tr><td>150만원</td><td>1,500,000</td><td>1,500,000</td><td>1,200,000</td><td>16,200,000</td></tr>
<tr><td>200만원</td><td>2,000,000</td><td>2,000,000</td><td><b>1,600,000</b></td><td>21,600,000</td></tr>
<tr class="ax-hi"><td>250만원 이상</td><td><b>2,500,000</b></td><td><b>2,000,000</b></td><td><b>1,600,000</b></td><td><b>23,100,000</b></td></tr>
<tr><td>500만원</td><td>2,500,000</td><td>2,000,000</td><td>1,600,000</td><td>23,100,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. MoneyDoc 계산기 엔진으로 산출한 값입니다. 굵은 글씨는 상한에 걸린 금액입니다.</p></div>
<p class="ax-nt">통상임금 <b>200만원과 500만원의 차이는 12개월에 150만원</b>뿐입니다. 4개월째부터는 상한이 200만원, 160만원으로 낮아져 두 사람이 똑같은 금액을 받기 때문입니다. 소득이 높을수록 대체율이 낮아지는 구조입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>월 통상임금</th><th>12개월 급여 총액</th><th>같은 기간 임금 대비</th></tr></thead>
<tbody>
<tr><td>200만원</td><td>21,600,000원</td><td><b>90.0%</b></td></tr>
<tr><td>300만원</td><td>23,100,000원</td><td>64.2%</td></tr>
<tr><td>400만원</td><td>23,100,000원</td><td>48.1%</td></tr>
<tr><td>500만원</td><td>23,100,000원</td><td>38.5%</td></tr>
</tbody></table>
<p class="ax-tn">대체율 = 12개월 급여 총액 ÷ (월 통상임금 × 12). 상한 때문에 소득이 높을수록 비율이 급격히 떨어집니다.</p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 지급 방식</b><span>이제 매달 전액</span></div>

<div class="ax-st"><div class="ax-n">3</div><div class="ax-sb">
<h3>사후지급금이 폐지되면 뭐가 달라지나요</h3>
<p>예전에는 육아휴직 급여의 <b>75%만 휴직 중에 주고, 나머지 25%는 복직해서 6개월을 일한 뒤에</b> 한꺼번에 지급했습니다. 이를 사후지급금이라 불렀습니다. 이 조항은 <b>고용보험법 시행령 제95조 제4항</b>이었는데, <b>2024년 12월 24일 개정으로 삭제</b>됐습니다. 지금은 매달 전액을 받습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>구분</th><th>사후지급금이 있던 때</th><th>현재</th></tr></thead>
<tbody>
<tr><td>휴직 중 매달 수령</td><td>급여의 75%</td><td><b>급여의 100%</b></td></tr>
<tr><td>1~3개월 실수령 (상한 기준)</td><td>1,875,000원</td><td><b>2,500,000원</b></td></tr>
<tr><td>나머지 25% 수령 시점</td><td>복직 후 6개월 근무 뒤</td><td><b>해당 없음</b></td></tr>
<tr><td>복직하지 않으면</td><td>25% 미지급</td><td><b>이미 다 받음</b></td></tr>
</tbody></table>
<p class="ax-tn">고용보험법 시행령 제95조 제4항이 삭제(2024. 12. 24.)되면서 분할 지급 근거가 사라졌습니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 190" role="img" aria-label="사후지급금이 있던 때는 75퍼센트만 매달 받고 25퍼센트를 복직 6개월 뒤 받았지만 지금은 100퍼센트를 매달 받습니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">1~3개월 상한 250만원 기준 · 실제 손에 들어오는 시점</text>
<text x="0" y="48" font-size="11.5" font-weight="700" fill="currentColor" opacity=".62">이전</text>
<rect x="52" y="34" width="300" height="26" rx="5" fill="currentColor" opacity=".28"/>
<text x="202" y="52" font-size="11.5" font-weight="800" text-anchor="middle" fill="currentColor">휴직 중 매달 1,875,000원 (75%)</text>
<rect x="356" y="34" width="140" height="26" rx="5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3" opacity=".55"/>
<text x="426" y="52" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".7">복직 6개월 후 25%</text>
<text x="0" y="100" font-size="11.5" font-weight="700" fill="#2f6b52">현재</text>
<rect x="52" y="86" width="444" height="26" rx="5" fill="#2f6b52"/>
<text x="274" y="104" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">휴직 중 매달 2,500,000원 (100%)</text>
<line x1="52" y1="128" x2="496" y2="128" stroke="currentColor" stroke-width="1" opacity=".3"/>
<text x="52" y="146" font-size="10.5" font-weight="600" fill="currentColor" opacity=".55">휴직 시작</text>
<text x="496" y="146" font-size="10.5" font-weight="600" text-anchor="end" fill="currentColor" opacity=".55">휴직 종료</text>
<text x="0" y="176" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">가장 돈이 필요한 휴직 기간에 전액이 들어옵니다. 총액이 늘어난 것이 아니라 시점이 당겨진 것입니다.</text>
</svg>
<figcaption>「고용보험법 시행령」 제95조 제4항 삭제 (2024. 12. 24.)</figcaption>
</figure>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 기간과 자격</b><span>1년 6개월의 조건</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>육아휴직 1년 6개월은 누가 쓸 수 있나요</h3>
<p>육아휴직 기간은 원칙적으로 <b>1년 이내</b>입니다. 다만 남녀고용평등법 제19조 제2항은 세 경우에 <b>6개월을 추가</b>할 수 있게 하고 있습니다. 아무나 1년 6개월을 쓰는 것이 아닙니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>구분</th><th>조건</th><th>기간</th></tr></thead>
<tbody>
<tr><td>일반</td><td>만 8세 이하 또는 초등 2학년 이하 자녀 양육</td><td>1년</td></tr>
<tr class="ax-hi"><td>부모 모두 사용</td><td>같은 자녀에 대해 <b>부모가 각각 3개월 이상</b> 사용한 경우의 부 또는 모</td><td><b>1년 6개월</b></td></tr>
<tr><td>한부모</td><td>한부모가족지원법 제4조 제1호의 부 또는 모</td><td>1년 6개월</td></tr>
<tr><td>장애아동</td><td>고용노동부령으로 정하는 장애아동의 부 또는 모</td><td>1년 6개월</td></tr>
</tbody></table>
<p class="ax-tn">남녀고용평등법 제19조 제2항 (개정 2024. 10. 22.). 추가 6개월도 급여는 7개월 이후 기준(80%, 상한 160만원)이 그대로 적용됩니다.</p></div>
<p class="ax-nt">두 번째 줄이 핵심입니다. 부부가 <b>각각 3개월 이상</b>을 써야 두 사람 모두 6개월씩 늘어납니다. 한 사람이 12개월 쓰고 배우자가 2개월만 쓰면 조건을 못 채웁니다. 18개월을 다 쓰면 급여 총액은 <b>3,270만원</b>이 됩니다.</p>
<p>급여를 받으려면 <b>휴직 시작 전 고용보험 피보험 단위기간이 합산 180일 이상</b>이어야 하고, 육아휴직을 <b>30일 이상</b> 부여받아야 합니다. 신청은 휴직 시작 후 1개월이 지난 시점부터 <b>휴직이 끝난 날 이후 12개월 이내</b>에 해야 합니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 160" role="img" aria-label="육아휴직 급여 신청 가능 기간은 휴직 시작 1개월 후부터 휴직 종료 12개월 이내입니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">급여 신청이 가능한 기간</text>
<line x1="14" y1="76" x2="646" y2="76" stroke="currentColor" stroke-width="1.6" opacity=".35"/>
<circle cx="60" cy="76" r="6" fill="currentColor" opacity=".5"/>
<text x="60" y="60" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".7">휴직 시작</text>
<circle cx="150" cy="76" r="6" fill="#2f6b52"/>
<text x="150" y="60" font-size="11" font-weight="800" text-anchor="middle" fill="#2f6b52">+1개월</text>
<circle cx="380" cy="76" r="6" fill="currentColor" opacity=".5"/>
<text x="380" y="60" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".7">휴직 종료</text>
<circle cx="600" cy="76" r="6" fill="#2f6b52"/>
<text x="600" y="60" font-size="11" font-weight="800" text-anchor="middle" fill="#2f6b52">종료 +12개월</text>
<rect x="150" y="94" width="450" height="22" rx="5" fill="#2f6b52" opacity=".85"/>
<text x="375" y="110" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">신청 가능 구간</text>
<rect x="60" y="94" width="90" height="22" rx="5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="4 3" opacity=".5"/>
<text x="0" y="148" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">기한을 넘기면 받을 수 없습니다. 보통 매달 신청해 매달 받습니다.</text>
</svg>
<figcaption>「고용보험법」 제70조 제1항·제2항 (육아휴직 급여)</figcaption>
</figure>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>기준이 되는 통상임금은 <b>휴직 시작일</b>의 금액입니다. 승진이나 임금 인상이 예정돼 있다면 그 이후에 시작하는 편이 유리할 수 있습니다.</li>
<li>육아휴직 기간은 <b>근속기간에 포함</b>됩니다(남녀고용평등법 제19조 제4항). 퇴직금 산정 기간에서 빠지지 않습니다.</li>
<li>출산전후휴가와 겹치는 기간은 육아휴직 급여 대상에서 제외됩니다. 출산휴가가 끝난 다음 날부터 육아휴직이 시작되는 것이 일반적입니다.</li>
<li>분할해서 써도 기간을 <b>합산</b>해 급여 구간을 계산합니다. 3개월 쓰고 복직했다가 다시 쓰면, 두 번째 휴직은 4개월째부터로 이어집니다.</li>
<li>한 달을 채우지 못한 달은 <b>휴직한 일수에 비례</b>해 계산합니다. 월 중간에 시작하거나 끝나도 손해 보지 않습니다.</li>
<li>사업주는 육아휴직을 이유로 해고하거나 불리한 처우를 할 수 없고, 복직 시 <b>휴직 전과 같은 업무 또는 같은 수준의 임금</b>을 주는 자리에 복귀시켜야 합니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>육아휴직 급여는 월 얼마인가요?</summary>
<div class="ax-ab"><p>1~3개월은 통상임금 100%로 <b>월 250만원</b>까지, 4~6개월은 100%로 <b>200만원</b>까지, 7개월째부터는 80%로 <b>160만원</b>까지입니다. 모든 구간의 하한은 70만원입니다. 통상임금이 250만원 이상이면 12개월 합계가 2,310만원입니다.</p>
<p class="ax-law">고용보험법 시행령 제95조 제1항</p></div></details>

<details class="ax-acc"><summary>육아휴직 사후지급금은 아직 있나요?</summary>
<div class="ax-ab"><p>없습니다. 급여의 25%를 복직 6개월 뒤에 주던 근거 조항인 <b>고용보험법 시행령 제95조 제4항이 2024년 12월 24일 개정으로 삭제</b>됐습니다. 지금은 휴직 기간 중에 매달 전액을 받습니다.</p>
<p class="ax-law">고용보험법 시행령 제95조 제4항 삭제 (2024. 12. 24.)</p></div></details>

<details class="ax-acc"><summary>육아휴직을 1년 6개월 쓰려면 어떻게 해야 하나요?</summary>
<div class="ax-ab"><p>같은 자녀에 대해 <b>부모가 각각 3개월 이상</b> 육아휴직을 사용해야 합니다. 그 외에 한부모가족지원법상 한부모이거나 장애아동의 부모인 경우에도 6개월을 추가할 수 있습니다. 한쪽만 오래 쓰는 것으로는 조건을 채우지 못합니다.</p>
<p class="ax-law">남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조 제2항</p></div></details>

<details class="ax-acc"><summary>육아휴직 급여를 받으려면 얼마나 일해야 하나요?</summary>
<div class="ax-ab"><p>육아휴직을 시작한 날 이전에 고용보험 <b>피보험 단위기간이 합산 180일 이상</b>이어야 합니다. 한 회사에서 연속으로 채울 필요는 없고 여러 직장의 기간을 합산합니다. 또한 육아휴직을 30일 이상 부여받아야 합니다.</p>
<p class="ax-law">고용보험법 제70조 제1항</p></div></details>

<details class="ax-acc"><summary>통상임금이 500만원이면 급여도 더 많나요?</summary>
<div class="ax-ab"><p>아닙니다. 상한이 걸리기 때문에 통상임금 250만원인 사람과 <b>똑같이 2,310만원</b>을 받습니다. 임금 대비 대체율로 보면 250만원인 사람은 77%, 500만원인 사람은 38.5%입니다.</p>
<p class="ax-law">고용보험법 시행령 제95조 제1항 (각 호 단서의 상한)</p></div></details>

<details class="ax-acc"><summary>급여 신청은 언제까지 해야 하나요?</summary>
<div class="ax-ab"><p>육아휴직을 시작한 날 이후 <b>1개월이 지난 시점부터, 휴직이 끝난 날 이후 12개월 이내</b>에 신청해야 합니다. 이 기간을 넘기면 받을 수 없습니다. 실무에서는 대부분 매달 신청해 매달 수령합니다.</p>
<p class="ax-law">고용보험법 제70조 제2항</p></div></details>

<details class="ax-acc"><summary>육아휴직 기간도 퇴직금에 들어가나요?</summary>
<div class="ax-ab"><p>들어갑니다. 남녀고용평등법 제19조 제4항이 <b>육아휴직 기간을 근속기간에 포함</b>한다고 정하고 있습니다. 다만 퇴직금의 기준이 되는 평균임금은 퇴직 직전 3개월로 산정하므로, 복직 후 3개월이 지난 뒤 퇴직하는 것이 일반적으로 유리합니다.</p>
<p class="ax-law">남녀고용평등법 제19조 제4항 · 근로자퇴직급여 보장법 제8조</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>급여는 <b>1~3개월 100%(상한 250만)</b>, 4~6개월 100%(상한 200만), 7개월부터 80%(상한 160만)입니다.</li>
<li>모든 구간의 <b>하한은 70만원</b>입니다.</li>
<li>통상임금 250만원 이상이면 12개월 총액은 <b>2,310만원</b>, 18개월이면 3,270만원입니다.</li>
<li>사후지급금은 시행령 제95조 제4항이 삭제되어 <b>폐지</b>됐습니다. 매달 전액 받습니다.</li>
<li>1년 6개월은 <b>부모가 각각 3개월 이상</b> 쓴 경우, 한부모, 장애아동 부모만 가능합니다.</li>
<li>피보험 단위기간 <b>180일 이상</b>, 신청은 휴직 종료 후 <b>12개월 이내</b>입니다.</li>
</ul>
<a class="ax-cta" href="/government/parental-leave-pay/">
<span><b>육아휴직 급여 계산기로 확인하기</b><i>통상임금·개월수로 즉시 계산</i></span>
<em>육아휴직 급여 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">아래는 국가법령정보센터에서 확인한 조문입니다. 고용보험법은 시행 2026. 8. 20. (법률 제21372호, 2026. 2. 19. 일부개정) 기준입니다.</p>

<div class="ax-lawq"><b>고용보험법 제70조 (육아휴직 급여) 제1항</b>
<p>고용노동부장관은 「남녀고용평등과 일ㆍ가정 양립 지원에 관한 법률」 제19조제1항에 따른 육아휴직을 30일 또는 같은 법 제19조제6항에 따른 육아휴직을 7일(「근로기준법」 제74조에 따른 출산전후휴가기간과 중복되는 기간은 각각 제외한다) 이상 부여받은 피보험자 중 육아휴직을 시작한 날 이전에 제41조에 따른 <b>피보험 단위기간이 합산하여 180일 이상</b>인 피보험자에게 육아휴직 급여를 지급한다.</p></div>

<div class="ax-lawq"><b>고용보험법 제70조 제2항 (신청 기한)</b>
<p>제1항에 따른 육아휴직 급여를 지급받으려는 사람은 <b>육아휴직을 시작한 날 이후 1개월부터 육아휴직이 끝난 날 이후 12개월 이내</b>에 신청하여야 한다.</p></div>

<div class="ax-lawq"><b>고용보험법 시행령 제95조 (육아휴직 급여) 제1항 &lt;개정 2024. 12. 24.&gt;</b>
<p>1. 육아휴직 시작일부터 3개월까지: 육아휴직 시작일을 기준으로 한 월 통상임금에 해당하는 금액. 다만, 해당 금액이 <b>250만원</b>을 넘는 경우에는 250만원으로 하고, 해당 금액이 70만원보다 적은 경우에는 70만원으로 한다.<br>
2. 육아휴직 4개월째부터 6개월째까지: … 다만, 해당 금액이 <b>200만원</b>을 넘는 경우에는 200만원으로 하고, 해당 금액이 70만원보다 적은 경우에는 70만원으로 한다.<br>
3. 육아휴직 7개월째부터 종료일까지: 육아휴직 시작일을 기준으로 한 월 통상임금의 <b>100분의 80</b>에 해당하는 금액. 다만, 해당 금액이 <b>160만원</b>을 넘는 경우에는 160만원으로 하고, 해당 금액이 70만원보다 적은 경우에는 70만원으로 한다.</p></div>

<div class="ax-lawq"><b>고용보험법 시행령 제95조 제3항·제4항</b>
<p>③ 육아휴직 급여의 지급대상 기간이 1개월을 채우지 못하는 경우에는 제1항에 따른 월별 지급액을 <b>해당 월에 휴직한 일수에 비례하여 계산</b>한 금액을 지급액으로 한다.<br>
④ <b>삭제 &lt;2024. 12. 24.&gt;</b> — 사후지급금(급여의 25%를 복직 후 지급)의 근거 조항이 삭제된 것입니다.</p></div>

<div class="ax-lawq"><b>남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조 제2항 &lt;개정 2024. 10. 22.&gt;</b>
<p>육아휴직의 기간은 <b>1년 이내</b>로 한다. 다만, 다음 각 호의 어느 하나에 해당하는 근로자의 경우 <b>6개월 이내에서 추가로</b> 육아휴직을 사용할 수 있다.<br>
1. 같은 자녀를 대상으로 <b>부모가 모두 육아휴직을 각각 3개월 이상 사용한 경우</b>의 부 또는 모<br>
2. 「한부모가족지원법」 제4조제1호의 부 또는 모<br>
3. 고용노동부령으로 정하는 <b>장애아동</b>의 부 또는 모</p></div>

<div class="ax-lawq"><b>남녀고용평등법 제19조 제3항·제4항 (신분 보장)</b>
<p>③ 사업주는 육아휴직을 이유로 해고나 그 밖의 불리한 처우를 하여서는 아니 되며, 육아휴직 기간에는 그 근로자를 해고하지 못한다.<br>
④ 사업주는 육아휴직을 마친 후에는 휴직 전과 같은 업무 또는 같은 수준의 임금을 지급하는 직무에 복귀시켜야 한다. 또한 제2항의 <b>육아휴직 기간은 근속기간에 포함</b>한다.</p></div>

<div class="ax-src"><b>출처 · 국가법령정보센터, 고용노동부</b><br>
조문은 <a href="https://www.law.go.kr/법령/고용보험법/제70조" target="_blank" rel="noopener">고용보험법 제70조</a>, <a href="https://www.law.go.kr/법령/고용보험법시행령/제95조" target="_blank" rel="noopener">같은 법 시행령 제95조</a>, <a href="https://www.law.go.kr/법령/남녀고용평등과 일·가정 양립 지원에 관한 법률/제19조" target="_blank" rel="noopener">남녀고용평등법 제19조</a>에서 확인했습니다. 신청과 지급은 <a href="https://www.work24.go.kr/" target="_blank" rel="noopener">고용24</a>에서 처리합니다.<br><br>
6+6 부모육아휴직제 등 별도 특례가 적용되는 경우에는 첫 6개월 급여가 위 표와 달라질 수 있습니다. 회사의 임금 체계에 따라 통상임금 산정이 달라질 수 있으므로, 정확한 금액은 관할 고용센터에서 확인하시기 바랍니다. 본 계산 결과는 참고용입니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>정부지원금 계산기</h4>
<a class="ax-rel" href="/government/parental-leave-pay/">육아휴직 급여 계산기<span>통상임금·개월수</span></a>
<a class="ax-rel" href="/government/basic-livelihood-eligibility/">기초생활 수급 판정<span>중위소득 기준</span></a>
<a class="ax-rel" href="/government/basic-pension/">기초연금 계산기<span>65세 이상</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">3단계 급여 구조</a></li>
<li><a href="#m1">통상임금별 총액</a></li>
<li><a href="#m2">사후지급금 폐지</a></li>
<li><a href="#m3">1년 6개월 조건</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="undefined">퇴직금 계산 방법과 평균임금<span>퇴직금</span></a>
<a class="ax-rel" href="/tax/four-major-insurance-guide/">4대보험 요율 2026<span>급여</span></a>
<a class="ax-rel" href="/law/annual-leave-allowance-guide/">연차수당 계산과 소멸<span>연차</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "육아휴직 급여는 월 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1~3개월은 통상임금 100%로 월 250만원까지, 4~6개월은 100%로 200만원까지, 7개월째부터는 80%로 160만원까지입니다. 모든 구간의 하한은 70만원입니다. 통상임금이 250만원 이상이면 12개월 합계가 2,310만원입니다. 고용보험법 시행령 제95조 제1항"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직 사후지급금은 아직 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "없습니다. 급여의 25%를 복직 6개월 뒤에 주던 근거 조항인 고용보험법 시행령 제95조 제4항이 2024년 12월 24일 개정으로 삭제됐습니다. 지금은 휴직 기간 중에 매달 전액을 받습니다. 고용보험법 시행령 제95조 제4항 삭제 (2024. 12. 24.)"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직을 1년 6개월 쓰려면 어떻게 해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "같은 자녀에 대해 부모가 각각 3개월 이상 육아휴직을 사용해야 합니다. 그 외에 한부모가족지원법상 한부모이거나 장애아동의 부모인 경우에도 6개월을 추가할 수 있습니다. 한쪽만 오래 쓰는 것으로는 조건을 채우지 못합니다. 남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조 제2항"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직 급여를 받으려면 얼마나 일해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "육아휴직을 시작한 날 이전에 고용보험 피보험 단위기간이 합산 180일 이상이어야 합니다. 한 회사에서 연속으로 채울 필요는 없고 여러 직장의 기간을 합산합니다. 또한 육아휴직을 30일 이상 부여받아야 합니다. 고용보험법 제70조 제1항"
      }
    },
    {
      "@type": "Question",
      "name": "통상임금이 500만원이면 급여도 더 많나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 상한이 걸리기 때문에 통상임금 250만원인 사람과 똑같이 2,310만원을 받습니다. 임금 대비 대체율로 보면 250만원인 사람은 77%, 500만원인 사람은 38.5%입니다. 고용보험법 시행령 제95조 제1항 (각 호 단서의 상한)"
      }
    },
    {
      "@type": "Question",
      "name": "급여 신청은 언제까지 해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "육아휴직을 시작한 날 이후 1개월이 지난 시점부터, 휴직이 끝난 날 이후 12개월 이내에 신청해야 합니다. 이 기간을 넘기면 받을 수 없습니다. 실무에서는 대부분 매달 신청해 매달 수령합니다. 고용보험법 제70조 제2항"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직 기간도 퇴직금에 들어가나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "들어갑니다. 남녀고용평등법 제19조 제4항이 육아휴직 기간을 근속기간에 포함한다고 정하고 있습니다. 다만 퇴직금의 기준이 되는 평균임금은 퇴직 직전 3개월로 산정하므로, 복직 후 3개월이 지난 뒤 퇴직하는 것이 일반적으로 유리합니다. 남녀고용평등법 제19조 제4항 · 근로자퇴직급여 보장법 제8조"
      }
    }
  ],
};
