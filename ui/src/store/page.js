import { make } from 'vuex-pathify'

const state = {
  mode: 'view',
  editor: '',
  editorMode: 'edit',
  id: 0,
  authorId: 0,
  authorName: 'Unknown',
  createdAt: '',
  description: 'How to install Wiki.js on Ubuntu 18.04 / 20.04',
  isPublished: true,
  showInTree: true,
  locale: 'en',
  path: '',
  publishEndDate: '',
  publishStartDate: '',
  tags: ['cities', 'canada'],
  title: 'Ubuntu',
  icon: 'lab la-empire',
  updatedAt: '',
  relations: [],
  scriptJsLoad: '',
  scriptJsUnload: '',
  scriptStyles: '',
  allowComments: false,
  allowContributions: true,
  allowRatings: true,
  showSidebar: true,
  showToc: true,
  showTags: true,
  tocDepth: {
    min: 1,
    max: 2
  },
  breadcrumbs: [
    {
      id: 1,
      title: 'Installation',
      icon: 'las la-file-alt',
      locale: 'en',
      path: 'installation'
    },
    {
      id: 2,
      title: 'Ubuntu',
      icon: 'lab la-ubuntu',
      locale: 'en',
      path: 'installation/ubuntu'
    }
  ],
  effectivePermissions: {
    comments: {
      read: false,
      write: false,
      manage: false
    },
    history: {
      read: false
    },
    source: {
      read: false
    },
    pages: {
      write: false,
      manage: false,
      delete: false,
      script: false,
      style: false
    },
    system: {
      manage: false
    }
  },
  commentsCount: 0,
  content: '',
  render: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state),
  actions: {
    /**
     * PAGE - CREATE
     */
    pageCreate ({ commit, state }, { editor, locale, path }) {
      // -> Editor View
      commit('SET_EDITOR', editor)
      commit('SET_EDITOR_MODE', 'create')

      if (['markdown', 'api'].includes(editor)) {
        commit('site/SET_SHOW_SIDE_NAV', false, { root: true })
      } else {
        commit('site/SET_SHOW_SIDE_NAV', true, { root: true })
      }

      if (['markdown', 'channel', 'api'].includes(editor)) {
        commit('site/SET_SHOW_SIDEBAR', false, { root: true })
      } else {
        commit('site/SET_SHOW_SIDEBAR', true, { root: true })
      }

      // -> Page Data
      commit('SET_ID', 0)
      commit('SET_LOCALE', locale || state.locale)
      if (path) {
        commit('SET_PATH', path)
      } else {
        commit('SET_PATH', state.path.length < 2 ? 'new-page' : `${state.path}/new-page`)
      }
      commit('SET_TITLE', '')
      commit('SET_DESCRIPTION', '')
      commit('SET_ICON', 'las la-file-alt')
      commit('SET_IS_PUBLISHED', false)
      commit('SET_RELATIONS', [])
      commit('SET_TAGS', [])
      commit('SET_BREADCRUMBS', [])

      commit('SET_CONTENT', '')
      commit('SET_RENDER', '')

      // -> View Mode
      commit('SET_MODE', 'edit')
    },
    generateToc ({ commit, state }) {

    }
  }
}
