import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'
import store from './vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'is-active'
})

router.map({
  '/home': {
    component: resolve => require(['./components/Index'], resolve)
  },
  '/login': {
    component: resolve => require(['./components/Login'], resolve)
  },
  '/regist': {
    component: resolve => require(['./components/Regist'], resolve)
  },
  '/customer': {
    component: resolve => require(['./components/Customer'], resolve),
    subRoutes: {
      '/': {
        component: resolve => require(['./components/InfoPanel'], resolve)
      },
      '/1': {
        component: resolve => require(['./components/Counter'], resolve)
      },
      '/2': {
        component: resolve => require(['./components/Hello'], resolve)
      },
      '/info': {
        component: resolve => require(['./components/InfoPanel'], resolve)
      }
    }
  },
  '/company/list': {
    component: resolve => require(['./components/Loader'], resolve)
  },
  '/company/:cid': {
    component: resolve => require(['./components/Company'], resolve)
  }
})

router.beforeEach(({to, next}) => {
  store.dispatch('CLOSE_NOTICE')
  next()
})

router.redirect({
  '/': '/home',
  '/company': '/company/list'
})

router.start(App, 'app')
