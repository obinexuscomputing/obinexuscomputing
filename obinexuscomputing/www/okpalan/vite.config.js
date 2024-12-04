import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { vitePluginSitemap } from './src/plugins';

// Environment and path utils
const isProd = process.env.NODE_ENV === 'production';
const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => ({
  root,
  base: '/',
  
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Vue template options
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    vueJsx(),
    vueDevTools(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false
              }
            }
          }
        ]
      }
    }),
    vitePluginSitemap({
      siteUrl: 'https://okpalan.obinexuscomputing.org',
      distDir: 'dist',
      include: ['**/*.html'],
      exclude: ['404.html', 'private/**'],
      changefreq: 'daily',
      priority: 0.8,
      outputFile: 'sitemap.xml',
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@services': path.resolve(__dirname, './src/services'),
      '@constants': path.resolve(__dirname, './src/constants')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },

  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: mode === 'production' ? 'terser' : false,
    sourcemap: !isProd,
    
    terserOptions: {
      compress: {
        drop_console: isProd,
        drop_debugger: isProd,
        pure_funcs: isProd ? ['console.log', 'console.info'] : []
      }
    },

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['@headlessui/vue', '@heroicons/vue'],
          'vendor-utils': ['lodash-es', 'date-fns'],
          'vendor-icons': ['lucide-vue'],
          'lorentz-clock': [
            './src/components/LorentzClock/index.js',
            './src/utils/relativity.js'
          ]
        },
        chunkFileNames: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        entryFileNames: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop().toLowerCase();
          const extMap = {
            css: 'css/[name].[hash][extname]',
            svg: 'images/[name].[hash][extname]',
            png: 'images/[name].[hash][extname]',
            jpg: 'images/[name].[hash][extname]',
            jpeg: 'images/[name].[hash][extname]',
            gif: 'images/[name].[hash][extname]',
            webp: 'images/[name].[hash][extname]',
            woff: 'fonts/[name].[hash][extname]',
            woff2: 'fonts/[name].[hash][extname]',
            ttf: 'fonts/[name].[hash][extname]',
            eot: 'fonts/[name].[hash][extname]'
          };
          return extMap[ext] || 'assets/[name].[hash][extname]';
        }
      }
    },

    chunkSizeWarningLimit: 1000
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@assets/styles/variables.scss";
          @import "@assets/styles/mixins.scss";
        `
      }
    },
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'lucide-vue',
      'lodash-es',
      'date-fns'
    ],
    exclude: ['@vueuse/core']
  },

  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    hmr: {
      overlay: true
    }
  },

  preview: {
    port: 8080,
    strictPort: true,
    open: true
  }
}));