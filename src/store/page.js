import { make } from 'vuex-pathify'

const state = {
  editMode: false,
  id: 0,
  authorId: 0,
  authorName: 'Unknown',
  createdAt: '',
  description: 'How to install Wiki.js on Ubuntu 18.04 / 20.04',
  isPublished: true,
  locale: 'en',
  path: '',
  publishEndDate: '',
  publishStartDate: '',
  tags: ['cities', 'canada'],
  title: 'Ubuntu',
  icon: 'lab la-empire',
  updatedAt: '',
  mode: '',
  relations: [],
  scriptJs: '',
  scriptCss: '',
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
  render: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state)
}
