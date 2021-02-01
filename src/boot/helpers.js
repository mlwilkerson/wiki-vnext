export default ({ Vue, store }) => {
  const pageHelpers = {
    getFullPath ({ locale, path }) {
      if (store.get('site/useLocales')) {
        return `/${locale}/${path}`
      } else {
        return `/${path}`
      }
    }
  }

  Vue.use({
    install: (Vue, options) => {
      Vue.pageHelpers = pageHelpers
      Vue.prototype.$pageHelpers = pageHelpers
    }
  })
}
