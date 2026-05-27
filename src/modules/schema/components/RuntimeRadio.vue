<script lang="ts" setup>
import { t } from '@lang';
import { useRouteQuery } from '@vueuse/router';
import { capitalize } from 'vue';
import { runtimes } from '@/schema/benchmarks/results';

const selected = useRouteQuery('runtime', runtimes[0] ? `${runtimes[0].name}_${runtimes[0].version}` : '');
</script>

<template>
  <div class="p-3 card gap-2 grid">
    <h2 class="bold text-xl pb-2" v-text="t('runtime')" />
    <label
      v-for="{ name, version, icon } in runtimes"
      :key="`${name}_${version}`"
      class="px-2 py-1 rounded-lg flex gap-1 cursor-pointer transition-all items-center"
      :class="[selected === `${name}_${version}` && 'bg-indigo active']"
    >
      <div :class="icon" class="text-lg w-5" />
      <input v-model="selected" type="radio" :value="`${name}_${version}`" class="appearance-none">
      <span class="font-500">{{ capitalize(name) }}</span>
      <span class="text-sm font-600 px-2 pt-0.5">{{ version }}</span>
    </label>
  </div>
</template>
