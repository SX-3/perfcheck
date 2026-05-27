import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  unocss: true,
  typescript: true,
  formatters: true,
  stylistic: {
    semi: true,
  },
  rules: {
    'antfu/if-newline': ['off'],
  },
});
