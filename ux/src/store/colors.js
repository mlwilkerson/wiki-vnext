import { make } from '@requarks/vuex-pathify'

const state = {
  dark6: '#070a0d',
  dark5: '#0d1117',
  dark4: '#161b22',
  dark3: '#1e232a'
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state)
}
