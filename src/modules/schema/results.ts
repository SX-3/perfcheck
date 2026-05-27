import type { PlatformResult } from './benchmarks/data';

const entries = Object.entries(import.meta.glob<string>('./results/**/*.json.gz', { query: '?url', eager: true, import: 'default' }))
  .map(([path, url]) => {
    const file = path.split('/').at(-1)!;
    const [runtime, runtimeVersion] = file.replace('.json.gz', '').split('_');
    return { runtime, runtimeVersion, url };
  });

interface Runtime {
  name: string;
  version: string;
  icon: string;
}

export const runtimes = entries.reduce((all, e) => {
  if (!all.some(r => r.name === e.runtime && r.version === e.runtimeVersion)) {
    all.push({
      name: e.runtime,
      version: e.runtimeVersion,
      icon: e.runtime === 'node'
        ? 'i-logos-nodejs-icon-alt'
        : e.runtime === 'bun'
          ? 'i-logos-bun'
          : 'i-logos-deno',
    });
  }
  return all;
}, [] as Runtime[]);

async function fetchDecompress(url: string): Promise<PlatformResult> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  // Try plain JSON first (server handles Content-Encoding: gzip, e.g. Vite dev)
  try {
    return JSON.parse(new TextDecoder().decode(buffer));
  } catch { /* raw gzip — decompress manually */ }

  // Manual decompress (server serves .gz as binary, e.g. GitHub Pages)
  const blob = new Blob([buffer]);
  const ds = new DecompressionStream('gzip');
  const decompressedBuffer = await new Response(blob.stream().pipeThrough(ds)).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(decompressedBuffer));
}

export async function loadAllByRuntime(runtime?: string): Promise<PlatformResult[]> {
  const [name, version] = runtime?.split('_') ?? [runtimes[0]?.name, runtimes[0]?.version];
  if (!name || !version) return [];

  const match = entries.filter(e => e.runtime === name && e.runtimeVersion === version);
  const responses = await Promise.allSettled(match.map(e => fetchDecompress(e.url)));

  return responses
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}
