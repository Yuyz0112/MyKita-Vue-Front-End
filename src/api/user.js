import reqwest from 'reqwest'

const domain = 'https://sails.myriptide.com/user/'
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
    .then(val => callback(val))
    .catch(e => callback(false))
  },

  login (data, callback) {
    reqwest({
      url: apis.login,
      crossOrigin: true,
      withCredentials: true,
      data: data
    })
    .then(val => callback(val))
    .catch(e => callback(e))
  },

  signup (data, callback) {
    reqwest({
      url: apis.signup,
      crossOrigin: true,
      withCredentials: true,
      data: data
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
    .then(val => callback(null))
    .catch(e => callback(e))
  }
}
