import { ssrMiddleware } from 'quasar/wrappers'

const { createProxyMiddleware } = require('http-proxy-middleware')

export default ssrMiddleware(({ app, resolve }) => {
  app.all('/_graphql', createProxyMiddleware({
    target: 'http://localhost:11511',
    changeOrigin: true,
    prependPath: false
  }))
})
