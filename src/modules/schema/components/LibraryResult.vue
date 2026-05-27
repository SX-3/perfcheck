<script setup lang="ts">
import type { LibraryEntry } from '../benchmarks/data';
import { t } from '@lang';
import { computed } from 'vue';
import BenchmarkBar from './BenchmarkBar.vue';
import TransitionList from './TransitionList.vue';

const props = defineProps<{
  library: LibraryEntry;
  mode: 'all' | 'valid' | 'invalid';
  score?: number;
  downloads?: number;
  sortBy?: 'fastest' | 'popularity';
  enabled?: Set<string>;
}>();

const sorted = computed(() => {
  const order = TYPES as readonly string[];
  return [...props.library.summary.results].sort((a, b) => {
    const ai = order.findIndex(o => a.name.startsWith(o));
    const bi = order.findIndex(o => b.name.startsWith(o));
    if (ai !== bi) return ai - bi;
    return a.name.includes('invalid') ? 1 : -1;
  });
});

const filtered = computed(() => {
  let list = sorted.value;
  if (props.mode !== 'all') {
    list = list.filter(r => props.mode === 'valid' ? !r.name.includes('invalid') : r.name.includes('invalid'));
  }
  if (props.enabled) {
    list = list.filter(r => (TYPES as readonly string[]).some(t => r.name.startsWith(t) && props.enabled!.has(t)));
  }
  return list;
});

const maxOps = computed(() => Math.max(...sorted.value.map(r => r.ops), 1));

/** Per-type slowdown: how much slower is the invalid path vs the valid one (%). */
const slowdown = computed(() => {
  const map = new Map<string, number>();
  for (const type of TYPES) {
    const valid = sorted.value.find(r => r.name.startsWith(type) && !r.name.includes('invalid'));
    const invalid = sorted.value.find(r => r.name.startsWith(type) && r.name.includes('invalid'));
    if (valid && invalid) {
      map.set(type, (1 - invalid.ops / valid.ops) * 100);
    }
  }
  return map;
});

/** Arithmetic mean of slowdowns across all test types. */
const avgSlowdown = computed(() => {
  const values = [...slowdown.value.values()];
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
});

/** Geometric mean of *filtered* results — depends on mode. */
const geomean = computed(() => {
  if (filtered.value.length === 0) return 0;
  const product = filtered.value.reduce((p, r) => p * r.ops, 1);
  return product ** (1 / filtered.value.length);
});

function getType(name: string): string {
  return (TYPES as readonly string[]).find(t => name.startsWith(t)) ?? 'parseSafe';
}
</script>

<script lang="ts">
const COLORS: Record<string, string> = {
  parseSafe: '#60a5fa',
  parseStrict: '#f59e0b',
  assertLoose: '#34d399',
  assertStrict: '#f87171',
};

const TYPES = ['parseSafe', 'parseStrict', 'assertLoose', 'assertStrict'] as const;
</script>

<template>
  <section class="border border-neutral-800 rounded-lg overflow-hidden">
    <!-- Header -->
    <header class="px-4 py-3 border-b border-neutral-800 flex flex-wrap gap-x-3 gap-y-1 items-center">
      <h2 class="text-xl font-600">
        <a
          v-if="library.github"
          :href="library.github"
          target="_blank"
          class="transition-colors hover:text-neutral-200"
          v-text="library.name"
        />
        <span v-else v-text="library.name" />
      </h2>
      <span class="text-xs text-neutral-400 font-500" v-text="library.version" />
      <span
        v-if="downloads !== undefined"
        class="text-xs text-neutral-500"
        v-text="t('downloads', downloads)"
      />
      <span class="text-xs ml-a flex gap-3 items-center">
        <a v-if="library.npm" :href="library.npm" target="_blank" class="i-logos-npm-icon text-lg" />
        <a v-if="library.github" :href="library.github" target="_blank" class="i-bi-github text-lg text-white" />
        <span class="text-neutral-400">
          <span class="text-neutral-200 font-600" v-text="t('ops', geomean)" />
        </span>
        <span
          v-if="score"
          class="font-600 px-1.5 py-0.5 rounded"
          :class="score >= 95 ? 'bg-green-900/60 text-green-400' : 'bg-neutral-700 text-neutral-300'"
        >{{ score }}</span>
      </span>
    </header>

    <!-- Avg slowdown (invalid mode only) -->
    <div
      v-if="props.mode === 'invalid'"
      class="text-xs text-amber-400 px-4 py-2 border-b border-neutral-800 flex gap-2 items-center"
    >
      <span>{{ t('avgSlowdown') }}</span>
      <span class="font-600">{{ avgSlowdown.toFixed(1) }}%</span>
    </div>

    <!-- Bars -->
    <TransitionList tag="div" class="px-4 py-3 gap-2 grid">
      <BenchmarkBar
        v-for="result in filtered"
        :key="result.name"
        :result="result"
        :max-ops="maxOps"
        :mode="props.mode"
        :color="COLORS[getType(result.name)]"
      />
    </TransitionList>
  </section>
</template>
