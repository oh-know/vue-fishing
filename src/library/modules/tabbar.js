import * as types from '../mutations_types'

const state = {
  tabbars: [
    {
      id: 0,
      path: '/main',
      isActive: true,
      src: './static/images/t01.png',
      src_active: './static/images/t01_active.jpg',
      name: '首页'
    },
    {
      id: 1,
      path: '/store',
      isActive: false,
      src: './static/images/t02.jpg',
      src_active: './static/images/t02_active.png',
      name: '商城'
    },
    {
      id: 2,
      path: '/fish',
      isActive: false,
      src: './static/images/t03.jpg',
      src_active: './static/images/t03_active.png',
      name: '钓场'
    },
    {
      id: 3,
      path: '/my',
      isActive: false,
      src: './static/images/t04.png',
      src_active: './static/images/t04_active.png',
      name: '我的'
    }
  ]
}

const getters = {
  tabbars: state => state.tabbars
}

const actions = {
  changeTabbarActive ({ commit }, id) {
    commit(types.CHANGE_TABBAR_ACTIVE, id)
  }
}

const mutations = {
  [types.CHANGE_TABBAR_ACTIVE] (state, id) {
    state.tabbars.forEach(tabbar => {
      tabbar.isActive = false
    })
    state.tabbars[id].isActive = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
