import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('ja-JP', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('ja-JP', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'ランタイム',
  performance: 'パフォーマンス',
  library: 'ライブラリ',
  version: 'バージョン',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1)}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: 'すべて',
  valid: '有効',
  invalid: '無効',
  fastest: '速度',
  popularity: '人気',
  downloads: (v: number) => `${dw.format(v)}/週`,
  avgSlowdown: '平均低下 vs 有効:',
  parseSafe: '解析 (safe)',
  parseStrict: '解析 (strict)',
  assertLoose: 'アサート (loose)',
  assertStrict: 'アサート (strict)',
  min: '最小',
  p5: 'p5',
  median: '中央値',
  p95: 'p95',
  max: '最大',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: '計算方法',
  howDescription: '各ライブラリは独立したプロセスでテストされます。スコアは有効テストの正規化幾何平均 — geomean が最も高いライブラリが 100。バーは 1 秒あたりの操作数（高いほど良い）。マージン (±%) は 95% 信頼区間。無効モードでは slowdown がエラー処理のペナルティを示します。',
  tests: 'テスト',
} as const satisfies LocaleSchema;
