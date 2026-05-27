import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('ko-KR', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('ko-KR', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: '런타임',
  performance: '성능',
  library: '라이브러리',
  version: '버전',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1)}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: '전체',
  valid: '유효',
  invalid: '무효',
  fastest: '속도',
  popularity: '인기도',
  downloads: (v: number) => `${dw.format(v)}/주`,
  avgSlowdown: '평균 저하 vs 유효:',
  parseSafe: '파싱 (safe)',
  parseStrict: '파싱 (strict)',
  assertLoose: '어서트 (loose)',
  assertStrict: '어서트 (strict)',
  min: '최소',
  p5: 'p5',
  median: '중앙값',
  p95: 'p95',
  max: '최대',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: '계산 방법',
  howDescription: '각 라이브러리는 격리된 프로세스에서 테스트됩니다. 점수는 유효 테스트의 정규화된 기하 평균 — geomean이 가장 높은 라이브러리가 100점. 막대는 초당 연산 수(높을수록 좋음). 마진(±%)은 95% 신뢰 구간. 무효 모드에서 slowdown은 오류 처리 페널티를 보여줍니다.',
  tests: '테스트',
} as const satisfies LocaleSchema;
