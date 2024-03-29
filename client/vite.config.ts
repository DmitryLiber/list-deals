import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: `
            @import './src/assets/scss/_functions.scss';
            @import './src/assets/scss/_variables.scss';
            @import './src/assets/scss/_mixins.scss';
            `
        }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
