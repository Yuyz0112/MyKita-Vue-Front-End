/*
import shop from '../api/shop'
import * as types from './mutation-types'

export const addToCart = ({ dispatch }, product) => {
  if (product.inventory > 0) {
    dispatch(types.ADD_TO_CART, product.id)
  }
}

export const checkout = ({ dispatch, state }, products) => {
  const savedCartItems = [...state.cart.added]
  dispatch(types.CHECKOUT_REQUEST)
  shop.buyProducts(
    products,
    () => dispatch(types.CHECKOUT_SUCCESS),
    () => dispatch(types.CHECKOUT_FAILURE, savedCartItems)
  )
}

export const getAllProducts = ({ dispatch }) => {
  shop.getProducts(products => {
    dispatch(types.RECEIVE_PRODUCTS, products)
  })
}
*/
import user from '../api/user'
import isMobile from 'isMobile'

export const login = ({dispatch}, val) => {
  dispatch('LOG_IN', val)
}

export const check = ({dispatch}) => {
  if (isMobile.any) {
    dispatch('IS_MOBILE')
  }
  user.checkSession((val) => {
    if (val) {
      dispatch('LOG_IN', val)
    } else {
      dispatch('LOG_OUT')
    }
  })
}

export const logout = ({dispatch}) => {
  dispatch('LOG_OUT')
}

export const closeNotice = ({dispatch}) => {
  dispatch('CLOSE_NOTICE')
}

export const newNotice = ({dispatch}, notice) => {
  dispatch('NEW_NOTICE', notice)
}

export const updateAuthdata = ({dispatch}, type, val) => {
  dispatch('UPDATE_AUTHDATA', type, val)
}
