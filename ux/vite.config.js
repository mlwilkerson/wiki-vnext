import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import ssr from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    ssr(),

    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'src/css/quasar.variables.scss'
    })
  ],
  server: {
    proxy: {
      '/_graphql': 'http://localhost:11511'
    },
    fs: {
      allow: [
        process.cwd()
      ]
    }
  }
})
