import { createI18n } from 'vue-i18n'
import messages from './en.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: messages
  }
})

export default i18n
