export default ({ app, store }) => {
  const pageHelpers = {
    getFullPath ({ locale, path }) {
      if (store.get('site/useLocales')) {
        return `/${locale}/${path}`
      } else {
        return `/${path}`
      }
    }
  }

  app.use({
    install: (app, options) => {
      app.config.globalProperties.$pageHelpers = pageHelpers
      app.provide('pageHelpers', options)
    }
  })
}
