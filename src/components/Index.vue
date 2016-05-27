<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <h1 class="title has-text-centered">session status: {{ session }}</h1>
      <h2 class="subtitle has-text-centered">{{ msg }}</h2>
    </div>
  </section>
  <div v-if="loaded" class="row is-multiline container is-clearfix" transition="fade">
    <div class="col" :class="mobile? '':'is-4'" v-for="news of lists">
      <div class="card">
        <div class="card-image">
          <figure class="image is-16by9" :style="{ background: `url(${news.thumb})`, backgroundSize: 'cover' }">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p>{{ news.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a class="button is-primary" @click="loadMore">More</a>
</template>

<script>
import news from '../api/news'

export default {
  data () {
    return {
      msg: 'Welcome to MyKita!',
      pagination: {
        page: 1,
        limit: 15
      },
      lists: [],
      loaded: false
    }
  },
  vuex: {
    getters: {
      mobile: state => state.mobile,
      session: state => state.session
    }
  },
  created () {
    this.get()
  },
  methods: {
    loadMore () {
      this.pagination.page++
      this.get()
    },
    get () {
      news.getList(this.pagination, (err, lists) => {
        if (lists) {
          this.lists = this.lists.concat(lists)
          this.loaded = true
        } else {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .row
    width: 100%
  .container
    margin: 0 auto
    .col
      padding: 10px
      float: left
      &.is-4
        width: 33.33%
    .card
      max-width: 100%
      width: 350px
      margin: 0 auto
      p
        height: 2em
</style>