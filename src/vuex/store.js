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
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations
})
