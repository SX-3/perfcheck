import { useRouteQuery } from '@vueuse/router';
import { BENCHMARK_TYPES } from '../const';

const ALL = BENCHMARK_TYPES.join();
export function useFilters() {
  return useRouteQuery('filters', ALL, {
    transform: {
      get: v => v ? v.split(',') : [],
      set: v => v.length ? v.join() : ALL,
    },
  });
}
