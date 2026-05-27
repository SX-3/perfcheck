import type { LocaleSchema } from '@sx3/i18n';

export default {
  runtime: 'рантайм',
  performance: 'производительность',
  library: 'библиотека',
  version: 'версия',
  nanos: (value: number) => {
    const ns = value * 1e9;
    if (ns >= 100) return `${Math.round(ns)} нс`;
    if (ns >= 1) return `${ns.toFixed(1).replace('.', ',')} нс`;
    return `${Math.round(ns * 1000)} пс`;
  },
  all: 'все',
  valid: 'валидные',
  invalid: 'невалидные',
  fastest: 'скорость',
  popularity: 'популярность',
  downloads: (value: number) => {
    const fmt = new Intl.NumberFormat('ru-RU', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 });
    return `${fmt.format(value)}/нед`;
  },
  avgSlowdown: 'Среднее падение vs валидные:',
  parseSafe: 'Парсинг (безопасный)',
  parseStrict: 'Парсинг (строгий)',
  assertLoose: 'Assert (loose)',
  assertStrict: 'Assert (strict)',
  min: 'мин',
  p5: 'p5',
  median: 'медиана',
  p95: 'p95',
  max: 'макс',
  stddev: 'σ',
  samples: (n: number) => `n=${n}`,
  howItWorks: 'Как считается',
  howDescription: 'Каждая библиотека тестируется в изолированном процессе. Очки — это нормированное геометрическое среднее валидных тестов: библиотека с высшим geomean получает 100. Бары показывают операций в секунду (больше = лучше). Погрешность (±%) — 95% доверительный интервал. В режиме «невалидные» slowdown показывает штраф за обработку ошибок.',
  tests: 'Тесты',
} as const satisfies LocaleSchema;
