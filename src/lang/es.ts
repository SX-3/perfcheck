import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('es-ES', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('es-ES', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'runtime',
  performance: 'rendimiento',
  library: 'biblioteca',
  version: 'versión',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1).replace('.', ',')}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: 'todo',
  valid: 'válido',
  invalid: 'inválido',
  fastest: 'velocidad',
  popularity: 'popularidad',
  downloads: (v: number) => `${dw.format(v).replace('.', ',')}/sem`,
  avgSlowdown: 'Promedio caída vs válido:',
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
  howItWorks: 'Cómo funciona',
  howDescription: 'Cada biblioteca se prueba en un proceso aislado. El score es la media geométrica normalizada de tests válidos — la biblioteca con el geomean más alto obtiene 100. Las barras muestran operaciones por segundo (más = mejor). El margen (±%) es el intervalo de confianza del 95 %. En modo inválido, slowdown muestra la penalización por manejo de errores.',
  tests: 'Tests',
} as const satisfies LocaleSchema;
