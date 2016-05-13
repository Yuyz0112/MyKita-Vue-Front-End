<template>
  <div class="container columns">
    <div class="column is-fullheight" :class="mobile? 'mobileClass':'desktopClass'">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure>
              <img class="image" :class="mobile? 'is-96x96':'is-64x64'" src="../assets/heart.gif">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ authData.name }}</strong></p>
            </div>
            <nav class="level is-mobile">
              <div class="level-item">
                <a v-link="'/customer/info'" @click="i = -1">完善资料</a>
              </div>
              <div class="level-item">
                <a v-link="'/customer'" @click="i = -1">个人设置</a>
              </div>
            </nav>
          </div>
        </article>
      </div>
      <aside class="menu">
        <ul class="menu-list">
          <li v-for="list of lists">
            <a v-link="{ path: list.link, replace: true }" :class="$index === i? 'is-active':''" @click="i = $index">{{ list.name }}</a>
          </li>
        </ul>
      </aside>
    </div>

    <div class="column" v-if="!mobile">
      <router-view></router-view>
      <h1 class="title">Is this a mobile device? {{ mobile }}</h1>
      <a class="button is-primary is-outlined" @click="logout">登出</a>
    </div>
    <section v-else class="hero is-success is-fullheight" id="subview">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Full Height title
          </h1>
          <h2 class="subtitle">
            Full Height subtitle
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { logout, newNotice } from '../vuex/actions'
import user from '../api/user'

export default {
  data () {
    return {
      lists: [
        {name: '我的订单', link: '/customer/1'},
        {name: '投资券', link: '/customer/2'},
        {name: '我的消息', link: ''},
        {name: '我的收藏', link: ''},
        {name: '我管理的公司', link: ''},
        {name: '我关注的公司', link: ''}
      ],
      i: -1
    }
  },
  vuex: {
    getters: {
      session: state => state.session,
      mobile: state => state.mobile,
      authData: state => state.authData
    },
    actions: {
      sessionClear: logout,
      notice: newNotice
    }
  },
  methods: {
    logout () {
      user.logout(() => {
        this.sessionClear()
      })
    }
  },
  watch: {
    session (val) {
      if (val !== true) {
        this.$route.router.go('/')
      }
    }
  },
  computed: {
    show () {
      if (this.i !== -1) {
        return true
      } else {
        return false
      }
    }
  },
  ready () {
    if (this.authData.avator === undefined) {
      this.notice({
        show: true,
        color: 'is-info',
        msg: '请完善您的资料'
      })
    }
  }
}
</script>

<style scoped lang="sass">
  .columns
    margin: 0 auto
    margin-top: 20px
  .desktopClass
    max-width: 260px
  .box
    padding: 10px
  .menu
    background: #fff
    border-radius: 5px
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    padding: 10px
    li
      margin: 10px 0
  .media
    align-items: center
  #subview
    position: absolute
    top: 0
    right: 0
</style>