<template>
  <div id="app">
    <navbar></navbar>
    <div class="padding">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from './vuex/store'
import Navbar from './components/Navbar.vue'
import { check } from './vuex/actions'

export default {
  components: { Navbar },
  store: store,
  vuex: {
    actions: {
      check: check
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

  section.hero.is-fullheight
    background: none
</style>