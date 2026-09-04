// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/article-v2-unemployment-total-guide.html
export const meta = {
  title: "실업급여 총 수령액 계산, 한 달에 얼마씩 몇 달 받나요",
  description: "실업급여 총액은 하루 지급액에 소정급여일수를 곱한 금액이에요. 월 300만원에 가입 3년이면 180일 동안 모두 11,888,640원이에요. 조건별 총액을 표로 정리했어요.",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  url: "https://moneydoc.kr/government/unemployment-total-guide/",
  image: "https://moneydoc.kr/og/unemployment-total-guide.png",
  imageAlt: "실업급여 총 수령액 계산. 월 300만원 가입 3년이면 11,888,640원",
};

export const scriptKey = "unemployment-total-guide";

export const html = `<h1>실업급여 총 수령액 계산, 한 달에 얼마씩 몇 달 받나요</h1>
<div class="v2-meta"><span>MoneyDoc 편집팀</span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>6분</span><span class="v2-badge">고용보험법 급여 산정 원문 대조 · 2026-09-02</span></div>
<img class="v2-hero" src="/og/unemployment-total-guide.png" width="1200" height="630" alt="실업급여 총 수령액 계산. 월 300만원 가입 3년이면 11,888,640원">
<p class="v2-lead v2-intro">실업급여를 얼마나 받을지 계획을 세우려면 총액을 알아야 해요. 총액은 간단해요. 하루 지급액에 소정급여일수를 곱하면 끝이에요. 그런데 하루 지급액은 상한과 하한에 막혀 있어서 사람마다 크게 다르지 않고, 총액을 가르는 건 사실상 소정급여일수예요. 조건별로 얼마가 되는지 표로 정리했어요.</p>
<section class="v2-answer" aria-label="즉답">
  <div class="v2-lbl">내 조건을 눌러 확인해 보세요</div>
  <div class="v2-chips" id="qchips" data-q='[{&quot;big&quot;:&quot;9,907,200&quot;,&quot;unit&quot;:&quot;총 수령액&quot;,&quot;sub&quot;:&quot;150일 동안 받아요&quot;},{&quot;big&quot;:&quot;11,888,640&quot;,&quot;unit&quot;:&quot;총 수령액&quot;,&quot;sub&quot;:&quot;180일 동안 받아요&quot;},{&quot;big&quot;:&quot;15,851,520&quot;,&quot;unit&quot;:&quot;총 수령액&quot;,&quot;sub&quot;:&quot;240일 동안 받아요&quot;}]'><button type="button" data-i="0" aria-pressed="true">월 300만원 · 1년</button><button type="button" data-i="1" aria-pressed="false">월 300만원 · 3년</button><button type="button" data-i="2" aria-pressed="false">월 300만원 · 12년</button></div>
  <div class="v2-big" id="qnet">9,907,200<small>총 수령액</small></div>
  <div class="v2-sub" id="qsub">150일 동안 받아요</div>
  <div class="v2-split">
    <div class="v2-box"><b>총액 = 하루 금액 × 일수</b><span>두 숫자만 알면 계산이 끝나요</span></div>
    <div class="v2-box"><b>총액을 가르는 건 일수예요</b><span>하루 금액은 상한과 하한에 막혀 사람마다 비슷해요</span></div>
  </div>
</section>
<!--CALC_START--><a class="v2-cta" href="/unemployment/calculator/">내 총 수령액 계산해 보기</a><!--CALC_END-->
<details class="v2-toc"><summary>목차 (6개 질문)<span>열기</span></summary><ol><li><a href="#s1">총 수령액은 어떻게 계산하나요</a></li><li><a href="#s2">실업급여 한달 얼마씩 들어오나요</a></li><li><a href="#s3">실업급여 몇달 동안 받을 수 있나요</a></li><li><a href="#s4">첫 회차는 왜 적게 들어오나요</a></li><li><a href="#s5">내 총 수령액은 어디서 확인하나요</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></details>
<section class="v2-kk" aria-label="한눈에 보는 요약">
  <div class="v2-hd"><small>한눈에 보는 총 수령액</small><b>핵심콕콕</b></div>
  <dl>
    <div class="v2-row"><dt>계산식</dt><dd>구직급여일액 × 소정급여일수</dd></div>
    <div class="v2-row"><dt>하루 금액을 정하는 것</dt><dd>이직 전 평균임금</dd></div>
    <div class="v2-row"><dt>일수를 정하는 것</dt><dd>고용보험 가입기간과 나이</dd></div>
    <div class="v2-row"><dt>월 300만원 가입 3년</dt><dd>11,888,640원 (180일)</dd></div>
    <div class="v2-row"><dt>50세 이상 가산</dt><dd>같은 조건에서 1,981,440원 더 받아요</dd></div>
    <div class="v2-row"><dt>받는 방식</dt><dd>한 번에 주지 않고 실업인정 회차마다 나눠서 지급해요</dd></div>
  </dl>
</section>

<h2 id="s1">총 수령액은 어떻게 계산하나요<small>하루 금액에 일수를 곱해요</small></h2>
<p class="v2-lead"><span class="v2-ans">구직급여일액에 소정급여일수를 곱하면 총액이에요.</span> 하루 금액은 기초일액의 60퍼센트이고 상한과 하한에 막혀요. 일수는 고용보험 가입기간과 나이로 정해져요. 월 300만원에 가입 3년이면 하루 66,048원에 180일이라 모두 11,888,640원이에요.</p>
<p><span class="v2-ans">한 번에 주지는 않아요.</span> 실업인정을 받은 일수분씩 나눠서 지급해요. 첫 회차는 대기기간 7일이 빠져 약 462,336원이고, 인정일 간격이 28일인 회차는 약 1,849,344원이에요.</p>
<div class="v2-tbl"><table><caption>조건별 실업급여 총 수령액</caption><thead><tr><th>월 평균임금</th><th>가입기간</th><th>하루 지급액</th><th>소정급여일수</th><th>총 수령액</th></tr></thead><tbody>
<tr><th scope="row">200만원</th><td>1년</td><td class="v2-net">66,048원</td><td>150일</td><td>9,907,200원</td></tr>
<tr><th scope="row">200만원</th><td>5년</td><td class="v2-net">66,048원</td><td>210일</td><td>13,870,080원</td></tr>
<tr><th scope="row">300만원</th><td>1년</td><td class="v2-net">66,048원</td><td>150일</td><td>9,907,200원</td></tr>
<tr class="v2-hi"><th scope="row">300만원</th><td>3년</td><td class="v2-net">66,048원</td><td>180일</td><td>11,888,640원</td></tr>
<tr><th scope="row">300만원</th><td>7년</td><td class="v2-net">66,048원</td><td>210일</td><td>13,870,080원</td></tr>
<tr><th scope="row">300만원</th><td>12년</td><td class="v2-net">66,048원</td><td>240일</td><td>15,851,520원</td></tr>
<tr><th scope="row">400만원</th><td>7년</td><td class="v2-net">68,100원</td><td>210일</td><td>14,301,000원</td></tr>
<tr><th scope="row">400만원</th><td>12년</td><td class="v2-net">68,100원</td><td>240일</td><td>16,344,000원</td></tr>
</tbody></table></div>
<p class="v2-fn">구직급여일액은 기초일액의 100분의 60이고 상한과 하한이 있어요. 소정급여일수는 피보험기간과 연령에 따라 정해져요. 50세 미만 기준이에요.</p>

<h2 id="s2">실업급여 한달 얼마씩 들어오나요<small>회차마다 인정된 일수만큼이에요</small></h2>
<p class="v2-lead"><span class="v2-ans">고정된 월급처럼 나오지 않고, 실업인정 회차마다 그 기간에 인정된 일수분이 들어와요.</span> 1차 인정일은 신고일부터 14일이 되는 날이고 대기기간 7일이 빠져 7일치예요. 2차와 3차는 28일 간격이라 28일치가 나와요. 4차부터는 간격이 7일에서 28일 사이에서 정해져서 회차마다 금액이 달라져요.</p>
<p><span class="v2-ans">그래서 매달 같은 금액을 기대하면 어긋나요.</span> 월 300만원인 사람이 28일치를 받으면 약 1,849,344원인데, 간격이 짧게 잡힌 회차에는 그보다 적게 들어와요. 총액이 줄어드는 게 아니라 나눠지는 방식이 다를 뿐이에요.</p>
<div class="v2-note"><b>세금은 떼지 않아요</b> 실업급여는 근로소득이 아니라 소득세를 원천징수하지 않아요. 통장에 찍히는 금액이 그대로예요. 언제 들어오는지는 따로 정리했어요. <a class="v2-go" href="/unemployment/payday/">지급일 언제 들어오나</a></div>

<h2 id="s3">실업급여 몇달 동안 받을 수 있나요<small>소정급여일수를 달로 환산해요</small></h2>
<p class="v2-lead"><span class="v2-ans">소정급여일수를 30으로 나누면 대략적인 개월 수가 나와요. 180일이면 약 6개월이에요.</span> 가입기간이 1년 미만이면 가장 짧고, 10년 이상이면 가장 길어요. 나이가 50세 이상이거나 장애인이면 구간마다 가산이 붙어요.</p>
<p><span class="v2-ans">일수는 나이와 가입기간으로 정해져요.</span> 1년 미만이면 120일, 10년 이상이면 240일이고 50세 이상이거나 장애인이면 구간마다 30일씩 더 받아요. <a class="v2-go" href="/unemployment/days/">소정급여일수 표</a></p>
<p><span class="v2-ans">다만 12개월 안에 다 써야 해요.</span> 이직일 다음 날부터 12개월이 지나면 일수가 남아 있어도 지급이 끝나요. 소정급여일수가 긴 사람이 늦게 신청하면 다 못 쓰고 끝날 수 있어요.</p>
<div class="v2-tbl v2-text"><table><caption>조건별로 몇 달인가요</caption><thead><tr><th>월 평균임금</th><th>가입기간</th><th>소정급여일수</th><th>30일 기준 개월</th></tr></thead><tbody>
<tr><th scope="row">200만원</th><td data-l="가입기간">1년</td><td data-l="소정급여일수">150일</td><td data-l="30일 기준 개월">약 5개월</td></tr>
<tr><th scope="row">200만원</th><td data-l="가입기간">5년</td><td data-l="소정급여일수">210일</td><td data-l="30일 기준 개월">약 7개월</td></tr>
<tr><th scope="row">300만원</th><td data-l="가입기간">1년</td><td data-l="소정급여일수">150일</td><td data-l="30일 기준 개월">약 5개월</td></tr>
<tr><th scope="row">300만원</th><td data-l="가입기간">3년</td><td data-l="소정급여일수">180일</td><td data-l="30일 기준 개월">약 6개월</td></tr>
<tr><th scope="row">300만원</th><td data-l="가입기간">7년</td><td data-l="소정급여일수">210일</td><td data-l="30일 기준 개월">약 7개월</td></tr>
<tr class="v2-hi"><th scope="row">300만원</th><td data-l="가입기간">12년</td><td data-l="소정급여일수">240일</td><td data-l="30일 기준 개월">약 8개월</td></tr>
<tr><th scope="row">400만원</th><td data-l="가입기간">7년</td><td data-l="소정급여일수">210일</td><td data-l="30일 기준 개월">약 7개월</td></tr>
<tr class="v2-hi"><th scope="row">400만원</th><td data-l="가입기간">12년</td><td data-l="소정급여일수">240일</td><td data-l="30일 기준 개월">약 8개월</td></tr>
</tbody></table></div>
<p class="v2-fn">개월 수는 30일로 나눈 어림값이에요. 실제로는 인정일 간격에 따라 달라져요.</p>

<h2 id="s4">첫 회차는 왜 적게 들어오나요<small>대기기간 7일이 빠져요</small></h2>
<p class="v2-lead"><span class="v2-ans">1차 인정일이 신고일부터 14일째인데 앞의 7일이 대기기간이라 7일치만 인정돼요.</span> 그래서 첫 회차는 약 462,336원이에요. 계산이 틀린 게 아니라 이 구조 때문이에요. 2차부터는 인정되는 날수가 늘어서 금액도 커져요.</p>
<p><span class="v2-ans">중간에 일한 날이 있으면 그만큼 빠져요.</span> 취업한 날은 실업으로 인정되지 않아 그 날치가 빠진 금액이 들어와요. 예상보다 적다면 신고한 일수를 먼저 확인해 보세요.</p>
<div class="v2-note"><b>건설일용근로자는 첫 회차가 달라요</b> 대기기간이 없어서 14일치가 그대로 인정돼요. 같은 날 신고해도 첫 입금액이 달라지는 이유예요.</div>

<h2 id="s5">내 총 수령액은 어디서 확인하나요<small>수급자격증과 고용보험 홈페이지</small></h2>
<p class="v2-lead"><span class="v2-ans">수급자격을 인정받으면 하루 지급액과 소정급여일수가 정해져 통지돼요. 둘을 곱하면 총액이에요.</span> 고용보험 홈페이지에서 회차별 지급 내역과 남은 일수도 볼 수 있어요. 실제로 받은 금액과 남은 금액을 함께 확인할 수 있어요.</p>
<p><span class="v2-ans">50세 이상이거나 장애인이면 더 받아요.</span> 가입기간이 같아도 소정급여일수에 가산이 붙어요. 월 300만원에 가입 3년인 사람이라면 1,981,440원을 더 받게 돼요. 1년 미만 구간에는 가산이 붙지 않아요.</p>
<div class="v2-tbl v2-text"><table><caption>총액과 관련해 확인할 것</caption><thead><tr><th>확인할 것</th><th>어디서 보나요</th></tr></thead><tbody>
<tr><th scope="row">하루 지급액</th><td data-l="어디서 보나요">수급자격 인정 통지와 수급자격증</td></tr>
<tr><th scope="row">소정급여일수</th><td data-l="어디서 보나요">수급자격증에 적혀 있어요</td></tr>
<tr><th scope="row">지금까지 받은 금액</th><td data-l="어디서 보나요">고용보험 홈페이지 지급 내역<a class="v2-go" href="https://www.ei.go.kr" target="_blank" rel="noopener">고용보험 홈페이지</a></td></tr>
<tr><th scope="row">남은 일수</th><td data-l="어디서 보나요">회차마다 확인할 수 있어요</td></tr>
<tr><th scope="row">수급기간 종료일</th><td data-l="어디서 보나요">이직일 다음 날부터 12개월이 되는 날</td></tr>
</tbody></table></div>
<p class="v2-fn">평균임금이나 가입기간이 잘못 신고되면 총액이 달라져요. 이직확인서를 먼저 확인하세요.</p>

<h2 id="faq">자주 묻는 질문</h2>
<div class="v2-faqs">
<details class="v2-faq" open><summary><i>Q</i><span>실업급여 총 수령액은 어떻게 계산하나요?</span></summary><div><i>A</i><p>하루 지급액에 소정급여일수를 곱해요. 월 300만원에 가입 3년이면 66,048원 × 180일로 11,888,640원이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 한 달에 얼마 받나요?</span></summary><div><i>A</i><p>고정 금액이 아니에요. 인정일 간격이 28일인 회차면 약 1,849,344원이고, 첫 회차는 대기기간이 빠져 약 462,336원이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 몇 달 받나요?</span></summary><div><i>A</i><p>소정급여일수를 30으로 나눈 값이에요. 180일이면 약 6개월이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 최대 금액은 얼마인가요?</span></summary><div><i>A</i><p>가입 10년 이상에 50세 이상이면 270일로 가장 길어요. 월 500만원이면 하루 68,100원에 270일이라 18,387,000원이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 4개월이면 얼마인가요?</span></summary><div><i>A</i><p>4개월은 약 120일이에요. 가입 1년 미만이면 소정급여일수가 120일이라 월 300만원 기준 7,925,760원이에요. 가입 1년을 넘으면 150일이 되어 9,907,200원이 돼요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 전체 얼마를 받는지 어떻게 아나요?</span></summary><div><i>A</i><p>수급자격증에 적힌 하루 지급액과 소정급여일수를 곱하면 전체 금액이 나와요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>월급이 많으면 총액도 많나요?</span></summary><div><i>A</i><p>하루 금액이 상한과 하한에 막혀 있어서 크게 차이 나지 않아요. 총액을 가르는 건 소정급여일수예요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>50세 이상이면 얼마나 더 받나요?</span></summary><div><i>A</i><p>구간마다 소정급여일수가 늘어나요. 월 300만원에 가입 3년이면 1,981,440원을 더 받아요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>총액을 다 못 받는 경우도 있나요?</span></summary><div><i>A</i><p>이직일 다음 날부터 12개월이 지나면 일수가 남아도 끝나요. 늦게 신청할수록 위험해요.</p></div></details>
</div>
<section class="v2-sum" aria-label="정리"><div class="v2-hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
<li>총액은 구직급여일액에 소정급여일수를 곱한 금액이에요.</li>
<li>월 300만원에 가입 3년이면 180일 동안 11,888,640원이에요.</li>
<li>한 번에 주지 않고 실업인정 회차마다 인정된 일수분씩 지급해요.</li>
<li>12개월 안에 다 써야 하니 늦게 신청하면 총액을 못 채울 수 있어요.</li>
</ul></section>
<a class="v2-cta" href="/unemployment/calculator/">내 총 수령액 계산해 보기</a>
<h2 id="src">출처</h2>
<div class="v2-src">
<b>법령</b>고용보험법 제46조(구직급여일액), 제48조(수급기간 및 수급일수), 제49조(대기기간), 제50조(소정급여일수), 제56조(지급일 및 지급 방법).
<b>정부 도구</b>고용24 실업급여 모의계산 결과와 조건별 총액을 대조했어요 (2026-09-02 확인).
</div>
<div class="v2-rel"><a href="/unemployment/"><b>주제 홈</b>2026년 실업급여 얼마나 받나요</a><a href="/unemployment/calculator/"><b>계산기</b>실업급여 계산기</a><a href="/unemployment/days/"><b>다음 질문</b>실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나</a><a href="/unemployment/payday/"><b>다음 질문</b>실업급여 지급일 언제 들어오나요, 회차별 입금 날짜</a></div>
<div id="md-inter" role="dialog" aria-modal="true" aria-label="외부 사이트로 이동">
  <div class="v2-box"><div class="v2-t">공식 페이지로 이동해요</div><div class="v2-d" id="md-inter-d">새 창에서 열려요</div>
    <div class="v2-slot" id="md-ad-slot" data-ad="interstitial">광고 영역 (오퍼월·전면광고 SDK 슬롯)</div>
    <button class="v2-btn" id="md-inter-go">바로 이동</button></div>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "실업급여 총 수령액은 어떻게 계산하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하루 지급액에 소정급여일수를 곱해요. 월 300만원에 가입 3년이면 66,048원 × 180일로 11,888,640원이에요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 한 달에 얼마 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고정 금액이 아니에요. 인정일 간격이 28일인 회차면 약 1,849,344원이고, 첫 회차는 대기기간이 빠져 약 462,336원이에요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 몇 달 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "소정급여일수를 30으로 나눈 값이에요. 180일이면 약 6개월이에요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 최대 금액은 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "가입 10년 이상에 50세 이상이면 270일로 가장 길어요. 월 500만원이면 하루 68,100원에 270일이라 18,387,000원이에요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 4개월이면 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4개월은 약 120일이에요. 가입 1년 미만이면 소정급여일수가 120일이라 월 300만원 기준 7,925,760원이에요. 가입 1년을 넘으면 150일이 되어 9,907,200원이 돼요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 전체 얼마를 받는지 어떻게 아나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "수급자격증에 적힌 하루 지급액과 소정급여일수를 곱하면 전체 금액이 나와요."
      }
    },
    {
      "@type": "Question",
      "name": "월급이 많으면 총액도 많나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하루 금액이 상한과 하한에 막혀 있어서 크게 차이 나지 않아요. 총액을 가르는 건 소정급여일수예요."
      }
    },
    {
      "@type": "Question",
      "name": "50세 이상이면 얼마나 더 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "구간마다 소정급여일수가 늘어나요. 월 300만원에 가입 3년이면 1,981,440원을 더 받아요."
      }
    },
    {
      "@type": "Question",
      "name": "총액을 다 못 받는 경우도 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이직일 다음 날부터 12개월이 지나면 일수가 남아도 끝나요. 늦게 신청할수록 위험해요."
      }
    }
  ]
};

export const landing = {
  "hero": {
    "tag": "정부지원금",
    "line1": "실업급여 총 수령액",
    "line2": "다 합치면 얼마인가요",
    "sub1": "월 300만원에 가입 3년이면 모두 11,888,640원이에요",
    "sub2": "180일을 회차로 나눠서 받아요",
    "foot": "고용보험법 급여 산정 원문 대조 · 2026-09-02 검증",
    "card": {
      "label": "월 300만원 가입 3년",
      "big": "11,888,640",
      "unit": "원",
      "l1": "하루 66,048원 × 180일",
      "l2": "한 달 30일로 치면 약 6개월"
    },
    "alt": "실업급여 총 수령액 계산. 월 300만원 가입 3년이면 11,888,640원"
  },
  "calc": {
    "href": "/unemployment/calculator/",
    "label": "내 총 수령액 계산해 보기"
  },
  "badge": "고용보험법 급여 산정 원문 대조 · 2026-09-02",
  "basis": "2026년 9월 기준",
  "readMinutes": 6,
  "quick": [
    {
      "chip": "월 300만원 · 1년",
      "big": "9,907,200",
      "unit": "총 수령액",
      "sub": "150일 동안 받아요",
      "selected": true
    },
    {
      "chip": "월 300만원 · 3년",
      "big": "11,888,640",
      "unit": "총 수령액",
      "sub": "180일 동안 받아요",
      "selected": false
    },
    {
      "chip": "월 300만원 · 12년",
      "big": "15,851,520",
      "unit": "총 수령액",
      "sub": "240일 동안 받아요",
      "selected": false
    }
  ],
  "boxes": [
    {
      "title": "총액 = 하루 금액 × 일수",
      "text": "두 숫자만 알면 계산이 끝나요"
    },
    {
      "title": "총액을 가르는 건 일수예요",
      "text": "하루 금액은 상한과 하한에 막혀 사람마다 비슷해요"
    }
  ],
  "keyPoints": {
    "title": "한눈에 보는 총 수령액",
    "rows": [
      [
        "계산식",
        "구직급여일액 × 소정급여일수"
      ],
      [
        "하루 금액을 정하는 것",
        "이직 전 평균임금"
      ],
      [
        "일수를 정하는 것",
        "고용보험 가입기간과 나이"
      ],
      [
        "월 300만원 가입 3년",
        "11,888,640원 (180일)"
      ],
      [
        "50세 이상 가산",
        "같은 조건에서 1,981,440원 더 받아요"
      ],
      [
        "받는 방식",
        "한 번에 주지 않고 실업인정 회차마다 나눠서 지급해요"
      ]
    ]
  },
  "sections": [
    {
      "id": "s1",
      "h2": "총 수령액은 어떻게 계산하나요",
      "sub": "하루 금액에 일수를 곱해요"
    },
    {
      "id": "s2",
      "h2": "실업급여 한달 얼마씩 들어오나요",
      "sub": "회차마다 인정된 일수만큼이에요"
    },
    {
      "id": "s3",
      "h2": "실업급여 몇달 동안 받을 수 있나요",
      "sub": "소정급여일수를 달로 환산해요"
    },
    {
      "id": "s4",
      "h2": "첫 회차는 왜 적게 들어오나요",
      "sub": "대기기간 7일이 빠져요"
    },
    {
      "id": "s5",
      "h2": "내 총 수령액은 어디서 확인하나요",
      "sub": "수급자격증과 고용보험 홈페이지"
    }
  ],
  "faq": [
    {
      "q": "실업급여 총 수령액은 어떻게 계산하나요?",
      "a": "하루 지급액에 소정급여일수를 곱해요. 월 300만원에 가입 3년이면 66,048원 × 180일로 11,888,640원이에요."
    },
    {
      "q": "실업급여 한 달에 얼마 받나요?",
      "a": "고정 금액이 아니에요. 인정일 간격이 28일인 회차면 약 1,849,344원이고, 첫 회차는 대기기간이 빠져 약 462,336원이에요."
    },
    {
      "q": "실업급여 몇 달 받나요?",
      "a": "소정급여일수를 30으로 나눈 값이에요. 180일이면 약 6개월이에요."
    },
    {
      "q": "실업급여 최대 금액은 얼마인가요?",
      "a": "가입 10년 이상에 50세 이상이면 270일로 가장 길어요. 월 500만원이면 하루 68,100원에 270일이라 18,387,000원이에요."
    },
    {
      "q": "실업급여 4개월이면 얼마인가요?",
      "a": "4개월은 약 120일이에요. 가입 1년 미만이면 소정급여일수가 120일이라 월 300만원 기준 7,925,760원이에요. 가입 1년을 넘으면 150일이 되어 9,907,200원이 돼요."
    },
    {
      "q": "실업급여 전체 얼마를 받는지 어떻게 아나요?",
      "a": "수급자격증에 적힌 하루 지급액과 소정급여일수를 곱하면 전체 금액이 나와요."
    },
    {
      "q": "월급이 많으면 총액도 많나요?",
      "a": "하루 금액이 상한과 하한에 막혀 있어서 크게 차이 나지 않아요. 총액을 가르는 건 소정급여일수예요."
    },
    {
      "q": "50세 이상이면 얼마나 더 받나요?",
      "a": "구간마다 소정급여일수가 늘어나요. 월 300만원에 가입 3년이면 1,981,440원을 더 받아요."
    },
    {
      "q": "총액을 다 못 받는 경우도 있나요?",
      "a": "이직일 다음 날부터 12개월이 지나면 일수가 남아도 끝나요. 늦게 신청할수록 위험해요."
    }
  ],
  "related": [
    {
      "kind": "주제 홈",
      "label": "2026년 실업급여 얼마나 받나요",
      "href": "/unemployment/"
    },
    {
      "kind": "계산기",
      "label": "실업급여 계산기",
      "href": "/unemployment/calculator/"
    },
    {
      "kind": "다음 질문",
      "label": "실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나",
      "href": "/unemployment/days/"
    },
    {
      "kind": "다음 질문",
      "label": "실업급여 지급일 언제 들어오나요, 회차별 입금 날짜",
      "href": "/unemployment/payday/"
    }
  ]
};
