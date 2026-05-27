import { exec } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

const CASES_DIR = resolve(import.meta.dirname ?? '', '..', 'cases');

export async function build(): Promise<void> {
  for (const library of readdirSync(CASES_DIR)) {
    const buildFile = resolve(CASES_DIR, library, 'build.ts');
    if (!existsSync(buildFile))
      continue;

    console.log(`BUILD: 🔨 ${library}`);
    exec(`node ${buildFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`BUILD: ❌ ${library}:`, error);
        process.exit(1);
      }
      console.log(stdout);
      if (stderr)
        console.error(stderr);
    });
  }
}

if (import.meta.main)
  await build();
