<script lang="ts" setup>
import { t } from '@lang';
import { useFilters } from '@/schema/composables/useFilters';
import { BENCHMARK_COLORS as COLORS, BENCHMARK_TYPES as TYPES } from '../const';

const filters = useFilters();

function toggle(type: string) {
  const enabled = filters.value.indexOf(type);
  if (enabled === -1) filters.value = [...filters.value, type];
  else filters.value = filters.value.filter(t => t !== type);
}
</script>

<template>
  <section class="p-4 card gap-2 grid">
    <h3 class="text-xs text-neutral-400 font-600" v-text="t('tests')" />
    <label
      v-for="type in TYPES"
      :key="type"
      class="text-xs flex gap-2 cursor-pointer items-center"
    >
      <button
        type="button"
        :class="{ 'opacity-50': !filters.includes(type) }"
        class="flex gap-2 cursor-pointer items-center"
        @click="toggle(type)"
      >
        <span class="rounded-sm h-2.5 w-2.5 inline-block" :style="{ backgroundColor: COLORS[type] }" />
        <span class="text-neutral-300">{{ t(type) }}</span>
      </button>
    </label>
  </section>
</template>
