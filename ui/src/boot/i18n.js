import { createI18n } from 'vue-i18n'
import messages from 'src/i18n/en.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: messages
  }
})

export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
}

export { i18n }
