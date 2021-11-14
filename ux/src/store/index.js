import union from 'lodash/union'
import without from 'lodash/without'
import { createStore } from 'vuex'
import pathify from '@requarks/vuex-pathify' // eslint-disable-line import/no-duplicates
import { make } from '@requarks/vuex-pathify' // eslint-disable-line import/no-duplicates

import admin from './admin'
import colors from './colors'
import data from './data'
import page from './page'
import site from './site'
import user from './user'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const state = {
  loadingStack: []
}

const Store = createStore({
  plugins: [
    pathify.plugin
  ],
  state: () => ({ ...state }),
  getters: {
    isLoading: state => { return state.loadingStack.length > 0 }
  },
  mutations: {
    ...make.mutations(state),
    loadingStart (st, stackName) {
      st.loadingStack = union(st.loadingStack, [stackName])
    },
    loadingStop (st, stackName) {
      st.loadingStack = without(st.loadingStack, stackName)
    }
  },
  actions: {},
  modules: {
    admin,
    colors,
    data,
    page,
    site,
    user
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: import.meta.env.DEV
})

export default Store
