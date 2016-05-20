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
                <a v-link="'/customer/info'" @click="activeInfo">{{ info }}</a>
              </div>
            </nav>
          </div>
        </article>
      </div>
      <aside class="menu">
        <ul class="menu-list">
          <li v-for="list of lists">
            <a v-link="{ path: list.link, replace: true }" :class="$index === i? 'is-active':''" @click="active($index)">{{ list.name }}</a>
          </li>
        </ul>
        <p class="menu-label has-text-centered"><a class="button is-primary is-outlined" @click="logout">退出登陆</a></p>
      </aside>
    </div>

    <div class="column" v-if="!mobile">
      <div class="card is-fullwidth">
        <header class="card-header">
          <p class="card-header-title">
            {{ subview.title }}
          </p>
        </header>
        <div class="card-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

  <section v-if="mobile" class="is-overlay" id="subview" :class="subview.show? 'show':''">
    <nav class="nav has-shadow">
      <div class="nav-left">
        <i class="fa fa-back" @click="subview.show = false">《=</i>
        <h2>{{ subview.title }}</h2>
      </div>
    </nav>
    <router-view></router-view>
  </section>

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
      i: -1,
      subview: {
        show: false,
        title: '我的资料'
      }
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
    },
    active (index) {
      this.i = index
      this.subview = {
        show: true,
        title: this.lists[index].name
      }
    },
    activeInfo () {
      this.i = -1
      this.subview.show = true
    }
  },
  watch: {
    session (val) {
      if (val !== true) {
        this.$route.router.go('/')
      }
    },
    i (val) {
      if (val === -1) {
        this.subview.title = '我的资料'
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
    },
    info () {
      if (this.authData.maintain === undefined && this.authData.id !== '') {
        this.notice({
          show: true,
          color: 'is-info',
          msg: '请完善您的资料'
        })
        return '完善资料'
      } else {
        return '修改资料'
      }
    }
  },
  route: {
    data (transition) {
      if (this.$route.path === '/customer') {
        transition.next({
          i: -1
        })
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
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1)
    padding: 10px
    li
      margin: 10px 0
    .menu-label
      border-top: 2px solid rgba(17, 17, 17, 0.1)
      .button
        margin-top: 10px
        width: 100%
  .media
    align-items: center
  .card-content
    padding-top: 1px
    padding-bottom: 0
  #subview
    position: absolute
    top: 0
    left: 0
    transform: translate3d(-105%, 0 , 0)
    width: 100%
    background: #f1f3f5
    z-index: 2
    transition: .5s ease
    &.show
      transform: translate3d(0, 0 , 0)
    nav
      background: #fff
      color: #212121
      margin-bottom: 20px
      i
        position: absolute
        left: 0
      h2
        margin: 0 auto
</style>