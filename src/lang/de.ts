import type { LocaleSchema } from '@sx3/i18n';

const ops = new Intl.NumberFormat('de-DE', { compactDisplay: 'short', maximumFractionDigits: 0 });
const dw = new Intl.NumberFormat('de-DE', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });

export default {
  runtime: 'Laufzeit',
  performance: 'Leistung',
  library: 'Bibliothek',
  version: 'Version',
  ops: (v: number) => `${ops.format(v)} ops/s`,
  nanos: (v: number) => {
    const n = v * 1e9;
    if (n >= 100) return `${Math.round(n)}ns`;
    if (n >= 1) return `${n.toFixed(1).replace('.', ',')}ns`;
    return `${(n * 1000).toFixed(0)}ps`;
  },
  all: 'alle',
  valid: 'gültig',
  invalid: 'ungültig',
  fastest: 'Geschw.',
  popularity: 'Beliebtheit',
  downloads: (v: number) => `${dw.format(v).replace('.', ',')}/Wo`,
  avgSlowdown: 'Ø Verlangsamung vs gültig:',
  parseSafe: 'Parse (safe)',
  parseStrict: 'Parse (strict)',
  assertLoose: 'Assert (loose)',
  assertStrict: 'Assert (strict)',
  min: 'min',
  p5: 'p5',
  median: 'Median',
  p95: 'p95',
  max: 'max',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: 'Berechnung',
  howDescription: 'Jede Bibliothek wird in einem isolierten Prozess getestet. Der Score ist das normalisierte geometrische Mittel der gültigen Tests — die Bibliothek mit dem höchsten Geomean erhält 100. Balken zeigen Operationen pro Sekunde (höher = besser). Die Marge (±%) ist das 95%-Konfidenzintervall. Im ungültigen Modus zeigt Slowdown die Strafe für Fehlerbehandlung.',
  tests: 'Tests',
} as const satisfies LocaleSchema;
