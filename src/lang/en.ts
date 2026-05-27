import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('en-US', {
  compactDisplay: 'short',
  maximumFractionDigits: 0,
});

const dw = new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'runtime',
  performance: 'performance',
  library: 'library',
  version: 'version',
  ops: (value: number) => `${ops.format(value)} ops/s`,
  nanos: (value: number) => {
    const ns = value * 1e9;
    if (ns >= 100) return `${Math.round(ns)}ns`;
    if (ns >= 1) return `${ns.toFixed(1)}ns`;
    return `${(ns * 1000).toFixed(0)}ps`;
  },
  all: 'all',
  valid: 'valid',
  invalid: 'invalid',
  fastest: 'fastest',
  popularity: 'popularity',
  downloads: (value: number) => `${dw.format(value)}/wk`,
  avgSlowdown: 'Avg slowdown vs valid:',
  parseSafe: 'Parse (safe)',
  parseStrict: 'Parse (strict)',
  assertLoose: 'Assert (loose)',
  assertStrict: 'Assert (strict)',
  min: 'min',
  p5: 'p5',
  median: 'median',
  p95: 'p95',
  max: 'max',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: 'How it works',
  howDescription: 'Each library is benchmarked in an isolated process. Score is the normalized geometric mean of valid tests — the library with the highest geomean gets 100. Bars show operations per second (higher = better). Margin (±%) is the 95% confidence interval. In invalid mode, slowdown shows the performance penalty of error handling.',
  tests: 'Tests',
} as const satisfies LocaleSchema;
