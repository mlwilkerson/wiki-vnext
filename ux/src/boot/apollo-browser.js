import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

export default ({ app, store }) => {
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

  // Upload / HTTP Link
  const uploadLink = createUploadLink({
    uri () {
      return '/_graphql'
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
    link: authLink.concat(uploadLink),
    credentials: 'omit',
    ssrForceFetchDelay: 100
  })

  // Init Vue Apollo
  const apolloProvider = createApolloProvider({
    defaultClient: client
  })

  app.use(apolloProvider)

  window.APOLLO_CLIENT = client
}
