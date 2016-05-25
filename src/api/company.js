import reqwest from 'reqwest'

const domain = 'https://sails.myriptide.com/company/'
const apis = {
  getList: domain + 'getList',
  associate: domain + 'associate',
  dissociate: domain + 'dissociate'
}

export default {
  getCompany (cid, callback) {
    reqwest({
      url: domain + cid,
      crossOrigin: true,
      withCredentials: true
    })
    .then(val => callback(val))
    .catch(e => callback(false))
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
  },

  getList (data, callback) {
    reqwest({
      url: apis.getList,
      crossOrigin: true,
      withCredentials: true,
      data: data
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  },

  associate (data, callback) {
    reqwest({
      url: apis.associate,
      crossOrigin: true,
      withCredentials: true,
      data: data
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  },

  dissociate (data, callback) {
    reqwest({
      url: apis.dissociate,
      crossOrigin: true,
      withCredentials: true,
      data: data
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  }
}
