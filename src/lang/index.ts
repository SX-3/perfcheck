import type { FlatLocales, GetMessageArgs, MakeReturn } from '@sx3/i18n/utils';
import { createI18n } from '@sx3/i18n';
import { useEventListener } from '@vueuse/core';
import { capitalize, computed, shallowReactive, shallowRef } from 'vue';

export const localeNames = [
  { code: 'en-US' as const, name: 'English' },
  { code: 'ru-RU' as const, name: 'Русский' },
  { code: 'zh-CN' as const, name: '中文' },
  { code: 'ja-JP' as const, name: '日本語' },
  { code: 'ko-KR' as const, name: '한국어' },
  { code: 'de-DE' as const, name: 'Deutsch' },
  { code: 'fr-FR' as const, name: 'Français' },
  { code: 'es-ES' as const, name: 'Español' },
  { code: 'pt-BR' as const, name: 'Português' },
];

const locales = {
  'en-US': () => import('./en').then(m => m.default),
  'de-DE': () => import('./de').then(m => m.default),
  'es-ES': () => import('./es').then(m => m.default),
  'fr-FR': () => import('./fr').then(m => m.default),
  'ja-JP': () => import('./ja').then(m => m.default),
  'ko-KR': () => import('./ko').then(m => m.default),
  'pt-BR': () => import('./pt').then(m => m.default),
  'ru-RU': () => import('./ru').then(m => m.default),
  'zh-CN': () => import('./zh').then(m => m.default),
} as const;

type Locales = typeof locales;

export type Locale = keyof typeof locales;

const locale = shallowRef(navigator.language as Locale);
export const i18n = createI18n({
  locale: locale.value,
  fallbackLocales: {
    'de-DE': ['en-US'],
    'es-ES': ['en-US'],
    'fr-FR': ['en-US'],
    'ja-JP': ['en-US'],
    'ko-KR': ['en-US'],
    'pt-BR': ['en-US'],
    'ru-RU': ['en-US'],
    'zh-CN': ['en-US'],
  },
  store: shallowReactive(new Map()),
  locales,
  onLocaleChanged: newLocale => locale.value = newLocale,
});

export const currentLocale = computed({
  get() { return locale.value; },
  set(newLocale) { i18n.setLocale(newLocale); },
});

useEventListener('languagechange', () => {
  currentLocale.value = navigator.language as Locale;
});

export function t<K extends keyof FlatLocales<Locales>>(
  key: K & string,
  ...args: GetMessageArgs<FlatLocales<Locales>[K]>
): Capitalize<MakeReturn<FlatLocales<Locales>, K> & string> {
  // eslint-disable-next-line ts/no-unused-expressions
  locale.value; // Track ref
  return capitalize(i18n.t(key, ...args) as any);
}
