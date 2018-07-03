const state = {
  tag: '',
  fishfield: '',
  index: 0,
  a: true,
  d: false,
  fieldName: '',
  fieldP: '',
  fieldTel: '',
  fieldContent: '',
  fishfield: []
}

const mutations = {
  selectTag (state,flag) {
    state.tag = flag
  },
  selectFishfield(state,flag) {
  	state.fishfield = flag
  },
  changeIndex1(state,flag) {
    state.index = flag
  },
  changeA(state,flag) {
    state.a = flag
  },
  changeD(state,flag) {
    state.d = flag
  },
  selectName(state,flag) {
    state.fieldName = flag
  },
  selectP(state,flag) {
    state.fieldP = flag
  },
  selectTel(state,flag) {
    state.fieldTel = flag
  },
  selectContent(state,flag) {
    state.fieldContent = flag
  }
}

export default {
  state,
  mutations
}