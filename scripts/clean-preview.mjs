/**
 * 배포 산출물에서 로컬 미리보기를 걷어낸다.
 *
 * public/_preview/*.html 은 글을 만들 때 쓰는 중간 산출물인데,
 * public/ 아래에 있어서 그대로 배포됐다. 실제 페이지와 본문이 99.6% 같아
 * 포털이 중복 문서로 볼 수 있다. og PNG 는 public/og/ 에 따로 있고
 * 라이브 페이지가 /_preview/ 를 참조하는 곳은 없다.
 *
 * 실행: node scripts/clean-preview.mjs   (package.json 의 postbuild)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const target = path.join(ROOT, 'out', '_preview');

if (!fs.existsSync(target)) {
  console.log('out/_preview 없음. 지울 것 없음');
  process.exit(0);
}

// 라이브 페이지가 /_preview/ 를 참조하면 지우면 안 된다. 먼저 확인한다
const refs = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== '_preview' && e.name !== '_next') walk(p);
    } else if (e.name.endsWith('.html') && fs.readFileSync(p, 'utf8').includes('/_preview/')) {
      refs.push(path.relative(ROOT, p));
    }
  }
};
walk(path.join(ROOT, 'out'));

if (refs.length) {
  console.error(`FAIL: 라이브 페이지 ${refs.length}개가 /_preview/ 를 참조한다. 먼저 경로를 고쳐라`);
  refs.slice(0, 10).forEach((r) => console.error('  ' + r));
  process.exit(1);
}

const n = fs.readdirSync(target).length;
fs.rmSync(target, { recursive: true, force: true });
console.log(`out/_preview 삭제 (${n}개). 미리보기는 배포되지 않는다`);
