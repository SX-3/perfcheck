<script lang="ts" setup>
import { t } from '@lang';
import { useRouteQuery } from '@vueuse/router';
import { computed } from 'vue';

const TYPES = ['parseSafe', 'parseStrict', 'assertLoose', 'assertStrict'] as const;

const COLORS: Record<string, string> = {
  parseSafe: '#60a5fa',
  parseStrict: '#f59e0b',
  assertLoose: '#34d399',
  assertStrict: '#f87171',
};

const testsRaw = useRouteQuery<string>('tests', '');

const enabled = computed({
  get: () => new Set(testsRaw.value ? testsRaw.value.split(',') : TYPES),
  set: (s) => { testsRaw.value = s.size === TYPES.length ? '' : [...s].join(','); },
});

function toggle(type: string) {
  const next = new Set(enabled.value);
  next.has(type) ? next.delete(type) : next.add(type);
  enabled.value = next;
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
      <input
        type="checkbox"
        :checked="enabled.has(type)"
        class="accent-neutral-500"
        @change="toggle(type)"
      >
      <span class="rounded-sm h-2.5 w-2.5 inline-block" :style="{ backgroundColor: COLORS[type] }" />
      <span class="text-neutral-300">{{ t(type) }}</span>
    </label>
  </section>
</template>
