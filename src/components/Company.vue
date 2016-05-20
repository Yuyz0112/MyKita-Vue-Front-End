<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div v-if="loaded" class="container columns">
        <div class="column is-2">
          <figure class="image">
            <img class="logo" :src="company.logo + '-150x150'">
          </figure>
        </div>
        <div class="column info">
          <h3 class="title">{{ company.name }}</h3>
          <p>{{ company.slogan }}</p>
          <p class="time">成立于：{{ company.established }}</p>
          <p class="is-clearfix">
            <span class="tag is-primary is-pulled-left">{{ maintains[company.defaultTag] }}</span>
            <span v-for="tag of company.customerTag" class="tag is-primary is-pulled-left">{{ tag }}</span>
          </p>
          <p>位置：{{ company.location }}</p>
        </div>
      </div>
      <div v-else></div>
    </div>
  </section>
</template>

<script>
import reqwest from 'reqwest'
const domain = 'http://120.27.38.129:1337/company/'

export default {
  data () {
    return {
      loaded: false,
      cid: this.$route.params.cid,
      company: {},
      maintains: ['游戏', '影视', '综艺', '动漫', '文学', '艺术', '其它']
    }
  },
  created () {
    reqwest({
      url: domain + this.cid,
      crossOrigin: true,
      withCredentials: true
    })
    .then((val) => {
      this.company = val
      this.loaded = true
    })
  }
}
</script>

<style scoped lang="sass">
  .columns
    margin: 0 auto
    .logo
      margin: 0 auto
      height: 150px
      width: auto
    .title
      margin-bottom: 0
    .time
      color: #d3d3d3
    p
      margin: 10px auto
      .tag
        margin-right: 5px
</style>