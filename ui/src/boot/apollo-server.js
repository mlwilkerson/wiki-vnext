import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import fetch from 'node-fetch'
import ApolloSSR from 'vue-apollo/ssr'
import gql from 'graphql-tag'
import { Cookies } from 'quasar'

Vue.use(VueApollo)

export default async ({ app, router, store, ssrContext }) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:11511/',
    fetch
  })

  // Authentication Link
  const authLink = setContext(async (req, { headers }) => {
    const biscuits = Cookies.parseSSR(ssrContext)
    let authToken = null
    if (biscuits.has('jwt')) {
      authToken = `Bearer ${biscuits.get('jwt')}`
    }
    return {
      headers: {
        ...headers,
        ...(authToken ? { Authorization: authToken } : {})
      }
    }
  })

  // Cache
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    ssrMode: true
  })

  app.apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  global.APOLLO_CLIENT = apolloClient

  // Get site info

  try {
    const resp = await apolloClient.query({
      query: gql`
        query ($hostname: String!) {
          siteByHostname (hostname: $hostname) {
            id
            hostname
            title
            description
            logoUrl
            company
            contentLicense
          }
        }
      `,
      variables: {
        hostname: ssrContext.req.hostname
      }
    })
    const siteInfo = resp.data.siteByHostname
    if (siteInfo) {
      store.set('site/hostname', siteInfo.hostname)
      store.set('site/title', siteInfo.title)
      store.set('site/description', siteInfo.description)
      store.set('site/logoUrl', siteInfo.logoUrl)
      store.set('site/company', siteInfo.company)
      store.set('site/contentLicense', siteInfo.contentLicense)
    } else {
      ssrContext.isInvalidSite = true
    }
  } catch (err) {
    console.warn(err.networkError.result)
  }

  router.onReady(() => {
    ssrContext.rendered = () => {
      ssrContext.apolloState = ApolloSSR.getStates(app.apolloProvider)
    }
  })
}
