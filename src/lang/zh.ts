import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('zh-CN', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('zh-CN', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: '运行时',
  performance: '性能',
  library: '库',
  version: '版本',
  ops: (value: number) => `${ops.format(value)} ops/s`,
  nanos: (value: number) => {
    const ns = value * 1e9;
    if (ns >= 100) return `${Math.round(ns)}ns`;
    if (ns >= 1) return `${ns.toFixed(1)}ns`;
    return `${(ns * 1000).toFixed(0)}ps`;
  },
  all: '全部',
  valid: '有效',
  invalid: '无效',
  fastest: '速度',
  popularity: '流行度',
  downloads: (value: number) => `${dw.format(value)}/周`,
  avgSlowdown: '平均劣化 vs 有效:',
  parseSafe: '解析 (safe)',
  parseStrict: '解析 (strict)',
  assertLoose: '断言 (loose)',
  assertStrict: '断言 (strict)',
  min: '最小',
  p5: 'p5',
  median: '中位数',
  p95: 'p95',
  max: '最大',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: '计算方式',
  howDescription: '每个库在独立进程中测试。分数是有效测试的归一化几何平均值 — geomean 最高的库得 100。条形图显示每秒操作数（越高越好）。误差 (±%) 是 95% 置信区间。无效模式下，slowdown 显示错误处理的性能损失。',
  tests: '测试',
} as const satisfies LocaleSchema;
