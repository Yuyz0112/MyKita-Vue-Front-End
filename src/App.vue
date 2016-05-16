<template>
  <div id="app">
    <navbar></navbar>
    <div class="padding">
      <notification :color="notice.color" v-if="notice.show">{{ notice.msg }}</notification>
      <router-view></router-view>
      <div class="hero-foot">
        <h2 class="title">footer</h2>
      </div>
    </div>
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

  .padding
    padding-top: $nav-height
    background: url(http://www.ssyer.com/uploads/org_20160506162727_896.jpg)
    background-size: cover
    background: #f1f3f5
    position: relative

  section.hero.is-fullheight
    background: none

  .slide-in-transition
    transition : all .5s ease
    right:0 !important

  .slide-in-enter, .slide-in-leave
    right:-10% !important
</style>