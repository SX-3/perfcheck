<script setup lang="ts">
import type { CaseResultWithDiff } from 'benny/lib/internal/common-types';
import { t } from '@lang';
import { computed, ref } from 'vue';
import TransitionExpand from './TransitionExpand.vue';

const props = defineProps<{
  result: CaseResultWithDiff;
  maxOps: number;
  mode: 'all' | 'valid' | 'invalid';
  color: string;
}>();

// ---------------------------------------------------------------------------
// Distribution histogram
// ---------------------------------------------------------------------------

const BUCKETS = 32;

const hist = computed(() => {
  const samples = [...props.result.details.sampleResults].sort((a, b) => a - b);
  const min = samples[0]!;
  const max = samples.at(-1)!;
  const range = max - min || 1;
  const step = range / BUCKETS;
  const buckets = Array.from<number>({ length: BUCKETS }).fill(0);
  for (const s of samples) {
    const i = Math.min(Math.floor((s - min) / step), BUCKETS - 1);
    buckets[i]++;
  }
  const maxCount = Math.max(...buckets, 1);
  const p5 = samples[Math.floor(samples.length * 0.05)]!;
  const p50 = samples[Math.floor(samples.length * 0.50)]!;
  const p95 = samples[Math.floor(samples.length * 0.95)]!;
  return { buckets, min, max, maxCount, p5, p50, p95 };
});

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const expanded = ref(false);
</script>

<template>
  <div class="grid">
    <div class="text-sm py-0.5 flex gap-3 cursor-pointer items-center" @click="expanded = !expanded">
      <!-- Bar track -->
      <div class="rounded-sm bg-neutral-800 flex-1 h-6 relative">
        <div
          class="rounded-sm h-full transition-all duration-500 ease-out"
          :style="{
            width: `${Math.max((result.ops / maxOps) * 100, 2.5).toFixed(1)}%`,
            backgroundColor: color,
          }"
        />
        <span
          class="text-xs text-white font-600 flex items-center inset-y-0 left-2 absolute drop-shadow-sm"
          v-text="t('ops', result.ops)"
        />
      </div>

      <!-- Margin -->
      <span
        class="text-xs text-right shrink-0 tabular-nums"
        :class="result.margin > 5 ? 'text-amber-400' : 'text-neutral-500'"
      >
        ±{{ result.margin.toFixed(1) }}%
      </span>
    </div>

    <!-- Distribution histogram (expanded) -->
    <TransitionExpand>
      <div v-if="expanded" class="mt-3 px-3 py-2 border border-neutral-800 rounded bg-neutral-900">
        <!-- Stats line -->
        <div class="text-2xs text-neutral-500 mb-2 flex gap-4">
          <span>{{ t('min') }} <span class="text-neutral-300">{{ t('nanos', hist.min) }}</span></span>
          <span>{{ t('p5') }} <span class="text-neutral-300">{{ t('nanos', hist.p5) }}</span></span>
          <span>{{ t('median') }} <span class="text-neutral-300">{{ t('nanos', result.details.median) }}</span></span>
          <span>{{ t('p95') }} <span class="text-neutral-300">{{ t('nanos', hist.p95) }}</span></span>
          <span>{{ t('max') }} <span class="text-neutral-300">{{ t('nanos', result.details.max) }}</span></span>
          <span>{{ t('stddev') }} <span class="text-neutral-300">{{ t('nanos', result.details.standardDeviation) }}</span></span>
          <span>{{ t('samples', result.details.sampleResults.length) }}</span>
        </div>

        <!-- Histogram bars -->
        <div class="flex gap-px h-12 items-end">
          <div
            v-for="(count, i) in hist.buckets"
            :key="i"
            class="rounded-t-sm flex-1 transition-all duration-300"
            :style="{
              height: `${(count / hist.maxCount) * 100}%`,
              backgroundColor: color,
              opacity: 0.55,
            }"
          />
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>
