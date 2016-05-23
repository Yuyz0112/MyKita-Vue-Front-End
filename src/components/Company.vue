<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div v-if="loaded" class="container columns" transition="fade">
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
      <div v-else>
        <loader></loader>
      </div>
    </div>
  </section>
  <div v-if="loaded" class="container has-text-centered" id="content" transition="fade">
    <h3 class="title intro">公司介绍</h3>
    <div class="intro has-text-left">
      <p>{{ company.intro }}</p>
    </div>
    <h3 class="title intro">图片展示</h3>
    <slider :images="company.images"></slider>
  </div>
</template>

<script>
import company from '../api/company'
import Loader from '../components/Loader'
import Slider from '../components/Slider'

export default {
  components: { Loader, Slider },
  data () {
    return {
      loaded: false,
      cid: this.$route.params.cid,
      company: {},
      maintains: ['游戏', '影视', '综艺', '动漫', '文学', '艺术', '其它']
    }
  },
  created () {
    company.getCompany(this.cid, (val) => {
      if (val !== false) {
        this.company = val
        const d = new Date(this.company.established)
        this.company.established = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        this.loaded = true
      }
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
  h3.intro
    margin-top: 50px
    display: inline-block
    margin-left: auto
    margin-right: auto
    &:after
      content: ''
      display: block
      width: 60px
      height: 4px
      background: #1fc8db
      border-radius: 5px
      margin: 0 auto
      margin-top: 10px
  .intro
    p
      text-indent: 2em
      position: relative
  #content
    padding-left: 10px
    padding-right: 10px
</style>