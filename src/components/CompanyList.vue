<template>
  <ul>
    <li v-for="company of companies">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="company.logo">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong><a v-link="{ path: '/company/' + company.id }">{{ company.name }}</a></strong>
                <small>@{{ maintains[company.defaultTag] }}</small>
                <br>
                {{ company.slogan }}
                <br>
                位置：{{ company.location }}
              </p>
              <a class="button is-primary is-outlined" @click="bind(company.id)">认领</a>
              <a class="button is-danger is-outlined" @click="unbind(company.id)">解除</a>
            </div>
          </div>
        </article>
      </div>
    </li>
  </ul>
</template>

<script>
import company from '../api/company'

export default {
  data () {
    return {
      companies: [],
      maintains: ['游戏', '影视', '综艺', '动漫', '文学', '艺术', '其它']
    }
  },
  created () {
    company.getList({
      page: 1
    }, (err, val) => {
      if (!err) {
        this.companies = val
      } else {
        console.log(err)
      }
    })
  },
  vuex: {
    getters: {
      session: state => state.session,
      authData: state => state.authData
    }
  },
  methods: {
    bind (cid) {
      company.associate({
        uid: this.authData.id,
        cid: cid
      }, (err) => {
        if (err) {
          console.log(err)
        }
      })
    },
    unbind (cid) {
      company.dissociate({
        uid: this.authData.id,
        cid: cid
      }, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>