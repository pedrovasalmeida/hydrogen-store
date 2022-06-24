import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

export default defineConfig({
  plugins: [hydrogen(defineConfig)],
  test: {
    globals: true,
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
