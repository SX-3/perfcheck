import type { PlatformResult } from './data';

const entries = Object.entries(
  import.meta.glob<string>('../results/**/*.json.gz', { query: '?url', eager: true, import: 'default' }),
).map(([path, url]) => {
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

export async function loadAllByRuntime(runtime?: string): Promise<PlatformResult[]> {
  const [name, version] = runtime?.split('_') ?? [runtimes[0]?.name, runtimes[0]?.version];
  if (!name || !version) return [];

  const match = entries.filter(e => e.runtime === name && e.runtimeVersion === version);
  const responses = await Promise.allSettled(match.map(e => fetch(e.url)));
  const parsed = await Promise.allSettled(
    responses
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value.json() as Promise<PlatformResult>),
  );
  return parsed
    .filter((r): r is PromiseFulfilledResult<PlatformResult> => r.status === 'fulfilled')
    .map(r => r.value);
}
