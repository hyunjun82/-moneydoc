// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/article-v2-pension-national-guide.html
export const meta = {
  title: "국민연금 예상수령액표, 가입기간별로 한 달에 얼마 받나요",
  description: "국민연금 예상수령액은 비례상수 × (A값 + 내 평균소득)으로 계산하고, 2026년 이후 가입기간의 비례상수는 1.29예요. 2026년 산식으로 어림한 가입기간·소득별 월 수령액 표, 연도별 비례상수, 출생연도별 수령나이, 조기·연기 수령을 국민연금법 원문으로 정리했어요.",
  datePublished: "2026-09-29",
  dateModified: "2026-09-29",
  url: "https://moneydoc.kr/pension/pension-national-guide/",
  image: "https://moneydoc.kr/og/pension-national-guide.png",
  imageAlt: "국민연금 예상수령액, 평균소득 300만원으로 20년 가입하면 2026년 산식 어림값으로 월 665,800원",
};

export const scriptKey = "pension-national-guide";

export const html = `<h1>국민연금 예상수령액표, 가입기간별로 한 달에 얼마 받나요</h1>
<div class="v2-meta"><span>글 한결</span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>9분</span><span class="v2-badge">국민연금법 제51조·제63조 원문 대조 · 2026-09-29</span></div>
<img class="v2-hero" src="/og/pension-national-guide.png" width="1200" height="630" alt="국민연금 예상수령액, 평균소득 300만원으로 20년 가입하면 2026년 산식 어림값으로 월 665,800원">
<p class="v2-lead v2-intro">국민연금 예상수령액은 전체 가입자 평균소득(A값)과 내 가입기간 평균소득(B값)을 더해 계산해요. 여기에 비례상수를 곱하는데, 2026년 이후 가입기간은 1.29이고 그 전 기간은 해마다 달랐어요. 10년 이상 내야 노령연금을 받고, 1969년생부터는 65세에 받기 시작해요. 이 글의 금액은 모든 기간에 1.29를 적용한 어림값이라, 정확한 금액은 국민연금공단에서 확인해요.</p>
<section class="v2-answer" aria-label="즉답">
  <div class="v2-lbl">평균소득 300만원일 때 가입기간별 월 노령연금액 (2026년 산식 어림값)</div>
  <div class="v2-chips" id="qchips" data-q='[{&quot;big&quot;:&quot;332,900원&quot;,&quot;unit&quot;:&quot;월 노령연금액&quot;,&quot;sub&quot;:&quot;1년에 3,994,800원&quot;},{&quot;big&quot;:&quot;665,800원&quot;,&quot;unit&quot;:&quot;월 노령연금액&quot;,&quot;sub&quot;:&quot;1년에 7,989,600원&quot;},{&quot;big&quot;:&quot;998,700원&quot;,&quot;unit&quot;:&quot;월 노령연금액&quot;,&quot;sub&quot;:&quot;1년에 11,984,400원&quot;}]'><button type="button" data-i="0" aria-pressed="false">10년 가입</button><button type="button" data-i="1" aria-pressed="true">20년 가입</button><button type="button" data-i="2" aria-pressed="false">30년 가입</button></div>
  <div class="v2-big" id="qnet">665,800원<small>월 노령연금액</small></div>
  <div class="v2-sub" id="qsub">1년에 7,989,600원</div>
  <div class="v2-split">
    <div class="v2-box"><b>최소 조건</b><span>가입기간 10년 이상이어야 노령연금을 받아요. 10년 미만이면 반환일시금을 받아요</span></div>
    <div class="v2-box"><b>어림값인 이유</b><span>2008~2025년 가입분은 해마다 비례상수가 달라서, 실제 금액은 이 표와 조금 달라요</span></div>
  </div>
</section>
<!--CALC_START--><a class="v2-cta" href="/national-pension/">국민연금 예상수령액 계산기 바로가기</a><!--CALC_END-->
<details class="v2-toc"><summary>목차 (6개 질문)<span>열기</span></summary><ol><li><a href="#s1">국민연금 예상수령액은 어떻게 계산하나요</a></li><li><a href="#s2">가입기간과 소득별 국민연금 예상수령액은 얼마인가요</a></li><li><a href="#s3">국민연금 수령나이는 몇 년생부터 몇 세인가요</a></li><li><a href="#s4">국민연금을 일찍 받거나 늦게 받으면 얼마나 달라지나요</a></li><li><a href="#s5">국민연금 예상수령액 조회는 어디서 하나요</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></details>
<section class="v2-kk" aria-label="한눈에 보는 요약">
  <div class="v2-hd"><small>한눈에 보는 국민연금 예상수령액</small><b>핵심콕콕</b></div>
  <dl>
    <div class="v2-row"><dt>산식 (2026년 이후 가입분)</dt><dd>1.29 × (A + B), 20년을 넘는 1년마다 5% 가산</dd></div>
    <div class="v2-row"><dt>20년 미만</dt><dd>기본연금액의 50%에 10년을 넘는 1년마다 5%를 더해요</dd></div>
    <div class="v2-row"><dt>A값 (2026년)</dt><dd>3,193,511원 (2025년 3,089,062원보다 3.4% 올라요)</dd></div>
    <div class="v2-row"><dt>B값</dt><dd>내 연도별 기준소득월액을 재평가율로 올려 평균 낸 값</dd></div>
    <div class="v2-row"><dt>수령나이</dt><dd>1969년생부터 65세, 1965~68년생 64세, 1961~64년생 63세</dd></div>
    <div class="v2-row"><dt>조기 수령</dt><dd>수령나이 5년 전부터, 1년 당길 때마다 6%씩 줄어 최소 70%</dd></div>
    <div class="v2-row"><dt>연기 수령</dt><dd>최대 5년, 1개월 늦출 때마다 0.6%</dd></div>
    <div class="v2-row"><dt>소득대체율</dt><dd>2026년부터 43% (2025년 41.5%)</dd></div>
  </dl>
</section>

<h2 id="s1">국민연금 예상수령액은 어떻게 계산하나요<small>A값과 B값을 더해 비례상수를 곱해요</small></h2>
<p class="v2-lead"><span class="v2-ans">2026년 이후 가입분 기본연금액은 1.29 × (A값 + B값)이고, 20년을 넘으면 1년마다 5%를 더해요.</span> 이렇게 나온 1년 금액을 12로 나누면 한 달 금액이에요. A값은 전체 가입자 평균소득을 반영하는 균등부분이고, B값은 내 가입기간 평균소득을 반영하는 소득비례부분이에요.</p>
<div class="v2-tbl v2-text"><table><caption>국민연금 기본연금액 산식의 요소 (국민연금법 제51조)</caption><thead><tr><th>요소</th><th>뜻</th><th>2026년 값</th></tr></thead><tbody>
<tr><th scope="row">비례상수</th><td data-l="뜻">소득대체율에 맞춘 곱하는 수</td><td data-l="2026년 값">1.29 (소득대체율 43%)</td></tr>
<tr><th scope="row">A값</th><td data-l="뜻">연금 받기 직전 3년간 전체 가입자 평균소득월액의 평균</td><td data-l="2026년 값">3,193,511원</td></tr>
<tr><th scope="row">B값</th><td data-l="뜻">가입기간 중 기준소득월액을 연도별 재평가율로 현재가치로 바꾼 평균</td><td data-l="2026년 값">사람마다 달라요</td></tr>
<tr class="v2-hi"><th scope="row">20년 초과 가산</th><td data-l="뜻">20년을 넘는 1년마다 5% (1년 미만은 달 수로 나눠요)</td><td data-l="2026년 값">0.05 × 초과 연수</td></tr>
</tbody></table></div>
<p class="v2-fn">A값은 연금 수급 시점의 값을 써서, 같은 이력이라도 받기 시작하는 해에 따라 금액이 조금씩 달라요.</p>
<p><span class="v2-ans">가입기간이 20년보다 짧으면 기본연금액의 일부만 받아요.</span> 10년 이상 20년 미만이면 기본연금액의 50%에, 10년을 넘는 1년마다 5%를 더해요. 그래서 10년이면 절반, 15년이면 75%예요. 결국 가입기간 1년마다 20년 금액의 5%씩 늘어나는 구조예요.</p>
<div class="v2-tbl v2-text"><table><caption>가입연도별 비례상수 (국민연금법 부칙)</caption><thead><tr><th>가입연도</th><th>비례상수</th><th>1.29와 비교</th></tr></thead><tbody>
<tr><th scope="row">2008년</th><td data-l="비례상수">1.5</td><td data-l="1.29와 비교">더 높아요</td></tr>
<tr><th scope="row">2015년</th><td data-l="비례상수">1.395</td><td data-l="1.29와 비교">더 높아요</td></tr>
<tr><th scope="row">2021년</th><td data-l="비례상수">1.305</td><td data-l="1.29와 비교">더 높아요</td></tr>
<tr><th scope="row">2022년</th><td data-l="비례상수">1.29</td><td data-l="1.29와 비교">같아요</td></tr>
<tr><th scope="row">2025년</th><td data-l="비례상수">1.245</td><td data-l="1.29와 비교">더 낮아요</td></tr>
<tr class="v2-hi"><th scope="row">2026년 이후</th><td data-l="비례상수">1.29</td><td data-l="1.29와 비교">기준</td></tr>
</tbody></table></div>
<p class="v2-fn">2008년부터 2025년까지 해마다 1천분의 15씩 낮아졌어요. 2026년 1월 개정법 시행 전 가입기간의 기본연금액은 종전 규정으로 계산해요.</p>
<p><span class="v2-ans">그래서 이 글의 금액은 어림값이에요.</span> 이 글과 계산기는 모든 가입기간에 1.29를 곱해요. 2021년 이전 가입분이 많으면 실제 금액이 이 표보다 많을 수 있고, 2023~2025년 가입분은 실제로는 이 표보다 조금 적어요(1.275~1.245). 명목소득대체율은 도입 때 70%에서 1999년 60%, 2008년 50%로 낮아졌어요.</p>

<h2 id="s2">가입기간과 소득별 국민연금 예상수령액은 얼마인가요<small>모든 가입기간에 2026년 산식을 적용한 어림값이에요</small></h2>
<p class="v2-lead"><span class="v2-ans">가입기간이 길고 평균소득이 높을수록 많이 받아요. 가입기간은 1년마다 20년 금액의 5%씩 더해져요.</span> 평균소득 300만원으로 10년이면 332,900원이고, 40년이면 20년 금액의 두 배예요. 평균소득이 100만원 오를 때 늘어나는 폭은 A값이 함께 더해지는 만큼 소득보다 완만해요.</p>
<div class="v2-tbl"><table><caption>가입기간·평균소득(B값)별 월 노령연금액 (부양가족연금 제외, 2026년 산식 어림값)</caption><thead><tr><th>가입기간</th><th>평균소득 200만원</th><th>평균소득 300만원</th><th>평균소득 400만원</th></tr></thead><tbody>
<tr><th scope="row">10년</th><td>279,150</td><td class="v2-net">332,900</td><td>386,650</td></tr>
<tr class="v2-hi"><th scope="row">20년</th><td>558,300</td><td class="v2-net">665,800</td><td>773,300</td></tr>
<tr><th scope="row">30년</th><td>837,450</td><td class="v2-net">998,700</td><td>1,159,950</td></tr>
<tr><th scope="row">40년</th><td>1,116,600</td><td class="v2-net">1,331,600</td><td>1,546,600</td></tr>
</tbody></table></div>
<p class="v2-fn">단위: 원. A값 3,193,511원, 비례상수 1.29로 모든 기간을 계산하고 10원 미만은 버렸어요.</p>
<div class="v2-flow" aria-label="국민연금 예상수령액 계산 순서 (평균소득 300만원, 20년, 2026년 산식)">
  <div class="v2-s"><span>A값 + B값</span><b>6,193,511원</b><span>3,193,511원 + 300만원</span></div><div class="v2-op">× 1.29</div>
  <div class="v2-s"><span>1년 기본연금액</span><b>7,989,629원</b><span>20년이면 가산 없음</span></div><div class="v2-op">÷ 12</div>
  <div class="v2-s"><span>한 달 금액</span><b>665,802원</b><span>10원 미만을 버리면</span></div><div class="v2-op">→</div>
  <div class="v2-s v2-out"><span>월 노령연금액</span><b>665,800원</b><span>부양가족연금 제외</span></div>
</div>
<section class="v2-widget" aria-label="국민연금 예상수령액 계산">
  <h4>내 가입기간과 평균소득으로 보기</h4><p class="v2-note">이 글의 표와 같은 2026년 산식 어림값이에요. 정확한 금액은 국민연금공단에서 확인해요.</p>
  <div class="v2-grid">
    <div><label>가입기간 (개월)</label><input id="ny" type="number" inputmode="numeric" value="240" min="120" max="600" step="12"></div>
    <div><label>평균소득 B값 (만원)</label><input id="nb" type="number" inputmode="numeric" value="300" min="40" max="700" step="10"></div>
  </div>
  <div class="v2-result">
    <div class="v2-main"><span>월 노령연금액</span><b id="no1">—</b></div>
    <div><span>1년 노령연금액</span><b id="no2">—</b></div>
    <div><span>20년 대비 비율</span><b id="no3">—</b></div>
  </div>
</section>
<p><span class="v2-ans">보건복지부 예시로는 평균소득 309만원으로 40년 가입하면 월 132.9만원이에요.</span> 2026년부터 새로 가입해 40년을 채운다고 가정한 금액이에요. 개혁 전 법대로 소득대체율이 2028년 40%까지 내려갔다면 123.7만원이라 9.2만원 늘어난 셈이에요. 이 예시는 2025년 A값 309만원을 썼어요.</p>

<h2 id="s3">국민연금 수령나이는 몇 년생부터 몇 세인가요<small>1969년생부터 65세예요</small></h2>
<p class="v2-lead"><span class="v2-ans">1969년생부터는 65세에 받기 시작해요. 그 전 출생자는 4년 단위로 한 살씩 빨라요.</span> 가입기간 10년 이상이면 수령나이가 된 다음 달부터 평생 매달 받아요. 수령나이는 2013년부터 5년마다 한 살씩 늦춰지고 있어요.</p>
<div class="v2-tbl v2-text"><table><caption>출생연도별 국민연금 수령나이와 조기수령 가능 나이 (국민연금법 부칙, 보건복지부)</caption><thead><tr><th>출생연도</th><th>노령연금 수령나이</th><th>조기노령연금 가능 나이</th></tr></thead><tbody>
<tr><th scope="row">1953~1956년생</th><td data-l="노령연금 수령나이">61세</td><td data-l="조기노령연금 가능 나이">56세</td></tr>
<tr><th scope="row">1957~1960년생</th><td data-l="노령연금 수령나이">62세</td><td data-l="조기노령연금 가능 나이">57세</td></tr>
<tr><th scope="row">1961~1964년생</th><td data-l="노령연금 수령나이">63세</td><td data-l="조기노령연금 가능 나이">58세</td></tr>
<tr><th scope="row">1965~1968년생</th><td data-l="노령연금 수령나이">64세</td><td data-l="조기노령연금 가능 나이">59세</td></tr>
<tr class="v2-hi"><th scope="row">1969년생 이후</th><td data-l="노령연금 수령나이">65세</td><td data-l="조기노령연금 가능 나이">60세</td></tr>
</tbody></table></div>
<p class="v2-fn">조기노령연금은 가입기간 10년 이상이고 소득이 A값 이하일 때 청구할 수 있어요.</p>
<p><span class="v2-ans">가입기간이 10년이 안 되면 연금 대신 반환일시금을 청구해요.</span> 60세가 됐을 때 가입기간이 10년 미만이면 낸 보험료에 이자를 더해 한 번에 돌려받아요. 직장가입자는 회사가 낸 부담금도 포함해요. 이자는 3년 만기 정기예금 이자율로 계산해요. 국적을 잃거나 국외로 이주해도 대상이고, 사망했을 때는 유족연금이 나오지 않는 경우에만 유족이 청구해요.</p>
<div class="v2-note"><b>일찍 받을지 고민된다면</b> 조기수령으로 줄어드는 금액과 손익분기 나이는 따로 정리했어요. <a class="v2-go" href="/pension-early/guide/">국민연금 조기수령 보기</a></div>

<h2 id="s4">국민연금을 일찍 받거나 늦게 받으면 얼마나 달라지나요<small>당기면 1년에 6% 줄고, 미루면 1개월에 0.6% 늘어요</small></h2>
<p class="v2-lead"><span class="v2-ans">5년 일찍 받으면 70%만 받고, 1개월 늦출 때마다 0.6%를 더 받아요.</span> 조기노령연금은 수령나이 1년 전이면 94%, 5년 전이면 70%를 평생 받아요. 연기연금은 최대 5년까지 미룰 수 있고, 연금 전부가 아니라 일부만 미룰 수도 있어요. 조기노령연금은 소득이 있는 일을 하지 않을 때 청구할 수 있어요.</p>
<div class="v2-tbl"><table><caption>평균소득 300만원·30년 가입일 때 받는 시기별 월 연금 (2026년 산식 어림값)</caption><thead><tr><th>받는 시기</th><th>지급률</th><th>월 연금</th></tr></thead><tbody>
<tr><th scope="row">5년 일찍</th><td>70%</td><td class="v2-net">699,090</td></tr>
<tr><th scope="row">3년 일찍</th><td>82%</td><td class="v2-net">818,930</td></tr>
<tr><th scope="row">1년 일찍</th><td>94%</td><td class="v2-net">938,770</td></tr>
<tr class="v2-hi"><th scope="row">제때</th><td>100%</td><td class="v2-net">998,700</td></tr>
<tr><th scope="row">1년 늦게</th><td>0.6% × 12개월 더함</td><td class="v2-net">1,070,600</td></tr>
<tr><th scope="row">5년 늦게</th><td>0.6% × 60개월 더함</td><td class="v2-net">1,358,230</td></tr>
</tbody></table></div>
<p class="v2-fn">단위: 원. 조기 지급률은 5년 전 70%, 4년 전 76%, 3년 전 82%, 2년 전 88%, 1년 전 94%예요. 부양가족연금액은 빼고, 물가 조정은 넣지 않았어요.</p>
<p><span class="v2-ans">연금을 받으면서 소득이 많으면 줄어들 수 있어요.</span> 수령나이 뒤 5년 안에 소득이 있는 일을 하면 노령연금을 줄여서 줘요. 2026년 6월 17일 이후 수급자는 A값에 200만원을 더한 금액 이상인 소득월액부터 구간별로 줄여요. 2026년 A값으로는 약 519만원이에요.</p>
<p><span class="v2-ans">받기 시작한 뒤에는 물가만큼 해마다 올라요.</span> 연금을 받는 동안 매년 전국소비자물가변동률을 반영해 연금액을 조정해요. 그래서 물가가 올라도 연금의 실질가치가 유지돼요.</p>

<h2 id="s5">국민연금 예상수령액 조회는 어디서 하나요<small>공단 예상연금 모의계산은 인증 없이 쓸 수 있어요</small></h2>
<p class="v2-lead"><span class="v2-ans">국민연금공단 중앙노후준비지원센터의 예상연금 모의계산은 인증 없이 쓸 수 있어요.</span> 입력할 내용은 아래 순서와 같아요. 기간별 소득을 직접 넣는 방식이라, 내 가입내역을 옆에 두고 넣으면 정확해져요. 출산과 군복무 크레딧도 함께 넣으면 가입기간에 더해져요.</p>
<div class="v2-steps">
  <div><i>1단계</i><b>기본정보 입력</b><span>생년월일, 최초 가입년월, 최종 상실년월을 넣어요</span><em>1단계</em></div>
  <div><i>2단계</i><b>예상소득상승률</b><span>지금 금액으로 계속 낸다면 0%를 넣어요</span><em>2단계</em></div>
  <div><i>3단계</i><b>소득정보 입력</b><span>최초 가입부터 지금까지 기간별 월소득을 만원 단위로 넣어요</span><em>3단계</em></div>
  <div><i>4단계</i><b>크레딧 입력</b><span>출산 자녀 수와 2008년 이후 군복무 여부를 넣어요</span><em>4단계</em></div>
  <div><i>5단계</i><b>결과 보기</b><span>노령, 장애, 유족연금 예상액이 나와요</span><em>5단계</em></div>
</div>
<div class="v2-tbl v2-text"><table><caption>가입기간을 더해 주는 크레딧 (국민연금법 제18조·제19조)</caption><thead><tr><th>크레딧</th><th>종전</th><th>2026년 이후 복무 완료·첫째 출생부터</th></tr></thead><tbody>
<tr class="v2-hi"><th scope="row">출산 크레딧</th><td data-l="종전">둘째부터 12개월, 셋째부터 18개월, 최대 50개월</td><td data-l="2026년 이후 복무 완료·첫째 출생부터">첫째부터 12개월, 셋째부터 18개월, 상한 없음</td></tr>
<tr><th scope="row">군복무 크레딧</th><td data-l="종전">최대 6개월</td><td data-l="2026년 이후 복무 완료·첫째 출생부터">최대 12개월</td></tr>
</tbody></table></div>
<p class="v2-fn">새 기준은 2026년 이후 병역 복무를 마친 사람, 2026년 이후 첫째 자녀를 얻은 사람부터 적용해요. 군복무 크레딧 기간은 A값의 2분의 1, 출산 크레딧 기간은 A값을 소득으로 보고 B값을 계산해요.</p>
<p><span class="v2-ans">크레딧은 노령연금을 받을 때 가입기간에 더해져요.</span> 군복무 크레딧은 2008년 이후 입대해 6개월 이상 복무한 사람이, 출산 크레딧은 2008년 이후 자녀를 얻은 사람이 노령연금 수급권을 얻을 때 인정돼요. 보건복지부는 군복무 크레딧을 복무기간 전체로 늘리는 방안을 2027년 시행 목표로 추진한다고 밝혔어요.</p>

<h2 id="faq">자주 묻는 질문</h2>
<div class="v2-faqs">
<details class="v2-faq" open><summary><i>Q</i><span>국민연금 예상수령액표는 어디서 볼 수 있나요?</span></summary><div><i>A</i><p>이 글의 가입기간·소득별 표가 2026년 산식 어림값이에요. 내 기간별 소득을 넣은 금액은 국민연금공단 중앙노후준비지원센터 예상연금 모의계산에서 볼 수 있어요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>배우자나 자녀가 있으면 더 받나요?</span></summary><div><i>A</i><p>내가 부양하는 배우자, 19세 미만이거나 장애가 있는 자녀, 60세 이상이거나 장애가 있는 부모가 있으면 부양가족연금액을 더해요. 2026년 기준 배우자는 연 306,630원, 자녀·부모는 연 204,360원이에요. 그 가족이 스스로 연금 수급권자면 빠져요.</p></div></details>
</div>
<section class="v2-sum" aria-label="정리"><div class="v2-hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
<li>2026년 이후 가입분 기본연금액은 1.29 × (A값 + B값)이고, 그 전 가입분은 해마다 다른 비례상수를 써요.</li>
<li>가입기간 1년마다 20년 금액의 5%씩 늘어서, 10년이면 절반, 40년이면 두 배예요.</li>
<li>1969년생부터 65세에 받고, 5년 일찍 받으면 70%, 늦추면 1개월에 0.6%를 더해요.</li>
<li>이 글의 금액은 모든 기간에 1.29를 쓴 어림값이라, 공단 모의계산에 내 기간별 소득을 넣어 확인해요.</li>
</ul></section>
<a class="v2-cta" href="/national-pension/">국민연금 예상수령액 계산기 바로가기</a>
<h2 id="src">출처</h2>
<div class="v2-src">
<b>법령</b>국민연금법 제51조(기본연금액: 1천분의 1천290, 20년 초과 1년마다 1천분의 50), 제52조(부양가족연금액), 제61조(노령연금, 조기노령연금), 제62조(연기 1개월마다 1천분의 6), 제63조(가입기간 10~20년 노령연금액, 조기 지급률), 제77조(반환일시금), 제18조·제19조(크레딧). 부칙(2008~2025년 비례상수, 출생연도별 지급 연령, 법률 제20903호 적용례). 국민연금법 시행령.
<b>정부 발표</b>보건복지부 보도자료 「국민연금, 새해 재정은 보다 튼튼하게 노후는 더욱 든든하게 보장합니다」(2025.12.29), 「보험료율 13%, 소득대체율 43% 등 담은 연금개혁법안 국회 본회의 통과」(2025.3.20). 보건복지부 국민연금 급여 안내(산식, 수령나이, 조기 지급률, 소득활동 감액 약 519만원, 크레딧).
<b>정부 안내</b>국민연금공단 「2026년도 국민연금 재평가율 및 연금액 조정」 행정예고(A값 3,193,511원), 연금급여 안내(물가 반영), 중앙노후준비지원센터 예상연금 모의계산.
<b>계산</b>월 수령액은 국민연금 예상수령액 계산기 산식(1.29 × (A + B) × 가입기간 비율 ÷ 12, 10원 미만 절사)으로 계산했어요. 모든 가입기간에 1.29를 적용한 어림값이에요 (2026-09-29).
</div>
<div class="v2-rel"><a href="/national-pension/"><b>계산기</b>국민연금 예상수령액 계산기</a><a href="/pension-early/guide/"><b>연금 가이드</b>국민연금 조기수령</a><a href="/irp/guide/"><b>연금 가이드</b>IRP 세액공제 한도</a></div>
<div id="md-inter" role="dialog" aria-modal="true" aria-label="외부 사이트로 이동">
  <div class="v2-box"><div class="v2-t">공식 페이지로 이동해요</div><div class="v2-d" id="md-inter-d">새 창에서 열려요</div>
    <div class="v2-slot" id="md-ad-slot" data-ad="interstitial"></div>
    <button class="v2-btn" id="md-inter-go">바로 이동</button></div>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "국민연금 예상수령액표는 어디서 볼 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이 글의 가입기간·소득별 표가 2026년 산식 어림값이에요. 내 기간별 소득을 넣은 금액은 국민연금공단 중앙노후준비지원센터 예상연금 모의계산에서 볼 수 있어요."
      }
    },
    {
      "@type": "Question",
      "name": "배우자나 자녀가 있으면 더 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "내가 부양하는 배우자, 19세 미만이거나 장애가 있는 자녀, 60세 이상이거나 장애가 있는 부모가 있으면 부양가족연금액을 더해요. 2026년 기준 배우자는 연 306,630원, 자녀·부모는 연 204,360원이에요. 그 가족이 스스로 연금 수급권자면 빠져요."
      }
    }
  ]
};

export const landing = {
  "hero": {
    "tag": "연금",
    "line1": "국민연금 예상수령액",
    "line2": "가입기간별로",
    "sub1": "2026년 산식 1.29 × (A값 + 내 평균소득)",
    "sub2": "2026년 A값 3,193,511원",
    "foot": "국민연금법 제51조 · 2026-09-29 검증",
    "card": {
      "label": "평균소득 300만원 · 20년 가입",
      "big": "665,800",
      "unit": "원",
      "l1": "한 달 노령연금액",
      "l2": "2026년 산식 어림값"
    },
    "alt": "국민연금 예상수령액, 평균소득 300만원으로 20년 가입하면 2026년 산식 어림값으로 월 665,800원"
  },
  "calc": {
    "href": "/national-pension/",
    "label": "국민연금 예상수령액 계산기 바로가기"
  },
  "badge": "국민연금법 제51조·제63조 원문 대조 · 2026-09-29",
  "basis": "2026년 9월 기준",
  "readMinutes": 9,
  "quick": [
    {
      "chip": "10년 가입",
      "big": "332,900원",
      "unit": "월 노령연금액",
      "sub": "1년에 3,994,800원",
      "selected": false
    },
    {
      "chip": "20년 가입",
      "big": "665,800원",
      "unit": "월 노령연금액",
      "sub": "1년에 7,989,600원",
      "selected": true
    },
    {
      "chip": "30년 가입",
      "big": "998,700원",
      "unit": "월 노령연금액",
      "sub": "1년에 11,984,400원",
      "selected": false
    }
  ],
  "boxes": [
    {
      "title": "최소 조건",
      "text": "가입기간 10년 이상이어야 노령연금을 받아요. 10년 미만이면 반환일시금을 받아요"
    },
    {
      "title": "어림값인 이유",
      "text": "2008~2025년 가입분은 해마다 비례상수가 달라서, 실제 금액은 이 표와 조금 달라요"
    }
  ],
  "keyPoints": {
    "title": "한눈에 보는 국민연금 예상수령액",
    "rows": [
      [
        "산식 (2026년 이후 가입분)",
        "1.29 × (A + B), 20년을 넘는 1년마다 5% 가산"
      ],
      [
        "20년 미만",
        "기본연금액의 50%에 10년을 넘는 1년마다 5%를 더해요"
      ],
      [
        "A값 (2026년)",
        "3,193,511원 (2025년 3,089,062원보다 3.4% 올라요)"
      ],
      [
        "B값",
        "내 연도별 기준소득월액을 재평가율로 올려 평균 낸 값"
      ],
      [
        "수령나이",
        "1969년생부터 65세, 1965~68년생 64세, 1961~64년생 63세"
      ],
      [
        "조기 수령",
        "수령나이 5년 전부터, 1년 당길 때마다 6%씩 줄어 최소 70%"
      ],
      [
        "연기 수령",
        "최대 5년, 1개월 늦출 때마다 0.6%"
      ],
      [
        "소득대체율",
        "2026년부터 43% (2025년 41.5%)"
      ]
    ]
  },
  "sections": [
    {
      "id": "s1",
      "h2": "국민연금 예상수령액은 어떻게 계산하나요",
      "sub": "A값과 B값을 더해 비례상수를 곱해요"
    },
    {
      "id": "s2",
      "h2": "가입기간과 소득별 국민연금 예상수령액은 얼마인가요",
      "sub": "모든 가입기간에 2026년 산식을 적용한 어림값이에요"
    },
    {
      "id": "s3",
      "h2": "국민연금 수령나이는 몇 년생부터 몇 세인가요",
      "sub": "1969년생부터 65세예요"
    },
    {
      "id": "s4",
      "h2": "국민연금을 일찍 받거나 늦게 받으면 얼마나 달라지나요",
      "sub": "당기면 1년에 6% 줄고, 미루면 1개월에 0.6% 늘어요"
    },
    {
      "id": "s5",
      "h2": "국민연금 예상수령액 조회는 어디서 하나요",
      "sub": "공단 예상연금 모의계산은 인증 없이 쓸 수 있어요"
    }
  ],
  "faq": [
    {
      "q": "국민연금 예상수령액표는 어디서 볼 수 있나요?",
      "a": "이 글의 가입기간·소득별 표가 2026년 산식 어림값이에요. 내 기간별 소득을 넣은 금액은 국민연금공단 중앙노후준비지원센터 예상연금 모의계산에서 볼 수 있어요."
    },
    {
      "q": "배우자나 자녀가 있으면 더 받나요?",
      "a": "내가 부양하는 배우자, 19세 미만이거나 장애가 있는 자녀, 60세 이상이거나 장애가 있는 부모가 있으면 부양가족연금액을 더해요. 2026년 기준 배우자는 연 306,630원, 자녀·부모는 연 204,360원이에요. 그 가족이 스스로 연금 수급권자면 빠져요."
    }
  ],
  "related": [
    {
      "kind": "계산기",
      "label": "국민연금 예상수령액 계산기",
      "href": "/national-pension/"
    },
    {
      "kind": "연금 가이드",
      "label": "국민연금 조기수령",
      "href": "/pension-early/guide/"
    },
    {
      "kind": "연금 가이드",
      "label": "IRP 세액공제 한도",
      "href": "/irp/guide/"
    }
  ]
};
