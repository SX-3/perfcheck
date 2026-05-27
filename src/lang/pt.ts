import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('pt-BR', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'runtime',
  performance: 'desempenho',
  library: 'biblioteca',
  version: 'versão',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1).replace('.', ',')}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: 'tudo',
  valid: 'válido',
  invalid: 'inválido',
  fastest: 'velocidade',
  popularity: 'popularidade',
  downloads: (v: number) => `${dw.format(v).replace('.', ',')}/sem`,
  avgSlowdown: 'Queda média vs válido:',
  parseSafe: 'Parse (safe)',
  parseStrict: 'Parse (strict)',
  assertLoose: 'Assert (loose)',
  assertStrict: 'Assert (strict)',
  min: 'mín',
  p5: 'p5',
  median: 'mediana',
  p95: 'p95',
  max: 'máx',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: 'Como funciona',
  howDescription: 'Cada biblioteca é testada em um processo isolado. O score é a média geométrica normalizada dos testes válidos — a biblioteca com o maior geomean recebe 100. As barras mostram operações por segundo (mais = melhor). A margem (±%) é o intervalo de confiança de 95 %. No modo inválido, slowdown mostra a penalidade do tratamento de erros.',
  tests: 'Testes',
} as const satisfies LocaleSchema;
