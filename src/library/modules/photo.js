const state = {
  photo: [],
  remove: [],
  liList: ''
}

const mutations = {
  selectPhoto (state,photo) {
    state.photo = photo
  },
  selectRemove (state,photo) {
  	state.remove = photo
  },
  selectLi(state,flag) {
  	state.liList = flag
  }
}

export default {
  state,
  mutations
}
