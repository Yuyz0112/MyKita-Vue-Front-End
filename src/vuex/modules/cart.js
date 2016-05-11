import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../mutation-types'

const state = {
  added: [],
  lastCheckout: null
}

const mutations = {
  [ADD_TO_CART] (state, productId) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === productId)
    if (!record) {
      state.added.push({
        id: productId,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },

  [CHECKOUT_REQUEST] (state) {
    state.added = []
    state.lastCheckout = null
  },

  [CHECKOUT_SUCCESS] (state) {
    state.lastCheckout = 'successful'
  },

  [CHECKOUT_FAILURE] (state, savedCartItems) {
    state.added = savedCartItems
    state.lastCheckout = 'failed'
  }
}

export default {
  state,
  mutations
}
