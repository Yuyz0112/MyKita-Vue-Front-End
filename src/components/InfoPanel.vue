<template>
  <nav class="panel">
    <div class="panel-block" v-for="list in lists">
      <h1 class="title is-5">{{ list.info }}：<span class="is-pulled-right">{{ list.cur }}</span></h1>
      <h2 class="desc">{{ list.desc }}</h2>
      <p class="has-text-right">
        <a class="button is-primary is-outlined" @click="modify(list)">{{ list.cur === ''? "添加":"修改" }}</a>
      </p>
    </div>
  </nav>
  <div class="modal" v-show="showModal">
    <div class="modal-background" @click="showModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modal.title }}</p>
        <button class="delete" @click="showModal = false"></button>
      </header>
      <section class="modal-card-body">
        <div v-if="modal.type === 'password'">
          <label class="label">请输入旧密码</label>
          <p class="control">
            <input class="input" type="text" v-model="modal.oldPassword">
          </p>
        </div>
        <div v-if="modal.type !== 'maintain'">
          <label class="label">{{ modal.label }}</label>
          <p class="control">
            <input class="input" type="text" v-model="modal.val">
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="confirm">确认</a>
        <a class="button" @click="showModal = false">取消</a>
      </footer>
    </div>
  </div>
</template>

<script>
import user from '../api/user'

export default {
  vuex: {
    getters: {
      authData: state => state.authData
    }
  },
  data () {
    return {
      showModal: false,
      modal: {
        title: '',
        val: '',
        type: '',
        label: '',
        oldPassword: '',
        update: true
      }
    }
  },
  computed: {
    lists () {
      return [
        {info: '真实姓名', cur: this.authData.name, desc: '请使用您的真实姓名', type: 'name', label: '请输入姓名'},
        {info: '登陆邮箱', cur: this.authData.email, desc: '用户邮箱用于登陆账号、重置密码及其它身份验证操作', type: 'email', label: '请输入邮箱'},
        {info: '登录密码', cur: '******', desc: '登陆密码用于登陆账号，请妥善保存', type: 'password', label: '请输入新密码'},
        {info: '从事领域', cur: '', desc: '选择所从事的领域，将帮助您找到感兴趣的内容', type: 'maintain', label: '请选择从事的领域'},
        {info: '公司名称', cur: '', desc: '介绍自己，让更多的人看到你', type: 'group', label: '请输入公司名称'}
      ]
    }
  },
  methods: {
    modify (list) {
      this.showModal = true
      this.modal.title = list.info
      this.modal.type = list.type
      this.modal.label = list.label
      if (list.cur === '') {
        this.modal.update = false
      } else {
        this.modal.update = true
      }
    },
    confirm () {
      this.showModal = false
      if (this.modal.update) {
        const data = {}
        data[this.modal.type] = this.modal.val
        user.update(this.authData.id, data, this.reset)
      }
    },
    reset () {
      this.modal.val = ''
      this.modal.oldPassword = ''
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