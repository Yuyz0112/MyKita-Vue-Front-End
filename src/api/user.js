import reqwest from 'reqwest'

const domain = 'http://120.27.38.129:1337/user/'
const apis = {
  login: domain + 'login',
  logout: domain + 'logout',
  signup: domain + 'signup',
  check: domain + 'check'
}

export default {
  checkSession (callback) {
    reqwest({
      url: apis.check,
      crossOrigin: true,
      withCredentials: true
    })
    .then((res) => {
      return res
    })
    .then(val => callback(val))
    .catch(e => callback(false))
  },

  login (params, callback) {
    reqwest({
      url: apis.login + params,
      crossOrigin: true,
      withCredentials: true
    })
    .then((res) => {
      return res
    })
    .then(val => callback(val))
    .catch(e => callback(e))
  },

  signup (params, callback) {
    reqwest({
      url: apis.signup + params,
      crossOrigin: true,
      withCredentials: true
    })
    .then((res) => {
      return res
    })
    .then(val => callback(val))
    .catch(e => callback(e))
  },

  logout (callback) {
    reqwest({
      url: apis.logout,
      crossOrigin: true,
      withCredentials: true
    })
    .then((res) => {
      callback()
    })
    .catch((e) => {
      return false
    })
  },

  update (id, data, callback) {
    reqwest({
      url: domain + id,
      crossOrigin: true,
      withCredentials: true,
      method: 'PUT',
      data: data
    })
    .then((res) => {
      return res
    })
    .then(val => callback(null))
    .catch(e => callback(e))
  }
}
