<template>
  <nav class="nav has-shadow fixed" v-if="!mobile">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item" href="#">
          <h2 class="title">MyKita</h2>
        </a>
      </div>
      <div class="nav-right">
        <a v-for="item of navItems" class="nav-item is-tab" v-link="{ path: item.link }">{{ item.name }}</a>
      </div>
    </div>
  </nav>
  <nav class="nav has-shadow fixed nav-mobile" v-else>
    <div class="nav-left columns">
      <a v-for="item of navItems" class="nav-item is-tab column" v-link="{ path: item.link }">{{ item.name }}</a>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      navItems: [
        {name: '首页', link: '/home'},
        {name: '找投资人', link: '/list1'},
        {name: '找项目', link: '/company'},
        {name: '登陆 / 注册', link: '/login'}
      ]
    }
  },
  vuex: {
    getters: {
      session: state => state.session,
      mobile: state => state.mobile
    }
  },
  watch: {
    session (val) {
      let lastItem = this.navItems.pop()
      if (val) {
        lastItem = {
          name: '我的',
          link: '/customer'
        }
      } else {
        lastItem = {
          name: '登陆 / 注册',
          link: '/login'
        }
      }
      this.navItems.push(lastItem)
    }
  }
}
</script>

<style lang="sass" scoped>
  .fixed 
    position: fixed
    width: 100%
  .nav-mobile .columns
    margin: 0
  .nav-mobile .nav-item
    justify-content: center
</style>