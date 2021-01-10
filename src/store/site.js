import { make } from 'vuex-pathify'

const state = {
  host: '',
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
  mutations: make.mutations(state)
}
