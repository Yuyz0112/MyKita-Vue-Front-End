<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">登陆</p>
            <p class="is-pulled-right" id="regist">
              <a v-link="'/regist'">注册新账号</a>
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <label class="label">邮箱</label>
              <p class="control">
                <input class="input" type="email" placeholder="注册邮箱" v-model="email" :class="emailValid">
                <span class="help is-danger" v-if="emailValid !== ''">请输入正确的邮箱格式</span>
              </p>
              <label class="label">密码</label>
              <p class="control">
                <input class="input" type="password" placeholder="密码" v-model="password" :class="passwordValid">
                <span class="help is-danger" v-if="passwordValid !== ''">密码需包含字母与数字且至少6位</span>
              </p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="logIn">登陆</a>
            <a class="card-footer-item">忘记密码</a>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { login, newNotice } from '../vuex/actions'
import user from '../api/user'

export default {
  data () {
    return {
      email: '',
      emailValid: '',
      password: '',
      passwordValid: ''
    }
  },
  watch: {
    email (val) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(val)) {
        this.emailValid = ''
      } else {
        this.emailValid = 'is-danger'
      }
    },
    password (val) {
      if (val.match(/[a-z]/i) && val.match(/[0-9]/) && val.length > 5) {
        this.passwordValid = ''
      } else {
        this.passwordValid = 'is-danger'
      }
    }
  },
  vuex: {
    actions: {
      session: login,
      notice: newNotice
    }
  },
  methods: {
    logIn () {
      user.login({
        email: this.email,
        password: this.password
      }, (val) => {
        if (val.id !== undefined && val !== undefined) {
          this.session(val)
          this.$route.router.go('/customer')
        } else {
          this.notice({
            show: true,
            color: 'is-danger',
            msg: `错误：${val.responseText}`
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .card
    margin: 0 auto
    max-width: 400px
  #regist
    vertical-align: baseline
    padding: 10px
</style>