import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'

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
      '/1': {
        component: resolve => require(['./components/Counter'], resolve)
      },
      '/2': {
        component: resolve => require(['./components/Hello'], resolve)
      }
    }
  }
})

router.start(App, 'app')
