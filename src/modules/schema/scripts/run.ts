import type { PlatformMeta, PlatformResult } from '../benchmarks/data.ts';
import { exec } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { arch, cpus, version as osVersion, platform, totalmem } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { gunzipSync, gzipSync } from 'node:zlib';

const execAsync = promisify(exec);

const isBun = typeof Bun !== 'undefined';
const BIN = isBun ? 'bun' : 'npx tsx';

const CASES_DIR = resolve(import.meta.dirname ?? '', '..', 'cases');
const RESULTS_DIR = resolve(import.meta.dirname ?? '', '..', 'results');
const RUNNER = resolve(import.meta.dirname ?? '', 'runner.ts');

function buildMeta(runtimeName: string, runtimeVersion: string): PlatformMeta {
  return {
    runtime: { name: runtimeName as 'bun' | 'node', version: runtimeVersion },
    timestamp: Date.now(),
    env: {
      cpu: cpus()[0]?.model.trim() ?? 'unknown',
      memory: Math.round(totalmem() / 1024 / 1024),
      arch: arch(),
      os: { name: platform(), version: osVersion() },
    },
  };
}

async function run() {
  mkdirSync(RESULTS_DIR, { recursive: true });

  // 1. Run each library in its own process
  const names: string[] = [];
  for (const name of readdirSync(CASES_DIR)) {
    const entry = resolve(CASES_DIR, name, 'index.ts');
    if (!existsSync(entry)) continue;
    names.push(name);

    console.log(`RUN: 🔬 ${name}`);
    try {
      const { stdout, stderr } = await execAsync(`${BIN} ${RUNNER} ${name}`);
      console.log(stdout.trimEnd());
      if (stderr) console.error(stderr.trimEnd());
    }
    catch (e) {
      console.error(`RUN: ❌ ${name}:`, e);
    }
  }

  if (names.length === 0) {
    console.log('RUN: no cases found');
    return;
  }

  // 2. Merge per-library temp files into platform files
  for (const name of names) {
    // Fetch npm downloads once per library
    let dls: number | undefined;
    try {
      // Read meta.json for package name (needed for scoped packages)
      const metaPath = resolve(CASES_DIR, name, 'meta.json');
      const pkg = existsSync(metaPath)
        ? (JSON.parse(readFileSync(metaPath, 'utf-8')) as { package: string }).package
        : name;
      const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
      dls = ((await res.json()) as { downloads: number }).downloads;
    }
    catch { /* offline */ }

    const tempFiles = readdirSync(RESULTS_DIR).filter(f =>
      f.startsWith(`${name}_`) && f.endsWith('.json.gz'),
    );

    for (const tempFile of tempFiles) {
      // e.g. "sury_bun_1.3.14.json.gz" → runtimePart = "bun_1.3.14"
      const runtimePart = tempFile.slice(name.length + 1, -8);
      const platformFile = `${runtimePart}.json.gz`;

      const temp = JSON.parse(
        gunzipSync(readFileSync(resolve(RESULTS_DIR, tempFile))).toString(),
      ) as { meta: { library: { name: string; version: string }; npm?: string; github?: string }; summary: any };

      const platformPath = resolve(RESULTS_DIR, platformFile);
      const [rtName, rtVersion] = runtimePart.split('_');

      let platform: PlatformResult;
      if (existsSync(platformPath)) {
        platform = JSON.parse(
          gunzipSync(readFileSync(platformPath)).toString(),
        ) as PlatformResult;
        const idx = platform.libraries.findIndex((l: any) => l.name === temp.meta.library.name);
        const entry = {
          name: temp.meta.library.name,
          version: temp.meta.library.version,
          summary: temp.summary,
          npm: temp.meta.npm,
          github: temp.meta.github,
          downloads: dls,
        };
        if (idx === -1) platform.libraries.push(entry);
        else platform.libraries[idx] = entry;
      }
      else {
        platform = {
          meta: buildMeta(rtName!, rtVersion!),
          libraries: [{
            name: temp.meta.library.name,
            version: temp.meta.library.version,
            summary: temp.summary,
            npm: temp.meta.npm,
            github: temp.meta.github,
            downloads: dls,
          }],
        };
      }

      writeFileSync(platformPath, gzipSync(JSON.stringify(platform)));
      rmSync(resolve(RESULTS_DIR, tempFile));
      console.log(`RUN: 💾 ${platformFile} ← ${name}`);
    }
  }
}

if (import.meta.main) await run();
