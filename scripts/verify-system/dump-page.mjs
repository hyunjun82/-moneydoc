// 정부 사이트 폼 탐색용: node scripts/verify-system/dump-page.mjs <url> [clickSelector] [textLimit] — 보이는 입력칸·버튼 id와 라벨을 찍는다 (어댑터 만들 때 사용)
import { chromium } from 'playwright';
const [url, clickSel, lim = '3000'] = process.argv.slice(2);
const b = await chromium.launch({ headless: true }); const ctx = await b.newContext({ locale: 'ko-KR' });
const p = await ctx.newPage(); p.setDefaultTimeout(45000);
await p.goto(url, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(8000);
for (const pg of ctx.pages()) if (pg !== p) { try { await pg.close(); } catch {} }
if (clickSel) { await p.evaluate((s) => document.querySelector(s)?.click(), clickSel); await p.waitForTimeout(7000); for (const pg of ctx.pages()) if (pg !== p) { try { await pg.close(); } catch {} } }
const info = await p.evaluate((lim) => {
  const vis = (e) => e.offsetParent !== null;
  const text = document.body.innerText.replace(/\s+/g, ' ');
  const labelOf = (e) => { const td = e.closest('td'); const th = td?.previousElementSibling; const tr = e.closest('tr'); const t = th?.textContent || tr?.querySelector('th')?.textContent || e.closest('label,div')?.textContent || ''; return t.replace(/\s+/g,' ').trim().slice(0, 30); };
  const fields = [...document.querySelectorAll('input,select,textarea')].filter((e) => vis(e) && e.id && !/^mf_wfHeader|^mf_wfFooter/.test(e.id)).map((e) => {
    const opts = e.tagName === 'SELECT' ? ' opts=' + [...e.options].map((o) => o.value + ':' + o.text.trim().slice(0, 12)).slice(0, 12).join('|') : '';
    return `${e.tagName[0]}:${e.id}(${e.type || ''})${e.name ? ' name=' + e.name : ''} <${labelOf(e)}>${e.value ? ' =' + String(e.value).slice(0, 12) : ''}${opts}`;
  });
  const btns = [...document.querySelectorAll('button,a,input[type=button]')].filter((e) => vis(e) && e.id && /^mf_txppWframe/.test(e.id)).map((e) => `${e.id} "${(e.value || e.textContent).trim().slice(0, 20)}"`);
  return { url: location.href.slice(0, 200), pages: 1, text: text.slice(0, +lim), fields, btns };
}, lim);
console.log('URL', info.url); console.log('TEXT', info.text); console.log('FIELDS'); info.fields.forEach((f) => console.log('  ' + f)); console.log('BTNS'); info.btns.forEach((f) => console.log('  ' + f));
await b.close();
