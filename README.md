# [PrefCheck](https://sx-3.github.io/perfcheck/)

> Benchmarks for runtime type validation libraries.

[Website](https://sx-3.github.io/perfcheck/)

## Test cases

| Type | Valid | Invalid |
|------|-------|---------|
| `parseSafe` | Parses and returns cleaned data | Throws on invalid |
| `parseStrict` | Like safe, but rejects unknown keys | Throws on unknown keys |
| `assertLoose` | Returns `true` without parsing | Throws on invalid |
| `assertStrict` | Returns `true`, rejects extra keys | Throws on invalid or extra keys |

## Score

The score is the **normalized geometric mean** of valid tests — the industry standard for benchmarking (used by SPEC CPU, Phoronix, AnandTech). Each test contributes equal weight.

- Library with the highest geomean → **100**
- Others scaled proportionally
- Bars show **operations per second** (higher = better)
- Margin (±%) is the 95% confidence interval

## Quick start

```bash
# Install
npm install

# Run benchmarks
bun run schema:run:bun   # Bun
npm run schema:run       # Node (via tsx)
```

Results are saved to `src/modules/schema/results/` as per-platform gzipped JSON files.

```bash
# Dev server
npm run dev
```

Open `http://localhost:5173` — select a runtime, toggle valid/invalid, filter by test type.

## Adding a library

1. Create a directory: `src/modules/schema/cases/<slug>/`
2. Add `meta.json`:

```json
{
  "package": "my-lib",
  "npm": "https://www.npmjs.com/package/my-lib",
  "github": "https://github.com/user/my-lib"
}
```
3. (Optional) Add build.ts to compile the library.
4. Add `index.ts` — call `createCase()` for each scenario:

```ts
import { createCase } from '../../benchmarks/case.ts';
import { parse, assert } from 'my-lib';

createCase('parseSafe', () => (data) => parse(data));
createCase('parseStrict', () => (data) => parse(data, { strict: true }));
createCase('assertLoose', () => (data) => { assert(data); return true; });
createCase('assertStrict', () => (data) => { assert(data, { strict: true }); return true; });
```

5. Run test for check output is correct: `npm run test`

## CI/CD

- **Benchmark workflow** — runs on push to `main`, weekly schedule, and manual trigger. Tests Node 18/20/22/24 + Bun 1.1/1.2/latest. Results are committed back to the repo.
- **Deploy workflow** — builds and deploys to GitHub Pages when results change.
- **Renovate** — auto-updates dependencies every Monday.
