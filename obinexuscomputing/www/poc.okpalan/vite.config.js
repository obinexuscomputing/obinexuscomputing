import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  assetsInclude: ['**/*.svg'],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.js',
      },
    },
  },
});