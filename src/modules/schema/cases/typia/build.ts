import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const cwd = import.meta.dirname ?? '';
const tsconfig = resolve(cwd, 'tsconfig.json');
const outDir = resolve(cwd, 'build');

rmSync(outDir, { recursive: true, force: true });
execSync(`npx tsc -p "${tsconfig}"`, { cwd, stdio: 'inherit' });
// console.log('BUILD: ✅ typia → build/')
