"use client";
// 자동 생성 (scripts/split-engine.mjs 와 짝) — 이 계산기의 산식 모듈만 싣는다
import { GenericCalculator } from "@/components/GenericCalculator";
import { calc } from "@/lib/calc/gen/child-support";
import spec from "@/data/calculators/law/child-support.json";

export function Client() {
  return <GenericCalculator spec={spec} calc={calc} />;
}
