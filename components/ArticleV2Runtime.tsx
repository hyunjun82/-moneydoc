"use client";

import { useEffect } from "react";
import { SCRIPTS } from "./article-v2-scripts";

/**
 * v2 글의 인터랙션(즉답 칩, 판정 트리, 월급 위젯, 표 펼치기, 외부 이동 레이어).
 * dangerouslySetInnerHTML 로 넣은 <script>는 실행되지 않으므로 마운트 후 한 번 실행한다.
 */
export function ArticleV2Runtime({ scriptKey }: { scriptKey: string }) {
  useEffect(() => {
    const run = (SCRIPTS as Record<string, () => void>)[scriptKey];
    if (typeof run !== "function") {
      console.error(`[ArticleV2] 알 수 없는 스크립트 키: ${scriptKey}`);
      return;
    }
    try {
      run();
    } catch (err) {
      console.error(`[ArticleV2] ${scriptKey} 실행 실패`, err);
    }
  }, [scriptKey]);
  return null;
}
