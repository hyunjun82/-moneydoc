export const krw = (n: number): string =>
  Math.round(n).toLocaleString("ko-KR");

export const parseKrw = (s: string): number =>
  Number(String(s).replace(/[^0-9]/g, "")) || 0;
