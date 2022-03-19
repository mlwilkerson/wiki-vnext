import { make } from 'vuex-pathify'
import gql from 'graphql-tag'

const state = {
  id: null,
  useLocales: false,
  hostname: '',
  company: '',
  contentLicense: '',
  dark: false,
  title: '',
  description: '',
  logoUrl: '',
  search: '',
  searchIsFocused: false,
  searchIsLoading: false,
  searchRestrictLocale: false,
  searchRestrictPath: false,
  printView: false,
  ratingsMode: 'thumbs',
  pageDataTemplates: [],
  showSideNav: true,
  showSidebar: true,
  theme: {
    dark: false,
    injectCSS: '',
    injectHead: '',
    injectBody: '',
    colorPrimary: '#1976D2',
    colorSecondary: '#02C39A',
    colorAccent: '#f03a47',
    colorHeader: '#000',
    colorSidebar: '#1976D2',
    sidebarPosition: 'left',
    tocPosition: 'right',
    showSharingMenu: true,
    showPrintBtn: true
  },
  thumbStyle: {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#000',
    width: '5px',
    opacity: 0.15
  },
  barStyle: {
    backgroundColor: '#FAFAFA',
    width: '9px',
    opacity: 1
  }
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state),
  actions: {
    async loadSite ({ commit }, hostname) {
      try {
        const resp = await APOLLO_CLIENT.query({
          query: gql`
            query getSiteInfo ($hostname: String!) {
              siteByHostname (
                hostname: $hostname
                exact: false
                ) {
                id
                hostname
                title
                description
                logoText
                company
                contentLicense
              }
            }
          `,
          variables: {
            hostname
          }
        })
        const siteInfo = resp.data.siteByHostname
        if (siteInfo) {
          commit('SET_ID', siteInfo.id)
          commit('SET_HOSTNAME', siteInfo.hostname)
          commit('SET_TITLE', siteInfo.title)
          commit('SET_DESCRIPTION', siteInfo.description)
          commit('SET_LOGO_URL', siteInfo.logoUrl)
          commit('SET_COMPANY', siteInfo.company)
          commit('SET_CONTENT_LICENSE', siteInfo.contentLicense)
        } else {
          throw new Error('Invalid Site')
        }
      } catch (err) {
        console.warn(err.networkError?.result ?? err.message)
        throw err
      }
    }
  }
}
