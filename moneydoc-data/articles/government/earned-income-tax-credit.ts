// 근로장려금 퍼널 랜딩(허브). 8월 지급 시즌 타깃 — 검색 의도: 지급일·지급액 조회·기한후 신청.
// 퍼널: 본문 CTA 전부 내부(/government/earned-income-tax-credit-check/)로 이동 → 그 페이지에서 홈택스 공식 링크.
// 클래스는 components/cardnews.css 화이트리스트만 사용. 사실 출처: 국세청(nts.go.kr)·정책브리핑.

export const meta = {
  title: "근로장려금 지급일 2026, 8월 27일 지급·내 지급액 조회 방법",
  description: "2026년 근로장려금 정기분은 8월 27일 지급(법정기한 9월 말보다 조기). 심사결과·지급액은 홈택스·손택스에서 조회. 단독 최대 165만·홑벌이 285만·맞벌이 330만 원. 5월 신청을 놓쳤다면 12월 1일까지 기한 후 신청 시 95% 지급.",
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
};

export const bodyHtml = `
<article class="wrap">

    <a class="applysticky" href="/government/earned-income-tax-credit-check/">
      <span class="as-t">근로장려금 지급액 조회</span>
      <span class="as-d">8월 27일 입금 전, 심사결과 미리 확인</span>
      <span class="as-btn">조회 바로가기 →</span>
    </a>

    <div class="masthead">
      <div class="kicker">MoneyDoc · 정부지원금 가이드</div>
      <div class="src">자료 출처: 국세청(nts.go.kr) · 정책브리핑(korea.kr)</div>
    </div>

    <section class="card hero">
      <span class="tag">정부지원금 · 근로장려금</span>
      <h1>근로장려금 8월 27일 지급 확정 <br>내 지급액 지금 확인하세요</h1>
      <p class="lead">국세청이 올해 정기분 지급일을 법정기한(9월 말)보다 한 달 이상 앞당겼습니다. 심사결과와 지급액은 지금 홈택스·손택스에서 바로 조회할 수 있어요.</p>
      <div class="topics">
        <span>지급일 8월 27일</span>
        <span>지급액 조회</span>
        <span>기한 후 신청 ~12/1</span>
        <span>감액 기준</span>
      </div>
    </section>

    <div class="byline">
      <div class="ed"><span class="ava">지</span><span class="who">지원금 에디터</span></div>
      <div class="dates"><span>작성일 <time datetime="2026-08-01">2026. 08. 01.</time></span><span>수정일 <time datetime="2026-08-01">2026. 08. 01.</time></span></div>
    </div>

    <div class="facts">
      <div class="f"><div class="k">정기분 지급일</div><div class="v accent">8월 27일</div></div>
      <div class="f"><div class="k">최대 지급액</div><div class="v">가구당 330만 원</div></div>
      <div class="f"><div class="k">신청 놓쳤다면</div><div class="v">12/1까지 95% 지급</div></div>
    </div>

    <div class="notice"><span class="ic">ⓘ</span><span>이 글은 <b>2025년 귀속 정기분(2026년 5월 1일~6월 1일 신청)</b> 기준이에요. 실제 지급 여부와 금액은 국세청 심사 결과에 따라 달라질 수 있어요.</span></div>

    <details class="toc" open>
      <summary><span class="ic">☰</span><span>목차</span><span class="tog">+</span></summary>
      <nav class="toc-nav">
        <a href="#sec-summary">근로장려금 8월 지급, 핵심만 먼저</a>
        <a href="#sec-schedule">2026 근로장려금 일정 (신청~지급)</a>
        <a href="#sec-amount">근로장려금 얼마나 받나? (가구 유형별)</a>
        <a href="#sec-check">지급액·심사결과 확인 방법</a>
        <a href="#sec-late">5월 신청 놓쳤다면 — 기한 후 신청 (12/1까지)</a>
        <a href="#sec-caution">감액·미지급 주의사항</a>
        <a href="#sec-faq">근로장려금 자주 묻는 질문 (FAQ)</a>
      </nav>
    </details>

    <section class="card" id="sec-summary">
      <div class="seclabel"><span class="num">!</span><span class="txt">한눈에 요약</span></div>
      <h2>근로장려금 8월 지급, 핵심만 먼저</h2>
      <div class="keypts" style="margin-top:var(--sp-6)">
        <div class="pt"><span class="n">1</span><span class="t">올해 정기분은 <b>8월 27일 지급</b>. 법정 지급기한(9월 말)보다 한 달 이상 이른 조기 지급이에요.</span></div>
        <div class="pt"><span class="n">2</span><span class="t">지급액은 <b>단독 최대 165만 · 홑벌이 285만 · 맞벌이 330만 원</b>. 소득 구간에 따라 최소 3만 원부터 산정돼요.</span></div>
        <div class="pt"><span class="n">3</span><span class="t">내가 얼마 받는지는 <b>홈택스·손택스</b>에서 심사결과·지급액으로 바로 확인할 수 있어요.</span></div>
        <div class="pt"><span class="n">4</span><span class="t">5월 정기신청을 놓쳤어도 <b>12월 1일까지 기한 후 신청</b>하면 산정액의 <b>95%</b>를 받아요.</span></div>
      </div>
    </section>

    <a class="applybar" href="/government/earned-income-tax-credit-check/">
      <span class="t">아직 심사결과·지급액 확인 안 하셨다면<small>감액·계좌 오류면 27일에 입금이 안 될 수 있어요 — 확인은 1분이면 끝나요</small></span>
      <span class="btn">조회 바로가기 →</span>
    </a>

    <section class="card" id="sec-schedule">
      <div class="seclabel"><span class="num">1</span><span class="txt">전체 일정</span></div>
      <h2>2026 근로장려금 일정 (신청~지급)</h2>
      <p class="secteaser">2025년에 번 소득 기준으로, 올해는 아래 순서로 진행돼요. 지금은 정기분 지급 직전 단계입니다.</p>
      <table class="calc-tbl">
        <thead><tr><th>단계</th><th>기간</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td>정기 신청</td><td>5/1 ~ 6/1 (마감)</td><td>2025년 귀속 소득 기준 신청</td></tr>
          <tr><td>심사</td><td>6월 ~ 8월</td><td>국세청이 소득·재산 자동 심사</td></tr>
          <tr><td>정기분 지급</td><td class="em">8월 27일</td><td>법정기한(9월 말)보다 조기 지급</td></tr>
          <tr><td>기한 후 신청</td><td>6/2 ~ 12/1</td><td>산정액의 95% 지급 · 심사 후 순차 지급</td></tr>
          <tr><td>반기 신청(상반기분)</td><td>9월</td><td>2026년 상반기 소득분 · 12월 지급</td></tr>
        </tbody>
      </table>
      <div class="subnote" style="margin-top:var(--sp-4)">기한 후 신청분은 <b>8월 27일 조기 지급 대상에서 제외</b>되고, 신청 후 심사를 거쳐 순차 지급돼요.</div>
    </section>

    <section class="card" id="sec-amount">
      <div class="seclabel"><span class="num">2</span><span class="txt">지급액</span></div>
      <h2>근로장려금 얼마나 받나? (가구 유형별)</h2>
      <p class="secteaser">가구 유형과 2025년 총소득으로 정해져요. 아래 기준 금액 미만이어야 대상입니다.</p>
      <table class="calc-tbl">
        <thead><tr><th>가구 유형</th><th>총소득 기준</th><th>최대 지급액</th></tr></thead>
        <tbody>
          <tr><td>단독가구</td><td>2,200만 원 미만</td><td class="em">165만 원</td></tr>
          <tr><td>홑벌이가구</td><td>3,200만 원 미만</td><td class="em">285만 원</td></tr>
          <tr><td>맞벌이가구</td><td>4,400만 원 미만</td><td class="em">330만 원</td></tr>
        </tbody>
      </table>
      <ul class="qa" style="margin-top:var(--sp-5)">
        <li><span class="tri">▲</span><div class="body"><b class="hl">가구 유형은 이렇게 나뉘어요</b>배우자·부양자녀(18세 미만)·70세 이상 직계존속이 없으면 <b>단독가구</b>, 배우자의 총급여가 300만 원 미만이면 <b>홑벌이</b>, 부부 모두 총급여 300만 원 이상이면 <b>맞벌이</b>예요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">재산 요건도 봐요</b>2025년 6월 1일 기준 가구 재산 합계가 <b>2억 4,000만 원 미만</b>이어야 해요. <b>1억 7,000만 원 이상</b>이면 지급액이 <b>50% 감액</b>됩니다.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">최대액은 '구간'에서만 나와요</b>소득이 너무 적거나 기준선에 가까우면 지급액이 줄어요. 산정표 구간에 따라 <b>최소 3만 원</b>까지 내려갈 수 있어요.</div></li>
      </ul>
      <a class="calcbar" href="/government/earned-income-tax-credit/">
        <span class="ct">내 소득·가구 유형으로 예상 지급액 계산하기</span>
        <span class="cbtn">근로장려금 모의계산 →</span>
      </a>
    </section>

    <section class="card" id="sec-check">
      <div class="seclabel"><span class="num">3</span><span class="txt">지금 단계</span></div>
      <h2>지급액·심사결과 확인 방법</h2>
      <p class="secteaser">5월에 신청했다면 지금 할 일은 하나예요. 심사결과와 지급액을 확인하고, 27일 입금을 기다리면 됩니다.</p>
      <ul class="qa">
        <li><span class="tri">▲</span><div class="body"><b class="hl">홈택스·손택스에서 조회</b>장려금 메뉴에서 <b>심사진행상황과 지급 예정액</b>을 확인할 수 있어요. 자세한 경로는 아래 조회 안내에서 단계별로 정리했어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">계좌를 등록해 두세요</b>신청 때 등록한 <b>본인 명의 계좌</b>로 입금돼요. 계좌가 없거나 잘못됐으면 지급이 늦어질 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">27일에 안 들어왔다면</b>심사에서 감액·제외됐거나 지급 대상 시기가 다를 수 있어요. 심사결과부터 확인하는 게 순서예요.</div></li>
      </ul>
    </section>

    <a class="applybar" href="/government/earned-income-tax-credit-check/">
      <span class="t">신청했다고 끝난 게 아니에요<small>재산 1억 7,000만 원 초과면 절반 감액 · 계좌 오류면 입금 지연 — 입금 전 내 결과부터 확인하세요</small></span>
      <span class="btn">조회 바로가기 →</span>
    </a>

    <section class="card" id="sec-late">
      <div class="seclabel"><span class="num">4</span><span class="txt">기한 후 신청</span></div>
      <h2>5월 신청 놓쳤다면 — 기한 후 신청 (12월 1일까지)</h2>
      <p class="secteaser">아직 끝나지 않았어요. 지금 신청하면 산정액의 95%를 받을 수 있습니다.</p>
      <ul class="docs">
        <li><span>기간: <b>6월 2일 ~ 12월 1일</b> (2025년 귀속분 마지막 기회)</span></li>
        <li><span>지급액: 산정된 장려금의 <b>95%</b> (5% 감액)</span></li>
        <li><span>방법: <b>홈택스·손택스</b> 또는 <b>ARS 전화(1544-9944)</b>로 신청</span></li>
        <li><span>지급: 8월 27일 조기 지급 대상은 아니고, <b>심사 후 순차 지급</b></span></li>
      </ul>
      <div class="subnote" style="margin-top:var(--sp-4)">참고: 정부가 최근 근로장려금 <b>최대 지급액 인상(단독 180만·홑벌이 310만 등) 개편을 추진</b>한다고 발표했어요. 아직 확정 전이라, 올해 지급분에는 현행 기준이 적용됩니다.</div>
    </section>

    <section class="card" id="sec-caution">
      <div class="seclabel"><span class="num">!</span><span class="txt">감액·미지급 주의</span></div>
      <h2>감액·미지급 주의사항</h2>
      <p class="secteaser">신청했는데 생각보다 적게 나오는 경우는 대부분 아래 셋 중 하나예요.</p>
      <div class="warn">
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>재산 1억 7,000만 원 이상 — 50% 감액</b> — 2025년 6월 1일 기준 가구 재산 합계로 판정해요. 주택·토지·전세보증금·예금이 포함됩니다.</div></div>
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>기한 후 신청 — 5% 감액</b> — 정기 기간(5/1~6/1)을 놓치고 신청하면 산정액의 95%만 지급돼요.</div></div>
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>국세 체납이 있으면 충당될 수 있어요</b> — 체납액이 있으면 지급액의 일부가 체납 국세에 먼저 충당될 수 있습니다.</div></div>
      </div>
    </section>

    <section class="card" id="sec-faq">
      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>
      <h2>근로장려금 자주 묻는 질문 (FAQ)</h2>
      <div class="faq" style="margin-top:var(--sp-6)">
        <details open>
          <summary><span class="q">Q.</span><span>2026년 근로장려금은 언제 지급되나요?</span><span class="plus">+</span></summary>
          <div class="ans">정기분(5월 신청)은 <b>8월 27일</b> 지급돼요. 법정 지급기한은 9월 말이지만 국세청이 한 달 이상 앞당겼어요. 기한 후 신청분은 심사 후 순차 지급됩니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>내가 얼마 받는지 어떻게 확인하나요?</span><span class="plus">+</span></summary>
          <div class="ans"><b>홈택스·손택스</b>의 장려금 메뉴에서 심사진행상황과 지급액을 조회할 수 있어요. <a href="/government/earned-income-tax-credit-check/">단계별 조회 방법은 여기</a>에 정리했어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>신청했는데 왜 못 받나요?</span><span class="plus">+</span></summary>
          <div class="ans">소득·재산 요건 미충족, 재산 1억 7,000만 원 이상(50% 감액), 국세 체납 충당, 계좌 오류 등이 대표 사유예요. 심사결과 통지 내용부터 확인하세요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>5월에 신청 못 했는데 지금도 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. <b>12월 1일까지 기한 후 신청</b>이 가능해요. 다만 산정액의 95%만 지급됩니다(5% 감액).</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>반기 신청은 언제인가요?</span><span class="plus">+</span></summary>
          <div class="ans">근로소득만 있다면 반기 신청을 이용할 수 있어요. <b>2026년 상반기 소득분은 9월에 신청</b>해 12월에 받고, 하반기분은 이듬해 3월에 신청해요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>근로장려금 받으면 불이익이 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">장려금 자체는 소득세가 부과되지 않는 지원금이에요. 다만 허위 신청이 확인되면 환수되고 가산세 등 불이익이 있을 수 있으니 정확하게 신청하세요.</div>
        </details>
      </div>
    </section>

    <section class="card" id="sec-related">
      <div class="seclabel"><span class="num">↗</span><span class="txt">관련 계산기·가이드</span></div>
      <h2>내 숫자로 미리 확인해 보세요</h2>
      <p class="secteaser">예상 지급액부터 다른 지원금 자격까지, 머니닥 계산기로 바로 확인할 수 있어요.</p>
      <div class="rellinks">
        <a class="rel" href="/government/earned-income-tax-credit/"><span class="rt">근로장려금 모의계산 →</span><span class="rd">가구 유형·소득별 예상 지급액</span></a>
        <a class="rel" href="/government/earned-income-tax-credit-check/"><span class="rt">지급액 조회 방법 →</span><span class="rd">홈택스·손택스·ARS 단계별 안내</span></a>
        <a class="rel" href="/government/median-income/"><span class="rt">중위소득 계산기 →</span><span class="rd">내 가구 중위소득 % 확인</span></a>
      </div>
    </section>

    <div class="foot">
      <div class="org">MoneyDoc 편집팀</div>
      <div style="margin-top:6px">자료 출처: 국세청(nts.go.kr) · 정책브리핑(korea.kr) — 심사·지급 기준은 변동될 수 있으니 최종 확인은 국세청 공식 채널에서 하세요.</div>
    </div>

  </article>
`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "2026년 근로장려금은 언제 지급되나요?", "acceptedAnswer": { "@type": "Answer", "text": "정기분(5월 신청)은 8월 27일 지급돼요. 법정 지급기한은 9월 말이지만 국세청이 한 달 이상 앞당겼어요. 기한 후 신청분은 심사 후 순차 지급됩니다." } },
    { "@type": "Question", "name": "근로장려금 지급액은 어떻게 확인하나요?", "acceptedAnswer": { "@type": "Answer", "text": "홈택스·손택스의 장려금 메뉴에서 심사진행상황과 지급액을 조회할 수 있어요. ARS 1544-9944로도 안내받을 수 있습니다." } },
    { "@type": "Question", "name": "근로장려금 신청했는데 왜 못 받나요?", "acceptedAnswer": { "@type": "Answer", "text": "소득·재산 요건 미충족, 재산 1억 7,000만 원 이상(50% 감액), 국세 체납 충당, 계좌 오류 등이 대표 사유예요. 심사결과 통지 내용부터 확인하세요." } },
    { "@type": "Question", "name": "근로장려금 5월에 신청 못 했는데 지금도 되나요?", "acceptedAnswer": { "@type": "Answer", "text": "네. 12월 1일까지 기한 후 신청이 가능해요. 다만 산정액의 95%만 지급됩니다(5% 감액)." } },
    { "@type": "Question", "name": "근로장려금 반기 신청은 언제인가요?", "acceptedAnswer": { "@type": "Answer", "text": "근로소득만 있다면 반기 신청을 이용할 수 있어요. 2026년 상반기 소득분은 9월에 신청해 12월에 받고, 하반기분은 이듬해 3월에 신청해요." } },
    { "@type": "Question", "name": "근로장려금 최대 지급액은 얼마인가요?", "acceptedAnswer": { "@type": "Answer", "text": "단독가구 최대 165만 원, 홑벌이가구 285만 원, 맞벌이가구 330만 원이에요. 소득 구간과 재산에 따라 감액될 수 있습니다." } }
  ]
};
