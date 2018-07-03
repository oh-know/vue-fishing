// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/library/vuex'
// 模块化分离 有利于main.js 精简
// 减少流程，只给模块入口
import mint from '@/library/mint'
import muse from '@/library/muse'
import axios from '@/library/axios'
import com from '@/library/component'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mint,
  store,
  axios,
  com,
  template: '<App/>',
  components: { App }
})
