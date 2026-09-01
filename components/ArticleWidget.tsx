"use client";

import { useEffect } from "react";
import { WIDGETS } from "./article-widgets";

/**
 * 가이드 글 안의 계산 위젯.
 *
 * 위젯 마크업은 글 데이터(widgetHtml)에서 오고, 동작은
 * components/article-widgets.js 의 레지스트리에서 온다.
 * 두 파일 모두 public/_preview 의 검증된 원본에서 자동 생성된다.
 *
 * dangerouslySetInnerHTML 로 넣은 <script>는 실행되지 않으므로
 * 마크업이 붙은 뒤 useEffect 에서 해당 렌더 함수를 한 번 호출한다.
 * 렌더 함수는 고정 id로 DOM을 찾는데, 한 페이지에 위젯은 하나뿐이라 충돌하지 않는다.
 */
export function ArticleWidget({ widgetKey, html }: { widgetKey: string; html: string }) {
  useEffect(() => {
    const run = WIDGETS[widgetKey];
    if (typeof run !== "function") {
      console.error(`[ArticleWidget] 알 수 없는 위젯 키: ${widgetKey}`);
      return;
    }
    try {
      run();
    } catch (err) {
      console.error(`[ArticleWidget] ${widgetKey} 실행 실패`, err);
    }
  }, [widgetKey]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
