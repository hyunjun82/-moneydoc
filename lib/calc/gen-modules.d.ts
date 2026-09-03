// scripts/split-engine.mjs 가 만드는 lib/calc/gen/<slug>.js 의 공용 타입
declare module "@/lib/calc/gen/*" {
  export const calc: (input: Record<string, unknown>, spec?: unknown) => Record<string, unknown>;
}
