import type { CaseMeta } from '../benchmarks/data.ts';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { clearCases, run } from '../benchmarks/case.ts';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: runner.ts <case-slug>');
  process.exit(1);
}

const caseDir = resolve(import.meta.dirname ?? '', '..', 'cases', slug);
const entry = resolve(caseDir, 'index.ts');
const metaPath = resolve(caseDir, 'meta.json');

// Read optional meta.json (package name for scoped packages, npm/github links)
let packageName = slug;
let npm: string | undefined;
let github: string | undefined;

if (existsSync(metaPath)) {
  const meta: CaseMeta = JSON.parse(readFileSync(metaPath, 'utf-8'));
  packageName = meta.package;
  npm = meta.npm;
  github = meta.github;
}

clearCases();
await import(pathToFileURL(entry).href);
await run(packageName, resolve(import.meta.dirname ?? '', '..', 'results'), slug, { npm, github });
