import Vue from 'vue'
import Vuex from 'Vuex'
// import cart from './modules/cart'
// import products from './modules/products'

Vue.use(Vuex)

const state = {
  session: '',
  mobile: false,
  authData: {
    email: '',
    id: '',
    name: ''
  },
  notice: {
    show: false,
    color: '',
    msg: ''
  }
}

const mutations = {
  LOG_IN (state, user) {
    state.session = true
    state.authData = user
  },
  LOG_OUT (state) {
    state.session = false
  },
  IS_MOBILE (state) {
    state.mobile = true
  },
  CLOSE_NOTICE (state) {
    state.notice.show = false
  },
  NEW_NOTICE (state, notice) {
    state.notice = notice
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations
})
