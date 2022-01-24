import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'css/quasar.variables.scss'
    })
  ],
  server: {
    port: 80,
    proxy: {
      '^/_github/.*': 'http://localhost:11511',
      '/_graphql': 'http://localhost:11511'
    },
    fs: {
      allow: [
        process.cwd()
      ]
    },
    hmr: {
      clientPort: 443
    }
  }
})
