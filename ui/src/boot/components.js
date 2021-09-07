import { defineAsyncComponent } from 'vue'
import nth from 'lodash/nth'

export default ({ app }) => {
  const eagerContext = require.context('../components/', true, /\/_[a-zA-Z0-9]+\.vue$/, 'eager')
  eagerContext.keys().forEach(m => {
    const compName = nth(m.split('/'), -1).split('.')[0].substring(1)
    app.component(compName, defineAsyncComponent(() => eagerContext(m)))
  })

  const lazyContext = require.context('../components/', true, /\/[a-zA-Z0-9]+\.vue$/, 'lazy')
  lazyContext.keys().forEach(m => {
    const compName = nth(m.split('/'), -1).split('.')[0]
    app.component(compName, defineAsyncComponent(() => lazyContext(m)))
  })
}
