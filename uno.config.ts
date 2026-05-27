import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  safelist: ['i-logos-nodejs-icon-alt', 'i-logos-bun', 'i-logos-deno'],
  presets: [
    presetWind4({ dark: 'class' }),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Nunito',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    card: 'bg-dark-800 border border-dark-500 rounded-lg',
  },
});
