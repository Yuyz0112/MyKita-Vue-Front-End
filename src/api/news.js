import reqwest from 'reqwest'

const domain = 'https://sails.myriptide.com/news/'
const apis = {
  getList: domain + 'getList'
}

export default {
  getList (data, callback) {
    reqwest({
      url: apis.getList,
      crossOrigin: true,
      withCredentials: true,
      data: data
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  }
}
