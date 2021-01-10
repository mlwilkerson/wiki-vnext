import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

Vue.use(VueApollo)

export default ({ app, store }) => {
  // Dynamic GraphQL URI Link
  const httpLink = createHttpLink({
    uri () {
      // switch (store.get('site/env@id')) {
      //   case 'local':
      //     return 'http://localhost:9000'
      //   default:
      return 'http://local.requarks.io:11511'
      // }
    }
  })

  // Authentication Link
  const authLink = setContext(async (req, { headers }) => {
    const token = 'test' // await window.auth0Client.getTokenSilently()
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  // Cache

  const cache = new InMemoryCache()
  if (typeof window !== 'undefined') {
    const state = window.__APOLLO_STATE__
    if (state) {
      cache.restore(state.defaultClient)
    }
  }

  // Client

  const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    credentials: 'omit',
    ssrForceFetchDelay: 100
  })

  // Init Vue Apollo
  app.apolloProvider = new VueApollo({
    defaultClient: client
  })

  window.APOLLO_CLIENT = client
}
