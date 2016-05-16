<template>
  <nav class="panel">
    <div class="panel-block" v-for="list in lists">
      <h1 class="title is-5">{{ list.info }}：<span class="is-pulled-right">{{ list.cur }}</span></h1>
      <h2 class="desc">{{ list.desc }}</h2>
      <p class="has-text-right"><a class="button is-primary is-outlined">修改</a></p>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      lists: [
        {info: '真实姓名', cur: this.authData.name, desc: '请使用您的真实姓名'},
        {info: '登陆邮箱', cur: this.authData.email, desc: '用户邮箱用于登陆账号、重置密码及其它身份验证操作'},
        {info: '登录密码', cur: '******', desc: '登陆密码用于登陆账号，请妥善保存'}
      ]
    }
  },
  vuex: {
    getters: {
      authData: state => state.authData
    }
  }
}
</script>

<style scoped lang="sass">
  .panel
    border: none;
    position: relative
    background: #fff
    .panel-block:not(:last-child)
      border-bottom: 2px solid rgba(17, 17, 17, 0.1)
    .title
      margin-top: 10px
      margin-bottom: 10px
      span
        color: #1fc8db
    .desc
      line-height: 2
</style>