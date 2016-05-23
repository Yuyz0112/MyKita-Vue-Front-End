import reqwest from 'reqwest'

const domain = 'https://sails.myriptide.com/company/'

export default {
  getCompany (cid, callback) {
    reqwest({
      url: domain + cid,
      crossOrigin: true,
      withCredentials: true
    })
    .then(val => callback(val))
    .catch(e => callback(false))
  }
}
