// 근로장려금 퍼널 중간 페이지(스포크). 랜딩에서 내부 이동으로 진입 → 여기서 홈택스 공식 링크로 이탈.
// 페이지 자체가 실제 문제(조회 방법)를 해결해야 함 — 버튼 문구와 내용 일치가 애드센스 정책 안전선.
// 클래스는 components/cardnews.css 화이트리스트만 사용. 사실 출처: 국세청(nts.go.kr).

export const meta = {
  title: "근로장려금 지급액 조회: 홈택스·손택스·ARS 확인 방법",
  description: "근로장려금 심사결과·지급액 조회 방법. 홈택스·손택스 장려금 메뉴에서 심사진행상황 확인, ARS 1544-9944. 2026년 정기분은 8월 27일 지급, 기한 후 신청은 12월 1일까지 95% 지급.",
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
};

export const bodyHtml = `
<article class="wrap">

    <a class="applysticky" href="https://hometax.go.kr" target="_blank" rel="noopener">
      <span class="as-t">홈택스 지급액 조회</span>
      <span class="as-d">국세청 공식 · 정기분 8월 27일 지급</span>
      <span class="as-btn">홈택스 바로가기 →</span>
    </a>

    <div class="masthead">
      <div class="kicker">MoneyDoc · 정부지원금 가이드</div>
      <div class="src">자료 출처: 국세청(nts.go.kr) · 정책브리핑(korea.kr)</div>
    </div>

    <section class="card hero">
      <span class="tag">근로장려금 · 조회 안내</span>
      <h1>근로장려금 지급액 조회 <br>홈택스·손택스·ARS 확인 방법</h1>
      <p class="lead">1분이면 확인돼요. 심사결과와 지급액을 조회하는 세 가지 방법을 화면 순서대로 정리했습니다.</p>
      <div class="topics">
        <span>홈택스 PC</span>
        <span>손택스 앱</span>
        <span>ARS 1544-9944</span>
        <span>지급일 8/27</span>
      </div>
    </section>

    <div class="byline">
      <div class="ed"><span class="ava">지</span><span class="who">지원금 에디터</span></div>
      <div class="dates"><span>작성일 <time datetime="2026-08-01">2026. 08. 01.</time></span><span>수정일 <time datetime="2026-08-01">2026. 08. 01.</time></span></div>
    </div>

    <div class="facts">
      <div class="f"><div class="k">정기분 지급일</div><div class="v accent">8월 27일</div></div>
      <div class="f"><div class="k">조회 방법</div><div class="v">홈택스 · 손택스</div></div>
      <div class="f"><div class="k">전화 안내</div><div class="v">ARS 1544-9944</div></div>
    </div>

    <section class="card" id="sec-hometax">
      <div class="seclabel"><span class="num">1</span><span class="txt">홈택스 (PC)</span></div>
      <h2>홈택스에서 조회하는 법</h2>
      <p class="secteaser">공동인증서·간편인증으로 로그인만 하면 바로 볼 수 있어요.</p>
      <div class="steps">
        <div class="st"><span class="sn">1</span><div class="sb"><b>홈택스 접속 후 로그인</b>hometax.go.kr에 접속해 간편인증(카카오·네이버 등) 또는 공동인증서로 로그인해요.</div></div>
        <div class="st"><span class="sn">2</span><div class="sb"><b>장려금·연말정산·기부금 메뉴</b>상단 메뉴에서 <b>장려금·연말정산·기부금 → 근로·자녀장려금</b>으로 들어가요.</div></div>
        <div class="st"><span class="sn">3</span><div class="sb"><b>심사진행상황 조회</b>심사진행상황·지급액을 확인해요. 심사가 끝났다면 지급 예정 금액과 입금 계좌가 표시됩니다.</div></div>
      </div>
      <a class="applybar" href="https://hometax.go.kr" target="_blank" rel="noopener">
        <span class="t">국세청 홈택스에서 바로 확인<small>심사진행상황 · 지급액 · 입금 계좌</small></span>
        <span class="btn">홈택스 바로가기 →</span>
      </a>
    </section>

    <section class="card" id="sec-sontax">
      <div class="seclabel"><span class="num">2</span><span class="txt">손택스 (앱)</span></div>
      <h2>손택스 앱에서 조회하는 법</h2>
      <p class="secteaser">휴대폰만 있으면 돼요. 경로는 홈택스와 같아요.</p>
      <ul class="docs">
        <li><span><b>손택스 앱</b> 실행 → 간편인증 로그인</span></li>
        <li><span><b>장려금·연말정산·기부금 → 근로·자녀장려금</b> 메뉴로 이동</span></li>
        <li><span>심사진행상황·지급액 확인 (정기분은 <b>8월 27일</b> 등록 계좌로 입금)</span></li>
      </ul>
      <div class="subnote" style="margin-top:var(--sp-4)">전화가 편하다면 <b>ARS 1544-9944</b>에서 신청·안내를 받을 수 있어요. 상세 상담은 관할 세무서로 문의하세요.</div>
    </section>

    <section class="card" id="sec-notpaid">
      <div class="seclabel"><span class="num">3</span><span class="txt">미입금 체크</span></div>
      <h2>27일에 입금이 안 됐다면</h2>
      <p class="secteaser">순서대로 확인하면 원인이 나와요.</p>
      <ul class="qa">
        <li><span class="tri">▲</span><div class="body"><b class="hl">심사결과부터 확인</b>요건 미충족·감액(재산 1억 7,000만 원 이상 50%) 여부가 심사결과에 표시돼요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">계좌 등록 확인</b>본인 명의 계좌가 등록돼 있어야 해요. 계좌 오류면 지급이 지연될 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">기한 후 신청분은 순차 지급</b>6월 2일 이후 신청했다면 8월 27일 조기 지급 대상이 아니에요. 심사 후 순차 지급됩니다.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">체납 충당 여부</b>국세 체납이 있으면 지급액 일부가 체납액에 먼저 충당될 수 있어요.</div></li>
      </ul>
    </section>

    <section class="card" id="sec-late">
      <div class="seclabel"><span class="num">4</span><span class="txt">아직 신청 전이라면</span></div>
      <h2>신청을 아직 안 했다면 — 12월 1일까지</h2>
      <p class="secteaser">2025년 귀속분 마지막 기회예요. 지금 신청하면 산정액의 95%를 받습니다.</p>
      <ul class="docs">
        <li><span>기간: <b>12월 1일까지</b> 기한 후 신청</span></li>
        <li><span>방법: 홈택스·손택스 <b>장려금 메뉴에서 신청</b> 또는 ARS 1544-9944</span></li>
        <li><span>지급: 산정액의 <b>95%</b> · 심사 후 순차 지급</span></li>
      </ul>
      <a class="applybar" href="https://hometax.go.kr" target="_blank" rel="noopener">
        <span class="t">기한 후 신청도 홈택스에서<small>12월 1일까지 · 산정액의 95% 지급</small></span>
        <span class="btn">홈택스에서 신청 →</span>
      </a>
    </section>

    <section class="card" id="sec-faq">
      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>
      <h2>지급액 조회 자주 묻는 질문</h2>
      <div class="faq" style="margin-top:var(--sp-6)">
        <details open>
          <summary><span class="q">Q.</span><span>심사결과는 언제 나오나요?</span><span class="plus">+</span></summary>
          <div class="ans">정기 신청분은 지급일(8월 27일) 전에 심사가 마무리돼요. 홈택스·손택스에서 심사진행상황을 수시로 확인할 수 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>지급액이 생각보다 적어요. 왜죠?</span><span class="plus">+</span></summary>
          <div class="ans">재산 1억 7,000만 원 이상이면 50% 감액, 기한 후 신청이면 5% 감액돼요. 소득 구간에 따라 산정액 자체가 최대액보다 낮을 수도 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>가족이 대신 조회할 수 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">조회는 본인 인증 기반이라 본인 명의로 로그인해야 해요. 전화 안내(ARS 1544-9944)도 본인 정보로 진행됩니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>자녀장려금도 같이 조회되나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 홈택스 근로·자녀장려금 메뉴에서 함께 확인할 수 있어요. 자녀장려금도 같은 날 지급됩니다.</div>
        </details>
      </div>
    </section>

    <section class="card" id="sec-related">
      <div class="seclabel"><span class="num">↗</span><span class="txt">관련 계산기·가이드</span></div>
      <h2>더 확인해 보세요</h2>
      <p class="secteaser">지급 일정 전체와 예상 지급액도 바로 볼 수 있어요.</p>
      <div class="rellinks">
        <a class="rel" href="/government/earned-income-tax-credit-guide/"><span class="rt">근로장려금 총정리 →</span><span class="rd">지급일 · 가구별 지급액 · 기한 후 신청 (허브)</span></a>
        <a class="rel" href="/government/earned-income-tax-credit/"><span class="rt">근로장려금 모의계산 →</span><span class="rd">가구 유형·소득별 예상 지급액</span></a>
        <a class="rel" href="/government/median-income/"><span class="rt">중위소득 계산기 →</span><span class="rd">내 가구 중위소득 % 확인</span></a>
      </div>
    </section>

    <div class="foot">
      <div class="org">MoneyDoc 편집팀</div>
      <div style="margin-top:6px">자료 출처: 국세청(nts.go.kr) · 정책브리핑(korea.kr) — 메뉴 명칭·심사 기준은 변동될 수 있으니 최종 확인은 국세청 공식 채널에서 하세요.</div>
    </div>

  </article>
`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "근로장려금 심사결과는 언제 나오나요?", "acceptedAnswer": { "@type": "Answer", "text": "정기 신청분은 지급일(8월 27일) 전에 심사가 마무리돼요. 홈택스·손택스에서 심사진행상황을 수시로 확인할 수 있어요." } },
    { "@type": "Question", "name": "근로장려금 지급액이 생각보다 적은 이유는?", "acceptedAnswer": { "@type": "Answer", "text": "재산 1억 7,000만 원 이상이면 50% 감액, 기한 후 신청이면 5% 감액돼요. 소득 구간에 따라 산정액 자체가 최대액보다 낮을 수도 있어요." } },
    { "@type": "Question", "name": "근로장려금 조회를 가족이 대신할 수 있나요?", "acceptedAnswer": { "@type": "Answer", "text": "조회는 본인 인증 기반이라 본인 명의로 로그인해야 해요. 전화 안내(ARS 1544-9944)도 본인 정보로 진행됩니다." } },
    { "@type": "Question", "name": "자녀장려금도 같이 조회되나요?", "acceptedAnswer": { "@type": "Answer", "text": "네. 홈택스 근로·자녀장려금 메뉴에서 함께 확인할 수 있어요. 자녀장려금도 같은 날 지급됩니다." } }
  ]
};
