import { make } from '@requarks/vuex-pathify'
import gql from 'graphql-tag'
import cloneDeep from 'lodash/cloneDeep'

const state = {
  currentSiteId: null,
  info: {
    currentVersion: 'n/a',
    latestVersion: 'n/a',
    groupsTotal: 0,
    pagesTotal: 0,
    usersTotal: 0
  },
  sites: [],
  locales: [
    { code: '', name: 'English' }
  ]
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state),
  actions: {
    async fetchSites ({ commit }) {
      const resp = await APOLLO_CLIENT.query({
        query: gql`
          query getSites {
            sites {
              id
              hostname
              isEnabled
              title
            }
          }
        `,
        fetchPolicy: 'network-only'
      })
      commit('SET_SITES', cloneDeep(resp?.data?.sites ?? []))
    }
  }
}
