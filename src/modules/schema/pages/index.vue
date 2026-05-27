<script lang="ts" setup>
import { currentLocale, localeNames, t } from '@lang';
import { computedAsync } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { computed, ref, shallowRef } from 'vue';
import LibraryResult from '@/schema/components/LibraryResult.vue';
import RuntimeRadio from '@/schema/components/RuntimeRadio.vue';
import TestFilters from '@/schema/components/TestFilters.vue';
import { loadAllByRuntime } from '@/schema/results';

type Mode = 'all' | 'valid' | 'invalid';
type SortBy = 'fastest' | 'popularity';

const TYPES = ['parseSafe', 'parseStrict', 'assertLoose', 'assertStrict'] as const;

const loading = shallowRef(false);
const runtime = useRouteQuery<string | undefined>('runtime', undefined);
const platforms = computedAsync(
  () => loadAllByRuntime(runtime.value),
  [],
  loading,
);

const mode = useRouteQuery<Mode>('mode', 'valid');
const sortBy = ref<SortBy>('fastest');

const testsRaw = useRouteQuery<string>('tests', '');

const enabled = computed({
  get: () => new Set(testsRaw.value ? testsRaw.value.split(',') : TYPES),
  set: (s) => { testsRaw.value = s.size === TYPES.length ? '' : [...s].join(','); },
});

function hasType(name: string): boolean {
  return (TYPES as readonly string[]).some(t => name.startsWith(t) && enabled.value.has(t));
}

// ---------------------------------------------------------------------------
// Libraries + platform meta
// ---------------------------------------------------------------------------

const libraries = computed(() => {
  const plat = platforms.value[0];
  return plat?.libraries ?? [];
});

const platformMeta = computed(() => platforms.value[0]?.meta);

// ---------------------------------------------------------------------------
// Normalized score
// ---------------------------------------------------------------------------

const scores = computed(() => {
  const geomeans = new Map<string, number>();

  for (const lib of libraries.value) {
    const applicable = lib.summary.results.filter((r) => {
      if (!hasType(r.name)) return false;
      if (mode.value === 'all') return true;
      return mode.value === 'valid' ? !r.name.includes('invalid') : r.name.includes('invalid');
    });
    if (applicable.length === 0) continue;
    const product = applicable.reduce((p, r) => p * r.ops, 1);
    geomeans.set(lib.name, product ** (1 / applicable.length));
  }

  const max = Math.max(...geomeans.values(), 1);
  const result = new Map<string, number>();
  for (const [name, gm] of geomeans) {
    result.set(name, Math.round((gm / max) * 100));
  }

  return result;
});

// ---------------------------------------------------------------------------
// Sorted libraries
// ---------------------------------------------------------------------------

const sorted = computed(() => {
  const list = [...libraries.value];
  if (sortBy.value === 'fastest') {
    return list.sort((a, b) => {
      const sa = scores.value.get(a.name) ?? 0;
      const sb = scores.value.get(b.name) ?? 0;
      return sb - sa;
    });
  }
  return list.sort((a, b) => {
    const da = a.downloads ?? 0;
    const db = b.downloads ?? 0;
    return db - da || a.name.localeCompare(b.name);
  });
});
</script>

<template>
  <main class="mx-a p-5 container flex gap-5">
    <!-- Sidebar -->
    <aside class="flex shrink-0 flex-col gap-4 w-52">
      <select
        :value="currentLocale"
        class="text-xs text-neutral-300 px-2 py-1 card cursor-pointer"
        @change="currentLocale = ($event.target as HTMLSelectElement).value as any"
      >
        <option
          v-for="loc in localeNames"
          :key="loc.code"
          :value="loc.code"
          v-text="loc.name"
        />
      </select>

      <RuntimeRadio />

      <!-- Test type filters -->
      <TestFilters />

      <!-- How it works -->
      <section class="text-xs text-neutral-400 leading-relaxed p-4 card">
        <h3 class="text-neutral-200 font-600 mb-2" v-text="t('howItWorks')" />
        <p class="text-pretty" v-text="t('howDescription')" />
      </section>
    </aside>

    <!-- Main -->
    <div class="flex-1">
      <main class="p-5 card gap-3 grid">
        <header class="flex gap-3 items-center">
          <h1 class="bold text-xl" v-text="t('performance')" />

          <button
            class="text-xs ml-a px-2 py-1 rounded bg-neutral-800 flex gap-1 cursor-pointer transition-colors items-center hover:bg-neutral-700"
            @click="sortBy = sortBy === 'fastest' ? 'popularity' : 'fastest'"
          >
            <span v-text="t(sortBy)" />
          </button>

          <div class="text-xs rounded bg-neutral-800 flex">
            <button
              v-for="m in (['all', 'valid', 'invalid'] as Mode[])"
              :key="m"
              class="px-2.5 py-1 rounded cursor-pointer transition-colors"
              :class="mode === m ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-neutral-200'"
              @click="mode = m"
              v-text="t(m)"
            />
          </div>
        </header>

        <div
          v-if="platformMeta"
          class="text-xs text-neutral-500 font-600 gap-1"
          v-text="`${platformMeta.env.cpu} ${platformMeta.env.os.name} ${platformMeta.env.os.version} ${platformMeta.env.arch} ${platformMeta.env.memory} MB`"
        />

        <LibraryResult
          v-for="lib in sorted"
          :key="lib.name"
          :library="lib"
          :mode="mode"
          :score="scores.get(lib.name)"
          :downloads="lib.downloads"
          :enabled="enabled"
        />
      </main>
    </div>
  </main>
</template>
