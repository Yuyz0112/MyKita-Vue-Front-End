<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <h1 class="title has-text-centered">session status: {{ session }}</h1>
      <h2 class="subtitle has-text-centered">{{ msg }}</h2>
    </div>
  </section>
  <div class="columns is-multiline container is-mobile">
    <div class="column" v-for="news of lists">
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
import { getSession } from '../vuex/getters'
import news from '../api/news'

export default {
  data () {
    return {
      msg: 'Welcome to MyKita!',
      pagination: {
        page: 1,
        limit: 15
      },
      lists: []
    }
  },
  vuex: {
    getters: {
      session: getSession
    }
  },
  created () {
    news.getList(this.pagination, (err, lists) => {
      if (lists) {
        this.lists = lists
      } else {
        console.log(err)
      }
    })
  },
  methods: {
    loadMore () {
      this.pagination.page++
      news.getList(this.pagination, (err, lists) => {
        if (lists) {
          this.lists = this.lists.concat(lists)
        } else {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    margin: 0 auto
    .column
      max-width: 100%
    .card
      max-width: 100%
      width: 350px
      margin: 0 auto
      p
        height: 2em
</style>