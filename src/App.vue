<template>
  <div id="app">
    <navbar></navbar>
    <div class="padding">
      <notification :color="notice.color" v-if="notice.show">{{ notice.msg }}</notification>
      <router-view></router-view>
    </div>
    <footer class="footer" id="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>泛娱中国</strong> 版权所有 泛娱文化传媒 联系电话:010-52861286 Copyright@2016 京ICP备16021088号-1
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import store from './vuex/store'
import Navbar from './components/Navbar'
import Notification from './components/Notification'
import { check } from './vuex/actions'

export default {
  components: { Navbar, Notification },
  store: store,
  vuex: {
    actions: {
      check: check
    },
    getters: {
      notice: state => state.notice
    }
  },
  created () {
    this.check()
  }
}
</script>

<style lang="sass">
  @import "./assets/bulma.sass"

  html, body, #app
    height: 100%

  .padding
    padding-top: $nav-height
    background: url(http://www.ssyer.com/uploads/org_20160506162727_896.jpg)
    background-size: cover
    background: #f1f3f5
    position: relative
    min-height: 100%

  #footer
    height: 100px
    background: rgba(17, 200, 131, .5)

  section.hero.is-fullheight
    background: none

  .fade-transition
    opacity: 1

  .fade-enter
    animation: fade-in 1s;

  .fade-leave
    opacity: 0

  @keyframes fade-in 
    from
      opacity: 0
    to
      opacity: 1
</style>