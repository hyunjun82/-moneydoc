/**
 * 어댑터 공통 인터페이스
 *
 * 모든 사이트별 어댑터는 이 베이스를 따름:
 *   - id: string (kinfa, hometax, ezloan ...)
 *   - gov: boolean (정부 사이트 true / 대형 표준 false)
 *   - url: string
 *   - calculate(input) → output (어떤 필드가 나올지는 어댑터마다 다름)
 *
 * 예외 처리:
 *   - 사이트 다운/타임아웃 시 throw new AdapterError(...)
 *   - 호출 측은 try/catch로 graceful 처리
 */

export class AdapterError extends Error {
  constructor(adapterId, reason, originalError) {
    super(`[${adapterId}] ${reason}` + (originalError ? `: ${originalError.message}` : ''));
    this.adapterId = adapterId;
    this.reason = reason;
    this.cause = originalError;
  }
}

export class BaseAdapter {
  static id = 'base';
  static gov = false;
  static url = '';
  static description = '';

  // 표준 헤드리스 옵션
  static playwrightOptions = {
    headless: true,
    timeout: 20000,
  };

  // 입력 검증 (서브클래스에서 override 가능)
  validateInput(input) {
    if (!input || typeof input !== 'object') {
      throw new AdapterError(this.constructor.id, 'invalid input');
    }
  }

  // 결과 정규화 — 모든 어댑터 결과를 동일 키로 통일
  // 서브클래스에서 자체 키 → 표준 키로 매핑
  normalizeOutput(rawOutput) {
    return rawOutput;
  }

  // 메인 계산 메서드 — 서브클래스에서 반드시 구현
  async calculate(input) {
    throw new Error(`${this.constructor.id}.calculate() not implemented`);
  }

  // 토러런스 비교 (정부 0원 / 대형 ±100원 — CLAUDE.md 기준)
  static getTolerance() {
    return this.gov ? 0 : 100;
  }
}

// 어댑터 등록소
export const ADAPTER_REGISTRY = new Map();

export function registerAdapter(AdapterClass) {
  ADAPTER_REGISTRY.set(AdapterClass.id, AdapterClass);
}

export function getAdapter(id) {
  const A = ADAPTER_REGISTRY.get(id);
  if (!A) throw new AdapterError(id, 'adapter not registered');
  return new A();
}
