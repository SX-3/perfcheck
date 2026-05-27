/* eslint-disable antfu/no-top-level-await  */
import { i18n } from '@lang';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import App from './App.vue';
import '@unocss/reset/tailwind-v4.css';
import 'virtual:uno.css';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

if (import.meta.hot) handleHotUpdate(router);

await i18n.isReady();

createApp(App).use(router).mount('#app');
