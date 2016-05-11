<template>
  <div class="container columns">
    <div class="column" :class="mobile? 'mobileClass':'desktopClass'">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure>
              <img src="../assets/avator.png">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ name }}</strong></p>
            </div>
            <nav class="level is-mobile">
              <div class="level-item has-text-centered">
                <a href="">完善资料</a>
              </div>
              <div class="level-item has-text-centered">
                <a href="">个人设置</a>
              </div>
            </nav>
          </div>
        </article>
      </div>
      <aside class="menu">
        <ul class="menu-list">
          <li v-for="list of lists">
            <a v-link="list.link" :class="$index === 0? 'is-active':''">{{ list.name }}</a>
          </li>
        </ul>
      </aside>
    </div>

    <div class="column">
      <router-view></router-view>
      <h1 class="title">Is this a mobile device? {{ mobile }}</h1>
      <a class="button is-primary is-outlined" @click="logout">登出</a>
    </div>
  </div>
</template>

<script>
import { logout } from '../vuex/actions'
import user from '../api/user'

export default {
  data () {
    return {
      lists: [
        {name: '我的订单', link: '1'},
        {name: '投资券', link: '2'},
        {name: '我的消息', link: ''},
        {name: '我的收藏', link: ''},
        {name: '我管理的公司', link: ''},
        {name: '我关注的公司', link: ''}
      ]
    }
  },
  vuex: {
    getters: {
      session: state => state.session,
      mobile: state => state.mobile,
      name: state => state.authData.name
    },
    actions: {
      sessionClear: logout
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
</style>