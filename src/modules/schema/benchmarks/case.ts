/* eslint-disable no-console */
import type { PlatformMeta } from './data.ts';
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { arch, cpus, version as osVersion, platform, totalmem } from 'node:os';
import { resolve } from 'node:path';
import process from 'node:process';
import { gzipSync } from 'node:zlib';
import { add, complete, cycle, suite } from 'benny';
import { INVALID, VALID } from './data.ts';

const require = createRequire(import.meta.url);

export type CaseType = 'parseSafe' | 'parseStrict' | 'assertLoose' | 'assertStrict';

type ParseBuilder = () => (data: unknown) => any;
type AssertBuilder = () => (data: unknown) => true;
export interface Case {
  type: CaseType;
  runner: ReturnType<ParseBuilder> | ReturnType<AssertBuilder>;
}

const cases: Case[] = [];

export function createCase(
  type: 'parseSafe' | 'parseStrict',
  builder: ParseBuilder,
): void;
export function createCase(
  type: 'assertLoose' | 'assertStrict',
  builder: AssertBuilder,
): void;
export function createCase(
  type: CaseType,
  builder: AssertBuilder | ParseBuilder,
): void {
  cases.push({ type, runner: builder() });
}

export function clearCases() {
  cases.length = 0;
}

export function getCases(): readonly Case[] {
  return cases;
}

export async function run(module: string, resultsDir: string, slug: string, caseMeta?: { npm?: string; github?: string }) {
  let version = '?';
  try {
    version = require(`${module}/package.json`).version;
  }
  catch {
    return console.error(`RUN: ⚠ ${module} not installed`);
  }

  const meta: PlatformMeta = {
    runtime: {
      name: process.versions.bun ? 'bun' : 'node',
      version: process.versions.bun ?? process.version.slice(1),
    },
    timestamp: Date.now(),
    env: {
      cpu: cpus()[0]?.model.trim() ?? 'unknown',
      memory: Math.round(totalmem() / 1024 / 1024),
      arch: arch(),
      os: { name: platform(), version: osVersion() },
    },
  };

  // Temp file — use slug (filesystem-safe) not module (may contain @/)
  const filename = `${slug}_${meta.runtime.name}_${meta.runtime.version}.json.gz`;
  const filepath = resolve(resultsDir, filename);

  console.log(`RUN: 🔬 ${module} ${version}`);

  const summary = await suite(
    module,
    ...cases.flatMap(c => [
      add(`${c.type} - valid`, () => c.runner(VALID)),
      add(`${c.type} - invalid`, () => {
        try {
          c.runner(INVALID);
        }
        catch {}
      }),
    ]),
    cycle(),
    complete(),
  );

  const gzipped = gzipSync(JSON.stringify({
    meta: { library: { name: module, version }, npm: caseMeta?.npm, github: caseMeta?.github },
    summary,
  }));
  writeFileSync(filepath, gzipped);
  console.log(`RUN: 💾 ${filename}`);
}
