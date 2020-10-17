import { make } from 'vuex-pathify'

const state = {
  company: '',
  contentLicense: '',
  dark: false,
  title: '',
  logoUrl: '',
  search: '',
  searchIsFocused: false,
  searchIsLoading: false,
  searchRestrictLocale: false,
  searchRestrictPath: false,
  printView: false
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state)
}
