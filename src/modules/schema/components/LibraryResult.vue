<script setup lang="ts">
import type { LibraryEntry } from '../benchmarks/data';
import { t } from '@lang';
import { computed } from 'vue';
import { useFilters } from '../composables/useFilters';
import { BENCHMARK_COLORS as COLORS, BENCHMARK_TYPES as TYPES } from '../const';
import BenchmarkBar from './BenchmarkBar.vue';
import TransitionList from './TransitionList.vue';

const props = defineProps<{
  library: LibraryEntry;
  mode: 'all' | 'valid' | 'invalid';
  score?: number;
  downloads?: number;
  globalMaxOps: Record<string, number>;
}>();

const filters = useFilters();

const sorted = computed(() => {
  const results = props.library.summary.results;
  if (!filters.value) return results;
  return results.filter((result) => {
    const [prefix, mode] = result.name.split(' - ');
    return filters.value.includes(prefix) && (props.mode === 'all' || mode === props.mode);
  });
});

/** Per-benchmark max across all libraries, falling back to 1. */
function maxOpsFor(name: string): number {
  return props.globalMaxOps[name] ?? 1;
}

/** Geometric mean of *filtered* results — depends on mode. */
const geomean = computed(() => {
  if (sorted.value.length === 0) return 0;
  const product = sorted.value.reduce((p, r) => p * r.ops, 1);
  return product ** (1 / sorted.value.length);
});

function getType(name: string): any {
  return (TYPES as readonly string[]).find(t => name.startsWith(t)) ?? TYPES[0];
}
</script>

<template>
  <section class="border border-neutral-800 rounded-lg shadow-lg overflow-hidden">
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

    <!-- Bars -->
    <TransitionList tag="div" class="px-4 py-3 gap-2 grid">
      <BenchmarkBar
        v-for="result in sorted"
        :key="result.name"
        :result="result"
        :max-ops="maxOpsFor(result.name)"
        :mode="props.mode"
        :color="COLORS[getType(result.name)]"
      />
    </TransitionList>
  </section>
</template>
