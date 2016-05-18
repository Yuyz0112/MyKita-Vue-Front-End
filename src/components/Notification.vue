<template>
  <div class="notification" :class="color">
    <button class="delete" @click="close"></button>
    <slot></slot>
  </div>
</template>

<script>
import store from '../vuex/store'
import { closeNotice } from '../vuex/actions'

export default {
  store: store,
  vuex: {
    getters: {
      notice: state => state.notice
    },
    actions: {
      close: closeNotice
    }
  },
  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="sass">
  .notification
    z-index: 3
</style>