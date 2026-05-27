import type { Case } from './case.ts';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { clearCases, getCases } from './case.ts';
import { EXTRA_KEYS, INVALID, VALID } from './data.ts';

const CASES_DIR = resolve(import.meta.dirname ?? '', '..', 'cases');

// ---------------------------------------------------------------------------
// Collect all cases from every module directory (snapshot to avoid mutation
// from the shared mutable array in case.ts).
// ---------------------------------------------------------------------------
interface CaseEntry {
  name: string;
  type: Case['type'];
  runner: Case['runner'];
}

const modules = new Map<string, CaseEntry[]>();

for (const name of readdirSync(CASES_DIR)) {
  const entry = resolve(CASES_DIR, name, 'index.ts');
  if (!existsSync(entry)) continue;
  clearCases();
  try {
    await import(pathToFileURL(entry).href);
  }
  catch (e) {
    console.warn(`⚠ ${name}:`, e instanceof Error ? e.message : e);
    continue;
  }
  modules.set(
    name,
    getCases().map(c => ({ name, type: c.type, runner: c.runner as CaseEntry['runner'] })),
  );
}

// ---------------------------------------------------------------------------
// Grouped by library (module name) → case type
// ---------------------------------------------------------------------------
describe.each(
  [...modules].map(([name, cases]) => ({ name, cases })),
)('$name', ({ cases }) => {
  for (const c of cases) {
    switch (c.type) {
      case 'parseSafe': {
        it(`${c.type} parse and return valid data`, () => {
          const result = c.runner(VALID);
          expect(result).toStrictEqual(VALID);
        });

        it(`${c.type} throw on invalid data`, () => {
          expect(() => c.runner(INVALID), 'Invalid data should throw').toThrow();
        });

        it(`${c.type} strip unknown keys`, () => {
          const result = c.runner(EXTRA_KEYS);
          expect(result, 'Unknown keys should be stripped').toStrictEqual(VALID);
        });
        break;
      }
      case 'parseStrict': {
        it('return value on valid result', () => {
          expect(c.runner(VALID)).toStrictEqual(VALID);
        });

        it(`${c.type} should throw on unknown keys`, () => {
          expect(() => c.runner(EXTRA_KEYS), 'Unknown keys should throw').toThrow();
        });
        break;
      }
      case 'assertLoose': {
        it(`${c.type} should not throw on valid`, () => {
          expect(() => c.runner(EXTRA_KEYS)).not.toThrow();
          expect(c.runner(EXTRA_KEYS)).toBe(true);
        });

        it(`${c.type} should throw on invalid`, () => {
          expect(() => c.runner(INVALID), 'Invalid data should throw').toThrow();
        });
        break;
      }
      case 'assertStrict': {
        it(`${c.type} should not throw on valid`, () => {
          expect(() => c.runner(VALID)).not.toThrow();
        });

        it(`${c.type} should throw on invalid`, () => {
          expect(() => c.runner(INVALID), 'Invalid data should throw').toThrow();
        });

        it(`${c.type} throw on extra keys`, () => {
          expect(() => c.runner(EXTRA_KEYS), 'Extra keys should throw').toThrow();
        });
        break;
      }
    }
  }
});
