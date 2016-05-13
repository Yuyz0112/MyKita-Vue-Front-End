import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'
import store from './vuex/store'

Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/': {
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
        component: resolve => require(['./components/Navbar'], resolve)
      },
      '/1': {
        component: resolve => require(['./components/Counter'], resolve)
      },
      '/2': {
        component: resolve => require(['./components/Hello'], resolve)
      }
    }
  }
})

router.beforeEach(({to, next}) => {
  store.dispatch('CLOSE_NOTICE')
  next()
})

router.start(App, 'app')
