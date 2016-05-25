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
            <input class="input" type="password" v-model="modal.oldPassword">
          </p>
        </div>
        <div v-if="modal.type !== 'maintain'">
          <label class="label">{{ modal.label }}</label>
          <p class="control">
            <input class="input" :type="modal.type" v-model="modal.val">
          </p>
        </div>
        <div v-if="modal.type === 'maintain'">
          <label class="label">{{ modal.label }}</label>
          <p class="control">
            <span class="select">
              <select v-el:select @change="this.modal.val = this.$els.select.selectedIndex">
                <option v-for="maintain of maintains">{{ maintain }}</option>
              </select>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="confirm" :class="loading? 'is-loading':''">确认</a>
        <a class="button" @click="showModal = false">取消</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { updateAuthdata, newNotice } from '../vuex/actions'
import user from '../api/user'

export default {
  vuex: {
    getters: {
      authData: state => state.authData
    },
    actions: {
      update: updateAuthdata,
      notice: newNotice
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
      },
      loading: false,
      maintains: ['游戏', '影视', '综艺', '动漫', '文学', '艺术', '其它']
    }
  },
  computed: {
    lists () {
      let arr = [
        {info: '真实姓名', cur: this.authData.name, desc: '请使用您的真实姓名', type: 'name', label: '请输入姓名'},
        {info: '登陆邮箱', cur: this.authData.email, desc: '用户邮箱用于登陆账号、重置密码及其它身份验证操作', type: 'email', label: '请输入邮箱'},
        {info: '登录密码', cur: '******', desc: '登陆密码用于登陆账号，请妥善保存', type: 'password', label: '请输入新密码'},
        {info: '从事领域', cur: '', desc: '选择所从事的领域，将帮助您找到感兴趣的内容', type: 'maintain', label: '请选择从事的领域'},
        {info: '公司名称', cur: '', desc: '介绍自己，让更多的人看到你', type: 'group', label: '请输入公司名称'}
      ]
      if (this.authData.maintain !== undefined) {
        arr[3].cur = this.maintains[this.authData.maintain]
      }
      if (this.authData.group !== undefined) {
        arr[4].cur = this.authData.group
      }
      return arr
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
      if (list.type === 'maintain') {
        this.modal.val = 0
      }
    },
    confirm () {
      this.loading = true
      const data = {}
      data[this.modal.type] = this.modal.val
      data.id = this.authData.id
      if (this.modal.update) {
        // update
        if (this.modal.type === 'password') {
          data.oldPassword = this.modal.oldPassword
          user.updatePassword(data, (err) => {
            if (err) {
              this.notice({
                show: true,
                color: 'is-danger',
                msg: err.response
              })
            } else {
              this.notice({
                show: true,
                color: 'is-success',
                msg: '修改成功'
              })
            }
            this.reset()
          })
        } else {
          user.update(data, (err) => {
            if (!err) {
              this.update(this.modal.type, this.modal.val)
              this.notice({
                show: true,
                color: 'is-success',
                msg: '修改成功'
              })
            } else {
              this.notice({
                show: true,
                color: 'is-danger',
                msg: '请输入正确的格式'
              })
            }
            this.reset()
          })
        }
      } else {
        // add
        user.update(data, (err) => {
          if (!err) {
            this.update(this.modal.type, this.modal.val)
            this.notice({
              show: true,
              color: 'is-success',
              msg: '添加成功'
            })
          } else {
            this.notice({
              show: true,
              color: 'is-danger',
              msg: '请输入正确的格式'
            })
          }
          this.reset()
        })
      }
    },
    reset () {
      this.loading = false
      this.showModal = false
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