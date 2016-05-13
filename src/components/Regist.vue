<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">注册MyKita</p>
            <p class="is-pulled-right" id="login">
              <a v-link="'/login'">已有账号</a>
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
                <input class="input" type="password" placeholder="请输入密码" v-model="password" :class="passwordValid">
                <span class="help is-danger" v-if="passwordValid !== ''">密码需包含字母与数字且至少6位</span>
              </p>
              <label class="label">确认密码</label>
              <p class="control">
                <input class="input" type="password" placeholder="请输入密码" v-model="passwordCheck" :class="checkValid">
                <span class="help is-danger" v-if="checkValid !== ''">两次密码输入需一致</span>
              </p>
              <label class="label">真实姓名</label>
              <p class="control">
                <input class="input" type="text" placeholder="请输入真实姓名" v-model="name">
              </p>
              <label class="label">身份</label>
              <p class="control">
                <span class="select is-fullwidth">
                  <select v-el:select @change="changeRole(this.$els.select.selectedIndex)">
                    <option>我是创业者</option>
                    <option>我是投资人</option>
                  </select>
                </span>
              </p>
              <a class="button is-primary is-outlined" @click="regist" :class="loading">立即注册</a>
            </div>
          </div>
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
      passwordValid: '',
      passwordCheck: '',
      checkValid: '',
      name: '',
      loading: '',
      role: 0
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
    },
    passwordCheck (val) {
      if (val === this.password) {
        this.checkValid = ''
      } else {
        this.checkValid = 'is-danger'
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
    regist () {
      if (this.emailValid !== '' || this.passwordValid !== '' || this.checkValid !== '') {
        return false
      } else if (this.email === '') {
        this.notice({
          show: true,
          color: 'is-danger',
          msg: '请输入邮箱'
        })
        return false
      } else if (this.passwordCheck === '') {
        this.notice({
          show: true,
          color: 'is-danger',
          msg: '请确认密码'
        })
        return false
      } else if (this.name === '') {
        this.notice({
          show: true,
          color: 'is-danger',
          msg: '请输入姓名'
        })
        return false
      }
      this.loading = 'is-loading'
      user.signup(`?email=${this.email}&password=${this.password}&role=${this.role}&name=${this.name}`, (val) => {
        this.loading = ''
        if (val.id !== undefined && val !== undefined) {
          this.session(val)
          this.$route.router.go('/customer')
        } else {
          this.notice({
            show: true,
            color: 'is-danger',
            msg: val.responseText
          })
        }
      })
    },
    changeRole (val) {
      this.role = val
    }
  }
}
</script>

<style lang="sass" scoped>
  .card
    max-width: 400px
    margin: 0 auto
  #login
    vertical-align: baseline
    padding: 10px
  .button
    width: 100%
    &:hover
      background: rgba(31, 200, 219, 0.5) !important
  .button.is-loading
    &:after
      border-color: transparent transparent #1fc8db #1fc8db !important
</style>