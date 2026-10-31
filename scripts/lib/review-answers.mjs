// 검토 기록(titles.<주제>-v2.json → spoke.review.h2Answers)에서 "소제목 질문 → 첫 답 문장" 을 꺼낸다.
// 허브 원페이지와 카테고리 가이드 목록의 "바로 답" 은 여기서만 나온다. 답은 write-review.mjs 가 빌드된 페이지에서
// 그대로 읽어 온 문장이라, 글에 없는 말이 목록에 섞일 수 없다 (gate.mjs 가 글과 대조한다).
import fs from 'node:fs';
import path from 'node:path';

const EVASIVE = /담당자가 알려|정부 안내에 없|확인해 보세요\.?$/;

/** @returns Map<articleSlug, { q, a }[]>  (articleSlug = `${hub}-${spoke}-guide`) */
export function loadReviewAnswers(root = process.cwd()) {
  const dir = path.join(root, 'scripts/title-system');
  const map = new Map();
  for (const f of fs.readdirSync(dir)) {
    const m = /^titles\.(.+)-v2\.json$/.exec(f);
    if (!m) continue;
    const hub = m[1];
    const plan = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const g of plan.groups ?? []) {
      for (const s of g.spokes ?? []) {
        const rows = (s.review?.h2Answers ?? [])
          .filter((x) => x.h2 && x.ans && x.ans.length >= 12 && !EVASIVE.test(x.ans))
          .map((x) => ({ q: x.h2.replace(/\s+/g, ' ').trim(), a: x.ans.replace(/\s+/g, ' ').trim() }));
        if (rows.length) map.set(`${hub}-${s.slug}-guide`, rows);
      }
    }
  }
  return map;
}
