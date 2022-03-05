import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
// import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})

export default i18n
