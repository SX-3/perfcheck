import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';
import router from 'vue-router/vite';

const ROOT_MODULE = 'schema';
const EXCLUDED: string[] = [];

function pages() {
  const modules = [];
  let nameIndex = 2;
  if (process.versions.bun)
    nameIndex++; // Adjust index based on Bun or Node.js environment
  for (let path of globSync('./src/modules/**/pages')) {
    path = path.replaceAll('\\', '/');
    const moduleName = path.split('/')[nameIndex];

    if (!EXCLUDED.includes(moduleName)) {
      modules.push({
        path: moduleName === ROOT_MODULE ? '/' : `${moduleName}/`,
        src: path,
      });
    }
  }
  return modules;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [uno(), router({ routesFolder: pages() }), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@lang': fileURLToPath(new URL('./src/lang', import.meta.url)),
    },
  },
});
