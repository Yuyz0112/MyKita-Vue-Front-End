<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">session status: {{ session }}</h1>
        <p>Github address: https://github.com/Yuyz0112/MyKita-Vue-Front-End</p>
      </div>
    </div>
    <div class="hero-foot">
    </div>
  </section>
</template>

<script>
import {getSession} from '../vuex/getters'
export default {
  data () {
    return {
      msg: 'Welcome to MyKita!'
    }
  },
  vuex: {
    getters: {
      session: getSession
    }
  }
}
</script>

<style lang="sass" scoped>
</style>