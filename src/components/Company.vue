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
            <span v-if="company.customerTag[0]" v-for="tag of company.customerTag" track-by="$index" class="tag is-primary is-pulled-left">{{ tag }}</span>
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
    <div v-if="company.intro">
      <h3 class="title intro">公司介绍</h3>
      <div class="intro has-text-left">
        <p>{{ company.intro }}</p>
      </div>
    </div>
    <div class="columns">
      <div class="column" v-if="company.images.length">
        <h3 class="title intro">图片展示</h3>
        <slider :images="company.images"></slider>
      </div>
      <div class="column" v-if="company.timeline.length">
        <h3 class="title intro">重要动态</h3>
        <timeline :timeline="company.timeline"></timeline>
      </div>
    </div>
    <div v-if="company.products.bicodes.length || company.products.links.length">
      <h3 class="title intro">产品链接</h3>
      <div class="has-text-centered">
        <figure v-for="bicode of company.products.bicodes" class="image is-128x128 product">
          <img :src="bicode">
        </figure>
        <p v-for="link of company.products.links">
          <a :href="link.url" target="_blank">{{ link.desc }}</a>
        </p>
      </div>
    </div>
    <div v-if="company.teamIntro">
      <h3 class="title intro">团队介绍</h3>
      <div class="intro has-text-left">
        <p>{{ company.teamIntro }}</p>
      </div>
    </div>
    <h3 class="title intro" v-if="company.teamMembers.length > 0">团队成员</h3>
    <div class="columns">
      <div class="column" v-for="member of company.teamMembers">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img src="../assets/heart.gif">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title">{{ member.name }}</p>
              <p class="sub-title">公司：{{ member.group }}</p>
              <p class="sub-title">从事领域：{{ maintains[member.maintain] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import company from '../api/company'
import Loader from '../components/Loader'
import Slider from '../components/Slider'
import Timeline from '../components/Timeline'

export default {
  components: { Loader, Slider, Timeline },
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
    margin-bottom: 20px !important
    display: inline-block
    margin-left: auto
    margin-right: auto
    &:after
      content: ''
      display: block
      width: 60px
      height: 4px
      background: #a5e9f1
      border-radius: 5px
      margin: 0 auto
      margin-top: 10px
  .intro
    p
      text-indent: 2em
      background: #fff
      padding: 1rem
      border: 2px solid #a5e9f1
      border-radius: 5px
      max-width: 900px
      margin: 0 auto
  #content
    padding-left: 10px
    padding-right: 10px
  .card
    margin-left: auto
    margin-right: auto
  .product
    display: inline-block
</style>