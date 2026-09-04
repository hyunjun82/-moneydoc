/** 연관검색어 xlsx 를 열어 셀 문자열을 뽑는다. 외부 라이브러리 없이 zip + xml 파싱. */
import fs from 'node:fs';
import zlib from 'node:zlib';

const SIG = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const buf = fs.readFileSync(process.argv[2]);
const files = {};
let i = 0;
while ((i = buf.indexOf(SIG, i)) >= 0) {
  const nameLen = buf.readUInt16LE(i + 26);
  const extLen = buf.readUInt16LE(i + 28);
  const method = buf.readUInt16LE(i + 8);
  let csize = buf.readUInt32LE(i + 18);
  const name = buf.slice(i + 30, i + 30 + nameLen).toString();
  const start = i + 30 + nameLen + extLen;
  if (csize === 0) {
    const nxt = buf.indexOf(SIG, start);
    csize = (nxt < 0 ? buf.length : nxt) - start - 16;
  }
  try {
    const raw = buf.slice(start, start + csize);
    files[name] = method === 8 ? zlib.inflateRawSync(raw) : raw;
  } catch {}
  i = start + csize;
}

const un = (s) => s
  .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
const ssXml = (files['xl/sharedStrings.xml'] ?? Buffer.from('')).toString('utf8');
const shared = [...ssXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
  un([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join(''))
);

const sheetNames = Object.keys(files).filter((k) => /xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort();
const out = {};
for (const sheetName of sheetNames) {
const sheet = files[sheetName].toString('utf8');
const rows = [];
for (const r of sheet.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
  const cells = [];
  for (const c of r[1].matchAll(/<c[^>]*?(?:\st="(\w+)")?[^>]*>(?:<v>([\s\S]*?)<\/v>|<is>([\s\S]*?)<\/is>)?<\/c>/g)) {
    const [, t, v, is] = c;
    if (is != null) cells.push(un([...is.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join('')));
    else if (v == null) cells.push('');
    else cells.push(t === 's' ? shared[Number(v)] ?? '' : v);
  }
  rows.push(cells);
}
out[sheetName] = rows;
}

console.log(JSON.stringify(out));
