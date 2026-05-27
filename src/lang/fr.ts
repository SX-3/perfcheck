import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('fr-FR', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'runtime',
  performance: 'performance',
  library: 'bibliothèque',
  version: 'version',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1).replace('.', ',')}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: 'tout',
  valid: 'valide',
  invalid: 'invalide',
  fastest: 'vitesse',
  popularity: 'popularité',
  downloads: (v: number) => `${dw.format(v).replace('.', ',')}/sem`,
  avgSlowdown: 'Ralentissement moyen vs valide :',
  parseSafe: 'Parse (safe)',
  parseStrict: 'Parse (strict)',
  assertLoose: 'Assert (loose)',
  assertStrict: 'Assert (strict)',
  min: 'min',
  p5: 'p5',
  median: 'médiane',
  p95: 'p95',
  max: 'max',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: 'Fonctionnement',
  howDescription: 'Chaque bibliothèque est testée dans un processus isolé. Le score est la moyenne géométrique normalisée des tests valides — la bibliothèque avec le geomean le plus élevé obtient 100. Les barres montrent les opérations par seconde (plus = mieux). La marge (±%) est l\'intervalle de confiance à 95 %. En mode invalide, le slowdown montre la pénalité de gestion des erreurs.',
  tests: 'Tests',
} as const satisfies LocaleSchema;
