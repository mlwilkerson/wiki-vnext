import { make } from '@requarks/vuex-pathify'

const state = {
  editor: '',
  content: '',
  mode: 'create',
  activeModal: '',
  activeModalData: null,
  media: {
    folderTree: [],
    currentFolderId: 0,
    currentFileId: null
  },
  checkoutDateActive: '',
  editors: {

  }
}

export default {
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
    pushMediaFolderTree: (st, folder) => {
      st.media.folderTree = st.media.folderTree.concat(folder)
    },
    popMediaFolderTree: (st) => {
      st.media.folderTree = st.media.folderTree.slice(0, -1)
    }
  }
}
